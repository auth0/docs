### Determine a User's Scopes

You can use scopes to make decisions about the behavior of your application's interface.

You can specify which scopes you want to request at the beginning of the login process.

If a scope you requested is available to the user, their Access Token receives a `scope` claim in the payload. The value of this claim is a string with all the granted scopes, but your application must treat the Access Token as opaque and must not decode it. This means that you cannot read the Access Token to access the scopes. 

To get the scopes, you can use the value of the `scope` parameter that comes back after authentication. This parameter is a string containing all the scopes granted to the user, separated by spaces. This parameter will be populated only if the scopes granted to the user are different than those you requested. 

To see which scopes are granted to the user, check for the value of `authResult.scope`. If there is no value for `authResult.scope`, all the requested scopes were granted.