---
title: User Profile
description: This tutorial will show you how to access the user profile from within your app, as well as how to update it.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* CocoaPods 1.0.0
* XCode 7.3 (7D175)
* Simulator - iPhone 6 - iOS 9.3 (13E230)
  :::

<%= include('../_includes/_package', {
  pkgRepo: 'native-mobile-samples',
  pkgBranch: 'master',
  pkgPath: 'iOS/basic-sample-swift',
  pkgFilePath: 'iOS/basic-sample-swift/SwiftSample/Info.plist',
  pkgType: 'replace'
}) %>

### Before Starting

You should be familiar with previous tutorials. This tutorial assumes:

- You're using the Lock library for handling login. Make sure you've integrated this library into your project and you're familiar with it. **If you're not sure, check out the [login tutorial](01-login.md) first.**
- You're using the Auth0.swift and SimpleKeychain dependencies. **It's recommended that you take a look at the [session handling tutorial](03-session-handling.md) first.**

### 1. Fetch the User Profile

First step is to fetch the user profile. To do so, you need a valid `idToken` first.

> Check out the [session handling tutorial](03-session-handling.md) if you're not sure about the `idToken`.

You need to call a function in the `Auth0.swift` toolkit that allows you to fetch the user profile given an `idToken`: 

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

### 2. Show User Profile's data

#### i. Default info

Showing the information contained in the user profile is pretty simple. You only have to access its properties, for instance:

```swift
let name = profile.name
let email = profile.email
let avatarURL = profile.picture
```

> You can check out the [A0UserProfile](https://github.com/auth0/Lock.iOS-OSX/blob/master/Pod/Classes/Core/A0UserProfile.h) class documentation to learn more about its fields.

#### ii. User metadata

Besides the defaults, you can handle your own custom fields by accessing the `userMetadata` dictionary property, for instance:

```swift
let firstName = profile.userMetadata["first_name"] as? String
let lastName = profile.userMetadata["last_name"] as? String
let country = profile.userMetadata["country"] as? String
let isActive = profile.userMetadata["active"] as? Bool
```

> The strings you use for subscripting the `userMetadata` dictionary, and the variable types you handle, are up to you.

### 3. Update the User Profile

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

### Done!

That's pretty much it! You've fetched and stored the user profile, played with it, an even updated it, in just a few simple steps.