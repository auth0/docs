# Tokens

## Token Overview

This document is designed to clarify and disambiguate the numerous types of tokens referenced in Auth0 documentation, what each is used for and how to use it.  

First there are a couple different categories of tokens 

* JSON Web Tokens (JWT) - These are tokens that conform to the JSON Web Token standard and contain information about an identity.  They are self-contained in that it is not necessary for the recipient to call a server to validate the token.
* Opaque tokens - Opaque tokens are tokens in a proprietary format that typically contain some identifier to information in a server’s persistent storage.  To validate an opaque token, the recipient of the token needs to call the server that issued the token.

There are six primary tokens used in Auth0's token based authentication scenarios and referenced in Auth0 documentation.

* The Auth0 id_token
* The Auth0 access_token (Auth0 APIv1 token)
* Identity Provider access tokens from other providers
* The Auth0 refresh token
* A Delegation token 
* The Auth0 APIv2 Token 


(Editing question: In the logs file, (authN via SAML connection) there is an entry for “exchange” and it says exchange of “authorization code for access token” - Is the “authorization code” that is referenced there yet another “token” that should be documented here?)

### id_token (JWT)

The Auth0 `id_token` is a token in JSON Web Token (JWT) format, which provides a mechanism for transferring claims about a user from Identity Providers, who are authoritative sources of such information, to other relying parties, such as websites or web services, also known as service providers, who need such information.  The claims included in a JWT can be basic profile attributes such as a name or email address as well as security information such as a group membership or the support plan a user is entitled to use.

### Auth0 access token
The Auth0 access token is a random, opaque string and was used to call portions of the Auth0 Management API ( APIv1) and the /userinfo endpoint within the Auth0 Authentication API.  

### Identity Provider access tokens 
When a user authenticates via Auth0 with another social provider's authentication service, such as Facebook or LinkedIn, the social provider will return an access token that can be used by the client program to call that social provider's API.

### Refresh tokens
The Refresh token is a long-lived token that is used to obtain a new id_token after a previous one has expired.  This is useful for applications running on mobile devices that call remote APIs and do not want to require the user to log in everytime the user uses the mobile app.  

### Delegation tokens
The Auth0 `id_token` can be exchanged for another token, called a Delegation token, that can be used to call either other application APIs registered as clients in the same Auth0 tenant or APIs represented by some types of application Addons registered in the same Auth0 tenant.  

### Auth0 APIv2 token
The Auth0 APIv2 token is used to call v2 of the Auth0 Management API.  This allows a specific tenant in Auth0 to call Auth0 APIv2.  This APIv2 token is a JWT, and contains various scopes, such as “read users” or “update clients”, and is signed with a client API key and secret for the entire tenant. 

The following sections will discuss each token in greater detail and provide information on how to use each.

##`id_token`

The `id_token` is referred to by several names, including `id_token`, the JSON Web Token or abbreviated as the JWT.  It conforms to an industry standard (IETF RFC 7519) and contains three parts: A header, a body and a signature. The header contains the type of token and the hash algorithm used on the contents of the token.  The body, also called the payload, contains identity claims about a user.  There are some non-mandatory claims with registered names, for things like the issuer of the token, the subject of the token (who the claims are about), and the time of issuance.  Any number of additional claims with other names can be added, though care must be taken to keep the JWT within the browser size limitations for URLs.  The third part of the JWT is the signature which is used by the recipient of a JWT to validate the integrity of the information conveyed in the JWT.

### How to get the `id_token`
The `id_token` is returned when calling any of the Auth0 functions which invoke authentication.  This includes calls to the Lock widget, to the auth0.js library, or the libraries for other languages.  In our code samples for Lock and auth0.js for example, there is a variable called `id_token` in the callback function passed to Lock and auth0.js which receives the `id_token`.

Lock libraries:
https://auth0.com/docs/libraries/lock
https://auth0.com/docs/libraries/lock-ios
https://auth0.com/docs/libraries/lock-android

Auth0.js
https://auth0.com/docs/libraries/auth0js
https://github.com/auth0/auth0.js

Tutorials showing libraries for other languages
https://auth0.com/docs/tutorials

###How to control contents of `id_token`
The contents of the `id_token`, specifically the claims contained within it, are controlled by the use of a parameter called `scope` which is passed to the authentication functions mentioned above.  For example, the call to the Lock widget’s `.show` function can specify optional authentication parameters as follows:

