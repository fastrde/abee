var fs       = require('fs');

var config   = require('./config.js').config;

var fsh      = require('../lib/fshelper.js').fshelper;
var h        = require('../lib/helper.js').helper;
var C        = require('../lib/colors.js').colors;
 
exports.route = {

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

  /**
   * deletes the model with the the name "model"
   * @param {Object} model
   */
  /*del : function(name, path, template){
    if (!template){ 
      template = path;
      path     = name;  
    }  
    var entries = config.loadSection('route', {name:name});    
    fsh.removeFromFilesFromSection(entries, 
      { 
        name:name, 
        path:path, 
        template:template
      });
  },*/
  /**
   * Lists the model-files
   */
  list : function(){
    /*
    var files = fs.readdirSync(modelDir);
    for (var i = 0; i < files.length; i++){
      h.print(files[i] + "\n", "info");
    }
    */
  }
};
