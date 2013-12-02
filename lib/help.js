exports.help = {
	/**
	 * shows the help
	 */
	run : function() {
		console.log("Meteor Scaffolding");
		console.log("==================\n");
		console.log("usage: mts command [subcommand] [options]\n");
		console.log(" commands:");
		console.log(" create        creates an app like meteor does, but extends it with a \"best practice\" directory structure.");
		console.log("                 usage: mts create <appName>");
		console.log("");
		console.log(" help          prints this message.");
		console.log("                 usage: mts help");
		console.log("");
		console.log(" model         creates a model (adds a collection and some stuff).");
		console.log("                 usage: mts model add <modelName1> ... <modelNameN>");
		console.log("                        mts model remove <modelName1> ... <modelNameN>");
		console.log("                        mts model list");
		console.log("");

		console.log(" template      creates a template in the clients template (default: client/views) directory.");
		console.log("                 usage: mts template add <templateName1> ... <templateNameN> <templateGroup>");
		console.log("                 usage: mts template remove <templateName1> ... <templateNameN> <templateGroup>");
		console.log("                        mts template list");
		console.log("                 hint: insert a . as templateGroup to omit templateGroup");
		console.log("");
		console.log(" route         creates a route (automatically called after \"temlpate add\")");
		console.log("                 usage: mts route add <url1>[:<view1>] ... <urlN>[:<viewN>]");
		console.log("                        mts route remove <url1>[:<view1>] ... <urlN>[:<viewN>]");
		console.log("                        mts model list");
		console.log("");

		console.log(" view          same as template.");
		console.log("");
	},
	view: function() {
		console.log("Meteor Scaffolding");
		console.log("==================\n");
		console.log("usage: mts command [subcommand] options\n");
		console.log(" commands:");
		console.log(" create        creates an app like meteor does, but extends it with a \"best practice\" directory structure.");
		console.log(" help          prints this message.");
		console.log(" model         creates a model (adds a collection and some stuff).");
		console.log(" template      creates a template in the clients template (default: client/views) directory.");
		console.log(" view          same as template.");		
	}
};
