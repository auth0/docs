---
    Title: "Node under the hood"
---
# Node.js with Auth0 under the hood

As we mentioned in the [tutorial page](nodejs-tutorial), the easiest way of using Auth0 from a node app is through the excellent [passport module](http://passportjs.org). 

We've built a simple strategy for passport to make things easier.

> 'Strategy' is the name __passport__ gives to its plugins. This is the main extensibility point in the framework.

#####If Auth0 supports OAuth2, why do you have a custom strategy?

Most of the heavy lifting of OAuth2 is actually done by __passport__ for us. If you explore ther code for the Auth0 strategy you will see:

    ...
    OAuth2Strategy = require('passport-oauth').OAuth2Strategy,

and then:

    ...
    util.inherits(Strategy, OAuth2Strategy);
        
Ours is just a helper to automate URL handling and other parameters that Auth0 needs. Auth0 endpoints are:

    authorizationURL: 'https://' + @{account.namespace || 'SOME NAMESPACE'} + '/authorize',
    tokenURL:         'https://' + @{account.namespace || 'YOUR NAMESPACE'} + '/oauth/token',
    userInfoURL:      'https://' + @{account.namespace || 'YOUR NAMESPACE'} + '/userinfo',
    apiUrl:           'https://' + @{account.namespace || 'YOUR NAMESPACE'} + '/api'
        
Also, because you can have many connections to different identity providers (e.g. Google, Microsoft Account, Facebook, ADFS, etc), you can optionally pass a 'connection' parameter in the request. This instructs Auth0 where to redirect the user to for actual authentication.

The Auth0 strategy also includes a helper function for querying Auth0 of all your configured connections:

    Strategy.prototype.getConnections = function(done) {
        var self = this;
        this._getAccessToken(function (err, accessToken) {
        if (err) return done(err);

        request.get({
            url: self.options.apiUrl + '/connections',
            qs: { access_token: accessToken }
            }, function (err, r, body) {
                    if (err) { return done(err); }
                    try {
                        var json = JSON.parse(body);
                        done(null, json);
                    } catch(e) {
                    done(e);
                }
            });
        });
    };

This is a simple example of using the [Auth0 API](api-reference). This is especially convenient if you want to display a list of available login options on your website and have your users choose from that list.

Notice that this samples are using the _Authorization Code grant flow_ in OAuth2. You can read all about it [here](http://tools.ietf.org/html/rfc6749#section-4.1). 

In this flow, the "client" (your server) is requesting the access token from Auth0 using it's own credentials (the __clientId__ and __clientSecret__) _and_ the authorization code obtained when the user authenticated. 

There are other flows supported in Auth0 (and OAuth2) that are used for different clients. For node.js apps, this is probably the one you will be dealing with the most frequently with.