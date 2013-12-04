var fs = require('fs');
var h  = require('./helper.js').helper;
var C  = require('../colors.js').colors;

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

