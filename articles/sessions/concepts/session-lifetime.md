---
title: Session Lifetime
description: Understand what session lifetimes are and learn about the relevant settings.
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

## Application-specific logout URLs

There are two important things to consider when you use application-specific logout URLs:

* You **must** send `client_id` as a query parameter when calling the `/v2/logout` endpoint and the `returnTo` URL must be in the application’s list of allowed logout URLs.

* This will end the Auth0 Session for the entire tenant - i.e. for all defined applications, not just the one that matches the `client_id` supplied. Passing the `client_id` tells the `logout` endpoint where to look for the logout URL white-list.

After the user logout occurs Auth0 will only redirect to a URL that is defined in this list. 

::: warning
If you redirect the user back to the application after logout and the application redirects to an identity provider that still has an authenticated session for that user, the user will be silently logged back into your application and it may appear that logout didn’t work. In these cases, we recommend that you have a specific logout landing page in your application so you can tell the user that they successfully logged out - and, if desired, you can also warn them that they may still be logged into their identity provider.
:::

In the case a user has not taken any actions that would cause the Auth0 session to be updated it is recommended that warning be raised to the user to choose to explicitly continue their session.

The intent of this approach allows the session to go inactive if the user is no longer present, but otherwise provides a means to trigger the silent token refresh so that they can continue their session without the need to be prompted again for credentials.

* **Inactivity Timer**: A rolling timer should be added to the React SDK wrapper that aligns with the maximum idle lifetime of the Auth0 session.  Each time a token is returned to the application the timer should be reset.

* **Timeout Modal**: When the timer hits 60 seconds from expiration a timeout modal should render requesting the user to logout or continue their session. 

    * **Continue the session**: In the case the user chooses to continue their session the getTokenSilently() method can be used to request a new token without needing to redirect the user from the page they are currently interacting with.

    * **Logging out**: In the case the user chooses to logout the logout() method should be called to assure the Auth0 session is ended as well.

    * **Idle Timeout**: In the case that the idle timeout is reached no immediate action is necessary.  To handle the fact that the user may still be active in another tab, the behavior **should not** be to log the user out. 

    Other options might include updating the modal with a login button, using the window.onfocus event to trigger `getTokenSilently()`, or redirecting the user to landing page.

## Examples: Session lifetime limits

Auth0 maintains a login session for any user who authenticates via an application. When a user performs a new standard login, it resets the login session. Let's look at an example.

1. You set the **Inactivity timeout** limit to 3 days and the **Require log in after** limit to 30 days.
2. A user logs in and your entered values are set for their session. 
  * If the user is active within the three-day **Inactivity timeout** timeframe, the session lifetime is extended for another three days. As long as the user is active within the next three days, their session lifetime will be extended for another three days, until the **Require log in after** limit is reached. At this point, the user will be required to log in again.
  * If the user is inactive for three days, they will automatically be logged out. 
3. While the user is logged in, you extend the existing session lifetime limits. The new settings will not take effect until the existing session ends, and the user logs in again.
4. While the user is logged in, you reduce the existing lifetime limits. The new settings will take effect immediately upon the user's next activity. This allows you to shorten session lifetimes for security purposes.

## Keep reading

* [Auth0 Privacy & Cookie Policy](https://auth0.com/privacy)
* [Sessions](/sessions)
* [Session Layers](/sessions/concepts/session-layers)
* [sameSite Cookie Attributes](/sessions/concepts/cookie-attributes)
* [Logout](/logout)
* [Session Use Cases](/sessions/references/sample-use-cases-sessions)
* [Example: Short-lived session management workflow](/sessions/references/example-short-lived-session-mgmt)
* [Auth0 Ruby on Rails SDK Quickstarts: Session Handling](/quickstart/webapp/rails/02-session-handling)
* [Auth0 Android SDK Quickstarts: Session Handling](/quickstart/native/android/03-session-handling)
