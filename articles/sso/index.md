---
url: /sso
description: Introduction to Single Sign On (SSO) with Auth0.
---

# What is SSO (Single Sign On)?

SSO (Single Sign On) occurs when a user logs in to one Client and is then signed in to other Clients automatically, regardless of the platform, technology, or domain the user is using.

Google's implementation of login for their products, such as Gmail, YouTube, Google Analytics, and so on, is an example of SSO. Any user that is logged in to one of Google's products are automatically logged in to their other products as well.

## How SSO Works

SSO works by means of a *central service*. In the case of Google, this central service is [Google Accounts](https://accounts.google.com). When a user first logs in, Google Accounts creates a cookie, which persists with the user as they navigate to other Google-owned services. The process flow is as follows:

1. The user accesses the first Google product.
2. The user receives a Google Accounts-generated cookie.
3. The user navigates to another Google product.
4. The user is redirected again to Google Accounts.
5. Google Accounts sees that the user already has an authentication-related cookie, so it redirects the user to the requested product.

## How to Implement SSO with Auth0

::: panel-info Enabling Identity Providers
Prior to enabling SSO for a given Client, you must first [configure the Identity Provider(s)](/identityproviders) you want to use.
:::

To enable SSO for one of your Clients (recall that each Client is independent of one another), navigate to the [Clients section of the Auth 0 Management Dashboard](${manage_url}/#/clients). Click on **Settings** (represented by the gear icon) for the Client with which you want to use SSO.

Near the bottom of the *Settings* page, toggle **Use Auth0 instead of the IdP to do Single Sign On**.

![](/media/articles/sso/single-sign-on/sso-flag.png)

You can set the Client's SSO flag using the [Auth0 Management API](/api/management/v2#!/Clients/patch_clients_by_id).

Once you have set the SSO flag in Auth0, you must add logic to your Client to check the user's SSO status. This logic can be implemented either client-side (using JavaScript) or server-side:

* [Client-Side SSO (Single Page Apps)](/sso/single-page-apps-sso)
* [Server-Side SSO (Regular Web Apps)](/sso/regular-web-apps-sso)

> Please see the [Auth0 SSO Sample](https://github.com/auth0/auth0-sso-sample) repo for an example of SSO with both Single Page Apps and Regular Web Apps.

### Length of SSO Sessions

If the SSO flag is set for a Client, Auth0 will maintain an SSO session for any user authenticating via that Client. If the user remains active, the session will last no more than **7 days**, but if not, the session will terminate after **3 days**. To be considered active, the user must access the Client that created the session within the given timeframe.

# What is Single Log Out?

Single Logout is the process where you terminate the session of each application or service where the user is logged in. To continue with the Google example, if you logout from Gmail, you get logged out also from YouTube, Google Analytics, etc.

There may be up to three different layers of sessions for a user with SSO.

* A session from an Identity Provider such as Google, Facebook or an enterprise SAML Identity Provider
* A session from Auth0 if the above SSO flag is turned on
* A session maintained by an application

See the [Logout URL docs](/logout) for information on terminating the first two sessions listed above.
