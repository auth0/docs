---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to perform certain actions in the app.
budicon: 500
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-sample',
  path: '05-Authorization',
  requirements: [
    'CocoaPods 1.0.0',
    'XCode 7.3 (7D175)',
    'iPhone 6 - iOS 9.3 (13E230)'
  ]
}) %>

Many identity providers will supply access claims, like roles or groups, with the user. You can request these in your token by setting `scope: openid roles` or `scope: openid groups`. However, not every identity provider provides this type of information. Fortunately, Auth0 has an alternative to it, which is creating a rule for assigning different roles to different users.

## Before Starting

You need to know how to retrieve a user's pofile, check the [user sessions](/quickstart/native/ios-swift/03-user-sessions) tutorial for more information on how to get the user profile.

## Create a Rule to Assign Roles

To create a rule, just go to the [new rule page](${manage_url}/#/rules/new). You can create it from scratch or use an existing template.  These templates are written by Auth0 team to assist you complete common tasks.

First, you will create a rule that assigns your users either an `admin` role, or a single `user` role. To do so, go to the [new rule page](${manage_url}/#/rules/new) and select the "*Set Roles To A User*" template, under *Access Control*. Then, replace this line from the default script:

```
if (user.email.indexOf('@example.com') > -1)
```

to match the condition that fits your needs. Notice that you can also set more roles other than `admin` and `user`, or customize the whole rule as you please.

By default, it says that if a user email contains `@example.com`, that user will be given an `admin` role, otherwise a regular `user` role.

## Test the Rule

```swift
import Lock
```

```swift
let profile: Profile = ... // the user profile you get upon login
guard let roles = profile.appMetadata["roles"] as? [String] else {
    // Test failed, make sure you've configured your rule properly (check step 1 thoroughly)
    return
}
if roles.contains("admin") {
    // User has admin access, grant them the power.
} else {
    // Not an admin, deny the user.
}
```

Notice that you'll find the `roles` information within the `appMetadata` dictionary from the `Profile` object, that's because of what's defined inside the rule.

## Use the Rule

At this point, you are able to distinguish the users' roles in your app to authorize or deny access to a certain feature.
