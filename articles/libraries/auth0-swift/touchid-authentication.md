---
section: libraries
description: How to implement Touch ID authentication with Auth0.swift.
topics:
  - libraries
  - swift
  - touch-id
contentType: how-to
useCase: enable-mobile-auth
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

Before retrieving credentials, you can also engage the biometric authentication supported by your device, such as Face ID or Touch ID.

First, setup the Credentials Manager, then enable biometrics. You can also pass in a title to show in the prompt.

```swift
let credentialsManager = CredentialsManager(authentication: Auth0.authentication())
credentialsManager.enableBiometrics(withTitle: "Touch ID / Face ID Login")
```

It is also strongly recommended that you add the [NSFaceIDUsageDescription](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW75) setting to your project's `Info.plist` in order to display a reason for using Face ID. In some cases, if a description string is not provided and Face ID authentication is attempted, the effort may fail.

```swift
...
<key>NSFaceIDUsageDescription</key>
<string>Reason Why We Use Face ID Here</string>
...
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

When you need to renew the user's credentials you can call the `credentials` method from the Credentials Manager to take care of this.

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

You can download a sample project and follow the tutorial in our [Biometric Authentication in iOS](/quickstart/native/ios-swift/08-touch-id-authentication) quickstart. 
