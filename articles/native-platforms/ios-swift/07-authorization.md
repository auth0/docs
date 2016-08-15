---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to perform certain actions in the app.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

- CocoaPods 1.0.0
- XCode 7.3 (7D175)
- iPhone 6 - iOS 9.3 (13E230)
  :::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ios-swift-sample/tree/master/07-Authorization',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-ios-swift-sample',
  pkgBranch: 'master',
  pkgPath: '07-Authorization',
  pkgFilePath: null,
  pkgType: 'none'
}) %>

Many identity providers will supply access claims, like roles or groups, with the user. You can request these in your token by setting `scope: openid roles` or `scope: openid groups`. However, not every identity provider provides this type of information. Fortunately, Auth0 has an alternative to it, which is creating a rule for assigning different roles to different users.

> This tutorial assumes that you've already read the [rules tutorial](06-rules.md) and you know how to implement a basic rule in your app.

### Before starting

It's required that you've got [Lock](https://github.com/auth0/Lock.iOS-OSX) integrated in your project. You can check out the [login tutorial](01-login.md) for more information about it.

### 1. Create a Rule to assign roles

First, you will create a rule that assigns your users either an `admin` role, or a single `user` role. To do so, go to the [new rule page](${uiURL}/#/rules/new) and select the "*Set Roles To A User*" template, under *Access Control*. Then, replace this line from the default script:

``` 
if (user.email.indexOf('@example.com') > -1)
```

to match the condition that fits your needs. Notice that you can also set more roles other than `admin` and `user`, or customize the whole rule as you please.

By default, it says that if the user email contains `@example.com` he will be given an `admin` role, otherwise a regular `user` role.

### 2. Test the Rule

To test the rule, use the following code snippet once you've gotten the user profile.

> Check out the [login](01-login.md) and [user profile](04-user-profile.md) tutorials for more information on how to get the user profile.

```swift
import Lock
```

```swift
let profile: A0UserProfile = ... // the user profile you get upon login
guard let roles = profile.appMetadata["roles"] as? [String] else {
    // test failed, make sure you've configured your rule properly (check step 1 thoroughly)
    return
}
if roles.contains("admin") {
    print("this user has admin access")
} else {
    print("this user does not have admin access")
}
```

Notice that you'll find the `roles` information within the `appMetadata` dictionary from the `A0UserProfile` object, that's because of what's defined inside the rule.

### 3. Do your stuff

At this point, you are able to distinguish the users' roles in your app to authorize or deny access to a certain feature.

All you have to do here is to replace the `print` statements from the previous step with the instructions you need to execute depending on your business rules.

### Done!

That's it. You're already managing roles within your app, with a few simple steps.
