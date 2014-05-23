var fs      = require('fs');

var cmd     = require('../lib/cmdhelper.js');
var config  = require('../lib/config.js');
var fsh     = require('../lib/fshelper.js');
var h       = require('../lib/helper.js');
var C       = require('../lib/colors.js');

/********************************************************************************************* EXPORTS */


/**
 * adds multiple routes to the meteor app at once
 * @param {Object} routes
 */
var add = function(routes) {
  for (var i = 0; i < routes.length; i++) {
    var routeArray = routes[i];
    switch(routeArray.length){
      case 1:
        addOne(routeArray[0]);
      break;
      case 2:
        addOne(routeArray[0], routeArray[1]);
      break;
      case 3:
        addOne(routeArray[0], routeArray[1], routeArray[2]);
      break;
    }
  }
}; 

/**
 * adds a route to the meteor app
 * @param {Object} name
 * @param {Object} path
 * @param {Object} template
 */
var addOne = function() {
  switch (arguments.length){
    case 1:
      name     = arguments[0].replace(/^\/*/, "");
      path     = arguments[0].replace(/^\/*/, "/");
      template = arguments[0];
    break;
    case 2:
      name     = arguments[0].replace(/^\/*/, "");
      path     = arguments[0].replace(/^\/*/, "/");
      template = arguments[1];
    break;
    case 3:
      name     = arguments[0];
      path     = arguments[1];
      template = arguments[2];
    break;
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
