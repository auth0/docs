---
description: Learn how to configure Single Sign On (SSO).
toc: true
topics:
  - sso
  - sso-configuration
  - idle-timout
  - absolute-timout
  - session-lifetime-limits
contentType:
  - how-to
useCase:
  - integrate-saas-sso
---
# Configure Single Sign On (SSO)

To configure Single Sign On (SSO), setup the identity providers for your application connections, then set session lifetime limits. For more information on SSO integrations, see [Single Sign On Integrations](/integrations/sso).

## How session lifetime limits work

Auth0 maintains an SSO session for any user who authenticates via an application. When a user performs a new standard login, it resets the SSO session. There are two settings in the dashboard that allow you to set session lifetime limits:

* **Inactivity timeout**: Each time the user completes a transaction registered with the authorization server (Auth0), the session lifetime is extended from that point for the duration of the **Inactivity timeout** period. Also referred to as *idle timeout*. 

* **Require log in after**: Even if the user remains active in the application and repeatedly extends their session, the user will eventually be logged out and required to log in again when they reach the **Require log in after** limit. Also referred to as *absolute timeout*. 

::: panel OWASP and NIST Session Timeout Security Best Practices
[OWASP](https://www.owasp.org/index.php/Session_Management_Cheat_Sheet#Session_Expiration) and [NIST](https://pages.nist.gov/800-63-3/sp800-63b.html) security best practices recommend an **Inactivity timeout** of 30 minutes or less.
:::

### Session lifetime limit examples

If you set the **Inactivity timeout** limit to 3 days and the **Require log in after** limit to 30 days, when the user first logs in, both values are set in that session. 

* If the user is active within the 3-day **Inactivity timeout** period, the session lifetime is extended from that point for another 3 days (the duration of the **Inactivity timeout** period).

* If the user is not active when the **Inactivity timeout** limit is reached, the user will automatically be logged out. This type of session extension may continue until the **Require log in after** limit is reached, after which the user will be forced to log in again regardless of activity. 

If you extend existing session lifetime limits, those limits remain unchanged until a user establishes a new session. For example, if a user has an **Inactivity timeout** limit of 1 day and a **Require log in after** limit of 3 days and you increase the limits to 3 days and 7 days respectively, the user will not experience longer session lifetimes until after the existing session ends and they establish a new session.

::: note
When you reduce existing session lifetime limits, the user session lifetime limits change *immediately* upon the next registered activity. This behaviour allows you to immediately shorten inadvertently long session lifetime limits for security purposes.
:::

## Configure connections

Before enabling SSO on an [application](/applications), create and configure a connection for each [Identity Provider](/identityproviders) you want to use.

For social identity providers, make sure the connection is not using [developer keys](/connections/social/devkeys).

## Configure session lifetime limits

1. To configure the session lifetime, navigate to [Dashboard > Tenant Settings > Advanced](${manage_url}/#/tenant/advanced).

2. In the **Log In Session Management** section, configure the two settings that enable you to control session lifetime:

   | Setting | Description | Self-Service Maximum Lifetime | Enterprise Maximum Lifetime |
   | - | - | - | - |
   | **Inactivity timeout** | Maximum session session lifetime without user activity. | 4320 minutes (3 days) | 144000 minutes (100 days) |
   | **Require log in after** | Maximum possible session lifetime regardless of user activity. | 43200 minutes (30 days) | 525600 minutes (365 days).|

   ![Login Session Management](/media/articles/sso/sso-session-mgmt-2.png)

## Check the user's SSO status from the application

To determine the user's SSO status, check the following:

* `accessToken`: Used to access the desired resource.
* `expirationDate` on the `accessToken`: Calculated using the `expires_in` response parameter after successful authentication on the part of the user.

If you don't have a valid `accessToken`, the user is *not* logged in. However, they may be logged in via SSO to another associated application. You can determine if this is the case or not by calling the `checkSession` method of the `auth0.js` SDK, which will attempt to silently authenticate the user within an iframe. Whether the authentication is successful or not indicates whether the user has an active SSO cookie.

For more information on how to implement this, see  [Client-Side SSO (Single Page Apps)](/sso/current/single-page-apps-sso).

::: note
The [Auth0 OIDC SSO Sample](https://github.com/auth0-samples/oidc-sso-sample) repo is an example of how to implement OIDC-compliant SSO.
:::

## SSO configuration for legacy tenants

In addition to the settings available under tenant settings, legacy tenants may see slightly different options available for SSO under [Dashboard > Tenant Settings > Advanced](${manage_url}/#/tenant/advanced).

While all new Auth0 tenants come with seamless SSO enabled, legacy tenants may choose whether to enable this feature. If you do not choose to **Enable Seamless SSO**, you have an additional setting available to you under Application Settings.

To see this, navigate to the Applications section of the [Dashboard](${manage_url}/#/applications). Click on **Settings** (represented by the gear icon) for the application with which you're working. Scroll to the bottom of the page and click **Show Advanced Settings**.

![SSO Client Dashboard](/media/articles/sso/single-sign-on/clients-dashboard.png)

You have the option to enable or disable the **Use Auth0 instead of the IdP to do Single Sign On** feature.
