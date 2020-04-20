<!-- markdownlint-disable MD002 MD041 -->

## Before You Start

This tutorial demonstrates how to add user login to a Swift application using Web Authentication with Auth0. Alternatively, check out the [iOS Swift - Sign In With Apple tutorial](/quickstart/native/ios-swift-siwa).

<%= include('../../_includes/_getting_started', { library: 'Swift' }) %>

Add your credentials in `Auth0.plist`. If the file does not exist in your project yet, create one with the information below ([Apple documentation on Property List Files](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html)):

```xml
<!-- Auth0.plist -->

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

<%= include('../../../../_includes/_callback_url') %>

In your application's `Info.plist` file, register your iOS Bundle identifier as a custom scheme:

```xml
<!-- Info.plist -->

<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>None</string>
        <key>CFBundleURLName</key>
        <string>auth0</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
        </array>
    </dict>
</array>
```

::: note
If your `Info.plist` file is not in the format shown above, you can right-click `Info.plist` in Xcode and select **Open As** > **Source Code**.
:::

Go to your [Dashboard Settings](${manage_url}/#/applications/${account.clientId}/settings) and make sure that the **Allowed Callback URLs** field contains the following callback URL:

```text
{PRODUCT_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{PRODUCT_BUNDLE_IDENTIFIER}/callback
```

e.g. If your bundle identifier was com.company.myapp and your domain was company.auth0.com then this value would be

```text
com.company.myapp://company.auth0.com/ios/com.company.myapp/callback
```

# Start the Authentication

[Universal Login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features.

::: note
You can also embed the login dialog directly in your application using the [Lock widget](/lock). If you use this method, some features, such as single sign-on, will not be accessible.
To learn how to embed the Lock widget in your application, follow the [Embedded Login sample](https://github.com/auth0-samples/auth0-ios-swift-sample/tree/embedded-login/01-Embedded-Login). Make sure you read the [Browser-Based vs. Native Login Flows on Mobile Devices](/tutorials/browser-based-vs-native-experience-on-mobile) article to learn how to choose between the two types of login flows.
:::

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/lock_centralized_login.png" alt="login page"></div>

<%= include('../../_includes/_ios_dependency_centralized') %>

## Add the Callback

For Auth0 to handle the authentication callback, update your `AppDelegate` file.

First, import the `Auth0` module:

${snippet(meta.snippets.setup)}

Then, add the following `UIApplicationDelegate` method:

```swift
// AppDelegate.swift

func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any]) -> Bool {
    return Auth0.resumeAuth(url, options: options)
}
```

## Implement Login

First, import the `Auth0` module in the file where you want to present the login page:

${snippet(meta.snippets.setup)}

Then, present the login screen:

${snippet(meta.snippets.use)}

This adds the `profile` scope to enable [retrieving the User Profile](/quickstart/native/ios-swift/03-user-sessions#fetch-the-user-profile).

After the user authenticates, their information is returned in a `Credentials` object.

::: note
To learn more about the `Credentials` object, read the [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift) article.
:::

<%= include('../../../../_includes/_logout_url') %>

## Implement Logout

To clear the session on the server side you need to invoke the `clearSession` method. Add the following snippet:

```swift
// HomeViewController.swift

Auth0
    .webAuth()
    .clearSession(federated:false) {
        switch $0 {
            case true:
                ...
            case false:
                ...
        }
    }
```

Go to your [Dashboard Settings](${manage_url}/#/applications/${account.clientId}/settings) and make sure that the **Allowed Logout URL** field contains the following logout callback URL:

```text
{PRODUCT_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{PRODUCT_BUNDLE_IDENTIFIER}/callback
```

After the call, the callback will receive a BOOL with the logout status.

::: note
Replace `{PRODUCT_BUNDLE_IDENTIFIER}` with your application's Bundle Identifier, available as the `Bundle Identifier` attribute inside the `Identity` section, on your app project properties.
:::