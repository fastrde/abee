var fs      = require('fs');
var exec    = require('child_process').exec;
var expect = require("chai").expect;

var cmds = ['abee', 'abee help', 'abee create'];

describe("help:", function() {
  before(function() {
    process.chdir("/tmp");
  });
  for (var cmd in cmds){
  it("'" + cmds[cmd] + "' should display the help", function(done) {
    exec(cmds[cmd], function(error, stdout, stderr) {
      expect(stdout).to.match(/^\nAbee - Meteor Scaffolding/);
      done();
    });
  });
  }
});
