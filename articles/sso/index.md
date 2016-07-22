---
url: /sso
description: Introduction to Single Sign On (SSO) with Auth0.
---

# What is SSO (Single Sign On)?

SSO (Single Sign On) is when a user logs in to one application and then is "automatically" signed in to other applications, regardless of platform, technology and domain.

An example of SSO is how Google implements login for their products: Gmail, YouTube, Analytics, etc. When you first login to Gmail and then go to another Google service such as YouTube you won't be prompted for credentials again.

The way this works is by means of a "central service" (with Google this is https://accounts.google.com). When you first login a cookie gets created on this central service. Then when you try to access the second application, you get redirected to the central service, but since you already have a cookie, you get redirected to the app directly with a token, which means you're already logged in.

## How to implement SSO with Auth0

To enable SSO for one of your client applications(each client is independent) go to the [Clients section of the dashboard](${uiURL}/#/applications). Click on the **Settings** gear icon of the client you wish to add SSO.

Then scroll down to toggle "Use Auth0 instead of the IdP to do Single Sign On".

![](/media/articles/sso/single-sign-on/sso-checkbox.png)

::: panel-info Note
For SSO to work you must setup the Identity Provider(s) you wish to use. This involves getting a Client Key and Client Secret from the IdP. Click [here](/identityproviders) to learn how to setup various providers.
:::

This turns the SSO flag is on, this flag can also be set using the API. When this flag is set Auth0 will maintain an SSO session for the user.  This session will last a maximum of 7 days if a user remains active, but will terminate after 3 days of inactivity if the user does not remain active.  To be considered active, a user must access an application registered in Auth0 (the same account as the application that created the session).  

In addition to turning on the SSO flag in Auth0, applications must add logic to check a user's SSO status. This SSO logic can be implemented client-side with JavaScript or completely server side, click below to learn more:

* [Client-side SSO (Single Page Apps)](/sso/single-page-apps-sso)
* [Server-side SSO (Regular Web Apps)](/sso/regular-web-apps-sso)

> You can see an example of SSO with both Single Page Apps and Regular Web Apps in [this github repository](https://github.com/auth0/auth0-sso-sample)


# What is Single Log Out?

Single Logout is the process where you terminate the session of each application or service where the user is logged in. To continue with the Google example, if you logout from Gmail, you get logged out also from YouTube, Google Analytics, etc.

There may be up to three different layers of sessions for a user with SSO.

* A session from an Identity Provider such as Google, Facebook or an enterprise SAML Identity Provider
* A session from Auth0 if the above SSO flag is turned on
* A session maintained by an application

See the [Logout URL docs](/logout) for information on terminating the first two sessions listed above.


