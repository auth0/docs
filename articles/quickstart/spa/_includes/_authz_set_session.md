Add a `setSession` method to save the scopes granted to the user into browser storage. 

First, check for the scopes in the `scope` key from `authResult`. If it's not empty, the user was granted a different set of scopes than the one the application requested, so you need to use the ones in `authResult.scope`.

If it's empty, all the scopes requested were granted, so you can use the values from the variable that stores the requested scopes.