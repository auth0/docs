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

Session lifetime limits determine how long the system should retain a login session.  In Auth0, two settings can be configured for session lifetime:

* **Inactivity timeout**: Timeframe after which a user's session will expire if they haven’t interacted with the Authorization Server. Will be superseded by system limits if over 3 days for self-service plans or 100 days for enterprise plans.

* **Require log in after**: Timeframe after which a user will be required to log in again, regardless of their activity. Will be superseded by system limits if over 30 days for self-service plans or 365 days for enterprise plans.

These settings are configured on the [tenant](/getting-started/the-basics#account-and-tenants); you can [configure them](/dashboard/guides/tenants/configure-session-lifetime-settings) using either the Auth0 Dashboard or the Management API.

## Examples: Session lifetime limits

Auth0 maintains a login session for any user who authenticates via an application. When a user performs a new standard login, it resets the login session. Let's look at an example.

1. You set the **Inactivity timeout** limit to 3 days and the **Require log in after** limit to 30 days.
2. A user logs in and your entered values are set for their session. 
  * If the user is active within the three-day **Inactivity timeout** timeframe, the session lifetime is extended for another three days. As long as the user is active within the next three days, their session lifetime will be extended for another three days, until the **Require log in after** limit is reached. At this point, the user will be required to log in again.
  * If the user is inactive for three days, they will automatically be logged out. 
3. While the user is logged in, you extend the existing session lifetime limits. The new settings will not take effect until the existing session ends, and the user logs in again.
4. While the user is logged in, you reduce the existing lifetime limits. The new settings will take effect immediately upon the user's next activity. This allows you to shorten session lifetimes for security purposes.