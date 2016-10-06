---
description: Getting and using a refresh token with Lock.
---

<%= include('../_includes/_lock-version-9') %>

# Lock: Refresh tokens

Mostly when building mobile apps, we want to show the signin page only once and then leave the user logged in forever. For those cases, it makes sense to have a `refreshToken`. A `refreshToken` lets us get a new `id_token` (`JWT`) anytime we want.

> **Warning**: This means that if the `refreshToken` gets compromised, unless we revoke that token, somebody would be able to get a new JWT forever.

### 1. Getting the Refresh Token

In order to be able to get the refresh token, all we need to do is add the scope `offline_access` when calling the `showSignin` or `showSignup` method. Optionally, we can specify a `device` name so that the user knows which device has a Refresh Token created. If not set, it'll be automatically calculated for you.

````js
lock.showSignin({
  authParams: {
    scope: 'openid offline_access',
    // The following is optional
    device: 'Chrome browser'
  }
});
````

If using popup mode, use the `refresh_token` returned in the callback:

```js
lock.showSignin({
  authParams: {
    scope: 'openid offline_access'
  }
}, function (err, profile, id_token, access_token, state, refresh_token) {
  // store refresh_token
});
```

### 2. Using the refreshToken

Now, you can use the `refreshToken` to get a new JWT whenever you want:

````js
lock.getClient().refreshToken(refresh_token, function (err, delegationResult) {
  // Get here the new JWT via delegationResult.id_token
});
````
