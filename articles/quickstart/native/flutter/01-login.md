---
title: Add login to your Flutter app
default: true
description: This tutorial demonstrates how to add user login with Auth0 to an Android, iOS, or macOS Flutter app using the Auth0 Flutter SDK
budicon: 448
topics:
  - quickstarts
  - native
  - flutter
  - dart
  - ios
  - macos
  - android
contentType: tutorial
useCase: quickstart
files:
  - files/build
  - files/main
  - files/profile
github:
  path: sample
---

# Add login to your Flutter app

Auth0 allows you to quickly add authentication and access user profile information in your app. This guide demonstrates how to integrate Auth0 with a Flutter app using the <a href="https://github.com/auth0/auth0-flutter" target="_blank" rel="noreferrer">Auth0 Flutter SDK</a>.

:::note
The Flutter SDK currently only supports Flutter apps for Android, iOS, and macOS.
:::

## Getting started

This quickstart assumes you already have a <a href="https://flutter.dev/" target="_blank" rel="noreferrer">Flutter</a> app up and running. If not, check out the <a href="https://docs.flutter.dev/get-started/install" target="_blank" rel="noreferrer">Flutter "getting started" guides</a> to get started with a simple app.

You should also be familiar with the <a href="https://docs.flutter.dev/reference/flutter-cli" target="_blank" rel="noreferrer">Flutter command line tool</a>.

Finally, you will need a **Native** Auth0 application. If you don’t have a Native Auth0 application already, <a href="/get-started/auth0-overview/create-applications/native-apps" target="_blank" rel="noreferrer">create one</a> before continuing. Avoid using other application types, as they have different configurations and may cause errors.

### Configure the callback and logout URLs

The callback and logout URLs are the URLs that Auth0 invokes to redirect back to your app. Auth0 invokes the callback URL after authenticating the user, and the logout URL after removing the session cookie.

If the callback and logout URLs are not set, users will be unable to log in and out of the app and will get an error.

Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings" target="_blank" rel="noreferrer">settings page</a> of your Auth0 application and add the following URLs to **Allowed Callback URLs** and **Allowed Logout URLs**, depending on the platform of your app. If you have a <a href="/customize/custom-domains" target="_blank" rel="noreferrer">custom domain</a>, use this instead of the Auth0 domain from the settings page.

::: note
On Android, the value of the `SCHEME` placeholder can be `https` or some other custom scheme. `https` schemes require enabling <a href="https://auth0.com/docs/get-started/applications/enable-android-app-links-support" target="_blank" rel="noreferrer">Android App Links</a>.

On iOS 17.4+ and macOS 14.4+ it is possible to use Universal Links (`https` scheme) as callback and logout URLs. When enabled, the SDK will fall back to using a custom URL scheme on older iOS / macOS versions –your app's <a href="https://developer.apple.com/documentation/appstoreconnectapi/bundle_ids" target="_blank" rel="noreferrer">bundle identifier</a>.
**This feature requires Xcode 15.3+ and a paid Apple Developer account**.
:::

#### Android

```text
SCHEME://${account.namespace}/android/YOUR_PACKAGE_NAME/callback
```

#### iOS

```text
https://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback,
YOUR_BUNDLE_IDENTIFIER://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback
```

#### macOS

```text
https://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback,
YOUR_BUNDLE_IDENTIFIER://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback
```

For example, if your iOS bundle identifier were `com.example.MyApp` and your Auth0 domain were `example.us.auth0.com`, then this value would be:

```text
https://example.us.auth0.com/ios/com.example.MyApp/callback,
com.example.MyApp://example.us.auth0.com/ios/com.example.MyApp/callback
```

## Install the Auth0 Flutter SDK

Add the Auth0 Flutter SDK into the project:

```shell
flutter pub add auth0_flutter
```

## Configure Android

If you are not developing for the Android platform, skip this step.

The SDK requires manifest placeholders. Auth0 uses placeholders internally to define an `intent-filter`, which captures the authentication callback URL. You must set the Auth0 tenant domain and the callback URL scheme.

Modify `app/build.gradle` to include manifest placeholders for `auth0Domain` and `auth0Scheme` inside the `defaultConfig` section:

