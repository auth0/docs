## Configure Auth0 {{{ data-action=configure }}}

To use Auth0 services, you need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for your project.

### Configure an Auth0 application

Use the interactive selector to create a new Auth0 application or select an existing **Native** Auth0 application. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.

Any settings you configure using this quickstart will automatically update for your application in the <a href="${manage_url}/#/">Dashboard</a>, which is where you can manage your applications in the future.

If you would rather explore a complete configuration, you can view a sample app instead.

### Configure the callback and logout URLs

The callback and logout URLs are the URLs that Auth0 invokes to redirect back to your app. Auth0 invokes the callback URL after authenticating the user, and the logout URL after removing the session cookie. If the callback and logout URLs are not set, users will be unable to log in and out of the app and will get an error.

Set the callback and logout URLs to the following values, depending on your platform.

::: note
On Android, the value of the `SCHEME` placeholder can be `https` or some other custom scheme. `https` schemes require enabling [Android App Links](https://auth0.com/docs/get-started/applications/enable-android-app-links-support).

On iOS 17.4+ and macOS 14.4+ it is possible to use Universal Links (`https` scheme) as callback and logout URLs. When enabled, the SDK will fall back to using a custom URL scheme on older iOS / macOS versions –your app's [bundle identifier](https://developer.apple.com/documentation/appstoreconnectapi/bundle_ids).
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
