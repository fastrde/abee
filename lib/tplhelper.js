var fs         = require('fs');
var h          = require('./helper.js').helper;
var Handlebars = require('handlebars');

exports.tplhelper = {
  /**
   * try to fetch the templates given in tpls returns the first found template filled with data
   * @param {Object} tpls
   * @param {Object} data
   */
  fetch : function(tpls, data) {
    for (var i = 0; i < tpls.length; i++) {
      try {
        var source = fs.readFileSync(__dirname + "/../templates/" + tpls[i]).toString();
        try {
          var template = Handlebars.compile(source);
          return template(data);
        } catch(e) {
          console.log(e);
        }
      } catch(e) {

      }
    }
    return "// NO TEMPLATE FOUND. GENERATED EMPTY FILE.";
  }
};


