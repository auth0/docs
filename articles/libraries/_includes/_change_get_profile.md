### Change calls to getProfile()

The deprecated `getProfile()` function was reimplemented in Lock 11. The previous implementation received an [ID Token](/tokens/id-token) as a parameter and returned the user profile. 

The new implementation requires an [Access Token](/tokens/concepts/overview-access-tokens) parameter instead.
