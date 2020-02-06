---
section: libraries
toc: true
url: /libraries/lock-ios/v2/configuration
title: Lock for iOS v2 Configuration Options
description: Behavior configuration options available with Lock v2 for iOS
topics:
  - libraries
  - lock
  - ios
contentType:
  - reference
  - how-to
useCase:
  - add-login
  - enable-mobile-auth
---

# Lock v2 for iOS - Configuration Options

There are numerous options to configure Lock's behavior listed below. In addition, there are also quite a few options available to alter Lock's appearance and style in the [Style Customization Options](/libraries/lock-ios/v2/customization) page.

## Configuring Lock's behavior

Configuration options can be added to your Lock initialization using `withOptions`.

```swift
Lock
  .classic()
  .withOptions {
    $0.closable = true
    $0.usernameStyle = [.Username]
    $0.allow = [.Login, .ResetPassword]
  }
  .present(from: self)
```

## Behavior Options

### closable

Allows Lock to be dismissed by the user. By default this is `false`.

```swift
.withOptions {
  $0.closable = true
}
```

### scope

<dfn data-key="scope">Scope</dfn> used for authentication. By default is `openid`. It will return not only the <dfn data-key="access-token">**Access Token**</dfn>, but also an **ID Token** which is a <dfn data-key="json-web-token">JSON Web Token (JWT)</dfn> containing user information. See the documentation on [Scopes](/scopes) for more information about authentication scopes.

```swift
.withOptions {
  $0.scope = "openid name email picture"
}
```

#### Refresh Tokens

Specifying the `offline_access` scope in your Lock options will allow a <dfn data-key="refresh-token">[Refresh Token](/tokens/concepts/refresh-tokens)</dfn> to be returned along with the access\_token and the id\_token. Refresh Tokens can be saved and used to acquire a new Access Token when the old one expires. For more information about using Refresh Tokens for Auth0 authentication, take a look at the reference documentation for the [Auth0.Swift SDK](/libraries/auth0-swift), which you would use to implement Refresh Tokens, or at the [Swift QuickStart Guide](/quickstart/native/ios-swift/03-user-sessions), which provides a comprehensive example of use of Auth0 in Swift development, including the management of Refresh Tokens.

### termsOfService

By default Lock will use Auth0's [Terms of Service](https://auth0.com/terms) and [Privacy Policy](https://auth0.com/privacy), but other URLs can be filled in to link to other terms and policies.

```swift
.withOptions {
  $0.termsOfService = "https://mycompany.com/terms"
  $0.privacyPolicy = "https://mycompany.com/privacy"
}
```

### Show Terms of Service

Database connections display the Terms of Service dialog. Default is `true`. Note that the Terms of Service will always be shown if the `mustAcceptTerms` flag is enabled.

```swift
.withOptions {
    $0.showTerms = true
}
```

### Require users to accept the Terms of Service

Database connection require explicit acceptance of the Terms of Service.

```swift
.withOptions {
    $0.mustAcceptTerms = true
}
```

## Web Authentication Options

### leeway

Clock skew used for ID token validation. It expands the time window in which the ID token will still be considered valid, to account for the difference between server time and client time. By default is **60000 milliseconds** (60 seconds).

```swift
.withOptions {
  $0.leeway = 30000 // 30 seconds
}
```

### maxAge

Allowable elapsed time (in milliseconds) since the user last authenticated. Used for ID token validation. If set, the ID token will contain an `auth_time` claim with the authentication timestamp. Defaults to `nil`.

```swift
.withOptions {
  $0.maxAge = 86400000 // 1 day
}
```

## Database options

### allow

Which database screens will be accessible, the default is enable all screens such as `.Login, .Signup, .ResetPassword`.

```swift
.withOptions {
  $0.allow = [.Login, .ResetPassword]
}
```

### initialScreen

The first screen to present to the user. The default is `.Login`, other options include `.Signup` and `ResetPassword`.

```swift
.withOptions {
  $0.initialScreen = .Login
}
```

### usernameStyle

Specify the type of identifier the login will require.  The default is either: `[.Username, .Email]`, but it can also accept `[.Username]` or `[.Email]`. However it's important to note that this option is only active if you have set the `requires_username` flag to `true` in your [Auth0 Dashboard](${manage_url}/#/)

```swift
.withOptions {
  $0.usernameStyle = [.Username]
}
```

#### Custom Signup Fields

When signing up the default information requirements are the user's *email* and *password*. You can expand your data capture requirements as needed. Capturing additional signup fields here will store them in the `user_metadata`, which you can read more about in [Metadata](/users/concepts/overview-user-metadata). Note that you must specify the icon to use with your custom text field.

```swift
.withOptions {
  $0.customSignupFields = [
    CustomTextField(name: "first\_name", placeholder: "First Name", icon: LazyImage(name: "ic_person", bundle: Lock.bundle)),
    CustomTextField(name: "last\_name", placeholder: "Last Name", icon: LazyImage(name: "ic_person", bundle: Lock.bundle))
  ]
}
```

::: note
You can also specify icons from other bundles, such as in the following example:
CustomTextField(name: "slack_handle", placeholder: "Slack Handle", icon: LazyImage(name: "ic_slack", bundle: Bundle(identifier: "CustomBundle")))
:::

## Enterprise Options

There are also configuration options specific to Enterprise connections:

### enterpriseConnectionUsingActiveAuth

By default Enterprise connections will use Web Authentication. However, you can specify which connections will alternatively use credential authentication and prompt for a username and password.

```swift
.withOptions {
  $0.enterpriseConnectionUsingActiveAuth = ["enterprisedomain.com"]
}
```

### activeDirectoryEmailAsUsername

When in credential authentication mode, should the user require their email as an identifier?  The default is `false`, and instead requires a username.

```swift
.withOptions {
  $0.activeDirectoryEmailAsUsername = true
}
```

## Logging Options

Lock provides options to easily turn on and off logging capabilities, as well as adjust other logging related settings.

### logLevel

By default this is `.off`, *Syslog* logging levels are supported.

```swift
.withOptions {
  $0.logLevel = .all
}
```

### logHttpRequest

Whether or not to log Auth0.swift API requests. By default this is `false`.

```swift
.withOptions {
  $0.logHttpRequest = true
}
```

### loggerOutput

Specify logger output handler, by default this uses the `print` statement.

```swift
.withOptions {
  $0.loggerOutput = CleanroomLockLogger()
}
```

In the code above, the *loggerOutput* has been set to use [CleanroomLogger](https://github.com/emaloney/CleanroomLogger). This can typically be achieved by implementing the *loggerOutput* protocol.  You can of course use your favorite logger library. Below is an example of usage handling logger output with CleanroomLogger.

```swift
class CleanroomLockLogger: LoggerOutput {
  func message(_ message: String, level: LoggerLevel, filename: String, line: Int) {
    let channel: LogChannel?
    switch level {
    case .debug:
        channel = Log.debug
    case .error:
        channel = Log.error
    case .info:
        channel = Log.info
    case .verbose:
        channel = Log.verbose
    case .warn:
        channel = Log.warning
    default:
        channel = nil
    }
    channel?.message(message, filePath: filename, fileLine: line)
  }
}
```
