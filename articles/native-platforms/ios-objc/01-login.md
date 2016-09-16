---
title: Auth0 iOS ObjectiveC Quickstarts - 1. Login
description: This tutorial will show you how to integrate Lock in your iOS ObjectiveC project in order to present a login screen.

---

## iOS ObjectiveC - Login Tutorial

This is the very beginning of a simple, practical, multi-step quickstart that will guide you through managing authentication in your iOS apps with Auth0.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* CocoaPods 1.0.0
* XCode 7.3 (7D175)
* Simulator - iPhone 6 - iOS 9.3 (13E230)
  :::

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-samples/auth0-ios-objc-sample',
  pkgBranch: 'master',
  pkgPath: '01-Login',
  pkgFilePath: '01-Login/Auth0Sample/Info.plist',
  pkgType: 'replace'
}) %>

**Otherwise, if you already have an existing application, please follow the steps below.**

### Before Starting

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>a0${account.clientId}://\*.auth0.com/authorize</pre></code>
</div>



### 1. Add the Auth0 Dependency

Your first step is to add [Lock](https://github.com/auth0/Lock.iOS-OSX) into your project. It is basically a library for displaying native UI in your app for logging in and signing up with different social platforms via [auth0](https://auth0.com/).

#### i. Carthage

If you are using Carthage, add the following line to the `Cartfile`:

```ruby
github "auth0/Lock.iOS-OSX" -> 1.26
```

Then, run `carthage bootstrap`.

> For more information about Carthage usage, check [their official documentation](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos).

#### ii. Cocoapods

If you are using [Cocoapods](https://cocoapods.org/), add these lines to your `Podfile`:

```ruby
pod 'Lock', '~> 1.24'
```

Then, run `pod install`.

> For further reference on Cocoapods, check [their official documentation](http://guides.cocoapods.org/using/getting-started.html).



### 2. Set Your Credentials

Add the following entries to your project's `Info.plist`:

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

### 3. Implement the Login

At this point, you're all set to implement the Login. 

First, import the `Lock` module in the file where you want to present the login dialog:

```objc
#import <Lock/Lock.h>
```

Then, configure and present the login screen, like this:

```objc
    A0Lock *lock = [A0Lock sharedLock];
    
    A0LockViewController *controller = [lock newLockViewController];
    controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
        // Do something with token & profile. e.g.: save them.
        // And dismiss the ViewController
        [self dismissViewControllerAnimated:YES completion:nil];
    };
    [self presentViewController:controller animated:YES completion:nil];

```

[![Lock.png](/media/articles/native-platforms/ios-objc/Lock-Widget-Screenshot.png)](https://auth0.com)

> **Note**: There are multiple ways of implementing the login box. What you see above is the Login Widget, but if you want, you can use [your own UI](/libraries/lock-ios/use-your-own-ui).
> Or, you can also try our passwordless Login Widgets: [SMS](/libraries/lock-ios#sms) or [TouchID](/libraries/lock-ios#touchid).

As you can see, upon successful authentication, the `onAuthenticationBlock` callback will yield the user's `profile` and `token`.

A basic example of how to use this information is:

```objc
self.usernameLabel.text = profile.name
self.emailLabel.text = profile.email
```

> For further reference on the `profile` object, check the [A0UserProfile](https://github.com/auth0/Lock.iOS-OSX/blob/master/Pod/Classes/Core/A0UserProfile.h) class documentation.
>
> To learn how to save and manage the tokens and profile in detail, please read [this guide](/libraries/lock-ios/save-and-refresh-jwt-tokens). Note that Lock on its own will not save these for you.

Done. You've implemented Login and SignUp with Auth0 in your iOS ObjectiveC project. You're awesome!

> You can also <a href="/package/native-mobile-samples/master?path=iOS/profile-sample-objc&type=replace&filePath=iOS/profile-sample-objc/ProfileSample/Info.plist${account.clientParam}">download</a> our sample project, which shows how to store/update your user profile with Auth0.

### Optional: Configure your Social Connections' Handlers

In order to have a simple login mechanism through social connections, all you have to do is enable them in your account's [dashboard](${uiURL}/#/connections/social). Every social connection you switch on there will appear in the Login screen of your app. That's pretty much it!