```
lock.show({
   responseType: ‘token’,
   authParams: {
      scope: ‘openid name email’
    }
 });
```
The above sample, specifying `openid name email` will result in a JWT with claims for the name and email attributes within the user profile.  The responseType should be `token` for client-side authentication flows and `code` for server-side authentication flows as described for the /authorize endpoint here:
https://auth0.com/docs/auth-api

Additional information on the `id_token` is at:
https://auth0.com/docs/jwt

A valid JWT can be pasted into the following website to view the contents of the JWT.
https://jwt.io

A blog entry on JWT - with an explanation of why it is getting to be more popular
https://auth0.com/blog/2015/07/21/jwt-json-webtoken-logo/

Additional samples using the auth0.js library are at:
https://github.com/auth0/auth0.js


###Validity
The `id_token` is valid for 10 hours (36000 seconds) by default.  The expiration of this token can be set in the `Apps/APIs` -> Settings screen using the `JWT expiration` field.

###Renewing the token

A new `id_token` can be obtained using an existing, unexpired `id_token` or by using a refresh token and the `/delegation` endpoint.  

To use an existing, unexpired `id_token` to obtain a new one, use the `renewIdToken` function within auth0.js library as shown at:
https://github.com/auth0/auth0.js#refresh-token

To get a new `id_token` when the existing `id_token` has expired, use a refresh token to get a new `id token`, as explained in the Refresh Token section below and also at:
https://auth0.com/docs/refresh-token

The auth0.js library can also be used to refresh an `id token` as shown at:
https://github.com/auth0/auth0.js#refresh-token

###Termination of tokens
Once issued, tokens can not be revoked in the same fashion as cookies with session id’s for server-side sessions.  As a result, tokens should be issued for relatively short periods, and then renewed periodically if the user remains active.  See the above section on renewing id tokens.


###Uses
The `id_token` is designed to be used to pass information about a user between websites,  web programs and APIs in an industry standard, URL-friendly fashion.  One advantage of using an `id_token` for this purpose is that the recipient can validate the token without having to make a call back to the issuer of the token.  The token is also designed to enable being passed from one web property to another, via an untrusted client, such that the client cannot alter the token without such tampering being evident to the recipient.

The `id_token` can be used to call the /tokeninfo endpoint within the Auth0 authentication API to retrieve the user’s complete profile.
https://auth0.com/docs/auth-api#user-profile

The `id_token` can also be used to call the /delegation endpoint within the Auth0 authentication API to obtain another token for another API.
https://auth0.com/docs/auth-api#delegated

The `id_token` can also be used to call other APIs. 
(Note - provide samples that illustrate best practices - should each API require a different token? e.g. in sample - Better to exchange first token to get a different token specific to the API.  )

https://auth0.com/docs/sequence-diagrams

Further examples of using the id_token to get tokens for another API are at:
https://github.com/auth0/auth0.js#delegation-token-request

###Best practices
This section contains pointers on best practices related to the `id_token`.

####Token Validation
Single Page Applications or mobile apps do not need to validate the JWT as they just pass it to something else.  Server side APIs that receive the JWT, however, do need to validate  it. There are server-side APIs to do such validation.  One example for node.js is:
https://github.com/auth0/node-jsonwebtoken

A blog post with advice about vulnerabilities to avoid in use of JWTs.
https://auth0.com/blog/2015/03/31/critical-vulnerabilities-in-json-web-token-libraries/
If there is any sensitive information included in the JWT, it should be encrypted, but the need for this is not common.


## Auth0 access token
The Auth0 access token, usually called `access_token` in the code samples, is an opaque string which is returned by calls that invoke the Auth0 authentication process and is only used to call the Auth0 API.  The Auth0 access token does not contain any claims, cannot be decoded, does not conform with any standard and is not signed. 
   
https://auth0.com/docs/libraries/auth0js

###How to get Auth0 access token
The Auth0 access token can be obtained in several ways.
Calls to Lock or library functions that invoke authentication will return the `access_token`.

Calls to the Lock widget will return `access_token` as shown in code samples here:
https://auth0.com/docs/libraries/lock

Examples using auth0.js
https://github.com/auth0/auth0.js

https://auth0.com/docs/auth-api
The /authorize endpoint in the authentication API will return `access_token`

Calls to libraries in other languages as shown in the tutorial for each language:
https://auth0.com/docs/tutorials

###How to control contents of access token
It is not possible at this time to control the contents of the Auth0 access token.

###Validity
The Auth0 access token remains valid for 24 hours. 

###Renewing the token
There is currently no way to renew the Auth0 access token without triggering authentication by the user.  To get a new access token, simply follow the process for getting an access token as described above in the How to Get an Access Token section.

https://github.com/auth0/auth0.js

