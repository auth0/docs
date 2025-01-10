---
title: Add login to your .NET MAUI application
default: true
description: This tutorial demonstrates how to add user login with Auth0 to a .NET MAUI application.
budicon: 448
topics:
  - quickstarts
  - native
  - maui
  - dotnet
  - android
  - ios
  - windows
github:
  path: Sample
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/main-page
---

# Add Login to Your MAUI Application

Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any .NET MAUI application using the Auth0 SDKs for [MAUI](https://www.nuget.org/packages/Auth0.OidcClient.MAUI/).

::: note
The MAUI SDK supports Android, iOS, macOS, and Windows. Continue reading for platform-specific configuration.
:::

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'myapp://callback',
  returnTo: 'myapp://callback'
}) %>

## Install the Auth0 SDK

Auth0 provides a [MAUI](https://www.nuget.org/packages/Auth0.OidcClient.MAUI/) SDK to simplify the process of implementing Auth0 authentication in MAUI applications.

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the `Auth0.OidcClient.MAUI` package.

Alternatively, you can use the Nuget Package Manager Console (`Install-Package`) or the `dotnet` CLI (`dotnet add`).

```ps
Install-Package Auth0.OidcClient.MAUI
```
```
dotnet add package Auth0.OidcClient.MAUI
```

## Platform specific configuration

You need some platform-specific configuration to use the SDK with Android and Windows.

### Android
Create a new Activity that extends `WebAuthenticatorCallbackActivity`:

```csharp
[Activity(NoHistory = true, LaunchMode = LaunchMode.SingleTop, Exported = true)]
[IntentFilter(new[] { Intent.ActionView },
              Categories = new[] { Intent.CategoryDefault, Intent.CategoryBrowsable },
              DataScheme = CALLBACK_SCHEME)]
public class WebAuthenticatorActivity : Microsoft.Maui.Authentication.WebAuthenticatorCallbackActivity
{
    const string CALLBACK_SCHEME = "myapp";
}
```

The above activity will ensure the application can handle the `myapp://callback` URL when Auth0 redirects back to the Android application after logging in.

### Windows
To make sure it can properly reactivate your application after being redirected back to Auth0, you need to do two things:

- Add the corresponding protocol to the `Package.appxmanifest`. In this case, this is set to `myapp`, but you can change this to whatever you like (ensure to update all relevant Auth0 URLs as well).
  ```xml
  <Applications>
    <Application Id="App" Executable="$targetnametoken$.exe" EntryPoint="$targetentrypoint$">
      <Extensions>
        <uap:Extension Category="windows.protocol">
          <uap:Protocol Name="myapp"/>
        </uap:Extension>
      </Extensions>
    </Application>
  </Applications>
  ```
- Call `Activator.Default.CheckRedirectionActivation()` in the Windows-specific `App.xaml.cs` file.
  ```csharp
  public App()
  {
    if (Auth0.OidcClient.Platforms.Windows.Activator.Default.CheckRedirectionActivation())
      return;
  
    this.InitializeComponent();
  }
  ```

## Instantiate the Auth0Client {{{ data-action="code" data-code="MainPage.xaml.cs#3-10" }}}

To integrate Auth0 into your application, instantiate an instance of the `Auth0Client` class, passing an instance of `Auth0ClientOptions` that contains your Auth0 Domain, Client ID and the required Scopes.
Additionally, you also need to configure the `RedirectUri` and `PostLogoutRedirectUri` to ensure Auth0 can redirect back to the application using the URL(s) configured.

```csharp
using Auth0.OidcClient;

var client = new Auth0Client(new Auth0ClientOptions
{
    Domain = "${account.namespace}",
    ClientId = "${account.clientId}",
    RedirectUri = "myapp://callback",
    PostLogoutRedirectUri = "myapp://callback",
    Scope = "openid profile email"
});
```

By default, the SDK will leverage Chrome Custom Tabs for Android, ASWebAuthenticationSession for iOS and macOS and use your system's default browser on Windows.

::::checkpoint

:::checkpoint-default

Your `Auth0Client` should now be properly instantiated. Run your application to verify that:
- the `Auth0Client` is instantiated correctly in the `MainPage`.
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

## Add login to your application {{{ data-action="code" data-code="MainPage.xaml.cs#25" }}}

Now that you have configured your Auth0 Application and the Auth0 SDK, you need to set up login for your project. To do this, you will use the SDK’s `LoginAsync()` method to create a login button that redirects users to the Auth0 Universal Login page. 

```csharp
var loginResult = await client.LoginAsync();
```

If there isn't any error, you can access the `User`, `IdentityToken`, `AccessToken` and `RefreshToken` on the `LoginResult` returned from `LoginAsync()`.

::::checkpoint

:::checkpoint-default

You should now be able to log in or sign up using a username and password.

Click the login button and verify that:
* your application redirects you to the Auth0 Universal Login page
* you can log in or sign up
* Auth0 redirects you to your application.

:::

:::checkpoint-failure
Sorry about that. Here's something to double-check:
* you called `LoginAsync` as expected

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Add logout to your application {{{ data-action="code" data-code="MainPage.xaml.cs#32" }}}

Users who log in to your project will also need a way to log out. Create a logout button using the SDK’s `LogoutAsync()` method. When users log out, they will be redirected to your Auth0 logout endpoint, which will then immediately redirect them back to the logout URL you set up earlier in this quickstart.

```csharp
await client.LogoutAsync();
```

::::checkpoint

:::checkpoint-default

Run your application and click the logout button, verify that:
* your application redirects you to the address you specified as one of the Allowed Logout URLs in your Application Settings
* you are no longer logged in to your application

:::

:::checkpoint-failure
Sorry about that. Here are a couple things to double-check:
* you configured the correct Logout URL
* you called `LogoutAsync` as expected.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::

## Show User Profile Information {{{ data-action="code" data-code="MainPage.xaml.cs#55-58" }}}

Now that your users can log in and log out, you will likely want to be able to retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with authenticated users. For example, you may want to be able to display a logged-in user’s name or profile picture in your project.

The Auth0 SDK for MAUI provides user information through the `LoginResult.User` property.
