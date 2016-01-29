```javascript

var auth0 = new Auth0Client(
  "${account.namespace}",
  "${account.clientId}");

auth0.Login(function (err, result) {
  if (err) return err;
  /*
  Use result to do wonderful things, e.g.:
    - get user email => result.Profile.email
    - get facebook/google/twitter/etc access token => result.Profile.identities[0].access_token
    - get Windows Azure AD groups => result.Profile.groups
    - etc.
  */
});
```
