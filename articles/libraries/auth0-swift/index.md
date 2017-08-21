---
section: libraries
toc: true
description: How to install, initialize and use Auth0.Swift
url: /libraries/auth0-swift
---
# Auth0.swift

Auth0.swift is a client-side library for Auth0.

## Requirements

- iOS 9 or later
- Xcode 8
- Swift 3.0

## Installation

### Carthage

If you are using Carthage, add the following lines to your `Cartfile`:

```ruby
github "auth0/Auth0.swift" ~> 1.0
```

Then run `carthage bootstrap`.

::: note
For more information about Carthage usage, check [the official documentation](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos).
:::

### Cocoapods

If you are using [Cocoapods](https://cocoapods.org/), add these lines to your `Podfile`:

```ruby
use_frameworks!
pod 'Auth0', '~> 1.0'
```

Then, run `pod install`.

::: note
For further reference on Cocoapods, check [the official documentation](http://guides.cocoapods.org/using/getting-started.html).
:::

## Adding Auth0 Credentials

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

### Web-based Auth (iOS Only)

First go to [Auth0 Dashboard](${manage_url}/#/clients) and go to client's settings. Make sure you have in **Allowed Callback URLs** a URL with the following format:

```text
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

::: note
Auth0.swift will only handle URLs with your Auth0 domain as host, for example `com.auth0.MyApp://samples.auth0.com/ios/com.auth0.MyApp/callback`
:::

Allow Auth0 to handle authentication callbacks. In your `AppDelegate.swift` add the following:

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any]) -> Bool {
    return Auth0.resumeAuth(url, options: options)
}
```

#### Authenticate with Auth0 hosted login page

The first step in adding authentication to your iOS application is to provide a way for your users to log in. The fastest, most secure, and most feature-rich way to do this with Auth0 is to use the [login page](/hosted-pages/login).

::: note
To ensure an [OpenID Connect compliant response](/api-auth/intro), you must either request an `audience` or enable the **OIDC Conformant** switch in your [Auth0 dashboard](${manage_url}), under **Client > Settings > Show Advanced Settings > OAuth**. For more information, refer to [How to use the new flows](/api-auth/intro#how-to-use-the-new-flows).
:::

```swift
Auth0
    .webAuth()
    .audience("https://${account.namespace}/userinfo")
    .start { result in
        switch result {
        case .success(let credentials):
            print("credentials: \(credentials)")
        case .failure(let error):
            print(error)
        }
    }
```

::: note
If you need help between the two types of login flows, refer to [Browser-Based vs. Native Login Flows on Mobile Devices](/tutorials/browser-based-vs-native-experience-on-mobile)
:::

#### Authenticate with a specific Auth0 connection

The `connection` option allows you to specify a connection that you wish to authenticate with. If no connection is specified here, the browser will show the Hosted Login page, with all of the connections which are enabled for this client.

```swift
Auth0
    .webAuth()
    .connection("facebook")
    .audience("https://${account.namespace}/userinfo")
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
    .audience("https://${account.namespace}/userinfo")
    .start { result in
        switch result {
        case .success(let credentials):
            print("credentials: \(credentials)")
        case .failure(let error):
            print(error)
        }
    }
```

### Getting user information

In order to retrieve a user's profile, you call the `userInfo` method and pass it the user's `accessToken`.  Although the call returns a [UserInfo](https://github.com/auth0/Auth0.swift/blob/master/Auth0/UserInfo.swift) instance, this is a basic OIDC conformant profile and the only guaranteed claim is the `sub` which contains the user's id, but depending on the requested scope the claims returned may vary.  You can also use the `sub` value to call the [Management API](#Management-API) and return a full user profile.

```swift
Auth0
   .authentication()
   .userInfo(withAccessToken: accessToken)
   .start { result in
       switch result {
       case .success(let profile):
           print("User Profile: \(profile)")
       case .failure(let error):
           print("Failed with \(error)")
       }
   }
```

## Using the Authentication API

The Authentication API provides methods to authenticate the user against Auth0 server.

### Login with a database connection

Logging in with a database connection requires calling `login` with the user's username/email, password, and the name of the connection (such as `Username-Password-Authentication`) you wish to authenticate with. The response will be a Credentials object.

```swift
Auth0
    .authentication()
    .login(
        usernameOrEmail: "support@auth0.com",
        password: "secret-password",
        realm: "Username-Password-Authentication",
        scope: "openid")
     .start { result in
         switch result {
         case .success(let credentials):
            print("Obtained credentials: \(credentials)")
         case .failure(let error):
            print("Failed with \(error)")
         }
     }
```

### Signing Up with database connection

Signing up requires calling the  `createUser` method, passing the user's given `email`, `password`, and the `connection` name to initiate the signup process. You can also specify additional user metadata to store.

```swift
Auth0
    .authentication()
    .createUser(
        email: "support@auth0.com",
        password: "secret-password",
        connection: "Username-Password-Authentication",
        userMetadata: ["first_name": "First",
                       "last_name": "Last"]
    )
    .start { result in
        switch result {
        case .success(let user):
            print("User Signed up: \(user)")
        case .failure(let error):
            print("Failed with \(error)")
        }
    }
```

### Passwordless

::: warning
This feature is disabled by default for new tenants as of 8 June 2017. If you would like this feature enabled, please [contact support](${env.DOMAIN_URL_SUPPORT}) to discuss your use case and prevent the possibility of introducing security vulnerabilities. For more information, refer to [Client Grant Types](/clients/client-grant-types).
:::

Logging in with Passwordless is slightly different. Passwordless authentication can be done via email or via SMS, and either by sending the user a code, or sending them a link which contains a code.

#### How Passwordless works

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
       realm: "Username-Password-Authentication"
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

#### Passwordless parameters

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

## Management API

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

### Unlinking users

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

::: note
Note that when accounts are linked, the secondary account's metadata is not merged with the primary account's metadata. Similarly, when unlinking two accounts, the secondary account does not retain the primary account's metadata when it becomes separate again.
:::

### Retrieving user metadata

```swift
Auth0
    .users(token: idToken)
    .get(userId, fields: ["user_metadata"], include: true)
    .start { result in
        switch result {
        case .success(let userInfo):
            print("user: \(userInfo)")
        case .failure(let error):
            print(error)
        }
    }
```

### Update user metadata

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
