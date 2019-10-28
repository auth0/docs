---
title: Application Types - First-party vs. third-party
description: Understand the difference between first-party and third-party application types.
toc: true
topics:
  - applications
  - application-types
contentType: concept
useCase:
  - build-an-app
---
# Application Types: First-party vs. Third-party

Applications can be classified as either first-party or third-party, which refers to the ownership of the application. The main difference relates to who has administrative access to your Auth0 domain.

## First-party applications

First-party applications are those controlled by the same organization or person who owns the Auth0 domain.

For example, let's say you created both a Contoso API and an application that logs into `contoso.com` and consumes the Contoso API. You would register both the API and application under the same Auth0 domain, and the application would be a first-party application.

By default, all applications created via the [Auth0 Dashboard](${manage_url}/#/applications) are first-party applications.

## Third-party applications

Third-party applications are controlled by someone who most likely should *not* have administrative access to your Auth0 domain. Third-party applications enable external parties or partners to securely access protected resources behind your API. 

For example, let's say you created a developer center that allows users to obtain credentials so they can integrate their apps with your API. (This functionality is similar to the log-in capabilities provided by well-known APIs such as Facebook, Twitter, and GitHub.) In this case, the applications calling your developer center would be third-party applications. 

Third-party applications must be created through the [Auth0 Management API](/api/management/v2#!/Clients/post_clients) by setting `is_first_party` to `false`.

<%= include('../../_includes/_enable-third-party-apps-info') %>

Third-party applications have the following unique characteristics:

- **User Consent**: You must require user consent when consuming APIs because anyone can create an application. Requiring the user to provide consent improves security.

- **ID Tokens**: [ID Tokens](/tokens/id-tokens) generated for third-party applications hold only minimum user profile information.

- **Connections**: You can only use tenant-level connections or *domain connections*. For more informations, see [Enable Third-party Applications](/applications/guides/enable-third-party-apps).

## Management APIv2
  
Both first- and third-party applications cannot use [ID Tokens](/tokens/id-tokens) to invoke [Management API](/api/management/v2) endpoints. Instead, they should get a [Management API Access Token](/api/management/v2/tokens) with the `current_user_*` scopes required by each endpoint:

- `read:current_user`: [List or search users](/api/management/v2#!/Users/get_users), [Get a user](/api/management/v2#!/Users/get_users_by_id), [Get user MFA enrollments](/api/management/v2#!/Users/get_enrollments)
- `update:current_user_metadata`: [Update a user](/api/management/v2#!/Users/patch_users_by_id), [Delete a user's multi-factor provider](/api/management/v2#!/Users/delete_multifactor_by_provider)
- `create:current_user_device_credentials`: [Create a device public key](/api/management/v2#!/Device_Credentials/post_device_credentials)
- `delete:current_user_device_credentials`: [Delete a device credential](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id)
- `update:current_user_identities`: [Link a user account](/api/management/v2#!/Users/post_identities), [Unlink a user identity](/api/management/v2#!/Users/delete_user_identity_by_user_id)

## Keep reading
* Learn how to check whether an application is first-party or third-party at [View Application Ownership](/api/management/guides/applications/view-ownership)
* Learn about other application categories, such as [confidential vs. public](/applications/concepts/app-types-confidential-public) and [Auth0 application types](/applications/concepts/app-types-auth0).
* Explore the grant types available for different application types at [Auth0 Grant Types Mapping](/applications/reference/grant-types-auth0-mapping).
