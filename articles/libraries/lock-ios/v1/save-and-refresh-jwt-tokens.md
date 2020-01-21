---
section: libraries
title: Saving and Refreshing JWT Tokens
description: Keeping your user logged in
topics:
  - libraries
  - lock
  - ios
  - tokens
contentType:
  - how-to
useCase:
  - add-login
  - enable-mobile-auth
---

# Lock iOS: Saving and Refreshing JWT Tokens

<%= include('../_includes/_lock-version-1') %>

<%= include('../../../_includes/_uses-delegation') %>

When an authentication is performed with the `offline_access` <dfn data-key="scope">scope</dfn> included, it will return a <dfn data-key="refresh-token">Refresh Token</dfn> that can be used to request a new JWT token and avoid asking the user his/her
credentials again.

::: note
We are using [SimpleKeychain](https://github.com/auth0/SimpleKeychain) to handle iOS Keychain access.
:::

First thing we need to do is store the ID Token and Refresh Token in the iOS Keychain after a successful authentication.

```objc
A0LockViewController *controller = ...;
controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
    A0SimpleKeychain *keychain = [A0SimpleKeychain keychainWithService:@"Auth0"];
    [keychain setString:token.idToken forKey:@"id_token"];
    [keychain setString:token.refreshToken forKey:@"refresh_token"];
    [keychain setData:[NSKeyedArchiver archivedDataWithRootObject:profile] forKey:@"profile"];
    // Other stuff. Don't forget to dismiss lock
};
```

```swift
let controller: A0LockViewController = ...
controller.onAuthenticationBlock = { (profile, token) in
    guard let profile = profile, let token = token else {
        return //it's a sign up
    }
    let keychain = A0SimpleKeychain(service: "Auth0")
    keychain.setString(token.idToken, forKey: "id_token")
    if let refreshToken = token.refreshToken {
        keychain.setString(refreshToken, forKey: "refresh_token")
    }
    keychain.setData(NSKeyedArchiver.archivedData(withRootObject: profile), forKey: "profile")
    // Other stuff. Don't forget to dismiss lock
}
```
Once you have those stored, you can at any point request a new ID Token using either of by calling to Auth0`s **delegation** endpoint.

## Using a non-expired ID Token

```objc
A0Lock *lock = [A0Lock sharedLock];
A0SimpleKeychain *keychain = [A0SimpleKeychain keychainWithService:@"Auth0"];
NSString* token = [keychain stringForKey:@"id_token"];
A0APIClient *client = [lock apiClient];
[client fetchNewIdTokenWithIdToken:token parameters:nil success:^(A0Token *token) {
    [keychain setString:token.idToken forKey:@"id_token"];
    //Just got a new ID Token!
} failure:^(NSError *error) {
    [keychain clearAll]; //Cleaning stored values since they are no longer valid
    //ID Token is no longer valid.
    //You should ask the user to login again!.
}];
```

```swift
let keychain = A0SimpleKeychain(service: "Auth0")
if let token = keychain.stringForKey("id_token") {
    let client = A0Lock.sharedLock().apiClient()
    client.fetchNewIdTokenWithIdToken(token,
        parameters: nil,
        success: { token in
            keychain.setString(token.idToken, forKey: "id_token")
            //Just got a new ID Token!
        }, failure: { error in
            keychain.clearAll() //Cleaning stored values since they are no longer valid
            //ID Token is no longer valid.
            //You should ask the user to login again!.
    })
}
```

## Using Refresh Token

```objc
A0Lock *lock = [A0Lock sharedLock];
A0SimpleKeychain *keychain = [A0SimpleKeychain keychainWithService:@"Auth0"];
NSString* refreshToken = [keychain stringForKey:@"refresh_token"];
A0APIClient *client = [lock apiClient];
[client fetchNewIdTokenWithRefreshToken:refreshToken parameters:nil success:^(A0Token *token) {
    [keychain setString:token.idToken forKey:@"id_token"];
    //Just got a new ID Token!
} failure:^(NSError *error) {
    [keychain clearAll]; //Cleaning stored values since they are no longer valid
    //Refresh Token is no longer valid.
    //You should ask the user to login again!.
}];
```

```swift
let keychain = A0SimpleKeychain(service: "Auth0")
if let token = keychain.stringForKey("refresh_token") {
    let client = A0Lock.sharedLock().apiClient()
    client.fetchNewIdTokenWithRefreshToken(token,
        parameters: nil,
        success: { token in
            keychain.setString(token.idToken, forKey: "id_token")
            //Just got a new ID Token!
        }, failure: { error in
            keychain.clearAll() //Cleaning stored values since they are no longer valid
            //Refresh Token is no longer valid.
            //You should ask the user to login again!.
    })
}
```

## Retrieving the user profile from Keychain

If you need to show profile information in your application, just retrieve the saved profile and pick what you need. For example:

```objc
A0SimpleKeychain *keychain = [A0SimpleKeychain keychainWithService:@"Auth0"];
A0UserProfile *profile = [NSKeyedUnarchiver unarchiveObjectWithData:[keychain dataForKey:@"profile"]];
self.nameLabel.text = profile.name;
self.emailLabel.text = profile.email;
```

```swift
let keychain = A0SimpleKeychain(service: "Auth0")
if let data = keychain.dataForKey("profile"), let profile = NSKeyedUnarchiver.unarchiveObjectWithData(data) {
  self.nameLabel.text = profile.name
  self.emailLabel.text = profile.email
}
```
