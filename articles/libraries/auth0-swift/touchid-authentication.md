---
section: libraries
description: How to implement Touch ID authentication with Auth0.swift.
tags:
  - libraries
  - swift
  - touch-id
---
# Auth0.swift Touch ID Authentication

Here's the scenario: After user authentication, you want to store the user's credentials and use them as long as they are valid. Once they expire, you would want to renew them using the `refreshToken` in order to avoid presenting the login page again. Rather than doing this automatically you require the user to validate with their fingerprint.

You will be using the [Credentials Manager](https://github.com/auth0/Auth0.swift/blob/master/Auth0/CredentialsManager.swift) utility in [Auth0.swift](https://github.com/auth0/Auth0.swift/) to streamline the management of user credentials and perform the Touch ID authentication.

## Getting Started

First, import the `Auth0` module:

```swift
import Auth0
```

### Credentials Manager

Setup the Credentials Manager and enable Touch ID authentication, you can pass the title to show in the Touch ID prompt:

```swift
let credentialsManager = CredentialsManager(authentication: Auth0.authentication())
credentialsManager.enableTouchAuth(withTitle: "Touch to Authenticate")
```

### Login

Present the login page and pass the credentials upon successful authentication to the Credentials Manager.

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

There is no need manually store the new credentials as this is handled by the Credentials Manager during the renewal.

## Next Steps

You can download a sample project and follow the tutorial in our [Touch ID Authentication](/quickstart/native/ios-swift/08-touch-id-authentication) quickstart. 
