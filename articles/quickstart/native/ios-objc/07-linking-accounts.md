---
title: Linking Accounts
description: This tutorial will show you how to link multiple accounts within the same user.
budicon: 345
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

## Before Starting

You should be familiar with previous tutorials. This tutorial assumes that:

- You've integrated the [Auth0.swift](https://github.com/auth0/Auth0.swift/) dependencies in your project and you're familiar with presenting the Login. For further information, check out the [Login Guide](/quickstart/native/ios-objc/00-login) and the [User Sessions Guide](/quickstart/native/ios-objc/03-user-sessions) first.

> It is highly recommended that you take a look at the [linking accounts documentation](/link-accounts) to understand the general process of linking accounts.

## Enter Account Credentials

Here's the scenario: You have a user who is logged in and wants to link one (or multiple) accounts to that logged in account, such that the user can login with any of them and get into that account.

Typically, you will need to present an extra login dialog to make users enter the credentials for any account they want to link with their main account. You can present this login as we saw in the [Login Guide](/quickstart/native/ios-objc/00-login):

${snippet(meta.snippets.setup_wrapper)}

Then present the hosted login screen:

```objc
HybridAuth *auth = [[HybridAuth alloc] init];
[auth showLoginWithScope:@"openid profile" connection:nil callback:^(NSError * _Nullable error, A0Credentials * _Nullable credentials) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (error) {
            NSLog(@"Error: %@", error);
        } else if (credentials) {
          // Do something with credentials e.g.: save them.
          // Auth0 will dismiss itself automatically by default.
        }
    });
}];
```

Upon success, you need to store the `idToken` value for later use, which is the `idToken` for the secondary account that the user is linking with.

## Link an Account

Linking an account is simple. You have a user, and another account you want to link with that user. All you need to grab is these three values:

- `id`: The `id` from the user's profile that is logged in.
- `idToken`: The `idToken` obtained upon your user login.
- `otherUserToken`: The `idToken` from the account you want to link the user with. This is the value you stored in step 1.

${snippet(meta.snippets.setup_wrapper)}

To link an account:

```objc
NSString *id = ... // the id of the user
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

## Retrieve Linked Accounts

Linked accounts, a.k.a. the user's identities, can be retrieved by fetching the user's profile, a process that we already know from the [User Sessions Guide](/quickstart/native/ios-objc/03-user-sessions#validate-an-accesstoken):

```objc
// Retrieve profile
[auth userInfoWithAccessToken:accessToken callback:^(NSError * _Nullable error, A0Profile * _Nullable profile) {
    if (error) {
        // accessToken has expired or no longer valid
    } else {
        // The accessToken is still valid and you have the user's profile
        // This would be a good time to store the profile
    }
}];
```

Once you have the `id` from the profile you can retrieve the users identities through a management API call as follows:

```objc
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

> Any linked account is handled as a `Profile` identity object. For further information on this object, check out the [Profile class documentation](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Profile.swift)

## Unlink an Account

The unlinking process is quite similar to the linking one. This time, you just need the `id`, the user's `idToken`, and the `identity` object that you want to unlink (you will only use its `userId` and `provider` values):

```objc
NSString *id = ... // the user id in profile
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
