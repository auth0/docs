# Using Auth0 in Ember.js applications

Read the [Single Page Application tutorial](singlepageapp-tutorial) to get an idea of how Auth0 works in this scenario. 

There is nothing in particular that needs to be done in Ember, other than instantiating the [widget](https://github.com/auth0/auth0-widget.js) or the [js wrapper](https://github.com/auth0/auth0.js). Once the user has been authenticated, you can save the profile in a cookie or local storage. The `id_token` can be used to call your APIs and flow the user identity.

Also, here is an [Ember.js example](https://github.com/kiwiupover/ember-auth0) for your reference. This example uses [auth0.js](https://github.com/auth0/auth0.js).
