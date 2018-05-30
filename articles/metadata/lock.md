---
description: How to read and update user metadata with Lock.
crews: crew-2
tags:
  - metadata
  - lock
---

# How to use Metadata with Lock Library

This article describes how you can define and update the user's `user_metadata`, using Auth0's [Lock](/libraries/lock) library. If you are not familiar with `user_metadata`, refer to [User Metadata](/metadata). If you need more details on how to install, initialize and use Lock, refer to [Lock for Web](/libraries/lock).

## Define User Metadata on Signup

For information on adding `user_metadata` on signup, see the section on Lock [Additional Signup Fields](/libraries/lock/v10/customization#additionalsignupfields-array-)

## Read User Metadata

You can read the user's `user_metadata` properties the same way you would for any user profile property. This example retrieves the value associated with `user_metadata.hobby`:

```js
lock.getUserInfo(accessToken, function(error, profile) {
  if (!error) {
    document.getElementById('hobby').textContent = profile.user_metadata.hobby;
  }
});
```

::: note
For details on how to initialize `lock` refer to [new Auth0Lock(clientID, domain, options)](https://github.com/auth0/lock#new-auth0lockclientid-domain-options)
:::

## Update User Metadata

You can [update the metadata properties](/metadata/apiv2#update-user-metadata) with calls to the Auth0 Management API. To do so, make a `PATCH` call to the [Update a user](/api/management/v2#!/Users/patch_users_by_id) endpoint.


Here is a sample request, that adds the user's home address as a second-level property:

```har
{
  "method": "PATCH",
  "url": "https://YOURACCOUNT.auth0.com/api/v2/users/user_id",
  "httpVersion": "HTTP/1.1",
  "cookies": [],
  "headers": [{
    "name": "Authorization",
    "value": "Bearer YOUR_TOKEN"
  }, {
    "name": "Content-Type",
    "value": "application/json"
  }],
  "queryString": [],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"user_metadata\": {\"addresses\": {\"home\": \"123 Main Street, Anytown, ST 12345\"}}}"
  },
  "headersSize": -1,
  "bodySize": -1,
  "comment": ""
}
```

::: note
The Auth0 Management APIv2 token is required to call the Auth0 Management API. [Click here to learn more about how to get a Management APIv2 Token.](/api/management/v2/tokens)
:::
