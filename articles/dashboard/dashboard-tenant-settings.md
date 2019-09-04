---
description: Explains what features and settings can be changed in the Tenant Settings page of the dashboard.
toc: true
topics:
  - dashboard
  - tenants
contentType: reference
useCase: manage-accounts
---

# Tenant Settings in the Auth0 Dashboard

The [Tenant Settings](${manage_url}/#/tenant) page of the dashboard allows you to configure various settings related to your Auth0 tenant.

## General

The following sections can be found on the initial page you're redirected to when opening up the settings area.

### Settings

![](/media/articles/tutorials/tenant-settings/settings.png)

Use this section to customize some of the settings related to your tenant. These settings will be used in [Lock](https://auth0.com/lock), emails and various other pages being displayed to your end users.

* **Friendly Name**: This is the name you want to be displayed to your users, usually the name of your company or organization.
* **Logo URL**: In this field, enter the URL where you have a square image saved. This image will appear to your users on various screens and pages.
* **Support Email**: The email used to contact your support team.
* **Support URL**: The link to your company/organization support page.

Click **SAVE** when finished to submit your changes.

### API Authorization Settings

**Default Audience**: Allows you to specify an API Identifier for a default audience when using the [API Authorization](/api-auth) flows. This will cause all [Access Tokens](/tokens/access-token) issued by Auth0 to have this API Identifier specified as an audience.

::: note
This setting is equivalent to appending the audience to every authorization request made to the tenant for every application. This will cause new behavior that might result in breaking changes for some of your applications. Please contact support if you require assistance.
:::

**Default Directory**: Name of the connection to be used for [Password Grant exchanges](/api-auth/tutorials/password-grant). The __Default Directory__ value should be the exact name of an existing [connection](/connections) of one of the following strategies: `auth0-adldap`, `ad`, `auth0`, `email`, `sms`, `waad` or `adfs`.

### Error Pages

![](/media/articles/tutorials/tenant-settings/error-pages.png)

In the event of an authorization error, you may choose to display to your users either a generic error page or you can redirect users to your own customized error page.

[Learn about Custom Error Pages](/hosted-pages/custom-error-pages).

## Subscription and Payment

![](/media/articles/tutorials/tenant-settings/billing.png)

The __Subscription__ tab allows you to review and change your current subscription and to move to another plan, as well as specify your billing details. You can learn more [about changing your Subscription](/support/subscription).

## Active Users

The __Active Users__ functionality has been moved to the [Quota Utilization Report](https://support.auth0.com/reports/quota) in the Support Center.

## Dashboard Admins

Allows you to add or remove administrators for your Auth0 tenant, as well as review whether administrators have Multi-factor authentication enabled for their account. [Learn about Dashboard Admins](/tutorials/manage-dashboard-admins).

## Webtasks

<%= include('../_includes/_webtask') %>

The Auth0 rules engine uses [webtask.io](https://webtask.io/). This section explains about how to build apps and extensions on top of webtask.

## Advanced

### Login and Logout

![](/media/articles/tutorials/tenant-settings/login-logout.png)

**Allowed Logout URLs**:  These are a set of URLs that are valid to redirect to after logout from Auth0 when no `client_id` is specified on the logout endpoint invocation. It's useful as a global list when <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> is enabled.  Learn more about [Logout](/logout).

**Tenant Login URI**: In some scenarios Auth0 will need your tenant to start the OIDC login flow . This URI should point to a route in your application that starts the flow by redirecting to the `/authorize` endpoint. It would usually take the form of 'https://mytenant.org/login'. [Learn more about the tenant default login URI](/universal-login/default-login-url).

### Log In Session Management

![](/media/articles/tutorials/tenant-settings/session-timeout.png)

Users will be asked to log in again unless they are active within this period in minutes (maximum 100 days). See [Single Sign-On and Single Logout](/sso/current#2-configure-sso) for more information.

Set the amount of time allowed to expire before a user is required to login again. This value is the login session lifetime, which is how long the session will stay valid, measured in minutes. The default value is 10080 minutes (or 7 days). See [Single Sign-on (SSO)](/sso/current) for more information.

This is the session timeout for the Auth0 session. You can configure separately the timeouts used with tokens issued by Auth0, such as the <dfn data-key="openid">OpenID Connect (OIDC)</dfn> ID Token expiration claim or the <dfn data-key="security-assertion-markup-language">SAML</dfn> lifetime assertions. These are often used to drive the sessions on the applications (SAML SPs) themselves and are independent of the Auth0 (IdP) session.

### Device Flow User Code Format

![](/media/articles/tutorials/tenant-settings/device-flow-user-code-format.png)

Allows you to select the user code character set and mask for generating a user code during the [device authorization flow](/flows/concepts/device-auth). The mask is used to define the length of the user code and to format the randomly generated user code to a friendly, readable value with possible spaces or hyphens for readability.

For more information see [Call Your API from an Input-Constrained Device](/microsites/call-api/call-api-device#how-it-works).

### Global Client Information

![](/media/articles/tutorials/tenant-settings/global-client-information.png)

The **Global Client ID** and **Global Client Secret** are used to generate tokens for legacy Auth0 APIs. Typically, you will not need these values. If you need to have the global client secret changed, please [contact support](https://support.auth0.com).

### Settings

![](/media/articles/tutorials/tenant-settings/tenant-advanced-settings.png)

**Change Password flow v2**: Turning this on enables a new version of the change password flow. The previous alternative has been deprecated and we strongly recommend enabling v2. This flag is presented only for backwards compatibility and once enabled you won't be able to disable it. 

You can configure how the Change Password widget will look like at the [Password Reset](${manage_url}/#/password_reset) tab inside the [Hosted Pages](${manage_url}/#/login_page) section of the dashboard.

**OIDC Dynamic Application Registration**: Turning this on enables third-party developers to dynamically register applications for your APIs. This feature is disabled by default. Alternatively, you can update this flag using the [Update tenant settings endpoint](/api/management/v2#!/Tenants/patch_settings). For more information, see [Dynamic Client Registration](/api-auth/dynamic-client-registration).

**Enable Application Connections**: This flag determines whether all current connections shall be enabled when a new [Application](${manage_url}/#/applications) is created.

**Use a generic response in public signup API error message**: If enabled, this will use a generic response in the public signup API which will prevent users from being able to find out if an e-mail address or username has previously registered. 

::: warning
Enabling this feature will help protect against user registration enumeration. Bad actors may attempt to guess registered usernames or email addresses by reading error response codes such as `user_exists` in the public signup API. 
:::

### Extensibility

![](/media/articles/tutorials/tenant-settings/tenant-advanced-extensibility.png)

Use custom scripts to extend parts of Auth0's functionality, such as [Rules](/rules), [Hooks](/hooks) and [Database Connections](/connections#database-and-custom-connections).

### Migrations

![](/media/articles/tutorials/tenant-settings/tenant-advanced-migrations.png)

If enabled, additional HTTP security headers will not be included in the response to prevent embedding of the Universal Login prompts in an IFRAME.
