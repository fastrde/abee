var C = require('../colors.js').colors;

exports.helper = {
  /**
   * writes meteors output to console prefixed with [M]
    * @param {Object} txt
   */
  meteorWrite : function(txt) {
    txt = txt.replace(/^/mg, "[M] ");
    txt = txt.replace(/\[M\] $/, "");
    process.stdout.write(C.LIGHTGRAY);
    process.stdout.write(txt);
    process.stdout.write(C.X);
  },
  
  /**
   * returns the string with the first letter in uppercase
     * @param {Object} string
   */
  capitalize : function(string){
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  },
  tree : function(depth, item){
    this.print("    ");
    for(var i = 0; i < depth; i++) { this.print(" |");}    
    this.print ("-- " + item +"\n");
  },
  print : function(txt){
    process.stdout.write(txt);
  }
};
