---
title: Touch ID Authentication
description: This tutorial will show you how to utilise Touch ID and the Credentials Manager
budicon: 345
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-sample',
  path: '00-Credentials-TouchID',
  requirements: [
    'CocoaPods 1.2.1',
    'Version 8.3.2 (8E2002)',
    'iPhone 7 - iOS 10.3 (14E269)',
    'Touch ID Enrolled Device'
  ]
}) %>

## Before Starting

You should be familiar with previous tutorials. This tutorial assumes that you've integrated the [Auth0.swift](https://github.com/auth0/Auth0.swift/) dependencies in your project and you're familiar with presenting the Login. For further information, check out the [Login](/quickstart/native/ios-swift/00-login) quickstart.
It is recommended that you are explore the [User Sessions](/quickstart/native/ios-swift/03-user-sessions) quickstart if you are not familiar with renewal of credentials using a `refreshToken`.

## Touch ID Authentication

Here's the scenario: You are using `webAuth` to present the HLP for the user to Login. After user authentication you want to store the user's credentials and use the `refreshToken` to renew the user's credentials without having to present the HLP. Additionally you want to utilize Touch ID to validate this renewal process.

You will to be using the [Credentials Manager](https://github.com/auth0/Auth0.swift/blob/master/Auth0/CredentialsManager.swift) utility in [Auth0.swift](https://github.com/auth0/Auth0.swift/) to streamline the management of user credentials and Touch ID.

First, import the `Auth0` module:

${snippet(meta.snippets.setup)}

### The Credentials Manager

Add a property to your class for the credentials manager:

```swift
let credentialsManager: CredentialsManager!
```

Next, ensure the credentials manager is initialized in the appropriate `init` method for your class:

```swift
self.credentialsManager = CredentialsManager(authentication: Auth0.authentication())
```

### Login

Present the hosted login page, as per the *User Sessions* quickstart, you want to receive a `refreshToken` so you need to add the `offline_access` scope.

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

Upon success, the credentials object will be encrypted and stored securely in the keychain using the Credentials Manager. 

## Renew the User's Credentials

To automatically renew the user's credentials you can use the [credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/CredentialsManager.swift#L98) method in the Credentials Manager. 

- It will retrieve the stored credentials from the keychain.
- Validate the accessToken is still valid.
- If the current credentials are still valid they will be returned.  
- If the accessToken has expired, the credentials will be automatically renewed using the refreshToken and returned.

Add the following:

```swift
self.credentialsManager.credentials { error, credentials in
    guard error == nil, let credentials = credentials else {
        // Handle Error
        // Route user back to Login Screen
    }
    // There is no need to store the credentials as you did in Login.  The Credentials Manager will do this for you internally
    // Continue routing the user as authentication was a success
}
```

If you were paying attention, you will have noticed there was no Touch ID prompt.

## Enable Touch ID

The Credentials Manager can take care of this for you, once enabled. Go back to the snippet that initialized the Credentials Manager and add:

```swift
self.credentialsManager.enableTouchAuth(withTitle: "Touch to Authenticate")
```

Next time you call the `credentials` method, the user will be promoted for their Touch ID with the title "Touch to Authenticate".

## Improving the User Experience

What happens if the user has logged out and you have cleared the credentials from the Credentials Manager e.g.

```swift
self.credentialsManager.clear()
```

In this case the user will still be promoted for their touch and an error will be returned in the `credentials` closure as there
are no credentials to renew from.

The Credentials Manager has a `hasValid()` method that quickly lets you know if their are valid credentials that can be returned either directly or renewed and returned.

You can add this check before you call the `credentials` method.

```swift
guard self.credentialsManager.hasValid() else {
    // Route to Login
}
```