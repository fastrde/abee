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

module.exports = {

  /**
   * adds a template/view to the meteor app
   * @param {Object} view
   * @param {Object} group
   */
  add : function(filename, group) {
  	var addHooks = {};
  	if (group){
      addHooks = hooks; 
  	}
    cmd.addFromConfig(config.get('view'), {filename: filename, group: group},
    {
    	view : filename
    }, addHooks);
},

  /**
   * deletes the template/view from the given group
   * @param {Object} view
   * @param {Object} group
   */
  del : function(filename, group){
    var delHooks = {};
    if (group){
      delHooks = hooks;
    }
    cmd.delFromConfig(config.get('view'), {filename: filename, group: group}, delHooks);
  },
  help: {'template': "creates a template in the clients template (default: client/views) directory.\n" +
                     "  usage: abee template add <templateName1> ... <templateNameN> <templateGroup>\n" +
                     "         abee template remove <templateName1> ... <templateNameN> <templateGroup>\n\n"+
                     "  hint:  insert a . as templateGroup to omit templateGroup\n\n",
         'view':     "same as template.\n\n"
        }
};
