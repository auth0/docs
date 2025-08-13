---
title: Add Login to Your UWP application
description: This guide demonstrates how to integrate Auth0 with a UWP C# application using the OidcClient.UWP SDK.
interactive:  true
files:
 - files/MainPage.xaml
github:
  path: Quickstart/00-Starter-Seed
locale: en-US
---

# Add Login to Your UWP application

<p>This tutorial demonstrates how to add user login to a UWP C# application using Auth0. We recommend that you log in to follow this quickstart with examples configured for your account.</p><h2>System Requirements</h2><p>This tutorial and sample project have been tested with the following:</p><ul><li><p>Microsoft Visual Studio 2022</p></li><li><p>Windows 10 SDK (10.0.26100.0)</p></li><li><p>Auth0.OidcClient.UWP 4.0.0</p></li></ul><div></div><p></p>

# Configure Auth0

<%= include('../_includes/_getting_started', { library: 'Windows Universal' }) %>

<%= include('../../../_includes/_callback_url') %>

::: note
If you are following along with the sample project you downloaded from the top of this page, you should set the **Allowed Callback URLs** to `https://${account.namespace}/mobile`.
:::

<%= include('../../../_includes/_logout_url', { returnTo: 'https://' + account.namespace + '/mobile' }) %>

# Integrate Auth0 in your Application

## Install Dependencies

Use the NuGet Package Manager Console (Tools -> NuGet Package Manager -> Package Manager Console) to install the `Auth0.OidcClient.UWP` package, running the command:

${snippet(meta.snippets.dependencies)}

## Trigger Authentication {{{ data-action="code" data-code="MainPage.xaml.cs" }}}

To integrate Auth0 login into your application, simply instantiate an instance of the `Auth0Client` class, configuring the Auth0 Domain and Client ID:

${snippet(meta.snippets.setup)}

You can then call the `LoginAsync` method to log the user in:

${snippet(meta.snippets.use)}

![](/media/articles/native-platforms/windows-uwp-csharp/universal-login.png)

This loads the Auth0 login page into a web view. You can learn how to customize the login page at <a href="/universal-login#simple-customization" target="_blank" rel="noreferrer">this document</a>.

## Handle Authentication Tokens

The returned login result indicates whether authentication was successful, and if so contains the tokens and claims of the user.

### Authentication Error

You can check the `IsError` property of the result to see whether the login has failed. The `ErrorMessage` contains more information regarding the error which occurred.

```csharp
if (loginResult.IsError)
{
    Debug.WriteLine($"An error occurred during login: {loginResult.Error}")
}
```

### Accessing the tokens

On successful login, the login result contains the ID Token and Access Token in the `IdentityToken` and `AccessToken` properties respectively.

```csharp
if (!loginResult.IsError)
{
    Debug.WriteLine($"id_token: {loginResult.IdentityToken}");
    Debug.WriteLine($"access_token: {loginResult.AccessToken}");
}
```

### Obtaining the User Information

On successful login, the login result contains the user information in the `User` property, which is a <a href="https://msdn.microsoft.com/en-us/library/system.security.claims.claimsprincipal(v=vs.110).aspx" target="_blank" rel="noreferrer">ClaimsPrincipal</a>.

To obtain information about the user, you can query the claims. You can for example obtain the user's name and email address from the `name` and `email` claims:

```csharp
if (!loginResult.IsError)
{
    Debug.WriteLine($"name: {loginResult.User.FindFirst(c => c.Type == "name")?.Value}");
    Debug.WriteLine($"email: {loginResult.User.FindFirst(c => c.Type == "email")?.Value}");
}
```

::: note
The exact claims returned depends on the scopes that were requested. For more information see @scopes.
:::

You can obtain a list of all the claims contained in the ID Token by iterating through the `Claims` collection:

```csharp
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
await client.LogoutAsync();
```
