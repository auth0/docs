---
toc: true
title: Auth0 Migrations
description: List of all the changes made on Auth0 platform that might affect customers
---

# Migrations

Occasionally, Auth0 engineers must make breaking changes to the Auth0 platform, primarily for security reasons. If a vulnerability or other problem in the platform is not up to our high standards of security, we work to correct the issue.

Sometimes a correction will cause a breaking change to customer's applications. Depending on the severity of the issue, we may have to make the change immediately.

For changes that do not require immediate changes, we often allow a grace period to allow you time to update your applications.

## Migration process

The migration process is outlined below:

1. We update the platform and add a new migration option for existing customers, allowing a grace period for opt-in. New customers are always automatically enrolled in all migrations.
2. After a certain period, the migration is enabled for all customers. This grace period varies based on the severity and impact of the breaking change, typically 30 or 90 days.

During the grace period, customers are informed via dashboard notifications and emails to tenant administrators. You will continue to receive emails until the migration has been enabled on each tenant you administer.

If you need help with the migration, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

## Active migrations

Current migrations are listed below, newest first. 

For migrations that have already been enabled for all customers, see [Past Migrations](/migrations/past-migrations).

### Introducing Lock v11 and Auth0.js v9

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2017-12-21 |  2018-07-16 |

We are continually improving the security of our service. As part of this, we are deprecating some endpoints (/usernamepassword/login and /ssodata) used by Lock.js v8, v9, and v10 and and auth0.js, v6, v7, and v8. 

Previously, these endpoints were planned to be removed from service on April 1, 2018. However, the Removal of Service date for those endpoints has been extended to **July 16, 2018**.

Customers are still encouraged to migrate applications to the latest version of Lock 11 and Auth0.js 9 **as soon as possible** in order to ensure that applications continue to function properly. 

Please refer to our migration guides for [Auth0.js](/libraries/auth0js/v9/migration-guide) and for [Lock](/libraries/lock/v11/migration-guide) for instructions on upgrading your Auth0 implementation prior to **July 16, 2018**.

#### Am I affected by the change?

If you are currently implementing login in your application with Lock v8, v9, or v10, or Auth0.js v6, v7, or v8, you will be affected by these changes. We **recommend** that applications using [universal login](/hosted-pages/login) update. 

However, those who are using Lock or Auth0.js embedded within their applications, however, are **required** to update, and applications which still use deprecated versions may cease to work at some point after the deadline.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

## Upcoming migrations

Based on customer feedback, we have adjusted our plans and will continue to maintain and support the below listed endpoints and features. 

We will publish guidance for each of the below scenarios on how to transition your applications to standards-based protocols. If we need to make security enhancements to any of these legacy endpoints which would require more urgency, we will promptly announce timeframes and guidelines for any required changes.

### Resource Owner support for oauth/token endpoint

