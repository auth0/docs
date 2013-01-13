# Node.js with Auth0 under the hood

As we mentioned in the [tutorial page](nodejs-tutorial), the easiest way of using Auth0 from a node app is through the excellent [passport module](http://passportjs.org). 

We've built a [simple strategy for passport](https://github.com/auth0/passport-auth0) to make things easier.

> 'Strategy' is the name __passport__ gives to its plugins. This is the main extensibility point in the framework.

#####If Auth0 supports OAuth2, why do you have a custom strategy?

Most of the heavy lifting of OAuth2 is actually done by __passport__ for us. If you explore ther code for the Auth0 strategy you will see:

    ...
    OAuth2Strategy = require('passport-oauth').OAuth2Strategy,

and then:

    ...
    util.inherits(Strategy, OAuth2Strategy);
        
Ours is just a helper to automate URL handling and other parameters that Auth0 needs. Auth0 endpoints are:


    authorizationURL: 'https://' + @@account.namespace@@ + '/authorize',
    tokenURL:         'https://' + @@account.namespace@@ + '/oauth/token',
    userInfoURL:      'https://' + @@account.namespace@@ + '/userinfo',
    apiUrl:           'https://' + @@account.namespace@@ + '/api'
        
Also, because you can have many connections to different identity providers (e.g. Google, Microsoft Account, Facebook, ADFS, etc), you can optionally 'connection' parameter in the request. This instructs Auth0 where to redirect the user to for actual authentication.

These are the basics of login in to your node.js app through Auth0. You might also want to check the [API](api-reference) for more interesting operations. There's a simple [node module](node-auth0client) we put together for you.