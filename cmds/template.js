var fs     = require('fs');

var config = require('../lib/config.js');
var fsh    = require('../lib/fshelper.js');
var tph    = require('../lib/tplhelper.js');
var h      = require('../lib/helper.js');
var C      = require('../lib/colors.js');

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

module.exports = {
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
  help: {'template': "creates a template in the clients template (default: client/views) directory.\n" +
                     "  usage: abee template add <templateName1> ... <templateNameN> <templateGroup>\n" +
                     "         abee template remove <templateName1> ... <templateNameN> <templateGroup>\n\n"+
                     "  hint:  insert a . as templateGroup to omit templateGroup\n\n",
         'view':     "same as template.\n\n"
        }
};
