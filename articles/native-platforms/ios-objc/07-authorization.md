---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to perform certain actions in the app.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* CocoaPods 1.0.0
* XCode 7.3 (7D175)
* Simulator - iPhone 6 - iOS 9.3 (13E230)
  :::

<%= include('../../includes/github', { link: 'https://github.com/auth0-samples/auth0-ios-objc-sample/tree/master/07-Authorization', }) %>

Many identity providers will supply access claims, like roles or groups, with the user. You can request these in your token by setting `scope: openid roles` or `scope: openid groups`. However, not every identity provider provides this type of information. Fortunately, Auth0 has an alternative, which is to create a rule for assigning different roles to different users.

> This tutorial assumes that you've already read the [rules tutorial](06-rules.md) and you know how to implement a basic rule in your app.

### Before Starting

It's required that you've got [Lock](https://github.com/auth0/Lock.iOS-OSX) integrated in your project. You can check out the [login tutorial](01-login.md) for more information about this process.

### 1. Create a Rule to Assigning Roles

First, you will create a rule that assigns your users either an `admin` role or a single `user` role. To do so, go to the [new rule page](${uiURL}/#/rules/new) and select the "*Set Roles to a User*" template, under *Access Control*. Then, replace this line from the default script:

``` 
if (user.email.indexOf('@example.com') > -1)
```

to match the condition that fits your needs. Notice that you can also set  roles other than `admin` and `user`, or customize the whole rule as you please.

By default, if the user email contains `@example.com` the user will be given an `admin` role, otherwise the user will be given a regular `user` role.

### 2. Test the Rule

To test the rule, use the following code snippet once you've gotten the user profile.

> Check out the [login](01-login.md) and [user profile](04-user-profile.md) tutorials for more information on how to get the user profile.

```objc
#import <Lock/Lock.h>
```

```objc

if([self.userProfile.appMetadata[@"roles"] containsObject:@"admin"]){
    //this user has admin access
} else {
    //this user does not have admin access
}
```

Notice that you'll find the `roles` information within the `appMetadata` dictionary from the `A0UserProfile` object. That's because of what's defined inside the rule.

### 3. Do Your Stuff

At this point, you are able to distinguish the users' roles in your app so you can authorize or deny access to a certain feature.

All you have to do here is to replace the commented out statements from the previous step with the instructions you need to execute depending on your business rules.

### Done!

That's it. You're already managing roles within your app, with a few simple steps.