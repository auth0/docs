---
title: User Sessions
description: This tutorial will show you how to handle user sessions and retrieve the user's profile.
budicon: 280
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-sample',
  path: '03-User-Sessions',
  requirements: [
    'CocoaPods 1.1.1',
    'Version 8.2 (8C38)',
    'iPhone 6 - iOS 10.2 (14C89)'
  ]
}) %>


## Before Starting

This tutorial assumes you're using the Lock library for handling login. Make sure you've integrated this library into your project and you're familiar with it. **If you're not sure, review the [Login Tutorial](/quickstart/native/ios-swift/01-login) first.**

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

## On Login: Store the user's accessToken

> The `accessToken` is a string representing, basically, the user's [JWT token](https://en.wikipedia.org/wiki/JSON_Web_Token).

We will store this `accessToken` **upon a successful login**, in order to prevent the user from being asked for login credentials again every time the app is re-launched.

Once the user has logged in, you get a `Credentials` object, as follows:

```swift
Lock
    .classic()
    .onAuth { credentials in
        // Let's save our credentials.accessToken value
    }
    .present(from: self)
```

We want to store the `access_token` string value, which is inside the `Credentials` instance that comes in `credentials`. To do so, we'll use an `A0SimpleKeychain` instance:

```swift
guard let accessToken = credentials.accessToken else { return }
let keychain = A0SimpleKeychain(service: "Auth0")
keychain.setString(accessToken, forKey: "access_token")
```

As you can see, `SimpleKeychain` can be seen simply as a key-value storage.

