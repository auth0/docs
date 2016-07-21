---
toc_title: TouchID Authentication
description:
---

# Lock iOS: TouchID Authentication

Lock provides passwordless authentication with TouchID for your Auth0 DB connection. To start authenticating your users with TouchID please follow those steps:

1. Add `TouchID` subspec module of **Lock** to your `Podfile`
  ```ruby
  pod 'Lock/TouchID'
  ```

1. Import **Lock**'s umbrella header
  ```objc
  #import <Lock/Lock.h>
  ```
  > If your are coding in Swift, you need to import the header in your app's [Bridging Header](https://developer.apple.com/library/ios/documentation/swift/conceptual/buildingcocoaapps/MixandMatch.html)

1. Instantiate `A0TouchIDLockViewController` and register authentication callback
  ```objc
  A0TouchIDLockViewController *controller = [[A0TouchIDLockViewController alloc] init];
  controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
      //Store token & profile. For example in the keychain using SimpleKeychain.
      [self dismissViewControllerAnimated:YES completion:nil];
  };
  ```
  ```swift
  let controller = A0TouchIDLockViewController()
  controller.onAuthenticationBlock = { (profile, token) -> () in
      //Store token & profile. For example in the keychain using SimpleKeychain.
      self.dismissViewControllerAnimated(true, completion:nil)
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
  if UIDevice.currentDevice().userInterfaceIdiom == .Pad {
      navController.modalPresentationStyle = .FormSheet
  }
  self.presentViewController(navController, animated: true, completion:nil)
  ```
  > It's mandatory to present `A0TouchIDLockViewController` embedded in a `UINavigationController`.

And you'll see TouchID login screen

[![Lock.png](http://blog.auth0.com.s3.amazonaws.com/Lock-TouchID-Screenshot.png)](https://auth0.com)