```groovy
apply plugin: 'com.android.application'

android {
    defaultConfig {
        applicationId "com.auth0.samples"
        minSdkVersion 21
        targetSdkVersion flutter.targetSdkVersion
        // ...

        // ---> Add the next line
        manifestPlaceholders += [auth0Domain: "${account.namespace}", auth0Scheme: "https"]
        // <---
    }
}
```

- `auth0Domain`: The domain of your Auth0 tenant. Generally, you find this in the Auth0 Dashboard under your **Application Settings** in the Domain field. If you are using a custom domain, you should set this to the value of your custom domain instead.
- `auth0Scheme`: The scheme to use. Can be a custom scheme, or `https` if you want to use <a href="https://auth0.com/docs/applications/enable-android-app-links" target="_blank" rel="noreferrer">Android App Links</a>. You can read more about setting this value in the <a href="https://github.com/auth0/Auth0.Android#a-note-about-app-deep-linking" target="_blank" rel="noreferrer">Auth0.Android SDK README</a>.

:::note
You do not need to declare a specific `intent-filter` for your activity because you defined the manifest placeholders with your Auth0 **Domain** and **Scheme** values. The library handles the redirection for you.
:::

Run **Sync Project with Gradle Files** inside Android Studio to apply your changes.

## Configure iOS/macOS

If you are not developing for the iOS or macOS platforms, skip this step.

::: warning
This step requires a paid Apple Developer account. It is needed to use Universal Links as callback and logout URLs. Skip this step to use a custom URL scheme instead.
:::

#### Configure the Team ID and bundle identifier

Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings" target="_blank" rel="noreferrer">settings page</a> of your Auth0 application, scroll to the end, and open **Advanced Settings > Device Settings**. In the **iOS** section, set **Team ID** to your <a href="https://developer.apple.com/help/account/manage-your-team/locate-your-team-id/" target="_blank" rel="noreferrer">Apple Team ID</a>, and **App ID** to your app's bundle identifier.

<p><img src="/media/articles/native-platforms/ios-swift/ios-device-settings.png" alt="Screenshot of the iOS section inside the Auth0 application settings page"></p>

This will add your app to your Auth0 tenant's `apple-app-site-association` file.

#### Add the associated domain capability

Open your app in Xcode by running `open ios/Runner.xcworkspace` (or `open macos/Runner.xcworkspace` for macOS). Go to the **Signing and Capabilities** <a href="https://developer.apple.com/documentation/xcode/adding-capabilities-to-your-app#Add-a-capability" target="_blank" rel="noreferrer">tab</a> of the **Runner** target settings, and press the **+ Capability** button. Then select **Associated Domains**.

<p><img src="/media/articles/native-platforms/ios-swift/ios-xcode-capabilities.png" alt="Screenshot of the capabilities library inside Xcode"></p>

Next, add the following <a href="https://developer.apple.com/documentation/xcode/configuring-an-associated-domain#Define-a-service-and-its-associated-domain" target="_blank" rel="noreferrer">entry</a> under **Associated Domains**:

```text
webcredentials:${account.namespace}
```

If you have a <a href="/customize/custom-domains" target="_blank" rel="noreferrer">custom domain</a>, use this instead of the Auth0 domain from the settings page.

::: note
For the associated domain to work, your app must be signed with your team certificate **even when building for the iOS simulator**. Make sure you are using the Apple Team whose Team ID is configured in the settings page of your Auth0 application.
:::

## Add login to your app

<a href="https://auth0.com/docs/authenticate/login/auth0-universal-login" target="_blank" rel="noreferrer">Universal Login</a> is the easiest way to set up authentication in your app. We recommend using it for the best experience, best security, and the fullest array of features.

Integrate Auth0 Universal Login in your Flutter app by importing the SDK and instantiating the `Auth0` class using your Auth0 domain and Client ID values. See this example, which instantiates the class inside a widget state object:

```dart
import 'package:auth0_flutter/auth0_flutter.dart';

class MainView extends StatefulWidget {
  const MainView({Key? key}) : super(key: key);

  @override
  State<MainView> createState() => _MainViewState();
}

class _MainViewState extends State<MainView> {
  Credentials? _credentials;

  late Auth0 auth0;

  @override
  void initState() {
    super.initState();
    auth0 = Auth0('${account.namespace}', '${account.clientId}');
  }

  @override
  Widget build(BuildContext context) {
    // ...
  }
}
```