###Termination of tokens
Once issued, Auth0 access tokens can not be revoked.  


###Uses

The Auth0 access token is used to call the Auth0 Management APIv1.  This version of the Auth0 Management API has been deprecated and should no longer be used.

It can also be used to call the /userinfo endpoint within the authentication API to get user profile information.
https://auth0.com/docs/auth-api#user-profile

###Best practices
####Token Validation
The Auth0 access token is only used to call Auth0 Management APIv1 and as such Auth0 is the only entity that needs to validate this token.  Applications do not need to validate this token in any way.


## Identity Provider Access Tokens
Third Party Access Tokens are issued by third party social providers, such as Facebook or LinkedIn, when a user authenticates with the provider.  These third party access tokens can be used to call the API of the third party provider that issued the token.
 
https://auth0.com/docs/libraries/auth0js

###How to get Identity Provider access tokens

Identity Provider access tokens can be obtained in one of two ways.  First, if a user authenticates to a social Identity Provider, such as Facebook, an Identity Provider access token for that social Identity Provider will be returned in the first element of the `identities` array within the user profile object returned by Auth0.  

For example, if authentication is invoked via a call to the Lock widget’s .show method, the following code would be used to put the Identity Provider access token into a variable called `identityProviderAccessToken`. .

```
    lock.show({
       responseType: 'token'
      , authParams: {
        scope: 'openid name email'
      }
    }, function(err, profile, token) {
        identityProviderAccessToken = profile.identities[0].access_token;
    });
```

Examples of the `identities` array and profiles as returned by various social providers are at:
https://auth0.com/docs/user-profile


###How to control contents of Identity Provider access tokens
The contents of third party access tokens will vary by the issuing Identity Provider.  

###Validity
The validity period for third party access tokens will vary by the issuing Identity Provider.

###Renewing the token
There is no standard way to renew Identity Provider access tokens through Auth0.  The mechanism, if available, for renewal of Identity Provider access tokens would vary by Identity Provider and be handled by each Identity Provider.


###Termination of tokens
The ability to terminate Identity Provider access tokens is up to each individual Identity Provider.

###Uses
The Identity Provider access is used to call an API offered by the Identity Provider that issued the token.  For example, an access token issued after authentication to Facebook could be used to call the Facebook Graph API.

Additional information is at:
https://auth0.com/docs/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api
https://auth0.com/docs/what-to-do-once-the-user-is-logged-in/adding-scopes-for-an-external-idp

###Best practices
####Validation
In general, Identity Provider access tokens are passed to the issuing provider, and the issuing provider is responsible for validation of the token. 

## Refresh Token
The Auth0 refresh token is used to get a new `id_token` without requiring the user to re-authenticate.  This is primarily useful for mobile applications that are installed on a device.  

More information on the refresh token is at:
https://auth0.com/docs/refresh-token

###How to get the Auth0 refresh token
The Auth0 refresh token can be obtained via specifying the offline-access scope as a parameter to the /authorize endpoint.   This is documented at:
https://auth0.com/docs/auth-api#offline-access

https://auth0.com/docs/libraries/lock/using-a-refresh-token

https://github.com/auth0/auth0-angular/blob/master/docs/refresh-token.md

https://github.com/auth0/auth0.js#login

###How to control contents of Auth0 refresh token
The Auth0 refresh token can be issued and revoked for any combination of application, user and device.   The client application is specified in the call that invokes the Auth0 authentication sequence, and the user and device are the user that authenticates and the device used at the time of authentication.   There is no ability to further influence the contents of the Auth0 refresh token besides the application, user and device for which it is issued.

###Validity
The refresh token is valid indefinitely, but it can be revoked.  See the Termination section below.

###Renewing the Refresh token
There is no need to renew the refresh token as it is valid forever.  If the refresh token is revoked for any reason, a new one can be obtained as described in the “How to get the Auth0 refresh token” section above.

###Termination of Refresh tokens
Refresh tokens can be revoked either through the Auth0 Dashboard or the Auth0 API.

To revoke a refresh token in the Dashboard, navigate to “Users” -> {Name of user} -> “Devices” 

To use the APIv2, navigate to “Documentation” -> “APIv2” and use the Device Credentials calls.
 
Further information is at:
https://auth0.com/docs/refresh-token#2

###Uses
The Refresh Token is used to obtain a new Auth0 `id_token`.  This can be done with the /delegation endpoint in the Auth0 Authentication API.  This endpoint is documented at:
https://auth0.com/docs/auth-api#delegated

An example of this call is included at:
https://auth0.com/docs/refresh-token#3


