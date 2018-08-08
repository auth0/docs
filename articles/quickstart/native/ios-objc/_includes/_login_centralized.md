<%= include('../../_includes/_getting_started', { library: 'Objective-C') %>

Add your credentials in the `Auth0.plist` file. If the file does not exist in your project yet, create it:

```xml
<!-- Auth0.plist -->

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>ClientId</key>
  <string>${account.clientId}</string>
  <key>Domain</key>
  <string>${account.namespace}</string>
</dict>
</plist>
```

<%= include('../../../../_includes/_callback_url') %>

In your application's `Info.plist` file, register your iOS Bundle identifier as a custom scheme:

```xml
<!-- Info.plist -->

<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>None</string>
        <key>CFBundleURLName</key>
        <string>auth0</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
        </array>
    </dict>
</array>
```

::: note
If your `Info.plist` file is not in the format shown above, you can right-click `Info.plist` in Xcode and select **Open As** > **Source Code**.
:::

Go to your [Dashboard Settings](${manage_url}/#/applications/${account.clientId}/settings) and make sure that the **Allowed Callback URLs** field contains the following callback URL:

```text
{PRODUCT_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{PRODUCT_BUNDLE_IDENTIFIER}/callback
```

# Start the Authentication

[Universal Login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features.

::: note
You can also embed the login dialog directly in your application using the [Lock widget](/lock). If you use this method, some features, such as single sign-on, will not be accessible. 
To learn how to embed the Lock widget in your application, follow the [Embedded Login sample](https://github.com/auth0-samples/auth0-ios-objc-sample/tree/embedded-login/01-Embedded-Login).
:::

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/lock_centralized_login.png" alt="Universal Login"></div>

::: note
Read the [Browser-Based vs. Native Login Flows on Mobile Devices](/tutorials/browser-based-vs-native-experience-on-mobile) article to learn how to choose between the two types of login flows.
:::

<%= include('../../_includes/_ios_dependency_centralized') %>

<%= include('_hybrid_setup') %>

# Add the Callback

For Auth0 to handle the authentication callback, update your `AppDelegate` file. 

${snippet(meta.snippets.setup)}

Then, add the following `UIApplicationDelegate` method:

```swift
// AppDelegate.m

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    return [HybridAuth resume:url options:options];
}
```

::: note
To configure callback, you must configure your callback URL first. Read about the Callback URL in the [Configure Callback](/quickstart/native/ios-objc/getting-started#configure-callback-urls) step.
:::

## Implement Login

${snippet(meta.snippets.setup)}

Then, present the hosted login screen:

```objc
// HomeViewController.m

HybridAuth *auth = [[HybridAuth alloc] init];
[auth showLoginWithScope:@"openid" connection:nil callback:^(NSError * _Nullable error, A0Credentials * _Nullable credentials) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (error) {
            NSLog(@"Error: %@", error);
        } else if (credentials) {
          // Do something with credentials, such as save them.
          // Auth0 will dismiss itself automatically by default.
        }
    });
}];
```

After the user authenticates, their information is returned in a `credentials` object.

::: note
To learn more about the `credentials` object, read the [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift) article.
:::
