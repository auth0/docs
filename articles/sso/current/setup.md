---
description: Tutorial on configuring Single Sign On (SSO)
toc: true
topics:
  - sso
  - sso-configuration
contentType:
  - how-to
useCase:
  - integrate-saas-sso
---
# Configure Single Sign On (SSO)

This tutorial covers configuring Single Sign On (SSO).

::: note
For information on SSO Integrations, check out the [Single Sign On Integrations](/integrations/sso) page.
:::

## 1. Configure the connection

Before enabling SSO on an [application](/applications), create and configure a Connection for each [Identity Provider](/identityproviders) you want to use.

For Social Identity Providers, make sure the Connection is not using [developer keys](/connections/social/devkeys).

## 2. Configure SSO

Auth0 maintains an SSO session for any user authenticating via that Application. Auth0 maintains two pieces of information:

| Setting | Description |
| - | - |
| Inactivity timeout | The maximum length of time that can elapse without user activity before the user is asked to log in again. **This setting cannot exceed 3 days!** |
| Require log in after | The length of time that elapses before Auth0 forces the user to log in again (regardless of activity) |

To configure the **SSO Cookie Timeout** setting, navigate to [Dashboard > Tenant Settings > Advanced](${manage_url}/#/tenant/advanced).

![](/media/articles/sso/sso-session-mgmt-2.png)

Please note that any time a user performs a new standard login resets the SSO session.

### Addendum: SSO Configuration for Legacy Tenants

In addition to the settings available under tenant settings, legacy tenants may see slightly different options available for SSO under [Dashboard > Tenant Settings > Advanced](${manage_url}/#/tenant/advanced).

![](/media/articles/sso/sso-session-mgmt-1.png)

While all new Auth0 tenants come with seamless SSO enabled, legacy tenants may choose whether to enable this feature.

If you do not choose to **Enable Seamless SSO**, you have an additional setting available to you under Application Settings.

To see this, navigate to the Applications section of the [Dashboard](${manage_url}/#/applications). Click on **Settings** (represented by the gear icon) for the Application with which you're working. Scroll to the bottom of the page and click **Show Advanced Settings**.

![](/media/articles/sso/single-sign-on/clients-dashboard.png)

You have the option to enable or disable the **Use Auth0 instead of the IdP to do Single Sign On** feature.

![](/media/articles/sso/single-sign-on/sso-flag.png)

## 3. Check the user's SSO status from the application

Whenever you need to determine the user's SSO status, you'll need to check the following:

* The Auth0 `accessToken`, which is used to access the desired resource
* The `expirationDate` on the `accessToken`, which is calculated using the `expires_in` response parameter after successful authentication on the part of the user

If you don't have a valid `accessToken`, the user is **not** logged in. However, they may be logged in via SSO to another associated application. You can determine if this is the case or not by calling the `checkSession` method of the auth0.js SDK, which will attempt to silently authenticate the user within an iframe. Whether the authentication is successful or not indicates whether the user has an active SSO cookie.

For more detailed information on how to implement this, please refer to [Client-Side SSO (Single Page Apps)](/sso/current/single-page-apps-sso).

::: note
The [Auth0 OIDC SSO Sample](https://github.com/auth0-samples/oidc-sso-sample) repo is an example of how to implement OIDC-compliant SSO.
:::