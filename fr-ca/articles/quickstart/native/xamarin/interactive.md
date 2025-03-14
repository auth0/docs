---
title: Add login to your .NET Android or iOS application
default: true
description: This tutorial demonstrates how to add user login with Auth0 to a .NET Android or iOS application.
budicon: 448
topics:
  - quickstarts
  - native
  - xamarin
  - dotnet
  - android
  - ios
github:
  path: Quickstart/01-Login
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/main-activity
  - files/app-delegate
  - files/my-view-controller
---

# Add Login to .NET Android and iOS App

Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any .NET Android and iOS application using the Auth0 SDKs for [Android](https://www.nuget.org/packages/Auth0.OidcClient.AndroidX/) and [iOS](https://www.nuget.org/packages/Auth0.OidcClient.iOS).

::: note
This quickstart focusses on .NET Android and iOS, as they are the next generation of `Xamarin.Android` and `Xamarin.iOS`. If you are still using `Xamarin.Android` and `Xamarin.iOS`, you can follow this guide as well as integration is identical and the SDKs are compatible.
:::

To use this quickstart, you’ll need to:

- Sign up for a free Auth0 account or log in to Auth0.
- Have a working Android or iOS project using .NET 6 (or above) that you want to integrate with. Alternatively, you can view or download a sample application after logging in.

<%= include('_configure_urls_interactive') %>

## Install the Auth0 SDK

Auth0 provides an [Android](https://www.nuget.org/packages/Auth0.OidcClient.AndroidX/) and [iOS](https://www.nuget.org/packages/Auth0.OidcClient.iOS) SDK to simplify the process of implementing Auth0 authentication in .NET Android and iOS applications.

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the `Auth0.OidcClient.AndroidX` or `Auth0.OidcClient.iOS` package, depending on whether you are building an Android or iOS application.

Alternatively, you can use the Nuget Package Manager Console (`Install-Package`) or the `dotnet` CLI (`dotnet add`).

```ps
Install-Package Auth0.OidcClient.AndroidX
Install-Package Auth0.OidcClient.iOS
```
```
dotnet add Auth0.OidcClient.AndroidX
dotnet add Auth0.OidcClient.iOS
```

## Instantiate the Auth0Client

To integrate Auth0 into your application, instantiate an instance of the `Auth0Client` class, passing an instance of `Auth0ClientOptions` that contains your Auth0 Domain and Client ID.

```csharp
using Auth0.OidcClient;

var client = new Auth0Client(new Auth0ClientOptions
{
    Domain = "${account.namespace}",
    ClientId = "${account.namespace}"
});
```

By default, the SDK will leverage Chrome Custom Tabs for Android and ASWebAuthenticationSession for iOS.

::::checkpoint

:::checkpoint-default

Your `Auth0Client` should now be properly instantiated. Run your application to verify that:
- the `Auth0Client` is instantiated correctly in the `Activity` (Android) or `UIViewController` (iOS)
- your application is not throwing any errors related to Auth0

:::

:::checkpoint-failure
Sorry about that. Here are a couple things to double-check:
* make sure the correct application is selected
* did you save after entering your URLs?
* make sure the domain and client ID are imported correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Configure Android {{{ data-action="code" data-code="MainActivity.cs#2-9,14-18" }}}

After a user successfully authenticates, they will be redirected to the callback URL you set up earlier in this quickstart.

To handle the callback on Android devices, you need to register an intent that handles this callback URL. An easy way to do this is to register the intent on the same activity from which you called the LoginAsync method to instantiate the authentication flow.

Ensure to replace `YOUR_ANDROID_PACKAGE_NAME` in the code sample with the actual Package Name for your application, such as com.mycompany.myapplication, and ensure that all the text for the `DataScheme`, `DataHost`, and `DataPathPrefix` is in lower case. Also, set `LaunchMode = LaunchMode.SingleTask` for the Activity, otherwise the system will create a new instance of the activity every time the Callback URL gets called.

Additionally, you need to handle the intent in the `OnNewIntent` event in your `Activity` class. You need to notify the Auth0 OIDC Client to finish the authentication flow by calling the `Send` method of the `ActivityMediator` singleton, passing along the URL that was sent in.

## Configure iOS {{{ data-action="code" data-code="AppDelegate.cs#6-11" }}}

After a user successfully authenticates, they will be redirected to the callback URL you set up earlier in this quickstart.

To handle the callback on iOS devices:

- Open your application's `Info.plist` file in Visual Studio, and go to the **Advanced** tab.
- Under **URL Types**, click the **Add URL Type** button
- Set the **Identifier** as Auth0, the **URL Schemes** the same as your application's Bundle Identifier, and the **Role** as None

This is an example of the XML representation of your `info.plist` file after you have added the URL Type:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>None</string>
        <key>CFBundleURLName</key>
        <string>Auth0</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>YOUR_BUNDLE_IDENTIFIER</string>
        </array>
    </dict>
</array>
```

Additionally, you need to handle the Callback URL in the `OpenUrl` event in your `AppDelegate` class. You need to notify the Auth0 OIDC Client to finish the authentication flow by calling the `Send` method of the `ActivityMediator` singleton, passing along the URL that was sent in.

## Add Login to Your Application 

Now that you have configured your Auth0 Application and the Auth0 SDK, you need to set up login for your project. To do this, you will use the SDK’s `LoginAsync()` method to create a login button that redirects users to the Auth0 Universal Login page. 

```csharp
var loginResult = await client.LoginAsync();
```

If there isn't any error, you can access the `User`, `IdentityToken`, `AccessToken` and `RefreshToken` on the `LoginResult` returned from `LoginAsync()`.

::::checkpoint

:::checkpoint-default

You should now be able to log in or sign up using a username and password.

Click the login button and verify that:
* your Android or iOS application redirects you to the Auth0 Universal Login page
* you can log in or sign up
* Auth0 redirects you to your application.

:::

:::checkpoint-failure
Sorry about that. Here's something to double-check:
* you called `LoginAsync` as expected

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Add Logout to Your Application

Users who log in to your project will also need a way to log out. Create a logout button using the SDK’s `LogoutAsync()` method. When users log out, they will be redirected to your Auth0 logout endpoint, which will then immediately redirect them back to the logout URL you set up earlier in this quickstart.

```csharp
await client.LogoutAsync();
```

::::checkpoint

:::checkpoint-default

Run your application and click the logout button, verify that:
* your Android or iOS application redirects you to the address you specified as one of the Allowed Logout URLs in your Application Settings
* you are no longer logged in to your application

:::

:::checkpoint-failure
Sorry about that. Here are a couple things to double-check:
* you configured the correct Logout URL
* you called `LogoutAsync` as expected.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::

## Show User Profile Information

Now that your users can log in and log out, you will likely want to be able to retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with authenticated users. For example, you may want to be able to display a logged-in user’s name or profile picture in your project.

The Auth0 SDK for Android and iOS provides user information through the `LoginResult.User` property.

```csharp
if (loginResult.IsError == false)
{
    var user = loginResult.User;
    var name = user.FindFirst(c => c.Type == "name")?.Value;
    var email = user.FindFirst(c => c.Type == "email")?.Value;
    var picture = user.FindFirst(c => c.Type == "picture")?.Value;
}
```