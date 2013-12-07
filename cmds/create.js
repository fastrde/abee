var fs      = require('fs');
var exec    = require('child_process').exec;

var config  = require('../lib/config.js');
var fsh     = require('../lib/fshelper.js');
var tph     = require('../lib/tplhelper.js');
var h       = require('../lib/helper.js');
var C       = require('../lib/colors.js');

/**
 * when no config is chosen pick this.
 */
var fallbackConfig = "classicmvc";

/**
 * recursive parse the object that describes the directory structure and generates this
 * @param {Object} dirs object that holds the directory-structure
 * @param {String} path current path the recursive function is on
 * @param {String} key key for the dirs object
 * @param {Number} depth counts the directory depth, used to print a 'nice' structure.
 */
var generateStructure = function(dirs, path, key, depth) {
  var col;
  if ( typeof dirs[key] === 'object') { // directory or empty file
    if (dirs[key] !== null) { // directory
      (col = C.RED) && fsh.mkdir(path) && (col = C.GREEN);
      h.tree(depth, col + key + C.X);
      for (var newpath in dirs[key]) {
        generateStructure(dirs[key], path + "/" + newpath, newpath, depth+1);
      }
    } else { // empty file
      (col = C.RED) && fsh.mkfile(path) && (col = C.GREEN);
      h.tree(depth, col + key + C.X);     
    }
  }else if ( typeof dirs[key] === 'string') { // file with template
     (col = C.RED) && fsh.mkfile(path, tph.fetch([dirs[key]],{appName: global.generatedAppName})) && (col = C.GREEN);
     h.tree(depth, col + key + C.X);     
   }
};

/**
 * removes the 'insecure' and the 'autopublish' package
 * @param {string} appName name of the app created
 */
var removeInsecureModules = function(appName){
  process.chdir(appName);
  h.print("removing insecure and autopublish modules\n", "important");
  exec('meteor remove insecure', function(error, stdout, stderr) {
    h.print(stderr, "meteor");
     process.chdir(appName); // have to switch directory again
     exec('meteor remove autopublish', function(error, stdout, stderr) {
       h.print(stderr, "meteor");
    });
  });
  process.chdir('..');  
};

/**
 * removes the default files created by meteor
 * @param {String} appName name of the app created
 */
var removeFirstFiles = function(appName){
  h.print ("removing standard files ("+appName + ".css, "+appName + ".html, "+appName + ".js)\n", "important");
  
  fs.unlinkSync(appName + "/" + appName + ".css");
  fs.unlinkSync(appName + "/" + appName + ".html");
  fs.unlinkSync(appName + "/" + appName + ".js");
};

/**
 * loads the directory-structure from the config given by configName
 * @param {String} configName
 * @return {Object} dirs holds the directory informations in an object
 */
var loadStructure = function(){
  var dirs = {};
  dirs[global.generatedAppName] = config.get('structure');
  return dirs;   
};

module.exports = {
  /**
   * creates the meteor-app and the directory-structure 
   * @param {String} appName name of the app created
   * @param {String} configName name of configuration file to use
   */
  meteorApp: function(appName, configName){ 
    configName = configName || fallbackConfig;
    if (h.isFile(appName)){
      h.print("Folder " + appName + " already exists. Aborting.\n", "error");
      process.exit(1);
    }  
    global.generatedAppName = appName; //TODO: have to be global? think about it.
    h.print("Create " + appName + "\n", "important");
    config.load(configName);
    var dirs = loadStructure();    
    exec('meteor create ' + appName, function(error, stdout, stderr) {
      h.print(stderr, "meteor");
      h.print("Directory Structure is:\n", "info");
      config.addToProject(appName, configName);
      generateStructure(dirs, appName, appName, 0);
      try{
        removeInsecureModules(appName);
        removeFirstFiles(appName);
      }catch(e){
        console.log(e);
      }
    });
  },
  /**
   * creates only the directory structure given by configName.
   * @param {String} configName name of configuration file to use
   */
  abeetize: function(configName){ 
    if (!h.checkMeteor()){return;}
    if (h.isAbee()){
      h.print("Sorry, your application is already abeetized\n", "error");
      return;
    }
    var appName = process.cwd().replace(/^.*\//, "");
    global.generatedAppName = "."; //TODO: have to be global? think about it.   
    h.print("Abeetize " + appName + "\n", "important");
    config.load(configName);

    config.addToProject(".", configName);
    var dirs = loadStructure(configName);    
    generateStructure(dirs, ".", ".", 0);
  },
  help: {
    'abeetize': "extends your app with a \"best practice\" directory structure. Does nothing else.\n" +
                "  usage: abee abeetize <design-pattern>\n\n",
    'create':   "creates an app like meteor does, but extends it with a \"best practice\" directory structure.\n" +
                "  usage: abee create <appName> <design-pattern>\n\n"
  }
  
};
