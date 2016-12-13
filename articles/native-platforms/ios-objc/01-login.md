---
title: iOS Objective-C
default: true
description: This tutorial demonstrates how to use the Auth0 iOS Objective-C SDK to add authentication and authorization to your mobile app
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-objc-sample',
  path: '01-Login',
  requirements: [
    'CocoaPods 0.39.0',
    'XCode 7.2.1',
    'Simulator - iOS 9.2 - iPhone 6'
  ]
}) %>

## Initial Setup

Go to the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) section of your app in the Auth0 dashboard and make sure that **Allowed Callback URLs** contains the following value:

`a0${account.clientId}://\*.auth0.com/authorize`

## Add the Auth0 Dependencies

Add the following to the `Podfile` and run `pod install`:

${snippet(meta.snippets.dependencies)}

**NOTE:** If you need help installing CocoaPods, see: [What is CocoaPods](http://guides.cocoapods.org/using/getting-started.html).

## Configure Auth0 Lock for iOS

1. Add the following entries to your app's `Info.plist`:

| Key | Value |
| --- | --- |
| Auth0ClientId | `${account.clientId}` |
| Auth0Domain | `${account.namespace}` |


2. Register a new _URL Type_ in  your app's **Targets** info section with the following scheme:
`a0${account.clientId}`

    ![Lock.png](/media/articles/native-platforms/ios-objc/url-type-register.png)

3. Create and configure an instance of `A0Lock` with your Auth0 credentials from `Info.plist`. This sample uses a custom object called `MyApplication`:

${snippet(meta.snippets.setup)}

**NOTE:** You can create `A0Lock` in any other class, even in your `AppDelegate`, the only requirement is that you keep it in a **strong** reference.

## Register Native Authentication Handlers

1. In your `AppDelegate` method `application:didFinishLaunchingWithOptions:`, add the following lines:

```objc
A0Lock *lock = [[MyApplication sharedInstance] lock];
[lock applicationLaunchedWithOptions:launchOptions];
```

2. Add the following import:

```objc
#import <Lock/Lock.h>
#import “MyApplication.h"
```

3. To allow native logins using other iOS apps (e.g: Twitter, Facebook, Safari etc.), add the following method:

```objc
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    A0Lock *lock = [[MyApplication sharedInstance] lock];
    return [lock handleURL:url sourceApplication:sourceApplication];
}
```

**NOTE:** If you need Facebook or Twitter native authentication, continue reading to learn how to configure these. Otherwise, skip to [Implement the login](#implement-the-login).

::: panel-info Configuration
Before continuing to configure either Facebook or Twitter integration, check that you have enabled and correctly configured the social connection with your credentials in the [Dashboard](${manage_url}/#/connections/social).
:::


### Facebook

Lock uses the native Facebook SDK to obtain the user's access token. Use the information from your app that is configured for Facebook connections in the Auth0 dashboard:

1. Add the following entries to the `Info.plist`:

  | Key | Value |
| --- | --- |
| FacebookAppID | `YOUR_FACEBOOK_APP_ID` |
| FacebookDisplayName | `YOUR_FACEBOOK_DISPLAY_NAME` |


2. Register a custom URL Type with the format `fb<FacebookAppID>`.

**NOTE:** For more information on how to configure your app for Facebook, see: [Facebook Getting Started Guide](https://developers.facebook.com/docs/ios/getting-started) and [Connect your app to Facebook](/connections/social/facebook).

Here is an example of how the entries should look:

![FB plist](/media/articles/native-platforms/ios-objc/fb-plist.png)

3. Add the following key to the `Info.plist` inside the main `<dict>` key. To open this file in Source Code mode within Xcode, **Control-Click** (or right click) on it, and select **Open As > Source Code**.

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
        <string>fbapi</string>
        <string>fb-messenger-api</string>
        <string>fbauth2</string>
        <string>fbshareextension</string>
</array>
```
**NOTE:** These entries enable compatibility with iOS 9. You can get more information about this on Facebook's developer portal at: [Preparing your apps for iOS 9](https://developers.facebook.com/docs/ios/ios9).

4. Add Lock Facebook's Pod:

`pod 'Lock-Facebook', '~> 2.0'`

5. Add to the import:

`#import <Lock-Facebook/A0FacebookAuthenticator.h>`

6. Register it after initializing `A0Lock`:

```objc
A0FacebookAuthenticator *facebook = [A0FacebookAuthenticator newAuthenticatorWithDefaultPermissions];
[lock registerAuthenticators:@[facebook]];
```

### Twitter

1. Add Lock Twitter's Pod

`pod 'Lock-Twitter', '~> 2.0'`

2. Add to the import:

`#import <Lock-Twitter/A0TwitterAuthenticator.h>`

3. Configure Auth0 Twitter authenticator after you initialize `A0Lock`:

```objc
NSString *twitterApiKey = ...
A0TwitterAuthenticator *twitter = [A0TwitterAuthenticator newAuthenticationWithConsumerKey:twitterApiKey];

// ...

let twitterApiKey = ... //Remember to obfuscate your api key
let twitter = A0TwitterAuthenticator.newAuthentication(withConsumerKey: twitterApiKey)
```

Register the `A0TwitterAuthenticator` instance with your `A0Lock` instance if native integration is available. Lock-Twitter does not default to an OAuth flow, so a check should be made to determine if native authentication is available. If it is, the integration can be registered.

```objc
A0Lock *lock = ... // Get your instance of A0Lock
if ([A0TwitterAuthenticator canUseNativeTwitterAuthentication]) {
    [lock registerAuthenticators:@[twitter]];
}

// ...

let lock = ... //Get your instance of A0Lock
if A0TwitterAuthenticator.canUseNativeTwitterAuthentication() {
    lock.registerAuthenticators([twitter])
}
```

**NOTE:** For more information on configuring your app for Twitter, see: [Connect your app to Twitter](/connections/social/twitter).

## Implement the login

Now you are ready to implement the Login using Lock. You only need to instantiate and present it from any of your `UIViewControllers`, like this:

${snippet(meta.snippets.use)}

![Lock.png](/media/articles/native-platforms/ios-objc/Lock-Widget-Screenshot.png)

::: panel-info Login UI Options
There are multiple ways of implementing the login box. What you see above is the Login Widget. You can also [Build your own UI](/libraries/lock-ios/use-your-own-ui), or implement one of the passwordless Login Widgets: [SMS](/libraries/lock-ios#sms) or [TouchID](/libraries/lock-ios#touchid).
:::

On successful authentication, `onAuthenticationBlock` will yield the user's profile and tokens.

**NOTE:** To learn how to save and manage the tokens and profile, see: [Lock iOS: Saving and Refreshing JWT Tokens](/libraries/lock-ios/save-and-refresh-jwt-tokens).

## 5. Showing user information

After the user has logged in, you can use the `profile` object which contains all the user information:

```objc
  self.usernameLabel.text = profile.name;
  self.emailLabel.text = profile.email;
```

## Additional Information

See [User Profile](/user-profile) to find out all of the available properties of the user profile.

Also see: [A0UserProfile](https://github.com/auth0/Lock.iOS-OSX/blob/master/Lock/Core/A0UserProfile.h).

You can also download a [sample project](/package/native-mobile-samples/master?path=iOS/profile-sample-swift&file_path=iOS/profile-sample-swift/ProfileSample/Info.plist&type=replace&client_id=${account.clientId}) that shows how to store/update your user profile with Auth0.
