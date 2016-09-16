---
title: User Profile
description: This tutorial will show you how to access the user profile from within your app, as well as how to update it.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* CocoaPods 1.0.0
* XCode 7.3 (7D175)
* Simulator - iPhone 6 - iOS 9.3 (13E230)
  :::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ios-objc-sample/tree/master/04-User-Profile',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-samples/auth0-ios-objc-sample',
  pkgBranch: 'master',
  pkgPath: '04-User-Profile',
  pkgFilePath: '04-User-Profile/Auth0Sample/Info.plist',
  pkgType: 'replace'
}) %>

### In the Beginning

#### Be Familiar with Auth0

This tutorial assumes you are already familiar with Auth0 and how to Sign up and Login using Lock or Auth0 Toolkit. **If you're not sure, check out [this tutorial](01-login.md) first.**

### 1. Remember Me?

To get your user's information, you will need the user's token. You can get it either after your login ([Login tutorial](01-login.md)) or by getting it from your Keychain ([Session Handling tutorial](03-session-handling.md)).
Once you have the user's token, you can use it to restore the user's profile:

```objc
[[A0Lock sharedLock].apiClient fetchUserProfileWithIdToken:userToken
success:^(A0UserProfile * _Nonnull profile) {
	// You have successfully retreived the user's profile.
} failure:^(NSError * _Nonnull error) {
	// Something went wrong, let the user know
}
```

### 2. Use the User's Data

Now that you have the profile information, you can use it in your app:

#### i. Get the User Profile Image

Use the image URL to download the image and display it on an `UIImageView`:

```objc
    [[[NSURLSession sharedSession] dataTaskWithURL:profile.pictureURL completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            self.avatarImageView.image = [UIImage imageWithData:data];
        });
    }] resume];
```

#### ii. Get the Basic User Information

On the profile you can get the user's name and email, when was the last time the user logged in, and so on-everything Auth0 uses to manage a user.

```objc
    self.welcomeLabel.text = [NSString stringWithFormat:@"Welcome, %@", self.userProfile.name];
```

#### iii. Everything Else

You can also store your own app information for the user in the `userMetadata` dictionary.

```objc
    self.userFirstNameField.text = [self.userProfile.userMetadata objectForKey:@"firstName"];
    self.userLastNameField.text = [self.userProfile.userMetadata objectForKey:@"lastName"];
    self.userCountryField.text = [self.userProfile.userMetadata objectForKey:@"country"];
```

### 3. Saving the Metadata

This metadata field can be used to store any information about the user your app needs. You only need to send a dictionary with the fields that need updating.

```objc
    NSDictionary* profileMetadata = @{
                                @"firstName": self.userFirstNameField.text,
                                @"lastName":self.userLastNameField.text,
                                @"country":self.userCountryField.text};

    A0ManagementAPI *authApi = [[A0ManagementAPI alloc] initWithToken:userToken url:domain];

    [authApi patchUserWithIdentifier:self.userProfile.userId userMetadata:profileMetadata callback:^(NSError * _Nullable error, NSDictionary<NSString *,id> * _Nullable data) {
        if(error) {
        // Something went wrong, let the user know
        } else {
        // The user was updated on the server, create a new instance of the
        // profile with the new information and use this one from now on

        self.userProfile = [[A0UserProfile alloc] initWithDictionary:data];
        }
    }];
```
