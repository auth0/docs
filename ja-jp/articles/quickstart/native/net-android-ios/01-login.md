---
title: Add login to your .NET Android or iOS application
default: true
description: This tutorial demonstrates how to add user login with Auth0 to a .NET Android or iOS application.
budicon: 448
topics:
  - quickstarts
  - native
  - xamarin
  - dotnet
  - android
  - ios
github:
    path: Quickstart/01-Login
contentType: tutorial
useCase: quickstart
---

::: note
This quickstart focusses on .NET Android and iOS, as they are the next generation of `Xamarin.Android` and `Xamarin.iOS`. If you are still using `Xamarin.Android` and `Xamarin.iOS`, you can follow this guide as well as integration is identical and the SDKs are compatible.
:::

<!-- markdownlint-disable MD002 MD041 -->

<%= include('../_includes/_getting_started', { library: 'Xamarin') %>

<%= include('../../../_includes/_callback_url') %>

Callback URLs are the URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and appends additional parameters to it, including an access code which will be exchanged for an ID Token, Access Token, and Refresh Token.

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

Ensure that the Callback URL is in lowercase.

<%= include('../../../_includes/_logout_url') %>

::: note
If you are following along with the sample project you downloaded from the top of this page, the logout URL you need to add to the Allowed Logout URLs field is the same as the callback URL.
:::

## Install Dependencies

${snippet(meta.snippets.dependencies)}

## Trigger Authentication

To integrate Auth0 login into your application, instantiate an instance of the `Auth0Client` class, configuring the Auth0 Domain and Client ID:

${snippet(meta.snippets.setup)}

Then, call the `LoginAsync` method which will redirect the user to the login screen. You will typically do this in the event handler for a UI control such as a Login button.

```cs
var loginResult = await client.LoginAsync();
```

### Handing the callback URL

After a user has logged in, they will be redirected back to your application at the **Callback URL** that was registered before. In both Android and iOS you need to handle this callback to complete the authentication flow.

### Android

Register an intent which will handle this callback URL. An easy way to do this is to register the intent on the same activity from which you called the `LoginAsync` method to initiate the authentication flow.

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

Replace `YOUR_ANDROID_PACKAGE_NAME` in the code sample above with the actual Package Name for your application, such as `com.mycompany.myapplication`. Also ensure that all the text for the `DataScheme`, `DataHost`, and `DataPathPrefix` is in lower case. Also, set `LaunchMode = LaunchMode.SingleTask` for the `Activity`, otherwise the system will create a new instance of the activity every time the Callback URL gets called.

Now write code to handle the intent. You can do this by overriding the `OnNewIntent` method. Inside the method you need to call the `Send` method on the `ActivityMediator` to complete the authentication cycle:

```csharp
protected override async void OnNewIntent(Intent intent)
{
    base.OnNewIntent(intent);

    Auth0.OidcClient.ActivityMediator.Instance.Send(intent.DataString);
}
```

### iOS

Register the URL scheme for your Callback URL which your application should handle:

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

You need to handle the Callback URL in the `OpenUrl` event in your `AppDelegate` class.  You need to notify the Auth0 OIDC Client to finish the authentication flow by calling the `Send` method of the `ActivityMediator` singleton, pass along the URL that was sent in:

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

### Run the application

With the above code in place, a user can log in to your application using Auth0.

<div class="phone-mockup">
    <img src="/media/articles/native-platforms/android/login-android.png" alt="Universal Login" />
</div>

## Accessing the User's Information

The returned login result will indicate whether authentication was successful and if so contain the tokens and claims of the user.

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

To obtain information about the user, you can query the claims. You can, for example, obtain the user's name and email address from the `name` and `email` claims:

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
BrowserResultType browserResult = await client.LogoutAsync();
```
