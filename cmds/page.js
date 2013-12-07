var fs      = require('fs');

var cmd     = require('../lib/cmdhelper.js');
var config  = require('../lib/config.js');
var h       = require('../lib/helper.js');
var fsh     = require('../lib/fshelper.js');
var tplh    = require('../lib/tplhelper.js');
var C       = require('../lib/colors.js');
 
module.exports = {
  /**
   * adds a model with the given attributes to the meteor app
   * @param {Object} model
   * @param {Object} attr
   */
  add : function(template, pages) {  
    for (var i = 0; i < pages.length; i++){
      var page = pages[i];
      cmd.addFromConfig(config.get('page'),{filename: page, template: template},
      {
        template: template,
        page: page
      });
    }
  },

  /**
   * deletes the model with the the name "filename"
   * @param {String} filename 
   */
  del : function(pages){
    for (var i = 0; i < pages.length; i++){
      var page = pages[i];
      cmd.delFromConfig(config.get('page'), {filename: page});
    }
  },
  help : {'page':  "creates a whole page with model,controler and view with the given template\n"+
                   "  usage: abee page add <template> <page1> ... <pageN>\n"+
                   "         abee page remove <page1> ... <pageN>\n"
         }
};
