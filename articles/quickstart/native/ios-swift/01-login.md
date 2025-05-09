---
title: Login
description: This guide demonstrates how to integrate Auth0 with any new or existing iOS / macOS app using the Auth0.swift SDK.
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

You will need a **Native** Auth0 application. If you don’t have a Native Auth0 application already, <a href="/get-started/auth0-overview/create-applications/native-apps" target="_blank" rel="noreferrer">create one</a> before continuing. Avoid using other application types, as they have different configurations and may cause errors.

### Configure the callback and logout URLs

The callback and logout URLs are the URLs that Auth0 invokes to redirect back to your app. Auth0 invokes the callback URL after authenticating the user, and the logout URL after removing the session cookie.

If the callback and logout URLs are not set, users will be unable to log in and out of the app and will get an error.

::: note
On iOS 17.4+ and macOS 14.4+ it is possible to use Universal Links as callback and logout URLs. When enabled, Auth0.swift will fall back to using a custom URL scheme on older iOS / macOS versions.

**This feature requires Xcode 15.3+ and a paid Apple Developer account**.
:::

Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings" target="_blank" rel="noreferrer">settings page</a> of your Auth0 application and add the following URLs to **Allowed Callback URLs** and **Allowed Logout URLs**, depending on the platform of your app. If you have a <a href="/customize/custom-domains" target="_blank" rel="noreferrer">custom domain</a>, use this instead of the value from the settings page.

#### iOS

```text
https://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback,
YOUR_BUNDLE_IDENTIFIER://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback
```

#### macOS

```text
https://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback,
YOUR_BUNDLE_IDENTIFIER://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback
```

For example, if your iOS bundle identifier were `com.example.MyApp` and your Auth0 domain were `example.us.auth0.com`, then this value would be:

```text
https://example.us.auth0.com/ios/com.example.MyApp/callback,
com.example.MyApp://example.us.auth0.com/ios/com.example.MyApp/callback
```

### Configure the associated domain

::: warning
This step requires a paid Apple Developer account. It is needed to use Universal Links as callback and logout URLs. Skip this step to use a custom URL scheme instead.
:::

#### Configure the Team ID and bundle identifier

Scroll to the end of the settings page of your Auth0 application and open **Advanced Settings > Device Settings**. In the **iOS** section, set **Team ID** to your <a href="https://developer.apple.com/help/account/manage-your-team/locate-your-team-id/" target="_blank" rel="noreferrer">Apple Team ID</a>, and **App ID** to your app's bundle identifier.

<p><img src="/media/articles/native-platforms/ios-swift/ios-device-settings.png" alt="Screenshot of the iOS section inside the Auth0 application settings page"></p>

This will add your app to your Auth0 tenant's `apple-app-site-association` file.

#### Add the associated domain capability

In Xcode, go to the **Signing and Capabilities** <a href="https://developer.apple.com/documentation/xcode/adding-capabilities-to-your-app#Add-a-capability" target="_blank" rel="noreferrer">tab</a> of your app's target settings, and press the **+ Capability** button. Then select **Associated Domains**.

<p><img src="/media/articles/native-platforms/ios-swift/ios-xcode-capabilities.png" alt="Screenshot of the capabilities library inside Xcode"></p>

Next, add the following <a href="https://developer.apple.com/documentation/xcode/configuring-an-associated-domain#Define-a-service-and-its-associated-domain" target="_blank" rel="noreferrer">entry</a> under **Associated Domains**:

```text
webcredentials:${account.namespace}
```

If you have a <a href="/customize/custom-domains" target="_blank" rel="noreferrer">custom domain</a>, use this instead of the Auth0 domain from the settings page.

::: note
For the associated domain to work, your app must be signed with your team certificate **even when building for the iOS simulator**. Make sure you are using the Apple Team whose Team ID is configured in the settings page of your Auth0 application.
:::

## Install the SDK

Add the <a href="https://github.com/auth0/Auth0.swift" target="_blank" rel="noreferrer">Auth0.swift</a> SDK to your project. The library will make requests to the Auth0 Authentication and Management APIs.

### Using the Swift Package Manager

Open the following menu item in Xcode:

**File > Add Package Dependencies...**

In the **Search or Enter Package URL** search box enter this URL:

```text
https://github.com/auth0/Auth0.swift
```

Then, select the dependency rule and press **Add Package**..

::: note
For further reference on SPM, check its <a href="https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app" target="_blank" rel="noreferrer">official documentation</a>.
:::

### Using Cocoapods

Add the following line to your `Podfile`:

```ruby
pod 'Auth0', '~> 2.0'
```

Then, run `pod install`.

::: note
For further reference on Cocoapods, check their <a href="https://guides.cocoapods.org/using/getting-started.html" target="_blank" rel="noreferrer">official documentation</a>.
:::

