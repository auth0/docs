---
title: Auth0 access_token
---

# Auth0 `access_token`

## Overview

The Auth0 access token, usually called `access_token` in the code samples, is an opaque string which is returned by calls that invoke the Auth0 authentication process and is only used to call the Auth0 APIs. The Auth0 access token does not contain any claims, cannot be decoded, does not conform with any standard and is not signed.

The [Auth0.js documentation](/libraries/auth0js) shows a sample of how to get the `access_token`.

## How to get Auth0 access token

The Auth0 access token can be obtained in several ways.
Calls to Lock or library functions that invoke authentication will return the `access_token`.

* Calls to the Lock widget will return `access_token` as shown in the [Lock documentation](/libraries/lock)
* [Examples using auth0.js](https://github.com/auth0/auth0.js)
* The [/authorize endpoint in the Authentication API](/auth-api) will return `access_token`
* Check the [List of tutorials](/tutorials) to see how to make calls to libraries for other languages/SDKs.

## How to control contents of access token

It is not possible at this time to control the contents of the Auth0 access token.

## Validity

The Auth0 access token remains valid for 24 hours.

## Renewing the token

There is currently no way to renew the Auth0 access token without triggering authentication by the user.  To get a new access token, simply follow the process for getting an access token as described above in the How to Get an Access Token section.

## Termination of the token

Once issued, Auth0 access tokens can not be revoked.  

## Uses

The Auth0 access token is used to call the Auth0 Management APIv1.  This version of the Auth0 Management API has been deprecated and should no longer be used.

It can also be used to call the /userinfo endpoint within the Authentication API to get user profile information as documented [here](/auth-api#user-profile)

## Best practices

### Token Validation

The Auth0 access token is only used to call Auth0 Management APIv1 and as such Auth0 is the only entity that needs to validate this token.  Applications do not need to validate this token in any way.
