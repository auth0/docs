<!-- markdownlint-disable MD041 -->

## 1. Configure code signing

To run the sample application, first open `SwiftSample.xcodeproj` in Xcode and go to the settings of the application target you want to run. There are two application targets available: **SwiftSample (iOS)** and **SwiftSample (macOS)**. Change the bundle identifier from the default `com.auth0.samples.SwiftSample` to another value of your choosing.
Then, make sure the **Automatically manage signing** box is checked, and that your Apple Team is selected.

## 2. Configure the associated domain

> **This requires Xcode 15.3+ and a paid Apple Developer account**. If you do not have a paid Apple Developer account, skip this step, and comment out the two `useHTTPS()` calls in `MainView.swift`.

Go to the **Signing and Capabilities** tab of the app's target settings. Find the `webcredentials:{YOUR_AUTH0_DOMAIN}` entry under **Associated Domains**, and replace the placeholder `{YOUR_AUTH0_DOMAIN}` value with the domain of your Auth0 application. If have a [custom domain](https://auth0.com/docs/customize/custom-domains), replace `{YOUR_AUTH0_DOMAIN}` with your custom domain instead of the value from the settings page.

## 3. Configure the Auth0 application

Open the settings page of your [Auth0 application](${manage_url}/#/applications/${account.clientId}/settings) and add the corresponding URLs to **Allowed Callback URLs** and **Allowed Logout URLs**. If you have a [custom domain](https://auth0.com/docs/customize/custom-domains), replace `YOUR_AUTH0_DOMAIN` with your custom domain instead of the value from the settings page.

For **SwiftSample (iOS)**:

```text
https://YOUR_AUTH0_DOMAIN/ios/YOUR_BUNDLE_IDENTIFIER/callback,
YOUR_BUNDLE_IDENTIFIER://YOUR_AUTH0_DOMAIN/ios/YOUR_BUNDLE_IDENTIFIER/callback
```

For **SwiftSample (macOS)**:

```text
https://YOUR_AUTH0_DOMAIN/macos/YOUR_BUNDLE_IDENTIFIER/callback,
YOUR_BUNDLE_IDENTIFIER://YOUR_AUTH0_DOMAIN/macos/YOUR_BUNDLE_IDENTIFIER/callback
```

Then, scroll to the end of the settings page and open **Advanced Settings > Device Settings**. In the **iOS** section, set **Team ID** to your [Apple Team ID](https://developer.apple.com/help/account/manage-your-team/locate-your-team-id/), and **App ID** to the app's bundle identifier.
