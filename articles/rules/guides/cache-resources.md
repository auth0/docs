---
description: How to cache expensive resources in your Rules code.
topics:
  - rules
  - extensibility
  - cache
contentType: how-to
useCase: extensibility-rules
---

# Cache Expensive Resources in Rules

In Rules you can store expensive resources using the `global` object. The `global` object survives individual execution, so you can reuse things stored there instead of creating them every time a Rule is run. However, the Rules environment can be recycled at any time so your code __must__ always check that `global` contains what you expect.

This example shows how to use the `global` object to keep a [MongoDB](https://www.mongodb.com/) connection:

```js
//If the db object is there, use it.
if (global.db){
  return query(global.db, callback);
}

//If not, get the db (mongodb in this case)
mongo('mongodb://user:pass@mymongoserver.com/my-db',  function (db){
  global.db = db;
  return query(db, callback);
});

//Do the actual work
function query(db, cb){
  // Do something with db
  ...
  return cb(null, user, context);
}
```
