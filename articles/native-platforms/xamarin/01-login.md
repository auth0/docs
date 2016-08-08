---
title: Login
description: This tutorial will show you how to use the Auth0 Xamarin SDK to add authentication and authorization to your mobile app.
---

# Xamarin Tutorial

<<<<<<< 0c255558bddf2568970d6d0a44cea1ea775f088b
This tutorial explains how to integrate Auth0 with a Xamarin application. 

The `Xamarin.Auth0Client` helps you authenticate users with any [Auth0 supported identity provider](/identityproviders) via the OpenId Connect protocol built on top of OAuth2. The library is cross-platform, so this information can be applied to either iOS or Android.

**NOTE:** An Objective-C Binding Library for Lock iOS implementations is available at: [Lock.Xamarin](https://github.com/auth0/Lock.Xamarin).
=======
In this tutorial, we'll review how you can easily integrate Auth0 into your Xamarin app for iOS and Android. `Xamarin.Auth0Client` simplifies authenticating users within your application using any [Auth0 supported identity provider](/identityproviders). Internally, Auth0 provides this capability via the [OpenId Connect](http://openid.net/connect/) protocol, which is built atop the [OAuth2](http://oauth.net/2/) authorization framework. Since this is a Xamarin library targetting both Android and iOS, once you've integrated it on one platform, you're all set to go on the other. 

>**Note for iOS Developers**  
If you're looking for an Objective-C binding for our Lock implementation on iOS, you can find exactly what you're looking for in its dedicated [GitHub repository](https://github.com/auth0/Lock.Xamarin).
>>>>>>> Update 01-login.md

## Tutorial

### 1. Install Xamarin.Auth0Client component

${snippet(meta.snippets.dependencies)}

<<<<<<< 0c255558bddf2568970d6d0a44cea1ea775f088b
For more information, see: [How to include a Component in a Xamarin Project](http://docs.xamarin.com/guides/cross-platform/application_fundamentals/components_walkthrough).
=======
For more information, please visit the [Xamarin documentation page](http://docs.xamarin.com/guides/cross-platform/application_fundamentals/components_walkthrough).
>>>>>>> Update 01-login.md

### 2. Set up the callback URL in Auth0

Go to the [Application Settings](${uiAppSettingsURL}) section in the Auth0 dashboard and make sure that **Allowed Callback URLs** contains the following value:

`https://${account.namespace}/mobile`

### 3. Integration
<<<<<<< 0c255558bddf2568970d6d0a44cea1ea775f088b
There are three options for implementing the integration:

1. Use the [Auth0 Lock](/lock) inside a Web View - the simplest option with only a few lines of code required.
2. Create your own UI - more work, but higher control over the UI.
3. Use a specific username and password.

#### Option 1: Authentication using Lock

**Lock** is the recommended option. 

Here is a snippet of code to paste into your project:
=======
For integration, there are a few options available to you:

+ [Using the Auth0 Login Widget inside a Web View](#integration-option-one)  
This is the simplest approach, with only a few lines of code required.  
+ [Creating your own UI](#integration-option-two)   
This requires more development effort, but offers granular control of the UI and overall user experience.  
+ [Using a specific user name and password](#integration-option-three)

<div id="integration-option-one"></div>
#### Authentication using the [Auth0 Login Widget](/lock)
<<<<<<< 201e4911c19f6f0daea7991526ee963231c08e8f
<<<<<<< e4acc3affd23f9675d45c30bc50a53178d54afd4
<div id="integration-option-one"></div>
To start with, we'd recommend using the __Login Widget__. To do this, simply copy and paste this code snippet of code into your project:
>>>>>>> Update 01-login.md
=======
</div>
=======

>>>>>>> Create 01-login.md
To start with, we'd recommend using the __Login Widget__. To do this, simply copy and paste this code snippet into your project:
>>>>>>> Create 01-login.md

${snippet(meta.snippets.setup)}

${snippet(meta.snippets.use)}

::: panel-info Component info
`Xamarin.Auth0Client` is built on top of the `WebRedirectAuthenticator` in the Xamarin.Auth component. All rules for standard authenticators apply regarding how the UI will be displayed.
:::

![](/media/articles/native-platforms/xamarin/xamarin.auth0client.png)

<<<<<<< 201e4911c19f6f0daea7991526ee963231c08e8f
<<<<<<< e4acc3affd23f9675d45c30bc50a53178d54afd4
<<<<<<< 0c255558bddf2568970d6d0a44cea1ea775f088b
#### Option 2: Authentication with your own UI

If you know which identity provider you want to use, you can add the `connection` parameter and the user will be directed to the specified `connection`:
=======
=======
<div id="integration-option-two">
>>>>>>> Create 01-login.md
=======
<div id="integration-option-two"></div>
>>>>>>> Create 01-login.md
#### Authentication with your own UI
If you know which identity provider you want to use, you can add a `connection` parameter and the user will be sent straight to the specified `connection`:
>>>>>>> Update 01-login.md

```cs
var user = await auth0.LoginAsync(this, "google-oauth2"); // connection name here
```

**NOTE:** Connection names can be found on Auth0 dashboard (e.g. `facebook`, `linkedin`, `saml-protocol-connection`).

<<<<<<< 201e4911c19f6f0daea7991526ee963231c08e8f
<<<<<<< 0c255558bddf2568970d6d0a44cea1ea775f088b
#### Option 3: Authentication with a specific username and password

<<<<<<< e4acc3affd23f9675d45c30bc50a53178d54afd4
=======
#### Authentication with specific user name and password
<div id="integration-option-three"></div>
>>>>>>> Update 01-login.md
=======
<div id="integration-option-three">
#### Authentication with specific user name and password
</div>
>>>>>>> Create 01-login.md
=======
<div id="integration-option-three"></div>
#### Authentication with specific user name and password
>>>>>>> Create 01-login.md
```cs
var user = await auth0.LoginAsync(
  "sql-azure-database",   	// connection name here
  "jdoe@foobar.com",      	// user name
  "1234");             		// password
```

## Access user information

The `Auth0User` contains a number of publicly accessible properties that expose information about a successfully authenticated user. These properties include:

<<<<<<< 0c255558bddf2568970d6d0a44cea1ea775f088b
* `Profile`: returns a `Newtonsoft.Json.Linq.JObject` object from [Json.NET component](http://components.xamarin.com/view/json.net/) containing all available user attributes (e.g.:`user.Profile["email"].ToString()`).
* `IdToken`: a JSON Web Token (JWT) containing all of the user attributes and signed with your client secret.
* `Auth0AccessToken`: the `access_token` that can be used to call the Auth0 API. For example, you could use this token to [Link Accounts](/link-accounts).
=======
* `Profile`: returns a `Newtonsoft.Json.Linq.JObject` object (from [Json.NET component](http://components.xamarin.com/view/json.net/)) containing all available user attributes (e.g.: `user.Profile["email"].ToString()`).
* `IdToken`: is a Json Web Token (JWT) containing all of the user attributes and it is signed with your client secret. This is useful to call your APIs and flow the user identity.
* `Auth0AccessToken`: the `access_token` that can be used to access Auth0's API. You would use this for example to [link user accounts](/link-accounts).

## Download the samples

To see the functionality and code desribed in this tutorial in action, you can fetch complete example projects for both Android and iOS in the samples [GitHub repository](https://github.com/auth0/Xamarin.Auth0Client/tree/master/samples).
>>>>>>> Update 01-login.md

## Download samples

<<<<<<< 0c255558bddf2568970d6d0a44cea1ea775f088b
Android and iOS samples are available on GitHub at: [Xamarin.Auth0Client](https://github.com/auth0/Xamarin.Auth0Client/tree/master/samples).
=======
**Congratulations!** After following this tutorial, you've now seen how easy it is to bring authentication to your Xamarin for Android or iOS app with the `Xamarin.Auth0Client` library.
>>>>>>> Update 01-login.md
