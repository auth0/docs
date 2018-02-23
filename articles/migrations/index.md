---
toc: true
description: Occasionally, Auth0 engineers must make breaking changes to the Auth0 platform.
---
# Migrations

Occasionally, Auth0 engineers must make breaking changes to the Auth0 platform, primarily for security reasons. If a vulnerability or other problem in the platform is not up to our high standards of security, we work to correct the issue.

Sometimes a correction will cause a breaking change to customer's applications. Depending on the severity of the issue, we may have to make the change immediately.

For changes that do not require immediate changes, we often allow a grace period to allow you time to update your applications.

## Migration Process

The migration process is outlined below:

1. We update the platform and add a new migration option for existing customers, allowing a grace period for opt-in. New customers are always automatically enrolled in all migrations.
2. After a certain period, the migration is enabled for all customers. This grace period varies based on the severity and impact of the breaking change, typically 30 or 90 days.

During the grace period, customers are informed via dashboard notifications and emails to tenant administrators. You will continue to receive emails until the migration has been enabled on each tenant you administer.

If you need help with the migration, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

## Active Migrations

Current migrations are listed below, newest first. 

For migrations that have already been enabled for all customers, see [Past Migrations](/migrations/past-migrations).

### Introducing Lock v11 and Auth0.js v9

| Severity | Grace Period Start | Mandatory Opt-In|
| --- | --- | --- |
| Medium | 2017-12-21 |  2018-04-01 |

We are continually improving the security of our service. As part of this, we are deprecating some endpoints (/usernamepassword/login and /ssodata) used by Lock.js v8, v9, and v10 and and auth0.js, v6, v7, and v8. You should update your applications by **April 1, 2018**.

Here are the migration guides for [Auth0.js](/libraries/auth0js/v9/migration-guide) and for [Lock](/libraries/lock/v11/migration-guide).

#### Am I affected by the change?

If you are currently implementing login in your application with Lock v8, v9, or v10, or Auth0.js v6, v7, or v8, you will be affected by these changes. We **recommend** that applications using [universal login](/hosted-pages/login) update. However, those who are using Lock or Auth0.js embedded within their applications, however, are **required** to update, and applications which still use deprecated versions may cease to work at some point after the deadline.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

## Upcoming Endpoint Migrations

Based on customer feedback, we have adjusted our plans and will continue to maintain and support the below listed endpoints and features. 

We will publish guidance for each of the below scenarios on how to transition your applications to standards-based protocols. If we need to make security enhancements to any of these legacy endpoints which would require more urgency, we will promptly announce timeframes and guidelines for any required changes.

### Resource Owner Support for oauth/token Endpoint

Support was introduced for [Resource Owner Password](/api/authentication#resource-owner-password) to the [/oauth/token](/api/authentication#authorization-code) endpoint earlier this year. 

The current [/oauth/ro](/api/authentication#resource-owner) and [/oauth/access_token](/api/authentication#social-with-provider-s-access-token) endpoints will be deprecated in 2018.

#### Am I affected by the change?

If you are currently implementing the [/oauth/ro](/api/authentication#resource-owner) endpoint your application will need to be updated to use the [/oauth/token](/api/authentication#authorization-code) endpoint instead once migration guides are available.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### API Authorization with Third-Party Vendor APIs

The mechanism by which you get tokens for third-party / vendor APIs (for example AWS, Firebase, and others) is being changed. It will work the same as any custom API, providing better consistency. This new architecture will be available in 2018 and once it becomes available, the [/delegation](/api/authentication#delegation) endpoint will be officially deprecated.

#### Am I affected by the change?

If you are currently using [/delegation](/api/authentication#delegation) to provide third party authorization, your application will need to be updated once migration guides are available.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### Deprecating the Usage of ID Tokens on the Auth0 Management API

We are deprecating the usage of [ID Tokens](/tokens/id-token) when calling [/users](/api/management/v2#!/Users/get_users_by_id) and [/device-credentials](/api/management/v2#!/Device_Credentials/get_device_credentials). We have moved to regular [Management APIv2 Tokens](/api/management/v2/tokens). This is available now. Migration guides will be available in 2018.

#### Am I affected by the change?

If you are currently using [id tokens](/tokens/id-token) to access any part of the Management API, your application will need to be updated once migration guides are available.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### Improved OpenID Connect Interoperability in Auth0

The [userinfo](/api/authentication#get-user-info) endpoint is being updated to return [OIDC conformant user profile attributes](/user-profile/normalized/oidc). The most notable change is that `user_id` becomes `sub`. This will deprecate the [legacy Auth0 user profile](/user-profile/normalized/auth0) (in [userinfo](/api/authentication#get-user-info) and in [id tokens](/tokens/id-token)).

#### Am I affected by the change?

If you are currently using the [userinfo](/api/authentication#get-user-info) endpoint or receiving ID Tokens, you are affected by this change and need to update your implementation so that it expects normalized OIDC conformant user profile attributes once migration guides are available.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).
