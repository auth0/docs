---
description: How to install, initilize and use Auth0.Swift
url: /libraries/auth0-swift
---

# Auth0.swift

Auth0.swift is a client-side library for [Auth0](http://auth0.com).

## Requirements

iOS 9+ and Xcode 8 (Swift 3.0)

::: panel-info Swift 2.3
For Swift 2.3 you need to use [v1@swift-2.3](https://github.com/auth0/Auth0.swift/tree/v1@swift-2.3) branch.
:::

If using CocoaPods we recommend version 1.1.0 or later.

## Installation

### CocoaPods

Auth0.swift is available through [CocoaPods](http://cocoapods.org). 
To install it, simply add the following line to your Podfile:

```ruby
pod "Auth0", '1.0.0'
```

### Carthage

In your Cartfile add this line

```
github "auth0/Auth0.swift" "1.0.0"
```

## Usage

### Auth0.plist

To avoid specifying clientId & domain you can add a `Auth0.plist` file to your main bundle. Here is an example of the file contents:

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

::: panel-info Note
Note that this will load clientId & domain in authentication API & OAuth2 methods, and only domain for management API methods.
:::

### Authentication API

#### Login with database connection

```swift
Auth0
   .authentication()
   .login(
       usernameOrEmail: "support@auth0.com", 
       password: "a secret password", 
       connection: "Username-Password-Authentication"
       )
   .start { result in
       switch result {
       case .success(let credentials):
           print("access_token: \(credentials.accessToken)")
       case .failure(let error):
           print(error)
       }
   }
```

#### Passwordless Login

```swift
Auth0
   .authentication()
   .startPasswordless(email: "support@auth0.com", connection: "email")
   .start { result in
       switch result {
       case .success:
           print("Sent OTP to support@auth0.com!")
       case .failure(let error):
           print(error)
       }
   }
```


```swift
Auth0
   .authentication()
   .login(
       usernameOrEmail: "support@auth0.com", 
       password: "email OTP", 
       connection: "email"
       )
   .start { result in
       switch result {
       case .success(let credentials):
           print("access_token: \(credentials.accessToken)")
       case .failure(let error):
           print(error)
       }
   }
```

#### Sign Up with database connection

```swift
Auth0
   .authentication()
   .signUp(
       email: "support@auth0.com", 
       password: "a secret password", 
       connection: "Username-Password-Authentication"
       )
   .start { result in
       switch result {
       case .success(let credentials):
           print("access_token: \(credentials.accessToken)")
       case .failure(let error):
           print(error)
       }
   }
```

#### Get user information

```swift
Auth0
   .authentication()
   .tokenInfo(token: "user id_token")
   .start { result in
       switch result {
       case .success(let profile):
           print("profile email: \(profile.email)")
       case .failure(let error):
           print(error)
       }
   }
```

### Management API (Users)

#### Update user_metadata

```swift
Auth0
    .users(token: "user token")
    .patch("user identifier", userMetadata: ["first_name": "John", "last_name": "Doe"])
    .start { result in
        switch result {
        case .success(let userInfo):
            print("user: \(userInfo)")
        case .failure(let error):
            print(error)
        }
    }
```

#### Link users

```swift
Auth0
   .users(token: "user token")
   .link(userId, withOtherUserToken: "another user token")
   .start { result in
      switch result {
      case .success(let userInfo):
         print("user: \(userInfo)")
      case .failure(let error):
         print(error)
      }
   }
```

### Web-based Auth (iOS Only)

First go to [Auth0 Dashboard](https://manage.auth0.com/#/applications) and go to application's settings. Make sure you have in *Allowed Callback URLs* a URL with the following format:

```
{YOUR_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{YOUR_BUNDLE_IDENTIFIER}/callback
```

In your application's `Info.plist` file register your iOS Bundle Identifier as a custom scheme like this:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>None</string>
        <key>CFBundleURLName</key>
        <string>auth0</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>{YOUR_BUNDLE_IDENTIFIER}</string>
        </array>
    </dict>
</array>
```

> **Auth0.swift** will only handle URLs with your Auth0 domain as host, e.g. `com.auth0.MyApp://samples.auth0.com/ios/com.auth0.MyApp/callback`

and add the following method in your application's `AppDelegate`

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
    return Auth0.resumeAuth(url, options:options)
}
```

#### Authenticate with any Auth0 connection

```swift
Auth0
    .webAuth()
    .connection("facebook")
    .start { result in
        switch result {
        case .success(let credentials):
            print("credentials: \(credentials)")
        case .failure(let error):
            print(error)
        }
    }
```

#### Specify scope

```swift
Auth0
    .webAuth()
    .scope("openid email")
    .connection("google-oauth2")
    .start { result in
        switch result {
        case .success(let credentials):
            print("credentials: \(credentials)")
        case .failure(let error):
            print(error)
        }
    }
```

#### Authenticate with Auth0 hosted login page

```swift
Auth0
    .webAuth()
    .start { result in
        switch result {
        case .success(let credentials):
            print("credentials: \(credentials)")
        case .failure(let error):
            print(error)
        }
    }
```

### Logging

To enable Auth0.swift to log HTTP request and OAuth2 flow for debugging you can call the following method in either `WebAuth`, `Authentication` or `Users` object:

```swift
var auth0 = Auth0.authentication()
auth0.logging(enabled: true)
```

Then for a OAuth2 authentication you'll see in the console:

```
Safari: https://samples.auth0.com/authorize?.....
URL: com.auth0.myapp://samples.auth0.com/ios/com.auth0.MyApp/callback?...
POST https://samples.auth0.com/oauth/token HTTP/1.1
Content-Type: application/json

{"code":"...","client_id":"...","grant_type":"authorization_code","redirect_uri":"com.auth0.MyApp:\/\/samples.auth0.com\/ios\/com.auth0.MyApp\/callback","code_verifier":"..."}

HTTP/1.1 200
Pragma: no-cache
Content-Type: application/json
Strict-Transport-Security: max-age=3600
Date: Thu, 09 Jun 2016 19:04:39 GMT
Content-Length: 57
Cache-Control: no-cache
Connection: keep-alive

{"access_token":"...","token_type":"Bearer"}
```

::: panel-info Debug Flag Only
Only set this flag for **DEBUG** only or you'll be leaking user's credentials in the device log.
:::

