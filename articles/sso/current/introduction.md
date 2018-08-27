---
description: A brief introduction to Single Sign On (SSO) and an overview of how SSO works with Auth0.
toc: true
topics:
  - sso
contentType:
  - concept
useCase:
  - integrate-saas-sso
---
# Introduction to Single Sign On with Auth0

So you have developed an application at domain X and now you want your new deployment at domain Y to use the same login information as the other domain. In fact, you want more: you want users who are already logged-in at domain X to be already logged-in at domain Y. This is what SSO is all about.

Single Sign On (SSO) occurs when a user logs in to one application and is then signed in to other applications automatically, regardless of the platform, technology, or domain the user is using. The user signs on only a single time, hence the naming of the feature.

## An SSO example

Google's implementation of login for their products, such as Gmail, YouTube, Google Analytics, and so on, is an example of SSO. Any user that logs in to one of Google's products are automatically logged in to their other products as well.

SSO usually makes use of a **Central Service** which orchestrates the single sign on between multiple clients (applications). In the example of Google, this central service is [Google Accounts](https://accounts.google.com).

When a user first logs in, Google Accounts creates a cookie, which persists with the user as they navigate to other Google-owned services. The process flow is as follows:

1. The user accesses the first Google product.
1. The user receives a Google Accounts-generated cookie.
1. The user navigates to another Google product.
1. The user is redirected again to Google Accounts.
1. Google Accounts sees that the user already has an authentication-related cookie, so it redirects the user to the requested product.

## How SSO works with Auth0

In the case of SSO with Auth0, the **Central Service** is the Auth0 Authorization Server.

Let's look at an example of how the SSO flow looks when using Auth0 and the [Lock](/libraries/lock) widget and a user visits your application for the first time:

1. Your application will redirect the user to the login page where they can log in.
1. Auth0 will check to see whether there is an existing SSO cookie.
1. Because this is the first time the user visits this login page, and no SSO cookie is present, they may be presented with username and password fields and also possibly some Social Identity Providers such as LinkedIn, GitHub, etc. (The exact layout of the Lock screen will depend on the [Identity Providers](/identityproviders) you have configured.

    ![](/media/articles/sso/single-sign-on/lock-no-sso-cookie.png)

1. Once the user has logged in, Auth0 will set an SSO cookie.
1. Auth0 will also redirect back to your web application and will return an ID Token containing the identity of the user.

Now let's look at flow when the user returns to your website for a subsequent visit:

1. Your application will redirect the user to the login page.
1. Auth0 checks to see if there is an existing SSO cookie.
1. Auth0 finds the SSO cookie, and if necessary, updates it.
1. Auth0 returns an ID Token containing identity information for the user.

Please note that the user is never shown a login screen at any point during the above steps.

## Too many protocols

If you have been reading about SSO online, you have probably found that there are many different implementations: OpenID Connect, Facebook Connect, SAML, Microsoft Account (formerly known as Passport), and so forth. Our advice is to choose whatever is simplest for your development efforts. For instance, SAML is deeply entrenched in enterprise developments, so in some cases it will make sense to pick that. If you think you will need to integrate your development with more than one alternative, don't despair: there are frameworks that allow interoperability between different SSO solutions. In fact, that's one of the things we do at Auth0.

Our SSO solution works as a **bridge** between different SSO frameworks. So whatever your existing apps are using, you can integrate SSO into them. 

## SSO with native platforms

Currently, SSO is only possible with native platforms (such as iOS or Android) if the application uses the [Universal Login](/hosted-pages/login) for authentication.

The [Swift](/quickstart/native/ios-swift/00-login) and [Android](/quickstart/native/android/00-login) quickstarts provide some examples of usage of Universal Login for authentication from their respective platforms.

## What is single log out?

Single Logout is the process where you terminate the session of each application or service where the user is logged in. To continue with the Google example, if you logout from Gmail, you get logged out also from YouTube, Google Analytics, and so on.

There may be up to three different layers of sessions for a user with SSO.

* A session from an Identity Provider such as Google, Facebook or an enterprise SAML Identity Provider
* A session from Auth0 if the above SSO flag is turned on
* A session maintained by an application

See the [Logout URL docs](/logout) for information on terminating the first two sessions listed above.
