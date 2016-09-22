---
title: Login
description: This tutorial will show you how to use the Auth0 Windows Universal App C# SDK to add authentication and authorization to your app.
---

<%= include('../../_includes/_signup') %>

This tutorial explains how to integrate Auth0 login with a Windows UWP (Universal Windows Platform) C# application. The Nuget package `Auth0.Windows.UWP` helps you authenticate users with any [Auth0 supported identity provider](/identityproviders).

## Tutorial

### 1. Install the Auth0.Windows.UWP NuGet package

Use the NuGet Package Manager Console (Tools -> Nuget Package Manager -> Package Manager Console) to install the Auth0.Windows.UWP package, running the command:

${snippet(meta.snippets.dependencies)}

### 2. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <strong>Allowed Callback URLs</strong> contains the following value:</p>

<pre><code>https://${account.namespace}/mobile</pre></code>
</div>

### 3. Integration
There are three options to do the integration:

1. Using the [Auth0 Login Widget](/libraries/lock) with the Web Authentication Broker (this is the simplest with only a few lines of code required).
2. Using the [Auth0 Login Widget](/libraries/lock) with the Web Authentication Broker, but specifying a specific Connection.
3. Custom user interface to ask username and password.

#### Option 1: Using the Auth0 Login Widget

To start with, we'd recommend using the __Login Widget__. Here is a snippet of code to copy & paste on your project.
Since we are using `await` (.NET 4.5 or greater), your method needs to be `async`:

${snippet(meta.snippets.setup)}

${snippet(meta.snippets.use)}

![](/media/articles/native-platforms/windows-uwp-csharp/lock-widget-screenshot.png)

#### Option 2: Using the Auth0 Login Widget, but specifying a connection.

If you know which identity provider you want to use, you can add a `connection` parameter and the user will be sent straight to the specified `connection`:

```cs
var user = await auth0.LoginAsync("auth0waadtests.onmicrosoft.com") // connection name here
```

> connection names can be found on Auth0 dashboard. E.g.: `facebook`, `linkedin`, `somegoogleapps.com`, `saml-protocol-connection`, etc.

#### Option 3: Custom user interface to ask username and password.

The third option is to create your own custom user interface to prompt the user for their username and password. You can then pass this, along with the connection name to the `LoginAsync` method:

```cs
var user = await auth0.LoginAsync(
	"my-db-connection", 	// connection name here
	"username",
	"password");
```

#### Scope

Optionally you can specify the `scope` parameter. There are various possible values for `scope`:

* __scope: "openid"__ _(default)_ - It will return, not only the `access_token`, but also an `id_token` which is a Json Web Token (JWT). The JWT will only contain the user id.
* __scope: "openid {attr1} {attr2} {attrN}"__ - If you want only specific user's attributes to be part of the `id_token` (For example: `scope: "openid name email picture"`).

You can get more information about this in the [Scopes documentation](/scopes).

### 4. (Optional) Capabilities

In some cases Auth0 may not be able to connect to an identity provider. Showing nothing more than a "Can't connect to the service" message. A reason for this may be that the identity provider endpoint resolves to an Intranet (that has an authenticated domain controller), home or work network. In this case it is required to enable the "Private Networks (Client & Server)" capability.

Use the Package Manifest (Solution Explorer > Package.appxmanifest) to enable the capability within the "Capabilities" tab.

## Accessing user information

The `Auth0User` has the following properties:

* `Profile`: returns a `Newtonsoft.Json.Linq.JObject` object (from [Json.NET component](http://www.newtonsoft.com/json)) containing all available user attributes (e.g.: `user.Profile["email"].ToString()`).
* `IdToken`: is a Json Web Token (JWT) containing all of the user attributes and it is signed with your client secret. This is useful to call your APIs and flow the user identity.
* `Auth0AccessToken`: the `access_token` that can be used to access Auth0's APIs. For example, you could use this token to [Link Accounts](/link-accounts).


**Congratulations!**