Next, redirect your users to the Auth0 Universal Login page using `webAuthentication().login()`. This is a `Future` and must be awaited for you to retrieve the user's tokens. See this example of a `ElevatedButton` widget that logs the user in when clicked. Note that `_credentials` is used to determine locally within your app whether or not a user is signed in:

```dart
if (_credentials == null) {
  ElevatedButton(
    onPressed: () async {
      // Use a Universal Link callback URL on iOS 17.4+ / macOS 14.4+
      // useHTTPS is ignored on Android
      final credentials =
          await auth0.webAuthentication().login(useHTTPS: true);

      setState(() {
        _credentials = credentials;
      });
    },
    child: const Text("Log in")
  )
}
```

**Android**: if you are using a custom scheme, pass this scheme to the login method so that the SDK can route to the login page and back again correctly:

```dart
await auth0.webAuthentication(scheme: 'YOUR CUSTOM SCHEME').login();
```

When a user logs in, they are redirected back to your app. Then, you are able to access the ID and access tokens for this user.

::::checkpoint
:::checkpoint-default
Add a button to your app that calls `webAuthentication().login()` and logs the user into your app. Verify that you are redirected to Auth0 for authentication and then back to your app.

Verify that you can get access to the tokens on the result of calling `login`.
:::

:::checkpoint-failure
If your app did not launch successfully:

- Ensure you set the Allowed Callback URLs are correct
- Verify you saved your changes after entering your URLs
- Make sure the domain and client ID values are imported correctly
- If using Android, ensure that the manifest placeholders have been set up correctly, otherwise the redirect back to your app may not work

Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" rel="noreferrer">documentation</a> or visit our <a href="https://community.auth0.com" target="_blank" rel="noreferrer">community page</a> to get more help.
:::
::::

## Add logout to your app

To log users out, redirect them to the Auth0 logout endpoint to clear their login session by calling the Auth0 Flutter SDK `webAuthentication().logout()`. <a href="https://auth0.com/docs/authenticate/login/logout" target="_blank" rel="noreferrer">Read more about logging out of Auth0</a>.

See this example of an `ElevatedButton` widget that logs the user out of the app. Note that `_credentials` is set to `null`, indicating that the user is no longer signed in to your app:

```dart
ElevatedButton(
  onPressed: () async {
    // Use a Universal Link logout URL on iOS 17.4+ / macOS 14.4+
    // useHTTPS is ignored on Android
    await auth0.webAuthentication().logout(useHTTPS: true);

    setState(() {
      _credentials = null;
    });
  },
  child: const Text("Log out"))
```

**Android**: if you are using a custom scheme, pass this scheme to the logout method so that the SDK can route back to your app correctly:

```
await auth0.webAuthentication(scheme: 'YOUR CUSTOM SCHEME').logout();
```

::::checkpoint
:::checkpoint-default
Add a button to your app that calls `webAuthentication().logout()` and logs the user out of your app. When you select it, verify that your Flutter app redirects you to the logout endpoint and back again. You should not be logged in to your app.
:::

:::checkpoint-failure
If your app did not log out successfully:

- Ensure the Allowed Logout URLs are set properly
- Verify you saved your changes after entering your URLs

Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" rel="noreferrer">documentation</a> or visit our <a href="https://community.auth0.com" target="_blank" rel="noreferrer">community page</a> to get more help.
:::
::::

## Show user profile information

The user profile automatically retrieves user profile properties for you when you call `webAuthentication().login()`. The returned object from the login step contains a `user` property with all the user profile properties, which populates by decoding the ID token.

See this example of a `View` component that displays the user profile on the screen:

```dart
import 'package:auth0_flutter/auth0_flutter.dart';
import 'package:flutter/material.dart';

class ProfileView extends StatelessWidget {
  const ProfileView({Key? key, required this.user}) : super(key: key);

  final UserProfile user;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (user.name != null) Text(user.name!),
        if (user.email != null) Text(user.email!)
      ],
    );
  }
}
```

::::checkpoint
:::checkpoint-default
Log in and inspect the `user` property on the result. Verify the current user's profile information, such as `email` or `name`.
:::
:::checkpoint-failure
If your app did not return user profile information:

- Verify the access token is valid

Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" rel="noreferrer">documentation</a> or visit our <a href="https://community.auth0.com" target="_blank" rel="noreferrer">community page</a> to get more help.
:::
::::
