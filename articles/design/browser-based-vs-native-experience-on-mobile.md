---
title: Browser-Based vs. Native Login Flows on Mobile Devices
description: This article covers the pros and cons between a browser-based vs. native experience when implementing Auth0 on a mobile device
toc: true
topics:
  - design
  - mobile
contentType: reference
useCase: strategize
---
# Browser-Based vs. Native Login Flows on Mobile Devices

When developing a native mobile application, such as an iOS or Android application, you can choose between the following login flows: **native**, or **browser-based**.

![Native vs. browser-based UX](/media/articles/tutorials/mobile-ux.png)

When using a **browser-based** login flow, the user is shown a web browser and redirected to the Auth0 login page, where they can either sign up or log in. For example, an iOS application opens a SafariViewController or Android application opens a Custom Chrome Tab.

When using a **native** login flow, the user signs up or enters their credentials directly into the app. 

The rest of this article discusses more things to consider, before you decide on a browser-based, or a native login flow.

## Single Sign-on across native applications

If you have several mobile applications (such as Google Drive, Google Docs/Sheets, YouTube, and so on), you might want to automatically log the user into all of them if they log into any one app.

If your applications use a wholly native experience, your users have to enter their credentials for each application. However, if you use a browser-based login flow you can implement <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn>, reducing the number of times the user has to log in.

::: note
You can implement SSO with native apps by storing <dfn data-key="refresh-token">Refresh Tokens</dfn> on a shared keychain, but this technique is not compliant with the OAuth 2.0 specifications.
:::

## SSO across devices/desktops/laptops

Google is currently investing in the ability to synchronize sessions across devices called [Google SmartLock](https://get.google.com/smartlock/). This allows users to sign in using one device or desktop/laptop computer and automatically sync their session across all of their devices.

While SmartLock is not yet universal, using browser-based login flows allows you to take advantage of this tool.

## Phishing and security issues

With a native login flow, an unauthorized party could decompile or intercept traffic to/from your application to get the Client ID and authentication URL. With this information the unauthorized party could create a rogue application, upload it to an application store, and use it to phish for usernames, passwords, and Access Tokens.

Using a browser-based flow protects you from this, since the callback URL is linked to the application through [universal app links](https://developer.apple.com/ios/universal-links/) (iOS) or [App Links](/dashboard/guides/applications/enable-android-app-links) (Android). Note, however, that this is **not** a universally supported feature.

## Implementation time

Using browser-based flows reduces the implementation time required, since everything is handled by the hosted login page (including multi-factor authentication and anomaly detection).

By default, [Lock](/libraries/lock) provides the user experience, but you can customize it with your own templates written in HTML and CSS, then integrate it with [auth0.js](libraries/auth0js)

## Automatic improvements

By relying on a Universal Login experience, you will automatically receive new features without requiring you to make any changes to your native application. For example, if Auth0 adds support for [FIDO/U2F](https://www.yubico.com/solutions/fido-u2f/), you would not need to make any code changes to your application before you can use this functionality.

## Load time and user experience

When using a native login flow, the login UI and logic is included in the application. With a browser-based login flow, the user sees some loading time as the page loads.

However, it's worth noting that the number of times a user logs in with the mobile devices is low. Once the user logs in, your application should only log them out if you revoke their access or if the user opts to log out.

## Compliance with best practices

As explained in the [RFC 8252 OAuth 2.0 for Native Apps](https://tools.ietf.org/html/rfc8252), OAuth 2.0 authorization requests from native apps should only be made through external user-agents, primarily the user's browser. The specification details the security and usability reasons why this is the case.

::: note
For an overview of RFC 8252, refer to [OAuth 2.0 Best Practices for Native Apps](https://auth0.com/blog/oauth-2-best-practices-for-native-apps).
:::

## Conclusion

If your platform supports it, you should use a **browser-based** login flow where your application presents an in-application (embedded) browser for login and signup. Using an in-application browser gives your application the benefits of browser-based authentication, such as shared authentication state and security context, without disrupting the user experience by switching applications.

Regardless of which option you choose, Auth0 supports either.

## Implementation examples

You can find instructions on how to implement a browser-based login flow in our Quickstarts:
- [iOS (Swift)](/quickstart/native/ios-swift/00-login)
- [Android](/quickstart/native/android/00-login)
- [iOS (Objective-C)](/quickstart/native/ios-objc/00-login)

For native login flows, you can find samples in the following GitHub repos:
- [iOS Swift](https://github.com/auth0-samples/auth0-ios-swift-sample/tree/embedded-login/01-Embedded-Login)
- [Android](https://github.com/auth0-samples/auth0-android-sample/tree/embedded-login/01-Embedded-Login)
- [iOS Objective-C](https://github.com/auth0-samples/auth0-ios-objc-sample)