> You can also verify whether a JWT token is valid or not by decoding it locally, to check its expiration. For further reference, you can check out this [JWT decoder for Swift](https://github.com/auth0/JWTDecode.swift).

## On Startup: Check accessToken existence

The main purpose of storing this token is to save the user from having to re-enter login credentials upon relaunch of the app. So, **once the app has launched**, we need to check for the existence of an `accessToken` to see if we can automatically log the user in and redirect the user straight into the app's main flow, skipping any login screen.

To do so, first, we retrieve its value from the `access_token` key we used above, from the keychain:

```swift
let keychain = A0SimpleKeychain(service: "Auth0")
guard let accessToken = keychain.string(forKey: "access_token") else {
    // AccessToken doesn't exist, user has to enter their credentials to log in
    // Present Lock
    return
}
// AccessToken exists
// We still need to validate it!
```

## Validate an existent accessToken

Then, if such a token exists, we need to check whether it's still valid, has expired, or is no longer valid for some other reason, such as being revoked. To do so, we'll use `Auth0` to fetch the user's profile based on the current `accessToken` we've got:

```swift
let keychain = A0SimpleKeychain(service: "Auth0")
guard let accessToken = keychain.string(forKey: "access_token") else {
    // No accessToken found, present Lock Login
    return
}

// Retrieve userInfo
Auth0
     .authentication()
     .userInfo(token: accessToken)
     .start { result in
         switch(result) {
         case .success(let profile):
             // Our accessToken is still valid and we have the user's profile
             // This would be a good time to store your profile somewhere
         case .failure(let error):
             // accessToken has expired or no longer valid
         }
     }
```

## Dealing with a non-valid accessToken

How to deal with a non-valid accessToken is up to you. You will normally choose between two scenarios:
Either you ask users to re-enter theirs credentials, or you [use the refreshToken to get a new valid accessToken again](/refresh-token).

If you aim for the former scenario, make sure you clear all the keychain stored values by doing:

```swift
A0SimpleKeychain(service: "Auth0").clearAll()
```

However, in this tutorial, we'll focus on the latter scenario, where we still want to log users in without asking for their credentials again.

In this case, we're going to leverage the `refreshToken`. The refresh token is another token string contained within the `Credentials` object that comes upon a successful login, which doesn't expire, and whose main purpose is retrieving a new valid `accessToken`.

>It's recommended that you read and understand the [refresh token documentation](/refresh-token) before proceeding. **You got to keep in mind, for example, that, even though the refresh token cannot expire, it can be revoked.**

### Store the refreshToken

> The `refreshToken` can be `nil` if `offline_access` is not sent in the `scope` parameter during authentication.

Besides storing the `accessToken`, we need to store the `refreshToken`. Let's make a couple of changes:

```swift
guard
    let token = maybeToken,
    let refreshToken = token.refreshToken
    else { return }
let keychain = A0SimpleKeychain(service: "Auth0")
keychain.setString(token.idToken, forKey: "id_token")
keychain.setString(refreshToken, forKey: "refresh_token") // Add this line
Lock
    .classic()
    .withOptions {
        $0.scope = "openid offline_access"
    }
    .onAuth {
      guard let accessToken = credentials.accessToken, let refreshToken = credentials.refreshToken else { return }
      let keychain = A0SimpleKeychain(service: "Auth0")
      keychain.setString(accessToken, forKey: "access_token")
      keychain.setString(refreshToken, forKey: "refresh_token")
    }
```

### Use the refreshToken to get a new accessToken

We can use the `func renew(withRefreshToken refreshToken: String)` method in `Auth0` to yield fresh user's credentials.

```swift
// ⚠️ accessToken has expired or invalid
let keychain = A0SimpleKeychain(service: "Auth0")
guard let refreshToken = keychain.string(forKey: "refresh_token") else {
    keychain.clearAll()
    return
}
Auth0
    .authentication()
    .renew(withRefreshToken: refreshToken)
    .start { result in
        switch(result) {
        case .success(let credentials):
            // Just got a new accessToken!
            // Don't forget to store it...
            guard let accessToken = credentials.accessToken else { return }
            keychain.setString(accessToken, forKey: "access_token")
            // At this point, you can log the user into your app. e.g. by navigating to the corresponding screen
        case .failure(let error):
            // refreshToken is no longer valid (e.g. it has been revoked)
            // Cleaning stored values since they are no longer valid
            keychain.clearAll()
            // At this point, you should ask the user to enter their credentials again!
        }
    }
```

That's it! You've already dealt with the basic concepts of session handling in your app.

## On Logout: Clear the Keychain

Whenever you need to log the user out, you just have to clear the keychain:

```swift
let keychain = A0SimpleKeychain(service: "Auth0")
keychain.clearAll()
```

### Optional: Encapsulate session handling

As you have probably realized by now, session handling is not a straightforward process. All this token-related information and processes can be encapsulated into a class that separates its logic from the View Controller layer. We recommend that you download the sample project from this tutorial and take a look at its implementation, focusing on the `SessionManager` class, which is in charge of dealing with these processes.

## Fetch the User Profile

The first step is to fetch the user profile. To do so, you need a valid `accessToken` first.

You need to call a method from the `Auth0` module that allows you to fetch the user profile given an `accessToken`:

```swift
import Lock
```

```swift
Auth0
     .authentication()
     .userInfo(token: accessToken)
     .start { result in
         switch(result) {
         case .success(let profile):
             // You've got the user profile here
             // Store it somewhere safe, you can see an example in this chapter's sample project.
         case .failure(let error):
             // Check this chapters sample project for an example of how to handle this.
         }
     }
```

## Show User Profile's Data

#### Default info

Showing the information contained in the user profile is pretty simple. You only have to access its properties, for instance:

```swift
let name = profile.name
let avatarURL = profile.pictureURL
```

> Check out the [Profile](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Profile.swift) class documentation to learn more about its properties.

#### Additional info

Besides the defaults, you can handle more information that is contained within any of the following dictionaries:

##### a. User Metadata

The `userMetadata` dictionary contains fields related to the user profile that can be added from client-side (e.g. when editing the profile). This is the one we're going to work with in this tutorial. You can access its fields as follows:

```swift
let firstName = profile.userMetadata["first_name"] as? String
let lastName = profile.userMetadata["last_name"] as? String
let country = profile.userMetadata["country"] as? String
let isActive = profile.userMetadata["active"] as? Bool
```

> The strings you use for subscripting the `userMetadata` dictionary, and the variable types you handle, are up to you.

##### b. App Metadata

The `appMetadata` dictionary contains fields that are usually added via [a rule](/quickstart/native/ios-swift/05-authorization), which is read-only for the native platform.

##### c. Extra Info

The `extraInfo` dictionary contains any other extra information stored in Auth0. That information is read-only for the native platform.

> For further information on metadata, see [the full documentation](/rules/metadata-in-rules).

## Update the User Profile

You can only update the user metadata. In order to do so, you need to perform a `patch`:

```swift
import Auth0
```

```swift
let idToken = ... // You will need the idToken from your credentials instance 'credentials.idToken'
let profile = ... // the Profile instance you obtained before
Auth0
    .users(token: idToken)
    .patch(profile.id, userMetadata: ["first_name": "John", "last_name": "Appleseed", "country": "Canada"]
    .start { result in
        switch result {
          case .success(let ManagementObject):
            // deal with success
          case .failure(let error):
            // deal with failure
        }
}
```
