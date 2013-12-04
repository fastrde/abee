var h = require("./helper.js").helper;
exports.help = {
  /**
   * shows the help
   */
  run : function() {
    h.print("Abee - Meteor Scaffolding\n");
    h.print("=========================\n");
    h.print("\n");
    h.print("usage: abee command [subcommand] [options]\n");
    h.print(" commands:\n");
    h.print(" abeetize      extends your app with a \"best practice\" directory structure. Does nothing else.\n");
    h.print("                 usage: abee abeetize <appName>\n");
    h.print("\n");
    h.print(" create        creates an app like meteor does, but extends it with a \"best practice\" directory structure.\n");
    h.print("                 usage: abee create <appName>\n");
    h.print("\n");
    h.print(" help          prints this message.\n");
    h.print("                 usage: abee help\n");
    h.print("\n");
    h.print(" model         creates a model (adds a collection and some stuff).\n");
    h.print("                 usage: abee model add <modelName1> ... <modelNameN>\n");
    h.print("                        abee model remove <modelName1> ... <modelNameN>\n");
    h.print("                        abee model list");
    h.print("\n");
    h.print(" template      creates a template in the clients template (default: client/views) directory.\n");
    h.print("                 usage: abee template add <templateName1> ... <templateNameN> <templateGroup>\n");
    h.print("                 usage: abee template remove <templateName1> ... <templateNameN> <templateGroup>\n");
    h.print("                        abee template list\n");
    h.print("                 hint: insert a . as templateGroup to omit templateGroup\n");
    h.print("\n");
    h.print(" route         creates a route (automatically called after \"temlpate add\")\n");
    h.print("                 usage: abee route add <url1>[:<view1>] ... <urlN>[:<viewN>]\n");
    h.print("                        abee route remove <url1>[:<view1>] ... <urlN>[:<viewN>]\n");
    h.print("                        abee model list\n");
    h.print("\n");
    h.print(" view          same as template.\n");
    h.print("\n");
  }
};
