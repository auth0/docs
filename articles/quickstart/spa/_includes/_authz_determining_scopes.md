## Determine a User's Scopes

You can specify which scopes you want to request at the beginning of the login process. 
You can request the scopes when you create an instance of the `auth0.WebAuth` object. 
You can also request the scopes in the `options` object in the `authorize` method. 

If a scope you requested is available to the user, their access token receives a `scope` claim in the payload. The value of this claim is a string with all the granted scopes. 

You can use the scopes granted to a user to manage the behavior of your application's interface. 
Your application must treat the access token as opaque and must not decode it. This means that you cannot read the access token to see the scopes granted to the user. 

To get the scopes, you can use the value of the `scope` parameter that comes back after authentication. This parameter is a string containing all the scopes granted to the user, separated by spaces. This parameter will be populated only if the scopes granted to the user are different than those you requested. 

To see which scopes are granted to the user, check for the value of `authResult.scope`. The scopes granted to the user are in that value.
If there is no value for `authResult.scope`, all the requested scopes were granted.

You can use the scopes to make decisions about the behavior of your application's interface.