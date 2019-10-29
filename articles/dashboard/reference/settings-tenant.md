---
title: Tenant Settings
description: Learn about the settings related to tenants available in the Auth0 Dashboard.
toc: true
topics:
  - dashboard
  - tenants
contentType: reference
useCase: manage-accounts
---

# Tenant Settings

The [Tenant Settings](${manage_url}/#/tenant) page of the [Auth0 Dashboard](${manage_url}/) allows you to configure various settings related to your Auth0 tenant.

## General

The **General** tab contains settings that are typically set for tenants. Use this section to customize general tenant settings that will be used in the [Lock](https://auth0.com/lock) widget, emails, and various other pages displayed to your users.

### Basic Settings

![Tenant Settings: Basic Settings](/media/articles/tutorials/tenant-settings/settings.png)

* **Friendly Name**: Name you want displayed to your users, usually the name of your company or organization.
* **Logo URL**: URL of your logo; it should be a square. This image will appear to your users on various screens and pages.
* **Support Email**: Email address used to contact your support team.
* **Support URL**: Link to your company/organization support page.

### API Authorization Settings

* **Default Audience**: API Identifier that should be the default audience when using [API Authorization](/api-auth) flows. If you enter a value, all [Access Tokens](/tokens/access-token) issued by Auth0 will specify this API Identifier as an audience.

::: note
Setting the Default Audience is equivalent to appending this audience to every authorization request made to your tenant for every application. This will cause new behavior that might result in breaking changes for some of your applications. Please contact support if you require assistance.
:::

* **Default Directory**: Name of the connection to be used for [Password Grant exchanges](/api-auth/tutorials/password-grant). Its value should be the exact name of an existing [connection](/connections) for one of the following strategies: `auth0-adldap`, `ad`, `auth0`, `email`, `sms`, `waad`, or `adfs`.

### Error Pages

![Tenant Settings: Error Pages](/media/articles/tutorials/tenant-settings/error-pages.png)

In the event of an authorization error, you can either display a generic error page to your users or you can redirect users to your own custom error page. To learn more, see [Custom Error Pages](/hosted-pages/custom-error-pages).

### Languages

* **Default Language**: Language your tenant will use by default.

* **Supported Languages**: Languages also supported by your tenant.

## Subscription

![Tenant Settings: Subscription](/media/articles/tutorials/tenant-settings/billing.png)

The **Subscription** tab allows you to review your current subscription and compare features of your current plan to other Auth0 subscription plans. You may also change your subscription plan. To learn more, see [Changing Your Subscription](/support/subscription).

## Payment

The **Payment** tab allows you to enter or update your billing details.

## Active Users

**Active Users** functionality has been moved to the [Quota Utilization Report](https://support.auth0.com/reports/quota) in the Support Center.

## Dashboard Admins

The **Dashboard Admin** tab lists administrators assigned to your tenant. You may also add or remove tenant administrators and review whether administrator accounts have multi-factor authentication (MFA) enabled. To learn more, see [Manage Dashboard Admins](/tutorials/manage-dashboard-admins).

## Webtasks

<%= include('../../_includes/_webtask') %>

The **Webtasks** tab describes how to build apps and extensions on top of [webtask.io](https://webtask.io/), which is used by the Auth0 rules engine.

## Custom Domains

The **Custom Domains** tab allows you to configure a custom domain, which allows you to maintain a consistent user experience. When a custom domain is configured, users will remain in your domain for login rather than being redirected to your *auth0.com* domain. To learn more, see [Custom Domains](/custom-domains).

::: note
Custom domains are not available for free plans. To configure a custom domain, you must upgrade your account to any paid plan.
:::

## Advanced

The **Advanced** tab contains advanced settings that are sometimes set for tenants. On this tab, you can also delete your tenant and cancel all associated subscriptions.

::: warning
Deleted tenants cannot be restored and the tenant name cannot be used again when creating new tenants. If you want to change ownership of your tenant, see [Update Tenant Admin](/dashboard/manage-dashboard-admins#update-admin). If you want to reset your tenant configuration, see [Reset Tenants](/support/delete-reset-tenant#reset-tenants). 
:::

### Login and Logout

![Advanced Tenant Settings: Login and Logout](/media/articles/tutorials/tenant-settings/login-logout.png)

* **Allowed Logout URLs**: URLs that Auth0 can redirect to after logout when no `client_id` is specified on the logout endpoint invocation. Useful as a global list when <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> is enabled. To learn more, see [Logout](/logout).

* **Tenant Login URI**: URI that points to a route in your application that starts the OIDC login flow by redirecting to the `/authorize` endpoint; it should take the form of `https://mytenant.org/login`. This will only be used in scenarios where Auth0 needs your tenant to start the OIDC login flow. To learn more, see [Tenant Default Login URI](/universal-login/default-login-url).

### Login Session Management

These settings configure the login session lifetime, which represents the Auth0 Authorization Server session layer. The Authorization Server session layer drives Single Sign-on (SSO). To learn more, see [Single Sign-on](/sso).

::: note
Timeouts for tokens issued by Auth0 can be configured elsewhere. Token timeouts are often used to drive the Application session layer and appear in token claims, such as in the expiration claim for <dfn data-key="openid">OpenID Connect (OIDC)</dfn> ID Tokens or the lifetime assertion for <dfn data-key="security-assertion-markup-language">SAML</dfn>.
:::

![Advanced Tenant Settings: Login Session Management](/media/articles/tutorials/tenant-settings/session-timeout.png)

* **Enable Seamless SSO**: When enabled, users will not be prompted to confirm log in before Single Sign-on (SSO) redirection.

* **Inactivity Timeout**: Timeframe (in minutes) after which a user's session will expire if they haven’t interacted with the Authorization Server. Will be superseded by system limits if over 4,320 minutes (3 days) for self-service plans or 144,000 minutes (100 days) for enterprise plans. To learn more, see [Single Sign-On](/sso).

* **Require Login After**: Timeframe (in minutes) after which a user will be required to log in again, regardless of their activity. Will be superseded by system limits if over 43,200 minutes (30 days) for self-service plans or 525,600 minutes (365 days) for enterprise plans.

### Device Flow User Code Format

If you are using the [Device Authorization Flow](/flows/concepts/device-auth), these settings configure the randomly-generated user code. To learn more, see [Call Your API from an Input-Constrained Device](/microsites/call-api/call-api-device#how-it-works).

![Advanced Tenant Settings: Device Flow User Code Format](/media/articles/tutorials/tenant-settings/device-flow-user-code-format.png)

* **User Code Character Set**: Character set used to generate the user code. 

* **User Code Mask**: Mask used to format the user code. The mask defines the length of the user code and formats it into a friendly, readable value, allowing spaces or hyphens for readability.

### Global Client Information

![Advanced Tenant Settings: Global Client Information](/media/articles/tutorials/tenant-settings/global-client-information.png)

The **Global Client ID** and **Global Client Secret** are used to generate tokens for legacy Auth0 APIs. Typically, you will not need these values. If you need to have the global client secret changed, please [contact support](https://support.auth0.com).

### Settings

![Advanced Tenant Settings: Miscellaneous Settings](/media/articles/tutorials/tenant-settings/tenant-advanced-settings.png)

* **Change Password Flow v2**: When enabled, the newest version of the Change Password Flow will be used. The previous version has been deprecated, and we strongly recommend enabling v2. This flag is presented only for backwards compatibility, and once enabled, you can no longer disable it. You can customize the user interface for the Change Password widget on the [Universal Login](${manage_url}/#/login_settings) > [Password Reset](${manage_url}/#/password_reset) tab in the [Auth0 Dashboard](${manage_url}).

* **OIDC Dynamic Application Registration**: When enabled, third-party developers will be able to dynamically register applications for your APIs. You can also update this flag using the [Update tenant settings endpoint](/api/management/v2#!/Tenants/patch_settings) of the Auth0 Management API. By default, this feature is disabled. To learn more, see [Dynamic Client Registration](/api-auth/dynamic-client-registration).

* **Enable Application Connections**: When enabled, all current [connections](/connections) will be enabled for any new [Application](${manage_url}/#/applications) that is created.

* **Use a Generic Response in Public Signup API Error Message**: When enabled, errors generated while using the public signup API will return a generic response. This helps protect against user registration enumeration by preventing bad actors from being able to guess previously-registered email addresses or usernames from reading error response codes, such as `user_exists`. 

### Extensibility

![Advanced Tenant Settings: Extensibility](/media/articles/tutorials/tenant-settings/tenant-advanced-extensibility.png)

* **Runtime**:  NodeJS version environment used to execute custom scripts that allow you to extend parts of Auth0's functionality; these include [Rules](/rules), [Hooks](/hooks), and [Database Connections](/connections#database-and-custom-connections).

### Migrations

![Advanced Tenant Settings: Migrations](/media/articles/tutorials/tenant-settings/tenant-advanced-migrations.png)

* **Disable Clickjacking Protection for Classic Universal Login**: When enabled, additional HTTP security headers will not be included in the response to prevent embedding of [Universal Login](/universal-login) prompts in an IFRAME.