To get a new `id_token` when the existing `id_token` has expired, use a refresh token to get a new id token, as explained at:
https://auth0.com/docs/refresh-token

The auth0.js library can also be used to refresh an id token as shown at:
https://github.com/auth0/auth0.js#refresh-token

###Best practices
####Validation
The refresh token is passed to Auth0 and Auth0 will perform any necessary validation.

## Delegation Tokens
Delegation tokens are tokens used to call another API.  
The Auth0 `id_token` can be exchanged for another token, called a Delegation token, that can be used to call either other application APIs registered as clients in the same Auth0 tenant or APIs represented by some types of application Addons registered in the same Auth0 tenant.

The type of the delegation token will vary depending on the target API with which it will be used.  For example, if it will be used for an application/API registered in Auth0, it will be a JWT token.  If the delegation token is for an application AddOn, it will vary by provider.  For exampke, if issued for Azure blob storage, it will be a SAS (Shared Access Signature).  If the delegation token is for the Firebase add on , it will be a JWT.
https://github.com/auth0/auth0.js#delegation-token-request

###How to get a delegation token
The `id_token` for an authenticated user can be used with the /delegation endpoint to request a delegation token for a particular target.  The target can be either another application/API registered in Auth0 or an application Addon configured in Auth0.  The Addons for which this can be done are those that are not SAML or WS-Fed Addons and the Addon must be configured in Auth0 with secrets obtained from the Addon service, such as Firebase.  Instructions for setting up the secrets are available from the Addon configuration page for each Addon.  The secrets are used to sign the delegation token so that the Addon API can validate and trust the token.

Information on the delegation endpoint is at:
https://auth0.com/docs/auth-api#delegated

###How to control contents of a delegation token
The delegation endpoint allows the setting of several parameters which will govern the contents of the delegation token, including the target, the scope, the API to be called and an additional free-form area for additional parameters.

See the delegation endpoint in the Authentication API for more information.

###Validity
For customer application APIs registered in Auth0  - the validity of a delegation token issued for that target is governed by the setting for each application API in Apps/APIs -> Settings for “JWT expiration”.

For APIs registered as Addons in Auth0, the validity period of the token will vary by individual Addon.  The documentation available from the provider of any Addon API should be consulted for further information on tokens and expirations.


###Renewal of a delegation token
When a delegation token expires, the delegation endpoint can be used to obtain a token.

###Terminating a delegation token
The ability to revoke a delegation token will vary by individual Addon.  The documentation available from the provider of any Addon API should be consulted for further information on whether a token can be revoked and if so, how to do it.

The delegation tokens for customer APIs registered in Auth0 cannot be revoked.  A best practice, therefore, is to set the JWT expiration duration to a relatively short value.

###Uses
A delegation token should be obtained and used when a client program needs to call the API of either a) another application/API registered in Auth0 or b) the API for an Application Addon, such as Firebase or SAP, registered and configured in Auth0, in the same tenant as the calling program.
https://github.com/auth0/auth0.js#delegation-token-request

https://auth0.com/docs/libraries/auth0js#12

###Best Practices
For granularity of access control, good to set up different applications/APIs with different secrets, so that a delegation token can be issued uniquely for each application/API.

Tokens should be issued with a short timeframe for expiration, where configurable.


## The Auth0 APIv2 access token

The Auth0 APIv2 token is required to call v2 of the Auth0 Management API, frequently referred to as APIv2.  This token is used by a specific tenant in Auth0 to call Auth0 APIv2 to access or update records for that tenant.  This APIv2 token is a JWT, and contains various scopes, such as “read users” or “update clients”, and is signed with a client API key and secret for the entire tenant. 

###How to get a APIv2 token

An Auth0 APIv2 token can be generated on the Auth0 APIv2 explorer page or it can be created programmatically by building the JWT, including the desired scopes, and signing it with the tenant api key/secret.  

The Auth0 APIv2 explorer page is at:
https://auth0.com/docs/api/v2
Use the “SCOPES” section to select the scopes needed for the API call to be made.  For example, to make a call to the “List or search users” API call, one would need to select the “read:users” scope by selecting the entity “users”, then the action “read” and then clicking “->”.
The above steps would be repeated for additional scopes if multiple scopes are needed.
Once all necessary scopes have been specified, the field underneath “TOKEN GENERATOR” will contain the APIv2 token to pass to the APIv2 endpoint(s).

