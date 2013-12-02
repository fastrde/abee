Meteor.publish("{{model}}", function () {
  return {{collection}}.find({});
});

