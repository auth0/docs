# What is SSO (Single Sign On)?

SSO (Single Sign On) means that when a user logs in to one application they will be "automatically" signed in to every other application, regardless of the platform, technology and domain.

For example, Google implements SSO for their products: Gmail, YouTube, Analytics, etc. When you turn on your computer and access Gmail, you login for the first time. Then, if you go to YouTube you won't be prompted for credentials again.

The way this works is by means of a "central service" (in the case of Google this is https://accounts.google.com). When you login for the first time a cookie gets created on this central service. Then, when you try to access the second application, you get redirected to the central service, but since you already have a cookie, you get redirected to the app directly with a token, which means you're already logged in.

## How to implement SSO with Auth0?

For every application in Auth0 that you want to enable SSO, you have to turn on the SSO flag on the application settings on the Auth0 dashboard (or through the API)

![](/media/articles/sso/single-sign-on/sso-checkbox.png)

When the SSO flag is turned on, Auth0 will maintain an SSO session for the user.  This session will last a maximum of 7 days if a user remains active, but will terminate after 3 days of inactivity if the user does not remain active.  To be considered active, a user must access an application registered in Auth0 (the same account as the application that created the session).  

In addition to turning on the SSO flag in Auth0, applications must add logic to check a user's SSO status. There are two ways of implementing this SSO logic using Auth0. One involves client-side (JavaScript) and the other is completely server side.

* [Client-side SSO (Single Page Apps)](/sso/single-page-apps-sso)
* [Server-side SSO (Regular Web Apps)](/sso/regular-web-apps-sso)

> You can see an example of SSO with both Single Page Apps and Regular Web Apps in [this github repository](https://github.com/auth0/auth0-sso-sample)


# What is Single Log Out?

Single Logout is the process where you terminate the session of each application or service where the user is logged in. To continue with the Google example, if you logout from Gmail, you get logged out also from YouTube, Google Analytics, etc.

There may be up to three different layers of sessions for a user with SSO.

* A session at an Identity Provider such as Google, Facebook or an enterprise SAML Identity Provider
* A session at Auth0 if the above SSO flag is turned on
* A session maintained by an application

See the [Logout URL docs](/logout) for information on terminating the first two sessions listed above.
