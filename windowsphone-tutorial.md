# Using Auth0 with a native Windows Phone 8 app

This tutorial explains how to integrate Auth0 with a Windows Phone app. `Auth0.WindowsPhone` helps you authenticate users with any [Auth0 supported identity provider](identityproviders).

## Tutorial

### 1. Install Auth0.WindowsPhone NuGet package

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the Auth0.Windows8.Js package, running the command:

<pre><code>Install-Package Auth0.WindowsPhone</pre></code>

### 2. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>Go to the <b>Application Settings</b> section on Auth0 Admin app and make sure that <b>App Callbacks URLs</b> has the following value:</p>

<pre><code>https://@@account.namespace@@/mobile</pre></code>
</div>

### 3. Integration
There are three options to do the integration: 

1. Using the [Auth0 Login Widget](login-widget) inside a Web View (this is the simplest with only a few lines of code required).
2. Creating your own UI (more work, but higher control the UI and overall experience).
3. Using specific user name and password.

#### Option 1: Authentication using Login Widget

To start with, we'd recommend using the __Login Widget__. Here is a snippet of code to copy & paste on your project: 

```csharp
using Auth0.SDK;

var auth0 = new Auth0Client(
    "@@account.tenant@@",
    "@@account.clientId@@",
    "@@account.clientSecret@@");

auth0.LoginAsync (this)
     .ContinueWith(t => { 
     /* 
        Use t.Result to do wonderful things, e.g.: 
          - get user email => t.Result.Profile["email"].ToString()
          - get facebook/google/twitter/etc access token => t.Result.Profile["identities"][0]["access_token"]
          - get Windows Azure AD groups => t.Result.Profile["groups"]
          - etc.
    */ });
```

![](img/windows-phone-tutorial.png)

#### Option 2: Authentication with your own UI

If you know which identity provider you want to use, you can add a `connection` parameter to the constructor and the user will be sent straight to the specified `connection`:

```csharp
auth0.LoginAsync (this, "auth0waadtests.onmicrosoft.com") // connection name here
     .ContinueWith(t => { /* Use t.Result to do wonderful things */ });
```

> connection names can be found on Auth0 dashboard. E.g.: `facebook`, `linkedin`, `somegoogleapps.com`, `saml-protocol-connection`, etc.

#### Option 3: Authentication with specific user name and password (only for providers that support this)

```csharp
auth0.LoginAsync (
    "my-db-connection",     // connection name here
    "username",             // user name
    "password")             // password
     .ContinueWith(t => 
     { 
        /* Use t.Result to do wonderful things */ 
     });
```

## Accessing user information

The `Auth0User` has the following properties:

* `Profile`: returns a `Newtonsoft.Json.Linq.JObject` object (from [Json.NET component](http://components.xamarin.com/view/json.net/)) containing all available user attributes (e.g.: `user.Profile["email"].ToString()`).
* `IdToken`: is a Json Web Token (JWT) containing all of the user attributes and it is signed with your client secret. This is useful to call your APIs and flow the user identity (or Windows Azure Mobile Services, see below).
* `Auth0AccessToken`: the `access_token` that can be used to access Auth0's API. You would use this for example to [link user accounts](link-accounts).

> If you want to use __Windows Azure Mobile Services__ (WAMS) you should create a WAMS app in Auth0 and set the Master Key that you can get on the Windows Azure portal. Then you have change your Windows Phone app to use the client id and secret of the WAMS app just created and set the callback of the WAMS app to be `https://@@account.tenant@@.auth0.com/mobile`. Finally, you have to set the `MobileServiceAuthenticationToken` property of the `MobileServiceUser` with the `IdToken` property of `Auth0User`.

**Congratulations!**