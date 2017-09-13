---
title: User Sessions
description: This tutorial will show you how to handle user sessions and retrieve the user's profile.
budicon: 280
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-sample',
  path: '03-User-Sessions',
  requirements: [
    'CocoaPods 1.2.1',
    'Version 8.3.2 (8E2002)',
    'iPhone 7 - iOS 10.3 (14E269)'
  ]
}) %>


## Before Starting

This tutorial assumes you're using the Auth0 library for handling login. Make sure you've integrated this library into your project and you're familiar with it. **If you're not sure, review the [Login Guide](/quickstart/native/ios-swift/00-login).**

### Add the SimpleKeychain Dependency

We're going to use the [SimpleKeychain](https://github.com/auth0/SimpleKeychain) library to help us manage user credentials. Make sure you integrate it before proceeding.

##### a. Carthage

If you are using Carthage, add the following line to the `Cartfile`:

```ruby
github "auth0/SimpleKeychain"
```

Then, run `carthage bootstrap`.

::: note
For more information about Carthage usage, check [their official documentation](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos).
:::

##### b. Cocoapods

If you are using [Cocoapods](https://cocoapods.org/), add these lines to your `Podfile`:

```ruby
pod 'SimpleKeychain', '~> 0.8'
```

Then, run `pod install`.

::: note
For further reference on Cocoapods, check [their official documentation](http://guides.cocoapods.org/using/getting-started.html).
:::

## On Login: Store the user's token

We will store the [accessToken](/tokens/access-token) **upon a successful login**, in order to prevent the user from being asked for login credentials again every time the app is re-launched.

First, import the `Auth0` module in the file where you want to present the hosted login page.

${snippet(meta.snippets.setup)}

Then present the hosted login screen, like this:

${snippet(meta.snippets.use)}

You will want to store the `accessToken` value, which is inside the `Credentials` instance. To do so, you will use an `A0SimpleKeychain` instance:

```swift
// HomeViewController.swift

guard let accessToken = credentials.accessToken else { return }
let keychain = A0SimpleKeychain(service: "Auth0")
keychain.setString(accessToken, forKey: "access_token")
```

As you can see, `SimpleKeychain` can be seen simply as a key-value storage.

## On Startup: Check accessToken existence

The main purpose of storing this token is to save the user from having to re-enter login credentials upon relaunch of the app. So, **once the app has launched**, we need to check for the existence of an `accessToken` to see if we can automatically log the user in and redirect the user straight into the app's main flow, skipping any login screen.

To do so, first, you retrieve its value from the `accessToken` key stored in the keychain:

```swift
// HomeViewController.swift

let keychain = A0SimpleKeychain(service: "Auth0")
guard let accessToken = keychain.string(forKey: "access_token") else {
    // accessToken doesn't exist, user has to enter their credentials to log in
    // Present the Login
    return
}
// accessToken exists
// You still need to validate it!
```

## Validate an accessToken

Then, if such a token exists, you need to check whether it's still valid, has expired, or is no longer valid for some other reason, such as being revoked. To do so, you will use `Auth0` to fetch the user's profile based on the `accessToken` we've got:

```swift
// HomeViewController.swift

// Retrieve profile
Auth0
  .authentication()
  .userInfo(withAccessToken: accessToken)
   .start { result in
       switch(result) {
       case .success(let profile):
           // The accessToken is still valid and you have the user's profile
           // This would be a good time to store the profile
       case .failure(let error):
           // accessToken has expired or no longer valid
       }
   }
```

## Dealing with a non-valid accessToken

How to deal with a non-valid accessToken is up to you. You will normally choose between two scenarios:
Either you ask users to re-enter their credentials, or you can use `.renew(withRefreshToken: refreshToken)` with a [refresh_token](/refresh-token) to obtain a new valid accessToken again.

If you aim for the former scenario, make sure you clear all the keychain stored values by doing:

```swift
A0SimpleKeychain(service: "Auth0").clearAll()
```

However, in this tutorial you will focus on the latter scenario, where you want to log users in without asking for their credentials again.

In this case, you're going to leverage the `refreshToken`. The refresh token is another token string contained within the `Credentials` object that comes upon a successful login, which doesn't expire, and whose main purpose is retrieving a new valid `accessToken`.

::: note
It's recommended that you read and understand the [refresh token documentation](/refresh-token) before proceeding. **You got to keep in mind, for example, that, even though the refresh token cannot expire, it can be revoked.**
:::

### Store the refreshToken

::: note
The `refreshToken` can be `nil` if `offline_access` is not sent in the `scope` parameter during authentication.
:::

Besides storing the `accessToken`, you need to store the `refreshToken`. Let's make a couple of changes:

```swift
// HomeViewController.swift

Auth0
    .webAuth()
    .scope("openid profile offline_access")
    .start {
        switch $0 {
        case .failure(let error):
            // Handle the error
            print("Error: \(error)")
        case .success(let credentials):
            guard let accessToken = credentials.accessToken, let refreshToken = credentials.refreshToken else { return }
            let keychain = A0SimpleKeychain(service: "Auth0")
            keychain.setString(accessToken, forKey: "access_token")
            keychain.setString(refreshToken, forKey: "refresh_token")
        }
}
```

### Use the refreshToken to obtain a new accessToken

```swift
// SessionManager.swift

// accessToken has expired or invalid
let keychain = A0SimpleKeychain(service: "Auth0")
guard let refreshToken = keychain.string(forKey: "refresh_token") else {
    keychain.clearAll()
    return
}
Auth0
    .authentication()
    .renew(withRefreshToken: refreshToken, scope: "openid profile offline_access")
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
// SessionManager.swift

let keychain = A0SimpleKeychain(service: "Auth0")
keychain.clearAll()
```

### Optional: Encapsulate session handling

As you have probably realized by now, session handling is not a straightforward process. All this token-related information and processes can be encapsulated into a class that separates its logic from the View Controller layer. We recommend that you download the sample project from this tutorial and take a look at its implementation, focusing on the `SessionManager` class, which is in charge of dealing with these processes.

## Fetch the User Profile

The first step is to fetch the user profile. To do so, you need a valid `accessToken` first.

You need to call a method from the `Auth0` module that allows you to fetch the user profile given an `accessToken`:

```swift
// SessionManager.swift

// Retrieve profile
Auth0
    .authentication()
    .userInfo(withAccessToken: accessToken)
    .start { result in
        switch(result) {
        case .success(let profile):
            // You've got the user's profile
        case .failure(let error):
            // Handle the error
        }
    }
```

## Show User Profile's Data

#### Default info

Showing the information contained in the user profile is pretty simple. You only have to access its properties, for instance:

```swift
// SessionManager.swift

if let name = profile.name, let pictureURL = profile.picture {
  // Show Information
}
```

::: note
Check out the [UserInfo](https://github.com/auth0/Auth0.swift/blob/master/Auth0/UserInfo.swift) class documentation to learn more about its properties.
:::

#### Additional info

Besides the defaults, you can request more information than returned in the basic profile. Before you do this let's add some `userMetadata` to the profile.

## Update the User Profile

You can store additional user information in the user metadata. In order to do so, you need to perform a `patch`:

```swift
let idToken = ... // You will need the idToken from your credentials instance 'credentials.idToken'
let profile = ... // the Profile instance you obtained before
Auth0
    .users(token: idToken)
    .patch(profile.sub, userMetadata: ["first_name": "John", "last_name": "Appleseed", "country": "Canada"]
    .start { result in
        switch result {
          case .success(let ManagementObject):
              // deal with success
          case .failure(let error):
              // deal with failure
        }
}
```

## Retrieving User Metadata

The `user_metadata` dictionary contains fields related to the user profile that can be added from client-side (e.g. when editing the profile). This is the one you're going to work with in this tutorial.

You can specify the `fields` to be retrieved, or use an empty array `[]` to pull back the complete user profile.  Let's grab the `user_metadata`:

```swift
Auth0
    .users(token: idToken)
    .get(profile.sub, fields: ["user_metadata"], include: true)
    .start { result in
        switch result {
        case .success(let user):
            guard let userMetadata = user["user_metadata"] as? [String: Any] else { return }
            // Access userMetadata
        case .failure(let error):
            // Deal with failure
        }
}
```


You can then access its fields as follows:

```swift
let firstName = userMetadata["first_name"] as? String
let lastName = userMetadata["last_name"] as? String
let country = userMetadata["country"] as? String
let isActive = userMetadata["active"] as? Bool
```

::: note
The strings you use for subscripting the `userMetadata` dictionary, and the variable types you handle, are up to you.
:::
