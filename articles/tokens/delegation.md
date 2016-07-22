# Delegation Tokens

## Overview

Delegation tokens are tokens used to call another API.

The Auth0 `id_token` can be exchanged for another token, called a Delegation token, that can be used to call either other application APIs registered as clients in the same Auth0 tenant or APIs represented by some types of application Addons registered in the same Auth0 tenant.

The type of the delegation token will vary depending on the target API with which it will be used.  For example, if it will be used for an application/API registered in Auth0, it will be a JWT token.  If the delegation token is for an application AddOn, it will vary by provider.  For example, if issued for Azure blob storage, it will be a SAS (Shared Access Signature).  If the delegation token is for the Firebase add on , it will be a JWT.

Further information available at: [Delegation token request](https://github.com/auth0/auth0.js#delegation-token-request).

## How to get a delegation token

The `id_token` for an authenticated user can be used with the `/delegation` endpoint to request a delegation token for a particular target.  The target can be either another application/API registered in Auth0 or an application Addon configured in Auth0.  The Addons for which this can be done are those that are not SAML or WS-Fed Addons and the Addon must be configured in Auth0 with secrets obtained from the Addon service, such as Firebase.  Instructions for setting up the secrets are available from the Addon configuration page for each Addon.  The secrets are used to sign the delegation token so that the Addon API can validate and trust the token.

Further information available at:  [Delegation endpoint](/api/authentication#delegated).

## How to control contents of a delegation token

The delegation endpoint allows the setting of several parameters which will govern the contents of the delegation token, including the `target`, the `scope`, the API to be called (`api_type`) and an additional free-form area for additional parameters.

See the [delegation endpoint](/api/authentication#delegated) in the [Authentication API](/api/authentication) for more information.

## Validity

For customer application APIs registered in Auth0, the validity of a delegation token issued for that target is governed by the _JWT Expiration (seconds)_ value. This is set for each application in _[Applications](${uiURL}/#/applications) > Settings_.

For APIs registered as Addons in Auth0, the validity period of the token will vary by individual Addon.  The documentation available from the provider of any Addon API should be consulted for further information on tokens and expirations.

## Renewing the token

When a delegation token expires, the [delegation endpoint](/api/authentication#delegated) can be used to obtain a token.

## Termination of tokens

The ability to revoke a delegation token will vary by individual Addon.  The documentation available from the provider of any Addon API should be consulted for further information on whether a token can be revoked and if so, how to do it.

The delegation tokens for customer APIs registered in Auth0 cannot be revoked.  A best practice, therefore, is to set the JWT expiration duration to a relatively short value.

## Example

Consider the following scenario. You have two web applications: _appA_ and _appB_. They both need to talk to the same backend API, _apiC_. The steps you should follow for this configuration would be:

1. Register _appA_ and _appB_ in Auth0. Now each app has its own client secret.
2. Register your backend API _apiC_ in Auth0. Now the API has its own client secret as well.
3. Navigate to the [Applications](${uiURL}/#/applications), select _apiC_ and click on _Settings > Show Advanced Settings > OAuth_. In the _Allowed APPs / APIs_ field set the applications _appA_ and _appB_. This will set these two apps as clients that are allowed to make delegation requests to _apiC_. You have to set the client ID of your two apps in this field, separated by comma or newline.
4. In your implementation, the applications _appA_ and _appB_ would invoke an Auth0 method (lock or SDK call) to authenticate a user and request an `id_token` be returned.
5. The applications _appA_ and _appB_ would then use the [delegation endpoint](/api/authentication#delegated) to exchange the original `id_token` for a new token with which to call _apiC_.
6. The generated delegation token will be signed with the target API's (_apiC_) client secret. The target API should validate that signature. Some information on validating tokens is [here](/protocols#validating-tokens).

## Uses

A delegation token should be obtained and used when a client program needs to call the API of either a) another application/API registered in Auth0 or b) the API for an Application Addon, such as Firebase or SAP, registered and configured in Auth0, in the same tenant as the calling program.

* [Delegation token request example](https://github.com/auth0/auth0.js#delegation-token-request)

* [Auth0.js example](/libraries/auth0js#12)

## Best Practices

For granularity of access control, it is good to set up different applications/APIs with different secrets, so that a delegation token can be issued uniquely for each application/API.

Tokens should be issued with a short timeframe for expiration, where configurable.
