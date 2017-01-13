---
description: How to keep users logged in to your single-page application
---

# Silent Authentication for Single Page Apps

Single Page web applications (SPAs) normally use the [Implicit Grant flow](/api-auth/grant/implicit) for authentication.
This flow returns an ID token and optionally an access token to authenticate and authorize the user.
These tokens, however, expire after some time and must be renewed to keep a user authenticated without them having to log in again.

## Access token expiration

Access tokens are opaque to clients. This means that clients are unable to inspect the contents of access tokens to determine their expiration date.

There are two options to determine when an access token expires:

1. Read the [`expires_in` response parameter](https://openid.net/specs/openid-connect-core-1_0.html#ImplicitAuthResponse) returned by Auth0.
2. Ignore expiration dates altogether. Instead, try to renew the access token if rejected by the API.

The `expires_in` parameter is returned by Auth0 as a hash parameter following a successful authentication.
For example, Auth0 could call your callback URL with the following parameters:

```text
https://myapp.example.com/
    #access_token=...&
    id_token=...&
    token_type=Bearer&
    state=...&
    expires_in=3600
```

This parameter indicates how many seconds the access token will be valid for.
With this information we can call `setTimeout` or some other scheduling mechanism to renew the access token when needed.

## Use `prompt=none` to retrieve a new token

When you authenticate a user to your application, you would normally redirect them to the [`/authorize` endpoint of Auth0's authentication API](/api/authentication#social).

This endpoint supports a `prompt` query parameter; if it is set to `none`, the following will happen:

* If the user is still authenticated, Auth0 will call back to your application immediately with renewed ID and access tokens.
* If the user is no longer authenticated or had never authenticated, Auth0 will call back to your application with an error.

You can use the [`renewAuth` method from auth0.js](https://github.com/auth0/auth0.js#api) to authenticate users with `prompt=none` in an iframe.
This lets you keep users logged in without needing to refresh or redirect away from your application.
