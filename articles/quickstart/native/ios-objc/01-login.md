---
title: Login
description: This tutorial will show you how to integrate Lock in your iOS ObjectiveC project in order to present a login screen.
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-objc-sample',
  path: '01-Login',
  requirements: [
    'CocoaPods 1.1.1',
    'Version 8.2 (8C38)',
    'iPhone 6 - iOS 10.2 (14C89)'
  ]
}) %>

### Implement the Login

At this point, you're all set to implement the Login.

First, import the `Lock` module in the file where you want to present the login dialog:

```objc
#import <Lock/Lock.h>
```

Then, configure and present the login screen, like this:

```objc
A0Lock *lock = [A0Lock sharedLock];

A0LockViewController *controller = [lock newLockViewController];
controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
    // Do something with token & profile. e.g.: save them.
    // And dismiss the ViewController
    [self dismissViewControllerAnimated:YES completion:nil];
};
[self presentViewController:controller animated:YES completion:nil];

```

[![Lock.png](/media/articles/native-platforms/ios-objc/Lock-Widget-Screenshot.png)](https://auth0.com)

> **Note**: There are multiple ways of implementing the login box. What you see above is the Login Widget, but if you want, you can use [your own UI](/quickstart/native/ios-objc/02-custom-login).
> Or, you can also try our passwordless Login Widgets: [SMS](/libraries/lock-ios/v1/sms-lock-ios) or [Touch ID](/libraries/lock-ios/v1/touchid-authentication).

As you can see, upon successful authentication, the `onAuthenticationBlock` callback will yield the user's `profile` and `token`.

A basic example of how to use this information is:

```objc
self.usernameLabel.text = profile.name
self.emailLabel.text = profile.email
```

> For further reference on the `profile` object, check the [A0UserProfile](https://github.com/auth0/Lock.swift/blob/v1/Lock/Core/A0UserProfile.h) class documentation.
>
> To learn how to save and manage the tokens and profile in detail, please read [this guide](/libraries/lock-ios/save-and-refresh-jwt-tokens). Note that Lock on its own will not save these for you.

You've implemented Login and SignUp with Auth0 in your iOS ObjectiveC project. You're awesome!

## Social Connections

In order to have a simple login mechanism through social connections, all you have to do is enable them in your account's [dashboard](${manage_url}/#/connections/social). Every social connection you switch on there will appear in the Login screen of your app.

Then, add the following function in your application's `AppDelegate`:

```swift
#import <Lock/Lock.h>
```

```objc
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    return [[A0Lock sharedLock] handleURL:url sourceApplication:sourceApplication];
}
```

### Important: Google Connections

Google no longer support web-views, it is *highly recommended* you update your code to use Safari for web based authentication.

##### Podfile

Update your Podfile to include:

```ruby
pod 'Lock/Safari'
```

You should add the following code before you present Lock to the user. If you have multiple connections you wish to
use with Safari you will need to specify each one manually as above.

To use Safari for the default Google social connection, add the following before you present Lock.

```objc
#import <Lock/A0SafariAuthenticator.h>
```

```objc
A0Lock *lock = [A0Lock sharedLock];
A0SafariAuthenticator *safari = [[A0SafariAuthenticator alloc] initWithLock:lock connectionName:@"google-oauth2"];
[lock registerAuthenticators:@[safari]];   
```

## Native Social Connections

Lock also provides native authentication for Facebook, Google and Twitter.  You can find these Lock plugins and installation instructions at the following:

- [Lock Facebook](https://github.com/auth0/Lock-Facebook.iOS)
- [Lock Google](https://github.com/auth0/Lock-Google.iOS)
- [Lock Twitter](https://github.com/auth0/Lock-Twitter.iOS)
