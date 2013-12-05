var h   = require('../lib/helper.js').helper;
var fsh = require('../lib/fshelper.js').fshelper;
var tph = require('../lib/tplhelper.js').tplhelper;

exports.config = {
  
  /**
   * holds the configuration-Object 
   */
  _config : null,
  
  /**
   * the name of the configFile (without .js) or .local for local config
   */
  _configName : null,

  /**
   * Tries to load local config file, then fallback to baseconfig 'name' 
   * @param {String} name the name of the baseconfig.
   */
  load: function(name){
    try {
      this._config = require(h.appDir() + "/.abee/config.js").config;
      this._configName = ".local";
    }catch(e){
      try{
      	this.loadBaseConfig(name);
      }catch(e){
      	h.print("config " + name + " not found!\n", "error");
        process.exit(1);
      }
    }
  },
 
  /**
   * loads a baseconfig 'name'. Baseconfigs are shiped with Abee 
   * @param {String} name the name of the baseconfig.
   */
  loadBaseConfig: function(name){
    try {
      this._config = require("../configs/" + name + ".js").config;
      this._configName = name;
    } catch(e) {
      h.print("config " + name + " not found!\n", "error");
      process.exit(1);
    }
  },

  /**
   * if no parameter name is given it prints the local config, else it prints the baseconfig name.
   * @param {String} name the name of the baseconfig.
   */
  print: function (name){
    if (name){
      this.loadBaseConfig(name);
    }else{
      this.load();
    }
    console.log(this._config);
  },

  store: function (name){
    
  },
  export: function (name){
    
  },
  dir: function (name){
    
  },
  loadSection: function(sectionName, params){
    var section = this.get(sectionName);
    if (section['createFiles']){
      return this.createFilesSection(section['createFiles'], params);
    }
    if (section['addToFiles']){
      return this.addToFileSection(section['addToFiles'], params);
    }
  },
  createFilesSection: function(files, params){
    var ret = []; 
    for (var i = 0; i < files.length; i++){
      var file = h.clone(files[i]);
      file.name = tph.replace(file.name, params);
      for (var j = 0; j < file.template.names.length; j++){
        file.template.names[j] = tph.replace(file.template.names[j], params);
      }
      ret.push(file);
    }
    return ret;
  },
  addToFileSection: function(entries, params){
    var ret = []; 
    for (var i = 0; i < entries.length; i++){
      var entry = h.clone(entries[i]);
      for (var j = 0; j < entry.template.names.length; j++){
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
  get: function(items){
    if (typeof items == 'string'){
      items = [items];  
    }
    
    if (this._config && this._config[items[0]]){
      var ret = this._config[items[0]];
      for (var i = 1; i < items.length; i++){
        ret = ret[items[i]];
      }
      return ret;
    }else{
      h.print("configItem " + item + " in config " + this._configName + " not found.\n", "error");
    }
  },
 
  /**
   * creates the .abee directory by abeetizing or creating an app. stores the chosen config in it. 
   * @param {Object} appName the name of the app created
   * @param {Object} configName the name of the chosen baseconfig
   */
  addToProject: function(appName, configName){  
    try{
      fsh.mkdir(appName + "/.abee");
      fsh.cpfile(__dirname + "/../configs/"+ configName + ".js", appName + "/.abee/config.js"); //TODO: remove __dirname? 
    }catch(e){
      console.log(e);
    }
  }
};
