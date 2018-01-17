---
title: Passwordless Authentication from Native Applications with Universal Login
---
# Passwordless Authentication from Native Applications with Universal Login

[Universal Login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using the login page for the best experience, security and the fullest array of features.

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/lock_centralized_login.png" alt="Hosted Login Page"></div>

::: note
Read the [Browser-Based vs. Native Login Flows on Mobile Devices](/tutorials/browser-based-vs-native-experience-on-mobile) article to learn how to choose between the two types of login flows.
:::

## Install Dependencies

### Carthage

If you are using Carthage, add the following to your `Cartfile`:

```ruby
github "auth0/Auth0.swift" ~> 1.0
```

Then, run `carthage bootstrap`.

::: note
For more information on how to use Carthage, read [their official documentation](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos).
:::

### Cocoapods

If you are using [Cocoapods](https://cocoapods.org/), add the following to your `Podfile`:

```ruby
use_frameworks!
pod 'Auth0', '~> 1.0'
```

Then, run `pod install`.

::: note
For more information on how to use Cocoapods, read the [Cocoapods documentation](http://guides.cocoapods.org/using/getting-started.html).
:::

## Add the Callback

For Auth0 to handle the authentication callback, update your `AppDelegate` file. 

First, import the `Auth0` module:

${snippet(meta.snippets.setup)}

Then, add the following `UIApplicationDelegate` method:

```swift
// AppDelegate.swift

func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any]) -> Bool {
    return Auth0.resumeAuth(url, options: options)
}
```

::: note
To configure callback, you must configure your callback URL first. Read about the Callback URL in the [Configure Callback](/quickstart/native/ios-swift/getting-started#configure-callback-urls) step.
:::

## Implement Universal Login

First, import the `Auth0` module in the file where you want to present the login page:

```swift
import Auth0
```

Then, present the login page:

```swift
// HomeViewController.swift

Auth0
    .webAuth()
    .scope("openid profile")
    .audience("https://${account.namespace}/userinfo")
    .start {
        switch $0 {
        case .failure(let error):
            // Handle the error
            print("Error: \(error)")
        case .success(let credentials):
            // Do something with credentials e.g.: save them.
            // Auth0 will automatically dismiss the hosted login page
            print("Credentials: \(credentials)")
        }
}
```

You need to make sure you get a response compliant with the OpenID Connect protocol. You can choose between two options:

* Set the audience
* Turn on the **OIDC conformant** switch in your Auth0 dashboard

This example sets the `audience` parameter to get an OIDC-compliant response. 

::: note
To turn on the **OIDC conformant** switch, in your [Client Settings](${manage_url}/#/applications/${account.clientId}/settings), click on **Show Advanced Settings** > **OAuth**. For more information, read [How to use the new flows](/api-auth/intro#how-to-use-the-new-flows).
:::

After the user authenticates, their information is returned in a `credentials` object.


