---
title: Auth0 iOS ObjectiveC Social Media Tutorial 
description: This tutorial will show you how to integrate Lock in your iOS ObjectiveC project in order to present a login screen.
name: iOS Social Media - ObjectiveC
alias:
  - ios
  - iphone
  - ipad
  - objectiveC
  - login
language:
  - ObjectiveC
hybrid: false
image: /media/platforms/ios.png
tags:
  - quickstart
  - login
alias:
  - ios
seo_alias: ios-objc
---

## iOS ObjectiveC - Social Media Tutorial

### 1. Register Native Authentication Handlers
Import the Lock header file on your AppDelegate Class 

```objC
  #import <Lock/Lock.h>
```

Find the `application:didFinishLaunchingWithOptions:` method and add this lines:

```objC
  A0Lock *lock = [[MyApplication sharedInstance] lock];
  [lock applicationLaunchedWithOptions:launchOptions];
```

You'll need to answer to URL calls from outside the app through Lock, for that add this method:

```objC
  - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
      A0Lock *lock = [A0Lock sharedLock];
      return [lock handleURL:url sourceApplication:sourceApplication];
  }
```

### 2. Create your Application on Facebook or Twitter 
##### Facebook
First you need to add to your `Podfile` and run `pod install`
```ruby
    pod 'Lock-Facebook', '~> 2.0'
```
Lock uses the native Facebook SDK to obtain the user's access token so you'll need to configure it using your Facebook App info. Once you have it add the following entries to the `Info.plist`:

|     Key                |       Value         |
|------------------------|---------------------|
| FacebookAppID          | ${account.clientId} |
| FacebookDisplayName    | ${account.namespace}|

and then you need to add a custom URL Type with the format `fb<FacebookAppID>`.

![Change this to the updated one](https://i.cloudup.com/yolfVA6-h8.png)

For more information on how to configure this, please check [Facebook Getting Started Guide](https://developers.facebook.com/docs/ios/getting-started) and [Obtaining an App ID and App Secret for Facebook](https://auth0.com/docs/connections/social/facebook).

Then go to your Lock Dashboard, select *Connections->Social* and select the Facebook app. There you'll be have to set up your **Facebook App ID** and **App Secret**, and you'll be able to select the permissions your app will require from the user.

Then add the following key to the Info.plist inside the main <dict> key. To open this file in Source Code mode within Xcode, **Control-Click** (or right click) on it, select **Open As, Source Code**.

```
<key>LSApplicationQueriesSchemes</key>
<array>
        <string>fbapi</string>
        <string>fb-messenger-api</string>
        <string>fbauth2</string>
        <string>fbshareextension</string>
</array>
```

Add to the import:
```objc
#import <Lock-Facebook/A0FacebookAuthenticator.h>
```

And register it after initializing A0Lock:

```objc
A0FacebookAuthenticator *facebook = [A0FacebookAuthenticator newAuthenticatorWithDefaultPermissions];
[lock registerAuthenticators:@[facebook]];
```

##### Twitter
Add to your `Podfile`

```ruby
pod 'Lock-Twitter', '~> 1.1'
```

Add to your import
```objc
#import <Lock-Twitter/A0TwitterAuthenticator.h>
```

Set up your *Twitter application* on Twitters developers site. And now you can set up your *Twitter app* information to your **Lock Dashboard**

