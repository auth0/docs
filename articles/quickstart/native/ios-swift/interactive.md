---
title: Add Login to your iOS or macOS app
description: This guide demonstrates how to add authentication and gain access to user profile information in any iOS / macOS app using the Auth0.swift SDK.
interactive: true
files:
  - files/Auth0
  - files/MainView
  - files/ProfileView
  - files/User
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

# Add Login to Your iOS or macOS Application

This guide demonstrates how to add authentication and access user profile information in any iOS / macOS app using the [Auth0.swift](https://github.com/auth0/Auth0.swift) SDK.

To use this quickstart, you need to:
* Sign up for a free Auth0 account or log in to Auth0.
* Have an existing iOS / macOS app that you want to integrate. Alternatively, you can view or download a sample app after logging in.

## Configure Auth0 {{{ data-action=configure }}}

To use Auth0 services, you need an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the app you are developing.

### Configure an Auth0 application

Use the interactive selector to create a new Auth0 application or select an existing **Native** Auth0 application. Auth0 assigns every application an alphanumeric, unique Client ID that your app uses to call Auth0 APIs through the SDK.

Any settings you configure using this quickstart automatically update your Auth0 application in the <a href="${manage_url}/#/">Dashboard</a>, which is where you can manage your applications in the future.

If you would rather explore a complete configuration, you can view a sample app instead.

### Configure callback and logout URLs

Auth0 invokes the callback and logout URLs to redirect users back to your app. Auth0 invokes the callback URL after authenticating the user and the logout URL after removing the session cookie. If you do not set the callback and login URLs, users will not be able to log in and out of the app, and your app will produce an error.

::: note
On iOS 17.4+ and macOS 14.4+ it is possible to use Universal Links as callback and logout URLs. When enabled, Auth0.swift will fall back to using a custom URL scheme on older iOS / macOS versions.

**This feature requires Xcode 15.3+ and a paid Apple Developer account**.
:::

Add the following URLs to **Callback URLs** and **Logout URLs**, depending on the platform of your app. If you have a [custom domain](/customize/custom-domains), use this instead of your Auth0 tenant’s domain.

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

For example, if your iOS bundle identifier was `com.example.MyApp` and your Auth0 domain was `example.us.auth0.com`, then this value would be:

```text
https://example.us.auth0.com/ios/com.example.MyApp/callback,
com.example.MyApp://example.us.auth0.com/ios/com.example.MyApp/callback
```

### Configure the associated domain

::: warning
This step requires a paid Apple Developer account. It is needed to use Universal Links as callback and logout URLs. Skip this step to use a custom URL scheme instead.
:::

#### Configure the Team ID and bundle identifier

Go to the [settings page](${manage_url}/#/applications/${account.clientId}/settings) of your Auth0 application, scroll to the end, and open **Advanced Settings > Device Settings**. In the **iOS** section, set **Team ID** to your [Apple Team ID](https://developer.apple.com/help/account/manage-your-team/locate-your-team-id/), and **App ID** to your app's bundle identifier.

<p><img src="/media/articles/native-platforms/ios-swift/ios-device-settings.png" alt="Screenshot of the iOS section inside the Auth0 application settings page"></p>

This will add your app to your Auth0 tenant's `apple-app-site-association` file.

#### Add the associated domain capability

In Xcode, go to the **Signing and Capabilities** [tab](https://developer.apple.com/documentation/xcode/adding-capabilities-to-your-app#Add-a-capability) of your app's target settings, and press the **+ Capability** button. Then select **Associated Domains**.

<p><img src="/media/articles/native-platforms/ios-swift/ios-xcode-capabilities.png" alt="Screenshot of the capabilities library inside Xcode"></p>

Next, add the following [entry](https://developer.apple.com/documentation/xcode/configuring-an-associated-domain#Define-a-service-and-its-associated-domain) under **Associated Domains**:

```text
webcredentials:${account.namespace}
```

If you have a [custom domain](/customize/custom-domains), use this instead of your Auth0 tenant’s domain.

::: note
For the associated domain to work, your app must be signed with your team certificate **even when building for the iOS simulator**. Make sure you are using the Apple Team whose Team ID is configured in the settings page of your Auth0 application.
:::

## Install the SDK

### Using the Swift Package Manager

Open the following menu item in Xcode:

**File > Add Package Dependencies...**

In the **Search or Enter Package URL** search box enter this URL:

```text
https://github.com/auth0/Auth0.swift
```

Then, select the dependency rule and press **Add Package**.

::: note
For further reference on SPM, check its [official documentation](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app).
:::

### Using Cocoapods

Add the following line to your `Podfile`:

```ruby
pod 'Auth0', '~> 2.0'
```

Then, run `pod install`.

::: note
For further reference on Cocoapods, check their [official documentation](https://guides.cocoapods.org/using/getting-started.html).
:::

### Using Carthage

Add the following line to your `Cartfile`:

```text
github "auth0/Auth0.swift" ~> 2.0
```

Then, run `carthage bootstrap --use-xcframeworks`.

::: note
For further reference on Carthage, check their [official documentation](https://github.com/Carthage/Carthage#getting-started).
:::

## Configure the SDK {{{ data-action=code data-code="Auth0.plist" }}}

The Auth0.swift SDK needs your Auth0 **domain** and **Client ID**. You can find these values in the [settings page](${manage_url}/#/applications/${account.clientId}/settings) of your Auth0 application.

- **domain**: The domain of your Auth0 tenant. If you have a [custom domain](/customize/custom-domains), use this instead of your Auth0 tenant’s domain.
- **Client ID**: The alphanumeric, unique ID of the Auth0 application you set up earlier in this quickstart.

Create a `plist` file named `Auth0.plist` in your app bundle containing the Auth0 domain and Client ID values. 

::: note
You can also configure the SDK programmatically. Check the [README](https://github.com/auth0/Auth0.swift#configure-client-id-and-domain-programmatically) to learn more.
:::

::::checkpoint
:::checkpoint-default
You configured the Auth0.swift SDK. Run your app to verify that it is not producing any errors related to the SDK.
:::

:::checkpoint-failure
If your app produces errors related to the SDK:
- Make sure you selected the correct Auth0 application
- Verify you saved your URL updates
- Ensure you set the Auth0 domain and Client ID correctly

Still having issues? Check out our [documentation](https://github.com/auth0/Auth0.swift#documentation) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Add login to your application {{{ data-action=code data-code="MainView.swift#20:31" }}}

Import the `Auth0` module in the file where you want to present the login page. Then, present the [Universal Login](/authenticate/login/auth0-universal-login) page in the action of your **Login** button.

::: note
You can use async/await or Combine instead of the callback-based API. Check the [README](https://github.com/auth0/Auth0.swift#web-auth-login-ios--macos) to learn more.
:::

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/login-ios.png" alt="Screenshot of the Universal Login page"></div>

::::checkpoint
:::checkpoint-default
Press the **Login** button and verify that:
- An [alert box](https://github.com/auth0/Auth0.swift#sso-alert-box-ios--macos) shows up asking for consent.
- Choosing **Continue** opens the Universal Login page in a Safari modal.
- You can log in or sign up using a username and password or a social provider.
- The Safari modal closes automatically afterward.
:::

:::checkpoint-failure
If login fails or produces errors:
- Verify you entered the correct callback URL
- Ensure you set the Auth0 domain and Client ID correctly

Still having issues? Check out our [documentation](https://github.com/auth0/Auth0.swift#documentation) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Add logout to your application {{{ data-action=code data-code="MainView.swift#33:44" }}}

Now that you can log in to your app, you need a way to [log out](/authenticate/login/logout). In the action of your **Logout** button, call the `clearSession()` method to clear the Universal Login session cookie.

::::checkpoint
:::checkpoint-default
Press the **Logout** button and verify that:
- An alert box shows up asking for consent.
- Choosing **Continue** opens a page in a Safari modal.
- The Safari modal closes automatically soon after.
:::

:::checkpoint-failure
If logout fails or produces errors:
- Verify you entered the correct callback URL
- Ensure you set the Auth0 domain and Client ID correctly

Still having issues? Check out our [documentation](https://github.com/auth0/Auth0.swift#documentation) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Access user profile information {{{ data-action=code data-code="User.swift#11:14" }}}

The `Credentials` instance you obtained after logging in includes an [ID token](/secure/tokens/id-tokens). The ID token contains the profile information associated with the logged-in user, such as their email and profile picture. You can use these details to personalize the user interface of your app.

The Auth0.swift SDK includes a [utility](https://github.com/auth0/JWTDecode.swift) for decoding [JWTs](https://jwt.io/) like the ID token. Start by importing the `JWTDecode` module in the file where you want to access the user profile information. Then, use the `decode(jwt:)` method to decode the ID token and access the claims it contains.

::: note
You can retrieve the latest user information with the `userInfo(withAccessToken:)` method. Check the [EXAMPLES](https://github.com/auth0/Auth0.swift/blob/master/EXAMPLES.md#retrieve-user-information) to learn more.
:::

::::checkpoint
:::checkpoint-default
Verify that you can access the `email`, `picture`, or any other [claim](/secure/tokens/id-tokens/id-token-structure) after you have logged in.
:::

:::checkpoint-failure
If you cannot access the user information:
- Verify you imported the `JWTDecode` module where you invoke the `decode(jwt:)` method
- Make sure you spelled your claims correctly

Still having issues? Check out our [documentation](https://github.com/auth0/Auth0.swift#documentation) or visit our [community forums](https://community.auth0.com) to get more help.
:::
::::
