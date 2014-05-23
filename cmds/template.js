var fs     = require('fs');

var cmd    = require('../lib/cmdhelper.js');
var config = require('../lib/config.js');
var fsh    = require('../lib/fshelper.js');
var tph    = require('../lib/tplhelper.js');
var h      = require('../lib/helper.js');
var C      = require('../lib/colors.js');

/**
 * helper to group files
 * @param {Array<Object>} files Filetemplates 
 * @param {String} group group to add files to
 */

var hooks = {
  createFiles : {
    afterLoad : function(files, configData) {
      var group = configData.group;
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
    }/*,
    afterDelete : function(files, configData) {
      var group = configData.group;
      for (var i = 0; i < files.length; i++){
        var file = files[i]; 
        console.log(file);  
        try{
          var filesLeft = fs.readdirSync(file.dir);
          if (filesLeft == 0){
            fs.rmdirSync(file.dir);
            console.log(file.dir);
            h.print("Group " + group + " was empty. Deleted!\n", "success");
          }
        }catch(e){
          console.log(e);
        }
      }
    }*/
  }
};

/********************************************************************************************* EXPORTS */

/**
 * adds multiple templates/views to the meteor app at once
 * @param {Object} filenames
 * @param {Object} group
 */

var add = function(filenames, group){
  var filename = null;
  for (var i = 0; i < filenames.length; i++){
    filename = filenames[i];
    addOne(filename, group);
  }
};

/**
 * adds a template/view to the meteor app
 * @param {Object} filename
 * @param {Object} group
 */

var addOne = function(filename, group) {
  var addHooks = {};
  if (group) {
    addHooks = hooks;
  }
  cmd.addFromConfig(config.get('view'), {
    filename : filename,
    group : group
  }, {
    view : filename
  }, addHooks);
};

/**
 * deletes multiple templates/views from the given group at once
 * @param {Object} filenames
 * @param {Object} group
 */
var del = function(filenames, group) {
  var filename = null;
  for (var i = 0; i < filenames.length; i++) {
    filename = filenames[i];
    delOne(filename, group);
  }
};

/**

 * deletes the template/view from the given group
 * @param {Object} filename
 * @param {Object} group
 */
var delOne = function(filename, group) {
  var delHooks = {};
  if (group) {
    delHooks = hooks;
  }
  cmd.delFromConfig(config.get('view'), {
    filename : filename,
    group : group
  }, delHooks);
};

module.exports = {
  add : add,
  del : del,
  help: {'template': "creates a template in the clients template directory.\n" +
                     "  usage: \n"+
                     "    abee template add <templateName1> ... <templateNameN> [-g <templateGroup>]\n" +
                     "    abee template remove <templateName1> ... <templateNameN> [-g <templateGroup>]\n"+
                     "\n" +
                     "  options:\n" +
                     "    -g <templateGroup>: groups the added views in the directory <templateGroup>\n"+
                     "                        or deletes the specified views in the directory <templateGroup>\n"+
                     "\n" +
                     "  example:\n"+
                     "    abee template add student employee -g persons\n" +
                     "    abee template add car \n" +
                     "    abee template remove student -g persons\n" +
                     "\n",                     
         'view':     "same as template.\n\n"
        }
};
