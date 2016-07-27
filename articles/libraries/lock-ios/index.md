---
url: /libraries/lock-ios
snippets:
  dependencies: native-platforms/ios-objc/dependencies
---

# Lock for iOS and OS X

[Auth0](https://auth0.com) is an authentication broker that supports social identity providers as well as enterprise identity providers such as Active Directory, LDAP, Google Apps and Salesforce.

Lock makes it easy to integrate SSO in your app. You won't have to worry about:

* Having a professional looking login dialog that displays well on any device.
* Finding the right icons for popular social providers.
* Solving the home realm discovery challenge with enterprise users (i.e.: asking the enterprise user the email, and redirecting to the right enterprise identity provider).
* Implementing a standard sign in protocol (OpenID Connect / OAuth2 Login)

![iOS Gif](https://cloudup.com/cnccuUlFiYI+)

## Key features

* **Integrates** your iOS app with **Auth0** (OS X coming soon).
* Provides a **beautiful native UI** to log your users in.
* Provides support for **Social Providers** (Facebook, Twitter, etc.), **Enterprise Providers** (AD, LDAP, etc.) and **Username & Password**.
* Provides the ability to do **SSO** with 2 or more mobile apps similar to Facebook and Messenger apps.
* [1Password](https://agilebits.com/onepassword) integration using **iOS 8** [Extension](https://github.com/AgileBits/onepassword-app-extension).
* Passwordless authentication using **TouchID** and **SMS**.

## Requierements

iOS 7+. If you need to use our SDK in an earlier version please use our previous SDK pod `Auth0Client` or check the branch [old-sdk](https://github.com/auth0/Lock.iOS-OSX/tree/old-sdk) of this repo.

## Install

The Lock is available through [CocoaPods](http://cocoapods.org). To install it, simply add the following line to your Podfile:

${snippet(meta.snippets.dependencies)}

Then in your project's `Info.plist` file add the following entries:

* __Auth0ClientId__: The client ID of your application in __Auth0__.
* __Auth0Domain__: Your account's domain in __Auth0__.

> You can find these values in your app's settings in [Auth0 dashboard](${uiURL}/#/applications).

For example:

[![Auth0 plist](http://assets.auth0.com/mobile-sdk-lock/example-plist.png)](http://auth0.com)

Also you need to register a Custom URL type, it must have a custom scheme with the following format `a0<Your Client ID>`. For example if your Client ID is `Exe6ccNagokLH7mBmzFejP` then the custom scheme should be `a0Exe6ccNagokLH7mBmzFejP`.

Before you start using Lock, we need to import Lock to your codebase, if you are still working in Objective-C you need to import this header when you need to use Lock's classes:

```objc
#import <Lock/Lock.h>
```

The same applies if you are working in Swift and Lock is included as a static library but the header must be included in your _Objective-C Bridging Header_.

> If you need help creating the Objective-C Bridging Header, please check the [wiki](https://developer.apple.com/library/ios/documentation/swift/conceptual/buildingcocoaapps/MixandMatch.html)

If you are working in Swift with Lock included as an framework, just include in your swift files the module like this:

```swift
import Lock
```

Now it's time to initialize `A0Lock`, which will help you handle the authentication for you, and keep it in your AppDelegate as a **strong** property. We will create it inside `-application:didFinishLaunchingWithOptions:`

> You can store `A0Lock` in another place if you prefer, as long as you keep it alive as long as you need it.

```objc
self.lock = [A0Lock newLock];
```

```swift
self.lock = A0Lock()
```

Then call this method

```objc
[self.lock applicationLaunchedWithOptions:launchOptions];
```

```swift
self.lock.applicationLaunchedWithOptions(launchOptions)
```

Finally you'll need to handle the already registered custom scheme in your AppDelegate, so override `-application:openURL:sourceApplication:annotation:` method and add the following line:

```objc
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    return [self.lock handleURL:url sourceApplication:sourceApplication];
}
```
```swift
func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject?) -> Bool {
    return self.lock.handleURL(url, sourceApplication: sourceApplication)
}
```

> This is required to be able to return back to your application when authenticating with Safari (or native integration with FB or Twitter if used). This call checks the URL and handles all that have the custom scheme defined before.

## Usage

### Email/Password, Enterprise & Social authentication

`A0LockViewController` will handle Email/Password, Enterprise & Social authentication based on your Application's connections enabled in your [Auth0's Dashboard](https://manage.auth0.com/#/connections/social).

First instantiate `A0LockViewController` and register the authentication callback that will receive the authenticated user's credentials. Finally present it as a modal view controller:

```objc
A0Lock *lock = ... //Fetch Lock from where its stored
A0LockViewController *controller = [lock newLockViewController];
controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
    // Do something with token & profile. e.g.: save them.
    // Lock will not save the Token and the profile for you.
    // And dismiss the UIViewController.
    [self dismissViewControllerAnimated:YES completion:nil];
};
[self presentViewController:controller animated:YES completion:nil];
```
```swift
let lock = ... //Fetch Lock from where its stored
let controller = lock.newLockViewController()
controller.onAuthenticationBlock = {(profile: A0UserProfile!, token: A0Token!) -> () in
    // Do something with token & profile. e.g.: save them.
    // Lock will not save the Token and the profile for you.
    // And dismiss the UIViewController.
    self.dismissViewControllerAnimated(true, completion: nil)
}
self.presentViewController(controller, animated: true, completion: nil)
```
And you'll see our native login screen

[![Lock.png](http://blog.auth0.com.s3.amazonaws.com/Lock-Widget-Screenshot.png)](https://auth0.com)

> By default all social authentication will be done using Safari, if you want native integration please check this [wiki page](/libraries/lock-ios/native-social-authentication).


### Close Lock UI

You can add a "Close" button to Lock UI. For this you need to set the property `closable`. This property allows the `A0AuthenticationViewController` to be dismissed by adding a button. The default value is `NO`. If you want to handle the closing event you need to add the block `onUserDismissBlock`. This block will be called when the user dismisses the Login screen, only when the `closable` property is set to `YES`.

#### Objective-C example

```objc
A0Lock *lock = [A0Lock sharedLock];
A0LockViewController *controller = [lock newLockViewController];
controller.closable = YES;

controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
  // Do something with token & profile. e.g.: save them.
  // And dismiss the ViewController
};

controller.onUserDismissBlock = ^(){
  NSLog(@"User closed Lock UI");
};

[self presentViewController:controller animated:YES completion:nil];
```

#### Swift example

```swift
let controller = A0Lock.sharedLock().newLockViewController()
controller.closable = true

controller.onAuthenticationBlock = { (profile, token) in
  // Do something with token & profile. e.g.: save them.
  // And dismiss the ViewController
}

controller.onUserDismissBlock = { () in
  print("User closed Lock UI")
}

self.presentViewController(controller, animated: true, completion: nil)
```

### Sign Up

There are different approaches to implement the "Sign Up" functionality.

1. You can just add or hide the "Sign Up" button in Lock UI. For this you need to setup property `disableSignUp` which hides the Sign Up button. The default value for this attribute is `NO`.

2. Another approach is to use `A0LockSignUpViewController` directly.

#### Objective-C example

```objc
A0Lock *lock = [A0Lock sharedLock];
A0LockSignUpViewController *controller = [lock newSignUpViewController];

controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
  // Do something with token & profile. e.g.: save them.
  // And dismiss the ViewController
};

[self presentViewController:controller animated:YES completion:nil];
```

#### Swift example

```swift
let controller = A0Lock.sharedLock().newSignUpViewController()
controller.onAuthenticationBlock = { (profile, token) in
  // Do something with token & profile. e.g.: save them.
  // And dismiss the ViewController
}

self.presentViewController(controller, animated: true, completion: nil)
```


3. A third approach would be to add your own Sign Up View Controller which will implement the sign up logic with one of the `A0APIClient` method. Let's consider this, for example:

```
- (NSURLSessionDataTask *)signUpWithEmail:(NSString *)email
                                 username:(nullable NSString *)username
                                 password:(NSString *)password
                           loginOnSuccess:(BOOL)loginOnSuccess
                               parameters:(nullable A0AuthParameters *)parameters
                                  success:(A0APIClientSignUpSuccess)success
                                  failure:(A0APIClientError)failure;
```

Also your `viewController` should implement the `A0LockEventDelegate` methods:

```
- (void)backToLock; - Dismiss all custom UIViewControllers pushed inside Lock and shows it's main UI.
- (void)dismissLock; - Dismiss A0LockViewController, like tapping the close button if `closable` is true
- (void)userAuthenticatedWithToken:(A0Token *)token profile:(A0UserProfile *)profile; - Calls `onAuthenticationBlock` of `A0LockViewController` with token and profile
```

After implementation of the Sign Up View Controller you need to return it in a block `customSignUp` of `A0LockViewController`. The default value for this block is `nil`.

#### Objective-C example

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

#### Swift example

```swift
let controller = A0Lock.sharedLock().newLockViewController()

controller.onAuthenticationBlock = { (profile, token) in
    self.dismissViewControllerAnimated(true, completion: nil)
}

//Create custom SignUp view controller
controller.customSignUp = { (lock:A0Lock, delegate:A0LockEventDelegate) in
  let YourCustomSignUpVC = …//your viewController;
  signUpVC.lock = lock
  signUpVC.delegate = delegate

  return signUpVC
}

let navController:UINavigationController = UINavigationController.init(rootViewController: controller)

if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiom.Pad) {
    navController.modalPresentationStyle = UIModalPresentationStyle.FormSheet

}
self.presentViewController(navController, animated: true, completion: nil)
```
#### Further considerations

Additionally, after a successful Signup the user could be logged in automatically. In order to perform this, you can use property `loginAfterSignUp`. So `A0AuthenticationViewController` will attempt to login the user if this property is set to `YES`, otherwise it will call `onAuthenticationBlock` with both parameters set to `nil`. Remember that the default value is `YES`.

#### Terms & Conditions

If you want to show Terms & Conditions of your app you need to set `signUpDisclaimerView`. This view will appear in the bottom of Signup screen.

### WebView

For a social connection you can choose between using Safari or an embedded webView. For this you need to set the property `useWebView`.  
It will use an embedded webView instead of Safari if you set the property to `YES`. Please note that the default value is `YES`.

#### Objective-C example

```objc
A0Lock *lock = [A0Lock sharedLock];
A0LockViewController *controller = [lock newLockViewController];
controller.useWebView = NO;

controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
  // Do something with token & profile. e.g.: save them.
  // And dismiss the ViewController
};
controller.onUserDismissBlock = ^(){
[self presentViewController:controller animated:YES completion:nil];
```

#### Swift example

```swift
let controller = A0Lock.sharedLock().newLockViewController()
controller.useWebView = false
controller.onAuthenticationBlock = { (profile, token) in
  // Do something with token & profile. e.g.: save them.
  // And dismiss the ViewController
}
self.presentViewController(controller, animated: true, completion: nil)
```

## Samples

Also you can check our [Swift](https://github.com/auth0-samples/auth0-ios-swift-sample) and [Objective-C](https://github.com/auth0-samples/auth0-ios-objc-sample) example apps. For more information on how to use **Lock** with Swift please check [this guide](/libraries/lock-ios/swift).


> For more information please check Lock's documentation in [CocoaDocs](http://cocoadocs.org/docsets/Lock).

## Additional Documents

<ul>
<% _.forEach(_.sortBy(articles.findByHash('libraries/lock-ios').items, 'toc_title'), function(article) { %>
  <% if (article.toc_title) { %>
  <li>
    <span><a href="<%- '/docs' + article.url %>"><%- article.toc_title %></a>
    <% if (article.description) { %>
      - <%- article.description %>
    <% } %>
    </span>
  </li>
  <% } %>
<% }); %>
</ul>
