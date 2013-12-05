var fs     = require('fs');
var tplDir = require('../dirs.js').views;
var h      = require('./helper.js').helper;
var fsh    = require('./fshelper.js').fshelper;
var tph    = require('./tplhelper.js').tplhelper;
var C      = require('../colors.js').colors;

var config = require('./config.js').config;

var addGroupToFiles = function(files, group){
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    try {
      fsh.mkdir(h.appDir() + "/" + file.dir + "/" + group);
      file.dir = file.dir + "/" + group;
    } catch(e) {

    }
    files[i] = file;
  }
  return files;
};

exports.view = {
  /**
   * adds a template/view to the meteor app
   * @param {Object} view
   * @param {Object} group
   */
  add : function(filename, group) {
    var files = config.loadSection('view', {filename: filename});
    if (group){
      files = addGroupToFiles(files, group);
    }
    fsh.createFilesFromSection(files, {view : filename});
  },

  /**
   * deletes the template/view from the given group
   * @param {Object} view
   * @param {Object} group
   */
  del : function(filename, group){
    var files = config.loadSection('view', {filename: filename});
    if (group){
      files = addGroupToFiles(files, group);
    }
    fsh.deleteFilesFromSection(files);
  },
  
  /**
   * lists the files in the template/view directory
   */
  list : function(){
  	/* can't figure out at the moment how to find views... */
  	
  	/*var files = config.loadFileSection('view', "");
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			try {
				var files = fs.readdirSync(files.dir);
				for (var i = 0; i < files.length; i++){
      				h.print(files[i] + "\n", "info");
    			}
			} catch(e) {
				console.log(e);
			}
		}*/
   }
};
