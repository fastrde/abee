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
    } catch(e) {
      fs.mkdirSync(path); // wenn nicht... anlegen!
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
      throw("file exists");
    } catch(e) {
      if (e === "file exists"){ //weiter nach oben eskalieren
        throw("file exists");
      }
      try {
        fs.writeFileSync(file, content);
      } catch(e) {
        console.log("[E] " + C.RED + "can't write to " + file + C.X);
      }
    }
  },
  addToFile: function(file, txt){
    fs.writeFileSync(file, txt, {flag: 'a'});
  },
  rmFromFile: function(file, txt){
    var cnt = fs.readFileSync(file).toString();
    console.log(txt);
    cnt = cnt.replace(new RegExp(txt, "g"), "");
    console.log("----------\n", cnt);
    fs.writeFileSync(file, cnt);
  }
};

