The first step in adding authentication to your application is to provide a way for your users to log in. The fastest, most secure, and most feature-rich way to do this with Auth0 is to use the hosted [login page](/hosted-pages/login).

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/lock_centralized_login.png" alt="Hosted Login Page"></div>

## Configuration

### Android

In the file `android/app/src/main/AndroidManifest.xml` you must make sure the **MainActivity** of the app has a **launchMode** value of `singleTask` and that it has the following intent filter:

```xml
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

Inside the `ios` folder open the `Info.plist` and locate the value for `CFBundleIdentifier`

```xml
<key>CFBundleIdentifier</key>
<string>org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)</string>
```

and then register a URL type entry using the value of `CFBundleIdentifier` as the value for the `CFBundleURLSchemes`

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
The value org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier) is the default for apps created with React Native CLI, you may have a different value.
:::

::: note
For further reference on linking, check [the official documentation](https://facebook.github.io/react-native/docs/linking.html)
:::

## Implement the login

First, import the `Auth0` module and create a new `Auth0` instance.

${snippet(meta.snippets.setup)}

Then present the hosted login screen, like this:

${snippet(meta.snippets.use)}

::: note
This snippet sets the `audience` to ensure an OIDC compliant response. This can also be achieved by enabling the **OIDC Conformant** switch in your [Auth0 dashboard](${manage_url}), under **Client > Settings > Show Advanced Settings > OAuth**. For more information, refer to [How to use the new flows](/api-auth/intro#how-to-use-the-new-flows).
:::

Upon successful authentication the user's `credentials` will be returned, containing an `access_token`, an `id_token` and an `expires_in` value.

::: note
For more information on the `accessToken`, refer to [Access Token](/tokens/access-token).
:::
