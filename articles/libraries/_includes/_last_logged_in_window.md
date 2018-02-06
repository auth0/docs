### Last time you logged in with window with authorization code flow

Lock 11 will never show the **Last time you logged in with** window when using the [Authorization Code Flow](/api-auth/grant/authorization-code) (that is, when specifying `response_type='code'`). It will always prompt for credentials.

If you want to avoid showing the Lock dialog when there's an existing session in the server, you can use Auth0.js's [checkSession()](/libraries/auth0js#using-checksession-to-acquire-new-tokens) function.
