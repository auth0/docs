The first step in adding authentication to your application is to provide a way for your users to log in. The fastest, most secure, and most feature-rich way to do this with Auth0 is to use the hosted [login page](/hosted-pages/login).

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/lock_centralized_login.png" alt="Login Page"></div>

## Configuration

### Configure Android

In the file `android/app/src/main/AndroidManifest.xml` you must make sure the **MainActivity** of the app has a **launchMode** value of `singleTask` and that it has the following intent filter:

```xml
// android/app/src/main/AndroidManifest.xml

<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
        android:host="${account.namespace}"
        android:pathPrefix="/android/<%= "${applicationId}" %>/callback"
        android:scheme="<%= "${applicationId}" %>" />
</intent-filter>
```

So your **MainActivity** should look like this:

```xml
// android/app/src/main/AndroidManifest.xml

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
        android:pathPrefix="/android/<%= "${applicationId}" %>/callback"
        android:scheme="<%= "${applicationId}" %>" />
</intent-filter>
</activity>
```

### Configure iOS

In the file `ios/<YOUR PROJECT>/AppDelegate.m` add the following:

```objc
// ios/<YOUR PROJECT>/AppDelegate.m

#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}
```

Next you will need to add a URLScheme using your App's bundle identifier.

Inside the `ios` folder open the `Info.plist` and locate the value for `CFBundleIdentifier`

```xml
// ios/<YOUR PROJECT>/Info.plist

<key>CFBundleIdentifier</key>
<string>org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)</string>
```

and then register a URL type entry using the value of `CFBundleIdentifier` as the value for the `CFBundleURLSchemes`

```xml
// ios/<YOUR PROJECT>/Info.plist

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
The value org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier) is the default for apps created with React Native CLI, you may have a different value.
:::

## Add Authentication with Auth0

We recommend using Universal Login for the best experience, best security and the fullest array of features. This guide will use it to provide a way for your users to log in to your application.

::: note
You can also embed login functionality directly in your application. If you use this method, some features, such as single sign-on, will not be accessible.
To learn how to embed functionality using a custom login form in your application, follow the [Custom Login Form Sample](https://github.com/auth0-samples/auth0-react-native-sample/tree/Embedded/01-Custom-Form).
:::

First, import the `Auth0` module and create a new `Auth0` instance.

${snippet(meta.snippets.setup)}

Then present the hosted login screen, like this:

${snippet(meta.snippets.use)}

Upon successful authentication the user's `credentials` will be returned, containing an Access Token, an ID Token and an `expires_in` value.

::: note
For more information on the `accessToken`, refer to [Access Token](/tokens/access-tokens).
:::
