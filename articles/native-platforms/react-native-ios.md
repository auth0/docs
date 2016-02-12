---
title: React Native iOS Tutorial
name: React Native - iOS
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
  dependencies: native-platforms/reactnative-ios/dependencies
  setup: native-platforms/reactnative-ios/setup
  use: native-platforms/reactnative-ios/use
---

## React Native iOS Tutorial

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* React Native 0.16.0
* CocoaPods 0.39.0
* NodeJS 4.2.4
:::

<%= include('../_includes/_package', {
  pkgRepo: 'Mobile-Samples.React',
  pkgBranch: 'master',
  pkgPath: 'Classic/Lock',
  pkgFilePath: 'Classic/Lock/auth0_credentials.js' + account.clientParam,
  pkgType: 'replace'
}) %>

**Otherwise, if you already have an existing React Native application, please follow the steps below.**

### Before Starting

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>a0${account.clientId}://\*.auth0.com/authorize</pre></code>
</div>

#### CocoaPods

You'll need CocoaPods in order to fetch **Lock** native libraries dependencies for you and link them to your project.

> Currently this is the **only** way to make `react-native-lock-ios` work since we don't provide a `.xcodeproj` file in the npm library.

To install CocoaPods just run the following command:

```bash
gem install cocoapods
```

> If you need help installing CocoaPods, please check this [guide](http://guides.cocoapods.org/using/getting-started.html)

### 1. Adding the Lock to your project

First you need to run the following command to install **react-native-lock-ios**

```bash
npm install --save react-native-lock-ios
```

Then open your app's `.xcodeproj` file with Xcode, e.g:

```bash
open <YourAppName>.xcodeproj
```

and make sure the react native project can be run in Xcode and remove all the subprojects under Libraries/ in Xcode. This is because React Native's iOS code will be pulled in via CocoaPods from your `node_modules` directory.

> Make sure you only **Remove Reference** instead of **Moving to Trash**, if you pick the later you'll have to re-install react-native with npm since it will move your previous installation to the Trash.

Then create a file name `Podfile` with the following content inside the folder `<project name>/ios`

${snippet(meta.snippets.dependencies)}

Now run from the same folder the command `pod install`. It will automatically download Lock for iOS with all it's dependencies, and create an Xcode workspace containing all of them.
From now on open *<YourAppName>*.xcworkspace instead of *<YourAppName>*.xcodeproject. This is because now React Native's iOS code (and Lock's) is now integrated to your project via CocoaPods instead of subprojects.

> If you are seeing some warnings after your running `pod install` or you get some linker error when building the Xcode project, please check the [FAQs section](#FAQs)

### 2. Register Native Authentication Handlers

To allow native logins using other iOS apps, e.g: Twitter, Facebook, Safari etc, you need to add the following methods to your `AppDelegate` class.

```objc
#import <LockReactNative/A0LockReact.h>

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

Then add Lock Facebook's Pod

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

First add Lock Twitter's Pod

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

### 3. Let's implement the login

Now we're ready to implement the Login. First we need to require react-native-lock-ios:

${snippet(meta.snippets.setup)}

Then we can show **Lock**:

${snippet(meta.snippets.use)}

[![Lock.png](/media/articles/native-platforms/reactnative-ios/Lock-Widget-Screenshot.png)](https://auth0.com)

> **Note**: There are multiple ways of implementing the login box. What you see above is the Login Widget, but you can try our passwordless Login Widgets: [SMS](https://github.com/auth0/react-native-lock-ios#sms-passwordless), [Email](https://github.com/auth0/react-native-lock-ios#email-passwordless) or [TouchID](https://github.com/auth0/react-native-lock-ios#touchid)

On successful authentication, the callback function will yield the user's profile and tokens inside the parameters `profile` and `token` respectively.

### 4. Showing user information

After the user has logged in, we can use the `profile` object which has all the user information (Let's assume the profile is stored in a component's state object):

```jsx
  <Text>Welcome {this.state.profile.name}</Text>
  <Text>Your email is: {this.state.profile.email}</Text>
```

> You can [click here](/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

### 5. We're done

You've implemented Authentication with Auth0 in iOS & React Native. You're awesome!

### FAQs

* When running `pod install`, I am getting a warning like `The 'YourAppName [Debug]' target overrides the 'OTHER_LDFLAGS' build setting ...`.
    This is because CocoaPods was not able to override some flags in order to correctly build your project and its native dependencies. To solve this, go to Xcode's target Build Setting section, find `Other Linker Flags` and replace it's value with `$(inherited)` for all Configurations.
