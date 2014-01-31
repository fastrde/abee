var fs = require('fs');
var exec = require('child_process').exec;
var expect = require("chai").expect;



describe("createApp:", function() {
  before(function() {
    process.chdir("/tmp");
  });
  it("abee create testApp" + " should generate a new abeetized meteor app in " + process.cwd(), function(done) {
    exec("abee create testApp", function(error, stdout, stderr) {
      fs.statSync("/tmp/testApp/.abee/config.js");
      done();
    });
  });
});

describe("collections:", function() {
  before(function(done) {
    process.chdir("/tmp/testApp");
    done();
  });
  it("abee collection add col1 col2 [attr1,attr2,attr3] col3 col4" + " should generate a few collections", function(done) {
    exec("abee collection add col1 col2 [attr1,attr2,attr3] col3 col4", function(error, stdout, stderr) {
      fs.statSync("lib/models/col1Model.js");
      fs.statSync("client/lib/meteor/subscriptions/col1Subscription.js");
      fs.statSync("server/publications/col1Publish.js");
      fs.statSync("server/permissions/col1Permissions.js");

      fs.statSync("lib/models/col2Model.js");
      fs.statSync("client/lib/meteor/subscriptions/col2Subscription.js");
      fs.statSync("server/publications/col2Publish.js");
      fs.statSync("server/permissions/col2Permissions.js");

      fs.statSync("lib/models/col3Model.js");
      fs.statSync("client/lib/meteor/subscriptions/col3Subscription.js");
      fs.statSync("server/publications/col3Publish.js");
      fs.statSync("server/permissions/col3Permissions.js");

      fs.statSync("lib/models/col4Model.js");
      fs.statSync("client/lib/meteor/subscriptions/col4Subscription.js");
      fs.statSync("server/publications/col4Publish.js");
      fs.statSync("server/permissions/col4Permissions.js");
      done();
    });
  });
});

describe("views:", function() {
  before(function(done) {
    process.chdir("/tmp/testApp");
    done();
  });
  it("abee template add view1 view2 view3" + " should generate a few views", function(done) {
    exec("abee template add view1 view2 view3", function(error, stdout, stderr) {
      fs.statSync("client/views/view1.html");
      fs.statSync("client/views/view1.js");
      fs.statSync("client/views/view2.html");
      fs.statSync("client/views/view2.js");
      fs.statSync("client/views/view3.html");
      fs.statSync("client/views/view3.js");
      done();
    });
  });
  it("abee template add -g dir1 view1 view2 view3" + " should generate a few views in dir1", function(done) {
    exec("abee template add -g dir1 view1 view2 view3", function(error, stdout, stderr) {
      fs.statSync("client/views/dir1/view1.html");
      fs.statSync("client/views/dir1/view1.js");
      fs.statSync("client/views/dir1/view2.html");
      fs.statSync("client/views/dir1/view2.js");
      fs.statSync("client/views/dir1/view3.html");
      fs.statSync("client/views/dir1/view3.js");
      done();
    });
  });
});
