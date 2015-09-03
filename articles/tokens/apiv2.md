# The Auth0 APIv2 Token

## Overview

The Auth0 APIv2 token is required to call v2 of the Auth0 Management API, frequently referred to as APIv2.  This token is used by a specific tenant in Auth0 to call Auth0 APIv2 to access or update records for that tenant.  This APIv2 token is a JWT, and contains various scopes, such as “read users” or “update clients”, and is signed with a client API key and secret for the entire tenant.

## How to get a APIv2 Token

An Auth0 APIv2 token can be generated on the Auth0 APIv2 explorer page or it can be created programmatically by building the JWT, including the desired scopes, and signing it with the tenant api key/secret.  

The [Auth0 APIv2 explorer page](/api/v2) is very useful to experiment with Auth0 APIv2.
Use the “SCOPES” section to select the scopes needed for the API call to be made.  For example, to make a call to the “List or search users” API call, one would need to select the “read:users” scope by selecting the entity “users”, then the action “read” and then clicking “->”.
The above steps would be repeated for additional scopes if multiple scopes are needed.
Once all necessary scopes have been specified, the field underneath “TOKEN GENERATOR” will contain the APIv2 token to pass to the APIv2 endpoint(s).

To generate an APIv2 token programmatically, build a JSON Web  Token (JWT) containing the necessary information and sign it with the tenant API Secret.   To build the JWT, it is helpful to use the APIv2 explorer, specify the desired scopes, and then click “Debug in jwt.io”.  This will create the JWT with the scopes you specified and display it in JWT format.  To get the API secret with which to sign the JWT, click on “API Key/Secret” in the Auth0 APIv2 API explorer.

## How to control contents of APIv2 token

The APIv2 token will be issued for a particular tenant.  To have a token issued in the APIv2 explorer for a particular tenant, log into the Auth0 tenant, and then access the APIv2 explorer page.  Similarly, to obtain the secret with which to sign an APIv2 token, log into the desired tenant first before accessing the APIv2 explorer page.

## Validity

There is no specific validity period for an APIv2 token.  An APIv2 token can be built programmatically, as desired, by a client.

## Renewing the token

There is no mechanism for renewing an APIv2 token.  A new token should be created whenever it is needed.

## Termination of tokens

There is no mechanism for terminating an APIv2 token.

## Uses

The Auth0 APIv2 access token is used to call the Auth0 Management APIv2.  This token is required to update the app_metadata portions of the user profile.
