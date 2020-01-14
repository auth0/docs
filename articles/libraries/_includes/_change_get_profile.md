### Change calls to getProfile()

The deprecated `getProfile()` function was reimplemented in Lock 11. The previous implementation received an [ID Token](/tokens/concepts/id-tokens) as a parameter and returned the user profile. 

The new implementation requires an <dfn data-key="access-token">Access Token</dfn> parameter instead.
