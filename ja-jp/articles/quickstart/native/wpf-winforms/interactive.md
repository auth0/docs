---
title: Add login to your WinForms and WPF application
default: true
description: This tutorial demonstrates how to add user login with Auth0 to a WPF and WinForms application.
budicon: 448
topics:
  - quickstarts
  - native
  - windows
  - wpf
  - winforms
github:
    path: Quickstart/00-Starter-Seed
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/mainwindow
---

# Add Login to Your WPF Or WinForms Application

Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any WPF and WinForms application using the Auth0 SDKs for [WPF](https://www.nuget.org/packages/Auth0.OidcClient.WPF/) and [WinForms](https://www.nuget.org/packages/Auth0.OidcClient.WinForms).

To use this quickstart, you’ll need to:

- Sign up for a free Auth0 account or log in to Auth0.
- Have a working WPF or WinForms project that you want to integrate with. Alternatively, you can view or download a sample application after logging in.

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'http://' + account.namespace + ':4200/mobile',
  returnTo: 'http://' + account.namespace + ':4200/mobile'
}) %>

## Install the Auth0 SDK

Auth0 provides a [WPF](https://www.nuget.org/packages/Auth0.OidcClient.WPF/) and [WinForms](https://www.nuget.org/packages/Auth0.OidcClient.WinForms) SDK to simplify the process of implementing Auth0 authentication in WPF and WinForms applications.

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the `Auth0.OidcClient.WPF` or `Auth0.OidcClient.WinForms` package, depending on whether you are building a WPF or Windows Forms application.

Alternatively, you can use the Nuget Package Manager Console (`Install-Package`) or the `dotnet` CLI (`dotnet add`).

```ps
Install-Package Auth0.OidcClient.WPF
Install-Package Auth0.OidcClient.WinForms
```
```
dotnet add Auth0.OidcClient.WPF
dotnet add Auth0.OidcClient.WinForms
```

## Instantiate the Auth0Client {{{ data-action="code" data-code="MainWindow.xaml.cs#13:22" }}}

To integrate Auth0 into your application, instantiate an instance of the Auth0Client class, passing an instance of Auth0ClientOptions that contains your Auth0 Domain and Client ID.

By default, the SDK will leverage [WebView2](https://learn.microsoft.com/en-us/microsoft-edge/webview2/) for .NET6 and above, while relying on the older WebView on applications using any version that predates .NET6.

::::checkpoint

:::checkpoint-default

Your `Auth0Client` should now be properly instantiated. Run your application to verify that:
- the `Auth0Client` is instantiated correctly
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

## Add login to your application {{{ data-action="code" data-code="MainWindow.xaml.cs#24:35" }}}

Now that you have configured your Auth0 Application and the Auth0 SDK, you need to set up login for your project. To do this, you will use the SDK’s `LoginAsync()` method to create a login button that redirects users to the Auth0 Universal Login page. After a user successfully authenticates, they will be redirected to the callback URL you set up earlier in this quickstart.

If there isn't any error, you can access the `User`, `IdentityToken`, `AccessToken` and `RefreshToken` on the `LoginResult` returned from `LoginAsync()`.

::::checkpoint

:::checkpoint-default

You should now be able to log in or sign up using a username and password.

Click the login button and verify that:
* your WPF or WinForms Application redirects you to the Auth0 Universal Login page
* you can log in or sign up
* Auth0 redirects you to your application.

:::

:::checkpoint-failure
Sorry about that. Here's something to double-check:
* you called `LoginAsync` as expected

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Add logout to your application {{{ data-action="code" data-code="MainWindow.xaml.cs#37:40" }}}

Users who log in to your project will also need a way to log out. Create a logout button using the SDK’s `LogoutAsync()` method. When users log out, they will be redirected to your Auth0 logout endpoint, which will then immediately redirect them back to the logout URL you set up earlier in this quickstart.

::::checkpoint

:::checkpoint-default

Run your application and click the logout button, verify that:
* your WPF or WinForms application redirects you to the address you specified as one of the Allowed Logout URLs in your Application Settings
* you are no longer logged in to your application

:::

:::checkpoint-failure
Sorry about that. Here are a couple things to double-check:
* you configured the correct Logout URL
* you called `LogoutAsync` as expected.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::

## Show User Profile Information {{{ data-action=code data-code="MainWindow.xaml.js#30:33" }}}

Now that your users can log in and log out, you will likely want to be able to retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with authenticated users. For example, you may want to be able to display a logged-in user’s name or profile picture in your project.

The Auth0 SDK for WPF and WinForms provides user information through the `LoginResult.User` property.

::::checkpoint

:::checkpoint-default

Verify that:
* you can display the user's name or any other user property after you have logged in

:::

:::checkpoint-failure
Sorry about that. Here are a couple things to double-check:
* the `LoginResult.IsError` is false
* if the `LoginResult.IsError` isn't false, be sure to check `LoginResult.Error` for details.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::

::::
