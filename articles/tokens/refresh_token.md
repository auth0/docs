---
title: Auth0 refresh_token
description: A refresh token allows an application to request Auth0 to issue a new id_token directly, without needing to re-authenticate the user.
---

# Auth0 `refresh_token`

Refresh tokens contain the information required to obtain a new access token. This access token can then be used to authenticate the user without them having to re-authenticate. This is primarily useful for mobile applications that are installed on a device.  

Usually, a user will need a new access token only after the previous one expires, or when gaining access to a new resource for the first time. 

Refresh tokens are subject to strict storage requirements to ensure that they are not leaked. Refresh tokens can also be blacklisted by the authorization server. 

See the [Refresh Token](/refresh-token) page for information on how to obtain, view and revoke refresh tokens.

### Additional information

* [Refresh Tokens: When to Use Them and How They Interact with JWTs](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)

* [Lock Android: Refreshing JWT Tokens](/libraries/lock-android/refresh-jwt-tokens)

* [Lock iOS: Saving and Refreshing JWT Tokens](/libraries/lock-ios/save-and-refresh-jwt-tokens)

* [Using Refresh Tokens in Mobile Applications](https://github.com/auth0/auth0-angular/blob/master/docs/refresh-token.md)

* [Get a refresh token with Auth0.js](https://github.com/auth0/auth0.js#login)
