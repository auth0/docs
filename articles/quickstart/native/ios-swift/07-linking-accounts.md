---
title: Linking Accounts
description: This tutorial will show you how to link multiple accounts within the same user.
budicon: 345
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-v2-sample',
  path: '07-Linking-Accounts',
  requirements: [
    'CocoaPods 1.1.1',
    'Version 8.2 (8C38)',
    'iPhone 6 - iOS 10.2 (14C89)'
  ]
}) %>

## Before Starting

You should be familiar with previous tutorials. This tutorial assumes that:

- You've integrated [Lock](https://github.com/auth0/Lock.iOS-OSX) and [Auth0.swift](https://github.com/auth0/Auth0.swift/) dependencies in your project and you're familiar with presenting the Lock login dialog. For further information, check out the [login tutorial](/quickstart/native/ios-swift/01-login) and the [session handling tutorial](/quickstart/native/ios-swift/03-user-sessions) first.

> **It is highly recommended that you take a look at the [linking accounts documentation](/link-accounts)** to understand the process of linking accounts.

## Enter Account Credentials

Here's the scenario: You have a user who is logged in and wants to link one (or multiple) accounts to that logged in account, such that the user can login with any of them and get into that account.

Typically, you will need to present an extra login dialog to make users enter the credentials for any account they want to link with their main account. You can present this login as we saw in the [login tutorial](/quickstart/native/ios-swift/01-login):

```swift
import Lock
```

```swift
Lock
    .classic()
    .withOptions {
        $0.oidcConformant = true
        $0.scope = "openid profile"
    }
    .onAuth { credentials in
        guard let accessToken = credentials.accessToken, let idToken = credentials.idToken else { return }
        // Store accessToken to retrieve user profile, store idToken for linking
    }
    .present(from: self)
```

Upon success, you need to store the `idToken` value for later use, which is the `idToken` for the secondary account that the user is linking with.
## Link an Account

Linking an account is simple. You have a user, and another account you want to link with that user. All you need to grab is these three values:

- `id`: The `id` from the user that is logged in, you can get this from the User's Profile.
- `idToken`: The `idToken` obtained upon your user login.
- `otherUserToken`: The `idToken` from the account you want to link the user with. This is the value you stored in step 1.

```swift
import Auth0
```

```swift
let id = ... // the id of the user
let idToken = ... // the user's idToken
let otherUserToken = ... // the idToken from the account you want to link the user with
Auth0
    .users(token: idToken)
    .link(id, withOtherUserToken: otherUserToken)
    .start { result in
        switch result {
        case .success:
            // linked account!
        case .failure(let error):
            // deal with error
        }
    }
```

## Retrieve Linked Accounts

Linked accounts, a.k.a. user's identities, can be easily retrieved by fetching the user's profile, a process that we already know from the [user profile](/quickstart/native/ios-swift/02-custom-login) tutorial:

```swift
import Lock
```

```swift
Auth0
    .authentication()
    .userInfo(token: accessToken)
    .start { result in
        switch(result) {
        case .success(let profile):
            // Store profile
        case .failure(let error):
            // Handle error
        }
```

Once you have the `id` from the profile you can retrieve the users identities through a management API call as follows:

```swift
Auth0
    .users(token: idToken)
    .get(userId, fields: ["identities"], include: true)
    .start { result in
        switch result {
        case .success(let user):
            let identityValues = user["identities"] as? [[String: Any]] ?? []
            let identities = identityValues.flatMap { Identity(json: $0) }
        case .failure(let error):
            // Handle error
        }
  }
```

> Any linked account is handled as a `Profile` identity object. For further information on this object, check out the [profile class documentation](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Profile.swift)

## Unlink an Account

The unlinking process is quite similar to the linking one. This time, you just need the `id`, the user's `idToken`, and the `identity` object that you want to unlink (you will only use its `userId` and `provider` values):

```swift
import Auth0
```

```swift
let id = ... // the user id
let idToken = ... // the user idToken
let identity: Identity = ... // the identity (account) you want to unlink from the user
Auth0
    .users(token: idToken)
    .unlink(identityId: identity.identifier, provider: identity.provider, fromUserId: id)
    .start { result in
            switch result {
            case .success:
                // Unlinked account!
            case .failure(let error):
                // Deal with error
            }
     }
```
