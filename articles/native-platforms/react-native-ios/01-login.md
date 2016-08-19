---
title: Login
description: This tutorial will show you how to use the Auth0 React Native iOS SDK to add authentication and authorization to your mobile app.
---

<%= include('../../_includes/_package', {
  pkgRepo: 'Mobile-Samples.React',
  pkgBranch: 'master',
  pkgPath: 'Classic/Lock',
  pkgFilePath: 'Classic/Lock/auth0-credentials.js',
  pkgType: 'replace'
}) %>


::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* React Native 0.26.0
* CocoaPods 1.0.0
* NodeJS 4.3
:::

<%= include('../../_includes/_signup') %>

**Otherwise, if you already have an existing React Native application, please follow the steps below.**

#### CocoaPods

You'll need CocoaPods in order to fetch **Lock** native libraries dependencies for you and link them to your project.

To install CocoaPods just run the following command:

```bash
gem install cocoapods
```

> If you need help installing CocoaPods, please check this [guide](http://guides.cocoapods.org/using/getting-started.html)

### 1. Adding Lock to your project

First you need to run the following command to install **react-native-lock**

```bash
npm install --save react-native-lock
```

Then install [rnpm](https://github.com/rnpm/rnpm)

```bash
npm install rnpm -g
```

After that, link **react-native-lock** with your iOS project:

```bash
rnpm link react-native-lock
```

If you get the following warning.

```
!] The `<YourAppName> [Debug]` target overrides the `OTHER_LDFLAGS` build setting defined in `Pods/Target Support Files/Pods/Pods.debug.xcconfig'. This can lead to problems with the CocoaPods installation
    - Use the `$(inherited)` flag, or
    - Remove the build settings from the target.

[!] The `<YourAppName> [Release]` target overrides the `OTHER_LDFLAGS` build setting defined in `Pods/Target Support Files/Pods/Pods.release.xcconfig'. This can lead to problems with the CocoaPods installation
    - Use the `$(inherited)` flag, or
    - Remove the build settings from the target.
```

Click `<YourAppName>.xcodeproj` in the project navigator and go the `Build Settings` tab. Make sure 'All' is toggled on (instead of 'Basic'). Look for `Other Linker Flags` and add the value `$(inherited)` for **all** configurations .

Another error you might have while trying to run the project, if you are using a `react-native` version `>=0.26.0`

```
"std::terminate()", referenced from:
        ___clang_call_terminate in libReact.a(RCTJSCExecutor.o)
```

To solve it, click `<YourAppName>.xcodeproj` in the project navigator and go the `Build Settings` tab. Make sure 'All' is toggled on (instead of 'Basic'). Look for `Other Linker Flags` and add the flag `-lc++` for **all** configurations .

### 2. Let's implement the login

Now we're ready to implement the Login. First we need to require react-native-lock-ios:

${snippet(meta.snippets.setup)}

Then we can show **Lock**:

${snippet(meta.snippets.use)}

[![Lock.png](/media/articles/native-platforms/reactnative-ios/Lock-Widget-Screenshot.png)](https://auth0.com)

> **Note**: There are multiple ways of implementing the login box. What you see above is the Login Widget, but you can try our passwordless Login Widgets: [SMS](https://github.com/auth0/react-native-lock-ios#sms-passwordless), [Email](https://github.com/auth0/react-native-lock-ios#email-passwordless) or [TouchID](https://github.com/auth0/react-native-lock#touchid-ios-only)

On successful authentication, the callback function will yield the user's profile and tokens inside the parameters `profile` and `token` respectively.

### 3. Showing user information

After the user has logged in, we can use the `profile` object which has all the user information (Let's assume the profile is stored in a component's state object):

```jsx
  <Text>Welcome {this.state.profile.name}</Text>
  <Text>Your email is: {this.state.profile.email}</Text>
```

> You can [click here](/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

### Optional: Twitter & Facebook Native Login

To allow native logins using other iOS apps, e.g: Twitter, Facebook, Safari etc, you need to add the following methods to your `AppDelegate` class.

```objc
#import "A0LockReact.h"

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  return [[[A0LockReact sharedInstance] lock] handleURL:url sourceApplication:sourceApplication];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler {
  return [[[A0LockReact sharedInstance] lock] continueUserActivity:userActivity restorationHandler:restorationHandler];
}
```

And then inside the method `application:didFinishLaunchingWithOptions` the following line

```objc
  [[[A0LockReact sharedInstance] lock] applicationLaunchedWithOptions:launchOptions];
```

> If you need Facebook or Twitter native authentication please continue reading to learn how to configure them. Otherwise please go directly to the __step #3__

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

If you need have iOS 9 support for your app, then make sure to add the `LSApplicationQueriesSchemes` key to your Info.plist file and add the `fbauth2` value to it.

Here's how the entries for `LSApplicationQueriesSchemes` should look like:

![FB LSApplicationQueriesSchemes](https://i.stack.imgur.com/YkwEp.png)

Then add Lock Facebook's Pod in `ios/Podfile` file and run `pod install --project-directory=ios`

```ruby
pod 'Lock-Facebook', '~> 2.2'
```

Finally, you need to register Auth0 Facebook integration when creating `Auth0Lock` :

```js
var lock = new Auth0Lock({
  //Other Lock config options
  integrations: {
    facebook: {}
  }
});
```

If you need to use other permissions besides the default:

```js
var lock = new Auth0Lock({
  //Other Lock config options
  integrations: {
    facebook: {
      permissions: "public_profile"
    }
  }
});
```

#### Twitter

First add Lock Twitter's Pod in `ios/Podfile` file and run `pod install --project-directory=ios`

```ruby
pod 'Lock-Twitter', '~> 1.1'
```

Finally, you need to register Auth0 Twitter integration when creating `Auth0Lock` :

```js
var lock = new Auth0Lock({
  //Other Lock config options
  integrations: {
    twitter: {
      api_key: "YOUR TWITTER API KEY",
      api_secret: "YOUR TWITTER API SECRET"
    }
  }
});
```
