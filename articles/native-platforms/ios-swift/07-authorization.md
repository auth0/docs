---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to perform certain actions in the app.
budicon: 500
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-sample',
  path: '07-Authorization'
}) %>

Many identity providers will supply access claims, like roles or groups, with the user. You can request these in your token by setting `scope: openid roles` or `scope: openid groups`. However, not every identity provider provides this type of information. Fortunately, Auth0 has an alternative to it, which is creating a rule for assigning different roles to different users.

> This tutorial assumes that you've already read the [rules tutorial](06-rules) and you know how to implement a basic rule in your app.

## Before Starting

It's required that you've got [Lock](https://github.com/auth0/Lock.iOS-OSX) integrated in your project. You can check out the [login tutorial](01-login) for more information about it.

## Create a Rule to Assign Roles

First, you will create a rule that assigns your users either an `admin` role, or a single `user` role. To do so, go to the [new rule page](${manage_url}/#/rules/new) and select the "*Set Roles To A User*" template, under *Access Control*. Then, replace this line from the default script:

```
if (user.email.indexOf('@example.com') > -1)
```

to match the condition that fits your needs. Notice that you can also set more roles other than `admin` and `user`, or customize the whole rule as you please.

By default, it says that if a user email contains `@example.com`, that user will be given an `admin` role, otherwise a regular `user` role.

## Test the Rule

To test the rule, use the following code snippet once you've gotten the user profile.

> Check out the [login](01-login) and [user profile](04-user-profile) tutorials for more information on how to get the user profile.

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

## Use the Rule

At this point, you are able to distinguish the users' roles in your app to authorize or deny access to a certain feature.

All you have to do here is to replace the `print` statements from the previous step with the instructions you need to execute depending on your business rules.
