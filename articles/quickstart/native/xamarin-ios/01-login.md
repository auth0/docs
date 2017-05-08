---
title: Login
default: true
description: This tutorial will show you how to use the Auth0 Xamarin SDK to add authentication and authorization to your mobile app.
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-community',
  repo: 'auth0-xamarin-ios-oidc-samples',
  path: 'Quickstart/00-Starter-Seed',
  requirements: [
    'Microsoft Visual Studio for Mac (Preview 9 or later)',
    'Xamarin.iOS (10.10.0.21)',
    'Auth0.OidcClient.iOS 1.0.0'
  ]
}) %>

This tutorial explains how to integrate the Auth0 OIDC Client with a Xamarin iOS C# application. The NuGet package `Auth0.OidcClient.iOS` helps you authenticate users with any [Auth0 supported identity provider](/identityproviders).

## Switching token signature algorithm to RS256

The Auth0 OIDC Client requires that the __JsonWebToken Signature Algorithm__ for your client be set to `RS256`.

::: panel-warning Before Changing the Signing Algorithm
Please note that altering the signing algorithm for your client will immediately change the way your user's tokens are signed. This means that if you have already implemented JWT verification for your client somewhere, your tokens will not be verifiable until you update the logic to account for the new signing algorithm.
:::

To switch from HS256 to RS256 for a specific client, follow these instructions:
1. Go to [Dashboard > Clients](https://manage.auth0.com/#/clients)
1. Select your client
1. Go to _Settings_
1. Click on __Show Advanced Settings__
1. Click on the _OAuth_ tab in Advanced Settings
1. Change the __JsonWebToken Signature Algorithm__ to `RS256`

Remember that if the token is being validated anywhere else, changes might be needed there as well in order to comply.

## Install the Auth0.OidcClient.iOS NuGet Package

${snippet(meta.snippets.dependencies)}

## Set Up the Auth0 Callback URL

Callback URLs are the URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and appends additional parameters to it, including a token. Since callback URLs can be manipulated, you will need to add your application's URL to your client's *Allowed Callback URLs* for security. This will enable Auth0 to recognize these URLs as valid. If omitted, authentication will not be successful.

First you will need to register the URL Type:

1. Open your application's `Info.plist` file in Visual Studio for Mac, and go to the **Advanced** tab. 
2. Under **URL Types**, click the **Add URL Type** button
3. Set the **Identifier** as `Auth0`, the **URL Schemes** the same as your application's **Bundle Identifier**, and the **Role** as `None`

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
            <string>{YOUR_BUNDLE_IDENTIFIER}</string>
        </array>
    </dict>
</array>
```

Next, go to your [Client's Dashboard](${manage_url}/#/applications/${account.clientId}/settings) and make sure that *Allowed Callback URLs* contains the following:

`{YOUR_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{YOUR_BUNDLE_IDENTIFIER}/callback`

Finally, you will need to handle the callback to your application in your `AppDelegate` by calling the `Send` method of the `ActivityMediator` singleton, passing along the url sent in. This will allow the Auth0 OIDC Client library to complete the authentication process:

```csharp
using Auth0.OidcClient;

[Register("AppDelegate")]
public class AppDelegate : UIApplicationDelegate
{
	public override bool OpenUrl(UIApplication application, NSUrl url, string sourceApplication, NSObject annotation)
	{
		ActivityMediator.Instance.Send(url.AbsoluteString);

		return true;
	}
}
```

## Integration

To integrate Auth0 login into your application, simply instantiate an instance of the `Auth0Client` class, configuring the Auth0 Domain and Client ID, and also passing the instance uf your `UIViewController` as the `Controller` property: 

${snippet(meta.snippets.setup)}

You can then call the `LoginAsync` method to log the user in:

${snippet(meta.snippets.use)}

<div class="phone-mockup"><img src="/media/articles/native-platforms/xamarin-ios/lock-widget-screenshot.png" alt="Lock UI"></div>

## Accessing the User's Information

The returned login result will indicate whether authentication was successful, and if so contain the tokens and claims of the user.

### Authentication Error

You can check the `IsError` property of the result to see whether the login has failed. The `ErrorMessage` will contain more information regarding the error which occurred.

```csharp
var loginResult = await client.LoginAsync();

if (loginResult.IsError)
{
    Debug.WriteLine($"An error occurred during login: {loginResult.Error}")
}
```

### Accessing the tokens

On successful login, the login result will contain the `id_token` and `access_token` in the `IdentityToken` and `AccessToken` properties respectively.

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