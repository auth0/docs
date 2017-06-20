The first step in adding authentication to your application is to provide a way for your users to log in. The fastest, most secure, and most feature-rich way to do this with Auth0 is to use the [login page](https://auth0.com/docs/hosted-pages/login).

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/lock_centralized_login.png" alt="Hosted Login Page"></div>

## Native configuration

Auth0 will need to handle the callback of the hosted login authentication.

### Android

In the file `android/app/src/main/AndroidManifest.xml` you must make sure the main activity of the app has **launchMode** value of `singleTask` and that it has the following intent filter.

```xml
<activity
android:name=".MainActivity"
android:label="@string/app_name"
android:launchMode="singleTask"
android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
android:windowSoftInputMode="adjustResize">
<intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
        android:host="${account.namespace}"
        android:pathPrefix="/android/YOUR_APP_PACKAGE_NAME/callback"
        android:scheme="YOUR_APP_PACKAGE_NAME" />
</intent-filter>
</activity>
```

Replace `YOUR_APP_PACKAGE_NAME` with your actual application's package name.

### iOS

In the file `ios/<YOUR PROJECT>/AppDelegate.m` add the following:

```objc
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}
```

Next you will need to add a URLScheme using your App's bundle identifier.

Check the `info.plist` for the existing bundle identifier e.g.

```xml
<key>CFBundleIdentifier</key>
<string>org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)</string>
```

You can then register the identifier by adding the following snippet:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>None</string>
        <key>CFBundleURLName</key>
        <string>auth0</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)</string>
        </array>
    </dict>
</array>
```

::: note
For further reference on linking, check [their official documentation](https://facebook.github.io/react-native/docs/linking.html)
:::

## Implement the login

First, import the `Auth0` module and create a new `Auth0` instance.

${snippet(meta.snippets.setup)}

Then present the hosted login screen, like this:

${snippet(meta.snippets.use)}

Upon successful authentication the user's `credentials` will be returned, containing an `access_token`, an `id_token` and an `expires_in` value.

::: note
For further reference on the `accessToken`, please see
[accessToken](https://auth0.com/docs/tokens/access-token).
:::
