//COMMAND NOT IN USE AT THE MOMENT!
var fs      = require('fs');
var exec    = require('child_process').exec;

var config  = require('../lib/config.js');
var fsh     = require('../lib/fshelper.js');
var tph     = require('../lib/tplhelper.js');
var h       = require('../lib/helper.js');
var C       = require('../lib/colors.js');

var output = "";

var parseDirectory = function(dir, depth) {
  depth = depth || 0;
  var col;
  var files = fs.readdirSync(dir);
  for(var i=0; i < files.length; i++){
  try{
    if (!files[i].match(/^\./)){
      output += "\n";
      for (var j = 0; j < depth; j++){
        output += "  ";
      }
      output += "'"+files[i]+"'";
      fs.readFileSync(dir+"/"+files[i]);
      output += ": null,";    
    }
  }catch(e){
    if (e.code == "EISDIR"){
      output += ":{";
      parseDirectory(dir + "/" + files[i], depth+1);
      output += "\n";
      for (var j = 0; j < depth; j++){
        output += "  ";
      }
      output += "},";
    }else{
      
    }
  }
 }
 output = output.replace(/null,(\s+)}/mg, "null$1}");
 output = output.replace(/},(\s+)}/mg, "}$1}");
 output = output.replace(/{\s+}/mg, "{}");
 return;
};
var commandSection = function(command){
  var output = "  " + command + ": {\n";
  output += "    createFiles: [\n";
  output += "      // YOU HAVE TO ADD SOMETHING TO DO HERE!\n";
  output += "      // READ \"Design pattern config\" at \n";
  output += "      // https://github.com/fastrde/abee/blob/master/README.md\n";
  output += "    ],\n";
  output += "    addToFiles: [\n";  
  output += "      // YOU HAVE TO ADD SOMETHING TO DO HERE!\n";
  output += "      // READ \"Design pattern config\" at \n";
  output += "      // https://github.com/fastrde/abee/blob/master/README.md\n";
  output += "    ]\n";
  output += "  },\n";  
  return output;
};
var pageSection = function(){
  var output = "  page: {\n";
  var sections = ['single', 'record', 'list', 'crud', 'dialog', 'message'];
  for (var i = 0; i < sections.length; i++){
    output += "    '"+sections[i]+"': {\n";
    output += "      createFiles: [\n";
    output += "        // YOU HAVE TO ADD SOMETHING TO DO HERE!\n";
    output += "        // READ \"Design pattern config\" at \n";
    output += "        // https://github.com/fastrde/abee/blob/master/README.md\n";
    output += "      ],\n";
    output += "      addToFiles: [\n";  
    output += "        // YOU HAVE TO ADD SOMETHING TO DO HERE!\n";
    output += "        // READ \"Design pattern config\" at \n";
    output += "        // https://github.com/fastrde/abee/blob/master/README.md\n";
    output += "      ]\n";
    output += "    },\n";
  }
  output += "  },\n";  
  return output;
};

/********************************************************************************************* EXPORTS */
var make = function(){ 
    try {
      if (h.isMeteor()){
        h.print("module.exports = {\n  name: 'MYCONFIG',\n  structure: {");
        parseDirectory(".", 2);
        output = output.replace(/,$/, "");
        h.print(output+"\n  },\n");
        h.print(commandSection("view"));
        h.print(commandSection("collection"));
        h.print(commandSection("route"));
        h.print(pageSection());
        h.print("}\n");
      }
    }catch(e){
      console.log(e);
    }
  };
var list = function(){
    config.list();
};

module.exports = {
  make: make,
  list: list,
  help: {
    'config': "NOT IN USE\n" +
            "  usage: abee config list\n\n",
  }

};
