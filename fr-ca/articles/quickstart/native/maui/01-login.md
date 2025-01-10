---
title: Add login to your MAUI application
default: true
description: This tutorial demonstrates how to add user login with Auth0 to a .NET MAUI application.
budicon: 448
topics:
  - quickstarts
  - native
  - xamarin
  - dotnet
  - android
  - ios
github:
    path: Sample
contentType: tutorial
useCase: quickstart
---

::: note
The MAUI SDK supports Android, iOS, macOS, and Windows. Continue reading for platform-specific configuration.
:::


<!-- markdownlint-disable MD002 MD041 -->

<%= include('../_includes/_getting_started') %>

<%= include('../../../_includes/_callback_url') %>

Callback URLs are the URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and appends additional parameters to it, including an access code which will be exchanged for an ID Token, Access Token, and Refresh Token.

Since callback URLs can be manipulated, you will need to add your application's URL to your application's *Allowed Callback URLs* for security. This will enable Auth0 to recognize these URLs as valid. If omitted, authentication will not be successful.

::: note
When following along with this quickstart, configure `myapp://callback` as the *Allowed Callback URLs*.
:::

<%= include('../../../_includes/_logout_url') %>

::: note
When following along with this quickstart, configure `myapp://callback` as the *Allowed Logout URLs*.
:::

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

## Instantiate the Auth0Client

To integrate Auth0 into your application, instantiate an instance of the `Auth0Client` class, passing an instance of `Auth0ClientOptions` that contains your Auth0 Domain, Client ID and the required Scopes.
Additionally, you also need to configure the `RedirectUri` and `PostLogoutRedirectUri` to ensure Auth0 can redirect back to the application using the URL(s) configured.

```csharp
using Auth0.OidcClient;

var client = new Auth0Client(new Auth0ClientOptions
{
    Domain = "${account.namespace}",
    ClientId = "${account.namespace}",
    RedirectUri = "myapp://callback",
    PostLogoutRedirectUri = "myapp://callback",
    Scope = "openid profile email"
});
```

By default, the SDK will leverage Chrome Custom Tabs for Android, ASWebAuthenticationSession for iOS and macOS and use your system's default browser on Windows.

## Add Login to Your Application

Now that you have configured your Auth0 Application and the Auth0 SDK, you need to set up login for your project. To do this, you will use the SDK’s `LoginAsync()` method to create a login button that redirects users to the Auth0 Universal Login page. 

```csharp
var loginResult = await client.LoginAsync();
```

If there isn't any error, you can access the `User`, `IdentityToken`, `AccessToken` and `RefreshToken` on the `LoginResult` returned from `LoginAsync()`.

## Add Logout to Your Application

Users who log in to your project will also need a way to log out. Create a logout button using the SDK’s `LogoutAsync()` method. When users log out, they will be redirected to your Auth0 logout endpoint, which will then immediately redirect them back to the logout URL you set up earlier in this quickstart.

```csharp
await client.LogoutAsync();
```

## Show User Profile Information

Now that your users can log in and log out, you will likely want to be able to retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with authenticated users. For example, you may want to be able to display a logged-in user’s name or profile picture in your project.

The Auth0 SDK for MAUI provides user information through the `LoginResult.User` property.

```csharp
if (loginResult.IsError == false)
{
    var user = loginResult.User;
    var name = user.FindFirst(c => c.Type == "name")?.Value;
    var email = user.FindFirst(c => c.Type == "email")?.Value;
    var picture = user.FindFirst(c => c.Type == "picture")?.Value;
}
```
