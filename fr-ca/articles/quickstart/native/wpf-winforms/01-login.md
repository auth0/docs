---
title: Login
default: true
description: This tutorial demonstrates how to add user login to a WPF and Windows Forms C# application using Auth0.
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
---

<!-- markdownlint-disable MD002 MD034 MD041 -->

<%= include('../_includes/_getting_started', { library: 'Windows Forms or WPF' }) %>

<%= include('../../../_includes/_callback_url') %>

::: note
If you are following along with the sample project you downloaded from the top of this page, you should set the **Allowed Callback URLs** to `https://${account.namespace}/mobile`.
:::

<%= include('../../../_includes/_logout_url', { returnTo: 'https://' + account.namespace + '/mobile' }) %>

## Integrate Auth0 in your Application

### Install Dependencies

The `Auth0.OidcClient.WPF` or `Auth0.OidcClient.WinForms` NuGet packages helps you authenticate users with any [Auth0 supported identity provider](/identityproviders).

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the `Auth0.OidcClient.WPF` or `Auth0.OidcClient.WinForms` package, depending on whether you are building a WPF or Windows Forms application:

## Trigger Authentication

To integrate Auth0 login into your application, simply instantiate an instance of the `Auth0Client` class, passing your Auth0 Domain and Client ID in the constructor.

${snippet(meta.snippets.setup)}

You can then call the `LoginAsync` method to log the user in:

${snippet(meta.snippets.use)}

![](/media/articles/native-platforms/wpf-winforms/universal-login.png)

This will load the Auth0 login page into a web view. You can learn how to customize the login page in [this document](/universal-login#simple-customization).

## Handle Authentication Tokens

The returned login result will indicate whether authentication was successful, and if so contain the tokens and claims of the user.

### Authentication Error

You can check the `IsError` property of the result to see whether the login has failed. The `ErrorMessage` will contain more information regarding the error which occurred.

```csharp
var loginResult = await client.LoginAsync();

if (loginResult.IsError)
{
    Debug.WriteLine($"An error occurred during login: {loginResult.Error}");
}
```

### Accessing the tokens

On successful login, the login result will contain the ID Token and Access Token in the `IdentityToken` and `AccessToken` properties respectively.

```csharp
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
