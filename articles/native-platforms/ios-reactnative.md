---
title: iOS React Native Tutorial
name: iOS - React Native
alias:
  - reactnative
  - react native
language:
  - Javascript
framework:
  - React Native
hybrid: true
image: /media/platforms/react.png
tags:
  - quickstart
snippets:
  dependencies: native-platforms/ios-reactnative/dependencies
  setup: native-platforms/ios-reactnative/setup
  use: native-platforms/ios-reactnative/use
---

## iOS React Native Tutorial

<%= include('../_includes/package', {
  pkgRepo: 'native-mobile-samples',
  pkgBranch: 'master',
  pkgPath: 'iOS/basic-sample-reactnative',
  pkgFilePath: 'iOS/basic-sample-reactnative/iOS/Info.plist' + account.clientParam,
  pkgType: 'replace'
}) %>

**Otherwise, if you already have an existing React Native application, please follow the steps below.**

### Before Starting

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>a0${account.clientId}://\*.auth0.com/authorize</pre></code>
</div>

### 1. Adding the Auth0 dependencies

Inside your project create a file named `Podfile` with these contents:

${snippet(meta.snippets.dependencies)}

and run `pod install`

> If you need help installing CocoaPods, please check this [guide](http://guides.cocoapods.org/using/getting-started.html)

### 2. Configuring Auth0 Credentials & Callbacks

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

### 3. Register Native Authentication Handlers

To allow native logins using other iOS apps, e.g: Twitter, Facebook, Safari etc, you need to add the following method to your `AppDelegate.m` file.

```objc
#import <LockReact/A0LockReact.h>

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    return [[A0LockReact sharedInstance].lock handleURL:url sourceApplication:sourceApplication];
}
```

Also add Lock configuration to the beginning of application:didFinishLaunchingWithOptions method:

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [[A0LockReact sharedInstance].lock registerAuthenticators:@[twitter]];
    //...
}
```

> If you need Facebook or Twitter native authentication please continue reading to learn how to configure them. Otherwise please go directly to the __step #4__

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

> For more information on how to configure this, please check [Facebook Getting Started Guide](https://developers.facebook.com/docs/ios/getting-started).

> **Note:** The Facebook app should be the same as the one set in Facebook's Connection settings on your Auth0 account

Here's an example of how the entries should look like:

![FB plist](https://cloudup.com/cYOWHbPp8K4+)

Then add Lock Facebook's Pod

```ruby
pod 'Lock-Facebook', '~> 2.1'
```

Finally, you need to register Auth0 Facebook authenticator somewhere in your application. You can do that in the `AppDelegate.m` file, for example:

```objc
#import <Lock-Facebook/A0FacebookAuthenticator.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    A0FacebookAuthenticator *facebook = [A0FacebookAuthenticator newAuthenticatorWithDefaultPermissions];
    [[A0LockReact sharedInstance].lock registerAuthenticators:@[facebook]];
}
```

#### Twitter

First add Lock Twitter's Pod

```ruby
pod 'Lock-Twitter', '~> 1.0'
```

To support Twitter native authentication you need to configure Auth0 Twitter authenticator:

```objc
#import <Lock-Twitter/A0TwitterAuthenticator.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  NSString *twitterApiKey = ... //Remember to obfuscate your api key
    NSString *twitterApiSecret = ... //Remember to obfuscate your api secret
    A0TwitterAuthenticator *twitter = [A0TwitterAuthenticator newAuthenticatorWithKey:twitterApiKey andSecret:twitterApiSecret];
    [[A0LockReact sharedInstance].lock registerAuthenticators:@[twitter]];
}
```

### 4. Add Native Module for Lock to your project

Create an Objective-C class (LockReactModule in this case) that will allow your JS code to call Lock.

[![Create Class Xcode](/media/articles/native-platforms/ios-reactnative/CreateNativeModuleClass.gif)](https://auth0.com)

`LockReactModule.h`

```objc
// LockReactModule.h file
#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@interface LockReactModule : NSObject<RCTBridgeModule>

@end
```

`LockReactModule.m`

```objc
#import "LockReactModule.h"
#import <LockReact/A0LockReact.h>

@implementation LockReactModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(show:(NSDictionary *)options callback:(RCTResponseSenderBlock)callback) {
  dispatch_async(dispatch_get_main_queue(), ^{
    A0LockReact *lock = [A0LockReact sharedInstance];
    [lock showWithOptions:options callback:callback];
  });
}

RCT_EXPORT_METHOD(showSMS:(NSDictionary *)options callback:(RCTResponseSenderBlock)callback) {
  dispatch_async(dispatch_get_main_queue(), ^{
    A0LockReact *lock = [A0LockReact sharedInstance];
    [lock showSMSWithOptions:options callback:callback];
  });
}

RCT_EXPORT_METHOD(showTouchID:(NSDictionary *)options callback:(RCTResponseSenderBlock)callback) {
  dispatch_async(dispatch_get_main_queue(), ^{
    A0LockReact *lock = [A0LockReact sharedInstance];
    [lock showTouchIDWithOptions:options callback:callback];
  });
}

@end
```

> You can also download [LockReactModule.h](https://raw.githubusercontent.com/auth0/native-mobile-samples/master/iOS/basic-sample-reactnative/iOS/LockReactModule.h) and [LockReactModule.m](https://raw.githubusercontent.com/auth0/native-mobile-samples/master/iOS/basic-sample-reactnative/iOS/LockReactModule.m) and add them to your Xcode project.

### 5. Let's implement the login

Now we're ready to implement the Login. First we need to require the native module we've just created:

${snippet(meta.snippets.setup)}

Then we can show _Lock_:

${snippet(meta.snippets.use)}

[![Lock.png](/media/articles/native-platforms/ios-reactnative/Lock-Widget-Screenshot.png)](https://auth0.com)

> **Note**: There are multiple ways of implementing the login box. What you see above is the Login Widget, but you can try our passwordless Login Widgets: [SMS](https://github.com/auth0/Lock.ReactNative#sms) or [TouchID](https://github.com/auth0/Lock.ReactNative#touchid)

On successful authentication, the callback function will yield the user's profile and tokens inside the parameters `profile` and `token` respectively.

### 5. Showing user information

After the user has logged in, we can use the `profile` object which has all the user information (Let's assume the profile is stored in a component's state object):

```js
  <Text>Welcome {this.state.profile.name}</Text>
  <Text>Your email is: {this.state.profile.email}</Text>
```

> You can [click here](/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

### 6. We're done

You've implemented Authentication with Auth0 in iOS & React Native. You're awesome!
