---
description: Normalized User Profile schema reference. 
topics:
  - user-profile
  - normalized-user-profile
  - users
  - auth0-user-profiles
contentType:
  - reference
useCase:
  - manage-users
v2: true
---
# Normalized User Profile Schema

The attributes that Auth0 maps to a common schema are listed below.

Fields that are always generated:

* **`name`**: the user's full name.
* **`nickname`**: the user's username if available, else the local-part of the user's email.
* **`picture`**: the URL of the [user's picture](/users/guides/change-user-pictures). If unavailable, Auth0 uses the Gravatar image associated with the user's email address.
* **`user_id`**: the user's unique identifier. This is unique per Connection, but the same for all apps that authenticate via that Connection.

By default, a user's `name`, `nickname`, and `picture` attributes provided by identity providers other than Auth0 (such as Google, Facebook, Twitter) are not directly editable since they are updated from the identity provider each time a user logs in. If you want to be able to edit these attributes, you must [configure your connection sync with Auth0](/dashboard/guides/connections/configure-connection-sync) so that user attributes will be updated from the identity provider only on user profile creation. Root attributes will then be available to be [edited individually](/api/management/guides/users/update-root-attributes-users) or [by bulk import](/api/management/guides/users/update-root-attributes-users) using the Management API.

Fields that are generated when the details are available:

* **`email`**: the user's email address.
* **`email_verified`**: a boolean indicating if the user's email address has been verified.
* **`given_name`**: the user's first name.
* **`family_name`**: the user's last name.

::: note
When creating a user with the [create a User Management API endpoint](/api/management/v2#!/Users/post_users) you can submit the `given_name` and `family_name`. By default, a user's `given_name` and `family_name` attributes provided by identity providers other than Auth0 (such as Google, Facebook, Twitter) are not directly editable since they are updated from the identity provider each time a user logs in. If you want to be able to edit these attributes, you must [configure your connection sync with Auth0](/dashboard/guides/connections/configure-connection-sync) so that user attributes will be updated from the identity provider only on user profile creation. Root attributes will then be available to be [edited individually](/api/management/guides/users/update-root-attributes-users) or [by bulk import](/api/management/guides/users/update-root-attributes-users) using the Management API
:::

::: panel Custom Databases
If you are writing a login script for a [custom database](/connections/database/mysql) you are responsible for returning the information in the user profile. A unique and immutable `user_id` property is mandatory to correctly identify the user (see [Uniquely Identify Users](/users/normalized/auth0/identify-users)).
:::

## Additional Attributes

The User Profile includes an array of identities. In the most common case (logging in with a single provider), the array contains only one element. If the user has multiple accounts linked, the array will have an element for each associated account. See [User Account Linking](/users/concepts/overview-user-account-linking) for more information. 
:::

The `identities` array contains the following attributes:

* `connection`: the name of the connection.
* `isSocial`: indicates if the provider is a Social provider.
* `provider`: the provider of the connection.
* `user_id`: the unique identifier of the user for this connection.

::: note
Auth0 will pass to your app all other properties supplied by the identity provider, even if those that are not mapped to the standard attributes listed above.
:::

## Keep reading

* [User Profile Structure](/users/references/user-profile-structure)
* [Update User Profile Root Attributes](/users/normalized/auth0/update-root-attributes)
* [Normalized User Profiles Overview](/users/normalized)
* [Identify Users](/users/normalized/auth0/identify-users)
* [Store User Data](/users/normalized/auth0/store-user-data)
* [Retrieve User Profiles](/users/search)
* [Sample User Profiles](/users/normalized/auth0/sample-user-profiles)
* [Claims for User Profile Returned via OIDC-Compliant Authorization Flow](/users/normalized/oidc)
