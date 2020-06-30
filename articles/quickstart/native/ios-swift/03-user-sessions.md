---
title: User Sessions
description: This tutorial will show you how to handle user sessions and retrieve the user's profile.
budicon: 280
topics:
    - quickstarts
    - native
    - ios
    - swift
github:
    path: 03-User-Sessions
contentType: tutorial
useCase: quickstart
---

## Credentials Manager

This guide shows you how to use the credentials manager to store and Refresh Tokens.

[Auth0.swift](https://github.com/auth0/Auth0.swift) provides a utility class to streamline the process of storing and renewing credentials. You can access the `accessToken` or `idToken` properties from the [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift) instance.

::: note
You can also use `SimpleKeychain` directly, without the added benefits and convenience of the credentials manager. To learn more, read about [Saving and Refreshing Tokens](/libraries/auth0-swift/save-and-refresh-jwt-tokens#simplekeychain).
:::

## Save the User's Credentials When They Log In

When your users log in successfully, save their credentials. You can then log them in automatically when they open your application again.

To get a [Refresh Token](/refresh-token) during authentication, use the `offline_access` scope. You can use the Refresh Token to request a new Access Token when the previous one expires.

First, import the `Auth0` module to the file that will present the login page:

${snippet(meta.snippets.setup)}

Next, present the login page:

```swift
// HomeViewController.swift

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
            self.credentialsManager.store(credentials: credentials)
        }
}
```

### Check for credentials when the user opens your application

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

### Clear the Keychain and revoke the Refresh Token when the user logs out

When you need to log the user out, remove their credentials from the keychain and revoke the Refresh Token:

```swift
// SessionManager.swift

credentialsManager.revoke { error in
    guard error == nil else {
        // Handle error
        print("Error: \(error)")
    }

    // The user is now logged out
}
```

## Retrieve the User Profile

To get the user's profile, you need a valid Access Token. You can find the token in the `Credentials` object returned by the credentials manager.

```swift
// SessionManager.swift

// credentials = A returned credentials object from the credentials manager in the previous step.

guard let accessToken = credentials?.accessToken else {
    // Handle Error
    return
}

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

### User profile information

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

## Managing Metadata

You can request more information than returned in the basic profile. To do this, you will be accessing the Auth0 [Management API](https://auth0.com/docs/api/management/v2).

### Additional scopes

You will need to update the original login scopes to include `read:current_user` to gain access to the full profile data and `update:current_user_metadata` to gain access to patch this data.

### Audience

You will also need to change your audience to the [API Identifier](https://manage.auth0.com/#/apis) for the Management API.
The default identifier is `https://${account.namespace}/api/v2/`

### Login

Putting this all together you should have a login that looks like:

```swift
// HomeViewController.swift

Auth0
    .webAuth()
    .scope("openid profile offline_access read:current_user update:current_user_metadata")
    .audience("https://${account.namespace}/api/v2/")
    .start {
        switch $0 {
        case .failure(let error):
            // Handle the error
            print("Error: \(error)")
        case .success(let credentials):
            // Auth0 will automatically dismiss the login page
            // Store the credentials
            self.credentialsManager.store(credentials: credentials)
        }
}
```

## Patch User Metadata

You can add custom user information in the user metadata section by performing a `patch`:

```swift
// ProfileViewController.swift

let accessToken = ... // the user-scoped accessToken from your credentials instance 'credentials.accessToken'
let profile = ... // the Profile instance you obtained accessing the `/userinfo` endpoint.

Auth0
    .users(token: accessToken)
    .patch(profile.sub, userMetadata: ["country": "United Kingdom"])
    .start { result in
        switch result {
          case .success(let user):
              // Patch Successful
              // user is a fresh copy of the full profile which includes your changes
          case .failure(let error):
              // Deal with failure
        }
}
```

## Retrieve User Metadata

The `user_metadata` dictionary contains fields related to the user profile.
You can specify the fields you want to retrieve, or use an empty array `[]` to pull back the full user profile.

Retrieving the `user_metadata` dictionary:

```swift
// ProfileViewController.swift

let accessToken = ... // the user-scoped accessToken from your credentials instance 'credentials.accessToken'
let profile = ... // the Profile instance you obtained accessing the `/userinfo` endpoint.

Auth0
    .users(token: accessToken)
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

Accessing the user's metadata. You can choose the key names and set the appropriate type for the `user_metadata` dictionary data.

```swift
let country = userMetadata["country"] as? String
```
