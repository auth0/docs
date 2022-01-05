<!-- markdownlint-disable MD041 -->

To run the sample application, first open `SwiftSample.xcodeproj` in Xcode and go to the settings of the application target you want to run: **SwiftSample (iOS)** or **SwiftSample (macOS)**. Change the bundle identifier from the default `com.auth0.samples.SwiftSample` to another value of your choosing.

Then, go to the settings page of your [Auth0 application](${manage_url}/#/applications/${account.clientId}/settings) and add the corresponding URL to **Allowed Callback URLs** and **Allowed Logout URLs**.

For **SwiftSample (iOS)**:

```text
YOUR_BUNDLE_IDENTIFIER://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback
```

For **SwiftSample (macOS)**:

```text
YOUR_BUNDLE_IDENTIFIER://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback
```
