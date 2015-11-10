---
url: /rules
---

# Rules

Rules are code snippets written in JavaScript that are executed as part of the authentication pipeline in Auth0. This happens every time a user authenticates to an application. __Rules__ enable very powerful customizations and extensions to be easily added to Auth0.

![](https://docs.google.com/drawings/d/16W_hTS_u2CeDFXkD2PlfituFl7b74EQ6HE_XYn3TdD0/pub?w=891&amp;h=283)

An App initiates an authentication request to Auth0 (__Step 1__), Auth0 routes the request to an Identity Provider through a configured connection (__Step 2__). The user authenticates successfuly (__Step3__), the `user` object that represents the logged in user is passed through the rules pipeline and returned to the app (__Step 4__). Rules run on __Step 4__.

Here are a few examples. You could:

* Bring information from your own databases and add it to the user profile object.
* Create authorization rules based on complex logic (anything that can be written with JavaScript).
* Normalize attributes from different providers besides to what we provide out of the box.
* Reuse information from existing databases or APIs in migration scenarios.
* Keep a white-list of users in a file and deny access based on email.
* Have counters or other persisted information. For more information on how to do this check [this article](/metadata-in-rules).

> [You can find even more examples of rules on Github](https://github.com/auth0/rules).

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
* `protocol`: the authentication protocol. Possible values:
  * `oidc-basic-profile`: most used, web based login
  * `oidc-implicit-profile`: used on mobile devices and single page apps
  * `oauth2-resource-owner`: user/password login typically used on database connections
  * `oauth2-resource-owner-jwt-bearer`: login using a bearer JWT signed with user's private key
  * `samlp`: SAML protocol used on SaaS apps
  * `wsfed`: WS-Federation used on Microsoft products like Office365
  * `wstrust-usernamemixed`: WS-trust user/password login used on CRM and Office365
  * `delegation`: when calling the [Delegation endpoint](/auth-api#delegated)
  * `redirect-callback`: when a redirect rule is resumed
* `request`: an object containing useful information of the request. It has the following properties:
  * `query`: querystring of the login transaction sent by the application
  * `body`: the body of the POST request on login transactions used on `oauth2-resource-owner`, `oauth2-resource-owner-jwt-bearer` or `wstrust-usernamemixed` protocols.
  * `userAgent`: the user-agent of the client that is trying to log in.
  * `ip`: the originating IP address of the user trying to log in.
* `samlConfiguration`: an object that controls the behavior of the SAML and WS-Fed endpoints. Useful for advanced claims mapping and token enrichment (only available for `samlp` and `wsfed` protocol).
* `sso`: this object will contain information about the SSO transaction (if available)
  * `with_auth0`: when a user signs in with SSO to an application where the `Use Auth0 instead of the IdP to do Single Sign On` setting is enabled.
  * `with_dbconn`: an SSO login for a user that logged in through a database connection.
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

<div style="font-size: 18px;border: 3px dashed #767677;padding: 16px;text-align: center;background-color: #FCFCFC;"><a href="https://github.com/auth0/rules">https://github.com/auth0/rules</a></div>

## Available modules

The script runs in a JavaScript sandbox for security reasons which is based on [webtask.io](https://webtask.io). You can use the full power of the language (ECMAScript 5). The current sandbox supports:

<div style="font-size: 18px;border: 3px dashed #767677;padding: 16px;text-align: center;background-color: #FCFCFC;"><a href="https://tehsis.github.io/webtaskio-canirequire/">Modules Supported by the Sandbox</a></div>

## Further reading

* [Managing rules using source control with GitHub](source-control)
* [Redirecting users from within rules](rules/redirect)
