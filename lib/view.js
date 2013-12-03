var fs     = require('fs');
var tplDir = require('../dirs.js').views;
var fsh    = require('./fshelper.js').fshelper;
var tplh   = require('./tplhelper.js').tplhelper;
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
    var htmlTemplate = tplh.fetch([view + ".html", "view.html"], {view : view}); 
    var jsTemplate   = tplh.fetch([view + ".js", "view.js"], {view : view});
    if (fsh.mkfile(path + "/" + view + ".html", htmlTemplate) &&
        fsh.mkfile(path + "/" + view + ".js", jsTemplate)){ 
      console.log("[+] added view " + C.GREEN + display + C.X);
    }else{
      console.log("[E]"+ C.RED + " can't add view "+ display + C.X);
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
      console.log("[-] removed view " + C.GREEN + display + C.X);
      var filesLeft = fs.readdirSync(path);
      if (filesLeft.length == 0){
        fs.rmdirSync(path);
        console.log("[-] removed group " + C.GREEN + group + C.X);
      }
    } catch(e) {
      console.log("[#] view "+ display +" not found");
    }
  },
  /**
   * lists the files in the template/view directory
   */
  list : function(){
    var files = fs.readdirSync(tplDir);
    for (var i = 0; i < files.length; i++){
      console.log(files[i]);
    }
  }
};
