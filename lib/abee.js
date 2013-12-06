#!/usr/bin/env node

var fs = require('fs');
var h  = require('./helper.js');
var config = require('./config.js');

global.DEFAULTCONFIG = "classicmvc";

// Load commands in cmds folder
var cmdFiles = fs.readdirSync(__dirname + '/../cmds');
var cmds = [];
for (var i = 0; i < cmdFiles.length; i++){
  var filename = cmdFiles[i];
  var cmd = filename.replace(/\.js$/,"");
  cmds.push(cmd);
  exports[cmd] = require(__dirname + '/../cmds/' + filename);
}

exports.help = function(){
  h.print("\nAbee - Meteor Scaffolding\n");
  h.print("=========================\n");
  h.print("\n");
  h.print("usage: abee command [subcommand] [options]\n\n");
  h.print("commands:\n\n");
  var sortCmds = [];
  var helptxt  = {};
  for (var i = 0; i < cmds.length; i++){
    if (exports[cmds[i]].help){     
      for (var command in exports[cmds[i]].help){
        sortCmds.push(command);
        helptxt[command] = exports[cmds[i]].help[command].replace(/^/gm, "    ");
        //h.print("    "+ command+": \n" + helptxt + "\n");        
      }         
    }
  }
  sortCmds = sortCmds.sort()
  for (var i = 0; i < sortCmds.length; i++){
    h.print("    " + sortCmds[i] + ": \n" + helptxt[sortCmds[i]] + "\n");    
  }
}

exports.fetchAllCommand = function(){
  
}

  
