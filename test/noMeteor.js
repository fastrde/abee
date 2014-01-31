var fs      = require('fs');
var exec    = require('child_process').exec;
var expect = require("chai").expect;

var cmds = ['abeetize','collection','route','template','view'];

describe("noMeteor:", function() {
  before(function() {
    process.chdir("/tmp");
  });
  for (var cmd in cmds){
    it("'abee " + cmds[cmd] + "' should display '[E] Sorry, it's not a meteor application' in " + process.cwd(), function(done) {
      exec('abee ' + cmds[cmd], function(error, stdout, stderr) {
        expect(stdout).to.match(/not a meteor application/);
        done();
      });
    });
  }
});
