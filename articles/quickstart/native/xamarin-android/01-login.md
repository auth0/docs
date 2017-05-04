---
title: Login
default: true
description: This tutorial will show you how to use the Auth0 Xamarin SDK to add authentication and authorization to your mobile app.
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-community',
  repo: 'auth0-xamarin-android-oidc-samples',
  path: 'Quickstart/01-Login',
  requirements: [
    'Visual Studio 2017 or Visual Studio for Mac',
    'Xamarin.Android (7.2.0.7)',
    'Auth0.OidcClient.Android 1.0.0'
  ]
}) %>

This tutorial explains how to integrate the Auth0 OIDC Client with a Xamarin Android C# application. The NuGet package `Auth0.OidcClient.Android` helps you authenticate users with any [Auth0 supported identity provider](/identityproviders).

## Install the Auth0.OidcClient.Android NuGet Package

${snippet(meta.snippets.dependencies)}

## Set Up the Auth0 Callback URL

Callback URLs are the URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and appends additional parameters to it, including an access code which will be exchanged for an `id_token`, `access_token` and `refresh_token`. 

Since callback URLs can be manipulated, you will need to add your application's URL to your client's *Allowed Callback URLs* for security. This will enable Auth0 to recognize these URLs as valid. If omitted, authentication will not be successful.

Go to your [Client's Dashboard](${manage_url}/#/applications/${account.clientId}/settings) and make sure that *Allowed Callback URLs* contains the following:

`{YOUR_ANDROID_PACKAGE_NAME}://${account.namespace}/android/{YOUR_ANDROID_PACKAGE_NAME}/callback`

Ensure that the Callback URL is all in lowercase.

## Integration

To integrate Auth0 login into your application, simply instantiate an instance of the `Auth0Client` class, configuring the Auth0 Domain and Client ID: 

${snippet(meta.snippets.setup)}

Logging the user in is a multi step process:

### 1. Obtain the authorization URL

Call the `PrepareLoginAsync` method which will return an `AuthorizeState` containing the authorization URL, state, nonce and code challenge. You will need to store the `AuthorizeState` as it is required later on to process the redirect URL and exchange the authorization code for the tokens.

${snippet(meta.snippets.use)}

### 2. Launch the browser to authorize the user

You will need to navigate the user to the authorization URL in the system browser. You can use the [Chrome Custom Tabs Manager](https://developer.chrome.com/multidevice/android/customtabs) to achieve this.

Ensure that you have installed the Custom Tabs Support Library:

```text
Install-Package Xamarin.Android.Support.CustomTabs
```

Then create a custom tabs intent, and launch the authorization URL which was returned in the `AuthorizeState`:

```
var customTabs = new CustomTabsActivityManager(this); // this == your Activity

// build custom tab
var builder = new CustomTabsIntent.Builder(customTabs.Session)
    .SetToolbarColor(Color.Argb(255, 52, 152, 219))
    .SetShowTitle(true)
    .EnableUrlBarHiding();

var customTabsIntent = builder.Build();
customTabsIntent.Intent.AddFlags(ActivityFlags.NoHistory);

customTabsIntent.LaunchUrl(this, Android.Net.Uri.Parse(authorizeState.StartUrl));
```

### 3. Process the redirect response

After the user has authenticated, they will be redirected back to your application at the **Callback URL** that was registered before. You will need to register an intent which will handle this callback URL.

```csharp
[Activity(Label = "AndroidSample", MainLauncher = true, Icon = "@drawable/icon",
    LaunchMode = LaunchMode.SingleTask)]
[IntentFilter(
    new[] { Intent.ActionView },
    Categories = new[] { Intent.CategoryDefault, Intent.CategoryBrowsable },
    DataScheme = "{YOUR_ANDROID_PACKAGE_NAME}",
    DataHost = "@string/auth0_domain",
    DataPathPrefix = "/android/{YOUR_ANDROID_PACKAGE_NAME}/callback")]
public class MainActivity : Activity
{
    // Code omitted
}
```

Replace `{YOUR_ANDROID_PACKAGE_NAME}` in the code sample above with the actual Package Name for your application. Also ensure that all the text for the `DataScheme`, `DataHost` and `DataPathPrefix` is in lower case.

Now write code to handle the intent. You can do this by overriding the `OnNewIntent` method. Inside the method you need to call the `ProcessResponseAsync` method, passing along the `DataString` from the intent, as well as the `AuthorizeState` which was previously stored when you called `PrepareLoginAsync`:

```csharp
protected override async void OnNewIntent(Intent intent)
{
    base.OnNewIntent(intent);

    var loginResult = await client.ProcessResponseAsync(intent.DataString, authorizeState);
}
```

## Accessing the User's Information

The returned login result will indicate whether authentication was successful, and if so contain the tokens and claims of the user.

### Authentication Error

You can check the `IsError` property of the result to see whether the login has failed. The `ErrorMessage` will contain more information regarding the error which occurred.

```csharp
var loginResult = await client.ProcessResponseAsync(intent.DataString, authorizeState);

if (loginResult.IsError)
{
    Debug.WriteLine($"An error occurred during login: {loginResult.Error}")
}
```

### Accessing the tokens

On successful login, the login result will contain the `id_token` and `access_token` in the `IdentityToken` and `AccessToken` properties respectively.

```csharp
var loginResult = await client.ProcessResponseAsync(intent.DataString, authorizeState);

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

> [!Note]
> The exact claims returned will depend on the scopes that were requested. For more information see @scopes.

You can obtain a list of all the claims contained in the `id_token` by iterating through the `Claims` collection:

```csharp
if (!loginResult.IsError)
{
    foreach (var claim in loginResult.User.Claims)
    {
        Debug.WriteLine($"{claim.Type} = {claim.Value}");
    }
}
```

## More Information

For more information, please refer to the [Auth0 OIDC Client Documentation](https://auth0.github.io/auth0-oidc-client-net/).