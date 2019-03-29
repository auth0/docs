---
title: Session Lifetime
description: Understand what session lifetimes are and learn about the relevant settings.
toc: true
topics:
  - sessions
contentType: concept
useCase:
  - build-an-app
---
# Session Lifetime

By default, when a user leaves a website or closes their browser, their [session](/sessions) ends. To keep users from having to log in every time they return, applications will typically extend sessions by storing session information in a cookie. Sessions are then ended when a user logs out or when session lifetime limits are reached.

In Auth0, two settings can be configured for session lifetime:

* **Inactivity timeout**: Timeframe after which a user's session will expire if they haven’t interacted with the Authorization Server. Will be superseded by system limits if over 3 days for self-service plans or 100 days for enterprise plans.

* **Require log in after**: Timeframe after which a user will be required to log in again, regardless of their activity. Will be superseded by system limits if over 30 days for self-service plans or 365 days for enterprise plans.

Both settings are configured on the [tenant](/getting-started/the-basics#account-and-tenants). You can [configure your session lifetime settings](/sessions/guides/dashboard/configure-session-lifetime-settings) using either the Auth0 Dashboard or the Management API.