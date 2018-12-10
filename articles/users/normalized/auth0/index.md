---
description: Understand how Auth0 normalizes common user properties in the user profile.
topics:
  - user-profile
  - normalized-user-profile
  - users
  - auth0-user-profiles
contentType:
  - index
  - concept
useCase:
  - manage-users
v2: true
---

# Normalized User Profiles

::: version-warning
This version described a user's profile as normalized by Auth0. Use the dropdown for the user profile structure that conforms with the OIDC specification and includes only the standard claims.
:::

The Auth0 Normalized User Profile is a protocol-agnostic representation of the user that provides a standard way of storing user-related claims, regardless of the identity provider(s) involved. 

Since every identity provider provides a different set of information about a user, Auth0 normalizes common profile properties in the user profile. For example, `family_name` in the user profile contains details that may be returned as `surname` or `last_name`.

The Auth0 claims included in the normalized user profile differ from the standard set of claims that can be returned in ID Tokens from the [Authentication API's `oauth/token` endpoint](/api/authentication#get-token) or the response from the [/userinfo](/api/authentication#user-profile) endpoint (both of which follow the requirements detailed in the OIDC specification). 

## Keep reading

* [Store User Data](/users/normalized/auth0/store-user-data)
* [Identify Users](/users/normalized/auth0/identify-users)
* [Retrieve User Profiles](/users/normalized/auth0/retrieve-user-profiles)
* [Normalized User Profile Schema](/users/normalized/auth0/normalized-user-profile-schema) 
* [Sample User Profiles](/users/normalized/auth0/sample-user-profiles)
* [Claims for User Profile Returned via OIDC-Compliant Authorization Flow](/users/normalized/oidc)
