---
description: Tutorial on implementing Single Sign On (SSO) with Auth0.
toc: true
tags:
  - sso
  - sso-setup
---

# Set Up Single Sign On with Auth0

This tutorial covers implementing Single Sign On (SSO) with Auth0.

::: note
For information on SSO Integrations, check out the [Single Sign On Integrations](/integrations/sso) page.
:::

## 1. Configure the Connection

Before enabling SSO on a [Application](/applications), create and configure a Connection for each [Identity Provider](/identityproviders) you want to use.

For Social Identity Providers ensure the Connection is not using [developer keys](/connections/social/devkeys).

## 2. Enable SSO for the Application

Navigate to the Applications section of the [Dashboard](${manage_url}/#/applications). Click on **Settings** (represented by the gear icon) for the Application to enable SSO on.

![](/media/articles/sso/single-sign-on/clients-dashboard.png)

Near the bottom of the **Settings** page, toggle **Use Auth0 instead of the IdP to do Single Sign On**.

![](/media/articles/sso/single-sign-on/sso-flag.png)

::: note
You can also set the Application's SSO flag using the [Auth0 Management API](/api/management/v2#!/Clients/patch_clients_by_id).
:::

## 3. Configure SSO Session Length

When the SSO flag is set for an Application, Auth0 maintains an SSO session for any user authenticating via that Application. The **SSO Cookie Timeout** setting determines how long an SSO session is valid. By default, an SSO session expires in 10080 minutes (or 7 days).

To configure the **SSO Cookie Timeout** setting, navigate to [Dashboard > Tenant Settings > Advanced](${manage_url}/#/tenant/advanced).

![](/media/articles/sso/single-sign-on/accountsettings-ssotimeout.png)

SSO session cookies expire after **3 days** of inactivity. For example, if no application (in the same browser) on a user's machine performs a login using the SSO session then the cookie expires after 3 days, even though a server side session might persist. Performing a new standard login would reset the SSO session.

The session inactivity duration (3 days) and is not configurable on the Public Cloud. PSaaS Appliance users, however, can control this account-level setting.

## 4. Check the User's SSO Status from the Application

Whenever you need to determine the user's SSO status, you'll need to check the following:

* The Auth0 `accessToken`, which is used to access the desired resource
* The `expirationDate` on the `accessToken`, which is calculated using the `expires_in` response parameter after successful authentication on the part of the user

If you don't have a valid `accessToken`, the user is **not** logged in. However, they may be logged in via SSO to another associated application. You can determine if this is the case or not by calling the `checkSession` method of the auth0.js SDK, which will attempt to silently authenticate the user within an iframe. Whether the authentication is successful or not indicates whether the user has an active SSO cookie.

For more detailed information on how to implement this, please refer to [Client-Side SSO (Single Page Apps)](/sso/current/single-page-apps-sso).

::: note
The [Auth0 OIDC SSO Sample](https://github.com/auth0-samples/oidc-sso-sample) repo is an example of how to implement OIDC-compliant SSO.
:::
