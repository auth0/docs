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

> **Note**: There are multiple ways of implementing the login box. What you see above is the Login Widget, but if you want, you can use [your own UI](/libraries/lock-ios/use-your-own-ui).
> Or, you can also try our passwordless Login Widgets: [SMS](/libraries/lock-ios#sms) or [TouchID](/libraries/lock-ios#touchid).

As you can see, upon successful authentication, the `onAuthenticationBlock` callback will yield the user's `profile` and `token`.

A basic example of how to use this information is:

```objc
self.usernameLabel.text = profile.name
self.emailLabel.text = profile.email
```

> For further reference on the `profile` object, check the [A0UserProfile](https://github.com/auth0/Lock.iOS-OSX/blob/master/Pod/Classes/Core/A0UserProfile.h) class documentation.
>
> To learn how to save and manage the tokens and profile in detail, please read [this guide](/libraries/lock-ios/save-and-refresh-jwt-tokens). Note that Lock on its own will not save these for you.

Done. You've implemented Login and SignUp with Auth0 in your iOS ObjectiveC project. You're awesome!

### Optional: Configure your Social Connections' Handlers

In order to have a simple login mechanism through social connections, all you have to do is enable them in your account's [dashboard](${manage_url}/#/connections/social). Every social connection you switch on there will appear in the Login screen of your app. That's pretty much it!
