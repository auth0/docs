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
  pkgRepo: 'native-mobile-samples',
  pkgBranch: 'master',
  pkgPath: 'iOS/basic-sample-objC',
  pkgFilePath: 'iOS/basic-sample-objc/ObjCSample/Info.plist',
  pkgType: 'replace'
}) %>

### In the Beginning

#### Be familiar with Auth0

This tutorial assumes you are already familiar with Auth0 and how to Sign up and Sign in using Lock or Auth0 Toolkit. **If you're not sure, check out [this tutorial](01-login.md) first.**

### 1. Remember me?

To get your users information, you will need the user's token. You can get it either after your sign in ([Sing in Tutorial](01-login.md)) or getting it from your Keychain ([Session Handling Tutorial](03-session-handling.md)).
Once you have the user's token, you can use it to restore the user's profile:

```objc
    	[[A0Lock sharedLock].apiClient fetchUserProfileWithIdToken:userToken 
    	success:^(A0UserProfile * _Nonnull profile) {
        	// You have successfully retreived the user's profile.
		} failure:^(NSError * _Nonnull error) {
			// Something went wrong, let the user know
		}
    }
```

### 2. Use the user's data

Now that you have the profile information, you can use it on your app:

#### i. Get the user profile image

Use the image URL to download the image and display it on an `UIImageView`:

```objc
    [[[NSURLSession sharedSession] dataTaskWithURL:profile.pictureURL completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            self.avatarImageView.image = [UIImage imageWithData:data];
        });
    }] resume];
```

#### ii. Get the basic user information

On the profile you can get the user's name, email, when was the last time the user signed in, etc. Everything Auth0 uses to manage a user.

```objc
    self.welcomeLabel.text = [NSString stringWithFormat:@"Welcome, %@", self.userProfile.name];
```

#### iii. Everything else

And you can store your own app information for the user in the metadata dictionary.

```objc
    self.userFirstNameField.text = [self.userProfile.userMetadata objectForKey:@"firstName"];
    self.userLastNameField.text = [self.userProfile.userMetadata objectForKey:@"lastName"];
    self.userCountryField.text = [self.userProfile.userMetadata objectForKey:@"country"];
```

### 3. Saving the metadata

This metadata field can be used to store any information about the user your app needs. You only need to send a dictionary with the fields that need updating.

```objc
    NSDictionary* profileMetadata = [[NSDictionary alloc]
                                initWithObjects:@[self.userFirstNameField.text,self.userLastNameField.text,self.userCountryField.text]
                                forKeys:@[@"firstName",@"lastName",@"country"]];
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
