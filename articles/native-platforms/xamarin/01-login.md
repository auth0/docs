---
title: Login
description: This tutorial will show you how to use the Auth0 Xamarin SDK to add authentication and authorization to your mobile app.
---

<%= include('../../_includes/_signup') %>

This tutorial explains how to integrate Auth0 with a Xamarin application.

The `Xamarin.Auth0Client` helps you authenticate users with any [Auth0 supported identity provider](/identityproviders) via the OpenId Connect protocol built on top of OAuth2. The library is cross-platform, so this information can be applied to either iOS or Android.

**NOTE:** An Objective-C Binding Library for Lock iOS implementations is available at: [Lock.Xamarin](https://github.com/auth0/Lock.Xamarin).

## Tutorial

### 1. Install Xamarin.Auth0Client component

${snippet(meta.snippets.dependencies)}

For more information, see: [How to include a Component in a Xamarin Project](http://docs.xamarin.com/guides/cross-platform/application_fundamentals/components_walkthrough).

### 2. Set up the callback URL in Auth0

Go to the [Application Settings](${uiAppSettingsURL}) section in the Auth0 dashboard and make sure that **Allowed Callback URLs** contains the following value:

`https://${account.namespace}/mobile`

### 3. Integration
There are three options for implementing the integration:

1. Use the [Auth0 Lock](/lock) inside a Web View - the simplest option with only a few lines of code required.
2. Create your own UI - more work, but higher control over the UI.
3. Use a specific username and password.

#### Option 1: Authentication using Lock

**Lock** is the recommended option.

Here is a snippet of code to paste into your project:

${snippet(meta.snippets.setup)}

${snippet(meta.snippets.use)}

::: panel-info Component info
`Xamarin.Auth0Client` is built on top of the `WebRedirectAuthenticator` in the Xamarin.Auth component. All rules for standard authenticators apply regarding how the UI will be displayed.
:::

![](/media/articles/native-platforms/xamarin/xamarin.auth0client.png)

#### Option 2: Authentication with your own UI

If you know which identity provider you want to use, you can add the `connection` parameter and the user will be directed to the specified `connection`:

```cs
var user = await auth0.LoginAsync(this, "google-oauth2"); // connection name here
```

**NOTE:** Connection names can be found on Auth0 dashboard (e.g. `facebook`, `linkedin`, `saml-protocol-connection`).

#### Option 3: Authentication with a specific username and password

```cs
var user = await auth0.LoginAsync(
  "sql-azure-database",   	// connection name here
  "jdoe@foobar.com",      	// user name
  "1234");             		// password
```

## Access user information

The `Auth0User` has the following properties:

* `Profile`: returns a `Newtonsoft.Json.Linq.JObject` object from [Json.NET component](http://components.xamarin.com/view/json.net/) containing all available user attributes (e.g.:`user.Profile["email"].ToString()`).
* `IdToken`: a JSON Web Token (JWT) containing all of the user attributes and signed with your client secret.
* `Auth0AccessToken`: the `access_token` that can be used to call the Auth0 APIs. For example, you could use this token to [Link Accounts](/link-accounts).

## Download samples

Android and iOS samples are available on GitHub at: [Xamarin.Auth0Client](https://github.com/auth0/Xamarin.Auth0Client/tree/master/samples).
