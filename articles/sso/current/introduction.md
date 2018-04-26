---
description: A brief introduction to Single Sign On (SSO) and an overview of how SSO works with Auth0.
toc: true
---

# Introduction to Single Sign On with Auth0

## What is Single Sign On?

Single Sign On (SSO) occurs when a user logs in to one application and is then signed in to other applications automatically, regardless of the platform, technology, or domain the user is using. The user signs in only one time hence the naming of the feature (Single Sign On).

Google's implementation of login for their products, such as Gmail, YouTube, Google Analytics, and so on, is an example of SSO. Any user that logs in to one of Google's products are automatically logged in to their other products as well.

Single Sign On usually makes use of a **Central Service** which orchestrates the single sign on between multiple applications. In the example of Google, this central service is [Google Accounts](https://accounts.google.com). When a user first logs in, Google Accounts creates a cookie, which persists with the user as they navigate to other Google-owned services. The process flow is as follows:

1. The user accesses the first Google product.
1. The user receives a Google Accounts-generated cookie.
1. The user navigates to another Google product.
1. The user is redirected again to Google Accounts.
1. Google Accounts sees that the user already has an authentication-related cookie, so it redirects the user to the requested product.

## What is Single Log Out?

Single Logout is the process where you terminate the session of each application or service where the user is logged in. To continue with the Google example, if you logout from Gmail, you get logged out also from YouTube, Google Analytics, and so on.

There may be up to three different layers of sessions for a user with SSO.

* A session from an Identity Provider such as Google, Facebook or an enterprise SAML Identity Provider
* A session from Auth0 if the above SSO flag is turned on
* A session maintained by an application

See the [Logout URL docs](/logout) for information on terminating the first two sessions listed above.

## An overview of how SSO works with Auth0

In the case of SSO with Auth0, the **Central Service** is the Auth0 Authorization Server.

Let's look at an example of how the SSO flow looks when using Auth0 and the [Lock](/libraries/lock) widget and a user visits your application for the first time:

1. Your application will redirect the user to the login page where they can log in.
1. Auth0 will check to see whether there is an existing SSO cookie.
1. Because this is the first time the user visits this login page, and no SSO cookie is present, they may be presented with username and password fields and also possibly some Social Identity Providers such as LinkedIn, GitHub, etc. (The exact layout of the Lock screen will depend on the [Identity Providers](/identityproviders) you have configured.

    ![](/media/articles/sso/single-sign-on/lock-no-sso-cookie.png)

1. Once the user has logged in, Auth0 will set an SSO cookie
1. Auth0 will also redirect back to your web application and will return an `id_token` containing the identity of the user.

Now let's look at flow when the user returns to your website for a subsequent visit:

1. Your application will redirect the user to the login page where they can sign in.
1. Auth0 will check to see whether there is an existing SSO cookie.
1. This time Auth0 finds an SSO cookie and instead of displaying the normal Lock screen with the username and password fields, it will display a Lock screen which indicates that we know who the user is, as they have already logged in before. They can simply confirm that they want to log in with that same account.

    ![](/media/articles/sso/single-sign-on/lock-sso-cookie.png)

1. Auth0 will update the SSO cookie if required
1. Auth0 will also redirect back to your web application and will return an `id_token` containing the identity of the user.

If an SSO cookie is present you can also sign the user in silently, (that is, without even displaying Lock so they can enter their credentials). This is covered in more detail in the [Setup Single Sign On with Auth0](/sso/current/setup) tutorial.

## SSO with Native Platforms

Currently, SSO is only possible with native platforms (such as iOS or Android) if the application uses the universal login for authentication. The [Swift](/quickstart/native/ios-swift/00-login) and [Android](/quickstart/native/android/00-login) quickstarts provide some examples of usage of universal login for authentication from their respective platforms.
