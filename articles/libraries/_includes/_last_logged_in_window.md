### Last time you logged in with window with authorization code flow

Lock 11 will never show the **Last time you logged in with** window when using the [Authorization Code Flow](/api-auth/grant/authorization-code) (that is, when specifying `response_type='code'`). It will always prompt for credentials.

The **Last time you logged in with** window will also never do a redirect when you use a database connection (username and password), even when the `redirect` option is set to `true`. Lock11 still emits the `authenticated` event and you should subscribe to that event to [get the authentication result](https://auth0.com/docs/libraries/lock/v11#2-authenticating-and-getting-user-info).

If you want to avoid showing the Lock dialog when there's an existing session in the server, you can use Auth0.js's [checkSession()](/libraries/auth0js#using-checksession-to-acquire-new-tokens) function.
