# Rules

Rules are code snippets written in JavaScript that are executed as part of the authentication pipeline in Auth0. This happens every time a user authenticates to an application. __Rules__ enable very powerful customizations and extensions to be easily added to Auth0.

![](img/rules-pipeline.png)

An App initiates an authentication request to Auth0 (__Step 1__), Auth0 routes the request to an Identity Provider through a configured connection (__Step 2__). The user authenticates successfuly (__Step3__), the `user` object that represents the logged in user is the passed through the rules pipeline and returned to the app (__Step 4__). Rules run on __Step 4__.

Here are a few examples. You could:

* Bring information from your own databases and add it to the user profile object.
* Create authorization rules based on complex logic (anything that can be written with node.js).
* Normalize attributes from different providers besides to what we provide out of the box.
* Reuse information from existing databases or APIs in migration scenarios.
* Keep a white-list of users in a file and deny access based on email.
* Have counters or other persisted information.

__Auth0 Rules__ are implemented in JavaScript. Which means you don't have to learn an esoteric DSL. They run in their own sandbox to protect the core of Auth0's runtime. Even if you make a mistake and your code ends up in a tight loop for example, everything else will work just fine.

Notice you can chain rules together to keep functionality modular and easy to understand. __Rules__ can be turned on and off individually.

## The simplest example: a _Hello World_

This rule will add a `hello` attribute to all users authenticating through any provider.

    function (user, context, callback) {
      user.hello = 'world';
      console.log('===> set "hello" for ' + user.name);
      callback(null, user, context)
    }

> **HINT**: You can try the rule while editing and you can see the output and any `console.log` output. Useful for debugging ![](img/rules.png)

A __Rule__ takes the following arguments:

* `user`: the user object as it comes from the identity provider.
* `context`: an object containing contextual information of the current authentication transaction. It has the following properties:
  * `clientID`: the client id of the application the user is logging in to.
  * `clientName`: the name of the application (as defined on the dashboard).
  * `connection`: the name of the connection used to authenticate the user (e.g.: `twitter` or `some-google-apps-domain`)
  * `connectionStrategy`: the type of connection. For social connection `connectionStrategy` === `connection`. For enterprise connections, the strategy will be `waad` (Windows Azure AD), `ad` (Active Directory/LDAP), `auth0` (database connections), etc.
  * `protocol`: the authentication protocol. Possible values: `oidc-basic-profile` (most used, web based login), `oidc-implicit-profile` (used on mobile devices and single page apps), `oauth2-resource-owner` (user/password login typically used on database connections), `samlp` (SAML protocol used on SaaS apps), `wsfed` (Ws-Federation used on Microsoft products like Office365), `wstrust-usernamemixed` (Ws-trust user/password login used on CRM and Office365)).
  * `request`: an object containing useful information of the request. It has the following properties:
    * `query`: querystring of the login transaction sent by the application
    * `body`: the body of the POST request on login transactions used on `oauth2-resource-owner` or `wstrust-usernamemixed` protocols.
    * `userAgent`: the user-agent of the client that is trying to log in.
    * `ip`: the originating IP address of the user trying to log in.
  * `samlConfiguration`: an object that controls the behavior of the SAML and WS-Fed endpoints. Useful for advanced claims mapping and token enrichment (only available for `samlp` and `wsfed` protocol).
  

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


This will cause a redirect to your callback url with an `error` querystring parameter with the message you set. e.g.: `https://yourapp.com/callback?error=Only%20admins%20can%20use%20this`

We have an open source repository for common rules here: 

<div style="font-size: 18px;border: 3px dashed #767677;padding: 16px;text-align: center;background-color: #FCFCFC;"><a target="_blank" href="https://github.com/auth0/rules">https://github.com/auth0/rules</a></div>

## Available Modules

The script runs in a JavaScript sandbox for security reasons. You can use the full power of the language (ECMAScript 5) and a few selected libraries. The current sandbox supports:

* [async](https://github.com/caolan/async)
* [request](https://github.com/mikeal/request)
* [sqlserver](https://github.com/pekim/tedious)
* [mongo](https://github.com/mongodb/node-mongodb-native)
* [mysql](https://github.com/felixge/node-mysql)
* [crypto](http://nodejs.org/docs/v0.8.23/api/crypto.html)
* [xmldom](https://github.com/jindw/xmldom)
* [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js)
* [xpath](https://github.com/goto100/xpath)
* [bcrypt](https://github.com/ncb000gt/node.bcrypt.js)
* [pbkdf2](https://github.com/davidmurdoch/easy-pbkdf2)
* [Buffer](http://nodejs.org/api/buffer.html)

> Looking for something not listed here? Write us to [support@auth0.com](mailto:support@auth0.com)
