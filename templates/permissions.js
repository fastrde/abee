{{collection}}.allow({
  insert: function (userId, doc) {
  	//return true to grant right to insert, false to revoke.
    return true;
  },
  update: function (userId, doc, fields, modifier) {
  	//return true to grant right to update, false to revoke.
    return true;
  },
  remove: function (userId, doc) {
  	//return true to grant right to remove, false to revoke.
    return true;
  }
});

{{collection}}.deny({
  update: function (userId, docs, fields, modifier) {
    return false;
  },
  remove: function (userId, doc) {
    return false;
  }
});
