Meteor.publish "{{model}}", ->
  {{Model}}._collection.find()

