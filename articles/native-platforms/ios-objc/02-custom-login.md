title: Custom Login
description: This tutorial will teach you how to perform Login and Sign Up by using your own View Controllers, without using the Lock widget interface.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* CocoaPods 1.0.0
* Xcode 7.3 (7D175)
* Simulator - iPhone 6 - iOS 9.3 (13E230)
  :::

<%= include('../_includes/_package', {
  pkgRepo: 'native-mobile-samples',
  pkgBranch: 'master',
  pkgPath: 'iOS/basic-sample-objc',
  pkgFilePath: 'iOS/basic-sample-objc/ObjCSample/Info.plist',
  pkgType: 'replace'
}) %>

### Setting up Auth0

<div class="setup-callback">
<p> Go to the <a href="${uiAppSettingsURL}">Application Settings</a> part of the dashboard and check that this scheme is set on the *Allowed Callback URLs*:</p>

```
a0${acount.clientId}://\*.auth0.com/authorize*
```
</div>

### 1. Import the Auth0 Toolkit to the project

Your first step is to add [Auth0 Swift Toolkit](https://github.com/auth0/Auth0.swift) into your project, which is a library that contains helper functions that will allow you to perform basic authentication operations (such as login, sign up, or retrieve and update profiles) against the Auth0 API in a very easy manner.
This toolkit is writen in Swift, but you can incorporate it on your Objective-C project just fine. Xcode will automatically generate a header file you can include in your source and will enable you to use it's classes and methods as if they were native Objective-C code.

#### i. Carthage

If you are using Carthage, add the following line to the `Cartfile`:

```ruby
github "auth0/Auth0.swift" "1.0.0-beta.3"
```

Then, run `carthage bootstrap`.

> For more information about Carthage usage, check [their official documentation](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos).

#### ii. Cocoapods

If you are using [Cocoapods](https://cocoapods.org/), add these lines to your `Podfile`:

```ruby
use_frameworks!
pod 'Auth0', '1.0.0-beta.3'
```

Remember to add the `use_frameworks!` line, since it's necessary for Swift pods to be included on Xcode even if it's an Objective-C project.
Then, run `pod install`.

> For further reference on Cocoapods, check [their official documentation](http://guides.cocoapods.org/using/getting-started.html).

### 2. Set up your Credentials

Create a property list file named `Auth0.plist` in your project, and add the following entries into it:

| Key       | Value                |
|-----------|----------------------|
| ClientId  | ${account.clientId}  |
| Domain    | ${account.namespace} |

Then you'll need to create a `Auth0InfoHelper` class to handle this properties. With the following methods:

```objc
+ (NSDictionary*) readAuth0Plist {
    NSDictionary *dict = [[NSDictionary alloc] initWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"Auth0" ofType:@"plist"]];

    return dict;
}
```

This will open the `Auth0.plist` file and load it in a dictionary. Then you'll need to create a method to read each value:

```objc
+ (NSString*) Auth0ClientID {
    return [[Auth0InfoHelper readAuth0Plist] objectForKey:@"ClientId"];
}

+ (NSURL*) Auth0Domain {
    return [NSURL a0_URLWithDomain: [[Auth0InfoHelper readAuth0Plist] objectForKey:@"Domain"]];
}
```

In the Domain case, we call an extension of `NSURL` included in the [Auth0 Swift Toolkit](https://github.com/auth0/Auth0.swift). It makes sure the URL we are instanciating has a `https` scheme included.

### 3. Implement the Login

Now, to the actual Login.

Import both the helper class and the [Auth0 Swift Toolkit](https://github.com/auth0/Auth0.swift) header file:

```
#import "Auth0-Swift.h"
#import "Auth0InfoHelper.h"
```

And, in order to perform the actual login:

```objc

    A0AuthenticationAPI *authApi = [[A0AuthenticationAPI alloc] initWithClientId:[Auth0InfoHelper Auth0ClientID] url:[Auth0InfoHelper Auth0Domain]];

    [authApi loginWithUsername:@"email@foo.com" password:@"1234" connection:@"Username-Password-Authentication" scope:@"openid" parameters:@{} callback:^(NSError * _Nullable error, A0Credentials * _Nullable credentials) {
        if(error){
            // Something went wrong, let the user know
        } else{
            // Logged in successfully, you may continue
            // Use the A0Credentials instance to access the user profile 
            // information
        }
    }];
```

Basically, `credentials` contains token-related information; you will normally store this object for later use. On the other hand, `error` contains the authentication error information that you might want to keep track of.

> For further reference on the `credentials` and `error` objects, check the [Credentials](https://github.com/auth0/Auth0.objc/blob/master/Auth0/Authentication/Credentials.Objc) and [Authentication](https://github.com/auth0/Auth0.Objc/blob/master/Auth0/Authentication/Authentication.objc) files documentation.

### Done!

It is that simple.

### Optional I: Retrieve the User Profile

You can retrieve your user profile information using the `Credentials` object you just obtained. For that you can keep your `A0AuthenticationAPI` object or instanciate a new one, and then call:

```
    [authApi userInfoWithToken:credentials.accessToken callback:callback:^(NSError * _Nullable error, A0UserProfile * _Nullable profile) {
                if(error) {
                    // Something went wrong, let the user know
                } else {
                    // You have your user profile object
                }
            }];
```

You can use the `profile.name` to show the user's name or show the users profile picture in a `UIImageView`

```
    [[[NSURLSession sharedSession] dataTaskWithURL:profile.pictureURL completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            self.avatarImageView.image = [UIImage imageWithData:data];
        });

    }] resume];
```


> For further reference on the `profile` and `error` objects, check the [UserProfile](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Authentication/UserProfile.swift) and [Authentication](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Authentication/Authentication.swift) files documentation.

### Optional II: Implement a Sign Up

If you are going to let the user sign in, you'll probably need to let the user to register first. And creating a user is as easy as sign in:

```
    A0AuthenticationAPI *authApi = [[A0AuthenticationAPI alloc] initWithClientId:[Auth0InfoHelper Auth0ClientID] url:[Auth0InfoHelper Auth0Domain]];

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
                // so no need to make the user login. He's already in.
            }
        });
}];
```

