---
title: Login
default: true
description: This tutorial will show you how to use the Auth0 Xamarin SDK to add authentication and authorization to your mobile app.
budicon: 448
github:
    path: Quickstart/01-Login
---

This tutorial explains how to integrate the Auth0 OIDC Application with a Xamarin application.

<%= include('../_includes/_dotnet-oidc-client-configuration') %>

## Install the Auth0.OidcClient.Android NuGet Package

${snippet(meta.snippets.dependencies)}

## Set Up the Auth0 Callback URL

Callback URLs are the URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and appends additional parameters to it, including an access code which will be exchanged for an `id_token`, `access_token` and `refresh_token`.

Since callback URLs can be manipulated, you will need to add your application's URL to your application's *Allowed Callback URLs* for security. This will enable Auth0 to recognize these URLs as valid. If omitted, authentication will not be successful.

* For Android, the callback URL will be in the format

  ```text
  YOUR_ANDROID_PACKAGE_NAME://${account.namespace}/android/YOUR_ANDROID_PACKAGE_NAME/callback
  ```

  where `YOUR_ANDROID_PACKAGE_NAME` is the Package Name for your application, such as `com.mycompany.myapplication`.


* For iOS, the callback URL will be in the format

  ```text
  YOUR_BUNDLE_IDENTIFIER://${account.namespace}/ios/YOUR_BUNDLE_IDENTIFIER/callback
  ```

  where `YOUR_BUNDLE_IDENTIFIER` is the Bundle Identifier for your application, such as `com.mycompany.myapplication`.

Go to your [Application's Dashboard](${manage_url}/#/applications/${account.clientId}/settings) and make sure that *Allowed Callback URLs* contains the correct URL. **Also, ensure that the Callback URL is in lowercase.**

## Integration

To integrate Auth0 login into your application, simply instantiate an instance of the `Auth0Client` class, configuring the Auth0 Domain and Client ID, and also passing the Android Activity or View Controller from which you are executing the code:

${snippet(meta.snippets.setup)}

The steps for Logging the user in is different for Android and iOS. Note that this example is not using Xamarin Forms.

### Android

#### 1. Obtain the authorization URL

Call the `PrepareLoginAsync` method which will return an `AuthorizeState` containing the authorization URL, state, nonce, and code challenge. You will need to store the `AuthorizeState` as it is required later on to process the redirect URL and exchange the authorization code for the tokens.

```cs
AuthorizeState authorizeState = await client.PrepareLoginAsync();
```

#### 2. Launch the browser to authorize the user

After calling `PrepareLoginAsync`, the `StartUrl` property of the returned `AuthorizeState` will contain the URL to which you need to send the user for logging in. You can create a new intent, specifying the `StartUrl` as the destination, and then call `StartActivity`, passing the intent in order to launch the web browser:

```csharp
var uri = Android.Net.Uri.Parse(authorizeState.StartUrl);
var intent = new Intent(Intent.ActionView, uri);
intent.AddFlags(ActivityFlags.NoHistory);
StartActivity(intent);
```

#### 3. Handle the Callback URL

After the user has logged in, they will be redirected back to your application at the **Callback URL** that was registered before. You will need to register an intent which will handle this callback URL.

```csharp
[Activity(Label = "AndroidSample", MainLauncher = true, Icon = "@drawable/icon",
    LaunchMode = LaunchMode.SingleTask)]
[IntentFilter(
    new[] { Intent.ActionView },
    Categories = new[] { Intent.CategoryDefault, Intent.CategoryBrowsable },
    DataScheme = "YOUR_ANDROID_PACKAGE_NAME",
    DataHost = "${account.namespace}",
    DataPathPrefix = "/android/YOUR_ANDROID_PACKAGE_NAME/callback")]
public class MainActivity : Activity
{
    // Code omitted
}
```

Replace `YOUR_ANDROID_PACKAGE_NAME` in the code sample above with the actual Package Name for your application, such as `com.mycompany.myapplication`. Also ensure that all the text for the `DataScheme`, `DataHost`, and `DataPathPrefix` is in lower case. Set `LaunchMode = LaunchMode.SingleTask`, otherwise the system will create a new instance of the activity every time the Callback URL gets called.

Now write code to handle the intent. You can do this by overriding the `OnNewIntent` method. Inside the method you need to call the `ProcessResponseAsync` method, passing along the `DataString` from the intent, as well as the `AuthorizeState` which was previously stored when you called `PrepareLoginAsync`:

```csharp
protected override async void OnNewIntent(Intent intent)
{
    base.OnNewIntent(intent);

    var loginResult = await client.ProcessResponseAsync(intent.DataString, authorizeState);
}
```

With the above code in place, a user can log in to your application using Auth0:

<div class="phone-mockup"><img src="/media/articles/native-platforms/xamarin/lock-widget-screenshot-android.png" alt="Lock UI"></div>

### iOS

#### 1. Register the URL type

First, you will need to ensure that you have registered the URL scheme for your Callback URL which your application should handle:

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
            <string>YOUR_BUNDLE_IDENTIFIER</string>
        </array>
    </dict>
</array>
```

#### 2. Call LoginAsync

```cs
var loginResult = await client.LoginAsync();
```

#### 3. Handle the Callback URL

After a user has logged in, Auth0 will redirect to the callback URL in your application. You need to handle the incoming link to your `AppDelegate` and resume the login flow of the Auth0 OIDC Application by calling the `Send` method of the `ActivityMediator` singleton, passing along the URL sent in. This will allow the Auth0 OIDC Application library to complete the authentication process:

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

With the above code in place, a user can log in to your application using Auth0:

<div class="phone-mockup"><img src="/media/articles/native-platforms/xamarin/lock-widget-screenshot-ios.png" alt="Lock UI"></div>

## Accessing the User's Information

The returned login result will indicate whether authentication was successful and if so contain the tokens and claims of the user.

### Authentication Error

You can check the `IsError` property of the result to see whether the login has failed. The `ErrorMessage` will contain more information regarding the error which occurred.

```csharp
// For Android
var loginResult = await client.ProcessResponseAsync(intent.DataString, authorizeState);

// For iOS
var loginResult = await client.LoginAsync();

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

::: note
The exact claims returned will depend on the scopes that were requested. For more information see the [Using Scopes](https://auth0.github.io/auth0-oidc-client-net/documentation/advanced-scenarios/scopes.html) in the Auth0 OIDC Application documentation.
:::

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

For more information, please refer to the [Auth0 OIDC Application Documentation](https://auth0.github.io/auth0-oidc-client-net/documentation/intro.html).
