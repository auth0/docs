---
title: Auth0 refresh_token
description: A refresh token allows an application to request Auth0 to issue a new id_token directly, without needing to re-authenticate the user.
---

# Auth0 `refresh_token`

## Overview

The Auth0 `refresh_token` is used to get a new `id_token` without requiring the user to re-authenticate.  This is primarily useful for mobile applications that are installed on a device.  

See the [Refresh Token](/refresh-token) page for more detailed information.

## Obtain a refresh token

The Auth0 refresh token can be obtained by specifying the `offline_access` scope as a parameter to the `/authorize` endpoint as shown at [Offline Access (Refresh Tokens)](/api/authentication#offline-access).

For more information see:

* [Obtain a refresh token](/refresh-token#obtain-a-refresh-token).

* [Lock: Using a refresh token](/libraries/lock/using-a-refresh-token)

* [Using Refresh Tokens in Mobile Applications](https://github.com/auth0/auth0-angular/blob/master/docs/refresh-token.md)

* [Get a refresh token with Auth0.js](https://github.com/auth0/auth0.js#login)

## Refresh token properties

The Auth0 refresh token can be issued and revoked for any combination of **client**, **user** and **device**. 

The client is specified in the call that invokes the Auth0 authentication sequence. The user and device are the user that is authenticated and the device used at the time of authentication. 

There is no option to change the properties of the Auth0 refresh token from the values of the client, user and device set during its creation.

## Validity

The refresh token is valid indefinitely, but it can be [revoked](#revoke-a-refresh-token).

## Renew a refresh token

There is no need to renew the refresh token since it never expires. If the refresh token is revoked for any reason, a new one can be obtained as [described above](#obtain-a-refresh-token).

## Revoke a refresh token

Refresh tokens can be revoked either through the Auth0 Dashboard or the Auth0 API.

To revoke a refresh token in the Dashboard, navigate to **[Users](${uiURL}/#/users) > {username} > Devices** and click the **X** to delete.

To use API Explorer, go to [Delete a device credential](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) endpoint and provide the `id` of the refresh token.

To revoke a refresh token with calls to APIv2, see [Revoke a refresh token](/refresh-token#revoke-a-refresh-token) for a detailed explanation of the required procedure.

## Use

The refresh token is used to obtain a new Auth0 `id_token` by calling the [/delegation](/api/authentication#!#post--delegation) endpoint when the existing `id_token` has expired.

For an example delegation call, see: [Use a refresh token](/refresh-token#use-a-refresh-token).

The `auth0.js` library can also be used to renew an `id_token` as shown at: [Use a refresh token to get new id_token](https://github.com/auth0/auth0.js#refresh-token).

## Validation

The refresh token is passed to Auth0 and Auth0 performs all necessary validation.
