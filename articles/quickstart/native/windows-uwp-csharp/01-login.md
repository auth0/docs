---
title: Login
default: true
description: This tutorial demonstrates how to add user login to a Windows Universal C# application using Auth0.
budicon: 448
topics:
  - quickstarts
  - native
  - windows
  - uwp
  - csharp
github:
    path: Quickstart/00-Starter-Seed
contentType: tutorial
useCase: quickstart
---

<%= include('../_includes/_getting_started', { library: 'Windows Universal' }) %>

<%= include('../../../_includes/_callback_url') %>

For UWP applications, the callback URL needs to be in the format **ms-app://SID**, where **SID** is the **Package SID** for your application. Assuming you have associated your application with and application on the Windows Store, you can go to the Windows Developer Centre, go to the settings for your application, and then go to the App management > App identity section, where you will see the **Package SID** listed.

Alternatively - or if you have not associated your application with the Store yet - you can obtain the value by calling the `Windows.Security.Authentication.Web.WebAuthenticationBroker.GetCurrentApplicationCallbackUri()` method. So for example, in the `OnLaunched` method of your application, you can add the following line of code:

```csharp
// App.xaml.cs

protected override void OnLaunched(LaunchActivatedEventArgs e)
{
#if DEBUG
    if (System.Diagnostics.Debugger.IsAttached)
    {
        System.Diagnostics.Debug.WriteLine(Windows.Security.Authentication.Web.WebAuthenticationBroker.GetCurrentApplicationCallbackUri());
    }
#endif

    // rest of code omitted for brevity
}
```

This will print out the callback URL to your Debug window in Visual Studio. This is a bit of a painful process to obtain this URL, but it is important to use this URL otherwise the authentication process will not function correctly.

<%= include('../../../_includes/_logout_url') %>

The logout URL you need to whitelist in the **Allowed Logout URLs** field is the same as the callback URL obtained in the previous step. For more information check Web authenticator broker [documentation](https://docs.microsoft.com/en-us/windows/uwp/security/web-authentication-broker#connecting-with-single-sign-on-sso).

## Integrate Auth0 in your Application

### Install Dependencies

Use the NuGet Package Manager Console (Tools -> NuGet Package Manager -> Package Manager Console) to install the `Auth0.OidcClient.UWP` package, running the command:

${snippet(meta.snippets.dependencies)}

## Trigger Authentication

To integrate Auth0 login into your application, simply instantiate an instance of the `Auth0Client` class, configuring the Auth0 Domain and Client ID:

${snippet(meta.snippets.setup)}

You can then call the `LoginAsync` method to log the user in:

${snippet(meta.snippets.use)}

![](/media/articles/native-platforms/windows-uwp-csharp/lock-widget-screenshot.png)

This will load the Auth0 login page into a web view. You can learn how to customize the login page in [this document](/universal-login#simple-customization).

## Handle Authentication Tokens

The returned login result will indicate whether authentication was successful, and if so contain the tokens and claims of the user.

### Authentication Error

You can check the `IsError` property of the result to see whether the login has failed. The `ErrorMessage` will contain more information regarding the error which occurred.

```csharp
// MainPage.xaml.cs

var loginResult = await client.LoginAsync();

if (loginResult.IsError)
{
    Debug.WriteLine($"An error occurred during login: {loginResult.Error}")
}
```

### Accessing the tokens

On successful login, the login result will contain the ID Token and Access Token in the `IdentityToken` and `AccessToken` properties respectively.

```csharp
// MainPage.xaml.cs

var loginResult = await client.LoginAsync();

if (!loginResult.IsError)
{
    Debug.WriteLine($"id_token: {loginResult.IdentityToken}");
    Debug.WriteLine($"access_token: {loginResult.AccessToken}");
}
```

### Obtaining the User Information

On successful login, the login result will contain the user information in the `User` property, which is a [ClaimsPrincipal](https://msdn.microsoft.com/en-us/library/system.security.claims.claimsprincipal(v=vs.110).aspx).

To obtain information about the user, you can query the claims. You can for example obtain the user's name and email address from the `name` and `email` claims:

```csharp
// MainPage.xaml.cs

if (!loginResult.IsError)
{
    Debug.WriteLine($"name: {loginResult.User.FindFirst(c => c.Type == "name")?.Value}");
    Debug.WriteLine($"email: {loginResult.User.FindFirst(c => c.Type == "email")?.Value}");
}
```

::: note
The exact claims returned will depend on the scopes that were requested. For more information see @scopes.
:::

You can obtain a list of all the claims contained in the ID Token by iterating through the `Claims` collection:

```csharp
// MainPage.xaml.cs

if (!loginResult.IsError)
{
    foreach (var claim in loginResult.User.Claims)
    {
        Debug.WriteLine($"{claim.Type} = {claim.Value}");
    }
}
```

## Logout

To log the user out call the `LogoutAsync` method.

```csharp
// MainPage.xaml.cs

await client.LogoutAsync();
```
