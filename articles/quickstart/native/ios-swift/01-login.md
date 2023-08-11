---
title: Login
description: This guide demonstrates how to integrate Auth0 with any new or existing iOS / macOS application using the Auth0.swift SDK.
seo_alias: swift
budicon: 448
topics:
  - quickstarts
  - native
  - ios
  - macos
  - swift
github:
  path: Sample-01
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD041 -->

## Configure Auth0

### Configure Callback and Logout URLs

The callback and logout URLs are the URLs that Auth0 invokes to redirect back to your application. Auth0 invokes the callback URL after authenticating the user, and the logout URL after removing the session cookie.

If the callback and logout URLs are not set, users will be unable to log in and out of the application and will get an error.

Go to the settings page of your [Auth0 application](${manage_url}/#/applications/${account.clientId}/settings) and add the corresponding URL to **Allowed Callback URLs** and **Allowed Logout URLs**, according to the platform of your application. If you are using a [custom domain](/customize/custom-domains), use the value of your custom domain instead of the Auth0 domain from the settings page.

#### iOS

```text
YOUR_BUNDLE_IDENTIFIER://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback
```

#### macOS

```text
YOUR_BUNDLE_IDENTIFIER://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback
```

For example, if your iOS bundle identifier was `com.example.MyApp` and your Auth0 domain was `example.us.auth0.com`, then this value would be:

```text
com.example.MyApp://example.us.auth0.com/ios/com.example.MyApp/callback
```

::: warning
Make sure that the [application type](/get-started/applications) of the Auth0 application is **Native**. If you don’t have a Native Auth0 application already, [create one](/get-started/auth0-overview/create-applications/native-apps) before continuing.
:::

### Configure a Custom URL Scheme

Back in Xcode, go to the **Info** tab of your application target settings. In the **URL Types** section, click the **＋** button to add a new entry. There, enter `auth0` into the **Identifier** field and `$(PRODUCT_BUNDLE_IDENTIFIER)` into the **URL Schemes** field.

<p><img src="/media/articles/native-platforms/ios-swift/url-scheme.png" alt="Custom URL Scheme"></p>

This registers your bundle identifer as a custom URL scheme, so the callback and logout URLs can reach your application.

## Install the SDK

Add the [Auth0.swift](https://github.com/auth0/Auth0.swift) SDK to your project. The library will make requests to the Auth0 Authentication and Management APIs.

### Swift Package Manager

Open the following menu item in Xcode:

**File > Add Packages...**

In the **Search or Enter Package URL** search box enter this URL:

```text
https://github.com/auth0/Auth0.swift
```

Then, select the dependency rule and press **Add Package**..

::: note
For further reference on SPM, check its [official documentation](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app).
:::

### Cocoapods

Add the following line to your `Podfile`:

```ruby
pod 'Auth0', '~> 2.0'
```

Then, run `pod install`.

::: note
For further reference on Cocoapods, check their [official documentation](https://guides.cocoapods.org/using/getting-started.html).
:::

### Carthage

Add the following line to your `Cartfile`:

```text
github "auth0/Auth0.swift" ~> 2.0
```

Then, run `carthage bootstrap --use-xcframeworks`.

::: note
For further reference on Carthage, check their [official documentation](https://github.com/Carthage/Carthage#getting-started).
:::

## Configure the SDK

The Auth0.swift SDK needs the **Client ID** and **domain** of the Auth0 application to communicate with Auth0. You can find these details in the [settings page](${manage_url}/#/applications/${account.clientId}/settings) of your Auth0 application. If you are using a [custom domain](/customize/custom-domains), use the value of your custom domain instead of the value from the settings page.

<% if(typeof hideDashboardScreenshot === 'undefined' || hideDashboardScreenshot !== true) { %>
![App Dashboard](/media/articles/dashboard/client_settings.png)
<% } %>

Create a `plist` file named `Auth0.plist` in your application bundle with the following content:

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

::: note
<% if(typeof hideDownloadSample === 'undefined' || hideDownloadSample !== true) { %>
If you download the sample from the top of this page, these details are filled out for you.
<% } %>
You can also configure the SDK programmatically. Check the [README](https://github.com/auth0/Auth0.swift#configure-client-id-and-domain-programmatically) to learn more.
:::

::: panel Checkpoint
Now that you have configured Auth0.swift with the Client ID and domain, run your application to verify that it is not producing any errors related to the SDK.
:::

## Login

Import the `Auth0` module in the file where you want to present the login page.

```swift
import Auth0
```

Then, present the [Universal Login](/authenticate/login/auth0-universal-login) page in the action of your **Login** button.

```swift
Auth0
    .webAuth()
    .start { result in
        switch result {
        case .success(let credentials):
            print("Obtained credentials: \(credentials)")
        case .failure(let error):
            print("Failed with: \(error)")
        }
    }
```

::: note
You can use async/await or Combine instead of the callback-based API. Check the [README](https://github.com/auth0/Auth0.swift#web-auth-login-ios--macos) to learn more.
:::

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/login-ios.png" alt="Universal Login"></div>

::: panel Checkpoint
Verify that pressing the **Login** button shows an [alert box](https://github.com/auth0/Auth0.swift#sso-alert-box-ios--macos) asking for consent and that choosing **Continue** opens the Universal Login page in a Safari modal. Verify that you can log in or sign up using a username and password or a social provider.

Once that's complete, verify that the Safari modal closes automatically.
:::

## Logout

Now that you can log in to your application, you need a way to [log out](/authenticate/login/logout). In the action of your **Logout** button, call the `clearSession()` method to clear the Universal Login session cookie.

```swift
Auth0
    .webAuth()
    .clearSession { result in
        switch result {
        case .success:
            print("Logged out")
        case .failure(let error):
            print("Failed with: \(error)")
        }
    }
```

::: panel Checkpoint
Verify that pressing the **Logout** button shows an alert box asking for consent and that choosing **Continue** opens a page in a Safari modal. Verify that the Safari modal closes automatically soon after.
:::

## Access User Profile Information

The `Credentials` instance you obtained after logging in includes an [ID Token](/secure/tokens/id-tokens). The ID Token contains the profile information associated with the logged-in user, such as their email and profile picture. You can use these details to personalize the user interface of your application.

The Auth0.swift SDK includes a [utility](https://github.com/auth0/JWTDecode.swift) for decoding [JWTs](https://jwt.io/) like the ID Token. Start by importing the `JWTDecode` module in the file where you want to access the user profile information.

```swift
import JWTDecode
```

Then, use the `decode(jwt:)` method to decode the ID Token and access the claims it contains.

```swift
guard let jwt = try? decode(jwt: credentials.idToken),
      let name = jwt["name"].string,
      let picture = jwt["picture"].string else { return }
print("Name: \(name)")
print("Picture URL: \(picture)")
```

::: note
You can retrieve the latest user information with the `userInfo(withAccessToken:)` method. Check the [EXAMPLES](https://github.com/auth0/Auth0.swift/blob/master/EXAMPLES.md#retrieve-user-information) to learn more.
:::

::: panel Checkpoint
Verify that you can access the `email`, `picture`, or any other [claim](/secure/tokens/id-tokens/id-token-structure) after you have logged in.
:::

## What's Next?

Check the SDK documentation to learn how to perform some common tasks, explore more advanced use cases, and discover all the available features:

- [Next steps](https://github.com/auth0/Auth0.swift#next-steps)
- [API documentation](https://auth0.github.io/Auth0.swift/)
- [FAQ](https://github.com/auth0/Auth0.swift/blob/master/FAQ.md)
