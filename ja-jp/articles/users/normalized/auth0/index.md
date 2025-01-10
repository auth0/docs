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

::: warning
This version describes the user profile as normalized by Auth0. Use the dropdown to locate the user profile structure that conforms with the OIDC specification and includes only the standard claims.
:::

The Normalized User Profile is an Auth0-specific way of standardizing and storing user-related information. Because every [Identity Provider](/connections) (IdP) provides a different set of information about a user, Auth0 normalizes common profile properties into a protocol-agnostic representation of the user when storing user-related claims. For example, `family_name` in the normalized user profile contains details that may be returned to an IdP as `surname` or `last_name`.

As such, the Auth0 claims included in the normalized user profile differ from the standard set of claims that can be returned in ID Tokens from the [Authentication API's `oauth/token` endpoint](/api/authentication#get-token) or in the response from the [/userinfo](/api/authentication#user-profile) endpoint (both of which follow the requirements detailed in the OIDC specification). 

To learn about the attributes included in the Normalized User Profile and understand how you can work with them, visit [User Profile Structure](/users/references/user-profile-structure).

## Keep reading

* [User Profile Structure](/users/references/user-profile-structure)
* [Store User Data](/users/normalized/auth0/store-user-data)
* [Identify Users](/users/normalized/auth0/identify-users)
* [Retrieve User Profiles](/users/search)
* [Update User Profile Root Attributes](/users/normalized/auth0/update-root-attributes)
* [Normalized User Profile Schema](/users/normalized/auth0/normalized-user-profile-schema) 
* [Sample User Profiles](/users/normalized/auth0/sample-user-profiles)
* [Claims for User Profile Returned via OIDC-Compliant Authorization Flow](/users/normalized/oidc)
