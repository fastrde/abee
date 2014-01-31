class @{{Model}}

  transform = (data) -> new {{Model}}(data)

  @_collection: new Meteor.Collection('{{model}}', transform: transform)

  constructor: (data) ->

  id: -> @data._id

{{#each attr}}
  {{name}}: -> @data.{{name}}
  set{{Name}}: (val) -> @data.{{name}} = val
{{/each}}

