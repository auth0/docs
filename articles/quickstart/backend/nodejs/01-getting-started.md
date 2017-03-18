---
title: Getting Started
description: This tutorial demonstrates how to verify JSON Web Tokens and protect endpoints in an Express API
---

To restrict access to the resources served by your API, a check needs to be made to determine whether the incoming request contains valid authentication information. There are various methods for including authentication information in a request, but for integration with Auth0, the server needs to check for a valid JSON Web Token (JWT).

This sample demonstrates how to check for a JWT in the `Authorization` header of an incoming HTTP request and verify that it is valid. The validity check is done in an Express middleware function which can be applied to any endpoints you wish to protect. If the token is valid, the resources which are served by the endpoint can be released, otherwise a `401 Authorization` error will be returned.

## Check the Signing Algorithm

This tutorial demonstrates how to verify a JWT signed by Auth0 using two different algorithms: HS256 and RS256. By default, ID tokens issued by Auth0 are signed with HS256. However, if you have implemented a custom login screen in your application with auth0.js v8+, you need to change your token's signing algorithm to RS256. If you are using auth0.js < v8, tokens signed with HS256 may be used.

::: panel-warning Before Changing the Signing Algorithm
Please note that altering the signing algorithm for your client will immediately change the way your user's tokens are signed. This means that if you have already implemented JWT verification for your client somewhere, your tokens will not be verifiable until you update the logic to account for the new signing algorithm.
:::

The token signing algorithm is specified in the advanced settings for your client in the OAuth configuration area.

![Configure JWT Signature Algorithm as HS256](/media/articles/server-apis/aspnet-core-webapi/jwt-signature-hs256.png)

If you are unsure about which algorithm your token is signed with, paste your token in the [JWT.io](https://jwt.io) debugger and look in the `header`.


