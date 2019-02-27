---
title: Configure Session Lifetime Limits for Single Sign On
description: Learn how to configure session lifetime limits for Single Sign On (SSO).
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
  - configure-sso
---
# Configure Session Lifetime Limits for Single Sign On

You can configure how user session timeouts work for Single Sign On (SSO) with session lifetime limit settings [in the dashboard](${manage_url}/#/tenant/advanced). You can also configure session limits with the [Management API](/api/management/v2#!/Tenants/patch_settings).

## How session lifetime limits work

Auth0 maintains an SSO session for any user who authenticates via an application. When a user performs a new standard login, it resets the SSO session. There are two settings in the dashboard that allow you to set session lifetime limits:

* **Inactivity timeout**: Each time the user completes a transaction registered with the authorization server (Auth0), the session lifetime is extended from that point for the duration of the **Inactivity timeout** period. (Referred to as `idle_session_lifetime` in the Management API.) 

* **Require log in after**: Even if the user remains active in the application and repeatedly extends their session, the user will eventually be logged out and required to log in again when they reach the **Require log in after** limit. (Referred to as `session_lifetime` in the Management API.)

### Session lifetime limit examples

If you set the **Inactivity timeout** limit to 3 days and the **Require log in after** limit to 30 days, when the user first logs in, both values are set in that session. 

* If the user is active within the 3-day **Inactivity timeout** period, the session lifetime is extended from that point for another 3 days (the duration of the **Inactivity timeout** period).

* If the user is not active when the **Inactivity timeout** limit is reached, the user will automatically be logged out. This type of session extension may continue until the **Require log in after** limit is reached, after which the user will be forced to log in again regardless of activity. 

If you extend existing session lifetime limits, those limits remain unchanged until a user establishes a new session. For example, if a user has an **Inactivity timeout** limit of 1 day and a **Require log in after** limit of 3 days and you increase the limits to 3 days and 7 days respectively, the user will not experience longer session lifetimes until after the existing session ends and they establish a new session.

If you reduce existing session lifetime limits, the user session lifetime limits change *immediately* upon the next registered activity. This behaviour allows you to immediately shorten inadvertently long session lifetime limits for security purposes.

## Prerequisites

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

If you don't have a valid `accessToken`, the user is *not* logged in. However, they may be logged in via SSO to another associated application. You can determine if this is the case by calling the `checkSession` method of the `auth0.js` SDK, which will attempt to silently authenticate the user within an iframe. Whether the authentication is successful or not indicates whether the user has an active SSO cookie.

## Keep reading

* [Client-Side SSO on Single Page Applications](/sso/current/single-page-apps)
* [Introduction to Single Sign On with Auth0](/integrations/sso/current/introduction)
* The [Auth0 OIDC SSO Sample](https://github.com/auth0-samples/oidc-sso-sample) repo is an example of how to implement OIDC-compliant SSO.
