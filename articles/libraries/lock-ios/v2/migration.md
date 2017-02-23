---
section: libraries
toc: true
url: /libraries/lock-ios/v2/migration
title: Migrating from v1 to v2 of Lock for iOS
description: A migration guide to assist with migration from Lock v1 (Swift) to Lock v2 (Swift).
---

# Migrating from Lock iOS and macOS v1 to v2

Lock 2.0 is the latest major release of Lock iOS-OSX. This guide is provided in order to ease the transition of existing applications using Lock 1.x to the latest APIs.

## Requirements

- iOS 9.0+
- Xcode 8.0+
- Swift 3.0+

### Objective-C support

Lock v2 cannot be used from Objective-C, since its public API relies on Swift features and that makes them unavailable in ObjC codebases.

If you are willing to have some Swift code in your existing application you can follow this [guide](https://developer.apple.com/library/content/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html) on how to mix Objective-C and Swift and then use Lock v2 from the Swift files.

If that's not an option, we recommend sticking with Lock v1 or using [Auth0.swift](/libraries/auth0-swift) to build your own interface for user logins and signups.

## Benefits of upgrading

- **Complete Swift 3 Compatibility:** The new version includes the adoption of the new [API Design Guidelines](https://swift.org/documentation/api-design-guidelines/).
- **Improved UI:** having a professional looking login box that displays well on any device.
- **Extensive configuration:** Lock provides improved configuration options to help customize the experience to your users needs.
- **Safari controller for web-based Auth:** Following Google's recent ban of WebView based auth, Lock (and Auth0.swift) will always use `SFSafariViewController` when web auth is needed.
- **API Authorization support:** Adds support for Auth0 [API Authorization](https://auth0.com/docs/api-auth)

## Changes from v1

Lock 2.0 has adopted to all of the new Swift 3 changes and conventions, including the new [API Design Guidelines](https://swift.org/documentation/api-design-guidelines/). Because of this, almost every API in Lock has been modified in some way. This guide will attempt to identify the most common usages and how they have changed, to help you get started with Lock 2.0. For yet more information on Lock 2.0, you can also see the [Lock 2.0 Reference](libraries/lock-ios) documentation.

### Integration with your Application

Lock needs to be notified for some of your application state changes and some events/notifications your application receives from the OS. You can do all these things in the `AppDelegate`

#### Application finished launching

In Lock v1 you'd add the following:

```swift
func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
	A0Lock.sharedLock().applicationLaunchedWithOptions(launchOptions)
	//Your code
	return true
}
```

In Lock v2, this is no longer required.

#### Application is asked to open URL

In Lock v1 you'd add the following:

```swift
func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject?) -> Bool {
  return A0Lock.shared().handle(url, sourceApplication: sourceApplication)
}
```

In Lock v2 you need to instead use the following:

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any]) -> Bool {
  return Lock.resumeAuth(url, options: options)
}
```

#### Application is asked to continue a User Activity

Lock v2 does not yet have support for Universal iOS Links so there is no need to notify Lock of this application event.

### Usage

`Lock` by default will handle Email/Password, Enterprise & Social authentication based on your client's connections enabled in your [Auth0 Dashboard](${manage_url}) under "Connections" in your client settings.

#### Auth0 credentials

Like in v1, in your application bundle you can add a `plist` file named `Auth0.plist` with the following format:

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

This will load your Auth0 credentials.

#### Classic mode (Database, Enterprise & Social authentication)

In v1 to show Lock from a `UIViewController` you'd add the following code:

```swift
let lock = A0Lock.shared()
let controller = lock.newLockViewController()
controller.onAuthenticationBlock = {(profile, token) in
  // Do something with token & profile. e.g.: save them.
  // Lock will not save the Token and the profile for you.
  // And dismiss the UIViewController.
  self.dismissViewController(animated: true, completion: nil)
}
lock.present(controller, from: self)
```

In v2, to show Lock, the following code will be necessary:

```swift
Lock
  .classic()
  .onAuth { credentials in
    print("Authenticated!")
  }
  .present(from: self)
```

So, in the `onAuth` callback, you'd only recieve the credentials of the user when the authentication is successful. 
> In constrast with Lock v1, in v2, Lock will dismiss itself so there is no need to call `dismissViewController(animated:, completion:)` in any of the callbacks.

In the case you need to know about the errors or signup there are the corresponding `onError` and `onSignUp` callbacks that can be employed.

```swift
Lock
  .classic()
  .onAuth { credentials in
    print("Authenticated!")
  }
  .onSignUp { email, attributes in
    print("New user with email \(email)!")
  }
  .onError { error in
    print("Failed with error \(error.localizedString)")
  }
  .present(from: self)
```

> The callback `onSignUp` is only called when the "login after signup" is disabled

#### Configuration options

If you needed to tweak Lock behaviour using it's options in v1, you would use the following format:

```swift
let controller = A0Lock.shared().newLockViewController()
controller?.closable = true
controller?.connections = ["facebook", "github", "my-database"]
```

In Lock v2 you can do it all before presenting Lock by using this format:

```swift
Lock
  .withOptions { options in
    options.closable = true
    options.allowedConnections = ["facebook", "github", "my-database"]
  }
  // continue configuring and then present Lock
```


#### UI customizations

In v1 all UI customizations were performed using the `A0Theme` object in this format:

```swift
let theme = A0Theme()
theme.register(.blue, forKey: A0ThemeTitleTextColor)
A0Theme.sharedInstance().register(theme)
```

In Lock v2, the UI customization is done using the `withStyle` function:

```swift
Lock
  .classic()
  .withStyle { style in
    style.titleColor = .blue
  }
  // other customizations
  .present(from: self)
```

## Use Auth0.Swift Library to access user profile

Lock can no longer directly access user profile information. To do so, you will now need to use the [Auth0.Swift library](/libraries/auth0-swift). Below is an example of accessing `userInfo` with `Auth0.Swift`:

```swift
guard let accessToken = credentials.accessToken else { return }
Auth0
    .authentication()
    .userInfo(token: accessToken)
    .start { result in
        switch result {
        case .success(let profile):
            // You've got a UserProfile object
        case .failure(let error):
            // You've got an error
        }
}
```

#### Delegation

Delegation is no available through Lock, but Lock v1 users who still need delegation can implement it via the the [Auth0.Swift library](/libraries/auth0-swift). The following is an example of delegation using Auth0.Swift:

```swift
Auth0.authentication()
  .delegation(withParameters: ["id_token" : "<AUTH0 ID TOKEN>", "api_type": "firebase"])
  .start() { result in
    switch result {
    case .success(let payload):
      // payload will have your firebase token
    case .failure(let error):
      // Handle Error
    }
  }
```

## Features which are still in the roadmap for v2:

- Native Authentication with third party SDKs (Facebook, Google, Twitter)
- 1Password support
- Passwordless Authentication (SMS & Email)
- Secure Token storage and automatic token refresh
- Remember me like feature using TouchID
- Universal Link support for browser based Auth
- Improved UI Styling
- Bundle more i18n translation in Lock.framework