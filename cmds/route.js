var fs      = require('fs');

var cmd     = require('../lib/cmdhelper.js');
var config  = require('../lib/config.js');
var fsh     = require('../lib/fshelper.js');
var h       = require('../lib/helper.js');
var C       = require('../lib/colors.js');

/********************************************************************************************* EXPORTS */

/**
 * adds a route with the given to the meteor app
 * @param {Object} model
 * @param {Object} attr
 */
var add = function(name, path, template) {
  if (!path) {
    template = name;
    path = name.replace(/^\/*/, "/");
    name = name.replace(/^\/*/, "");
  } else if (!template) {
    template = path;
    path = name.replace(/^\/*/, "/");
    name = name.replace(/^\/*/, "");
  }
  cmd.addFromConfig(config.get('route'), {
    name : name
  }, {
    name : name,
    path : path,
    template : template
  });
};

module.exports = {
  add : add,
  help : {'route': "creates a route\n" +
                   "  usage: \n" +
                   "    abee route add [<name1>,]<path1>[,<template1>] ... [<nameN>,]<pathN>[,<templateN>]\n" +
                   "\n" +
                   "  example: \n" +
                   "    abee route add myHome,/home,firstPage\n" +
                   "    abee route add /home\n" +
                   "\n" +
                   "  'abee route remove' is not supported at the moment.\n" +
                   "\n"
                   
                   
                   
                  
  }
};
