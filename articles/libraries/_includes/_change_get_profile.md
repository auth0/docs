
### Change Calls to .getProfile()

The deprecated `getProfile()` function was reimplemented in Auth0.js v9. The previous implementation received an `id_token` as a parameter and returned the user profile. 

The new implementation requires is to be invoked with an `access_token` parameter.
