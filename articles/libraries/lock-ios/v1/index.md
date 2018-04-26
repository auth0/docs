---
section: libraries
toc: true
url: /libraries/lock-ios/v1
title: Lock v1 for iOS and macOS
snippets:
  dependencies: native-platforms/ios-objc/dependencies
description: A widget that provides a frictionless login and signup experience for your native iOS and macOS apps.
---

# Lock v1 for iOS and macOS

<%= include('../_includes/_lock-version-1') %>

Auth0 is an authentication broker that supports social identity providers as well as enterprise identity providers such as Active Directory, LDAP, Google Apps and Salesforce.

## Key features

* **Integrates** your iOS app with **Auth0** (OS X coming soon).
* Provides a elegant **native UI** to log in your users.
* Provides support for **Social Providers** (Facebook, Twitter, and so on), **Enterprise Providers** (AD, LDAP, and so on) and **Username & Password** authentication.
* Provides the ability to do **SSO** with 2 or more mobile apps, similar to Facebook and Messenger apps.
* [1Password](https://agilebits.com/onepassword) integration using the **iOS 8** [Extension](https://github.com/AgileBits/onepassword-app-extension).
* Passwordless authentication using **Touch ID** and **SMS**.

::: note
Check out the [Lock.swift repository](https://github.com/auth0/Lock.swift/tree/v1) on GitHub.
:::

## Requirements

iOS 7+. If you need to use our SDK with an earlier version, use the previous SDK pod `Auth0Client`, or see the [old-sdk](https://github.com/auth0/Lock.iOS-OSX/tree/old-sdk) branch of the Lock.iOS-OSX repo.

## Installation

Lock is available through [CocoaPods](http://cocoapods.org). To install it, simply add the following line to your Podfile:

${snippet(meta.snippets.dependencies)}

Then, in your project's `Info.plist` file, add the following string entries:

* __Auth0ClientId__: The client ID of your Auth0 application.
* __Auth0Domain__: Your Auth0 account domain.

For example:
![plist](/media/articles/libraries/lock-ios/plist.png)

::: note
You can find these values in your [Application Settings](${manage_url}/#/applications) in the Auth0 dashboard.
:::

You will also need to register a **Custom URL** type with a custom scheme in the following format:

`a0{Your Client ID}`

For example, if your Client ID is `Exe6ccNagokLH7mBmzFejP`, the custom scheme would be `a0Exe6ccNagokLH7mBmzFejP`.

Before you can begin using Lock, you will need to import Lock into your codebase.

If you are working in Objective-C, import this header when you need to use Lock's classes:

```objc
#import <Lock/Lock.h>
```

The same applies if you are working in Swift and Lock is included as a static library. In this case, the header must also be included in your _Objective-C Bridging Header_.

::: note
If you need help creating the Objective-C Bridging Header, see: [Swift and Objective-C in the Same Project](https://developer.apple.com/library/ios/documentation/swift/conceptual/buildingcocoaapps/MixandMatch.html).
:::

If you are working in Swift with Lock included as an framework, just include the module in your Swift files like this:

```swift
import Lock
```

Now you can initialize `A0Lock` (which handles authentication) and keep it in your `AppDelegate` as a **strong** property.

::: note
You can store `A0Lock` in a different location as long as you keep it alive as long as it is needed.
:::

This examples creates `A0Lock` inside `-application:didFinishLaunchingWithOptions:`

**Objective C**:

```objc
self.lock = [A0Lock newLock];
```

**Swift**:

```swift
self.lock = A0Lock()
```

Then call this method:

**Objective C**:

```objc
[self.lock applicationLaunchedWithOptions:launchOptions];
```

**Swift**:

```swift
lock.applicationLaunched(options: launchOptions)
```

Lastly, you will need to handle the already registered custom scheme in your `AppDelegate`. To do so, override the `-application:openURL:sourceApplication:annotation:` method and add the following line:

**Objective C**:

```objc
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    return [self.lock handleURL:url sourceApplication:sourceApplication];
}
```

**Swift**:

```swift
func application(_ application: UIApplication, open url: URL, sourceApplication: String?, annotation: Any) -> Bool {
    return self.lock.handle(url, sourceApplication: sourceApplication)
}
```

This call is required to be able to return to your application when authenticating with Safari, or with native integration with Facebook or Twitter. This call checks the URL and handles those that have the custom scheme.

## Usage

### Email/password, enterprise, and social provider authentication

`A0LockViewController` will handle email/password, enterprise, and social provider authentication based on the connections enabled on your application in the [Auth0 Dashboard](${manage_url}/#/connections/social).

First, instantiate `A0LockViewController` and register the authentication callback that will receive the authenticated user's credentials. Then present it as a modal view controller:

#### Objective C

```objc
A0Lock *lock = ... //Fetch Lock from where its stored
A0LockViewController *controller = [lock newLockViewController];
controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
    // Do something with token & profile (such as save them).
    // Lock will not save the Token and the profile for you.
    // And dismiss the UIViewController.
    [self dismissViewControllerAnimated:YES completion:nil];
};
[self presentViewController:controller animated:YES completion:nil];
```

#### Swift

```swift
let lock = ... // Fetch Lock from where its stored
let controller: A0LockViewController = lock.newLockViewController()
controller.onAuthenticationBlock = { (profile, token) in
    // Do something with token & profile (such as save them).
    // Lock will not save the Token and the profile for you.
    // And dismiss the UIViewController.
    self.dismiss(animated: true, completion: nil)
}
lock.present(controller, from: self)
```

You will see the Lock native login screen:

<div class="phone-mockup"><img src="/media/articles/libraries/lock-ios/lock-ios.png" alt="Lock-iOS"/></div>

::: note
By default, all social authentication will be done using Safari. If you want native integration, see: [Lock iOS: Native Social Authentication](/libraries/lock-ios/native-social-authentication).
:::

### Close Lock UI

You can add a **Close** button to Lock UI. For this to function, you will need to set the `closable` property to allow the `A0AuthenticationViewController` to be dismissed. The default value is `NO`.

If you want to handle the closing event, you will need to add the `onUserDismissBlock` block which will be called when the user dismisses the Login screen only if the `closable` property is set to `YES`.

#### Objective C

```objc
A0Lock *lock = [A0Lock sharedLock];
A0LockViewController *controller = [lock newLockViewController];
controller.closable = YES;

controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
  // Do something with token & profile (such as save them).
  // And dismiss the ViewController
};

controller.onUserDismissBlock = ^(){
  NSLog(@"User closed Lock UI");
};

[self presentViewController:controller animated:YES completion:nil];
```

#### Swift

```swift
let controller: A0LockViewController = A0Lock.shared().newLockViewController()
controller.closable = true

controller.onAuthenticationBlock = { (profile, token) in
    // Do something with token & profile (such as save them).
    // And dismiss the ViewController
}

controller.onUserDismissBlock = { _ in
    print("User closed Lock UI")
}

self.present(controller, animated: true, completion: nil)
```

### Sign-up

There are different approaches to implement Sign-up functionality:

1. You can add or hide the **Sign Up** button in Lock UI by setting the `disableSignUp` property which will hide the **Sign Up** button when set to `YES`. The default value  is `NO`.

2. Another approach is to use the `A0LockSignUpViewController` directly:

#### Objective-C

```objc
A0Lock *lock = [A0Lock sharedLock];
A0LockSignUpViewController *controller = [lock newSignUpViewController];

controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
  // Do something with token & profile (such as save them).
  // And dismiss the ViewController
};

[self presentViewController:controller animated:YES completion:nil];
```

#### Swift

```swift
let controller: A0LockViewController = A0Lock.shared().newSignUpViewController()
controller.onAuthenticationBlock = { (profile, token) in
    // Do something with token & profile (such as save them).
    // And dismiss the ViewController
}

self.present(controller, animated: true, completion: nil)
```


3. A third option is to create your own sign up `viewController` to implement the sign-up logic with one of the `A0APIClient` methods:

```
- (NSURLSessionDataTask *)signUpWithEmail:(NSString *)email
                                 username:(nullable NSString *)username
                                 password:(NSString *)password
                           loginOnSuccess:(BOOL)loginOnSuccess
                               parameters:(nullable A0AuthParameters *)parameters
                                  success:(A0APIClientSignUpSuccess)success
                                  failure:(A0APIClientError)failure;
```

Your `viewController` should also implement the `A0LockEventDelegate` methods:

```
- (void)backToLock; - Dismisses all custom UIViewControllers pushed inside Lock and shows the main UI.
- (void)dismissLock; - Dismisses A0LockViewController, like clicking the Close button if `closable` is true
- (void)userAuthenticatedWithToken:(A0Token *)token profile:(A0UserProfile *)profile; - Calls `onAuthenticationBlock` of `A0LockViewController` with token and profile
```

After implementating your `viewController`, you will need to return it in a `customSignUp` block of `A0LockViewController`. The default value for this block is `nil`.

**Objective-C**:

```objc
A0Lock *lock = [A0Lock sharedLock];

A0LockViewController *controller = [lock newLockViewController];
controller.closable = YES;

controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
    [self dismissViewControllerAnimated:YES completion:nil];
};

//Create custom SignUp view controller
controller.customSignUp = ^ UIViewController *(A0Lock *lock, A0LockEventDelegate *delegate) {

  YourCustomSignUpVC *signUpVC = …//your viewController;
  signUpVC.delegate = delegate;
  signUpVC.lock = lock;

  return signUpVC;
};

UINavigationController *navController = [[UINavigationController alloc] initWithRootViewController:controller];

if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
  navController.modalPresentationStyle = UIModalPresentationFormSheet;
}

[self presentViewController:navController animated:YES completion:nil];
```

**Swift**:

```swift
let controller: A0LockViewController = A0Lock.shared().newLockViewController()

controller.onAuthenticationBlock = { (profile, token) in
    self.dismiss(animated: true, completion: nil)
}

// Create custom SignUp view controller
controller.customSignUp = { (lock, delegate) in
    let YourCustomSignUpVC = // Your viewController;
    signUpVC.lock = lock
    signUpVC.delegate = delegate

    return signUpVC
}

let navController:UINavigationController = UINavigationController.init(rootViewController: controller)

if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiom.pad) {
    navController.modalPresentationStyle = UIModalPresentationStyle.formSheet

}
self.present(navController, animated: true, completion: nil)
```

### Automatic login after sign-up

After a successful sign-up, the user can be logged in automatically using the `loginAfterSignUp` property. If `loginAfterSignUp` is set to `YES`, `A0AuthenticationViewController` will attempt to log in the user . Otherwise, it will call `onAuthenticationBlock` with both parameters set to `nil`. The default value of `loginAfterSignUp` is `YES`.

### Disclaimer View

If you want to show a disclaimer for your app, you will need to set `signUpDisclaimerView`. This view will appear at the bottom of the sign-up screen.

## Logout

To log out a user, call `clearSessions` for `A0Lock`. This method removes all stored sessions of any IdP in your application.

:::note
* If the user has logged in using Safari, their sessions will not be cleared.
* If you stored the credentials in the keychain, you need to clear them there as well.
:::

### Objective-C

```objc
A0Lock *lock = [A0Lock sharedLock];
[lock clearSessions];
A0SimpleKeychain *keychain = [A0SimpleKeychain keychainWithService:<Your_Keychain_Name>];
[keychain clearAll];
//redirect the user to Login Page
```

### Swift

```swift
A0Lock.shared().clearSessions()
let keychain = A0SimpleKeychain(service: <Your_Keychain_Name>)
keychain.clearAll()
//redirect the user to Login Page
```

## WebView

When authenticating with a social connection, you can choose between using Safari or the embedded webView. To use embedded webView, set the `useWebView` property to `YES`. The default value is `YES`.

### Objective-C

```objc
A0Lock *lock = [A0Lock sharedLock];
A0LockViewController *controller = [lock newLockViewController];
controller.useWebView = NO;

controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
  // Do something with token & profile (such as save them).
  // And dismiss the ViewController
};
controller.onUserDismissBlock = ^(){
[self presentViewController:controller animated:YES completion:nil];
```

### Swift

```swift
let controller: A0LockViewController = A0Lock.shared().newLockViewController()
controller.useWebView = false
controller.onAuthenticationBlock = { (profile, token) in
    // Do something with token & profile (such as save them).
    // And dismiss the ViewController
}
self.present(controller, animated: true, completion: nil)
```

## Additional Information

See the [Swift](https://github.com/auth0-samples/auth0-ios-swift-sample) and [Objective-C](https://github.com/auth0-samples/auth0-ios-objc-sample) example apps.

For more information on how to use Lock with Swift, see: [Lock iOS: Using Swift](/libraries/lock-ios/swift).

For more information on Lock for CocoaPods, see the [Lock documentation in CocoaDocs](http://cocoadocs.org/docsets/Lock).

## Further reading

::: next-steps
- [Customization of the Look and Feel of Lock iOS](/libraries/lock-ios/v1/customization)
- [Lock iOS API](/libraries/lock-ios/v1/lock-ios-api)
- [Native Social Authentication](/libraries/lock-ios/v1/native-social-authentication)
- [Passwordless](/libraries/lock-ios/v1/passwordless)
- [Sending Authentication Parameters](/libraries/lock-ios/v1/sending-authentication-parameters)
- [Using Swift with Lock iOS v1](/libraries/lock-ios/v1/swift)
:::
