## Hybrid Objective-C / Swift

### Project settings

1. Download the [HybridLock.swift](https://github.com/auth0-samples/auth0-ios-objc-sample/blob/embedded-login/01-Embedded-Login/Auth0Sample/HybridLock.swift) file and add this to your project.
2. A popup window will appear and ask "Would You like to configure an Objective-C bridging Header". **Choose Yes**
3. Click on your Xcode Project file
4. Click on Build Settings
5. Find the Search bar and search for **Defines Module**.
6. Change the value to `Yes`.
7. Search **Product Module Name**.
8. Make a note of the name, we will be using `Auth0Sample`.

### Import

To import the Swift code and Auth0 library you add the following headers:

```objc
#import "Auth0Sample-Swift.h"
@import Auth0;
```
