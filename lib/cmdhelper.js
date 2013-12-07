var fs      = require('fs');

var config  = require('../lib/config.js');

var h       = require('./helper.js');
var tph     = require('./tplhelper.js');
var fsh     = require('./fshelper.js');
var C       = require('./colors.js');

module.exports = {	
  addFromConfig: function(section, configData, templateData, hooks){
    if (section['createFiles']){
      var files = config.parseCreateFilesSection(section['createFiles'], configData);
      if (hooks && hooks.createFiles && hooks.createFiles.afterLoad){
      	files = hooks.createFiles.afterLoad(files, configData);
      }
      fsh.createFilesFromSection(files, templateData);  
      if (hooks && hooks.createFiles && hooks.createFiles.afterCreate){
        files = hooks.createFiles.afterLoad(files, configData);
      }
 	    h.print("\n");
    }
    if (section['addToFiles']){
      var entries = config.parseAddToFileSection(section['addToFiles'], configData);
      fsh.addToFilesFromSection(entries,  templateData);
    }
  },
  delFromConfig: function(section, configData, hooks){
    if (section['createFiles']){
      var files = config.parseCreateFilesSection(section['createFiles'], configData);
      if (hooks && hooks.createFiles && hooks.createFiles.afterLoad){
        files = hooks.createFiles.afterLoad(files, configData);
      }
      fsh.deleteFilesFromSection(files); 
      if (hooks && hooks.createFiles && hooks.createFiles.afterDelete){
        files = hooks.createFiles.afterDelete(files, configData);
      }
      h.print("\n");
    }
  }
};