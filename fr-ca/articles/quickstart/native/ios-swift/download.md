<!-- markdownlint-disable MD041 -->

> On every step, if you have a [custom domain](https://auth0.com/docs/customize/custom-domains), replace the `YOUR_AUTH0_DOMAIN` placeholder with your custom domain instead of the value from the settings page.

## 1. Configure the associated domain

> **This requires Xcode 15.3+ and a paid Apple Developer account**. If you do not have a paid Apple Developer account, skip this step, and comment out the two `useHTTPS()` calls in `MainView.swift`.

Open `SwiftSample.xcodeproj` in Xcode and go to the settings of the app target you want to run. There are two app targets available: **SwiftSample (iOS)** and **SwiftSample (macOS)**. Change the bundle identifier from the default `com.auth0.samples.SwiftSample` to another value of your choosing. Then, make sure the **Automatically manage signing** box is checked, and that your Apple Team is selected.

Next, go to the **Signing & Capabilities** tab of the app's target settings. Find the `webcredentials:YOUR_AUTH0_DOMAIN` entry under **Associated Domains**, and replace the `YOUR_AUTH0_DOMAIN` placeholder with the domain of your Auth0 application.

Finally, open the settings page of your Auth0 application, scroll to the end, and open **Advanced Settings > Device Settings**. In the **iOS** section, set **Team ID** to your [Apple Team ID](https://developer.apple.com/help/account/manage-your-team/locate-your-team-id/), and **App ID** to the app's bundle identifier.

## 2. Configure the Auth0 application

Open the settings page of your Auth0 application and add the following URLs to **Allowed Callback URLs** and **Allowed Logout URLs**, depending on the app target you want to run.

- **SwiftSample (iOS)**: `https://YOUR_AUTH0_DOMAIN/ios/YOUR_BUNDLE_IDENTIFIER/callback,YOUR_BUNDLE_IDENTIFIER://YOUR_AUTH0_DOMAIN/ios/YOUR_BUNDLE_IDENTIFIER/callback`
- **SwiftSample (macOS)**: `https://YOUR_AUTH0_DOMAIN/macos/YOUR_BUNDLE_IDENTIFIER/callback,YOUR_BUNDLE_IDENTIFIER://YOUR_AUTH0_DOMAIN/macos/YOUR_BUNDLE_IDENTIFIER/callback`
