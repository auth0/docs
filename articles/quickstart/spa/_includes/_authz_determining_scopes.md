## Determining a User's Scopes

You can specify which scopes to request at the beginning of a login process. 
You can request the scopes when you create an instance of the `auth0.WebAuth` object. Alternatively, you can request the scopes in an `options` object in the `authorize` method. 

If a scope you requested is available for the user, their access token receives a `scope` claim in the payload. The value of this claim is a string with all granted scopes. 

You can use the scopes granted for a user to manage how the interface in your application behaves. 
Your application must treat the access token as opaque in and not decode it. This measn that you cannot read the access token to see the scopes granted for the user. 

To get the scopes, you can use the value of the `scope` parameter that comes back after authentication. This parameter is a string containing all the scopes granted for the user, separated by spaces. This parameter will be populated only if the scopes granted for the user are different than those you requested. 

To see which scopes are granted for the user: 
1. Check for the value of `authResult.scope`. The scopes granted for the user are in that value.
2. If there is no value for `authResult.scope`, all the requested scopes were granted.

You can use the scopes to make decisions about the behavior of your application's interface.