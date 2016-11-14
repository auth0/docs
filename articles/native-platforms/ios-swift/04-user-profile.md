---
title: User Profile
description: This tutorial will show you how to access the user profile from within your app, as well as how to update it.
budicon: 292
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-sample',
  path: '04-User-Profile'
}) %>

### Before Starting

You should be familiar with previous tutorials. This tutorial assumes:

- You're using the Lock library for handling login. Make sure you've integrated this library into your project and you're familiar with it. **If you're not sure, check out the [login tutorial](01-login) first.**
- You're using the Auth0.swift and SimpleKeychain dependencies. **It's recommended that you take a look at the [session handling tutorial](03-session-handling) first.**

## Fetch the User Profile

The first step is to fetch the user profile. To do so, you need a valid `idToken` first.

> Check out the [session handling tutorial](03-session-handling) if you're not sure about the `idToken`.

You need to call a function from the `Lock` module that allows you to fetch the user profile given an `idToken`:

```swift
import Lock
```

```swift
let client = A0Lock.sharedLock().apiClient()
client.fetchUserProfileWithIdToken(idToken,
    success: { profile in
        // You've got the user profile here!
        // You might want to store it in a safe place. You can use SimpleKeychain:
        let keychain = A0SimpleKeychain(service: "Auth0")
        let profileData = NSKeyedArchiver.archivedDataWithRootObject(profile)
        keychain.setData(profileData, forKey: "profile")
    }, failure: { error in
        // check the session handling tutorial for hints on what to do in case of a failure
    })
```

## Show User Profile's Data

#### i. Default info

Showing the information contained in the user profile is pretty simple. You only have to access its properties, for instance:

```swift
let name = profile.name
let email = profile.email
let avatarURL = profile.picture
```

> Check out the [A0UserProfile](https://github.com/auth0/Lock.iOS-OSX/blob/master/Pod/Classes/Core/A0UserProfile.h) class documentation to learn more about its fields.

#### ii. Additional info

Besides the defaults, you can handle more information that is contained within any of the following dictionaries:

##### a. User Metadata

The `userMetadata` dictionary contains fields related to the user profile that can be added from client-side (e.g. when editing the profile). This is the one we're going to work with in this tutorial. You can access its fields as follows:

```swift
let firstName = profile.userMetadata["first_name"] as? String
let lastName = profile.userMetadata["last_name"] as? String
let country = profile.userMetadata["country"] as? String
let isActive = profile.userMetadata["active"] as? Bool
```

> The strings you use for subscripting the `userMetadata` dictionary, and the variable types you handle, are up to you.

##### b. App Metadata

The `appMetadata` dictionary contains fields that are usually added via [a rule](06-rules), which is read-only for the native platform.

##### c. Extra Info

The `extraInfo` dictionary contains any other extra information stored in Auth0. That information is read-only for the native platform.

> For further information on metadata, see [the full documentation](/rules/metadata-in-rules).

## Update the User Profile

You can only update the user metadata. In order to do so, you need to perform a `patch`:

```swift
import Auth0
import Lock
```

```swift
let idToken = ... // the idToken you obtained before
let profile = ... // the A0Profile instance you obtained before
Auth0
    .users(token: idToken)
    .patch(profile.userId, userMetadata: ["first_name": "John", "last_name": "Appleseed", "country": "Canada"]
    .start { result in
        switch result {
        case .Success:
            // deal with success
        case .Failure(let error):
            // deal with failure
        }
}
```
