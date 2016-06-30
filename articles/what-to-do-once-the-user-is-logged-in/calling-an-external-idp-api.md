---
description: How to get an access token and call the Identity Provider API.
---

# Call an Identity Provider API


If you need to add more scopes/permissions to call an Idp API, see: [Add scopes/permissions to call Identity Provider's APIs](/what-to-do-once-the-user-is-logged-in/adding-scopes-for-an-external-idp) . 

For example, using Lock, you can execute the following code:

```js
lock.show(function(err, token, profile) {


  // Function to call Google's API with the accessToken
  getGoogleContactsWithToken(googleToken);
})
```

When you need to call an external IdP that uses OAuth, you can use a third-party library that does the work for you. A non-exhaustive list of such libraries is available at [OAuth 1 and 2 Libraries](http://oauth.net/code/).
