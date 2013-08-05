# Using Auth0 with Xamarin

This tutorial explains how to integrate Auth0 with a Xamarin application (iOS or Android). `Xamarin.Auth0Client` helps you authenticate users with any [Auth0 supported identity provider](https://docs.auth0.com/identityproviders), via the OpenId Connect protocol (built on top of OAuth2). The library is cross-platform, so once you learn it on iOS, you're all set on Android.

## Tutorial

### 1. Install Xamarin.Auth0Client component

In order to include `Xamarin.Auth0Client` component, please perform the following steps:

  1. With the project loaded in Xamarin Studio (or Visual Studio), right-click on the `Components` folder in the `Solution Explorer` and select `Get More Components`.
  2. Search and double-click on `Xamarin.Auth0Client` component.
  3. From the component page, select the `Add to Project` button to download the component and add it to the current project.

For more information, please visit the <a target="_blank" href="http://docs.xamarin.com/guides/cross-platform/application_fundamentals/components_walkthrough">Xamarin documentation page</a>.

### 2. Setting up the callback URL in Auth0

Go to the [Application Settings](@@sdkURL@@/#/applications/@@account.clientId@@/settings) section on Auth0 Admin app and make sure that __App Callbacks URLs__ has the following value:

```
https://@@@account.namespace@/mobile
```

### 3. Triggering the login manually or integrating the Auth0 widget

There are two options to fire a login: 

1. Using the [Auth0 Widget](login-widget)
2. Creating your own UI

```csharp
using Auth0.SDK;

var auth0 = new Auth0Client(
	"Login", 
	"@@account.tenant@@", 
	"@@account.clientId@@");

// attach to Completed event
auth.Completed += (sender, eventArgs) => {
	// We presented the UI, so it's up to us to dimiss it on iOS (ignore this line on Android)
	DismissViewController (true, null);
	
	if (eventArgs.IsAuthenticated) {
		// Use **eventArgs.Account** to do wonderful things
	} else {
	// The user cancelled
	}
};

// show the UI
// iOS      [ViewDidAppear]
UINavigationControllers view = auth0.GetUI();
PresentViewController(view, true, null);

// Android  [OnCreate]
Intents intent = auth0.GetUI(this);
StartActivityForResult(intent, 42);
```

> `Auth0Client` is built on top of the `WebRedirectAuthenticator` in the Xamarin.Auth component. All rules for standard authenticators apply regarding how the UI will be displayed.

![](http://puu.sh/3UqNG.png)

### Want to do your own UI?

You have to add the `connection` parameter to the constructor and the user will be sent straight to the specified `connection`:

```csharp
using Auth0.SDK;
// ...
var auth = new Auth0Client (
	"Login", 
	"@@account.tenant@@", 
	"@@account.clientId@@",
	"google-oauth2"); // connection name here
```

> connection names can be found on Auth0 dashboard. E.g.: `facebook`, `linkedin`, `somegoogleapps.com`, `saml-protocol-connection`, etc.

### 4. Accessing user information

Upon successful authentication, the `Complete` event will fire. `Auth0Client` will set the `eventArgs.Account.Username` property to that obtained from the Identity Provider. You will also get from eventArgs.Account property:

* `eventArgs.Account.GetProfile()`: an extension method which returns a `Newtonsoft.Json.Linq.JObject` object (from [Json.NET component](http://components.xamarin.com/view/json.net/)) containing all of the user attributes.
* `eventArgs.Account.Properties["id_token"]`: is a Json Web Token (JWT) containing all of the user attributes and it is signed with your client secret. This is useful to call your APIs and flow the user identity.
* `eventArgs.Account.Properties["access_token"]`: the `access_token` can be used to [link accounts](link-accounts).

## Download the samples

Browse the samples on GitHub from [here](https://github.com/auth0/Xamarin.Auth0Client/tree/master/samples).


**Congratulations!**
