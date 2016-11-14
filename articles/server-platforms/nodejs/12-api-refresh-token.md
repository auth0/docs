---
title: OAuth 2.0 Refresh Tokens
description: This tutorial demonstrates how to use Auth0 to renew Access Tokens using Refresh Tokens.
---

A Refresh Token is a special kind of token that can be used to obtain a renewed access token at any time. You can request new access tokens. Remember, Refresh Tokens must be stored securely by an application because they essentially allow a user to remain authenticated forever. For more information, check out [our documentation](https://auth0.com/docs/api-auth).

<%= include('../../api-auth/_region-support') %>
<%= include('../../_includes/_compat_warning') %>

## Obtaining a Refresh Token

To obtain a Refresh Token, you should include the `offline_access` scope in `auth0.login` `scope` parameter.

```js

...

// this function will be called when a user clicks the login button
function signIn() {
  auth0.login({
    responseType: 'id_token token',
    scope: 'openid profile offline_access {API SCOPES}',
    audience: '{API IDENTIFIER}'
  });
}

...
```

The Refesh Token will be available in `req.user.extraParams.refresh_token`. 

## Using a Refresh Token

If you invoke your API and you get a `401` response, this tells you that you might need to refresh your Access Token since it is expired. 

In order to renew your Access Token, you must send a request to the `/oauth/token` endpoint to obtain a renewed access token. 

```js

// get refresh token

var options = { method: 'POST',
  url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
  headers: { 'content-type': 'application/json' },
  body: { 
    grant_type: 'refresh_token',
    client_id: '{env.AUTH0_CLIENT_ID}',
    client_secret: '{env.AUTH0_CLIENT_SECRET}',
    refresh_token: 'req.user.extraParams.refresh_token',
    redirect_uri: '{env.AUTH0_CALLBACK_URL}'
  }, 
  json: true 
};

request(options, function (error, response, body) {
  // body.access_token is the renewed access token
  // use this renewed access token to invoke your API
});

}
```

The renewed Access Token has an expiration time equal to the `Token Expiration (Seconds)` setting for your API.
