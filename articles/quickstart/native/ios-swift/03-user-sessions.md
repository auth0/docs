---
title: User Sessions
description: This tutorial will show you how to handle user sessions and retrieve the user's profile.
budicon: 280
tags:
  - quickstarts
  - native
  - ios
  - swift
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

## Before You Start

Before you continue with this tutorial, make sure that you have integrated the Auth0 library into your project. If you have not, follow the [Login](/quickstart/native/ios-swift/00-login) tutorial.

## Credentials Manager

This guide shows you how to use the credentials manager to store and Refresh Tokens. 

[Auth0.swift](https://github.com/auth0/Auth0.swift) provides a utility class to streamline the process of storing and renewing credentials. You can access the `accessToken` or `idToken` properties from the [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift) instance. 

::: note
You can also use `SimpleKeychain` directly, without the added benefits and convenience of the credentials manager. To learn more, read about [Saving and Refreshing Tokens](/libraries/auth0-swift/save-and-refresh-jwt-tokens#simplekeychain). 
:::

## Save the User's Credentials When They Log in

When your users log in successfully, save their credentials. You can then log them in automatically when they open your application again.

To get a [Refresh Token](/refresh-token) during authentication, use the `offline_access` scope. You can use the Refresh Token to request a new Access Token when the previous one expires. 

First, import the `Auth0` module to the file that will present the login page:

${snippet(meta.snippets.setup)}

Next, present the login page:

```swift
// HomeViewController.swift
Credentials manager
// Create an instance of the credentials manager for storing credentials
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
            // Auth0 will automatically dismiss the login page
            // Store the credentials
            credentialsManager.store(credentials: credentials)
        }
}
```

## Check for Credentials When the User Opens Your Application

When the user opens your application, check for valid credentials. If they exist, you can log the user in automatically and redirect them to the app's main flow without any additional login steps.

::: note
We recommend that you download the sample project from this tutorial and take a look at its implementation. Focus on the `CredentialsManager` class, which manages session handling, obtains user credentials and saves them.
:::

First, you check if the credentials manager has valid credentials:

```swift
// SessionManager.swift

guard credentialsManager.hasValid() else {
    // No valid credentials exist, present the login page
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

If the credentials have expired, the credentials manager will automatically renew them for you with the Refresh Token.

## Clear the Keychain When the User Logs Out

When you need to log the user out, remove their credentials from the keychain:

```swift
// SessionManager.swift

credentialsManager.clear()
```

## Get the User Profile

To get the user's profile, you need a valid Access Token. You can find the token in the `credentials` object returned by the credentials manager.

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

## Show the User Profile Information

### Default information

To show the information contained in the user profile, access its properties, for example:

```swift
// ProfileViewController.swift

if let name = profile.name, let pictureURL = profile.picture {
  // Show Information
}
```

::: note
Read the [UserInfo](https://github.com/auth0/Auth0.swift/blob/master/Auth0/UserInfo.swift) class documentation to learn more about its properties.
:::

### Additional information

You can request more information than returned in the basic profile. To do this, add `userMetadata` to the profile.

## Update the User Profile

You store additional user information in the user metadata. Perform a `patch`:

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

## Retrieve User Metadata

The `user_metadata` dictionary contains fields related to the user profile. These fields can be added from client-side (for example, when the user edits their profile). 

You can specify the fields you want to retrieve, or use an empty array `[]` to pull back the complete user profile. 

Retrieve the `user_metadata` dictionary:

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

Access the user's metadata. You can choose the key names and types for the `user_metadata` dictionary.

```swift
let firstName = userMetadata["first_name"] as? String
let lastName = userMetadata["last_name"] as? String
let country = userMetadata["country"] as? String
let isActive = userMetadata["active"] as? Bool
```
