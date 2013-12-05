var fs      = require('fs');

var cmd     = require('../lib/cmdhelper.js');
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
    if (!path){
      template = name;
      path     = name.replace(/^\/*/, "/");
      name     = name.replace(/^\/*/, "");  
    }else if (!template){ 
      template = path;
      path     = name.replace(/^\/*/, "/");  
      name     = name.replace(/^\/*/, ""); 
    }
    cmd.addFromConfig(config.get('route'), {name: name},
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
