var fs = require('fs');
var C = require('../colors.js').colors;
exports.fshelper = {
  /**
   * creates a directory when it doesn't exist
   * @param {Object} path
   */
  mkdir : function(path) {
    try {
      fs.statSync(path);
      // gibt es das Verzeichnis schon?
      //console.log("[#] " + C.LIGHTBLUE + "skipping "+ path + " (already exists)" + C.X);
    } catch(e) {
      //console.log("[+] " + C.GREEN +"create directory "+ path + C.X);
      fs.mkdirSync(path);
      // wenn nicht... anlegen!
    }
  },
  /**
   * creates a file
   * @param {Object} file
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
        //console.log("[+] " + C.GREEN +"create file      "+ file + C.X);
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