### Using Carthage

Add the following line to your `Cartfile`:

```text
github "auth0/Auth0.swift" ~> 2.0
```

Then, run `carthage bootstrap --use-xcframeworks`.

::: note
For further reference on Carthage, check their <a href="https://github.com/Carthage/Carthage#getting-started" target="_blank" rel="noreferrer">official documentation</a>.
:::

## Configure the SDK

The Auth0.swift SDK needs the **Client ID** and **domain** of the Auth0 application to communicate with Auth0. You can find these details in the <a href="${manage_url}/#/applications/${account.clientId}/settings" target="_blank" rel="noreferrer">settings page</a> of your Auth0 application. If you are using a <a href="/customize/custom-domains" target="_blank" rel="noreferrer">custom domain</a>, use the value of your custom domain instead of the value from the settings page.

<% if(typeof hideDashboardScreenshot === 'undefined' || hideDashboardScreenshot !== true) { %>
![Screenshot of the Auth0 application settings page](/media/articles/dashboard/client_settings.png)
<% } %>

Create a `plist` file named `Auth0.plist` in your app bundle with the following content:

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
You can also configure the SDK programmatically. Check the <a href="https://github.com/auth0/Auth0.swift#configure-client-id-and-domain-programmatically" target="_blank" rel="noreferrer">README</a> to learn more.
:::

::: panel Checkpoint
Now that you have configured Auth0.swift with the Client ID and domain, run your app to verify that it is not producing any errors related to the SDK.
:::

## Login

Import the `Auth0` module in the file where you want to present the login page.

```swift
import Auth0
```

Then, present the <a href="/authenticate/login/auth0-universal-login" target="_blank" rel="noreferrer">Universal Login</a> page in the action of your **Login** button.

```swift
Auth0
    .webAuth()
    .useHTTPS() // Use a Universal Link callback URL on iOS 17.4+ / macOS 14.4+
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
You can use async/await or Combine instead of the callback-based API. Check the <a href="https://github.com/auth0/Auth0.swift#web-auth-login-ios--macos" target="_blank" rel="noreferrer">README</a> to learn more.
:::

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/login-ios.png" alt="Screenshot of the Universal Login page"></div>

::: panel Checkpoint
Verify that pressing the **Login** button shows an <a href="https://github.com/auth0/Auth0.swift#sso-alert-box-ios--macos" target="_blank" rel="noreferrer">alert box</a> asking for consent and that choosing **Continue** opens the Universal Login page in a Safari modal. Verify that you can log in or sign up using a username and password or a social provider.

Once that is complete, verify that the Safari modal closes automatically.
:::

## Logout

Now that you can log in to your app, you need a way to <a href="/authenticate/login/logout" target="_blank" rel="noreferrer">log out</a>. In the action of your **Logout** button, call the `clearSession()` method to clear the Universal Login session cookie.

```swift
Auth0
    .webAuth()
    .useHTTPS() // Use a Universal Link logout URL on iOS 17.4+ / macOS 14.4+
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

The `Credentials` instance you obtained after logging in includes an <a href="/secure/tokens/id-tokens" target="_blank" rel="noreferrer">ID Token</a>. The ID Token contains the profile information associated with the logged-in user, such as their email and profile picture. You can use these details to personalize the user interface of your app.

The Auth0.swift SDK includes a <a href="https://github.com/auth0/JWTDecode.swift" target="_blank" rel="noreferrer">utility</a> for decoding <a href="https://jwt.io/" target="_blank" rel="noreferrer">JWTs</a> like the ID Token. Start by importing the `JWTDecode` module in the file where you want to access the user profile information.

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
You can retrieve the latest user information with the `userInfo(withAccessToken:)` method. Check the <a href="https://github.com/auth0/Auth0.swift/blob/master/EXAMPLES.md#retrieve-user-information" target="_blank" rel="noreferrer">EXAMPLES</a> to learn more.
:::

::: panel Checkpoint
Verify that you can access the `email`, `picture`, or any other <a href="/secure/tokens/id-tokens/id-token-structure" target="_blank" rel="noreferrer">claim</a> after you have logged in.
:::

## What's Next?

Check the SDK documentation to learn how to perform some common tasks, explore more advanced use cases, and discover all the available features:

- <a href="https://github.com/auth0/Auth0.swift#next-steps" target="_blank" rel="noreferrer">Next steps</a>
- <a href="https://auth0.github.io/Auth0.swift/" target="_blank" rel="noreferrer">API documentation</a>
- <a href="https://github.com/auth0/Auth0.swift/blob/master/FAQ.md" target="_blank" rel="noreferrer">FAQ</a>
