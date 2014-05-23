var fs = require('fs');

var h   = require('../lib/helper.js');
var fsh = require('../lib/fshelper.js');
var tph = require('../lib/tplhelper.js');

module.exports = {

  /**
   * holds the configuration-Object
   */
  _config : null,

  /**
   * Tries to load local config file, then fallback to baseconfig 'name'
   * @param {String} name the name of the baseconfig.
   */
  load : function(patternName, languageName, secondTry) {
    secondTry = secondTry || false;
    // app is already abeetized
    try {
      this._config    = require(h.appDir() + "/.abee/config.js");  
      this.overwriteConfig();          
      // abeetize app right now
    } catch(e) {
      try {
        if (secondTry) {
          throw e;
        }
        this.addToProject(patternName, languageName);
        this.load(patternName, languageName, true);
      } catch(e) {
        h.print("config " + patternName + " / " + languageName + " not found!\n", "error");
        console.log(e);
        process.exit(1);
      }
    }
  },
  /**
   * loads the Design-Pattern template
   * @param {String} patternName
   * @returns {String} Template for the Design-Pattern
   */
  loadPattern : function (patternName){
    var pattern = null;
    try {
      pattern = fsh.getFileAsString(fsh.getHomeDirectory() + "/.abee/patterns/" + patternName + ".js");
    } catch(e) {
      try {     
      pattern = fsh.getFileAsString(__dirname + "/../configs/patterns/" + patternName + ".js");
      } catch(e) {
        h.print("Design-Pattern " + patternName + " does not exist\n", "error");
        process.exit(1);
      }
    }
    return pattern;
  },
  
  loadLanguage : function (languageName){
    var language = null;
    try {
      language = require(fsh.getHomeDirectory() + "/.abee/languages/" + languageName + "/" + languageName + ".js");
    } catch(e) {
      try {
        language = require("../configs/languages/" + languageName + "/" + languageName + ".js");
      } catch(e) {
        h.print("Language " + languageName + " does not exist\n", "error");
        process.exit(1);
      }
    }
    return language;
  },
  

  loadLanguagePattern : function (languageName, patternName) {
    var languagePattern = null;
    try {
      languagePattern = fsh.getFileAsString(fsh.getHomeDirectory() + "/.abee/languages/" + languageName + "/overwrites/" + patternName + ".js");
    } catch(e) {
      try {     
      languagePattern = fsh.getFileAsString(__dirname + "/../configs/languages/" + languageName + "/overwrites/" + patternName + ".js");
      } catch(e) {
        return null;     
      }
    }
    return languagePattern;
  },
  /**
   * merges the config with the language-specific overwrite
   */
  overwriteConfig : function (){ 
    var overwrite = null;
    try{
      overwrite = require(h.appDir() + "/.abee/languageOverwrites.js");
    }catch(e){
      return false;
    }
    this._overwrite(overwrite);
  },
  /**
   * recursivly scans the overwrite object and merges it with the config
   * rules:
   * - if not exist -> create
   * - if exist and is string -> overwrite
   * - if exist and is object -> merge attributes
   * - if exist and is object and object in overwrite file has 'OVERWRITE' : 'yes' -> overwrite this object completly
   */
  _overwrite : function(parent, keys){
    keys = keys || [];
    for (var key in parent) {
      var obj = parent[key];
      if (typeof obj === 'object') {
         if (obj.OVERWRITE && obj.OVERWRITE == 'yes' || h.isEmpty(obj)){          
          keys.push(key);
          delete(obj.OVERWRITE);
          this.createNestedObject(this._config, keys, obj);
        }else{
          keys.push(key);
          this._overwrite(obj, keys);
        }
      }else if ( typeof obj === 'string' && key != 'OVERWRITE') {  
        keys.push(key);
        this.createNestedObject(this._config, keys, obj);        
      }
    }
  },
  /**
   * Thanks to
   * http://stackoverflow.com/questions/5484673/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by
   */
  createNestedObject : function( base, names, value ) {
    // If a value is given, remove the last name and keep it for later:
    var lastName = arguments.length === 3 ? names.pop() : false;

    // Walk the hierarchy, creating new objects where needed.
    // If the lastName was removed, then the last object is not set yet:
    for( var i = 0; i < names.length; i++ ) {
        base = base[ names[i] ] = base[ names[i] ] || {};
    }

    // If a value was given, set it to the last name:
    if( lastName ) base = base[ lastName ] = value;

    // Return the last object in the hierarchy:
    return base;
  },
  
  /**
   * loads a baseconfig 'name'. Baseconfigs are shiped with Abee
   * @param {String} name the name of the baseconfig.
   */
  loadBaseConfig : function(pattern, language) {
    try {
      this._config = tph.replace(["../configs/patterns/" + pattern + ".js"], language);
    } catch(e) {
      h.print("config " + name + " not found!\n", "error");
      this.list();
      process.exit(1);

    }
  },
  /**
   * lists all known configs
   */
  list : function() {
    try {
      var dirs = fs.readdirSync(__dirname + "/../configs/patterns");
      h.print("vaild configs are:\n", "important");
      for (var i = 0; i < dirs.length; i++) {
        h.print("    - " + dirs[i].replace(/\.js$/, "") + "\n");
      }
    } catch(e) {
      console.log(e);
      h.print("Config-Directory not found.", "error");
      process.exit(1);
    }
  },
  parseCreateFilesSection : function(files, params) {
    var ret = [];
    for (var i = 0; i < files.length; i++) {
      var file = h.clone(files[i]);
      file.name = tph.replace(file.name, params);
      for (var j = 0; j < file.template.names.length; j++) {
        file.template.names[j] = tph.replace(file.template.names[j], params);
      }
      ret.push(file);
    }
    return ret;
  },
  parseAddToFileSection : function(entries, params) {
    var ret = [];
    for (var i = 0; i < entries.length; i++) {
      var entry = h.clone(entries[i]);
      for (var j = 0; j < entry.template.names.length; j++) {
        entry.template.names[j] = tph.replace(entry.template.names[j], params);
      }
      ret.push(entry);
    }
    return ret;
  },
  /**
   * returns the configItem named item
   * @param {String|Array<String>} item the name of the Item to return
   */
  get : function(items) {
    if (this._config == null) {
      this.load();
    }
    if ( typeof items == 'string') {
      items = [items];
    }
    if (this._config && this._config[items[0]]) {
      var ret = this._config[items[0]];
      for (var i = 1; i < items.length; i++) {
        ret = ret[items[i]];
      }
      return ret;
    } else {
      return false;
    }
  },

  /**
   * creates the .abee directory by abeetizing or creating an app. stores the chosen config in it.
   * @param {Object} appName the name of the app created
   * @param {Object} configName the name of the chosen baseconfig
   */
  addToProject : function(patternName, languageName) {
    var pattern  = this.loadPattern(patternName);
    var language = this.loadLanguage(languageName);
    var languagePattern = this.loadLanguagePattern(languageName, patternName);
    try {
      fsh.mkdir(".abee");
      fsh.mkfile(".abee/config.js", tph.replace(pattern, language));
      if (languagePattern != null){
        fsh.mkfile(".abee/languageOverwrites.js", languagePattern);
      }
    } catch(e) {
      h.print("Can't create .abee/config.js\n", "error");
      console.log(e);
      process.exit(1);
    }
  }
};
