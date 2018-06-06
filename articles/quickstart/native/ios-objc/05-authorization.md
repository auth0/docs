---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to perform certain actions in the app.
budicon: 500
tags:
  - quickstarts
  - native
  - ios
  - objective-c
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

Many identity providers supply access claims which contain, for example, user roles or groups. You can request the access claims in your token with `scope: openid roles` or `scope: openid groups`.

If an identity provider does not supply this information, you can create a rule for assigning roles to users. 

## Create a Rule to Assign Roles

Create a rule that assigns the following access roles to your user: 
* An admin role
* A regular user role

To assign roles, go to the [New rule](${manage_url}/#/rules/new) page. In the **Access Control** section, select the **Set roles to a user** template. 

Edit the following line from the default script to match the conditions that fit your needs:

```
if (user.email.indexOf('@example.com') > -1)
```

The rule is checked every time a user attempts to authenticate. 

* If the user has a valid email and the domain is `@example.com`, the user gets the admin role.
* If the email contains anything else, the user gets the regular user role.
 
::: note
Depending on your needs, you can define roles other than admin and user. Read about the names you give your claims in the [Rules documentation](/rules#hello-world).
:::

## Test the Rule in Your Project

${snippet(meta.snippets.setup)}

```objc
// ProfileViewController.m

NSString *userId = ... // the id of the user, available in profile.sub
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

## Restrict Content Based on Access Level

Now you can recognize the users with different roles in your app. You can use this information to give and restrict access to selected features in your app to users with different roles.

In the sample project, the user with the admin role can access the admin panel.