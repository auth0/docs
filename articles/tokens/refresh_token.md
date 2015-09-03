# Auth0 `refresh_token`

## Overview

The Auth0 `refresh_token` is used to get a new `id_token` without requiring the user to re-authenticate.  This is primarily useful for mobile applications that are installed on a device.  

See the [Refresh Token](/refresh-token) page for additional information.

## How to get the Auth0 refresh token

The Auth0 refresh token can be obtained via specifying the offline-access scope as a parameter to the /authorize endpoint.   as documented for [Offline Access](/auth-api#offline-access)

For more information see:
* [Lock example using a refresh token](/libraries/lock/using-a-refresh-token)

* [Angular example using refresh token](https://github.com/auth0/auth0-angular/blob/master/docs/refresh-token.md)

* [Auth0.js example](https://github.com/auth0/auth0.js#login)

## How to control contents of Auth0 refresh token

The Auth0 refresh token can be issued and revoked for any combination of application, user and device.   The client application is specified in the call that invokes the Auth0 authentication sequence, and the user and device are the user that authenticates and the device used at the time of authentication.   There is no ability to further influence the contents of the Auth0 refresh token besides the application, user and device for which it is issued.

## Validity

The refresh token is valid indefinitely, but it can be revoked.  See the Termination section below.

## Renewing the token

There is no need to renew the refresh token as it is valid forever.  If the refresh token is revoked for any reason, a new one can be obtained as described in the “How to get the Auth0 refresh token” section above.

## Termination of tokens

Refresh tokens can be revoked either through the Auth0 Dashboard or the Auth0 API.

To revoke a refresh token in the Dashboard, navigate to “Users” -> {Name of user} -> “Devices”

To use the APIv2, navigate to “Documentation” -> “APIv2” and use the Device Credentials calls.

Further information is at the "Using a refresh token" section of the [Refresh Token](/refresh-token#using-a-refresh-token) page.

## Uses

The Refresh Token is used to obtain a new Auth0 `id_token`.  This can be done with the /delegation endpoint in the [Auth0 Authentication API](/auth-api#delegated)

There is an [example of the delegation call](/refresh-token#using-a-refresh-token)

To get a new `id_token` when the existing `id_token` has expired, use a refresh token to get a new id token, as explained in the [Refresh Token](/refresh-token) page.

The auth0.js library can also be used to refresh an id token as shown [here](https://github.com/auth0/auth0.js#refresh-token).

## Best practices

### Validation

The refresh token is passed to Auth0 and Auth0 will perform any necessary validation.
