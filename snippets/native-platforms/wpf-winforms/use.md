```cs
var user = await auth0.LoginAsync(this);
/*
    Use this object to do wonderful things, e.g.:
      - get user email => user.Profile["email"].ToString()
      - get Windows Azure AD groups => user.Profile["groups"]
      - etc.
*/
```
