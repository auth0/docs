---
url: /rules
---

# Rules

Rules are code snippets written in JavaScript that are executed as part of the authentication pipeline in Auth0. This happens every time a user authenticates to an application. __Rules__ enable very powerful customizations and extensions to be easily added to Auth0.

![](https://docs.google.com/drawings/d/16W_hTS_u2CeDFXkD2PlfituFl7b74EQ6HE_XYn3TdD0/pub?w=891&amp;h=283)

An App initiates an authentication request to Auth0 (__Step 1__), Auth0 routes the request to an Identity Provider through a configured connection (__Step 2__). The user authenticates successfuly (__Step3__), the `user` object that represents the logged in user is passed through the rules pipeline and returned to the app (__Step 4__). Rules run on __Step 4__.

Here are a few examples. You could:

* Bring information from your own databases and add it to the user profile object.
* Create authorization rules based on complex logic (anything that can be written with node.js).
* Normalize attributes from different providers besides to what we provide out of the box.
* Reuse information from existing databases or APIs in migration scenarios.
* Keep a white-list of users in a file and deny access based on email.
* Have counters or other persisted information. For more information on how to do this check [this article](/metadata-in-rules).

__Auth0 Rules__ are implemented in JavaScript. Which means you don't have to learn an esoteric DSL. They run in their own sandbox to protect the core of Auth0's runtime. Even if you make a mistake and your code ends up in a tight loop for example, everything else will work just fine.

Notice you can chain rules together to keep functionality modular and easy to understand. __Rules__ can be turned on and off individually.

## The simplest example: a _Hello World_

This rule will add a `hello` attribute to all users authenticating through any provider.

    function (user, context, callback) {
      user.hello = 'world';
      console.log('===> set "hello" for ' + user.name);
      callback(null, user, context)
    }

> **HINT**: You can try the rule while editing and you can see the output and any `console.log` output. Useful for debugging ![](/media/articles/rules/index/rules.png)

A __Rule__ takes the following arguments:

#### user
The user object as it comes from the identity provider.

#### context
An object containing contextual information of the current authentication transaction. It has the following properties:

* `clientID`: the client id of the application the user is logging in to.
* `clientName`: the name of the application (as defined on the dashboard).
* `connection`: the name of the connection used to authenticate the user (e.g.: `twitter` or `some-google-apps-domain`)
* `connectionStrategy`: the type of connection. For social connection `connectionStrategy` === `connection`. For enterprise connections, the strategy will be `waad` (Windows Azure AD), `ad` (Active Directory/LDAP), `auth0` (database connections), etc.
* `jwtConfiguration`: an object to configure how Json Web Tokens (JWT) will be generated:
  * `lifetimeInSeconds`: expiration of the token.
  * `scopes`: predefined scopes values (e.g.: `{ 'images': ['picture', 'logo'] }` this scope value will request access to the picture and logo claims).
* `protocol`: the authentication protocol. Possible values: `oidc-basic-profile` (most used, web based login), `oidc-implicit-profile` (used on mobile devices and single page apps), `oauth2-resource-owner` (user/password login typically used on database connections), `samlp` (SAML protocol used on SaaS apps), `wsfed` (WS-Federation used on Microsoft products like Office365), `wstrust-usernamemixed` (WS-trust user/password login used on CRM and Office365), and `delegation` (when calling the [Delegation endpoint](/auth-api#delegated)).
* `request`: an object containing useful information of the request. It has the following properties:
  * `query`: querystring of the login transaction sent by the application
  * `body`: the body of the POST request on login transactions used on `oauth2-resource-owner` or `wstrust-usernamemixed` protocols.
  * `userAgent`: the user-agent of the client that is trying to log in.
  * `ip`: the originating IP address of the user trying to log in.
* `samlConfiguration`: an object that controls the behavior of the SAML and WS-Fed endpoints. Useful for advanced claims mapping and token enrichment (only available for `samlp` and `wsfed` protocol).
* `stats`: an object containing specific user stats, like `stats.loginsCount`.


> It is important to call the `callback` function which takes the `user` and `context` modified, otherwise the script will timeout (this is because of the async nature of node.js).

## Other examples

Here are some other common rules:

### Adding roles to a user

    function (user, context, callback) {
      user.roles = [];
      // only johnfoo is admin
      if (user.email === 'johnfoo@gmail.com') user.roles.push('admin');

      // all users are guest
      user.roles.push('guest');

      callback(null, user, context);
    }

All authenticated users will get a __guest__ role, but `johnfoo@gmail.com` will also be an __admin__.

John's `user` object at the beginning of the rules pipeline will be:

    {
      email: "johnfoo@gmail.com",
      family_name: "Foo",
      user_id: "google-oauth2|103547991597142817347"
      ... other props ...
    }

The `context` object will be:

      {
        clientID: "...client_id_of_the_app...",
        clientName: "my app",
        connection: "google-oauth2"
      }

After the rule executes, the output and what the application will receive is the following `user` object:

    {
      email: "johnfoo@gmail.com",
      family_name: "Foo",
      user_id: "google-oauth2|103547991597142817347",

      ... other props ...

      roles: ["guest", "admin"]  // NEW PROPERTY ADDED BY THE RULE
    }

### Deny access based on a condition

In addition to adding and removing properties from the user object, you can return an "access denied" error.

    function (user, context, callback) {
      if (user.roles.indexOf('admin') === -1) {
        return callback(new UnauthorizedError('Only admins can use this'));
      }

      callback(null, user, context);
    }


This will cause a redirect to your callback url with an `error` querystring parameter with the message you set. e.g.: `https://yourapp.com/callback?error=unauthorized&error_description=Only%20admins%20can%20use%20this`

We have an open source repository for common rules here:

<div style="font-size: 18px;border: 3px dashed #767677;padding: 16px;text-align: center;background-color: #FCFCFC;"><a target="_blank" href="https://github.com/auth0/rules">https://github.com/auth0/rules</a></div>

## Available Modules

The script runs in a JavaScript sandbox for security reasons. You can use the full power of the language (ECMAScript 5) and a few selected libraries. The current sandbox supports:

* [async](https://github.com/caolan/async) _(~0.1.22)_
* [azure_storage](https://github.com/Azure/azure-storage-node) _(~0.4.1)_
* [bcrypt](https://github.com/ncb000gt/node.bcrypt.js) _(~0.7.5)_
* [Buffer](http://nodejs.org/docs/v0.10.24/api/buffer.html)
* [couchbase](https://github.com/couchbase/couchnode) _(~1.2.1)_
* [crypto](http://nodejs.org/docs/v0.10.24/api/crypto.html)
* [ip](https://github.com/keverw/range_check) _(0.0.1)_
* [jwt](https://github.com/auth0/node-jsonwebtoken) _(~0.1.0)_
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
* [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) _(~0.2.8)_
* [xmldom](https://github.com/jindw/xmldom) _(~0.1.13)_
* [xpath](https://github.com/goto100/xpath) _(0.0.5)_
* [xtend](https://github.com/Raynos/xtend) _(~1.0.3)_

## Source Control with GitHub

You can maintain the source code of the rules through the Auth0 dashboard or integrate a GitHub repository with your Auth0 account. If you choose the GitHub integration route, the rules in your Auth0 account will be automatically updated whenever a change is submitted to the GitHub repository.

The GitHub repository must follow a prescriptive pattern of storing and naming your rules:

    /rules/{rule_name}.js

All rules must be stored as individual `*.js` files in the `/rules` directory. The name of the file excluding the extension corresponds to the name of the Auth0 rule.

To enable automatic integration of the GitHub repository with the configuration of your Auth0 account, you must add a [GitHub webhook](https://developer.github.com/webhooks/) to your repository. The webhook URL must be specified as follows:

    https://sandbox.it.auth0.com/auth0-webhook?webtask_no_cache&key=eyJhbGciOiJIUzI1NiIsImtpZCI6IjEifQ.eyJqdGkiOiIyZTMxN2NmMjMwZjg0YzIzYTJjMDRkODA4Zjg2MTQ4ZSIsImlhdCI6MTQyNTU4NDc5MiwidXJsIjoiaHR0cDovL2JpdC5seS8xQTF3a0MzIiwidGVuIjoiYXV0aDAtd2ViaG9vayJ9.0-q71r2-RizjCRqNJpU3mWVG_SrN52FJiXHYhTyHHCA&auth0_account={auth0_account}&auth0_client_id={auth0_client_id}&auth0_client_secret={auth0_client_secret}&branch={branch_name}

Take note you need to customize the value of the following URL query parameters:

* `auth0_account` (required) must specify your Auth0 account name  
* `auth0_client_id` (required) must specify the Auth0 client ID
* `auth0_client_secret` (required) must specify the Auth0 client secret  
* `branch` (optional) may secify the branch of the GitHub repository to integrate with Auth0 configuration; if not specified, `master` is assumed.  

Currently only public repositories are supported.

Once the webhook is configured in your GitHub repository, this is what you can expect:

* any deleted `/rules/*.js` file will result in deletion of the corresponding Auth0 rule,  
* any added or modified `/rules/*.js` file will result in adding or modifying of the corresponding Auth0 rule,  
* all added or modified rules are automatically enabled.

> Looking for something not listed here? Write to us at [support@auth0.com](mailto:support@auth0.com)
