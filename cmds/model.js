var fs      = require('fs');

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
  add : function(filename, attr) {  
  	var files = config.loadSection('model', {filename: filename});    
    var attrParsed = [];
    if (attr){
      for (var i = 0; i < attr.length; i++){
        attrParsed.push({name:attr[i], Name:h.capitalize(attr[i]), Model: h.capitalize(filename), model: filename.toLowerCase()});
      }
    }
    fsh.createFilesFromSection(files, 
    	{
        Model : h.capitalize(filename),
        model : filename.toLowerCase(),
        attr  : attrParsed,
        collection: h.capitalize(filename) + "Collection",   		 
      });
  },

  /**
   * deletes the model with the the name "model"
   * @param {Object} model
   */
  del : function(filename){
  	var files = config.loadSection('model', {filename: filename});    
	fsh.deleteFilesFromSection(files);
  },
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
