```cs
var user = await auth0.LoginAsync();
/*
    Use this object to do wonderful things, e.g.:
      - get user email => user.Profile["email"].ToString()
      - get facebook/google/twitter/etc access token => user.Profile["identities"][0]["access_token"]
      - get Windows Azure AD groups => user.Profile["groups"]
      - etc.
*/
```
