var fs      = require('fs');

var cmd     = require('../lib/cmdhelper.js');
var config  = require('../lib/config.js');
var h       = require('../lib/helper.js');
var fsh     = require('../lib/fshelper.js');
var tplh    = require('../lib/tplhelper.js');
var C       = require('../lib/colors.js');
 

/********************************************************************************************* EXPORTS */

/**
 * adds a model with the given attributes to the meteor app
 * @param {Object} filename name of the collection
 * @param {Object} attr attributes of the collection (getter/setter generated for these)
 */
var add = function(filename, attr) {
  // prepare attributes for Handlebars
  var attrParsed = [];
  if (attr) {
    for (var i = 0; i < attr.length; i++) {
      attrParsed.push({
        name : attr[i],
        Name : h.capitalize(attr[i]),
        Model : h.capitalize(filename),
        model : filename.toLowerCase()
      });
    }
  }
  // parse config-section model and do what it says
  cmd.addFromConfig(config.get('collection'), {
    filename : filename
  }, {
    Model : h.capitalize(filename),
    model : filename.toLowerCase(),
    attr : attrParsed,
    collection : h.capitalize(filename) + "Collection",
  });
}; 
  /**
   * deletes the model with the the name "filename"
   * @param {String} filename name of collection to delete
   */

var del = function(filename){
    cmd.delFromConfig(config.get('collection'), {filename: filename});
};
 
module.exports = {
  add : add, 
  del : del,
  help : {'collection': "adds/removes a collection.\n"+
                        "\n"+
                        "  usage: \n"+
                        "    abee collection add <collectionName1> [attr1,...,attrN] <collectionName2> [attr1,...,attrN] ... <collectionNameN>\n"+
                        "    abee collection remove <collectionName1> ... <collectionNameN>\n" +
                        "\n"+
                        "  example: \n"+
                        "    abee collection add person [name,firstname,age] car [engine] collectionWithNoAttributes nextCollection\n" +
                        "    abee collection remove person car collectionWithNoAttributes nextCollection\n"+
                        "\n"
         }
};
