## Set Up the Objective-C & Swift Hybrid

### Configure project settings

1. Download the [HybridAuth.swift](https://github.com/auth0-samples/auth0-ios-objc-sample/blob/master/07-Linking-Accounts/Auth0Sample/HybridAuth.swift) file and add it to your project. The following message appears: "Would you like to configure an Objective-C bridging header?". Click **Yes**.
3. Click on your Xcode Project file.
4. Click on **Build Settings**.
5. Search for **Defines Module**.
6. Change the value to **Yes**.
7. Search for **Product Module Name**.
8. Make a note of the name. This tutorial uses the name `Auth0Sample`.

### Import

To import the Swift code and Auth0 library, add the following headers:

```objc
#import "Auth0Sample-Swift.h"
@import Auth0;
```
