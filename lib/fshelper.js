var fs   = require('fs');
var h    = require('./helper.js').helper;
var tph  = require('./tplhelper.js').tplhelper;
var C    = require('../colors.js').colors;

exports.fshelper = {
  /**
   * creates a directory when it doesn't exist
   * @param {String} path path of the directory that should be created
   */
  mkdir : function(path) {
    try {
      fs.statSync(path); // gibt es das Verzeichnis schon?
      return false;
    } catch(e) {
      fs.mkdirSync(path); // wenn nicht... anlegen!
      return true;
    }
  },
  /**
   * creates a file
   * @param {String} file name of the file
   * @param {String} content content of the file
   */
  mkfile : function(file, content) {
    content = content || "";
    try {
      fs.statSync(file);
      return false;
    } catch(e) {
      try {
        fs.writeFileSync(file, content);
        return true;
      } catch(e) {
        h.print ("can't write to " + file +"\n", "error");
        return false;
      }
    }
  },
  rmfile : function(file){
    try {
      fs.unlinkSync(file);
      h.print("removed file "  + file + "\n", "success");
    } catch(e) {
      h.print("file "  + file + " not found\n", "warn");
    }
  },
  createFilesFromSection:function(files, data){
    for(var i = 0; i < files.length; i++){
      var file = files[i];
      var template = tph.fetch(file.template.names, data); 
      if (this.mkfile(file.dir + "/" + file.name, template)){
        h.print("added file "  + file.dir + "/" + file.name + "\n", "success");
      }
    }
  },
  deleteFilesFromSection:function(files){
    for(var i = 0; i < files.length; i++){
      var file = files[i];
      this.rmfile(file.dir + "/" + file.name);
    }
  },
  /**
   * Copies a file from inFile to outFile 
   * @param {String} inFile source
   * @param {String} outFile destination
   */
  cpfile : function(inFile, outFile){
    try{
      fs.createReadStream(inFile).pipe(fs.createWriteStream(outFile));
    }catch(e){
      console.log(e);
    }
  }
};

