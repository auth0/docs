---
title: Linking Accounts
description: This tutorial will show you how to link different user profiles, allowing different ways of signing in into a single profile.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* CocoaPods 1.0.0
* XCode 7.3 (7D175)
* Simulator - iPhone 6 - iOS 9.3 (13E230)
  :::

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-samples/auth0-ios-objc-sample',
  pkgBranch: 'master',
  pkgPath: '05-Linking Accounts',
  pkgFilePath: '05-Linking Accounts/Auth0Sample/Info.plist',
  pkgType: 'replace'
}) %>

### Let's begin

#### Be familiar with Auth0

This tutorial assumes you are already familiar with Auth0 and how to Sign up and Sign in using Lock or Auth0 Toolkit. **If you're not sure, check out [this tutorial](01-login.md) first.**

### 1. Setting up

For this tutorial we are going to use the Auth0 Toolkit, and import the toolkit (that is writen in Swift) into our Objective-C project. All the necessary steps for this are covered on the [Custom Login](02-custom-login.md) tutorial. 

### 2. Getting your second token 

To link two user profiles, you need to be signed in with the user you want to use as your primary profile, the one you want to merge the other user into. Once you're signed in, you need to show the login for the second user profile, for which you have two options.

#### i. Use Lock 

You can use Lock, present the Auth0 sign in UI where the user can select what form of sign in he wants to use.

```objc
A0LockViewController *controller = [lock newLockViewController];
controller.onAuthenticationBlock = ^(A0UserProfile *profile, A0Token *token) {
    // dismiss the ViewController
    [self dismissViewControllerAnimated:YES completion:nil];
    // Link with the other user profile
};

[self presentViewController:controller animated:YES completion:nil];
```

#### ii. Use Auth0 Toolkit

You might choose to avoid the Lock UI and only show the sign in options of third parties. If that's the case, you're encouraged to read the [Custom Login](02-custom-login.md) tutorial. Anyway, here is a quick outline.

- Check that you have set up the URL Type with your app's bundle ID.
- Check that you have on your `Application Support` panel, on the Auth0 web site, the `Allowed callback URLS` set up to handle this callback:
```
{application.bundleID}://{application.domain}/ios/{application.bundleID}/callback
```

- Set up your AppDelegate to handle the URL redirection:

```objc
- (BOOL) application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *,id> *)options{
    return [A0WebAuth resumeAuthWithURL:url options:options];
}
```

- Finally, show the sign in for each third party, it's important that you set up the scope as `openid` in order to be able to link the profiles:

```objc
- (IBAction)linkAccount:(id)sender{
    NSString* connection;
    
    if (sender == self.linkGoogleButton) {
        connection = @"google-oauth2";
    } else if (sender == self.linkTwitterButton) {
        connection = @"twitter";
    } else if (sender == self.linkFacebookButton) {
        connection = @"facebook";
    } else {
        return;
    }
        
    A0WebAuth *webAuth = [[A0WebAuth alloc] init];
    
    [webAuth setConnection:connection];
    [webAuth setScope:@"openid"];

    [webAuth start:^(NSError * _Nullable error, A0Credentials * _Nullable credentials) {
        if (error){
            //Something went wrong, tell the user
        } else {
            // Link with the other user profile
        }
    }];
}
```

### 3. Link your profiles

Now that you have the user information for both profiles, you can link them:

```objc
A0SimpleKeychain* keychain = [[A0SimpleKeychain alloc] initWithService:@"Auth0"];

A0ManagementAPI *authApi = [[A0ManagementAPI alloc] init];

[authApi linkUserWithIdentifier:self.userProfile.userId  withUserUsingToken: credentials.idToken callback:^(NSError * _Nullable error, NSArray<NSDictionary<NSString *,id> *> * _Nullable payload) {
   
    if (error){
        //Something went wrong, tell the user
    } else {
        //The linking worked, update your profile and UI
    }
}];
```
