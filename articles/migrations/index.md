---
toc: true
title: Auth0 Migrations
description: List of all the changes made on Auth0 platform that might affect customers
topics:
  - migrations
contentType:
  - concept
  - reference
useCase:
  - migrate
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

### Node.js v8 for Webtask Runtime

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| High | 2018-04-17 | 2018-04-30 |

The Webtask engine powering Auth0 extensibility points currently utilizes Node 4. Beginning **30 April 2018**, [Node.js v4 will no longer be under long-term support (LTS)](https://github.com/nodejs/Release#release-schedule). This means that critical security fixes will no longer be back-ported to this version. As such, Auth0 will be migrating the Webtask runtime from Node.js v4 to Node.js v8.

On **17 April 2018** we will make the Node 8 runtime available for extensibility to all public cloud customers. You will be provided a migration switch that allows you to control your environment's migration to the new runtime environment.

For more information on this migration and the steps you should follow to upgrade your implementation, see [Migration Guide: Extensibility and Node.js v8](/migrations/guides/extensibility-node8).

### Introducing Lock v11 and Auth0.js v9

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2017-12-21 |  2018-08-06 |

We are continually improving the security of our service. As part of this effort, we have deprecated the Legacy Lock API, which consists of the /usernamepassword/login and /ssodata endpoints. These endpoints are used by Lock.js v8, v9, and v10 and Auth0.js, v6, v7, and v8, and can also be called directly from applications.

As of August 6, 2018, Auth0 has permanently disabled the Legacy Lock API. This removal of service fully mitigates the CSRF vulnerability [disclosed in April 2018](https://auth0.com/blog/managing-and-mitigating-security-vulnerabilities-at-auth0/). This also ends the soft removal grace period that was [first announced on July 16, 2018](https://community.auth0.com/t/auth0-legacy-lock-api-disabled-grace-period-available/12949), meaning the Legacy Lock API can no longer be re-enabled.

If your Legacy Lock API migration has not yet been completed, your users may experience an outage, failed logins, or other adverse effects. You will need to complete your migration in order to restore normal functionality. Refer to the [Legacy Lock API Deprecation Guide](/migrations/guides/legacy-lock-api-deprecation) to determine the correct path for your needs; you may also wish to consult the [Deprecation Error Reference](/errors/deprecation-errors) to identify the source(s) of any errors in your tenant logs. 

#### Am I affected by the change?

If you are currently implementing login in your application with Lock v8, v9, or v10, or Auth0.js v6, v7, or v8, you are affected by these changes. Additionally, you are affected if your application calls the /usernamepassword/login or /ssodata endpoints directly via the API.

We **recommend** that applications using [Universal Login](/hosted-pages/login) update the library versions they use inside of the login page.

However, those who are using Lock or Auth0.js embedded within their applications, or are calling the affected API endpoints directly, are **required** to update, and applications which still use deprecated endpoints will cease to function properly after the removal of service date.

Libraries and SDKs not explicitly named here are not affected by this migration.

If you have any questions, reach out in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### Deprecating the usage of ID Tokens on the Auth0 Management API

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2018-03-31 |  - |

For some use cases you can use [ID Tokens](/tokens/id-token) as credentials in order to call the [Management API](/api/management/v2). This functionality is being deprecated.

This is used by the [Users](/api/management/v2#!/Users/get_users_by_id) and [Device Credentials](/api/management/v2#!/Device_Credentials/get_device_credentials) endpoints.

List of affected endpoints:

| **Endpoint** | **Use Case** |
|-|-|
| [GET /api/v2/users/{id}](/api/management/v2#!/Users/get_users_by_id) | Retrieve a user's information |
| [GET /api/v2/users/{id}/enrollments](/api/management/v2#!/Users/get_enrollments) | Retrieve all [Guardian](/multifactor-authentication/factors/push) MFA enrollments for a user |
| [PATCH /api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) | Update a user's information |
| [DELETE /api/v2/users/{id}/multifactor/{provider}](/api/management/v2#!/Users/delete_multifactor_by_provider) | Delete the [multifactor](/multifactor-authentication) provider settings for a user |
| [POST /api/v2/device-credentials](/api/management/v2#!/Device_Credentials/post_device_credentials) | Create a public key for a device |
| [DELETE /api/v2/device-credentials/{id}](/api/management/v2#!/Device_Credentials/delete_device_credentials_by_id) | Delete a device credential |
| [POST/api/v2/users/{id}/identities](/api/management/v2#!/Users/post_identities) | [Link user accounts](/link-accounts) from various identity providers |
| [DELETE /api/v2/users/{id}/identities/{provider}/{user_id}](/api/management/v2#!/Users/delete_provider_by_user_id) | [Unlink user accounts](/link-accounts#unlinking-accounts) |

These endpoints can now accept regular [Access Tokens](/tokens/access-token).

The functionality is available and affected users are encouraged to migrate. However the ability to use ID Tokens will not be disabled in the foreseeable future so the mandatory opt-in date for this migration remains open. When this changes, customers will be notified beforehand.

For more information on this migration and the steps you should follow to upgrade your implementation, see the [Migration Guide: Management API and ID Tokens](/migrations/guides/calling-api-with-idtokens).

#### Am I affected by the change?

If you are currently using [ID Tokens](/tokens/id-token) to access any part of the Management API, your application will need to be updated.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

## Upcoming migrations

Based on customer feedback, we have adjusted our plans and will continue to maintain and support the below listed endpoints and features.

We will publish guidance for each of the below scenarios on how to transition your applications to standards-based protocols. If we need to make security enhancements to any of these legacy endpoints which would require more urgency, we will promptly announce timeframes and guidelines for any required changes.

### Resource Owner support for oauth/token endpoint

Support was introduced for [Resource Owner Password](/api/authentication#resource-owner-password) to the [/oauth/token](/api/authentication#authorization-code) endpoint earlier this year.

#### Am I affected by the change?

If you are currently implementing the [/oauth/ro](/api/authentication#resource-owner) endpoint your application can be updated to use the [/oauth/token](/api/authentication#authorization-code) endpoint. For details on how to make this transition, see the [Migration Guide for Resource Owner Password Credentials Exchange](/migrations/guides/migration-oauthro-oauthtoken).

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### API authorization with third-party vendor APIs

The mechanism by which you get tokens for third-party / vendor APIs (for example AWS, Firebase, and others) is being changed. It will work the same as any custom API, providing better consistency. This new architecture will be available in 2019 and once it becomes available, the [/delegation](/api/authentication#delegation) endpoint will be officially deprecated.

#### Am I affected by the change?

If you are currently using [/delegation](/api/authentication#delegation) to provide third party authorization, your application will need to be updated once migration guides are available.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### Improved OpenID Connect interoperability in Auth0

The [userinfo](/api/authentication#get-user-info) endpoint is being updated to return [OIDC conformant user profile attributes](/users/normalized/oidc). The most notable change is that `user_id` becomes `sub`. This will deprecate the [legacy Auth0 user profile](/users/normalized/auth0) (in [userinfo](/api/authentication#get-user-info) and in [ID Tokens](/tokens/id-token)).

#### Am I affected by the change?

If you are currently using the [/userinfo](/api/authentication#get-user-info) endpoint or receiving ID Tokens, you are affected by this change and need to update your implementation so that it expects normalized OIDC conformant user profile attributes once migration guides are available.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).
