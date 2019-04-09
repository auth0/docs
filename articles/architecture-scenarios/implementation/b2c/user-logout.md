---
title: User Logout
description: What to consider for user logout
toc: true
topics:
    - b2c
    - ciam
    - logout
    - sessions
contentType: concept
useCase:
    - user-logout
---
# User Logout

[Logout](/logout) is the act of terminating an authenticated session when it's no longer needed, thus minimizing the likelihood that unauthorized parties can "take over" the session. This is typically achieved by provisioning a logout option on the user interface you provide to your users. Multiple types of sessions can be created when a user logs in (e.g., local application sessions, Auth0 session, third-party Identity Provider sessions), and you will need to determine which of these sessions need to be terminated when the user clicks **Logout**.

## Design considerations

When configuring logout behavior, you'll need to consider:

* Which sessions should be terminated when the user initiates logout?
* What information to provide to users as confirmation of the sessions terminated?
* Where the users should be redirected to after logout completes?
* Whether actions take by the user elsewhere (such as in another application) need to be accounted for to [provide a single logout experience](/logout/guides/logout-applications#single-sign-out-configuration-example)?
* How long you want sessions to last in the event that users do not trigger the logout process?

### Types of logout

Given the varying types of sessions that can be created whenever a user logs in, there are several types of logout possible:

* Local application logout to end the application session
* Auth0 logout to terminate the Auth0 session
* Federated logout to terminate the Auth0 session and propagate the logout request to a remote, third-party Identity Provider
* Global, or single, logout to end the Auth0 session and send a logout request/notice to applications relying on the Auth0 session

The functionality provided by your application, as well as your use of features like [SSO](/sso), will inform your decision as to what type of logout is required and what visual confirmation you'll need to provide to your users. Regardless of which option you choose, the logout process you implement should make it clear to the user which sessions are being terminated, and also when the logout process has completed.

::: warning
If the logout feature in one application terminates an Auth0 SSO session that is used by other applications, the user may lose work if they have uncommitted transactions. Be sure to add the functionality needed to handle such conditions to minimize the likelihood of lost work.
:::

### Where to send users after logout

Once your user logs out, they will be redirected to a specific location of your choosing. This location is specified as the **logout redirect URL**, and you can [define this as a parameter](/logout/guides/redirect-users-after-logout) via the Auth0 Dashboard. 

In [OIDC](/protocols/oidc), this location is specified as the **logout redirect URL**. In Auth0, [you can define this parameter via the Dashboard](/logout/guides/redirect-users-after-logout).

The URL(s) you use to redirect users after logging out must be [whitelisted in the Dashboard](/logout#redirect-users-after-logout) to mitigate open-redirect security vulnerabilities. You can whitelist them at the tenant or application levels.

::: warning
If the user logs out and you redirect them back to the application, and the application redirects to an Identity Provider that still has a valid session for the user, the user will be logged in silently to the application. This may appear to the user as if the logout process didn't function properly.
:::

### Automatic termination of sessions

Not all users will trigger the logout process manually, so Auth0 also provides **session timeout** to prevent overly long-lived sessions. This setting is [available and configurable via the Auth0 Dashboard](/dashboard/dashboard-tenant-settings#session-timeout).

## Keep reading

* [Architecture](/architecture-scenarios/implementation/b2c/tenant-architecture)
* [User Provisioning](/architecture-scenarios/implementation/b2c/user-provisioning)
* [Authentication](/architecture-scenarios/implementation/b2c/authentication)
* [Branding](/architecture-scenarios/implementation/b2c/branding)
* [User Profile Management](/architecture-scenarios/implementation/b2c/user-profile-mgmt)
* [Authorization](/architecture-scenarios/implementation/b2c/user-authorization)
