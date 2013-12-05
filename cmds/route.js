var fs      = require('fs');

var config  = require('../lib/config.js');
var fsh     = require('../lib/fshelper.js');
var h       = require('../lib/helper.js');
var C       = require('../lib/colors.js');
 
module.exports = {

  /**
   * adds a route with the given to the meteor app
   * @param {Object} model
   * @param {Object} attr
   */
  add : function(name, path, template) {
    if (!template){ 
      template = path;
      path     = name;  
    }  
    var entries = config.loadSection('route', {name:name});    
    fsh.addToFilesFromSection(entries, 
      { 
        name:name, 
        path:path, 
        template:template
      });
  },
  help : {'route': "creates a route\n" +
                   "  usage: abee route add [<name1>:]<path1>[:<template1>] ... [<nameN>:]<pathN>[:<templateN>]\n\n"
                  
  }
};
