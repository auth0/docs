# Using Auth0 with Xamarin

This tutorial explains how to integrate Auth0 with a Xamarin application (iOS or Android).

## Tutorial

### Install Xamarin.Auth0Client component

In order to include Xamarin.Auth0Client component, please perform the following steps:

  1. With the project loaded in Xamarin Studio (or Visual Studio), right-click on the `Components` folder in the `Solution Explorer` and select `Get More Components`.
  2. Search and double-click on `Xamarin.Auth0Client` component.
  3. From the component page, select the `Add to Project` button to download the component and add it to the current project.

For more information, please visit the <a target="_blank" href="http://docs.xamarin.com/guides/cross-platform/application_fundamentals/components_walkthrough">Xamarin documentation page</a>.

### Login using Auth0 Login Widget

Xamarin.Auth0Client helps you authenticate users with any [Auth0 supported identity provider](https://docs.auth0.com/identityproviders), via the OpenId Connect protocol (built on top of OAuth2). The library is cross-platform, so once you learn it on iOS, you're all set on Android.

#### Create and configure an Auth0Client

```csharp
using Auth0.SDK;
// ...
var auth0 = new Auth0Client(
  "Login", 
  "@@account.tenant@@", 
  "@@account.clientId@@");
```

#### Authenticate the user

`Auth0Client` is built on top of the `WebRedirectAuthenticator` in the Xamarin.Auth component. All rules for standard authenticators apply regarding how the UI will be displayed.

Before we present the UI, we need to start listening to the `Completed` event which fires when the user successfully authenticates or cancels. You can find out if the authentication succeeded by testing the `IsAuthenticated` property of `eventArgs`:

```csharp
auth.Completed += (sender, eventArgs) => {
  // We presented the UI, so it's up to us to dimiss it on iOS (ignore this line on Android)
  DismissViewController (true, null);

	if (eventArgs.IsAuthenticated) {
		// Use eventArgs.Account to do wonderful things
	} else {
		// The user cancelled
	}
};
```

> All the information gathered from a successful authentication is available in `eventArgs.Account`.

Now we're ready to present the login UI from `ViewDidAppear` on __iOS__:

```csharp
PresentViewController (auth.GetUI (), true, null);
```

or from `OnCreate` on __Android__:

```csharp
StartActivity (auth.GetUI (this), 42);
```

> The `GetUI` method returns `UINavigationControllers` on __iOS__, and `Intents` on __Android__.


![](http://puu.sh/3RUxd.jpg)

If you add the `connection` parameter to the constructor, then Auth0 will redirect the user to the specified `connection`:

```csharp
using Auth0.SDK;
// ...
var auth = new Auth0Client (
  "Login", 
  "@@account.tenant@@", 
  "@@account.clientId@@",
  "google-oauth2");
```

#### Retrieve authentication properties

Upon successful authentication, the `Complete` event will fire. `Auth0Client` will set the `eventArgs.Account.Username` property to that obtained from the Identity Provider. You will also get from eventArgs.Account property:

* `Properties["access_token"]`: is a regular OAuth Access Token that can be used to call [Auth0 API](https://docs.auth0.com/api-reference).
* `Properties["id_token"]`: is a Json Web Token (JWT) and it is signed by Auth0.
* `GetProfile()`: an extension method which returns a `Newtonsoft.Json.Linq.JOBject` object (from [Json.NET component](http://components.xamarin.com/view/json.net/)) which contains all of the user attributes.

### Login using your own UI

_Coming soon._


**Congratulations!**
