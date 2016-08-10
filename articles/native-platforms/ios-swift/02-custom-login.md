---
title: Custom Login
description: This tutorial will teach you how to perform Login and Sign Up by using your own View Controllers, without using the Lock widget interface.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* CocoaPods 1.0.0
* XCode 7.3 (7D175)
* Simulator - iPhone 6 - iOS 9.3 (13E230)
  :::

<%= include('../../_includes/_package', {
  pkgRepo: 'native-mobile-samples',
  pkgBranch: 'master',
  pkgPath: 'iOS/basic-sample-swift',
  pkgFilePath: 'iOS/basic-sample-swift/SwiftSample/Info.plist',
  pkgType: 'replace'
}) %>

### Before Starting

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <b>Allowed Callback URLs</b> contains the following value:</p>

<pre><code>a0${account.clientId}://\*.auth0.com/authorize</pre></code>
</div>

### 1. Integrate the Auth0 Swift Toolkit

Your first step is to add [Auth0 Swift Toolkit](https://github.com/auth0/Auth0.swift) into your project, which is a library that contains helper functions that will allow you to perform basic authentication operations (such as login, sign up, or retrieve and update profiles) against the Auth0 APIs in a very easy manner.

#### i. Carthage

If you are using Carthage, add the following line to the `Cartfile`:

```ruby
github "auth0/Auth0.swift" "1.0.0-beta.3"
```

Then, run `carthage bootstrap`.

> For more information about Carthage usage, check [their official documentation](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos).

#### ii. Cocoapods

If you are using [Cocoapods](https://cocoapods.org/), add these lines to your `Podfile`:

```ruby
use_frameworks!
pod 'Auth0', '1.0.0-beta.3'
```

Then, run `pod install`.

> For further reference on Cocoapods, check [their official documentation](http://guides.cocoapods.org/using/getting-started.html).

### 2. Set your Credentials

Create a property list file named `Auth0.plist` in your project, and add the following entries into it:

<table class="table">
  <thead>
    <tr>
      <th>Key</th>
      <th>Value</th>
    </tr>
  </thead>
  <tr>
    <td>ClientId</td>
    <td>${account.clientId}</td>
  </tr>
  <tr>
    <td>Domain</td>
    <td>${account.namespace}</td>
  </tr>
</table>

### 3. Implement the Login

At this point, you're all set to implement an email/password Login.

First, import the `Auth0` module in the file where you want to present the login dialog:

```swift
import Auth0
```

Then, add the following code to perform a login:

```swift
Auth0
    .authentication()
    .login("email@foo.com",
        password: "123456",
        connection: "Username-Password-Authentication"
    )
    .start { result in
            switch result {
            case .Success(let credentials):
                // Logged in successfully
                // You've got a Credentials instance, which you'll use, for example, to retrieve the User Profile
            case .Failure(let error):
                // You've got an Authentication.Error case
                // Deal with it
            }
    }
```

That's it! You'll get either a `credentials` object or an `error` case after performing a login.

Basically, `credentials` contains token-related information; you will normally store this object for later use. On the other hand, `error` is an enum containing possible authentication error cases that you might want to keep track of.

> For further reference on the `credentials` and `error` objects, check the [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Authentication/Credentials.swift) and [Authentication](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Authentication/Authentication.swift) files documentation.

### Done!

You've already implemented your own Login!

### Optional I: Retrieve the User Profile

Once you've obtained a `Credentials` object, retrieving a user profile is quite simple. All you have to do is:

```swift
guard let idToken = credentials.idToken else { return }
Auth0
    .authentication()
    .tokenInfo(idToken)
    .start { result in
        switch result {
        case .Success(let profile):
            // You've got a UserProfile object
        case .Failure(let error):
            // You've got an Authentication.Error case
        }
}
```

A trivial example on how to use some profile info could be:

```swift
welcomeLabel.text = "Welcome, \(profile.name)!"
memberLabel.text = "You are member since \(profile.createdAt)"
```

> For further reference on the `profile` and `error` objects, check the [UserProfile](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Authentication/UserProfile.swift) and [Authentication](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Authentication/Authentication.swift) files documentation.

### Optional II: Implement a Sign Up

Including a register process in your app is also a piece of cake.

First, don't forget to import the toolkit module in your register form view controller:

```swift
import Auth0
```

Then, all you have to do is:

```swift
Auth0
    .authentication()
    .signUp("foo@email.com",
        password: "123456",
        connection: "Username-Password-Authentication"
    )
    .start { result in
            switch result {
            case .Success(let credentials):
            	// Registered successfully
            	// You've got a Credentials object
            case .Failure(let error):
                // You've got an Authentication.Error case
                // Deal with it
            }
        }
}
```

As you might have observed, this code looks almost exactly the same as the Login snippet presented before. The code skeleton remains the same, the only thing that changes here is the function that you call.
