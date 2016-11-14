---
title: Session Handling
description: This tutorial will show you how to handle sessions in your app, with the aim of preventing the user from being asked for credentials each time the app is launched.
budicon: 280
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-sample',
  path: '03-Session-Handling'
}) %>


## Before Starting

This tutorial assumes you're using the Lock library for handling login. Make sure you've integrated this library into your project and you're familiar with it. **If you're not sure, check out [this tutorial](01-login) first.**

### Add the SimpleKeychain Dependency

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

## On Login: Store the user's idToken

> The `idToken` is a string representing, basically, the user's [JWT token](https://en.wikipedia.org/wiki/JSON_Web_Token).

We will store this `idToken` **upon a successful login**, in order to prevent the user from being asked for login credentials again every time the app is re-launched.

Once the user has logged in, you get both an `A0Profile` and an `A0Token` object, as follows:

```swift
let controller = A0Lock.sharedLock().newLockViewController()
controller.onAuthenticationBlock = { maybeProfile, maybeToken in
    // do something with profile and token
}
```

> Even though `profile` and `token` come as optional values, the [A0LockViewController](https://github.com/auth0/Lock.iOS-OSX/blob/master/Lock/UI/A0LockViewController.h) documentation guarantees that both of them will only be `nil` if login is disabled after sign up. We assume that's not the case here; therefore, we will perform force-unwrap to get their values.

We need to store the `id_token` string value, which is inside the `A0Token` instance that comes in `maybeToken`. To do so, we'll use an `A0SimpleKeychain` instance:

```swift
guard let token = maybeToken else { return }
let keychain = A0SimpleKeychain(service: "Auth0")
keychain.setString(token.idToken, forKey: "id_token")
```

As you can see, `A0SimpleKeychain` can be seen simply as a key-value storage.

> You can also verify whether a JWT token is valid or not by decoding it locally, to check its expiration. For further reference, you can check out this [JWT decoder for Swift](https://github.com/auth0/JWTDecode.swift).

## On Startup: Check idToken existence

The main purpose of storing this token is to save the user from having to re-enter login credentials upon relaunch of the app. So, **once the app has launched**, we need to check for the existence of an `idToken` to see if we can automatically log the user in and redirect the user straight into the app's main flow, skipping any login screen.

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

## Validate an existent idToken

Then, if such a token exists, we need to check whether it's still valid, has expired, or is no longer valid for some other reason, such as being revoked. To do so, we'll use `A0Lock` to fetch the user profile based on the current `idToken` we've got:

```swift
guard let idToken = keychain.stringForKey("id_token") else {
    // Present A0Lock Login
    return
}
// Validate idToken
let client = A0Lock.sharedLock().apiClient()
client.fetchUserProfileWithIdToken(idToken,
        success: { profile in
            // Our idToken is still valid...
            // We store the fetched user profile
            keychain.setData(NSKeyedArchiver.archivedDataWithRootObject(profile), forKey: "profile")
            // ✅ At this point, you can log the user into your app, by navigating to the corresponding screen
        },
        failure: { error in
            // ⚠️ idToken has expired or is no longer valid
            // See step 4
        })
```

## Deal with a non-valid idToken

How to deal with a non-valid idToken is up to you. You will normally choose between two scenarios: Either you ask users to re-enter theirs credentials, or you [use the refresh token to get a new valid idToken again](/refresh-token).

If you aim for the former scenario, make sure you clear all the keychain stored values by doing:

```swift
A0SimpleKeychain(service: "Auth0").clearAll()
```

However, in this tutorial, we'll focus on the latter scenario, where we still want to log users in without asking for their credentials again.

In this case, we're going to leverage the `refreshToken`. The refresh token is another token string contained within the `A0Token` object that comes upon a successful login, which doesn't expire, and whose main purpose is retrieving new valid `idToken`s in spite of their having expired.

>It's recommended that you read and understand the [refresh token documentation](/refresh-token) before proceeding. **You got to keep on mind, for example, that, even though the refresh token cannot expire, it can be revoked.**

#### i. Store the refreshToken

Besides storing the `idToken`, we need to store the `refreshToken`. To do so, you can, upon login:

```swift
guard
    let token = maybeToken,
    let refreshToken = token.refreshToken
    else { return }
let keychain = A0SimpleKeychain(service: "Auth0")
keychain.setString(token.idToken, forKey: "id_token")
keychain.setString(refreshToken, forKey: "refresh_token") // Add this line
```

> The `refreshToken` can be `nil` if `offline_access` is not sent in the `scope` parameter during authentication.

#### ii. Use the refreshToken to get a new idToken

We've used the `fetchNewIdTokenWithIdToken` function from `A0Lock.sharedLock().apiClient()` to get a new `idToken` based on a current valid `idToken`. What we're going to do now is pretty similar, but we'll use the `fetchNewIdTokenWithRefreshToken` function instead.

```swift
// ⚠️ idToken has expired or is no longer valid
let keychain = A0SimpleKeychain(service: "Auth0")
guard let refreshToken = keychain.stringForKey("refresh_token") else {
    keychain.clearAll()
    return
}
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

## On Logout: Clear the Keychain

Whenever you need to log the user out, you just have to clear the keychain:

```swift
let keychain = A0SimpleKeychain(service: "Auth0")
keychain.clearAll()
```

### Optional: Encapsulate session handling

As you have probably realized by now, session handling is not a straightforward process. All this token-related information and processes can be encapsulated into a class that separates its logic from the View Controller layer. We recommend that you download the sample project from this tutorial and take a look at its implementation, focusing on the `SessionManager` class, which is in charge of dealing with these processes, and at the `Session` struct, which is a structure used for holding basic user profile data and tokens.
