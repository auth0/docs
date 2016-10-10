---
section: appliance
description: the modules available when writing rules for the Appliance
---

# Node.js Modules Available in Rules and Custom Database Connections

For security reasons, rules and custom database connections for Auth0 appliances run in a JavaScript sandbox. You can use the full power of the ECMAScript 5 language and a few selected libraries.

The latest version of the appliance supports the use of three different modes:
* Webtask - This model has the same functionality as the Auth0 cloud version. It provides a balance between performance and isolation, supports a greater number of node modules, and is the recommended model for most customers;
* In process - This model executes within the Node.js process of the Auth0 service. This provides the best raw performance. The model provides no isolation between custom code and the Auth0 service, and supports only the limited set of modules listed below. The recommended approach for high scale is to allocate additional resources and use the Webtask model. In some very demanding conditions where isolation is not a concern, this model may be considered;
* Out-of-process - This is the original model that provides high isolation. It has significantly higher performance overhead compared to the other two models and supports the limited set of modules listed below.

The current sandbox supports:

* [async](https://github.com/caolan/async) _(~0.9.0)_
* [auth0](https://github.com/auth0/node-auth0) _(2.0.0-alpha.5)_
* [azure_storage](https://github.com/Azure/azure-storage-node) _(~0.4.1)_
* [bcrypt](https://github.com/ncb000gt/node.bcrypt.js) _(~0.8.3)_
* [Buffer](http://nodejs.org/docs/v0.10.24/api/buffer.html)
* [couchbase](https://github.com/couchbase/couchnode) _(~1.2.1)_
* [cql](https://github.com/jorgebay/node-cassandra-cql) _(~0.4.4)_
* [crypto](http://nodejs.org/docs/v0.10.24/api/crypto.html)
* [ip](https://github.com/keverw/range_check) _(0.0.1)_
* [jwt](https://github.com/auth0/node-jsonwebtoken) _(~0.4.1)_
* [knex](http://knexjs.org) _(~0.6.3)_
 * The function returned by `require('knex')` is available as `Knex`.
* [lodash](https://github.com/lodash/lodash) _(~2.4.1)_
* [mongo](https://github.com/mongodb/node-mongodb-native) _(~1.3.15)_
 * [BSON](http://mongodb.github.io/node-mongodb-native/api-bson-generated/bson.html)
 * [Double](http://mongodb.github.io/node-mongodb-native/api-bson-generated/double.html)
 * [Long](http://mongodb.github.io/node-mongodb-native/api-bson-generated/long.html)
 * [ObjectID](http://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html)
 * [Timestamp](http://mongodb.github.io/node-mongodb-native/api-bson-generated/timestamp.html)
* [mysql](https://github.com/felixge/node-mysql) _(~2.0.0-alpha8)_
* [pbkdf2](https://github.com/davidmurdoch/easy-pbkdf2) _(0.0.2)_
* [pg](https://github.com/brianc/node-postgres) _(4.1.1)_
* [pubnub](https://github.com/pubnub/javascript/tree/master/node.js) _(3.7.0)_
* [q](https://github.com/kriskowal/q) _(~1.0.1)_
* [querystring](http://nodejs.org/api/querystring.html) _(0.10.28)_
* [request](https://github.com/mikeal/request) _(~2.27.0)_
* [sqlserver](https://github.com/pekim/tedious) _(~0.1.4)_
* [uuid](https://github.com/broofa/node-uuid) _(~2.0.1)_
* [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) _(~0.2.8)_
* [xmldom](https://github.com/jindw/xmldom) _(~0.1.13)_
* [xpath](https://github.com/goto100/xpath) _(0.0.5)_
* [xtend](https://github.com/Raynos/xtend) _(~1.0.3)_
