---
title: Custom Login Form
description: This tutorial demonstrates how to perform Login and Sign Up by creating your own Login form.
budicon: 448
tags:
  - quickstarts
  - native
  - ios
  - swift
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-sample',
  branch: 'embedded-login',
  path: '02-Custom-Login-Form',
  requirements: [
    'CocoaPods 1.2.1',
    'Version 8.3.2 (8E2002)',
    'iPhone 7 - iOS 10.3 (14E269)'
  ]
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
        usernameOrEmail: "email@foo.com",
        password: "123456",
        realm: "Username-Password-Authentication",
        scope: "openid profile"
    )
    .start { result in
        switch result {
        case .success(let credentials):
            // Logged in successfully
            // You've got a Credentials instance, which you'll use, for example, to retrieve the User Profile
        case .failure(let error):
            // You've got an error
        }
    }
```

That's it! You'll get either a `credentials` object or an `error` case after performing a login.

Basically, `credentials` contains token-related information; you will normally store this object for later use. On the other hand, `error` is an enum containing possible authentication error cases that you might want to keep track of.

::: note
For further reference on the `Credentials` object, see [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift) documentation.
:::

## Retrieve the User Profile

Once you've obtained a `Credentials` object, retrieving a user profile is quite simple. All you have to do is:

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

::: note
For further reference on the `profile` object, see [Profile](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Profile.swift) documentation.
:::

## Implement a Sign Up

First, import the `Auth0` module in the file where you want to present the Sign Up dialog:

```swift
import Auth0
```

Next add the following:

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
        case .success(let credentials):
            // Registered successfully
            // You've got a Credentials object
        case .failure(let error):
            // You've got an error
        }
    }
}
```

Notice that any extra information that you need to add to the user's profile, other than the `email` and `password`, goes within the `userMetadata` dictionary, which is passed as a parameter to this function.

## Perform Social Authentication

First, go to your [Application Dashboard](${manage_url}/#/applications/${account.clientId}/settings/${account.clientId}/settings) and make sure that *Allowed Callback URLs* contains the following:

```shell
{YOUR_APP_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{YOUR_APP_BUNDLE_IDENTIFIER}/callback
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

::: note
The **Auth0.swift** toolkit will only handle URLs with your Auth0 domain as host, for instance: `com.auth0.MyApp://samples.auth0.com/ios/com.auth0.MyApp/callback`
:::

Then, add the following function in your application's `AppDelegate`:

```swift
import Auth0
```

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
    return Auth0.resumeAuth(url, options: options)
}
```

### Web Authentication

Finally, you can now perform webAuth authentication by specifying the social connection name, for example with Facebook.

```swift
Auth0
    .webAuth()
    .audience("https://${account.namespace}/userinfo")
    .scope("openid profile")
    .connection("facebook")
    .start { result in
        switch result {
        case .success(let credentials):
            // You've got your credentials
        case .failure(let error):
            // Handle the error
        }
    }
```

Once you obtain the `credentials` object upon a successful authentication, you can deal with them as usual.

#### Connection Scopes

If you need additional provider permissions these can be specified using the `connectionScope` method and providing
a comma separated list of provider permissions.

```swift
Auth0
    .webAuth()
    .audience("https://${account.namespace}/userinfo")
    .connection("facebook")
    .connectionScope("public_profile,email,user_friends,user_birthday")
    .scope("openid profile")
    .start { result in
        switch result {
        case .success(let credentials):
            // You've got your credentials
        case .failure(let error):
            // Handle the error
        }
    }
```
