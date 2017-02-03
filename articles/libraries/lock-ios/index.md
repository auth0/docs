---
section: libraries
toc: true
url: /libraries/lock-ios
title: Lock v2 for iOS and macOS
description: A widget that provides a frictionless login and signup experience for your native iOS and macOS apps.
---

# Lock v2 for iOS and macOS

You're looking at the documentation for the easiest way of securing your iOS and macOS apps!

Lock is an embeddable login form, which is configurable to your needs and ready for use in your mobile applications. It's easier than ever to add social identity providers to Lock, as well, allowing your users to login seamlessly using whichever providers make sense for your application. Check out the basic usage guide below for more information!

## Requirements

- iOS 9 or later
- Xcode 8
- Swift 3.0

## Install

You have two choices for installation - CocoaPods or Carthage. 

### Installation Using CocoaPods

Add the following line to your `Podfile`:

```ruby
pod "Lock", "~> 2.0.0-rc.1"
```

### Installation Using Carthage

Add the following line to your `Cartfile`:

```
github "auth0/Lock.iOS-OSX" "2.0.0-rc.1"
```

## Setup 

### Integrate with your Application

Lock needs to be notified when the application is asked to open a URL. You can do this in the `AppDelegate` file.

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any]) -> Bool {
  return Lock.resumeAuth(url, options: options)
}
```

### Import Lock

Import **Lock** wherever you'll need it

```swift
import Lock
```

### Auth0 Credentials

In order to use Lock you need to provide your Auth0 Client Id and Domain, which can be found in your [Auth0 Dashboard](https://manage.auth0.com).

In your application bundle you can add a `plist` file named `Auth0.plist` that will include your credentials with the following format.

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

## Implementation of Lock

Lock Classic handles authentication using Database, Social, and Enterprise connections.

To show Lock, add the following snippet in your `UIViewController`.

```swift
Lock
    .classic()
    // withConnections, withOptions, withStyle, etc
    .onAuth { 
      // Save the Credentials object
      // Use the token to get the user's profile
    }
    .present(from: self)
```

## Specify Connections

Lock will automatically load the connections configured for your client. If you wish to override the default behavior, you can manually specify which connections it should display to users as authentication options. This can be done by calling the method and supplying a closure that can specify the connection(s).

Adding a database connection:

```swift
.withConnections {
    connections.database(name: "Username-Password-Authentication", requiresUsername: true)
}
```

Adding multiple social connections:

```swift
.withConnections {
    connections.social(name: "facebook", style: .Facebook)
    connections.social(name: "google-oauth2", style: .Google)
}
```

## Styling and Customization

Lock provides many styling options to help you apply your own brand identity to Lock using `withStyle`. For example, changing the primary color and header text of your Lock widget:

### Customize your title, logo, and primary color

```swift
.withStyle {
  $0.title = "Company LLC"
  $0.logo = LazyImage(named: "company_logo")
  $0.primaryColor = UIColor(red: 0.6784, green: 0.5412, blue: 0.7333, alpha: 1.0)
}
```

::: panel-info Styling Customization Options
You can see the complete set of styling options to alter the appearance of Lock for your app in the [Customization Guide](/libraries/lock-ios/v2/customization).
:::

## Configuration Options

There are numerous options to configure Lock's behavior. Below is an example of Lock configured to allow it to be closable, to limit it to only usernames (and not emails), and to only show the Login and Reset Password screens. 

```swift
Lock
    .classic()
    .withOptions {
    	$0.closable = true
  		$0.usernameStyle = [.Username]
  		$0.allow = [.Login, .ResetPassword]
    }
```

::: panel-info Behavior Configuration Options
You can see the complete set of behavior configuration options to alter the way Lock works for your app in the [Configuration Guide](/libraries/lock-ios/v2/configuration).
:::

## Logging

Lock provides options to easily turn on and off logging capabilities, as well as adjust other logging related settings. The example below displays logging turned on, but take a look at the [Behavior Configuration Options](/lock-ios/v2/configuration) page for more information about logs in Lock for iOS v2.

```swift
Lock
    .classic()
    .withOptions {
        $0.logLevel = .all
        $0.logHttpRequest = true
    }
```

## Other Resources

* [Styles Customization](/libraries/lock-ios/v2/customization) - customize the look and feel of Lock
* [Behavior Configuration](/libraries/lock-ios/v2/configuration) - configure the behavior of Lock