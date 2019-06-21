[Logout](/logout) is the act of terminating an authenticated session when it's no longer needed, thus minimizing the likelihood that unauthorized parties can "take over" the session. This is typically achieved by provisioning a logout option on the user interface you provide to your users. Multiple types of sessions can be created when a user logs in (e.g., local application sessions, Auth0 session, third-party Identity Provider sessions), and you will need to determine which of these sessions need to be terminated when the user clicks any **Logout** option.

::: panel Best Practice
Your logout behavior should make it clear to a user which session(s) are being terminated, and ideally, will display a visual confirmation of logout afterward. 
:::

When configuring logout behavior, you'll need to consider:

* Which sessions should be terminated when the user initiates logout?
* What information to provide to users as confirmation of the sessions terminated?
* Where should users be redirected to after logout completes?
* Whether actions taken by the user elsewhere (such as in another application) need to be accounted for to [provide a single logout experience](/logout/guides/logout-applications#single-sign-out-configuration-example)?
* How long you want sessions to last in the event that users do not trigger the logout process?

Given the varying types of sessions that can be created whenever a user logs in, there are several types of logout possible. Local application logout ends the session with the application, whereas Auth0 logout [terminates the Auth0 session](/logout/guides/logout-auth0). [Federated logout](/logout/guides/logout-idps) terminates the Auth0 session and also propagates the logout request to a remote, third-party Identity Provider. Global, or [Single Logout](/logout/guides/logout-applications) (SLO), ends the Auth0 session and also sends a logout request/notice to applications relying on the Auth0 session.

The functionality provided by your application, as well as your use of features like <dfn data-key="single-sign-on">[Single Sign-on (SSO)](/sso)</dfn>, will inform your decision as to what type of logout is required and what visual confirmation you'll need to provide to your users. Regardless of which option you choose, the logout process you implement should make it clear to the user which sessions are being terminated, and also when the logout process has completed.

::: warning
If the logout feature in one application terminates an Auth0 SSO session that is used by other applications, the user may lose work if they have uncommitted transactions. Be sure to add the functionality needed to handle such conditions to minimize the likelihood of lost work.
:::

## Where to send users after logout

Once your user logs out, they will be redirected to a specific location of your choosing. This location is specified as the **logout redirect URL**, and you can [define this as a parameter](/logout/guides/redirect-users-after-logout) via the Auth0 Dashboard. 

The URL(s) you use to redirect users after logging out must be [whitelisted in the Dashboard](/logout#redirect-users-after-logout) to mitigate open-redirect security vulnerabilities. You can whitelist them at the tenant or application levels.

::: note
If the user logs out and you redirect them back to the application, and the application redirects to an Identity Provider that still has a valid session for the user, the user will be logged in silently to the application. This may appear to the user as if the logout process didn't function properly.
:::

## Automatic termination of sessions

Not all users will trigger the logout process manually, so Auth0 also provides **session timeout** to prevent overly long-lived sessions. This setting is [available and configurable via the Auth0 Dashboard](/dashboard/dashboard-tenant-settings#session-timeout).

<% if (platform === "b2b") { %>
If you are redirecting users to a separate IDP to login then [Federated User Logout](/logout/guides/logout-idps) is something that you need to consider for your application.  *Should* you log the user out of their IDP when they log out of your application?  The answer to this depends on what your users would expect. If the application is tied closely to the organization and is a central part, then they may expect to be logged out of their IDP, if not, then it may be frustrating to them to get logged out of their IDP when they log out of your application. In most B2B applications, federated logout is not expected by the user.
<%  } %>