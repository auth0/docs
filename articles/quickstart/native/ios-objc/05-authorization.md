---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to perform certain actions in the app.
budicon: 500
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-objc-sample',
  path: '05-Authorization',
  requirements: [
    'CocoaPods 1.2.1',
    'Version 8.3.2 (8E2002)',
    'iPhone 7 - iOS 10.3 (14E269)'
  ]
}) %>

Many identity providers will supply access claims, like roles or groups, with the user. You can request these in your token by setting `scope: openid roles` or `scope: openid groups`. However, not every identity provider provides this type of information. Fortunately, Auth0 has an alternative to it, which is creating a rule for assigning different roles to different users.

## Create a Rule to Assign Roles

To create a rule, just go to the [new rule page](${manage_url}/#/rules/new). You can create it from scratch or use an existing template.  These templates are written by Auth0 team to assist you complete common tasks.

First, you will create a rule that assigns your users either an `admin` role, or a single `user` role. To do so, go to the [new rule page](${manage_url}/#/rules/new) and select the "*Set Roles To A User*" template, under *Access Control*. Then, replace this line from the default script:

```
if (user.email.indexOf('@example.com') > -1)
```

to match the condition that fits your needs. Notice that you can also set more roles other than `admin` and `user`, or customize the whole rule as you please.

By default, it says that if a user email contains `@example.com`, that user will be given an `admin` role, otherwise a regular `user` role.

## Test the Rule

${snippet(meta.snippets.setup)}

```objc
NSString *userId = ... // the user's profile id
HybridAuth *auth = [[HybridAuth alloc] init];
[auth userProfileWithIdToken:idToken userId:userId callback:^(NSError * _Nullable error, NSDictionary<NSString *, id> * _Nullable user) {
  if (error) {
    // Handle error
  } else {
     NSDictionary *metaData = [user objectForKey:@"app_metadata"];
     NSArray *roles = [metaData objectForKey:@"roles"];
     if (![roles containsObject:@"admin"]) {
        // Not an admin user, access denied.
     } else {
        // Admin user, grant access
        [self performSegueWithIdentifier:@"AdminSegue" sender:nil];
     }
   }
}];
```

## Use the Rule

At this point, you are able to distinguish the users' roles in your app to authorize or deny access to a certain feature.
