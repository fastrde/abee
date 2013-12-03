exports.help = {
	/**
	 * shows the help
	 */
	run : function() {
		console.log("Abee - Meteor Scaffolding");
		console.log("==================\n");
		console.log("usage: abee command [subcommand] [options]\n");
		console.log(" commands:");
		console.log(" create        creates an app like meteor does, but extends it with a \"best practice\" directory structure.");
		console.log("                 usage: abee create <appName>");
		console.log("");
		console.log(" help          prints this message.");
		console.log("                 usage: abee help");
		console.log("");
		console.log(" model         creates a model (adds a collection and some stuff).");
		console.log("                 usage: abee model add <modelName1> ... <modelNameN>");
		console.log("                        abee model remove <modelName1> ... <modelNameN>");
		console.log("                        abee model list");
		console.log("");

		console.log(" template      creates a template in the clients template (default: client/views) directory.");
		console.log("                 usage: abee template add <templateName1> ... <templateNameN> <templateGroup>");
		console.log("                 usage: abee template remove <templateName1> ... <templateNameN> <templateGroup>");
		console.log("                        abee template list");
		console.log("                 hint: insert a . as templateGroup to omit templateGroup");
		console.log("");
		console.log(" route         creates a route (automatically called after \"temlpate add\")");
		console.log("                 usage: abee route add <url1>[:<view1>] ... <urlN>[:<viewN>]");
		console.log("                        abee route remove <url1>[:<view1>] ... <urlN>[:<viewN>]");
		console.log("                        abee model list");
		console.log("");

		console.log(" view          same as template.");
		console.log("");
	},
	view: function() {
		console.log("Meteor Scaffolding");
		console.log("==================\n");
		console.log("usage: abee command [subcommand] options\n");
		console.log(" commands:");
		console.log(" create        creates an app like meteor does, but extends it with a \"best practice\" directory structure.");
		console.log(" help          prints this message.");
		console.log(" model         creates a model (adds a collection and some stuff).");
		console.log(" template      creates a template in the clients template (default: client/views) directory.");
		console.log(" view          same as template.");		
	}
};
