---
section: libraries
description: Keeping your user logged in with Auth0.swift
topics:
  - libraries
  - swift
  - tokens
contentType: how-to
useCase: enable-mobile-auth
---

# Auth0.swift Saving and Renewing Tokens

When an authentication is performed with the `offline_access` <dfn data-key="scope">scope</dfn> included, it will return a <dfn data-key="refresh-token">Refresh Token</dfn> that can be used to request a new user token, without asking for credentials again.

## Credentials Manager

[Auth0.swift](https://github.com/auth0/Auth0.swift) provides a utility class to streamline the process of storing and renewing credentials. You can access the `accessToken` or `idToken` properties from the [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift) instance. This is the preferred method to manage user credentials.

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

::: note
The Keychain items do not get deleted after your app is uninstalled. We recommend to always clear all of your app's Keychain items on first launch.
:::

### Credentials Check

It can be useful to perform a quick sanity check that you have valid credentials stored in the manager. If not the user can then be directed to authenticate.

```swift
guard credentialsManager.hasValid() else {
    // Present Login Page
}
```

### Retrieving User Credentials

You can retrieve the user's credentials as follows:

```swift
credentialsManager.credentials { error, credentials in
    guard error == nil, let credentials = credentials else {
        // Handle Error, Present Login Page
    }
    // Valid credentials, you can access the token properties such as `idToken`, `accessToken`.
}
```

::: note
Renewing a user's credentials works exactly the same way, if the token has expired. The Credentials Manager will automatically renew the credentials, then store the renewed credentials to the Keychain and finally return them in the closure.
:::

## Alternative Method - SimpleKeychain

If you are familiar with <dfn data-key="lock">Lock</dfn> v1, you may already be using the [SimpleKeychain](https://github.com/auth0/SimpleKeychain) SDK to handle iOS Keychain read/write access. This section is for developers who would prefer to keep using the SimpleKeychain and not upgrade to the preferred Credentials Manager.

First thing you need to do is store the tokens you need. In this case, you will store the `access_token` and `refresh_token` in the Keychain after a successful authentication.

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
