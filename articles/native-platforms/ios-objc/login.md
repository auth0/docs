---
title: Auth0 iOS Objective-C SDK Tutorial
description: This tutorial will show you how to use the Auth0 iOS Objective-C SDK to add authentication and authorization to your mobile app.
---

## iOS Objective-C Tutorial

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* CocoaPods 0.39.0
* XCode 7.2.1
* Simulator - iOS 9.2 - iPhone 6
:::

<%= include('../_includes/_package', {
  pkgRepo: 'native-mobile-samples',
  pkgBranch: 'master',
  pkgPath: 'iOS/basic-sample',
  pkgFilePath: 'iOS/basic-sample/basic-sample/Info.plist',
  pkgType: 'replace'
}) %>

**Otherwise, if you already have an existing application, please follow the steps below.**

### Before Starting

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>a0${account.clientId}://\*.auth0.com/authorize</pre></code>
</div>

### 1. Adding the Auth0 dependencies

Add the following to the `Podfile` and run `pod install`:

${snippet(meta.snippets.dependencies)}

> If you need help installing CocoaPods, please check this [guide](http://guides.cocoapods.org/using/getting-started.html)

### 2. Configure Auth0 Lock for iOS

Add the following entries to your app's `Info.plist`:

<table class="table">
  <thead>
    <tr>
      <th>Key</th>
      <th>Value</th>
    </tr>
  </thead>
  <tr>
    <td>Auth0ClientId</td>
    <td>${account.clientId}</td>
  </tr>
  <tr>
    <td>Auth0Domain</td>
    <td>${account.namespace}</td>
  </tr>
</table>

Also you'll need to register a new _URL Type_ with the following scheme
`a0${account.clientId}`. You can do it from your app's target Info section.

![Url type register](https://cloudup.com/cwoiCwp7ZfA+)

The next step is to create and configure an instance of `A0Lock` with your Auth0 credentials from `Info.plist`. We are going to do this in a custom object called `MyApplication`.

${snippet(meta.snippets.setup)}

> You can create `A0Lock` in any other class, even in your AppDelegate, the only requirement is that you keep it in a **strong** reference.

### 3. Register Native Authentication Handlers

First in your AppDelegate method `application:didFinishLaunchingWithOptions:` add the following lines:

```objc
A0Lock *lock = [[MyApplication sharedInstance] lock];
[lock applicationLaunchedWithOptions:launchOptions];
```

Add the following import:

```objc
#import <Lock/Lock.h>
#import “MyApplication.h"
```

Then to allow native logins using other iOS apps, e.g: Twitter, Facebook, Safari etc, you need to add the following method:

```objc
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    A0Lock *lock = [[MyApplication sharedInstance] lock];
    return [lock handleURL:url sourceApplication:sourceApplication];
}
```

> If you need Facebook or Twitter native authentication please continue reading to learn how to configure them. Otherwise please go directly to __step #4__

Before reading how to configure either Facebook or Twitter integration, please check that you have enabled and correctly configured the social connection with your own credentials in the [Dashboard](${uiURL}/#/connections/social)

#### Facebook

Lock uses the native Facebook SDK to obtain the user's access token so you'll need to configure it using your Facebook App info:

First, add the following entries to the `Info.plist`:

<table class="table">
  <thead>
    <tr>
      <th>Key</th>
      <th>Value</th>
    </tr>
  </thead>
  <tr>
    <td>FacebookAppID</td>
    <td>YOUR_FACEBOOK_APP_ID</td>
  </tr>
  <tr>
    <td>FacebookDisplayName</td>
    <td>YOUR_FACEBOOK_DISPLAY_NAME</td>
  </tr>
</table>

Then, register a custom URL Type with the format `fb<FacebookAppID>`.

> For more information on how to configure this, please check [Facebook Getting Started Guide](https://developers.facebook.com/docs/ios/getting-started) and [Obtaining an App ID and App Secret for Facebook](/connections/social/facebook).

> **Note:** The Facebook app should be the same as the one set in Facebook's Connection settings on your Auth0 account

Here's an example of how the entries should look like:

![FB plist](https://cloudup.com/cYOWHbPp8K4+)

Then add the following key to the `Info.plist` inside the main `<dict>` key. To open this file in Source Code mode within Xcode, **Control-Click** (or right click) on it, select **Open As**, **Source Code**.

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
        <string>fbapi</string>
        <string>fb-messenger-api</string>
        <string>fbauth2</string>
        <string>fbshareextension</string>
</array>
```
> **Note:** these entries enable compatibility with iOS 9. You can get more information about this in Facebook's developer portal: [Preparing your apps for iOS 9](https://developers.facebook.com/docs/ios/ios9)

Then add Lock Facebook's Pod

```ruby
pod 'Lock-Facebook', '~> 2.0'
```

Add to the import:

```objc
#import <Lock-Facebook/A0FacebookAuthenticator.h>
```

And register it after initializing `A0Lock`:

```objc
A0FacebookAuthenticator *facebook = [A0FacebookAuthenticator newAuthenticatorWithDefaultPermissions];
[lock registerAuthenticators:@[facebook]];
```

#### Twitter

First add Lock Twitter's Pod

```ruby
pod 'Lock-Twitter', '~> 1.1'
```

Add to the import:

```objc
#import <Lock-Twitter/A0TwitterAuthenticator.h>
```

And configure Auth0 Twitter authenticator after you initialize `A0Lock`:

```objc
NSString *twitterApiKey = ... //Remember to obfuscate your api key
NSString *twitterApiSecret = ... //Remember to obfuscate your api secret
A0TwitterAuthenticator *twitter = [A0TwitterAuthenticator newAuthenticatorWithKey:twitterApiKey andSecret:twitterApiSecret];
[lock registerAuthenticators:@[twitter]];
```

> For more information on how to configure this, please check [Obtaining Consumer and Secret Keys for Twitter](/connections/social/twitter).

### 4. Let's implement the login

Now we're ready to implement the Login using Lock, you only need to instantiate and present it from any of your UIViewControllers like this:

${snippet(meta.snippets.use)}

[![Lock.png](/media/articles/native-platforms/ios-objc/Lock-Widget-Screenshot.png)](https://auth0.com)

> **Note**: There are multiple ways of implementing the login box. What you see above is the Login Widget, but if you want, you can use [your own UI](/libraries/lock-ios/use-your-own-ui).
> Or you can also try our passwordless Login Widgets: [SMS](/libraries/lock-ios#sms) or [TouchID](/libraries/lock-ios#touchid)

On successful authentication, `onAuthenticationBlock` will yield the user's profile and tokens.

> To learn how to save and manage the tokens and profile, please read [this guide](/libraries/lock-ios/save-and-refresh-jwt-tokens)

### 5. Showing user information

After the user has logged in, we can use the `profile` object which has all the user information:

```objc
  self.usernameLabel.text = profile.name;
  self.emailLabel.text = profile.email;
```

> You can [click here](/user-profile) to find out all of the available properties from the user's profile or you can check [A0UserProfile](https://github.com/auth0/Lock.iOS-OSX/blob/master/Lock/Core/A0UserProfile.h). Please note that some of this depend on the social provider being used.

### 6. We're done

You've implemented Login and Signup with Auth0 in iOS. You're awesome!.

> You can also <a href="/package/native-mobile-samples/master?path=iOS/profile-sample-swift&type=replace&filePath=iOS/profile-sample-swift/ProfileSample/Info.plist${account.clientParam}">download</a> our sample project that shows how to store/update your user profile with Auth0
