var exec   = require('child_process').exec;
var fsh   = require('./fshelper.js').fshelper;
var h      = require('./helper.js').helper;
var tmpDirs = require('../dirs.js').dirs;
var C     = require('../colors.js').colors;

/**
 * recursive parse the object that describes the directory structure and generates this
 * @param {Object} dirs
 * @param {Object} path
 * @param {Object} key
 */
var parseDirs = function(dirs, path, key) {
  if ( typeof dirs[key] === 'object') {
    if (dirs[key] !== null) {
      fsh.mkdir(path);
      for (var newpath in dirs[key]) {
        parseDirs(dirs[key], path + "/" + newpath, newpath);
      }
    } else {
      fsh.mkfile(path);
    }
  }
};

exports.create = {
  /**
   * creates the meteor-app and the directory-structure
   * removes modules insecure and autopublish
    * @param {Object} appName
   */
  run: function(appName){
    console.log("[#]"+ C.PURPLE +" CREATE "+appName+C.X);
    var dirs = {};
    dirs[appName] = tmpDirs;
    exec('meteor create ' + appName, function(error, stdout, stderr) {
      h.meteorWrite(stderr);
      parseDirs(dirs, appName, appName);
      try{
        process.chdir(appName);
        console.log("[#]"+ C.PURPLE +" removing insecure and autopublish modules "+C.X);
        exec('meteor remove insecure', function(error, stdout, stderr) {
          h.meteorWrite(stderr);
        });
        exec('meteor remove autopublish', function(error, stdout, stderr) {
          h.meteorWrite(stderr);
        });
      }catch(e){
        console.log(e);
      }
    });
  }
};
