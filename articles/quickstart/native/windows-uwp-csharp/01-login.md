---
title: Login
default: true
description: This tutorial will show you how to use the Auth0 Windows Universal App C# SDK to add authentication and authorization to your app.
budicon: 448
github:
    path: Quickstart/00-Starter-Seed
---

This tutorial explains how to integrate the Auth0 OIDC Application with a Windows UWP (Universal Windows Platform) C# application. The NuGet package `Auth0.OidcClient.UWP` helps you authenticate users with any [Auth0 supported identity provider](/identityproviders).

<%= include('../_includes/_dotnet-oidc-client-configuration') %>

## Install the Auth0.OidcClient.UWP NuGet Package

Use the NuGet Package Manager Console (Tools -> NuGet Package Manager -> Package Manager Console) to install the `Auth0.OidcClient.UWP` package, running the command:

${snippet(meta.snippets.dependencies)}

## Set Up the Auth0 Callback URL

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

This will print out the callback URL to your Debug window in Visual Studio.

<div class="setup-callback">
<p>Once you have the correct callback URL, go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in the Auth0 dashboard and make sure that <strong>Allowed Callback URLs</strong> contains the value of the callback URL, such as</p>

<pre><code>ms-app://S-1-xxx...</pre></code>
</div>

This is a bit of a painful process to obtain this URL, but it is important to use this URL otherwise the SSO will not function correctly.

## Integration

To integrate Auth0 login into your application, simply instantiate an instance of the `Auth0Client` class, configuring the Auth0 Domain and Client ID:

${snippet(meta.snippets.setup)}

You can then call the `LoginAsync` method to log the user in:

${snippet(meta.snippets.use)}

![](/media/articles/native-platforms/windows-uwp-csharp/lock-widget-screenshot.png)

## Accessing the User's Information

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

On successful login, the login result will contain the `id_token` and `access_token` in the `IdentityToken` and `AccessToken` properties respectively.

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

You can obtain a list of all the claims contained in the `id_token` by iterating through the `Claims` collection:

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

## More Information

For more information, please refer to the [Auth0 OIDC Client Documentation](https://auth0.github.io/auth0-oidc-client-net/documentation/intro.html).
