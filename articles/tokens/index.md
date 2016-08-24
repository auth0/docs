---
url: /tokens
---

# Tokens

## Overview

This document is designed to clarify and disambiguate the numerous types of tokens referenced in Auth0 documentation, what each is used for and how to use it.

First there are a couple different categories of tokens:

* JSON Web Tokens (JWT) - These are tokens that conform to the [JSON Web Token standard](/jwt) and contain information about an identity in the form of claims.  They are self-contained in that it is not necessary for the recipient to call a server to validate the token.
* Opaque tokens - Opaque tokens are tokens in a proprietary format that typically contain some identifier to information in a server’s persistent storage.  To validate an opaque token, the recipient of the token needs to call the server that issued the token.

There are six primary tokens used in Auth0's token based authentication scenarios and referenced in Auth0 documentation:

- [Auth0 `id_token` (JWT)](#auth0-id_token-jwt-)
- [Auth0 `access_token`](#auth0-access_token)
- [Identity Provider Access Tokens](#identity-provider-access-tokens)
- [Auth0 `refresh_token`](#auth0-refresh_token)
- [Delegation Tokens](#delegation-tokens)
- [Auth0 Management APIv2 Token](#auth0-management-apiv2-token)

## Auth0 `id_token` (JWT)

The Auth0 `id_token` is a token in JSON Web Token (JWT) format, which provides a mechanism for transferring claims about a user from Identity Providers, who are authoritative sources of such information, to other relying parties, such as websites or web services, also known as service providers, who need such information.  The claims included in a JWT can be basic profile attributes such as a name or email address as well as security information such as a group membership or the support plan a user is entitled to use.

[More information](/tokens/id_token)

## Auth0 `access_token`

The Auth0 access token is a random, opaque string and was used to call portions of the Auth0 Management API (API v1) and the `/userinfo` endpoint within the Auth0 Authentication API.

[More information](/tokens/access_token)

## Identity Provider Access Tokens

When a user authenticates via Auth0 with another social provider's authentication service, such as Facebook or LinkedIn, the social provider will return an access token that can be used by the client program to call that social provider's API.

[More information](/tokens/idp)

## Auth0 `refresh_token`

The Refresh token is a long-lived token that is used to obtain a new [`id_token`](#auth0-idtoken-jwt) after a previous one has expired.  This is useful for applications running on mobile devices that call remote APIs and do not want to require the user to log in every time the user uses the mobile app.

[More information](/tokens/refresh_token)

## Delegation Tokens

The Auth0 [`id_token`](#auth0-idtoken-jwt)'s can be exchanged for another token, called a Delegation Token, that can be used to call either other application APIs registered as clients in the same Auth0 tenant or APIs represented by some types of application Addons registered in the same Auth0 tenant.

[More information](/tokens/delegation)

## Auth0 Management APIv2 Token

The Auth0 Management APIv2 token is used to call v2 of the Auth0 Management API.  This allows a specific tenant in Auth0 to call Auth0 APIv2.  This APIv2 token is a JWT, and contains various scope claims, such as `read:users` or `update:clients`, and is signed with a client API key and secret for the entire tenant.

[More information](/api/v2/tokens)

---

## Additional Reading and References

### Authenticating a user

* [Authentication with Lock widget](/libraries/lock)
* [Authentication with Auth0.js library](https://github.com/auth0/auth0.js)
* [List of tutorials for other languages](/tutorials)

### Getting User Profile info from Auth0

* [User profile overview](/user-profile)
* [Getting user profile with Lock widget](/libraries/lock)
* [Getting user profile with Auth0.js library](https://github.com/auth0/auth0.js)
* See the `/authorize`, `/userinfo` and `/tokeninfo` endpoints within the [Auth0 Authentication API](/auth-api)
* [List of tutorials for other languages](/tutorials)
* [Management APIv2 - User endpoints](/api/v2)

### Getting User Profile info from other providers

Some basic user profile information from third party providers is made available in the Auth0 user profile object.

* [User profile overview](/user-profile)

### Calling the Auth0 Management APIv2

The Auth0 Management APIv2 can be called from a web application (not a Single Page Application) by embedding the application’s client id and client secret in the calls to the Auth0 Management APIv2 endpoints.

* [Management APIv2 Explorer page](/api/v2)
* [Management APIv2 vs APIv1 and some discussion of authorization and scopes](/api/v2/changes)

### Calling the Auth0 Authentication API endpoints

The Auth0 Authentication API endpoints provide a rich set of features for authenticating users, retrieving tokens, refreshing tokens, and obtaining tokens with which to call other APIs. This API provides the /authorize, /userinfo, /tokeninfo, /delegation, and  impersonation endpoints.

* [Auth0 authentication API](/auth-api)

### Calling the API of the social provider through which the user authenticated

* [Sample of what to do once the user is logged in](/what-to-do-once-the-user-is-logged-in/index)

### Calling an API developed by a customer

This is best done by registering the API in Auth0 and obtaining a delegation token with which to call the API.

* [Sequence Diagrams illustrating flow](/sequence-diagrams)

### Logout

* [Discussion of clearing cookies set by auth0, use of the returnTo parm](/logout)

### Account Linking

* [How to link accounts and impact on user profile and tokens](/link-accounts)
