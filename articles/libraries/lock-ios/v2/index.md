---
section: libraries
toc: true
title: Lock v2 for iOS
description: A widget that provides a frictionless login and signup experience for your native iOS apps.
mobileimg: media/articles/libraries/lock-ios.png
tags:
  - libraries
  - lock
  - ios
---
# Lock v2 for iOS

This reference guide will show you how to implement the Lock user interface, and give you the details on configuring and customizing Lock in order to use it as the UI for your authentication needs. However, if you'd like to learn how to do more with Auth0 and Swift, such as how to save, call and refresh Access Tokens, get user profile info, and more, check out the [Auth0.Swift SDK](/libraries/auth0-swift). Or, take a look at the [Swift QuickStart](/quickstart/native/ios-swift) to walk through complete examples and see options, both for using Lock as the interface, and for using a custom interface. 

::: note
Check out the [Lock.swift repository](https://github.com/auth0/Lock.swift) on GitHub.
:::

## Requirements

- iOS 9 or later
- Xcode 8
- Swift 3.0

<%= include('../_includes/_dependencies') %>

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

In order to use Lock you need to provide your Auth0 Client Id and Domain, which can be found in your [Auth0 Dashboard](${manage_url}), under your Application's settings.

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

## Implementation of Lock Classic

Lock Classic handles authentication using Database, Social, and Enterprise connections.

### OIDC Conformant Mode

It is strongly encouraged that this SDK be used in OIDC Conformant mode. When this mode is enabled, it will force the SDK to use Auth0's current authentication pipeline and will prevent it from reaching legacy endpoints. By default this is `false`

```swift
.withOptions {
    $0.oidcConformant = true
}
```

::: note
For more information, please see our [Introduction to OIDC Conformant Authentication](/api-auth/intro) and the [OIDC adoption guide](/api-auth/tutorials/adoption).
:::

To show Lock, add the following snippet in your `UIViewController`.

```swift
Lock
    .classic()
    // withConnections, withOptions, withStyle, and so on
    .withOptions {
      $0.oidcConformant = true
      $0.scope = "openid profile"
    }
    .onAuth { credentials in
      // Let's save our credentials.accessToken value
    }
    .present(from: self)
```

## Use Auth0.Swift Library to access user profile

To access user profile information, you will need to use the `Auth0.Swift` library:

```swift
guard let accessToken = credentials.accessToken else { return }
Auth0
    .authentication()
    .userInfo(withAccessToken: accessToken)
    .start { result in
        switch result {
        case .success(let profile):
            // You've got a UserProfile object
        case .failure(let error):
            // You've got an error
        }
}
```

Check out the [Auth0.Swift Library Documentation](/libraries/auth0-swift) for more information about its uses.

## Specify Connections

Lock will automatically load the connections configured for your application. If you wish to override the default behavior, you can manually specify which connections it should display to users as authentication options. This can be done by calling the method and supplying a closure that can specify the connection(s).

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

::: note
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

::: note
You can see the complete set of behavior configuration options to alter the way Lock works for your app in the [Configuration Guide](/libraries/lock-ios/v2/configuration).
:::

## Password Manager Support

By default, password manager support using [1Password](https://1password.com/) is enabled for database connections. 1Password support will still require the user to have the 1Password app installed for the option to be visible in the login and signup screens. You can disable 1Password support using the enabled property of the passwordManager.

```swift
.withOptions {
    $0.passwordManager.enabled = false
}
```

By default the `appIdentifier` will be set to the app's bundle identifier and the `displayName` will be set to the app's display name. You can customize these as follows:

```swift
.withOptions {
    $0.passwordManager.appIdentifier = "www.myapp.com"
    $0.passwordManager.displayName = "My App"
}
```

You will need to add the following to your app's `info.plist`:

```
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>org-appextension-feature-password-management</string>
</array>
```

<%= include('../_includes/_roadmap') %>

## Next Steps

::: next-steps
- [Customizing the Style of Lock](/libraries/lock-ios/v2/customization)
- [Customizing the Behavior of Lock](/libraries/lock-ios/v2/configuration)
- [Adding Custom Signup Fields to Lock](/libraries/lock-ios/v2/custom-fields)
- [Lock Internationalization](/libraries/lock-ios/v2/internationalization)
- [Logging out Users](/logout)
:::
