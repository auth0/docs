---
title: Touch ID Authentication
description: This tutorial will show you how to utilise Touch ID and the Credentials Manager.
budicon: 345
github:
  path: 08-Credentials-TouchID
requirements:
  - CocoaPods 1.2.1
  - Version 8.3.2 (8E2002)
  - Touch ID Enrolled Device
---

## Before You Start

Before you continue with this tutorial, make sure that you have completed the previous tutorials. This tutorial assumes that:
* You have integrated [Auth0.swift](https://github.com/auth0/Auth0.swift/) as a dependency in your project. 
* You are familiar with presenting the login screen. To learn more, see the [Login](/quickstart/native/ios-swift/00-login) tutorial.
* You know how to renew a user's credentials with a Refresh Token. To learn more, see the [User Sessions](/quickstart/native/ios-swift/03-user-sessions) tutorial.

## Apply Touch ID Authentication

This tutorial shows you how to renew the user's credentials without presenting the user with the login page. Additionally, the guide shows you how to use Touch ID to validate the renewal. 

This tutorial covers how to use the [credentials manager](https://github.com/auth0/Auth0.swift/blob/master/Auth0/CredentialsManager.swift) utility in [Auth0.swift](https://github.com/auth0/Auth0.swift/) to streamline the management of user credentials and Touch ID.

Import the `Auth0` module:

${snippet(meta.snippets.setup)}

## Add the Credentials Manager

Add a property to your class for the credentials manager:

```swift
let credentialsManager: CredentialsManager!
```

Next, initialize the credentials manager in the appropriate `init` method of your class:

```swift
self.credentialsManager = CredentialsManager(authentication: Auth0.authentication())
```

## Add Login

Present the login page. Add the `offline_access` scope to receive a `refreshToken`.

::: note
Read more about presenting the login page in the [User Sessions](/quickstart/native/ios-swift/03-user-sessions) tutorial.
:::

```swift
// HomeViewController.swift

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
            // Store credentials securely with the Credentials Manager
            self.credentialsManager.store(credentials: credentials)
        }
}
```

When the user logs in, the credentials object is encrypted and stored securely in the keychain.

## Renew the User's Credentials

To automatically renew the user's credentials, use the [credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/CredentialsManager.swift#L98) method in the credentials manager. 

The credentials manager retrieves stored credentials from the keychain and checks if the Access Token is still valid:
* If the current credentials are still valid, the credentials manager returns them
* If the Access Token has expired, the credentials manager renews them using the Refresh Token and returns them

Add the following:

```swift
self.credentialsManager.credentials { error, credentials in
    guard error == nil, let credentials = credentials else {
        // Handle Error
        // Route user back to Login Screen
    }
    // There is no need to store the credentials as you did in Login. The Credentials Manager will do this for you internally
    // Continue routing the user as authentication was a success
}
```

## Enable Touch ID

After the line that initialized the credentials manager, add a line that enables Touch ID:

```swift
self.credentialsManager.enableTouchAuth(withTitle: "Touch to Authenticate")
```

Next time you call the `credentials` method, the user will be prompted for their Touch ID with a "Touch to Authenticate" message.

## Improve the User Experience

If the user has logged out and you have cleared the credentials from the credentials manager, for example, with the following: 

```swift
self.credentialsManager.clear()
```

The user is still prompted for their touch ID. This returns an error in the `credentials` closure because there are no credentials to renew from.

The credentials manager has a `hasValid()` method that lets you know if there are valid credentials that can be returned directly or renewed and returned.

You can add this check before you call the `credentials` method:

```swift
guard self.credentialsManager.hasValid() else {
    // Route to Login
}
```
