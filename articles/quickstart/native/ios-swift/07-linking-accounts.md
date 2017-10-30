---
title: Linking Accounts
description: This tutorial will show you how to link multiple accounts within the same user.
budicon: 345
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-sample',
  path: '07-Linking-Accounts',
  requirements: [
    'CocoaPods 1.2.1',
    'Version 8.3.2 (8E2002)',
    'iPhone 7 - iOS 10.3 (14E269)'
  ]
}) %>

## Before You Start

Before you continue with this tutorial, make sure that you have completed the previous tutorials. This tutorial assumes that:
* You have integrated [Auth0.swift](https://github.com/auth0/Auth0.swift/) as a dependency in your project. 
* You are familiar with presenting the login screen. To learn more, see the [Login](/quickstart/native/ios-swift/00-login) and the [User Sessions](/quickstart/native/ios-swift/03-user-sessions) tutorials.

We recommend that you read the [Linking Accounts](/link-accounts) documentation to understand the process of linking accounts.

## Enter Account Credentials

Your users may want to link their other accounts to the account they are logged in to. 

To achieve this, present an additional login dialog where your users can enter the credentials for any additional account. You can present this dialog in the way described in the [Login](/quickstart/native/ios-swift/00-login#enter-account-credentials) tutorial.

After the user authenticates, save the `idToken` value for the secondary account.

## Link the Accounts

Now, you can link the accounts. To do this, you need the following values: 
- `id`: the logged-in user's ID (see `profile.sub`)
- `idToken`: the ID token for the saved account the user initially logged in to 
- `otherUserToken`: the ID token for the second account received in the last login response

```swift
import Auth0
```

```swift
// UserIdentitiesViewController.swift

Auth0
    .users(token: idToken)
    .link(id, withOtherUserToken: otherUserToken)
    .start { result in
        switch result {
        case .success:
            // The account was linked
        case .failure(let error):
            // Handler Error
        }
    }
```

## Retrieve the Linked Accounts

You can retrieve the linked accounts (user identities). To achieve this, fetch the user's profile as shown in the [User Sessions](/quickstart/native/ios-swift/03-user-sessions#validate-an-accesstoken) tutorial:

```swift
// SessionManager.swift

Auth0
    .authentication()
    .userInfo(withAccessToken: accessToken)
    .start { result in
        switch(result) {
        case .success(let profile):
            // Store profile
        case .failure(let error):
            // Handle error
        }
```

Once you have the `sub` value from the profile, you can retrieve user identities. Call the management API:

```swift
// SessionManager.swift

Auth0
    .users(token: idToken)
    .get(profile.sub, fields: ["identities"], include: true)
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

::: note
A linked account is handled as an `Identity` instance. Read more about this object in the [Identity class documentation](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Identity.swift).
:::

## Unlink the Accounts

To unlink the accounts, you need to specify the following: 
* the `id` value in the user's ID token
* the `userId` and `provider` values in the `identity` object you want to unlink

Unlink the accounts:

```swift
// UserIdentitiesViewController.swift

let id = ... // the user id. (See profile.sub)
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
