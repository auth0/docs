---
title: Application Types - First-party vs. third-party
description: Understand the difference between first-party and third-party application types.
toc: true
topics:
  - applications
  - application-types
contentType: reference
useCase:
  - build-an-app
---
# Application Types: First-party vs. Third-party

## First vs third-party applications

First-party and third-party refer to the ownership of the application. This has implications in terms of who has administrative access to your Auth0 domain.

### First-party applications

First-party applications are those controlled by the same organization or person who owns the Auth0 domain. For example, if you wanted to access the Contoso API, you'd use a first-party applications to log into `contoso.com`.

All applications created via the [Dashboard](${manage_url}/#/applications) are first-party by default.

### Third-party applications

Third-party applications are controlled by someone who most likely should *not* have administrative access to your Auth0 domain. Third-party applications enable external parties or partners to access protected resources behind your API securely. For example, if you were to create a developer center that allows users to obtain credentials to integrate their apps with your API (this functionality is similar to those provided by well-known APIs such as Facebook, Twitter, and GitHub), you would use a third-party applications. 

Third-party applications must be created through the [Management API](/api/management/v2#!/Clients/post_clients) by setting `is_first_party` to `false`.

Third party applications have the following characteristics:

- They cannot skip user consent when consuming APIs. This is for security purposes, as anyone can create an applications, but each applications relies on the final user to provide consent.
- The [ID Tokens](/tokens/id-token) generated for these applications, hold minimum user profile information.
- They can use only tenant level connections (domain connections). These are sources of users, configured in the tenant's [dashboard](${manage_url}) as connections. These connections are enabled for every third party applications and can be also enabled for selected first party (standard) applications.
- To authenticate users using [Lock](/libraries/lock), you will have to use a version greater than `10.7`.
  - [PSaaS Appliance](/appliance) users must use `https://{config.auth0Domain}/` as the value for [the `configurationBaseUrl` option](https://github.com/auth0/lock#other-options).
- They cannot use [ID Tokens](/tokens/id-token) to invoke [Management APIv2](/api/management/v2) endpoints. Instead, they should get a Management APIv2 Token (see the *How to get a Management APIv2 Token* panel for details). Note that the applications should be granted the `current_user_*` scopes, as required by each endpoint.
  - `read:current_user`: [List or search users](/api/management/v2#!/Users/get_users), [Get a user](/api/management/v2#!/Users/get_users_by_id), [Get user Guardian enrollments](/api/management/v2#!/Users/get_enrollments)
  - `update:current_user_metadata`: [Update a user](/api/management/v2#!/Users/patch_users_by_id), [Delete a user's multi-factor provider](/api/management/v2#!/Users/delete_multifactor_by_provider)
  - `create:current_user_device_credentials`: [Create a device public key](/api/management/v2#!/Device_Credentials/post_device_credentials)
  - `delete:current_user_device_credentials`: [Delete a device credential](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id)
  - `update:current_user_identities`: [Link a user account](/api/management/v2#!/Users/post_identities), [Unlink a user identity](/api/management/v2#!/Users/delete_provider_by_user_id)

::: panel How to get a Management APIv2 Token
In order to access the [Management APIv2](/api/management/v2) endpoints from a third party applications, you need a Management APIv2 Token. To get one you can use any of the [API Authorization Flows](/api-auth), with the following request parameters:
- `audience=https://${account.namespace}/api/v2/`
- `scope=read:current_user update:current_user_metadata`
:::

## Keep reading
* [How to View an Application Type: First-Party or Third-Party](/applications/guides/view-application-type-first-party)
