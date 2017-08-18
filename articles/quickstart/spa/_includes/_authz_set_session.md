Check for the scopes granted for the user. 

First, check for these values in the `scope` key from `authResult`.
If you find scopes in this key, the scopes granted for the user are different than the ones you requested. Use these values in the `setSession` method.
If you don't find anything in the `authResult.scope` key, all the scopes you requested were granted. Use the scopes you requested in the `setSession` method. 

In the `setSession` method, save the scopes granted for the user into local storage. 