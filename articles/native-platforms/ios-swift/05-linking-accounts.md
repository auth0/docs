---
title: Linking Accounts
description: This tutorial will show you how to link multiple accounts within the same user.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

- CocoaPods 1.0.0
- XCode 7.3 (7D175)
- iPhone 6 - iOS 9.3 (13E230)
  :::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ios-swift-sample/tree/master/05-Linking-Accounts',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-ios-swift-sample',
  pkgBranch: 'master',
  pkgPath: '05-Linking-Accounts',
  pkgFilePath: null,
  pkgType: 'none'
}) %>

### Before Starting

You should be familiar with previous tutorials. This tutorial assumes that:

- You've integrated [Lock](https://github.com/auth0/Lock.iOS-OSX) and [Auth0.swift](https://github.com/auth0/Auth0.swift/) dependencies in your project and you're familiar with presenting the Lock login dialog. For further information, check out the [login tutorial](01-login) and the [session handling tutorial](03-session-handling) first.
- You're familiar with the concepts of `userId` and `idToken`. You can find info about them in the [session handling](03-session-handling) and [user profile](04-user-profile) tutorials.

> **It is highly recommended that you take a look at the [linking accounts documentation](/link-accounts)** to understand the process of linking accounts.

### 1. Enter account credentials

Here's the scenario: You have a user which is logged in, and he wants to link one (or multiple) accounts to that account he's logged in with, such that, he can login with any of them and get into that account.

Typically, you will need to present an extra login dialog to make the user enter the credentials for any account he wants to link with his main account. You can present this login as we saw in the [login tutorial](01-login):

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

### 2. Link an account

Linking an account is simple. You have a user, and another account you want to link with that user. All you need to grab is these 3 values:

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

### 3. Retrieve linked accounts

Linked accounts, a.k.a. user's identities, can be easily retrieved by fetching the user profile, process that we already know from the [user profile](04-user-profile) tutorial:

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

### 4. Unlink an account

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

### Done!

That's just it! Wrapping up, you've just learned the whole process of linking accounts in your app, involving: How to link an account to a user, how to show the linked accounts for that user, and how to unlink an account from that user.