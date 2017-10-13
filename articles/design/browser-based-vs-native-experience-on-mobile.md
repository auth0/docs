---
description: This doc covers the differences between a browser-based vs. native experience when implementing Auth0 on a mobile device
toc: true
---
# Browser-Based vs. Native Login Flows on Mobile Devices

When developing a native application, such as an app running on iOS or Android, you can choose between the following login flows: **native**, or **browser-based**.

![Native vs. browser-based UX](/media/articles/tutorials/mobile-ux.png)

When using a **browser-based** login flow, iOS opens a SafariViewController, whereas Android opens up a Custom Chrome Tab. The user is redirected to the Auth0 login page, where they can either sign up or log in.

When using a **native** login flow, the user signs up or enters their credentials directly into the app.

## Choose Between Browser-Based and Native Login Flows

Here are some considerations to think about when deciding whether you want to implement a browser-based or native login flow.

### SSO Across Native Applications

If you have a suite of mobile applications (such as Google Drive, Google Docs/Sheets, YouTube, and so on), you might want to automatically log the user into all of them if they log into any one app.

If your suite uses a wholly native experience, your users have to enter their credentials for each of your apps. However, if you use a browser-based UX, you can implement SSO to reduce the number of times the user has to log in.

::: note
You can implement SSO with native apps by storing refresh tokens on a shared keychain, but this technique is not compliant with the OAuth 2.0 specifications.
:::

### SSO Across Devices/Desktops/Laptops

Google is currently investing in the ability to synchronize sessions across devices called [Google SmartLock](https://get.google.com/smartlock/). This allows users to sign in using one device or desktop/laptop computer and automatically sync their session across all of their devices.

While SmartLock is not yet universal, using browser-based login flows allows you to take advantage of this tool.

### Phishing and Security Issues

With a native login flow, there's no way to avoid an unauthorized party from decompiling or intercepting traffic to/from your app to obtain the Client ID and authentication URL. Using these pieces of information, the unauthorized party can then create a rogue app, upload it to an app store, and use it to phish users for the username/passwords and access tokens.

Using a browser-based flow protects you from this, since the callback URL is linked to the app through [universal app links](https://developer.apple.com/ios/universal-links/) (iOS) or [App Links](/clients/enable-android-app-links) (Android). Note, however, that this is **not** a universally supported feature.

### Implementation Time

Using browser-based flows reduces the implementation time required, since everything is handled by the login page (including multifactor authentication and anomaly detection).

By default, [Lock](/libraries/lock) provides the UX, but you can customize it completely by providing your own UX written in HTML/CSS and integrating it with [auth0.js](libraries/auth0js/v8)

### Automatic Improvements

By relying on a centralized login experience, you will automatically receive new features without requiring you to make any changes to your native application. For example, if Auth0 adds support for FIDO/U2F, you would not need to make any code changes to your app before you can use this functionality.

### Load Time/User Experience

When using a native login flow, the login UI and logic is embedded onto the app bundle. Conversely, with a browser-based login flow, the user sees some loading time as the page loads.

However, it's worth noting that the number of times a user logs in with the mobile devices most commonly used today is low. Once the user logs in, your app should only log them out if you revoke their access or if the user opts to log out.

### Compliance with Best Practices

As explained in the [RFC 8252 OAuth 2.0 for Native Apps](https://tools.ietf.org/html/rfc8252), OAuth 2.0 authorization requests from native apps should only be made through external user-agents, primarily the user's browser.  The specification details the security and usability reasons why this is the case.

## Conclusion

There are upsides and downsides to using either a browser-based or native login flow on mobile devices, but regardless of which option you choose, Auth0 supports either.

## Keep Reading

For instructions on implementing a native experience for your users, please see the final sections of these three articles.

::: next-steps
* [Implementing Browser-Based Flows for iOS (Swift)](/quickstart/native/ios-swift/00-login)
* [Implementing Browser-Based Flows for Android](/quickstart/native/android/00-login)
* [Implementing Browser-Based Flows for iOS (Objective-C)](/quickstart/native/ios-objc)
:::
