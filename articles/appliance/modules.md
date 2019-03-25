---
section: appliance
description: For security reasons, rules and custom database connections for PSaaS Appliance run in a JavaScript sandbox. You can use the full power of the ECMAScript 5 language and a few selected libraries.
topics:
    - appliance
    - js-modules
    - sandbox
contentType: reference
useCase: appliance
applianceId: appliance60
sitemap: false
---

# Node.js Modules Available in Rules and Custom Database Connections

For security reasons, you must execute rules and custom database logic for PSaaS Appliance using [the Webtask stage/sandbox](/appliance/webtasks). The sandbox offers you a performant environment running ECMAScript 6 and provides isolation for the code you've written.

The current sandbox supports:

| Module | Version (If Applicable) | Notes |
| - | - | - |
| [async](https://github.com/caolan/async) | ~2.1.2 |  |
| [auth0](https://github.com/auth0/node-auth0) | 2.13.0 | 2.13.0 |
| [bcrypt](https://github.com/ncb000gt/node.bcrypt.js) | ~3.0.0 |  |
| [Buffer](http://nodejs.org/docs/v0.10.24/api/buffer.html) |  |  |
| [cql](https://github.com/jorgebay/node-cassandra-cql) |  ~0.4.4 |  |
| [crypto](http://nodejs.org/docs/v0.10.24/api/crypto.html) |  |  |
| [ip](https://github.com/keverw/range_check) | 0.3.2 |  |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | ~7.1.9 |  |
| [knex](http://knexjs.org) | ~0.8.6 | The function returned by `require('knex')` is available as `Knex`. |
| [lodash](https://github.com/lodash/lodash) | ~4.17.10 |  |
| [node-mongodb-native](https://github.com/mongodb/node-mongodb-native) | ~2.0.33 |  |
| [node-mongodb-native - BSON](http://mongodb.github.io/node-mongodb-native/api-bson-generated/bson.html) | 0.3.2 |  |
| [node-mongodb-native - Double](http://mongodb.github.io/node-mongodb-native/api-bson-generated/double.html) |  |  |
| [node-mongodb-native - Long](http://mongodb.github.io/node-mongodb-native/api-bson-generated/long.html) |  |  |
| [node-mongodb-native - ObjectID](http://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html) |  |  |
| [node-mongodb-native - Timestamp](http://mongodb.github.io/node-mongodb-native/api-bson-generated/timestamp.html) |  |  |
| [mysql](https://github.com/felixge/node-mysql) | ~2.15.0 |  |
| [pbkdf2](https://github.com/davidmurdoch/easy-pbkdf2) | 0.0.2 |  |
| [pg](https://github.com/brianc/node-postgres) | 6.1.2 |  |
| [pubnub](https://github.com/pubnub/javascript/tree/master/node.js) | 3.7.11 |  |
| [q](https://github.com/kriskowal/q) | ~1.4.1 |  |
| [querystring](http://nodejs.org/api/querystring.html) | 0.2.0 |  |
| [request](https://github.com/mikeal/request) | ~2.81.0 |  |
| [uuid](https://github.com/kelektiv/node-uuid) | ~3.3.2 |  |
| [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) | ~0.11.2 |  |
| [xmldom](https://github.com/jindw/xmldom) | ~0.1.13 |  |
| [xpath](https://github.com/goto100/xpath) | 0.0.9 |  |
| [xtend](https://github.com/Raynos/xtend) | ~4.0.0 |  |