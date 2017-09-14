---
section: libraries
toc_title: Touch ID Authentication
description: How to implement Touch ID authentication with Lock iOS.
---
# Lock iOS: Touch ID Authentication

Here's the scenario: You are using `webAuth` to present the HLP (Hosted Login page) for the user to Login. After user authentication you want to store the user's credentials and use the `refreshToken` to renew the user's credentials without having to present the HLP. Instead you want to use Touch ID to authenticate and renew the user's credentials.

You will to be using the [Credentials Manager](https://github.com/auth0/Auth0.swift/blob/master/Auth0/CredentialsManager.swift) utility in [Auth0.swift](https://github.com/auth0/Auth0.swift/) to streamline the management of user credentials and perform the Touch ID authentication.

## Getting Started

First, import the `Auth0` module:

```swift
import Auth0
```

### Credentials Manager

Setup the Credentials Manager and enable Touch ID authentication:

```swift
let credentialsManager = CredentialsManager(authentication: Auth0.authentication())
credentialsManager.enableTouchAuth(withTitle: "Touch to Authenticate")
```

### Login

Present the HLP and pass the credentials upon successful authentication to the Credentials Manager.

```swift
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
            credentialsManager.store(credentials: credentials)
        }
}
```

### Renew User Credentials

When you need to renew the user's credentials you can call the `credentials` method from the Credentials Manager to take care of this. The user will be promoted for Touch ID.

```swift
credentialsManager.credentials { error, credentials in
    guard error == nil, let credentials = credentials else {
        // Handle Error
        // Fallback to Login Screen
    }
    // Continue routing the user as authentication was a success
}
```

There is no need to store the credentials again as you did with the Login as this is done by the Credentials Manager for you during renewal.