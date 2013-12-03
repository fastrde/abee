var fs = require('fs');
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
        console.log("[E] " + C.RED + "can't write to " + file + C.X);
        return false;
      }
    }
  }
 /* addToFile: function(file, txt){
    fs.writeFileSync(file, txt, {flag: 'a'});
  },
  rmFromFile: function(file, txt){
    var cnt = fs.readFileSync(file).toString();
    console.log(txt);
    cnt = cnt.replace(new RegExp(txt, "g"), "");
    console.log("----------\n", cnt);
    fs.writeFileSync(file, cnt);
  }*/
};

