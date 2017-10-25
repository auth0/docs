---
description: Explains what features and settings can be changed in the Tenant Settings page of the dashboard.
url: /dashboard-tenant-settings
toc: true
---
# Tenant Settings in the Auth0 Management Dashboard

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

**Default Audience**: Allows you to specify an API Identifier for a default audience when using the [API Authorization](/api-auth) flows. The will cause all [access tokens](/tokens/access-token) issued by Auth0 to have this API Identitifier specified as an audience.

::: note
This setting is equivalent to appending the audience to every authorization request made to the tenant for every client. This will cause new behaviour that might result in breaking changes for some of your clients. Please contact support if you require assistance.
:::

**Default Directory**: Name of the connection to be use for [Password Grant exchanges](/api-auth/tutorials/password-grant). The __Default Directory__ value should be the exact name of an existing [connection](/connections) of one of the following strategies: `auth0-adldap`, `ad`, `auth0`, `email`, `sms`, `waad` or `adfs`.

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

Allows you to add or remove administrators for your Auth0 tenant, as well as review whether administrators have Multifactor authentication enabled for their account. [Learn about Dashboard Admins](/tutorials/manage-dashboard-admins).

## Webtasks

The Auth0 rules engine uses [webtask.io](https://webtask.io/). This section explains about how to build apps and extensions on top of webtask.

[Learn more about Webtasks](https://webtask.io/).

## Advanced

### Logout

![](/media/articles/tutorials/tenant-settings/logout-urls.png)

Allows you to specify the **Allowed Logout URLs** for your tenant. These are a set of URLs that are valid to redirect to after logout from Auth0 when no `client_id` is specified on the logout endpoint invocation. It's useful as a global list when SSO is enabled. 

Learn more about [Logout](/logout).

### Session Timeout

![](/media/articles/tutorials/tenant-settings/session-timeout.png)

Allows you to specify the **SSO Cookie Timeout**. This value is the login session lifetime, which is how long the session will stay valid measured in minutes. The default value is 10080 minutes (or 7 days).

This is the session timeout for the Auth0 session. You can configure separately the timeouts used with tokens issued by Auth0, such as the OpenID Connect ID Token expiration claim or the SAML lifetime assertions. These are often used to drive the sessions on the applications (SAML SPs) themselves and are independent of the Auth0 (IdP) session.

Learn more about [Single Sign On](/sso/current).

### Global Client Information

![](/media/articles/tutorials/tenant-settings/global-client-information.png)

The **Global Client ID** and **Global Client Secret** are used to generate tokens for legacy Auth0 APIs. Typically, you will not need these values. If you need to have the global client secret changed, please [contact support](https://support.auth0.com).

### Settings

**Change Password flow v2**: Turning this on enables a new version of the change password flow. The previous alternative has been deprecated and we strongly recommend enabling v2. This flag is presented only for backwards compatibility and once enabled you won't be able to disable it. 

You can configure how the Change Password widget will look like at the [Password Reset](${manage_url}/#/password_reset) tab inside the [Hosted Pages](${manage_url}/#/login_page) section of the dashboard.

**Enable Client Connections**: This flag determines whether all current connections shall be enabled when a new [Client](${manage_url}/#/clients) is created.
