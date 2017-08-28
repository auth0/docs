Check for the scopes granted to the user. 

First, check for the scopes in the `scope` key from `authResult`.
If you find values in this key, the scopes granted to the user are different than the ones you requested. 
If you don't find any values in the `authResult.scope` key, all the scopes you requested were granted. Use the scopes you initially requested.

In the `setSession` method, save the scopes granted to the user into local storage. 
