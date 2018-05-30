---
section: libraries
title: Passwordless in Lock iOS v1
description: How to implement Passwordless authentication in Lock v1
tags:
  - libraries
  - lock
  - ios
  - passwordless
---
# Passwordless in Lock iOS v1

<%= include('../_includes/_lock-version-1') %>

<%= include('../../../_includes/_native_passwordless_warning') %>

## Passwordless with SMS

`A0SMSLockViewController` authenticates without using a password with SMS. In order to be able to authenticate the user, your application must have the SMS connection enabled and configured in your [dashboard](${manage_url}/#/connections/passwordless).

First instantiate `A0SMSLockViewController` and register the authentication callback that will receive the authenticated user's credentials.

The next step is register a block to return an API Token used to register the  phone number and send the login code with SMS. This token can be generated in  [Auth0 API v2 page](/api/v2), just select the scope `create:users` and copy the generated API Token.

Finally present it to the user:
```objc
A0Lock *lock = ... //Fetch Lock from where its stored
A0SMSLockViewController *controller = [lock newSMSViewController];
controller.auth0APIToken = ^{
    return @"Copy API v2 token here";
};
controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
    // Do something with token & profile (such as save them).
    // Lock will not save the Token and the profile for you.
    // And dismiss the UIViewController.
    [self dismissViewControllerAnimated:YES completion:nil];
};
[lock presentSMSController:controller fromController:self];
```

```swift
let lock = ... // Fetch Lock from where its stored
let controller: A0SMSLockViewController = lock.newSMSViewController()
controller.onAuthenticationBlock = { (profile, token) in
   // Do something with token & profile (such as save them).
   // Lock will not save the Token and the profile for you.
   // And dismiss the UIViewController.
   self.dismiss(animated: true, completion: nil)
}
lock.presentSMSController(controller, from: self)
```
And you'll see SMS login screen

![Lock SMS Screenshot](/media/articles/libraries/lock-ios/Lock-SMS-Screenshot.png)

## Passwordless with Touch ID

Lock provides passwordless authentication with Touch ID for your Auth0 DB connection. To start authenticating your users with Touch ID please follow those steps:

1. Add `TouchID` subspec module of **Lock** to your `Podfile`
  ```ruby
  pod 'Lock/TouchID'
  ```

1. Import **Lock**'s umbrella header
  ```objc
  #import <Lock/Lock.h>
  ```
  ::: note
  If your are coding in Swift, you need to import the header in your app's [Bridging Header](https://developer.apple.com/library/ios/documentation/swift/conceptual/buildingcocoaapps/MixandMatch.html).
  :::

1. Instantiate `A0TouchIDLockViewController` and register authentication callback
  ```objc
  A0TouchIDLockViewController *controller = [[A0TouchIDLockViewController alloc] init];
  controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
      //Store token & profile. For example in the keychain using SimpleKeychain.
      [self dismissViewControllerAnimated:YES completion:nil];
  };
  ```
  ```swift
  let lock = A0Lock.shared()
  let controller: A0TouchIDLockViewController = lock.newTouchIDViewController()
  controller.onAuthenticationBlock = { (profile, token) in
      // Do something with token & profile (such as save them).
      // Lock will not save the Token and the profile for you.
      // And dismiss the UIViewController.
      self.dismiss(animated: true, completion: nil)
  }
  ```

1. Present `A0TouchIDLockViewController` as the root controller of a `UINavigationController`
  ```objc
  UINavigationController *navController = [[UINavigationController alloc] initWithRootViewController:controller];
  if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
      navController.modalPresentationStyle = UIModalPresentationFormSheet;
  }
  [self presentViewController:navController animated:YES completion:nil];
  ```
  ```swift
  let navController = UINavigationController(rootViewController: controller)
  if UIDevice.current.userInterfaceIdiom == .pad {
      navController.modalPresentationStyle = .FormSheet
  }
  self.presentViewController(navController, animated: true, completion:nil)
  ```
  ::: note
  It's mandatory to present `A0TouchIDLockViewController` embedded in a `UINavigationController`.
  :::

And you'll see TouchID login screen.

![Lock Screenshot](/media/articles/libraries/lock-ios/Lock-TouchID-Screenshot.png)
