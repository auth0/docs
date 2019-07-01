---
title: Single Sign-On with Auth0
description: Learn how Single Sign-on (SSO) works with Auth0.
toc: true
topics:
  - sso
contentType:
  - concept
useCase:
  - integrate-saas-sso
---
# Single Sign-On with Auth0

The easiest and most secure way to implement <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> with Auth0 is by using [Universal Login](/hosted-pages/login) for authentication. In fact, currently SSO is only possible with native platforms (like iOS or Android) if the application uses Universal Login. The [Swift](/quickstart/native/ios-swift/00-login) and [Android](/quickstart/native/android/00-login) quickstarts provide some examples of using Universal Login.

If you cannot use Universal Login with your application, review the following for additional info on embedded authentication:

* [Lock](/libraries/lock)
* [Auth0.js](/libraries/auth0js)

## SSO on first login

For SSO with Auth0, the **Central Service** is the Auth0 Authorization Server.

Let's look at an example of the SSO flow when a user logs in for the first time:

1. Your application redirects the user to the login page.
2. Auth0 checks to see whether there is an existing SSO cookie.
3. Because this is the first time the user is visiting the login page and no SSO cookie is present, the user will be asked to log in using one of the [connections](/connections) you have configured.

![](/media/articles/sso/single-sign-on/lock-no-sso-cookie.png)

4. Once the user has logged in, Auth0 will set an SSO cookie and redirect the user to your application, returning an ID Token that contains identity information for the user.

## SSO on subsequent logins

Let's look at an example of the SSO flow when a user returns to your website for a subsequent visit:

1. Your application redirects the user to the login page.
2. Auth0 checks to see whether there is an existing SSO cookie.
3. Auth0 finds the SSO cookie, and if necessary, updates it. No login screen is shown.
4. Auth0 redirects the user to your application, returning an ID Token that contains identity information for the user.

## Check a user's SSO status 

You can check a user's SSO status from an application by calling the `checkSession` method of the `auth0.js` SDK, which will attempt to [silently authenticate](/api-auth/tutorials/silent-authentication) the user within an iframe. Whether the authentication is successful or not indicates whether the user has an active SSO [cookie](/sessions/concepts/cookies).

## Keep reading

- Learn how to [enable SSO in Auth0](/dashboard/guides/tenants/enable-sso-tenant).