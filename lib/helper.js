var C = require('../colors.js').colors;

exports.helper = {
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
  print : function(txt, type){
  	//type = type || "";
  	switch(type){
  		case "warn":
  			var replace = "[W] ";
  			var color   = C.YELLOW;
 		break;
 		case "error":
  		case "err":
 			var replace = "[E] ";
  			var color   = C.RED;
  		break;
  		case "meteor":
  			var replace = "[M] ";
  			var color   = C.LIGHTGRAY;
  		break;
  		case "success":
 			var replace = "[#] ";
  			var color   = C.GREEN;  		
  		break;
  		case "important":
 			var replace = "[#] ";
  			var color   = C.PURPLE;  		
  		break;
  		case "info":  		
  			var replace = "[#] ";
  			var color   = C.NORMAL;
  		break;
  		default:
  			var replace = "";
  			var color   = C.NORMAL;
  		break;

  	}
    process.stdout.write(color + txt.replace(/^/mg, replace).replace(/\[.\] $/, "") + C.X);
  }
};
