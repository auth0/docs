---
title: User Sessions
description: This tutorial will show you how to handle user sessions and retrieve the user's profile.
budicon: 280
github:
    path: 03-User-Session
---

## Before You Start

Before you continue with this tutorial, make sure that you are using the Swift wrapper and the Auth0 library to handle login. For more information, read the [Login](/quickstart/native/ios-objc/00-login) guide.

## Add the SimpleKeychain Dependency

Integrate the [SimpleKeychain](https://github.com/auth0/SimpleKeychain) library for managing user credentials.

### Carthage

If you are using Carthage, add the following to your `Cartfile`:

```ruby
github "auth0/SimpleKeychain"
```

Then, run `carthage bootstrap`.

::: note
For more information on how to use Carthage, read [their official documentation](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos).
:::

### Cocoapods

If you are using [Cocoapods](https://cocoapods.org/), add the following to your `Podfile`:

```ruby
pod 'SimpleKeychain', '~> 0.7'
```

Then, run `pod install`.

::: note
For more information on how to use Cocoapods, read the [Cocoapods documentation](http://guides.cocoapods.org/using/getting-started.html).
:::

## Save User Credentials When They Log in

When your users log in successfully, save their credentials. You can then log them in automatically when they open your application again.

${snippet(meta.snippets.setup)}

Then, present the hosted login screen:

```objc
// HomeViewController.m

HybridAuth *auth = [[HybridAuth alloc] init];
[auth showLoginWithScope:@"openid profile" connection:nil callback:^(NSError * _Nullable error, A0Credentials * _Nullable credentials) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (error) {
            NSLog(@"Error: %@", error);
        } else if (credentials) {
          // Do something with credentials such as save them.
          // Auth0 will dismiss itself automatically by default.
        }
    });
}];
```

You need a valid Access Token. You can find the token in the `credentials` object. To save the Access Token, use an `A0SimpleKeychain` instance. `SimpleKeychain` can be a key-value storage.

```objc
// HomeViewController.m

A0SimpleKeychain *keychain = [[A0SimpleKeychain alloc] initWithService:@"Auth0"];
[keychain setString:accessToken forKey:@"access_token"];
```

## Check for an Access Token When the User Opens Your Application

When the user opens your application, check for an Access Token. If it exists, you can log the user in automatically and redirect them to the app's main flow without any additional login steps.

First, retrieve the Access Token value from the `accessToken` key in the keychain:

```objc
// HomeViewController.m

A0SimpleKeychain *keychain = [[A0SimpleKeychain alloc] initWithService:@"Auth0"];
NSString* accessToken = [keychain stringForKey:@"access_token"];
if (accessToken) {
    // accessToken exists
    // You still need to validate it!
}
```

## Validate the Access Token

Check if the user's Access Token is still valid. Use `Auth0` to fetch the user's profile:

```objc
// HomeViewController.m

[auth userInfoWithAccessToken:accessToken callback:^(NSError * _Nullable error, UserInfo * _Nullable profile) {
        if (error) {
            // accessToken has expired or no longer valid
        } else {
            // The accessToken is still valid and you have the user's profile
            // This would be a good time to store the profile
        }
}];
```

## Deal with a Non-Valid Access Token

Decide how to deal with a non-valid Access Token. You can choose between two options:
* Ask users to re-enter their credentials.
* Use `.renew(withRefreshToken: refreshToken)` with a [refresh_token](/refresh-token) to obtain a new valid Access Token.

If you want to ask your users to re-enter their credentials, clear all the values stored in the keychain:

```objc
// HomeViewController.m
A0SimpleKeychain *keychain = [[A0SimpleKeychain alloc] initWithService:@"Auth0"];
[keychain clearAll];
```

The rest of this tutorial shows you how to use a Refresh Token to obtain a new Access Token. 

The Refresh Token is a token string stored in the `Credentials` object after a successful login. The Refresh Token doesn't expire. 

::: note
Even though the Refresh Token cannot expire, it can be revoked. For more information, read the [Refresh Token documentation](/refresh-token) before you proceed with this tutorial.
:::

### Store the Refresh Token

::: note 
If you do not send `offline_access` as a scope during authentication, the Refresh Token will be `nil`.
:::

To get a new Access Token, you need to first save the Refresh Token after the user logs in. Go to the section where you're saving the Access Token and update it as follows: 

```objc
// HomeViewController.m

HybridAuth *auth = [[HybridAuth alloc] init];
[auth showLoginWithScope:@"openid profile offline_access" connection:nil callback:^(NSError * _Nullable error, A0Credentials * _Nullable credentials) {
       if (error) {
           // Handle the error
       } else {
           [auth userInfoWithAccessToken:accessToken callback:^(NSError * _Nullable error, UserInfo * _Nullable profile) {
               if (error) {
                     NSLog(@"Error: %@", error.localizedDescription);
               } else {
                     A0SimpleKeychain *keychain = [[A0SimpleKeychain alloc] initWithService:@"Auth0"];
                     [keychain setString:[credentials accessToken] forKey:@"access_token"];
                     [keychain setString:[credentials refreshToken] forKey:@"refresh_token"];
               }
           }];
       }
   }];
```

### Use the Refresh Token to obtain a new Access Token

Now, you can use the saved Refresh Token to obtain a new Access Token:

```objc
// HomeViewController.m

A0SimpleKeychain *keychain = [[A0SimpleKeychain alloc] initWithService:@"Auth0"];
NSString* refreshToken = [keychain stringForKey:@"refresh_token"];
if (!refreshToken) {
    [keychain clearAll];
}

HybridAuth *auth = [[HybridAuth alloc] init];
[auth renewWithRefreshToken:[keychain stringForKey:@"refresh_token"] scope:nil callback:^(NSError * _Nullable error, A0Credentials * _Nullable credentials) {
              if (error) {
                  // refreshToken is no longer valid (for example, it has been revoked)
                  // Cleaning stored values since they are no longer valid
                  [keychain clearAll];
                  // At this point, you should ask the user to enter their credentials again!
              } else {
                  // Just got a new accessToken!
                  // Don't forget to store it...
                  [keychain setString:[credentials accessToken] forKey:@"access_token"];
                  // At this point, you can log the user into your app, for example, by navigating to the corresponding screen
              }
      }];
```

## Clear the Keychain When the User Logs Out

When you need to log the user out, remove their credentials from the keychain:

```objc
// HomeViewController.m

A0SimpleKeychain *keychain = [[A0SimpleKeychain alloc] initWithService:@"Auth0"];
[keychain clearAll];
```

## Optional: Encapsulate Session Handling

Handling user sessions is not a straightforward task. You can simplify it by storing token-related information and processes in a class. The class separates the logic for handling user sessions from the View Controller layer. 

We recommend that you download the sample project from this tutorial and look at its implementation. Focus on the `SessionManager` class, which manages the session handling processes.

## Get the User Profile

To get the user profile, you need a valid Access Token. 

From the `Auth0` module, call the `userInfo` method that allows you to get the user profile:

```objc
// HomeViewController.m

// Retrieve profile
[auth userInfoWithAccessToken:accessToken callback:^(NSError * _Nullable error, UserInfo * _Nullable profile) {
        if (error) {
            // Handle the error
        } else {
            // You have the user's profile
        }
}];
```

## Show the User Profile Information

### Default information

To show the information contained in the user profile, access its properties, for example:

```objc
// ProfileViewController.m
NSURL *pictureURL = self.userProfile.picture;
NSString *name = self.userProfile.name;
```

::: note
Read the [UserInfo](https://github.com/auth0/Auth0.swift/blob/master/Auth0/UserInfo.swift) class documentation to learn more about its properties.
:::

### Additional information

You can request more information than returned in the basic profile. To do this, add `userMetadata` to the profile.

## Update the User Profile

You store additional user information in the user metadata. Perform a `patch`:

```objc
// ProfileViewController.m
NSString *idToken = ... // You will need the idToken from your credentials instance 'credentials.idToken'
UserInfo *profile = ... // the Profile instance you obtained before
HybridAuth *auth = [[HybridAuth alloc] init];
[auth patchProfileWithIdToken:idToken userId:profile.sub metaData:@{@"first_name": @"John", @"last_name": @"Doe", @"country": @"USA"} callback:^(NSError * _Nullable error, NSDictionary<NSString *, id> * _Nullable user) {
    if (error) {
        // Handle the error
    } else {
        // Success
    }
}];
```

## Retrieve User Metadata

The `user_metadata` dictionary contains fields related to the user profile. These fields can be added from client-side (for example, when the user edits their profile). 

You can specify the fields you want to retrieve, or use an empty array `[]` to pull back the complete user profile. 

Retrieve the `user_metadata` dictionary:

```objc
// HomeViewController.m
HybridAuth *auth = [[HybridAuth alloc] init];
[auth userProfileWithIdToken:idToken userId:profile.sub callback:^(NSError * _Nullable error, NSDictionary<NSString *, id> * _Nullable user) {
    if (error) {
        // Deal with error
    } else {
        NSDictionary *metaData = [user objectForKey:@"user_metadata"];
        // Access userMetadata
    }
}];
```

Access the user's metadata. You can choose the key names and types for the `user_metadata` dictionary.

```objc
// ProfileViewController.m
NSString* firstName = [metaData objectForKey:@"first_name"];
NSString* lastName = [metaData objectForKey:@"last_name"];
NSString* country = [metaData objectForKey:@"country"];
```
