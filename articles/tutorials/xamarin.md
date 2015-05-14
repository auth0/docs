# Using Auth0 with Xamarin

This tutorial explains how to integrate Auth0 with a Xamarin application (iOS or Android). `Xamarin.Auth0Client` helps you authenticate users with any [Auth0 supported identity provider](identityproviders), via the OpenId Connect protocol (built on top of OAuth2). The library is cross-platform, so once you learn it on iOS, you're all set on Android.

> We have a Objective-C Binding Library for our Lock implementation in iOS, you can check it out in our Github [repo](https://github.com/auth0/Lock.Xamarin)

## Tutorial

### 1. Install Xamarin.Auth0Client component

In order to include `Xamarin.Auth0Client` component, please perform the following steps:

  1. With the project loaded in Xamarin Studio (or Visual Studio), right-click on the `Components` folder in the `Solution Explorer` and select `Get More Components`.
  2. Search and double-click on `Xamarin.Auth0Client` component.
  3. From the component page, select the `Add to Project` button to download the component and add it to the current project.

For more information, please visit the <a target="_blank" href="http://docs.xamarin.com/guides/cross-platform/application_fundamentals/components_walkthrough">Xamarin documentation page</a>.

### 2. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>Go to the <a href="@@uiAppSettingsURL@@" target="_new">Application Settings</a> section in the Auth0 dashboard and make sure that <strong>Allowed Callback URLs</strong> contains the following value:</p>

<pre><code>https://@@account.namespace@@/mobile</pre></code>
</div>

### 3. Integration
There are three options to do the integration:

1. Using the [Auth0 Login Widget](login-widget2) inside a Web View (this is the simplest with only a few lines of code required).
2. Creating your own UI (more work, but higher control the UI and overall experience).
3. Using specific user name and password.

#### Option 1: Authentication using Login Widget

To start with, we'd recommend using the __Login Widget__. Here is a snippet of code to copy & paste on your project:

```csharp
using Auth0.SDK;

var auth0 = new Auth0Client(
	"@@account.namespace@@",
	"@@account.clientId@@");

// 'this' could be a Context object (Android) or UIViewController, UIView, UIBarButtonItem (iOS)
var user = await auth0.LoginAsync(this);
/*
- get user email => user.Profile["email"].ToString()
- get facebook/google/twitter/etc access token => user.Profile["identities"][0]["access_token"]
- get Windows Azure AD groups => user.Profile["groups"]
- etc.
*/
```

> `Xamarin.Auth0Client` is built on top of the `WebRedirectAuthenticator` in the Xamarin.Auth component. All rules for standard authenticators apply regarding how the UI will be displayed.

![](//cdn.auth0.com/docs/img/xamarin.auth0client.png)

#### Option 2: Authentication with your own UI

If you know which identity provider you want to use, you can add a `connection` parameter and the user will be sent straight to the specified `connection`:

```csharp
var user = await auth0.LoginAsync(this, "google-oauth2"); // connection name here
```

> connection names can be found on Auth0 dashboard. E.g.: `facebook`, `linkedin`, `somegoogleapps.com`, `saml-protocol-connection`, etc.

#### Option 3: Authentication with specific user name and password

```csharp
var user = await auth0.LoginAsync(
  "sql-azure-database",   	// connection name here
  "jdoe@foobar.com",      	// user name
  "1234");             		// password
```

## Accessing user information

The `Auth0User` has the following properties:

* `Profile`: returns a `Newtonsoft.Json.Linq.JObject` object (from [Json.NET component](http://components.xamarin.com/view/json.net/)) containing all available user attributes (e.g.: `user.Profile["email"].ToString()`).
* `IdToken`: is a Json Web Token (JWT) containing all of the user attributes and it is signed with your client secret. This is useful to call your APIs and flow the user identity.
* `Auth0AccessToken`: the `access_token` that can be used to access Auth0's API. You would use this for example to [link user accounts](link-accounts).

## Download the samples

Browse the samples on GitHub from [here](https://github.com/auth0/Xamarin.Auth0Client/tree/master/samples).


**Congratulations!**
