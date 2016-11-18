---
title: OAuth 2.0 Refreshing Access Tokens
description: This tutorial demonstrates how to use Auth0 to refresh Access Tokens in Single Page Applications.
---

JQuery applications, as with all client-based applications, are not trusted to maintain the safety of a client secret or Refresh Token. Therefore, these application should not be issued Refresh Tokens. However, it is still possible to renew an Access Token. This tutorial demonstrates how to renew an Access Token using auth0.js. For more information, check out [our documentation](https://auth0.com/docs/api-auth).

<%= include('../../api-auth/_region-support') %>
<%= include('../../_includes/_compat_warning') %>

## Refreshing an Access Token

If you invoke your API and you get a `401` response, this tells you that you might need to refresh your Access Token since it is expired. 

In order to refresh your Access Token, you can use `prompt=none` in your `/authorize` call. With auth0.js, this is done using the `silentAuthentication` function.

```js

// get a new Access Token
auth0.silentAuthentication({
  responseType: 'id_token token',
  scope: 'openid profile {OTHER API SCOPES}',
  audience: '{YOUR API IDENTIFIER}'
}, function(err, result){
  // result.accesstoken available here
  // result.idToken also available here if you used response type id_token
  localStorage.setItem('access_token', result.accessToken);
  localStorage.setItem('id_token', result.idToken);
});
```

This by default will use the callback url defined in the constructor. If you want to use a different one, you can send the new callbackURL in the options param. An error will be returned if the end user is not already authenticated.

You should include the `scope` parameter, including any or all of the scopes that were originally requested. If you ask for scopes for which the user did not already provide consent, the returned `access_token` will not include them. By including `id_token` in the response_type, you will also get back an `id_token`. Also note that the renewed Access Token has an expiration time equal to the `Token Expiration (Seconds)` setting for your API.
