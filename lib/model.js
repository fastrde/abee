var fs       = require('fs');
var modelDir = require('../dirs.js').models;
var subsDir  = require('../dirs.js').subscriptions;
var pubDir   = require('../dirs.js').publish;
var permDir  = require('../dirs.js').permissions;
var h        = require('./helper.js').helper;
var fsh      = require('./fshelper.js').fshelper;
var tplh     = require('./tplhelper.js').tplhelper;
var C        = require('../colors.js').colors;
 
exports.model = {
  /**
   * adds a model with the given attributes to the meteor app
   * @param {Object} model
   * @param {Object} attr
   */
  add : function(model, attr) {    
    var path = modelDir;
    var display = model;
    var attrParsed = [];
    if (attr){
        for (var i = 0; i < attr.length; i++){
          attrParsed.push({name:attr[i], Name:h.capitalize(attr[i]), Model: h.capitalize(model), model: model.toLowerCase()});
        }
      }
    try {
      var modelTemplate   = tplh.fetch([model + "Model.js", "model.js"], 
                              { Model: h.capitalize(model), model: model.toLowerCase(), attr:attrParsed });
      var subsTemplate    = tplh.fetch([model + "Subscription.js", "subscription.js"], {model : model.toLowerCase()});
      var pubTemplate     = tplh.fetch([model + "Publish.js", "publish.js"], {model : model.toLowerCase(), collection: h.capitalize(model) + "Collection"});
      var permTemplate    = tplh.fetch([model + "Permissions.js", "permissions.js"], {collection: h.capitalize(model) + "Collection"});
          
      fsh.mkfile(path    + "/" + model + "Model.js", modelTemplate);
      fsh.mkfile(subsDir + "/" + model + "Subscription.js", subsTemplate);
      fsh.mkfile(pubDir  + "/" + model + "Publish.js", pubTemplate);
      fsh.mkfile(permDir + "/" + model + "Permissions.js", permTemplate);
      
      console.log("[+] added model " + C.GREEN + display + C.X);
    }catch(e){
      console.log(e);
    }
  },

  /**
   * deletes the model with the the name "model"
   * @param {Object} model
   */
  del : function(model){
    var path = modelDir;
    var display = model;
    try {
      fs.unlinkSync(path + "/" + model + "Model.js");
      console.log("[-] removed model " + C.GREEN + display + C.X);
    } catch(e) {
      console.log("[#] model "+ C.GREEN + display + C.X +" not found");
    }

    try {    
      fs.unlinkSync(subsDir + "/" + model + "Subscription.js");
      console.log("[-] removed client-subscription for model " + C.GREEN + display + C.X);
    } catch(e) {
      console.log("[#] client-subscription for model "+ C.GREEN + display + C.X +" not found");
    }

    try {
      fs.unlinkSync(pubDir  + "/" + model + "Publish.js");
      console.log("[-] removed server-publish for model " + C.GREEN + display + C.X);
    } catch(e) {
      console.log("[#] server-publish for model "+ C.GREEN + display + C.X +" not found");
    }
    try {
      fs.unlinkSync(permDir  + "/" + model + "Permissions.js");
      console.log("[-] removed permissions for model " + C.GREEN + display + C.X);
    } catch(e) {
      console.log("[#] permissions for model "+ C.GREEN + display + C.X +" not found");
    }
  },
  /**
   * Lists the model-files
   */
  list : function(){
    var files = fs.readdirSync(modelDir);
    for (var i = 0; i < files.length; i++){
      console.log(files[i]);
    }
  }
};
