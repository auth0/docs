---
section: libraries
toc: true
description: User Management with Auth0.Swift
topics:
  - libraries
  - swift
  - users
contentType: how-to
useCase: enable-mobile-auth
---

# User Management with Auth0.Swift

The Management API provides [User Account Linking](/users/concepts/overview-user-account-linking), which allows you to link and unlink separate user accounts from different providers, tying them to a single profile. It also allows you to update user metadata and other profile information.

## Link users

Linking user accounts will allow a user to authenticate from any of their accounts and, no matter which one they use, still pull up the same profile upon login. Auth0 treats all of these accounts as separate profiles by default, so if you wish for a user's accounts to be linked, this is the way to go.

The `link` method accepts two parameters: the primary profile's user ID and the secondary profile's Access Token (the token obtained after login with this identity). The user ID in question is the unique identifier for this user account. If the ID is in the format `facebook|1234567890`, the ID required is the portion after the delimiting pipe (in this case, `1234567890`).

```swift
Auth0
   .users(token: "user-scoped access token")
   .link(userId, withOtherUserToken: "another user token")
   .start { result in
      switch result {
      case .success(let userInfo):
        print("User: \(userInfo)")
      case .failure(let error):
        print(error)
      }
   }
```

## Unlink users

Unlinking users is a similar process to linking users. The `unlink` method takes three parameters: the secondary profile's user ID, the secondary profile's provider (the connection's identity provider), and the primary profile's user ID.
The parameters read, essentially: "Unlink this **secondary user** (with this **provider**) from this **primary user**".

```swift
Auth0
   .users(token: "user-scoped access token")
   .unlink(identityId: identifier, provider: provider, fromUserId:userId)
   .start { result in
      switch result {
      case .success(let userInfo):
        print("User: \(userInfo)")
      case .failure(let error):
        print(error)
      }
   }
```

::: note
Note that when accounts are linked, the metadata from the secondary account's profile is not merged with the metadata from the primary account's profile. Similarly, when unlinking accounts, the secondary account's profile does not retain metadata from the primary account's profile.
:::

## Retrieve user metadata

```swift
Auth0
    .users(token: "user-scoped access token")
    .get(userId, fields: ["user_metadata"], include: true)
    .start { result in
        switch result {
        case .success(let userInfo):
            print("User: \(userInfo)")
        case .failure(let error):
            print(error)
        }
    }
```

## Update user metadata

When updating user metadata, you will create a `userMetadata` object and then call the `patch` method, passing it the user ID and the `userMetadata` object. The values in this object will overwrite existing values with the same key, or add new ones for those that don't yet exist in the user metadata.

```swift
Auth0
    .users(token: "user-scoped access token")
    .patch("user identifier", userMetadata: ["first_name": "John", "last_name": "Doe"])
    .start { result in
        switch result {
        case .success(let userInfo):
          print("User: \(userInfo)")
        case .failure(let error):
          print(error)
        }
    }
```
