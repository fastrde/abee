var fs      = require('fs');
var exec    = require('child_process').exec;
var fsh     = require('./fshelper.js').fshelper;
var tph     = require('./tplhelper.js').tplhelper;
var h       = require('./helper.js').helper;
var tmpDirs = require('../dirs.js').dirs;
var tplDir  = require('../dirs.js').views;
var C       = require('../colors.js').colors;

/**
 * recursive parse the object that describes the directory structure and generates this
 * @param {Object} dirs
 * @param {Object} path
 * @param {Object} key
 */
var parseDirs = function(dirs, path, key, depth) {
  var col;
  if ( typeof dirs[key] === 'object') { // directory or empty file
    if (dirs[key] !== null) { // directory
      (col = C.RED) && fsh.mkdir(path) && (col = C.GREEN);
      h.tree(depth, col + key + C.X);
      for (var newpath in dirs[key]) {
        parseDirs(dirs[key], path + "/" + newpath, newpath, depth+1);
      }
    } else { // empty file
      (col = C.RED) && fsh.mkfile(path) && (col = C.GREEN);
      h.tree(depth, col + key + C.X);     
    }
  }else if ( typeof dirs[key] === 'string') { // file with template
  	 (col = C.RED) && fsh.mkfile(path, tph.fetch([dirs[key]],{appName: generatedAppName})) && (col = C.GREEN);
     h.tree(depth, col + key + C.X);     
   }
};
/**
 * removes the insecure and the autopublish package
 * @param {string} appName Name of the app created
 */
var removeInsecureModules = function(appName){
  process.chdir(appName);
  console.log("[#]"+ C.PURPLE +" removing insecure and autopublish modules "+C.X);
  exec('meteor remove insecure', function(error, stdout, stderr) {
    h.meteorWrite(stderr);
     process.chdir(appName); // have to switch directory again
     exec('meteor remove autopublish', function(error, stdout, stderr) {
       h.meteorWrite(stderr);
    });
  });
  process.chdir('..');	
};

var removeFirstFiles = function(appName){
	console.log("[#]"+ C.PURPLE +" removing standard files ("+appName + ".css, "+appName + ".html, "+appName + ".js) "+C.X);
	console.log("[#]"+ C.PURPLE +" '"+appName+"/"+tplDir+"' should be a good place to look for templates (and place yours later)"+ C.X);
	fs.unlinkSync(appName + "/" + appName + ".css");
	fs.unlinkSync(appName + "/" + appName + ".html");
	fs.unlinkSync(appName + "/" + appName + ".js");
};

exports.create = {
  /**
   * creates the meteor-app and the directory-structure 
   * @param {string} appName
   */
  run: function(appName){ 	
  	global.generatedAppName = appName; //TODO: have to be global? think about it.
    console.log("[#]"+ C.PURPLE +" CREATE "+appName+C.X);
    var dirs = {};
    dirs[appName] = tmpDirs;
    exec('meteor create ' + appName, function(error, stdout, stderr) {
      h.meteorWrite(stderr);
      parseDirs(dirs, appName, appName, 0);
      try{
      	removeInsecureModules(appName);
      	removeFirstFiles(appName);
      }catch(e){
        //console.log(e);
      }
    });
  },
  abeetize: function(appName){
  	appName = appName || ".";
  	try{
  	  fs.statSync(appName+"/.meteor");
  	  global.generatedAppName = appName; //TODO: have to be global? think about it.
      console.log("[#]"+ C.PURPLE +" Abeetize "+appName+C.X);
      var dirs = {};
      dirs[appName] = tmpDirs;
      try{
        parseDirs(dirs, appName, appName, 0);
      }catch(e){
        console.log(e);
      }
  	}catch(e){
  		console.log("[E]"+C.RED+" no meteor app found at "+ appName + C.X);
  	}
  }
};
