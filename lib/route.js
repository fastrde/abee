var fs     = require('fs');

var routeFile = require('../dirs.js').routes;

var h      = require('./helper.js').helper;
var fsh    = require('./fshelper.js').fshelper;
var tplh   = require('./tplhelper.js').tplhelper;

var C      = require('../colors.js').colors;


exports.route = {
	/**
	 * Adds a route with link the url to the view
     * @param {Object} url
     * @param {Object} view
	 */
	add : function(url, view) {
		view = view || url.replace(/^\//, "");
		var display = url +" -> "+ view;

		var re = new RegExp("^}\\);$", "gm");

		var cnt = fs.readFileSync(routeFile).toString();
		cnt = cnt.replace(re, "  '"+url+"' : '"+view+"'\n});");
		fs.writeFileSync(routeFile, cnt);

		console.log("[+] added route " + C.GREEN + display + C.X);
	},
	/**
	 * Deletes the route that link the url to the view
     * @param {Object} url
     * @param {Object} view
	 */
	del : function(url, view){
		view = view || url.replace(/^\//, "");
		var display = url +" -> "+ view;
		var re = new RegExp("^\\s*'"+url+"'\\s*:\\s*'"+view+"'\\s*\n", "gm");

		var cnt = fs.readFileSync(routeFile).toString();

		if (cnt.match(re)){
			cnt = cnt.replace(re, "");
			fs.writeFileSync(routeFile, cnt);
			console.log("[-] removed route " + C.GREEN + display + C.X);
		}else{
			console.log("[#] route " + C.GREEN + display + C.X + " not found");
		}
	}
};
