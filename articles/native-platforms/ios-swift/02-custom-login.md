---
title: Custom Login
description: This tutorial demonstrates how to perform Login and Sign Up by using your own View Controllers, without using the Lock widget interface.
budicon: 448
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-sample',
  path: '02-Custom-Login'
}) %>

## Implement the Login

First, import the `Auth0` module in the file where you want to present the login dialog:

```swift
import Auth0
```

Then, add the following code to perform a login:

```swift
Auth0
    .authentication()
    .login(
        emailOrUsername: "email@foo.com",
        password: "123456",
        connection: "Username-Password-Authentication"
    )
    .start { result in
            switch result {
            case .Success(let credentials):
                // Logged in successfully
                // You've got a Credentials instance, which you'll use, for example, to retrieve the User Profile
            case .Failure(let error):
                // You've got an error
            }
    }
```

That's it! You'll get either a `credentials` object or an `error` case after performing a login.

Basically, `credentials` contains token-related information; you will normally store this object for later use. On the other hand, `error` is an enum containing possible authentication error cases that you might want to keep track of.

> For further reference on the `credentials` and `error` objects, check the [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Authentication/Credentials.swift) and [Authentication](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Authentication/Authentication.swift) files documentation.

## Retrieve the User Profile

Once you've obtained a `Credentials` object, retrieving a user profile is quite simple. All you have to do is:

```swift
guard let idToken = credentials.idToken else { return }
Auth0
    .authentication()
    .tokenInfo(token: idToken)
    .start { result in
        switch result {
        case .Success(let profile):
            // You've got a UserProfile object
        case .Failure(let error):
            // You've got an error
        }
}
```

A trivial example of how to use some profile info:

```swift
welcomeLabel.text = "Welcome, \(profile.name)!"
memberLabel.text = "You are member since \(profile.createdAt)"
```

> For further reference on the `profile` and `error` objects, check the [UserProfile](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Authentication/UserProfile.swift) and [Authentication](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Authentication/Authentication.swift) files documentation.

## Implement a Sign Up

Including a register process in your app is also a piece of cake.

First, don't forget to import the toolkit module in your register form view controller:

```swift
import Auth0
```

Then, all you have to do is:

```swift
Auth0
    .authentication()
    .signUp(
        email: "foo@email.com",
        password: "123456",
        connection: "Username-Password-Authentication",
        userMetadata: ["first_name": "Foo", "last_name": "Bar"] // or any extra user data you need
    )
    .start { result in
            switch result {
            case .Success(let credentials):
              // Registered successfully
              // You've got a Credentials object
            case .Failure(let error):
                // You've got an error
            }
        }
}
```

Notice that any extra information that you need to add to the user's profile, other than the `email` and `password`, goes within the `userMetadata` dictionary, which is passed as a parameter to this function.

## Perform Social Authentication

First, go to your [Client Dashboard](${manage_url}/#/applications/${account.clientId}/settings/${account.clientId}/settings) and make sure that *Allowed Callback URLs* contains the following:

```shell
{YOUR_APP_BUNDLE_IDENTIFIER}://${account.domain}/ios/{YOUR_APP_BUNDLE_IDENTIFIER}/callback
```

In your application's `Info.plist` file, register your iOS Bundle Identifier as a custom scheme. To do so, open the `Info.plist` as source code, and add this chunk of code under the main `<dict>` entry:

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
            <string>{YOUR_APP_BUNDLE_IDENTIFIER}</string>
        </array>
    </dict>
</array>
```

Remember to replace all the `{YOUR_APP_BUNDLE_IDENTIFIER}` appearances with your actual app's bundle identifier, which you can get from your project settings.

> The **Auth0.swift** toolkit will only handle URLs with your Auth0 domain as host, for instance: `com.auth0.MyApp://samples.auth0.com/ios/com.auth0.MyApp/callback`

Then, add the following function in your application's `AppDelegate`:

```swift
import Auth0
```

```swift
func application(app: UIApplication, openURL url: NSURL, options: [String : AnyObject]) -> Bool {
    return Auth0.resumeAuth(url, options: options)
}
```

Finally, perform webauth social authentication by specifying a social connection, for instance, Facebook:

```swift
Auth0
    .webAuth()
    .connection("facebook")
    .scope("openid")
    .start { result in
        switch result {
        case .Success(let credentials):
            // You've got your credentials
        case .Failure(let error):
            // Handle the error
        }
    }
```

Once you get the `credentials` object, upon a successful authentication, you deal with them as usual. For more information on that topic, check out the [login](01-login) and [session handling](session-handling) tutorials.
