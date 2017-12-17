## Set up the Objective-C & Swift Hybrid

### Configure project settings

1. Download the [HybridLock.swift](https://github.com/auth0-samples/auth0-ios-objc-sample/blob/embedded-login/01-Embedded-Login/Auth0Sample/HybridLock.swift) file and add it to your project.
2. The following message will appear: "Would You like to configure an Objective-C bridging Header". Click **Yes**
3. Click on your Xcode Project file.
4. Click **Build Settings**.
5. Search for **Defines Module**.
6. Change the value to **Yes**.
7. Search fir **Product Module Name**.
8. Make a note of the name,. This tutorial uses the name `Auth0Sample`.

### Import

To import the Swift code and Auth0 library, add the following headers:

```objc
#import "Auth0Sample-Swift.h"
@import Auth0;
```
