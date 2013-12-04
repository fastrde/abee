var fs = require('fs');
var h  = require('./helper.js').helper;
var C  = require('../colors.js').colors;

exports.fshelper = {
  /**
   * creates a directory when it doesn't exist
   * @param {Object} path
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
   * @param {Object} file
   * @param {Object} content
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
  }
};

