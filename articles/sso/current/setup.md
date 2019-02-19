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

Configure Single Sign On (SSO) by first configuring the identity providers for the application connections, then configuring session lifetime limits. 

## How session lifetime limits work

Auth0 maintains an SSO session for any user authenticating via that Application. There are two settings in the dashboard that allow you to comfigure the session lifetime limits:

* **Inactivity timeout**: This is sometimes referred to as the *idle timeout*. Each time the user completes a transaction registered with the authorization server (Auth0), the session lifetime is extended from that point for the duration of the inactivity timeout period.

* **Require log in after**: This is sometimes referred to as the *absolute timeout*. Even if the user remains active in the application and repeatedly extends their session, the user will eventually be logged out and required to log in again when the Require Log In After limit is reached. 

For example, if you set the **Inactivity timeout** period to 3 days and the **Require log in after** period to 30 days, when the user first logs in, both of these values are set in that user’s session. If the user remains active in the application within the 3-day inactivity timeout period, the session lifetime is extended from that point of activity. If the user returns twice within the inactivity timeout period, it extends the session for another 3 days (the duration of the inactivity timeout).

If the user does not remain active within the most recent **Inactivity timeout** limit, the user will be automatically logged out. This type of session extension may continue until the **Require log in after** limit is reached, after which the user will be forced to log in again regardless of activity. 

For more information on SSO Integrations, check out the [Single Sign On Integrations](/integrations/sso) page.

## Configure connections

1. Before enabling SSO on an [application](/applications), create and configure a connection for each [Identity Provider](/identityproviders) you want to use.

2. For social identity providers, make sure the Connection is not using [developer keys](/connections/social/devkeys).

## Configure session lifetime limits

1. To configure the session lifetime, navigate to [Dashboard > Tenant Settings > Advanced](${manage_url}/#/tenant/advanced).

2. Configure the two settings that enable you to control session lifetimes:

   | **Setting** | **Description** |
   | - | - |
   | **Inactivity timeout** | The maximum session session lifetime without user activity.  |
   | **Require log in after** | The maximum possible session lifetime regardless of user activity. |

   ![Tenant Login Session Limits](/media/articles/sso/tenant-login-session-mgmt.png)

   Any time a user performs a new standard login, the session is reset.

3. To configure the **SSO Cookie Timeout** setting, navigate to [Dashboard > Tenant Settings > Advanced](${manage_url}/#/tenant/advanced).

   ![](/media/articles/sso/sso-session-mgmt-2.png)

   ::: note
   Any time a user performs a new standard login it resets the SSO session.
   :::

## Check the user's SSO status from the application

Whenever you need to determine the user's SSO status, you'll need to check the following:

* The Auth0 `accessToken`, which is used to access the desired resource
* The `expirationDate` on the `accessToken`, which is calculated using the `expires_in` response parameter after successful authentication on the part of the user

If you don't have a valid `accessToken`, the user is **not** logged in. However, they may be logged in via SSO to another associated application. You can determine if this is the case or not by calling the `checkSession` method of the auth0.js SDK, which will attempt to silently authenticate the user within an iframe. Whether the authentication is successful or not indicates whether the user has an active SSO cookie.

For more information on how to implement this, see  [Client-Side SSO (Single Page Apps)](/sso/current/single-page-apps-sso).

::: note
The [Auth0 OIDC SSO Sample](https://github.com/auth0-samples/oidc-sso-sample) repo is an example of how to implement OIDC-compliant SSO.
:::

## Impact of changing session lifetime limits on existing sessions

Session lifetimes may be extended or reduced by changing the **Inactivity timeout** and **Require log in after** values. When session lifetime values are extended, existing user session lifetime limits remain unchanged until the user establishes a new session. For example, if a user has an Inactivity Timeout limit of 1 day and a Require Log In After limit of 3 days and you increase the limits to 3 days and 7 days respectively, the user will not experience longer session lifetimes until after the existing session ends and they establish a new session.

However, when session lifetime values are reduced, existing user session lifetime limits are updated immediately upon the next registered activity. This behavior enables you to correct for inadvertently long session lifetime configurations should you determine that you need to shorten session lifetime limits for security purposes.

## SSO configuration for legacy tenants

In addition to the settings available under tenant settings, legacy tenants may see slightly different options available for SSO under [Dashboard > Tenant Settings > Advanced](${manage_url}/#/tenant/advanced).

![](/media/articles/sso/sso-session-mgmt-1.png)

While all new Auth0 tenants come with seamless SSO enabled, legacy tenants may choose whether to enable this feature.

If you do not choose to **Enable Seamless SSO**, you have an additional setting available to you under Application Settings.

To see this, navigate to the Applications section of the [Dashboard](${manage_url}/#/applications). Click on **Settings** (represented by the gear icon) for the Application with which you're working. Scroll to the bottom of the page and click **Show Advanced Settings**.

![](/media/articles/sso/single-sign-on/clients-dashboard.png)

You have the option to enable or disable the **Use Auth0 instead of the IdP to do Single Sign On** feature.

![](/media/articles/sso/single-sign-on/sso-flag.png)
