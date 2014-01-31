var fs      = require('fs');
var exec    = require('child_process').exec;

var config  = require('../lib/config.js');
var fsh     = require('../lib/fshelper.js');
var tph     = require('../lib/tplhelper.js');
var h       = require('../lib/helper.js');
var C       = require('../lib/colors.js');


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
     var appName = process.cwd().replace(/^.*\//, "");
     (col = C.RED) && fsh.mkfile(path, tph.fetch([dirs[key]],{appName: appName})) && (col = C.GREEN);
     h.tree(depth, col + key + C.X);     
   }
};

/**
 * removes the 'insecure' and the 'autopublish' package
 */
var removeInsecureModules = function(appName){
  h.print("Removing insecure and autopublish modules\n", "important");
  exec('meteor remove insecure', function(error, stdout, stderr) {
    h.print(stderr, "meteor");
     exec('meteor remove autopublish', function(error, stdout, stderr) {
       h.print(stderr, "meteor");
    });
  });
};

/**
 * removes the default files created by meteor
 * @param {String} appName name of the app created
 */
var removeFirstFiles = function(appName){
  h.print ("Removing standard files ("+appName + ".css, "+appName + ".html, "+appName + ".js)\n", "important");
  
  fs.unlinkSync(appName + ".css");
  fs.unlinkSync(appName + ".html");
  fs.unlinkSync(appName + ".js");
};

/**
 * loads the directory-structure from the config given by configName
 * @return {Object} dirs holds the directory informations in an object
 */
var loadStructure = function(){
  var dirs = {};
  dirs['.'] = config.get('structure');
  return dirs;   
};


/********************************************************************************************* EXPORTS */

/**
 * creates only the directory structure given by pattennName in the given language.
 * @param {String} patternName name of design-pattern file to use
 * @param {String} languageName name of language file to use
 */
var abeetize = function(patternName, languageName, delFiles) {
  delFiles = delFiles || false;
  if (!h.checkMeteor()) {
    return;
  }
  if (h.isAbee()) {
    h.print("Sorry, your application is already abeetized\n", "error");
    return;
  }
  var appName = process.cwd().replace(/^.*\//, "");
  h.print("Abeetize " + appName + " (design-pattern:" + patternName + ", language:" + languageName + ")\n", "important");
  config.load(patternName, languageName);
  var dirs = loadStructure();
  h.print("Directory Structure is:\n", "info");
  generateStructure(dirs, ".", ".", 0);
  if (delFiles){
    try {
      removeInsecureModules();
      removeFirstFiles(appName);
    } catch(e) {
      console.log(e);
    }
  }
}; 

/**
 * creates the meteor-app and the directory-structure
 * @param {String} appName name of the app created
 * @param {String} patternName name of design-pattern file to use
 * @param {String} languageName name of language file to use
 */
var meteorApp = function(appName, patternName, languageName) {
  if (h.isFile(appName)) {
    h.print("Folder " + appName + " already exists. Aborting.\n", "error");
    process.exit(1);
  }
  h.print("Create " + appName + "\n", "important");

  exec('meteor create ' + appName, function(error, stdout, stderr) {
    process.chdir(appName);
    h.print(stderr, "meteor");
    abeetize(patternName, languageName, true);
  });
}; 

module.exports = {
  meteorApp: meteorApp,
  abeetize: abeetize, 
  help: {
    'abeetize': "extends your app with a \"best practice\" directory structure.\n" +
                "\n"+
                "  usage:\n" +
                "    abee abeetize [-p <design-pattern>] [-l <language>] [-d]\n" + 
                "\n"+
                "  options: \n" + 
                "    -p <design-pattern>: choose a design-pattern to build structure for\n" +
                "                         supported: mvc (Model-View-Controller)\n" +
                "                         default:   mvc\n" +
                "    -l <language>:       choose scripting language\n" +
                "                         supported: js (Javascript), coffee (Coffescript)\n" + 
                "                         default:   js\n" +
                "    -d:                  delete meteor standard .html,.js,.css files and remove insecure und autopublish packages\n"+ 
                "\n"+
                "  example:\n" +
                "    abee abeetize -l coffee\n" + 
                "    abee abeetize -d\n"+
                "\n",
    'create':   "creates an app like meteor does, but extends it with a \"best practice\" directory structure.\n" +
                "  usage:\n"+
                "    abee create <appName> [-p <design-pattern>] [-l <language>]\n" +
                "\n"+
                "  options:\n" + 
                "    -p <design-pattern>: choose a design-pattern to build structure for\n" +
                "                         supported: mvc\n" +
                "                         default:   mvc\n" +
                "    -l <language>:       choose scripting language\n" +
                "                         supported: js (Javascript), coffee (Coffescript)\n" + 
                "                         default:   js\n" +
                "\n"+
                "  example:\n" +
                "    abee create -l coffee myNewApp\n" 

  }
  
};
