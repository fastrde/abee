{{Model}}._collection.allow
  insert: (userId, doc) ->
    #return true to grant right to insert, false to revoke.
    true

  update: (userId, doc, fields, modifier) ->
    #return true to grant right to update, false to revoke.
    true

  remove: (userId, doc) ->
    #return true to grant right to remove, false to revoke.
    true

{{Model}}._collection.deny
  update: (userId, docs, fields, modifier) ->
    false

  remove: (userId, doc) ->
    false
