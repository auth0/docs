---
title: Add Login to your iOS or macOS app
description: This guide demonstrates how to add authentication and gain access to user profile information in any iOS / macOS app using the Auth0.swift SDK.
interactive: true
files:
  - files/Auth0
  - files/ContentView
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

# Add Login to your iOS or macOS app

This guide demonstrates how to add authentication and gain access to user profile information in any iOS / macOS app using the [Auth0.swift](https://github.com/auth0/Auth0.swift) SDK.

To use this quickstart, you’ll need to:
* Sign up for a free Auth0 account or log in to Auth0.
* Have an existing iOS / macOS app that you want to integrate with. Alternatively, you can view or download a sample app after logging in.

## Configure Auth0 {{{ data-action=configure }}}

To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the app you are developing.

### Configure an Auth0 application

Use the interactive selector to create a new Auth0 application or select an existing application that represents the iOS or macOS app you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique Client ID that your app will use to call Auth0 APIs through the SDK.

Any settings you configure using this quickstart will automatically update for your Auth0 application in the <a href="${manage_url}/#/">Dashboard</a>, which is where you can manage your applications in the future.

If you would rather explore a complete configuration, you can view a sample app instead.

### Configure callback and logout URLs

The callback and logout URLs are the URLs that Auth0 invokes to redirect back to your app. Auth0 invokes the callback URL after authenticating the user, and the logout URL after removing the session cookie. If the callback and logout URLs are not set, users will be unable to log in and out of the app and will get an error.

Add the corresponding URL to **Callback URLs** and **Logout URLs**, according to the platform of your app. If you are using a [Custom Domain](/customize/custom-domains), use the value of your Custom Domain instead of your Auth0 tenant's domain.

#### iOS

```text
YOUR_BUNDLE_IDENTIFIER://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback
```

#### macOS

```text
YOUR_BUNDLE_IDENTIFIER://${account.namespace}/macos/YOUR_BUNDLE_IDENTIFIER/callback
```

E.g. if your iOS bundle identifier was `com.company.myapp` and your Auth0 tenant's domain was `company.us.auth0.com`, then this value would be:

```text
com.company.myapp://company.us.auth0.com/ios/com.company.myapp/callback
```

## Configure your app

You need to register your bundle identifer as a custom URL scheme so the callback and logout URLs can reach your app.

Back in Xcode, go to the **Info** tab of your app target settings. In the **URL Types** section, click the **＋** button to add a new entry. There, enter `auth0` into the **Identifier** field and `$(PRODUCT_BUNDLE_IDENTIFIER)` into the **URL Schemes** field.

<p><img src="/media/articles/native-platforms/ios-swift/url-scheme.png" alt="Custom URL Scheme"></p>

## Install the SDK

### Swift Package Manager

Open the following menu item in Xcode:

**File > Add Packages...**

In the **Search or Enter Package URL** search box enter this URL:

```text
https://github.com/auth0/Auth0.swift
```

Then, select the dependency rule and press **Add Package**..

::: note
For further reference on SPM, check its [official documentation](https://developer.apple.com/documentation/swift_packages/adding_package_dependencies_to_your_app).
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

## Configure the SDK {{{ data-action=code data-code="Auth0.plist" }}}

The Auth0.swift SDK needs to be configured with your Auth0 **Domain** and **Client ID**. You can find these values in the [settings page](${manage_url}/#/applications/${account.clientId}/settings) of your Auth0 application.

- **Domain**: The domain of your Auth0 tenant. If you are using a [Custom Domain](/customize/custom-domains), you should set this to the value of your Custom Domain instead.
- **Client ID**: The alphanumeric, unique ID of the Auth0 Application you set up earlier in this quickstart.

Create a `plist` file named `Auth0.plist` in your app bundle containing the Auth0 Domain and Client ID values. 

::: note
You can also configure the SDK programmatically. Check the [README](https://github.com/auth0/Auth0.swift#configure-client-id-and-domain-programmatically) to learn more.
:::

::::checkpoint
:::checkpoint-default
The Auth0.swift SDK should now be properly configured. Run your app to verify that it is not producing any errors related to the SDK.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
- Make sure the correct Auth0 application is selected.
- Did you press the **Save** button after entering your URLs?
- Make sure the Auth0 Domain and Client ID are set correctly.

Still having issues? Check out our [documentation]() or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Add login to your app {{{ data-action=code data-code="ContentView.swift#21:33" }}}

Import the `Auth0` module in the file where you want to present the login page. Then, present the [Universal Login](/authenticate/login/auth0-universal-login) page in the action of your **Login** button.

::: note
You can use async/await or Combine instead of the callback-based API. Check the [README](https://github.com/auth0/Auth0.swift#web-auth-login-ios--macos) to learn more.
:::

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/login-ios.png" alt="Universal Login"></div>

::::checkpoint
:::checkpoint-default
Press the **Login** button and verify that:
- An [alert box](https://github.com/auth0/Auth0.swift#sso-alert-box-ios--macos) shows up asking for consent.
- Choosing **Continue** opens the Universal Login page in a Safari modal.
- You can log in or sign up using a username and password or a social provider.
- The Safari modal closes automatically afterwards.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
- Did you enter the correct callback URL value?
- Make sure the Auth0 Domain and Client ID are set correctly.

Still having issues? Check out our [documentation]() or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Add logout to your app {{{ data-action=code data-code="ContentView.swift#35:46" }}}

Now that you can log in to your app, you need a way to [log out](/authenticate/login/logout). In the action of your **Logout** button, call the `clearSession()` method to clear the Universal Login session cookie.

::::checkpoint
:::checkpoint-default
Press the **Logout** button and verify that:
- An alert box shows up asking for consent.
- Choosing **Continue** opens a page in a Safari modal.
- The Safari modal closes automatically soon after.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
- Did you enter the correct logout URL value?
- Make sure the Auth0 Domain and Client ID are set correctly.

Still having issues? Check out our [documentation]() or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Access user profile information {{{ data-action=code data-code="User.swift#15:18" }}}

The `Credentials` instance you obtained after logging in includes an [ID Token](/secure/tokens/id-tokens). The ID Token contains the profile information associated with the logged-in user, such as their name or profile picture. You can use these details to personalize the user interface of your app.

The Auth0.swift SDK includes a [utility](https://github.com/auth0/JWTDecode.swift) for decoding [JWTs](https://jwt.io/) like the ID Token. Start by importing the `JWTDecode` module in the file where you want to access the user profile information. Then, use the `decode(jwt:)` method to decode the ID Token and access the claims it contains.

::: note
You can retrieve the latest user information with the `userInfo(withAccessToken:)` method. Check the [README](https://github.com/auth0/Auth0.swift#retrieve-user-information) to learn more.
:::

::::checkpoint
:::checkpoint-default
Verify that you can access the `email`, `picture`, or any other [claim](/secure/tokens/id-tokens/id-token-structure) after you have logged in.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
- Did you import the `JWTDecode` module in the file where you're calling the `decode(jwt:)` method?
- Make sure the claims are spelled correctly.

Still having issues? Check out our [documentation]() or visit our [community page](https://community.auth0.com) to get more help.
:::
::::
