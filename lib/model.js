var fs       = require('fs');

var modelDir = require('../dirs.js').models;
var subsDir  = require('../dirs.js').subscriptions;
var pubDir   = require('../dirs.js').publish;
var permDir  = require('../dirs.js').permissions;


var h        = require('./helper.js').helper;
var fsh      = require('./fshelper.js').fshelper;
var tplh     = require('./tplhelper.js').tplhelper;
var config   = require('./config.js').config;
var C        = require('../colors.js').colors;
 
exports.model = {
  /**
   * adds a model with the given attributes to the meteor app
   * @param {Object} model
   * @param {Object} attr
   */
  add : function(filename, attr) {  
  	var files = config.loadFileSection('model', filename);    
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
  	var files = config.loadFileSection('model', filename);    
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