Support was introduced for [Resource Owner Password](/api/authentication#resource-owner-password) to the [/oauth/token](/api/authentication#authorization-code) endpoint earlier this year.

#### Am I affected by the change?

If you are currently implementing the [/oauth/ro](/api/authentication#resource-owner) endpoint your application will be able to be updated to use the [/oauth/token](/api/authentication#authorization-code) endpoint instead once migration guides are available.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### API authorization with third-party vendor APIs

The mechanism by which you get tokens for third-party / vendor APIs (for example AWS, Firebase, and others) is being changed. It will work the same as any custom API, providing better consistency. This new architecture will be available in 2018 and once it becomes available, the [/delegation](/api/authentication#delegation) endpoint will be officially deprecated.

#### Am I affected by the change?

If you are currently using [/delegation](/api/authentication#delegation) to provide third party authorization, your application will need to be updated once migration guides are available.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### Deprecating the usage of ID Tokens on the Auth0 Management API

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2017-12-21 |  2018-06-01 |

For some use cases you could use [ID Tokens](/tokens/id-token) as credentials in order to call the [Management API](/api/management/v2). This functionality is being deprecated.

This was used by the [/users](/api/management/v2#!/Users/get_users_by_id) and [/device-credentials](/api/management/v2#!/Device_Credentials/get_device_credentials) endpoints. The affected endpoints are the following.

| **Endpoint** | **Use Case** |
|-|-|
| [GET /api/v2/users/{id}](/api/management/v2#!/Users/get_users_by_id) | Retrieve a user's information |
| [GET /api/v2/users/{id}/enrollments](/api/management/v2#!/Users/get_enrollments) | Retrieve all [Guardian](/multifactor-authentication/guardian) MFA enrollments for a user |
| [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) | Update a user's information |
| [DELETE /api/v2/users/{id}/multifactor/{provider}](/api/management/v2#!/Users/delete_multifactor_by_provider) | Delete the [multifactor](/multifactor-authentication) provider settings for a user |
| [POST /api/v2/device-credentials](/api/management/v2#!/Device_Credentials/post_device_credentials) | Create a public key for a device |
| [DELETE /api/v2/device-credentials/{id}](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) | Delete a device credential |
| [POST/api/v2/users/{id}/identities](/api/management/v2#!/Users/post_identities) | [Link user accounts](/link-accounts) from various identity providers |
| [DELETE /api/v2/users/{id}/identities/{provider}/{user_id}](/api/management/v2#!/Users/delete_provider_by_user_id) | [Unlink user accounts](/link-accounts#unlinking-accounts) |

These endpoints will now accept regular [Access Tokens](/access-token). This functionality is available now.

To get a valid Access Token for these endpoints during authorization, you have to set the **audience** parameter to `https://${account.namespace}/api/v2/` and the **scope** parameter to the scopes required by each endpoint, according to the following table.

| **Scope** | **Endpoints** |
|-|-|
| `read:current_user` | [GET /api/v2/users/{id}](/api/management/v2#!/Users/get_users_by_id) </br> [GET /api/v2/users/{id}/enrollments](/api/management/v2#!/Users/get_enrollments) |
| `update:current_user_identities` | [POST/api/v2/users/{id}/identities](/api/management/v2#!/Users/post_identities) </br> [DELETE /api/v2/users/{id}/identities/{provider}/{user_id}](/api/management/v2#!/Users/delete_provider_by_user_id) |
| `update:current_user_metadata` | [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) |
| `create:current_user_metadata` | [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) |
| `delete:current_user_metadata` | [DELETE /api/v2/users/{id}/multifactor/{provider}](/api/management/v2#!/Users/delete_multifactor_by_provider) |
| `create:current_user_device_credentials` | [POST /api/v2/device-credentials](/api/management/v2#!/Device_Credentials/post_device_credentials) |
| `delete:current_user_device_credentials` | [DELETE /api/v2/device-credentials/{id}](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) |

For example, the [GET /api/v2/users/{id} endpoint](/api/management/v2#!/Users/get_users_by_id) requires the `read:current_user` scope which will allow the end-user to retrieve the details of the currently logged in user (the one that the token was issued for).

For detailed steps and code samples on how to get a token, see [How to get an Access Token](/tokens/access-token#how-to-get-an-access-token).

Applications must be updated by June 1, 2018, when the ability to use ID Tokens will be disabled. Migration guides will be available by the end of March 2018.

#### Am I affected by the change?

If you are currently using [ID Tokens](/tokens/id-token) to access any part of the Management API, your application will need to be updated.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### Improved OpenID Connect interoperability in Auth0

The [userinfo](/api/authentication#get-user-info) endpoint is being updated to return [OIDC conformant user profile attributes](/user-profile/normalized/oidc). The most notable change is that `user_id` becomes `sub`. This will deprecate the [legacy Auth0 user profile](/user-profile/normalized/auth0) (in [userinfo](/api/authentication#get-user-info) and in [id tokens](/tokens/id-token)).

#### Am I affected by the change?

If you are currently using the [/userinfo](/api/authentication#get-user-info) endpoint or receiving ID Tokens, you are affected by this change and need to update your implementation so that it expects normalized OIDC conformant user profile attributes once migration guides are available.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).
