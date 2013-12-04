var fs     = require('fs');
var tplDir = require('../dirs.js').views;
var h      = require('./helper.js').helper;
var fsh    = require('./fshelper.js').fshelper;
var tph    = require('./tplhelper.js').tplhelper;
var C      = require('../colors.js').colors;

exports.view = {
  /**
   * adds a template/view to the meteor app
   * @param {Object} view
   * @param {Object} group
   */
  add : function(view, group) {
    var path = tplDir;
    var display = view;
    if (group) {
      try{
        fsh.mkdir(tplDir + "/" + group);
        path = tplDir + "/" + group;
        display = group+"/"+view;
      }catch(e){

      }
    }
    var htmlTemplate = tph.fetch([view + ".html", "view.html"], {view : view}); 
    var jsTemplate   = tph.fetch([view + ".js", "view.js"], {view : view});
    if (fsh.mkfile(path + "/" + view + ".html", htmlTemplate) &&
        fsh.mkfile(path + "/" + view + ".js", jsTemplate)){ 
      h.print("added view "  + display + "\n", "success");
    }else{
      h.print("can't add view "+ display + "\n", "error");
    }
  },

  /**
   * deletes the template/view from the given group
   * @param {Object} view
   * @param {Object} group
   */
  del : function(view, group){
    var path = tplDir;
    var display = view;
    if (group) {
      path = path + "/" + group;
      display = group +"/"+ view;
    } else {

    }
    try {
      fs.unlinkSync(path + "/" + view + ".js");
      fs.unlinkSync(path + "/" + view + ".html");
      h.print("removed view "  + display + "\n", "success");
      var filesLeft = fs.readdirSync(path);
      if (filesLeft.length == 0){
        fs.rmdirSync(path);
        h.print("removed group " + group + "\n", "success");
      }
    } catch(e) {
      h.print("view " + display + " not found\n", "warn");
    }
  },
  /**
   * lists the files in the template/view directory
   */
  list : function(){
    var files = fs.readdirSync(tplDir);
    for (var i = 0; i < files.length; i++){
      h.print(files[i]+"\n", "info");
    }
  }
};
