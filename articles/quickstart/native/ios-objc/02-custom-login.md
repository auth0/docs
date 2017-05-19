---
title: Custom Login
description: This tutorial will teach you how to perform Login and Sign Up by using your own View Controllers, without using the Lock widget interface.
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-objc-sample',
  path: '02-Custom-Login',
  requirements: [
    'CocoaPods 1.1.1',
    'Version 8.2 (8C38)',
    'iPhone 6 - iOS 10.2 (14C89)'
  ]
}) %>

### Setting up Auth0

### 1. Import the Auth0 Toolkit to the project

Your first step is to add [Auth0 Swift Toolkit](https://github.com/auth0/Auth0.swift) into your project, which is a library that contains helper functions that will allow you to perform basic authentication operations (such as login, sign up, or retrieve and update profiles) against the Auth0 API in a very easy manner.
This toolkit is written in Swift, but you can incorporate it on your Objective-C project just fine. Xcode will automatically generate a header file you can include in your source and will enable you to use it's classes and methods as if they were native Objective-C code.

#### Cocoapods

Add these lines to your `Podfile`:

```ruby
use_frameworks!
pod 'Auth0', '~> 1.4'
```

Remember to add the `use_frameworks!` line, since it's necessary for Swift pods to be included on Xcode even if it's an Objective-C project.
Then, run `pod install`.

::: note
For further reference on Cocoapods, check [their official documentation](http://guides.cocoapods.org/using/getting-started.html).
:::

### Set up your Credentials

Add your credentials in `Auth0.plist`. You have to create that file if it doesn't already exist in your project:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>ClientId</key>
  <string>${account.clientId}</string>
  <key>Domain</key>
  <string>${account.namespace}</string>
</dict>
</plist>
```

### Implement the Login

First, import the `Auth0` module

```objc
@import Auth0;
```

And, in order to perform a login with a database connection:

```objc
A0AuthenticationAPI *authApi = [[A0AuthenticationAPI alloc] init];

[authApi loginWithUsername:@"email@foo.com" password:@"1234" connection:@"Username-Password-Authentication" scope:@"openid" parameters:@{} callback:^(NSError * _Nullable error, A0Credentials * _Nullable credentials) {
    if(error) {
        // Something went wrong, let the user know
    } else {
        // Logged in successfully, you may continue
        // Use the A0Credentials instance to access the user profile information
    }
}];
```

Basically, `credentials` contains token-related information; you will normally store this object for later use. On the other hand, `error` contains the authentication error information that you might want to keep track of.

::: note
For further reference on the `credentials` object, check the [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift) documentation.
:::

### Retrieve the User Profile

You can retrieve your user profile information using the `Credentials` object you just obtained. For that you can keep your `A0AuthenticationAPI` object or instantiate a new one, and then call:

```objc
[authApi userInfoWithToken:credentials.accessToken callback:callback:^(NSError * _Nullable error, A0UserProfile * _Nullable profile) {
    if(error) {
        // Something went wrong, let the user know
    } else {
        // You have your user profile object
    }
}];
```

You can use the `profile.name` to show the user's name or show the users profile picture in a `UIImageView`

```objc
[[[NSURLSession sharedSession] dataTaskWithURL:profile.pictureURL completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
    dispatch_async(dispatch_get_main_queue(), ^{
        self.avatarImageView.image = [UIImage imageWithData:data];
    });
}] resume];
```

::: note
For further reference on the `profile` object, check the [UserProfile](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Profile.swift) documentation.
:::

### Implement a Sign Up

If you are going to let the user sign in, you'll probably need to let the user to register first. And creating a user is as easy as sign in:

```objc
A0AuthenticationAPI *authApi = [[A0AuthenticationAPI alloc] init];

[authApi signUpWithEmail:@"email@foo.com"
          username:nil // by default the username is the users email
          password:@"1234"
        connection:@"Username-Password-Authentication"
      userMetadata:@{ @"Country": @"Australia",
                      @"Telephone": @"99 99 9999 9999"}
                       // Here you can include any extra information
                       // you need about the user
             scope:@"openid"
        parameters:nil
          callback:^(NSError * _Nullable error, A0Credentials * _Nullable credentials) {
              if(error) {
                  // Something went wrong, let the user know
              } else {
                  // You signed up correctly, and you have the Credentials,
                  // so no need to make the user login. They're already logged in.
              }
          }];
```

## Perform Social Authentication

First, go to your [Client Dashboard](${manage_url}/#/applications/${account.clientId}/settings/${account.clientId}/settings) and make sure that *Allowed Callback URLs* contains the following:

```shell
{YOUR_APP_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{YOUR_APP_BUNDLE_IDENTIFIER}/callback
```

In your application's `Info.plist` file, register your iOS Bundle Identifier as a custom scheme. To do so, open the `Info.plist` as source code, and add this chunk of code under the main `<dict>` entry:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>None</string>
        <key>CFBundleURLName</key>
        <string>auth0</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>{YOUR_APP_BUNDLE_IDENTIFIER}</string>
        </array>
    </dict>
</array>
```

Remember to replace all the `{YOUR_APP_BUNDLE_IDENTIFIER}` appearances with your actual app's bundle identifier, which you can get from your project settings.

::: note
The **Auth0.swift** toolkit will only handle URLs with your Auth0 domain as host, for instance: `com.auth0.MyApp://samples.auth0.com/ios/com.auth0.MyApp/callback`
:::

Then, add the following function in your application's `AppDelegate`:

```swift
@import Auth0;
```

```objc
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *,id> *)options{
    return [A0WebAuth resumeAuthWithURL:url options:options];
}
```

### Web Authentication

Finally, you can now perform webAuth authentication by specifying the social connection name, for example with Facebook.

```objc
A0WebAuth *webAuth = [[A0WebAuth alloc] init];
[webAuth setConnection:@"facebook"];
[webAuth setScope:@"openid"];
[webAuth start:^(NSError * _Nullable error, A0Credentials * _Nullable credentials) {
    if (error) {
      // Handle Error
    } else {
      // You've got your credentials
    }
}];
```

Once you obtain the `credentials` object upon a successful authentication, you can deal with them as usual.
