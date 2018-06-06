---
title: Linking Accounts
description: This tutorial will show you how to link multiple accounts within the same user.
budicon: 345
tags:
  - quickstarts
  - native
  - ios
  - objective-c
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-objc-sample',
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
* You are familiar with presenting the login screen. To learn more, see the [Login](/quickstart/native/ios-objc/00-login) and the [User Sessions](/quickstart/native/ios-objc/03-user-sessions) tutorials.

We recommend that you read the [Linking Accounts](/link-accounts) documentation to understand the process of linking accounts.

## Enter Account Credentials

Your users may want to link their other accounts to the account they are logged in to. 

To achieve this, present an additional login dialog where your users can enter the credentials for any additional account. You can present this dialog as described in the [Login](/quickstart/native/ios-objc/00-login#implement-the-login) tutorial.

After the user authenticates, save the `idToken` value for the secondary account.

<%= include('../_includes/_ios_link_accounts') %>

${snippet(meta.snippets.setup)}

To link accounts:

```objc
// ProfileViewController.m

NSString *id = ... // the id of the user, available in profile.sub
NSString *idToken = ... // the user's idToken
NSString *otherUserToken = ... // the idToken from the account you want to link the user with
[auth linkUserAccountWithIdToken:idToken userId:id otherAccountToken:otherUserToken
      callback:^(NSError * _Nullable error, NSArray<NSDictionary<NSString *,id> *> * _Nullable payload) {
          if (error) {
              // Handler Error
          } else {
              // Success account was linked
          }
}];
```

## Retrieve the Linked Accounts

Once you have the `id` value from the `profile.sub`, you can retrieve user identities. Call the management API:

```objc
// HomeViewController.m

HybridAuth *auth = [[HybridAuth alloc] init];
[auth userProfileWithIdToken:idToken userId:id callback:^(NSError * _Nullable error, NSDictionary<NSString *, id> * _Nullable user) {
    if (error) {
        // Handle error
    } else {
        NSArray *identities = [[NSArray alloc] init];
        for (NSDictionary *identity in [user objectForKey:@"identities"]) {
           identities = [identities arrayByAddingObject:[[A0Identity alloc] initWithJson:identity]];
        }
    }
}];
```

::: note
A linked account is handled as an `Identity` instance. Read more about this object in the [Identity class documentation](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Identity.swift).
:::

<%= include('../_includes/_ios_unlink_accounts') %>

Unlink the accounts:

```objc
// ProfileViewController.m
NSString *id = ... // the id of the user, available in profile.sub
NSString *idToken = ... // the user idToken
A0Identity *identity = ... // the identity (account) you want to unlink from the user
[auth unlinkUserAccountWithIdToken:idToken userId:id identity:identity callback:^(NSError * _Nullable error, NSArray<NSDictionary<NSString *,id> *> * _Nullable payload) {
    if (error) {
        // Handle Error
    } else {
        // Success, account unlinked.
    }
}];
```
