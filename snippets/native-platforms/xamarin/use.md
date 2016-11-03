```cs
// 'this' could be a Context object (Android) or UIViewController, UIView, UIBarButtonItem (iOS)
var user = await auth0.LoginAsync(this);
/*
- get user email => user.Profile["email"].ToString()
- get Windows Azure AD groups => user.Profile["groups"]
- etc.
*/
```
