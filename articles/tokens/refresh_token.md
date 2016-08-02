---
title: Auth0 refresh_token
description: A refresh token allows an application to request Auth0 to issue a new id_token directly, without needing to re-authenticate the user.
---

# Auth0 `refresh_token`

Refresh tokens carry the information to get a new access token, this new token is then used to authenticate a user without them needing to re-authenticate. This is primarily useful for mobile applications that are installed on a device.  

Usually a user only gets a new access token after old ones have expired, or if gaining access to a new resource for the first time. Refresh tokens are usually subject to strict storage requirements to ensure they are not leaked. They can also be blacklisted by the authorization server. 

See the [Refresh Token](/refresh-token) page for information on how to obtain, view and revoke refresh tokens.

For more information see:

* [Refresh Tokens: When to Use Them and How They Interact with JWTs](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)

* [Lock Android: Refreshing JWT Tokens](/libraries/lock/lock-android/refresh-jwt-tokens)

* [Lock iOS: Saving and Refreshing JWT Tokens](/libraries/lock/lock-ios/save-and-refresh-jwt-tokens)

* [Using Refresh Tokens in Mobile Applications](https://github.com/auth0/auth0-angular/blob/master/docs/refresh-token.md)

* [Get a refresh token with Auth0.js](https://github.com/auth0/auth0.js#login)
