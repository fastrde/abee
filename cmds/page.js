var fs      = require('fs');

var cmd     = require('../lib/cmdhelper.js');
var config  = require('../lib/config.js');
var h       = require('../lib/helper.js');
var fsh     = require('../lib/fshelper.js');
var tplh    = require('../lib/tplhelper.js');
var C       = require('../lib/colors.js');
 
module.exports = {
  /**
   * adds pages with the given template
   * @param {String} template
   * @param {Array<String>} pages
   */
  add : function(template, pages) {  
    for (var i = 0; i < pages.length; i++){
      var page = pages[i];
      var section = config.get(['page', template]);
      if (section){
        cmd.addFromConfig(section,{filename: page, template: template},
        {
          template: template,
          page: page
        });
      }else{
        h.print("Pagetemplate "+ template +" not found!", "error");
        process.exit(1);
      }
    }
  },
  /**
   * deletes the pages
   * @param {String} template
   * @param {Array<String>} pages
   */
  del : function(template, pages){
    for (var i = 0; i < pages.length; i++){
      var page = pages[i];
      var section = config.get(['page', template]);
      if (section){
        cmd.delFromConfig(section, {filename: page});
      }else{
        h.print("Pagetemplate "+ template +" not found!", "error");
        process.exit(1);
      }
    }
  },
  help : {'page':  "creates a whole page with model,controler and view with the given template\n"+
                   "  usage: abee page add <template> <page1> ... <pageN>\n"+
                   "         abee page remove <template> <page1> ... <pageN>\n"
         }
};