To generate an APIv2 token programmatically, build a JSON Web  Token (JWT) containing the necessary information and sign it with the tenant API Secret.   To build the JWT, it is helpful to use the APIv2 explorer, specify the desired scopes, and then click “Debug in jwt.io”.  This will create the JWT with the scopes you specified and display it in JWT format.  To get the API secret with which to sign the JWT, click on “API Key/Secret” in the Auth0 APIv2 API explorer.

###How to control contents of APIv2 token
The APIv2 token will be issued for a particular tenant.  To have a token issued in the APIv2 explorer for a particular tenant, log into the Auth0 tenant, and then access the APIv2 explorer page.  Similarly, to obtain the secret with which to sign an APIv2 token, log into the desired tenant first before accessing the APIv2 explorer page.

###Validity
There is no specific validity period for an APIv2 token.  An APIv2 token can be built programmatically, as desired, by a client.

###Renewal of an APIv2 token
There is no mechanism for renewing an APIv2 token.  A new token should be created whenever it is needed.

###Terminating an APIv2 token
There is no mechanism for terminating an APIv2 token.

###Uses
The Auth0 APIv2 access token is used to call the Auth0 Management APIv2.  This token is required to update the app_metadata portions of the user profile.

###Best Practices


#Scenarios/Use Cases
These scenarios are already covered, is it useful to have all the links in one place?

##Authenticating a user

https://auth0.com/docs/libraries/lock
https://github.com/auth0/auth0.js

##Getting user profile info from Auth0

See the User Profile doc we’re in the process of writing
Need URL once posted

https://auth0.com/docs/libraries/lock

https://github.com/auth0/auth0.js

See the /authorize, /userinfo and /tokeninfo endpoints within the Auth0 authentication API
https://auth0.com/docs/auth-api

See APIv2 - User endpoints
https://auth0.com/docs/api/v2

##Getting user profile info from other providers
Some basic user profile information from third party providers is made available in the Auth0 user profile object.   

##Calling the Auth0 APIv2
The Auth0 APIv2 can be called from a web application (not a Single Page Application) by embedding the application’s client id and client secret in the calls to the Auth0 APIv2 endpoints.   

(Note: Could the web application also generate an Auth0 APIv2 access token?)

Documentation on the available endpoints in Auth0 APIv2 are at:
https://auth0.com/docs/api/v2

##Calling the Auth0 Authentication API endpoints
The Auth0 Authentication API endpoints provide a rich set of features for authenticating users, retrieving tokens, refreshing tokens, and obtaining tokens with which to call other APIs.
https://auth0.com/docs/auth-api

##Calling the API of the social provider through which the user authenticated
https://auth0.com/docs/what-to-do-once-the-user-is-logged-in/index

##Calling an API developed by a customer
This is best done by registering the API in Auth0 and obtaining a delegation token with which to call the API.
https://auth0.com/docs/sequence-diagrams



Useful References for Further Reading
An overview explanation of JSON Web Tokens
https://auth0.com/docs/jwt

A writeup on the contents of a JSON Web Token
https://scotch.io/tutorials/the-anatomy-of-a-json-web-token

Wikipedia page on JSON Web Tokens
https://en.wikipedia.org/wiki/JSON_Web_Token

IETF RFC for JWT
https://tools.ietf.org/html/rfc7519

Debugger for viewing JSON Web Tokens
http://jwt.io/

The UI-less library for node.js clients of Auth0
https://auth0.com/docs/libraries/auth0js

Discussion of web apps vs apis, cookies vs tokens
https://auth0.com/docs/apps-apis

Blog Post: Cookies vs Tokens
https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/

Blog Post: Ten things about tokens
https://auth0.com/blog/2014/01/27/ten-things-you-should-know-about-tokens-and-cookies/

Describes the JWT expiration
https://auth0.com/docs/applications

doc on authentication api - /authorize, /userinfo, /tokeninfo, delegation, impersonation etc.
https://auth0.com/docs/auth-api

Discussion of how to link accounts and what that means for user profile and tokens of logged-in user.
https://auth0.com/docs/link-accounts

Discussion of clearing cookies set by auth0, use of the returnTo parm
https://auth0.com/docs/logout

(Find the sample and include link here that shows how to terminate a session)

Blog posts related to tokens
Using JWTs as API keys
https://auth0.com/blog/2014/12/02/using-json-web-tokens-as-api-keys/

Blacklisting JWTs
https://auth0.com/blog/2015/03/10/blacklist-json-web-token-api-keys/

Blog Post on vulnerabilities in use of JWT’s by libraries 
https://auth0.com/blog/2015/03/31/critical-vulnerabilities-in-json-web-token-libraries/

Some discussion of authorization and scopes here
https://auth0.com/docs/api/v2/changes

