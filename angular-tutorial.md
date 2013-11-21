# Using Auth0 in Angular.js applications

Read the [Single Page Application tutorial](singlepageapp-tutorial) to get an idea of how Auth0 works in this scenario. 

There is nothing in particular that needs to be done in Angular, other than instantiating the [widget](https://github.com/auth0/auth0-widget.js) or the [js wrapper]([widget](https://github.com/auth0/auth0.js)). Once the user has been authenticated, you can save the profile in a cookie/local storage/root scope. The `id_token` can be used to call your APIs and flow the user identity.