---
title: Session Handling
description: This tutorial will show you how to handle sessions in your app, with the aim of preventing the user from being asked for credentials each time the app is launched.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* CocoaPods 1.0.0
* XCode 7.3 (7D175)
* Simulator - iPhone 6 - iOS 9.3 (13E230)
  :::

<%= include('../_includes/_package', {
  pkgRepo: 'native-mobile-samples',
  pkgBranch: 'master',
  pkgPath: 'iOS/basic-sample-swift',
  pkgFilePath: 'iOS/basic-sample-swift/SwiftSample/Info.plist',
  pkgType: 'replace'
}) %>

### Before Starting

#### i. Be familiar with Lock Login

This tutorial assumes you're using the Lock library for handling login. Make sure you've integrated this library into your project and you're familiar with it. **If you're not sure, check out [this tutorial](01-login.md) first.**

#### ii. Add the SimpleKeychain dependency

We're going to use the [SimpleKeychain](https://github.com/auth0/SimpleKeychain) library to help us manage user credentials. Make sure you integrate it before proceeding.

##### a. Carthage

If you are using Carthage, add the following line to the `Cartfile`:

```ruby
github "auth0/SimpleKeychain"
```

Then, run `carthage bootstrap`.

> For more information about Carthage usage, check [their official documentation](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos).

##### b. Cocoapods

If you are using [Cocoapods](https://cocoapods.org/), add these lines to your `Podfile`:

```ruby
use_frameworks!
pod 'SimpleKeychain', '~> 0.7'
```

Then, run `pod install`.

> For further reference on Cocoapods, check [their official documentation](http://guides.cocoapods.org/using/getting-started.html).

### 1. On Login: Store the user's idToken

> The `idToken` is a string representing, basically, the user's [JWT token](https://en.wikipedia.org/wiki/JSON_Web_Token).

We will store this `idToken` **upon a successful login**, in order to prevent the user from being asked for login credentials again whenever he re-launches the app.

Once the user has logged in, you get both an `A0Profile` and an `A0Token` object, coming as follows:

```swift
let controller = A0Lock.sharedLock().newLockViewController()
controller.onAuthenticationBlock = { profile, token in
	// do something with profile and token
}
```

> Even though `profile` and `token` come as optional values, the [A0LockViewController](https://github.com/auth0/Lock.iOS-OSX/blob/master/Lock/UI/A0LockViewController.h) documentation guarantees that both of them will only be `nil` iff login is disabled after sign up. We assume that's not our case; therefore, we will perform force-unwrap to get their values.

We need to store the `id_token` string value, which is inside the `token` object. To do so, we'll use an `A0SimpleKeychain` instance:

```swift
let keychain = A0SimpleKeychain(service: "Auth0")
keychain.setString(token!.idToken, forKey: "id_token")
```

As you can see, `A0SimpleKeychain` can be seen as simple as a key-value storage.

### 2. On Startup: Check idToken existence

The main purpose of storing this token was preventing the user from having to re-enter his credentials upon app's relaunch. So, **once the app has launched**, we need to check the existence of an `idToken` and see if we can automatically log the user in and redirect him straight into the app's main flow, skipping any login screen.

To do so, first, we retrieve its value from the `id_token` key we used above, from the keychain:

```swift
let keychain = A0SimpleKeychain(service: "Auth0")
guard let idToken = keychain.stringForKey("id_token") else {
    // idToken doesn't exist, user has to enter his credentials to log in
    // Present A0Lock Login
	return
}
// idToken exists
// We still need to validate it (see step 3)
```

### 3. Validate an existent idToken

Then, if such a token exists, we need to check whether it's still valid or has expired or is no longer valid for some other reason, such as being revoked. To do so, we'll use `A0Lock` to fetch a new `idToken` based on the current `idToken` we've got:

```swift
guard let idToken = keychain.stringForKey("id_token") else {
    // Present A0Lock Login
    return
}
// Validate idToken
let client = A0Lock.sharedLock().apiClient()
client.fetchNewIdTokenWithIdToken(idToken, 
        parameters: nil, 
        success: { newToken in
            // Our idToken was still valid...
            // Anyway, we'll store the new requested token, which is fresher:
            keychain.setString(newToken.idToken, forKey: "id_token")
            // ✅ At this point, you can log the user into your app, by navigating to the corresponding screen
        }, 
        failure: { error in
            // ⚠️ idToken has expired or is no longer valid
            // See step 4
        })
```

### 4. Deal with a non-valid idToken

How to deal with a non-valid idToken is up to you. You will normally choose between two scenarios: Either you ask the user to re-enter his credentials, or you [use the refresh token to get a new valid idToken again](https://auth0.com/docs/refresh-token).

If you aim for the former scenario, make sure you clear all the keychain stored values by doing:

```swift
A0SimpleKeychain(service: "Auth0").clearAll()
```

However, in this tutorial, we'll focus on the latter scenario, where we still do want to log the user in without asking him for credentials again.

In this case, we're going to leverage the `refreshToken`. The refresh token is another token string contained within the `A0Token` object that comes upon a successful login, which doesn't expire, and whose main purpose is retrieving new valid `idToken`s in spite of them having expired.

>It's recommendable that you read and understand the [refresh token documentation](https://auth0.com/docs/refresh-token) before proceeding. **You got to keep on mind, for example, that, even though the refresh token cannot expire, it can be revoked.**

#### i. Store the refreshToken 

Besides storing the `idToken`, we need to store the `refreshToken`. To do so, you can, upon login:

```swift
let keychain = A0SimpleKeychain(service: "Auth0")
keychain.setString(token!.idToken, forKey: "id_token")
keychain.setString(token!.refreshToken, forKey: "refresh_token") // Add this line
```

#### ii. Use the refreshToken to get a new idToken

We've used the `fetchNewIdTokenWithIdToken` function from `A0Lock.sharedLock().apiClient()` to get a new `idToken` based on a current valid `idToken`. What we're going to do now is pretty similar, but we'll use the `fetchNewIdTokenWithRefreshToken` function instead.

```swift
// ⚠️ idToken has expired or is no longer valid
let keychain = A0SimpleKeychain(service: "Auth0")
let refreshToken = keychain.stringForKey("refresh_token")!
let client = A0Lock.sharedLock().apiClient()
client.fetchNewIdTokenWithRefreshToken(refreshToken,
        parameters: nil,
        success: { newToken in
            // Just got a new idToken!
            // Don't forget to store it...
            keychain.setString(newToken.idToken, forKey: "id_token")
            // ✅ At this point, you can log the user into your app, by navigating to the corresponding screen
        },
        failure: { error in
            // refreshToken is no longer valid (e.g. it has been revoked)
            // Cleaning stored values since they are no longer valid
            keychain.clearAll()
            // ⛔️ At this point, you should ask the user to enter his credentials again!
        })
```

That's it! You've already dealt with the basic concepts of session handling in your app.

### 5. On Logout: Clear the Keychain

Whenever you need to log the user out, you just have to clear the keychain:

```swift
let keychain = A0SimpleKeychain(service: "Auth0")
keychain.clearAll()
```

### Optional: Encapsulate session handling

As you could have realized, session handling is not a straightforward process. All this token-related information and processes can be encapsulated into a class that separates its logic from the View Controller layer. We recommend you to download the sample project for this tutorial and take a look at its implementation, mainly at the `SessionManager` class, which is in charge of dealing with these processes, and at the `Session` struct, which is a structure used for holding basic user profile data and tokens.