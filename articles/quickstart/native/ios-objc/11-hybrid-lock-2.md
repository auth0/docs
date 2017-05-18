---
title: Hybrid Lock 2
description: Adding a wrapper to integrate Lock 2 with ObjC
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-objc-sample',
  path: '11-Hybrid-Lock2',
  requirements: [
    'CocoaPods 1.1.1',
    'Version 8.2 (8C38)',
    'iPhone 6 - iOS 10.2 (14C89)'
  ]
}) %>

Lock 2 was written in Swift. However, it can be used by setting up a Hybrid project (Objective-C & Swift).
For more information, please check [this guide](https://developer.apple.com/library/ios/documentation/swift/conceptual/buildingcocoaapps/MixandMatch.html) from Apple.

## Setup a Hybrid project

### Cocoapods

If you are using [Cocoapods](https://cocoapods.org/), add these lines to your `Podfile`:

```ruby
use_frameworks!
pod 'Lock', '~> 2.2'
```

Then, run `pod install`.

> For further reference on Cocoapods, check [their official documentation](http://guides.cocoapods.org/using/getting-started.html).

### Project Changes

1. Create a new called `HybridLock.swift` file  
2. A popup window will appear and ask "Would You like to configure an Objective-C bridging Header". **Choose Yes**
3. Click on your Xcode Project file
4. Click on Build Settings
5. Find the Search bar and search for Defines Module.
6. Change the value to Yes.
7. Search Product Module Name.
8. Make a note of the name or change it to something more memorable, we will be using `YourProjectName-swift`

## Adding HybridLock

Add the following to the `HybridLock.swift` file you just added.

```swift
import Foundation
import Lock
import Auth0

@objc class HybridLock: NSObject {

    var lock: Lock
    var onAuthenticationBlock: (Credentials) -> Swift.Void = { _ in }

    override init() {
        self.lock = Lock.classic()
        super.init()

        _ = self.lock
            .onAuth(callback: { self.onAuthenticationBlock($0) })
            .withOptions {
                $0.closable = true
            }
            .withStyle {
                $0.title = "Hybrid Lock"
            }
    }

    func present(from controller: UIViewController) {
        self.lock.present(from: controller)
    }
}
```

This gives you full access to the [cusomization of Lock 2](https://github.com/auth0/Lock.swift#classic)

### AppDelegate

There are some fundamental differences between Lock 1 and Lock 2, one of these is the `AppDelegate` method
use to resume Lock authentication.

Add the following to your `AppDelegate` header.

```objc
@import Lock;
```

Then ensure you have the following delegate method implementation.

```objc
-(BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    return [Lock resumeAuth:url options:options];
}
```

### Launching Lock

Add the following to the top of `ViewController.m`

```objc
#import "YourProjectName-swift.h"
@import Auth0;
```

Then add:

```objc
HybridLock *lock = [[HybridLock alloc] init];

lock.onAuthenticationBlock = ^(A0Credentials *credentials) {
  // We have the credentials!
  NSLog(@"credentials: %@", [credentials accessToken]);
};

[lock presentFrom:self];
```

### Retrieving the user profile

If you're familiar with Lock 1 you will notice the lack of profile information.  Lock 2 only deals with authentication, to access this information you need
to implement the [Auth0.Swift SDK](https://github.com/auth0/Auth0.swift)

Expand the previous snippet:

```objc
HybridLock *lock = [[HybridLock alloc] init];
A0AuthenticationAPI *auth = [[A0AuthenticationAPI alloc] init];

lock.onAuthenticationBlock = ^(A0Credentials *credentials) {
    [auth userInfoWithToken:[credentials accessToken] callback:^(NSError *error, A0Profile *profile) {
        if (profile) {
          // Do something with credentials & profile. e.g. save them.
          // Lock will not save the Token and the profile for you.
          // And dismiss the UIViewController.
          [self dismissViewControllerAnimated:YES completion:nil];
        }
    }];
};

[lock presentFrom:self];
```

Now you can use Lock 2 inside your Objective-C project.
