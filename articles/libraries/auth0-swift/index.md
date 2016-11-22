---
description: How to install, initialize and use Auth0.Swift
url: /libraries/auth0-swift
---

# Auth0.swift

Auth0.swift is a client-side library for [Auth0](http://auth0.com).

## Requirements

iOS 9+ and Xcode 8 (Swift 3.0)

::: panel-info Swift 2.3
For Swift 2.3 you need to use [v1@swift-2.3](https://github.com/auth0/Auth0.swift/tree/v1@swift-2.3) branch.
:::

If using CocoaPods, we recommend version 1.1.0 or later.

## Installation

### Using CocoaPods

Auth0.swift is available through [CocoaPods](http://cocoapods.org). 
To install it, simply add the following line to your Podfile:

```ruby
pod 'Auth0', '~> 1.0'
```

### Using Carthage

In your Cartfile add this line

```
github "auth0/Auth0.swift" ~> 1.0
```

## Credentials

You will need to add an `Auth0.plist` file, containing your Auth0 client id and domain, to your main bundle. Here is an example of the file contents:

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

## Using the Authentication API

The Authentication API provides methods to authenticate the user against Auth0 server. 

### Login with database connection

Logging in with a database connection requires calling `login` with the user's username/email, password, and the name of the connection (such as "Username-Password-Authentication") you wish to authenticate with. The response will be a Credentials object.

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

### Passwordless Login

Logging in with Passwordless is slightly different. Passwordless authentication can be done via email or via SMS, and either by sending the user a code, or sending them a link which contains a code. 

#### How Passwordless Works

Passwordless requires two steps. Requesting the code, and inputting the code. When using links, this is slightly different, because the user does not have to input a code themselves - but the code is just included in the URL.

**Step 1:** Request the code

In this example, requesting the code is done by calling `startPasswordless` with the user's email, and the type of connection. The `type` parameter will default to `Code`. On success, you'll probably display a notice to the user that their code is on the way, and perhaps route them to a view to input that code.

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

**Step 2:** Input the code

Once the user has a code, they can input it. Call the `login` method, and pass in the user's email, the code they received, and the name of the connection in question. Upon success, you will receive a Credentials object in the response.

```swift
Auth0
   .authentication()
   .login(
       usernameOrEmail: "support@auth0.com", 
       password: "123456", 
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

#### Passwordless Parameters

As you can see, Passwordless authentication can be started with a variety of different parameters. 

```
.startPasswordless(email: String, type: String, connection: String)
```

or

```
.startPasswordless(phoneNumber: String, type: String, connection: String)
```

- **Parameter One** - Either the parameter `email` or `phoneNumber`, depending on which you intend to use. The value of either should be a string.
- **Parameter Two** - The parameter `type`, its value should be either `.Code` or `.iOSLink`. The default is `.Code` (a code is sent to the user, then they input it in a secondary screen), but if you have [iOS Universal Links](https://developer.apple.com/library/content/documentation/General/Conceptual/AppSearch/UniversalLinks.html) configured, you can use `.iOSLink`.
- **Parameter Three** - The parameter `connection`, its value should be the name of the connection, defaults to `sms`.

### Signing Up with database connection

Signing up requires calling the  `signUp` method, passing the user's given email, chosen password, and the connection name to initiate the signup process.

```swift
Auth0
   .authentication()
   .signUp(
       email: "support@auth0.com", 
       password: "password123", 
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

### Getting user information

In order to retrieve a user's profile, you call the `tokenInfo` method and pass it the user's token.

```swift
Auth0
   .authentication()
   .tokenInfo(token: "user token")
   .start { result in
       switch result {
       case .success(let profile):
           print("profile email: \(profile.email)")
       case .failure(let error):
           print(error)
       }
   }
```

### Using the Management API

The Management API provides functionality that allows you to link and unlink separate user accounts from different providers, tying them to a single profile (Read more about [Linking Accounts](/link-accounts) with Auth0). It also allows you to update user metadata.

#### Linking users

Linking user accounts will allow a user to authenticate from any of their accounts and no matter which one they use, still pull up the same profile upon login. Auth0 treats all of these accounts as separate profiles by default, so if you wish a user's accounts to be linked, this is the way to go.

The `link` method accepts two parameters, the primary user id and the secondary user token (the token obtained after login with this identity). The user id in question is the unique identifier for this user account. If the id is in the format `facebook|1234567890`, the id required is the portion after the delimiting pipe.

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

#### Unlinking users

Unlinking users is a similar provess to the linking of users. The `unlink` method takes three parameters, though: the secondary user id, and the secondary provider (the provider of the secondary user), and the primary user id.
The parameters read, essentially: "Unlink this **secondary user** (with this **provider**) from this **primary user**".

```swift
Auth0
   .users(token: "user token")
   .unlink(identityId: identifier, provider: provider, fromUserId:userId)
   .start { result in
      switch result {
      case .success(let userInfo):
         print("user: \(userInfo)")
      case .failure(let error):
         print(error)
      }
   }
```

::: panel-info Unlinking - Metadata
Note that when accounts are linked, the secondary account's metadata is not merged with the primary account's metadata. Similarly, when unlinking two accounts, the secondary account does not retain the primary account's metadata when it becomes separate again.
:::

#### Update user metadata

When updating user metadata, you will create a `userMetadata` object, and then call the `patch` method, passing it the user id and the `userMetadata` object. The values in this object will overwrite existing values with the same key, or add new ones for those that don't yet exist in the user metadata.

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

### Web-based Auth (iOS Only)

First go to [Auth0 Dashboard](${manage_url}/#/clients) and go to client's settings. Make sure you have in *Allowed Callback URLs* a URL with the following format:

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

And add the following method in your application's `AppDelegate`:

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
    return Auth0.resumeAuth(url, options:options)
}
```

#### Authenticate with a specific Auth0 connection

The `connection` option allows you to specify a connection that you wish to authenticate with. If no connection is specified here, the browser will show the Hosted Login page, with all of the connections which are enabled for this client.

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

#### Authenticate using a specific scope

Using scopes can allow you to return specific claims for specfic fields in your request. Adding parameters to `scope` will allow you to add more scopes. The default scope is `openid`, and you should read our [documentation on scopes](/scopes) for further details about them.

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

If no connection name is specified, using the Auth0 [Hosted Login Page](/hosted-pages/login) is the default behavior.

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
