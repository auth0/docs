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

## Credentials Manager

You will be using the credential's manager to store and refresh tokens in this guide.

[Auth0.swift](https://github.com/auth0/Auth0.swift) provides a utility class to streamline the process of storing and renewing credentials. You can access the `accessToken` or `idToken` properties from the [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift) instance. 

::: note
Alternatively you can use `SimpleKeychain` directly, without the added benefits and convenience of the Credentials Manager. Please see [Saving and Refreshing Tokens](/libraries/auth0-swift/save-and-refresh-jwt-tokens#simplekeychain)
:::

## On Login: Store the user's credentials

You will store user's credentials **upon a successful login**, in order to prevent the user from being asked for login credentials again every time the app is re-launched. You will be using the `offline_access` scope to ensure that a [refresh token](/refresh-token) is returned during authentication. The `refreshToken` can be used to request a new `accessToken` if the current `accessToken` one has expired. 

First, import the `Auth0` module in the file where you want to present the hosted login page (HLP):

${snippet(meta.snippets.setup)}

Next, present the hosted login page:

```swift
// HomeViewController.swift

// Create an instance of the Credentials Manager for storing credentials
let credentialsManager = CredentialsManager(authentication: Auth0.authentication())

Auth0
    .webAuth()
    .scope("openid profile offline_access")
    .audience("https://${account.namespace}/userinfo")
    .start {
        switch $0 {
        case .failure(let error):
            // Handle the error
            print("Error: \(error)")
        case .success(let credentials):
            // Auth0 will automatically dismiss the hosted login page
            // Store the credentials
            credentialsManager.store(credentials: credentials)
        }
}
```

## On Startup: Check Credentials

You need to check for the existence of valid credentials to see if you can automatically log the user in and redirect the user straight into the app's main flow, skipping any additional login steps.

::: note
It's recommended that you download the sample project from this tutorial and take a look at its implementation, focusing on the `SessionManager` class, which is in charge of dealing with the management of the user's credentials and profile.
:::

First, you can check if the credentials manager has valid credentials:

```swift
// SessionManager.swift

guard credentialsManager.hasValid() else {
    // No valid credentials exist, present the hosted login page
}
```

Next, retrieve the credentials:

```swift
// SessionManager.swift

credentialsManager.credentials { error, credentials in
    guard error == nil, let credentials = credentials else {
        // Handle error
        print("Error: \(error)")
    }
    // You now have a valid credentials object, you might want to store this locally for easy access.
    // You will use this later to retrieve the user's profile
} 
```

If they have expired the credentials manager will automatically renew them for you using the refresh token.

## On Logout: Clear the Keychain

Whenever you need to log the user out, you should remove the credentials from the keychain:

```swift
// SessionManager.swift

credentialsManager.clear()
```

That's it. You've already dealt with the basic concepts of session handling in your app.

## Fetch the User Profile

The first step is to fetch the user profile. To do so, you need a valid `accessToken` first, which you 
can find in the credentials object returned by the credentials manager.

```swift
// SessionManager.swift

// credentials = A returned credentials object from the credentials manager in the previous step.

guard let accessToken = credentials?.accessToken
    else { // Handle Error }
Auth0
    .authentication()
    .userInfo(withAccessToken: accessToken)
    .start { result in
        switch(result) {
        case .success(let profile):
            // You've got the user's profile, good time to store it locally.
            // e.g. self.profile = profile
        case .failure(let error):
            // Handle the error
            print("Error: \(error)")
        }
    }
```

## Show User Profile's Data

#### Default info

Showing the information contained in the user profile is pretty simple. You only have to access its properties, for instance:

```swift
// ProfileViewController.swift

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

You can then access the user's metadata:

```swift
let firstName = userMetadata["first_name"] as? String
let lastName = userMetadata["last_name"] as? String
let country = userMetadata["country"] as? String
let isActive = userMetadata["active"] as? Bool
```

::: note
The strings you use for subscripting the `userMetadata` dictionary, and the variable types you handle, are up to you.
:::
