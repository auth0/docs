<!-- markdownlint-disable MD041 -->

> On every step, if you have a [custom domain](https://auth0.com/docs/customize/custom-domains), replace the `YOUR_AUTH0_DOMAIN` placeholder with your custom domain instead of the value from the settings page.

## 1. Configure the Auth0 application

Open the settings page of your Auth0 application and add the following URLs to **Allowed Callback URLs** and **Allowed Logout URLs**, depending on the platform you want to use.

- Android: `com.auth0.sample://YOUR_AUTH0_DOMAIN/android/com.auth0.sample/callback`
- iOS: `https://YOUR_AUTH0_DOMAIN/ios/YOUR_BUNDLE_IDENTIFIER/callback,YOUR_BUNDLE_IDENTIFIER://YOUR_AUTH0_DOMAIN/ios/YOUR_BUNDLE_IDENTIFIER/callback`
- macOS: `https://YOUR_AUTH0_DOMAIN/macos/YOUR_BUNDLE_IDENTIFIER/callback,YOUR_BUNDLE_IDENTIFIER://YOUR_AUTH0_DOMAIN/macos/YOUR_BUNDLE_IDENTIFIER/callback`

## 2. Configure the associated domain (iOS/macOS only)

> **This following requires Xcode 15.3+ and a paid Apple Developer account**. If you do not have a paid Apple Developer account, skip this step, and set the `useHTTPS` parameter to `false` in the `login()` and `logout()` calls at `lib/example_app.dart`.

Open `ios/Runner.xcodeproj` (or `macos/Runner.xcodeproj`, for macOS) in Xcode and go to the settings of the **Runner** app target. In the **Signing & Capabilities** tab, change the bundle identifier from the default `com.auth0.samples.FlutterSample` to another value of your choosing. Then, make sure the **Automatically manage signing** box is checked, and that your Apple Team is selected.

Next, find the `webcredentials:YOUR_AUTH0_DOMAIN` entry under **Associated Domains**, and replace the `YOUR_AUTH0_DOMAIN` placeholder with the domain of your Auth0 application.

Finally, open the settings page of your Auth0 application, scroll to the end, and open **Advanced Settings > Device Settings**. In the **iOS** section, set **Team ID** to your [Apple Team ID](https://developer.apple.com/help/account/manage-your-team/locate-your-team-id/), and **App ID** to the app's bundle identifier.

## 3. Run the app

Use the [Flutter CLI](https://docs.flutter.dev/reference/flutter-cli) to run the app: `flutter run`.
