# Lock iOS: The Basics Of Using Lock

This document exposes how to integrate Lock in your iOS project, as well as how to accomplish some basic functionalities that you will need the most, such as presenting the login and sign up dialogs, or closing them.

## Requirements

Lock runs on iOS 7 or later.

If you need to integrate it with an older iOS version, you can:

- Use our previous SDK [Auth0Client pod](https://cocoapods.org/?q=auth0client).
- Or, check out the [old-sdk](https://github.com/auth0/Lock.iOS-OSX/tree/old-sdk) branch from the [Lock.iOS-OSX](https://github.com/auth0/Lock.iOS-OSX) repository.


## Installation

Lock is available through [Cocoapods](https://cocoapods.org/) and [Carthage](https://github.com/Carthage/Carthage) dependency managers.

If you are using Cocoapods, add this line to your `Podfile` and run `pod install`:

```ruby
pod "Lock", "~> 1.26"
```

If you are using Carthage, add this line to your `Cartfile` and run `carthage bootstrap`:

```javascript
github "auth0/Lock.iOS-OSX" -> 1.26
```

Otherwise, just clone the [Lock.iOS-OSX](https://github.com/auth0/Lock.iOS-OSX) repository and integrate it manually in your project.

## Configuration

Lock requires a little bit of manual configuration before getting started. All you need to do is create a file named `Auth0.plist` within your project, which must contain the following:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>ClientId</key>
  <string>{YOUR_CLIENT_ID}</string>
  <key>Domain</key>
  <string>{YOUR_DOMAIN}</string>
</dict>
</plist>
```

> ⚠️ Replace the placeholders that appear between curly braces with your credentials, which you can quickly get from your [Auth0 dashboard](${uiURL}/#/applications).

## Usage

#### 1. Show the Lock widget

The default Lock widget includes dialogs for:

- Login
- Sign Up
- Password Recovery
- Social Connections Authentication



<div class="phone-mockup"><img src="/media/articles/libraries/ios-swift/Custom-Lock-Widget-Screenshot.png" alt="Mobile example screenshot"/></div>

<login screenshot> <signup screenshot> <password recovery screenshot>

`A0LockViewController` will handle email/password, enterprise, and social provider authentication based on the connections enabled on your client in the [Auth0 Dashboard](${uiURL}/#/connections/social).

First, import the `Lock` module:

```swift
import Lock
```

Then, instantiate, configure and show your `A0LockViewController` instance from wherever you need it, registering the authentication callback that will receive the authenticated user's credentials. After that, present it modally in your view controller:

```swift
// Instantiate a LockViewController from a shared lock instance
let controller = A0Lock.sharedLock().newLockViewController()

// Configure your controller...
controller.onAuthenticationBlock = { profile, token in
    // Do anything with profile and token.
    // You will usually store these values. Lock won't do it for you.
    // Don't forget to dismiss it upon successful authentication:
    controller.dismissViewControllerAnimated(true, completion: nil)
}

// Show it!
A0Lock.sharedLock().presentLockController(controller, fromController: self)
```

```objective-c

```

You will see the Lock native widget login screen:

<div class="phone-mockup"><img src="/media/articles/libraries/lock-ios/login.png" alt="Login"/></div><div class="phone-mockup">

#### 2. Close the Lock widget

You can make an `x` button show up on the top right corner of the widget, so that it can be dismissed. All you have to do is set the `closable` property of your `A0LockViewController` instance to `true`, as follows:

```swift
controller.closable = true
controller.onUserDismissBlock = {
    // This closure will be executed after the user presses the `x` button
}
```

```objective-c

```

The default value for this property is `false`.

#### 3. Disable Sign Up

Sign Up is enabled by default. If you want to disable it, set the `disableSignUp` property of your `A0LockViewController` instance to `true`. That will hide the sign up button that appears at the bottom-left corner of the Lock login widget.

````
controller.disableSignUp = true
​```

​```objective-c
controller.disableSignUp = NO
​```

<div class="phone-mockup"><img src="/media/articles/libraries/lock-ios/login-without-sign-up-button.png" alt="Login (Without Sign Up Button)"/></div><div class="phone-mockup">

#### 4. Social Connections Considerations

Social connections authentication dialogs can be presented in two ways: Safari or native. You can find more information about it in the [Authentication Options](authentication-options) document.
````