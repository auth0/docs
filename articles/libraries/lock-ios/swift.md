---
toc_title: Using Lock with Swift
description:
---


# Lock iOS: Using with Swift

**Lock** was written in Objective-C but it can be used from a pure Swift project or a Hybrid project (Swift & Objective-C).

## Create Objective-C Bridging Header
In order to use **Lock** classes in any Swift file, you need to add a Objective-C Bridging Header to your project. The easiest way is to create a dummy Objective-C file in your Swift project (or Swift file in a Objective-C project), this will make Xcode prompt to create the bridging header, just press _"YES"_. After that you can delete the dummy file from your project and open the bridging header file which is called `<YouAppName>-Bridging-Header.h`.

> For more information, please check [this guide](https://developer.apple.com/library/ios/documentation/swift/conceptual/buildingcocoaapps/MixandMatch.html) from Apple.

## Use Lock
In `<YouAppName>-Bridging-Header.h` just add the following line
```objc
#import <Lock/Lock.h>
```

And **Lock** classes will be available in all your Swift codebase. So to show `A0LockViewController` just use the following snippet:

```swift
let authController = A0Lock.sharedLock().newLockViewController()
authController.onAuthenticationBlock = {(profile, token) in
    guard let profile = profile, let token = token else {
        return //it's a sign up
    }
            
    let keychain = A0SimpleKeychain(service: "Auth0")
    keychain.setString(token.idToken, forKey: "id_token")
    if let refreshToken = token.refreshToken {
        keychain.setString(refreshToken, forKey: "refresh_token")
    }
    keychain.setData(NSKeyedArchiver.archivedDataWithRootObject(profile), forKey: "profile")
    
    // Other stuff
   
    self.dismissViewControllerAnimated(true, completion: nil)
}
self.presentViewController(authController, animated: true, completion: nil)
```
