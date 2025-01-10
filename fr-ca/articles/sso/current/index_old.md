---
title: Single Sign-On and Single Logout
description: Learn about Single Sign-on (SSO) and Single Logout
classes: topic-page
topics:
  - sso
contentType:
  - index
  - concept
useCase:
  - integrate-saas-sso
---
# Single Sign-On and Single Logout

<dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> occurs when a user logs in to one application and is then signed in to other applications automatically, regardless of the platform, technology, or domain the user is using. The user signs in only one time, hence the name of the feature (Single Sign-on).

Similarly, Single Logout occurs when you terminate the session of each application or service where a user is logged in. For more info, see [Logout](/logout).

Single Sign-on and Single Logout are possible through the use of [sessions](/sessions). There may be up to three different layers of sessions for a user with SSO:

* Local session maintained by the application
* Authorization Server session, if SSO is enabled
* Identity Provider session, if the user chose to log in through an Identity Provider (such as Google, Facebook, or an enterprise <dfn data-key="security-assertion-markup-language">SAML</dfn> Identity Provider)

## Single Sign-on and Single Logout Example

Google's implementation of login for their products, such as Gmail, YouTube, and Google Analytics, is an example of SSO. Any user that logs in to one of Google's products is automatically logged in to their other products as well.

SSO usually makes use of a **Central Service** to orchestrate the single sign-on between multiple applications. For Google, this central service is [Google Accounts](https://accounts.google.com). When a user first logs in, Google Accounts creates a cookie, which persists with the user as they navigate to other Google-owned services:

1. The user accesses the first Google product, which redirects them to Google Accounts, where the user logs in and receives a Google Accounts-generated cookie.
2. The user navigates to another Google product, which again redirects them to Google Accounts.
3. Google Accounts sees that the user already has an authentication-related cookie, so it redirects the user to the requested product without requiring reauthentication.

When the user logs out from one Google product, they are automatially also logged out from all other Google products.

## Keep reading

- [Understand how Single Sign-On works with Auth0](/sso/current/sso-auth0)
- Learn how to [enable SSO in Auth0](/dashboard/guides/tenants/enable-sso-tenant)
- [Understand session lifetime](/sessions/concepts/session-lifetime)
- Learn how to [configure session lifetime settings](/dashboard/guides/tenants/configure-session-lifetime-settings)
- Learn how to [log users out](/logout)