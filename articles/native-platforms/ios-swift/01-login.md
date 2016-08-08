---
title: Login
description: This tutorial will show you how to integrate Lock in your iOS Swift project in order to present a login screen.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* CocoaPods 1.0.0
* XCode 7.3 (7D175)
* iOS 9.3 (13E230)
  :::

<%= include('../../_includes/_github', { link: 'https://github.com/auth0-samples/auth0-ios-swift-sample/tree/master/01-Login', }) %>

### Before Starting

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>a0${account.clientId}://\*.auth0.com/authorize</pre></code>
</div>

### 1. Add the Lock dependency

Your first step is to add [Lock](https://github.com/auth0/Lock.iOS-OSX) into your project, which is basically a library for displaying native UI in your app for logging in and signing up with different social platforms via [auth0](https://auth0.com/).

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
use_frameworks!
pod 'Lock', '~> 1.24'
```

Then, run `pod install`.

> For further reference on Cocoapods, check [their official documentation](http://guides.cocoapods.org/using/getting-started.html).

### 2. Set your Credentials

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

```swift
import Lock
```

Then, configure and present the login screen, like this:

```swift
let controller = A0Lock.sharedLock().newLockViewController()
controller.closable = true
controller.onAuthenticationBlock = { profile, token in
    // Do something with token  profile. e.g.: save them.
    // Lock will not save these objects for you.

    // Don't forget to dismiss the Lock controller
    controller.dismissViewControllerAnimated(true, completion: nil)
}
A0Lock.sharedLock().presentLockController(controller, fromController: self)
```

[![Lock.png](/media/articles/native-platforms/ios-swift/Lock-Widget-Screenshot.png)](https://auth0.com)

> There are multiple ways of implementing the login dialog. What you see above is the default widget; however, if you want, you can use [your own UI](/libraries/lock-ios/use-your-own-ui).
> You can also try our passwordless Login Widgets: [SMS](/libraries/lock-ios#sms) or [TouchID](/libraries/lock-ios#touchid).

As you can see, upon successful authentication, the `onAuthenticationBlock` callback will yield the user's `profile` and `token`.

A basic example on how to use this information could be:

```swift
self.usernameLabel.text = profile.name
self.emailLabel.text = profile.email
MyApplication.sharedInstance.accessToken = token.accessToken
```

> For further reference on the `profile` and `token` objects, check the [A0UserProfile](https://github.com/auth0/Lock.iOS-OSX/blob/master/Pod/Classes/Core/A0UserProfile.h) and [A0Token](https://github.com/auth0/Lock.iOS-OSX/blob/master/Pod/Classes/Core/A0Token.h) classes' documentation.
>
> To learn how to save and manage the tokens and profile in detail, please read [this guide](/libraries/lock-ios/save-and-refresh-jwt-tokens). Notice that Lock on its own will not save these for you.



### Done!

You've already implemented Login and Sign Up with Auth0 in your iOS Swift project!



### Optional: Log In with Social Connections

In order to have a simple login mechanism through social connections, all you have to do is enable them in your account's [dashboard](${uiURL}/#/connections/social). Every social connection you switch on there, will appear in the Login screen of your app. That's pretty much it!
