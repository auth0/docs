---
section: libraries
toc_title: Saving and Renewing Tokens
description: Keeping your user logged in
---

# Lock iOS: Saving and Renewing Tokens

When an authentication is performed with the `offline_access` scope included, it will return a [refresh token](/refresh-token) that can be used to request a new user token and avoid asking the user his/her credentials again.

## Credentials Manager

[Auth0.swift](https://github.com/auth0/Auth0.swift) provides a utility class to streamline the process of storing and renewing credentials. You can access the `accessToken` or `idToken` properties from the [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift) instance.

First, import the `Auth0` module:

```swift
import Auth0
```

Next, present the Login:

```swift 
let credentialsManager = CredentialsManager(authentication: Auth0.authentication())

Auth0
    .webAuth()
    .scope("openid profile offline_access")
    .audience("https://${account.namespace}/userinfo")
    .start {
        switch $0 {
        case .failure(let error):
            // Handle the error
        case .success(let credentials):
            // Pass the credentials over to the Credentials Manager
            credentialsManager.store(credentials: credentials)
        }
}
```

### Renewing User Credentials

You can retrieve the user's credentials as follows:

```swift
self.credentialsManager.credentials { error, credentials in
    guard error == nil, let credentials = credentials else {
        // Handle Error, Route to Login
    }
    // We have valid credentials, you can access the token properties e.g. `idToken`, `accessToken`.
}
```

Renewing a user's credentials works exactly the same way, if the token has expired. The Credentials Manager will automatically renew, store the new credentials to the Keychain and return them in the closure.

## SimpleKeychain

If you are migrating from v1, you may already be familiar with using [SimpleKeychain](https://github.com/auth0/SimpleKeychain) to handle iOS Keychain access.

First thing we need to do is store any tokens we need, in this case we will store the `access_token` and `refresh_token` in the Keychain after a successful authentication.

```swift
let keychain = A0SimpleKeychain(service: "Auth0")

Auth0
    .webAuth()
    .scope("openid profile offline_access")
    .audience("https://${account.namespace}/userinfo")
    .start {
        switch $0 {
        case .failure(let error):
            // Handle the error
        case .success(let credentials):
             guard let accessToken = credentials.accessToken, let refreshToken = credentials.refreshToken else { // Handle Error }
             keychain.setString(accessToken, forKey: "access_token")
             keychain.setString(refreshToken, forKey: "refresh_token")
             // You might want to route to a user profile screen at this point
        }
}
```

Once you have those stored, you can at any point request a fresh [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift) instance.

### Renewing User Credentials

```swift
let keychain = A0SimpleKeychain(service: "Auth0")

Auth0
    .authentication()
    .renew(withRefreshToken: refreshToken)
    .start { result in
        switch(result) {
        case .success(let credentials):
            // Store the new Access Token
            keychain.setString(accessToken, forKey: "access_token")
            // You do not get a new refresh_token, you can still use the one you originally had
        case .failure(let error):
            keychain.clearAll()
            // Handle Error
        }
}
```
