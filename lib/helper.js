var C  = require('../colors.js').colors;
var fs = require('fs');

exports.helper = {


  clone :function(p, c) {
    var c = c || {};
    for (var i in p) {
      if ( typeof p[i] === 'object') {
        c[i] = (p[i].constructor === Array) ? [] : {};
        this.clone(p[i], c[i]);
      } else
        c[i] = p[i];
    }
    return c;
  },

  /**
   * checks if appName is a meteor app. And prints a message when not
   * @param {String} appName name of the App.
   * @return {Boolean} true when it is a app, false otherwise
   */
  checkMeteor: function(appName){
    if (!this.isMeteor(appName)){
      this.print("Sorry, it's not a meteor application\n", "error");
      return false;
    }
    return true;
  },

  /**
   * checks if appName is a abee app. And prints a message when not
   * @param {String} appName name of the App.
   * @return {Boolean} true when it is a app, false otherwise
   */
  checkAbee: function(appName){
    if (!this.isAbee(appName)){
      this.print("Sorry, it's not an Abee application (you can try to abeetize it!)\n", "error");
      return false;
    }
    return true;
  },

  /**
   * checks if appName is a meteor app.
   * @param {String} appName name of the App.
   * @return {Boolean} true when it is a app, false otherwise
   */
  isMeteor: function(appName){
  appName = appName || ".";
     try{
       fs.statSync(appName + "/.meteor");
       return true;
     }catch(e){
       return false;
     }
  },

  /**
   * checks if appName is a abee app.
   * @param {String} appName name of the App.
   * @return {Boolean} true when it is a app, false otherwise
   */
  isAbee: function(appName){
  appName = appName || ".";
     try{
       fs.statSync(appName + "/.abee");
       return true;
     }catch(e){
       return false;
     }
   
  },

  /**
   * checks if file exist
   * @param {String} file
   * @return {Boolean} true when it is a meteor app, false otherwise
   */
  isFile: function(file){
    try{
      fs.statSync(file);
      return true;
    }catch(e){
      //console.log(e);
      return false;
    }
  },

  /**
   * returns the directory of the app
   */
  appDir: function(){
    return process.cwd();
  },
  
  /**
   * returns the string with the first letter in uppercase
   * @param {String} string string to capitalize
   */
  capitalize : function(string){
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  },
  
  /**
   * helper function to print a 'nice' tree
   * @param {Number} depth depth of the tree
   * @param {String} item item to print
   */
  tree : function(depth, item){
    this.print("    ");
    for(var i = 0; i < depth; i++) { this.print(" |");}    
    this.print ("-- " + item +"\n");
  },
  /**
   * prints txt in the style of type
   * @param {String} txt string to print
   * @param {String} type style of string
   */
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
