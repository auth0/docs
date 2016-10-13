---
title: Linking Accounts
description: This tutorial will show you how to link multiple accounts within the same user.
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-sample',
  path: '05-Linking-Accounts'
}) %>

## Before Starting

You should be familiar with previous tutorials. This tutorial assumes that:

- You've integrated [Lock](https://github.com/auth0/Lock.iOS-OSX) and [Auth0.swift](https://github.com/auth0/Auth0.swift/) dependencies in your project and you're familiar with presenting the Lock login dialog. For further information, check out the [login tutorial](01-login) and the [session handling tutorial](03-session-handling) first.
- You're familiar with the concepts of `userId` and `idToken`. You can find info about them in the [session handling](03-session-handling) and [user profile](04-user-profile) tutorials.

> **It is highly recommended that you take a look at the [linking accounts documentation](/link-accounts)** to understand the process of linking accounts.

## Enter Account Credentials

Here's the scenario: You have a user who is logged in and wants to link one (or multiple) accounts to that logged in account, such that the user can login with any of them and get into that account.

Typically, you will need to present an extra login dialog to make users enter the credentials for any account they want to link with their main account. You can present this login as we saw in the [login tutorial](01-login):

```swift
import Lock
```

```swift
let controller = A0Lock.sharedLock().newLockViewController()
controller.closable = true
controller.onAuthenticationBlock = { profile, token in
    // store token.idToken
    controller.dismissViewControllerAnimated(true, completion: nil)
}
A0Lock.sharedLock().presentLockController(controller, fromController: self)
```

Upon success, you need to store the `token.idToken` value for later use, which is the `idToken` for the secondary account that the user is linking with.

## Link an Account

Linking an account is simple. You have a user, and another account you want to link with that user. All you need to grab is these three values:

- `userId`: The `id` from the user that is logged in.
- `idToken`: The `idToken` obtained upon your user login.
- `otherUserToken`: The `idToken` from the account you want to link the user with. This is the value you stored in step 1.

```swift
import Auth0
```

```swift
let userId = ... // the user id
let idToken = ... // the user idToken
let otherUserToken = ... // the idToken from the account you want to link the user with
Auth0
    .users(token: idToken)
    .link(userId, withOtherUserToken: otherUserToken)
    .start { result in
        switch result {
        case .Success:
            // linked account!
        case .Failure(let error):
            // deal with error
        }
    }
```

## Retrieve Linked Accounts

Linked accounts, a.k.a. user's identities, can be easily retrieved by fetching the user profile, a process that we already know from the [user profile](04-user-profile) tutorial:

```swift
import Lock
```

```swift
let client = A0Lock.sharedLock().apiClient()
client.fetchUserProfileWithIdToken(idToken,
    success: { profile in
        let identities = profile.identities as! [A0UserIdentity] 
        // you've got the linked accounts here
        // do something with them, e.g. display them on a table view
    }, failure: { error in
        // deal with error
    })
```

> Any linked account is handled as an `A0UserProfile` identity object. For further information on this object, check out its [class documentation](https://github.com/auth0/Lock.iOS-OSX/blob/master/Lock/Core/A0UserIdentity.h).

## Unlink an Account

The unlinking process is quite similar to the linking one. This time, you just need the `userId`, the user's `idToken`, and the `identity` object that you want to unlink (you will only use its `userId` and `provider` values):

```swift
import Auth0
```

```swift
let userId = ... // the user id
let idToken = ... // the user idToken
let identity: A0UserIdentity = ... // the identity (account) you want to unlink from the user
Auth0
    .users(token: idToken)
    .unlink(identityId: identity.userId, provider: identity.provider, fromUserId: userId)
    .start { result in
            switch result {
            case .Success:
                // unlinked account!
            case .Failure(let error):
                // deal with error
            }
     }
```