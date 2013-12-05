#!/usr/bin/env node

var fs = require('fs');

// Load commands in cmds folder
var cmds = fs.readdirSync(__dirname + '/../cmds');
for (var i = 0; i < cmds.length; i++){
  var filename = cmds[i];
  var cmd = filename.replace(/\.js$/,"");
  exports[cmd] = require(__dirname + '/../cmds/' + filename);
}


  
