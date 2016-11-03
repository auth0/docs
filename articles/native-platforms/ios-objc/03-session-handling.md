---
title: Session Handling
description: This tutorial will show you how to handle sessions in your app, with the aim of preventing the user from being asked for credentials each time the app is launched.
budicon: 280
---

<%= include('../../_includes/_package2', {
  org: 'auth0',
  repo: 'native-mobile-samples',
  path: 'iOS/basic-sample-objc',
  requirements: [
    'CocoaPods 1.0.0 ',
    'Xcode 7.3 (7D175)',
    'Simulator - iPhone 6 - iOS 9.3 (13E230)'
  ]
}) %>

### In the Beginning

#### i. Be familiar with Auth0

This tutorial assumes you are already familiar with Auth0 and how to Sign up and Sign in using Lock or Auth0 Toolkit. **If you're not sure, check out [this tutorial](01-login) first.**

#### ii. Add the SimpleKeychain dependency


We're going to use the [SimpleKeychain](https://github.com/auth0/SimpleKeychain) library to help us manage user credentials. Make sure you integrate it before proceeding.

##### a. Carthage

If you are using Carthage, add the following line to the `Cartfile`:

```ruby
github "auth0/SimpleKeychain"
```

Then, run `carthage bootstrap`.

> For more information about Carthage usage, check [their official documentation](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos).

##### b. Cocoapods

If you are using [Cocoapods](https://cocoapods.org/), add these lines to your `Podfile`:

```ruby
pod 'SimpleKeychain', '~> 0.7'
```

Then, run `pod install`.

> For further reference on Cocoapods, check [their official documentation](http://guides.cocoapods.org/using/getting-started.html).


### 1. Save the token for later

First of all, you need to import the headers for Lock and SimpleKeychain

```objc
#import <Lock/Lock.h>
#import "SimpleKeychain.h"
```

Once your user successfully signs in, you'll have a reference to a 'A0Token' object with the user's credentials. SimpleKeychain is a simple 'key-value' storage that we can use keep safe the the user's 'id_token'.

> The `idToken` is a string representing, basically, the user's [JWT token](https://en.wikipedia.org/wiki/JSON_Web_Token).

```objc
- (void) saveCredentials:(A0Token* ) token
{
    A0SimpleKeychain* keychain = [[A0SimpleKeychain alloc] initWithService:@"Auth0"];
    [keychain setString:token.idToken forKey:@"id_token"];
    [keychain setString:token.refreshToken forKey:@"refresh_token"];
}
```

We'll be storing the 'refresh_token' too, which we'll use to get a new token, once the current one has expired.


### 2. Don't I know you from somewhere?

Once you have stored the user's token, next time the app launches, you can use it to restore the user's profile and avoid making the user have to sign in again. First, you need to check if SimpleKeychain has a token stored:

```objc
    A0SimpleKeychain* keychain = [[A0SimpleKeychain alloc] initWithService:@"Auth0"];

    if([keychain stringForKey:@"id_token"]){
      // There is a token stored

      [[A0Lock sharedLock].apiClient fetchUserProfileWithIdToken:[keychain stringForKey:@"id_token"]
      success:^(A0UserProfile * _Nonnull profile) {
          // You have successfully retreived the user's profile, you don't need to sign in again.
          // Let your user continue to the next step
    } failure:^(NSError * _Nonnull error) {
      // Something went wrong, let the user know
    }
    }
```

If the `fetchUserProfileWithIdToken:` call is successful, you can continue as if the user had signed in. But, if it failed, there could be a number of reasons for it. One option is that it has expired, in which case you still have the option to refresh it, and keep the session valid:

```objc
    [lock.apiClient fetchNewIdTokenWithRefreshToken:[keychain stringForKey:@"refresh_token"] parameters:nil success:^(A0Token * _Nonnull token) {
        [self saveCredentials:token];
        // Save the new credentials and use them instead.
     } failure:^(NSError * _Nonnull error) {
       [keychain clearAll]; // The saved token is invalid, delete them all from the keychain
    // Something went wrong, let the user know
  }];
```

If the `fetchNewIdTokenWithRefreshToken` call fails, it means your token has been revoked or for what ever reason it's become invalid. In this case, the user will have to sign in again.

>It's recommendable that you read and understand the [refresh token documentation](/refresh-token) before proceeding. **You got to keep on mind, for example, that, even though the refresh token cannot expire, it can be revoked.**

### 3. Sign out

Last, when you have to sign out, you only need to clear the keychain.

```objc
    A0SimpleKeychain* keychain = [[A0SimpleKeychain alloc] initWithService:@"Auth0"];
    [keychain clearAll];
```

### 3. And we are done

Now you can let your user's persist their sign in session.
