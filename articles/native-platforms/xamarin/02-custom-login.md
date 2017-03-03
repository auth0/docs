---
title: Custom Login
description: This tutorial will show you how to use the Auth0 Xamarin SDK to add custom authentication and authorization to your mobile app.
budicon: 448
---

::: panel-info System Requirements
This tutorial has been tested with the following:
* Xamarin Studio 6.1+
:::

This tutorial explains how to integrate custom authentication with Auth0 and a Xamarin Forms application.

The [`Xamarin Auth0 SDK`](https://components.xamarin.com/view/auth0client) helps you authenticate users with any [Auth0 supported identity provider](/identityproviders) via the OpenID Connect protocol built on top of OAuth2. The library is cross-platform, so this information can be applied to either iOS or Android.

## Install Xamarin.Auth0Client Component

${snippet(meta.snippets.dependencies)}

For more information, see: [How to include a Component in a Xamarin Project](http://docs.xamarin.com/guides/cross-platform/application_fundamentals/components_walkthrough).

## Set up the Auth0 Callback URL

Go to the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) section in the Auth0 dashboard and make sure that **Allowed Callback URLs** contains the following value:

`https://${account.namespace}/mobile`

## Custom Login

There are two options for implementing custom username and password authentication:

1. Use the [`Xamarin Auth0 SDK`](https://components.xamarin.com/view/auth0client)
2. Call the Auth0 REST API directly

Both of these options allow you to use a custom user interface and our recommendation is to use the SDK unless you absolutley need full control over the the call.

![](/media/articles/native-platforms/xamarin/xamarin.custom.ui.png)

### Option 1: Auth0 SDK

You will first need to instantiate the Auth0 Client library. Here is a snippet of code to paste into your project:

${snippet(meta.snippets.setup)}

Next, create your desired user interface.

```cs
var email = new Entry { Placeholder = "Email" };
var password = new Entry { Placeholder = "Password", IsPassword = true };

var loginWithSDKButton = new Button { Text = "Sign In with SDK" };

loginWithSDKButton.Clicked += (object sender, EventArgs e) =>{
  LoginWithSDK(email.Text, password.Text);
};


Content = new StackLayout{
  Padding = 30,
  Spacing = 10,
  Children = {
    new Label { Text = "Login" },
    email,
    password,
    loginWithSDKButton
  }
};
```

Finally, implement the `LoginWithSDK()` function which will perform the login and if successful, persist the user data throughout your app and navigate the user to a logged in page.

```cs
public async void LoginWithSDK(string username, string password){
  var user = await auth0.LoginAsync(
    "database-connection-name",     // connection name here
    username,
    password);

  // We are going to persist the user data here and store it in Application.Current. You can choose to do it a different way. The key takeaway is that the user variable now has access to your authorized users data.
  Application.Current.Properties["id_token"] = user.IdToken;
  Application.Current.Properties["access_token"] = user.Auth0AccessToken;
  Application.Current.Properties["name"] = user.Profile["name"].ToString();
  Application.Current.Properties["email"] = user.Profile["email"].ToString();
  Application.Current.Properties["picture"] = user.Profile["picture"].ToString();

  // After a successful login we are going to navigate the user to the homepage.
  await Navigation.PushModalAsync(new HomePage());
}
```

### Option 2: RESTful API

If you do not wish to use the Auth0 SDK, you can always call our REST API directly. To do that, first install the RestSharp Component:

  1. With the project loaded in Xamarin Studio (or Visual Studio), right-click on the `Components` folder in the `Solution Explorer` and select `Get More Components`.
  2. Search and double-click on `RestSharp` component.
  3. From the component page, select the `Add to Project` button to download the component and add it to the current project.

RestSharp allows you to easily make calls to external API's such as our Authorization API. First define your user interface:

```cs
var email = new Entry { Placeholder = "Email" };
var password = new Entry { Placeholder = "Password", IsPassword = true };

var loginWithAPIButton = new Button { Text = "Sign In with SDK" };

loginWithAPIButton.Clicked += (object sender, EventArgs e) =>{
  LoginWithAPI(email.Text, password.Text);
};


Content = new StackLayout{
  Padding = 30,
  Spacing = 10,
  Children = {
    new Label { Text = "Login" },
    email,
    password,
    loginWithAPIButton
  }
};
```

Next, implement the `LoginWithAPI()` function:

```cs
public void LoginWithAPI(string username, string password){
  var client = new RestClient("${account.namespace}"); // Your Auth0 Domain
  var request = new RestRequest("oauth/ro", Method.POST); // The oauth/ro endpoint handles username and password authentication 
  request.AddParameter("client_id", "${account.clientId}"); // Your Auth0 Client Id
  request.AddParameter("username", username);
  request.AddParameter("password", password);
  request.AddParameter("connection", "DATABASE-CONNECTION-NAME"); // Your connection name.
  request.AddParameter("grant_type", "password");
  request.AddParameter("scope", "openid");

  IRestResponse response = client.Execute(request);

  LoginToken token = JsonConvert.DeserializeObject<LoginToken>(response.Content);

  Application.Current.Properties["id_token"] = token.id_token;
  Application.Current.Properties["access_token"] = token.access_token;

  // The initial call will just return the token, if you wish to get the user data we will need to make another call, this time we are implementing a function called GetUserData that does just that.
  GetUserData(token.id_token);
}

public void GetUserData(string token){
  var client = new RestClient("${account.namespace}");
  var request = new RestRequest("tokeninfo", Method.GET); // The tokeninfo endpoint will return the user data.
  request.AddParameter("id_token", token);

  IRestResponse response = client.Execute(request);

  User user = JsonConvert.DeserializeObject<User>(response.Content);

  Application.Current.Properties["email"] = user.email;
  Application.Current.Properties["picture"] = user.picture;

  // Finally, we navigate the user the the Home page
  Navigation.PushModalAsync(new HomePage());
}

// We have created two additional classes to hold our user and token information
public class LoginToken{
  public string id_token { get; set; }
  public string access_token { get; set; }
  public string token_type { get; set; }
}

public class User{
  public string name { get; set; }
  public string picture { get; set; }
  public string email { get; set; }
}
```

As you can see the REST API method requires a lot of additional code, but is a valid way to authenticate if needed.

## Social Login

The Auth0 SDK also allows you to implement social login with just a few lines of code. As with the custom login the first step is to instantiate the Auth0Client:

${snippet(meta.snippets.setup)}

Next, let's build the user interface we wish to present to the user.

```cs
var facebookLoginButton = new Button{ Text = "Login with Facebook" };

facebookLoginButton.Clicked += (object sender, EventArgs e) =>{
  LoginWithFacebook();
};

Content = new StackLayout{
  Padding = 30,
  Spacing = 10,
  Children = {
    new Label { Text = "Social Login" },
    facebookLoginButton
  }
};
```

In addition to the Auth0 SDK we will also require a couple of additional libraries. Since we want to make sure the social login works on both Android and iOS devices, we'll include the required libraries to handle the WebView display. At the top of your file be sure to include the following:

```cs
#if __IOS__
  using UIKit;
#endif
#if __ANDROID__
  using Android.Content;
#endif
```

Next, implement the `LoginWithFacebook()` function which will make use of the Auth0 SDK to handle the authentication.

```cs
public async void LoginWithFacebook(){
  #if __IOS__
    var window = UIApplication.SharedApplication.KeyWindow;
    var ui = window.RootViewController;
    // This will guarantee that the Facebook login is displayed above all other screens.
    while (ui.PresentedViewController != null)
    {
      ui = ui.PresentedViewController;
    }
  #endif
  #if __ANDROID__
    Context ui = Xamarin.Forms.Forms.Context;
  #endif

  // The second paramater here is the social network. In our example we are using Facebook, but any supported IdP would work here.
  var user = await auth0.LoginAsync(ui, "facebook");

  Application.Current.Properties["id_token"] = user.IdToken;
  Application.Current.Properties["access_token"] = user.Auth0AccessToken;

  Application.Current.Properties["name"] = user.Profile["name"].ToString();
  Application.Current.Properties["email"] = user.Profile["email"].ToString();
  Application.Current.Properties["picture"] = user.Profile["picture"].ToString();

  await Navigation.PushModalAsync(new HomePage());
}
```

The `Auth0User` has the following properties:

* `Profile`: returns a `Newtonsoft.Json.Linq.JObject` object from [Json.NET component](http://components.xamarin.com/view/json.net/) containing all available user attributes (e.g.:`user.Profile["email"].ToString()`).
* `IdToken`: a JSON Web Token (JWT) containing all of the user attributes and signed with your client secret.
* `Auth0AccessToken`: the `access_token` that can be used to call the Auth0 APIs.

::: panel-info Component info
`Xamarin.Auth0Client` is built on top of the `WebRedirectAuthenticator` in the Xamarin.Auth component. All rules for standard authenticators apply regarding how the UI will be displayed.
:::

![](/media/articles/native-platforms/xamarin/xamarin.auth0client.custom.png)

## Download Samples

Android and iOS samples for authenticating a Xamarin Forms app with Auth0 are available on [GitHub](https://github.com/auth0-samples/auth0-xamarin-samples).