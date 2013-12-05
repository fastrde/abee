var fs         = require('fs');
var Handlebars = require('handlebars');

var h          = require('./helper.js');

module.exports = {
  /**
   * try to fetch the templates given in tpls returns the first found template filled with data
   * @param {Object} tpls
   * @param {Object} data
   */
  fetch : function(tpls, data) {
    var config     = require('./config.js');
  	var templates = [];  	
  	for (var i = 0; i < tpls.length; i++) {
  		templates.push(__dirname + "/../templates/" + config.get('name') + "/" + tpls[i]);
  	}
  	for (var i = 0; i < tpls.length; i++) {
  		templates.push(__dirname + "/../templates/" + tpls[i]);
  	} 	

    for (var i = 0; i < templates.length; i++) {
      try {
        var source = fs.readFileSync(templates[i]).toString();  
        try {
          var template = Handlebars.compile(source);
          return template(data);
        } catch(e) {
          console.log(e);
        }
      } catch(e) {
		//console.log(templates[i] + " no found");
      }
    }
    return "// NO TEMPLATE FOUND. GENERATED EMPTY FILE.";
  },
  replace: function(source, data){
    var template = Handlebars.compile(source);
    return template(data);
  }
};


