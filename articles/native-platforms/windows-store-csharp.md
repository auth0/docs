---
title: Windows Store App in C# Tutorial
name: Windows Store (C#)
hybrid: false
alias:
  - windows app
  - windows
language: 
  - Javascript
  - C#
image: /media/platforms/windows-8.png
tags:
  - quickstart  
snippets:
  dependencies: native-platforms/windows-store-csharp/dependencies
  setup: native-platforms/windows-store-csharp/setup
  use: native-platforms/windows-store-csharp/use
---

# Windows Store App in C# Tutorial

This tutorial explains how to integrate Auth0 with a Windows App Store. `Auth0.Windows8.Cs` helps you authenticate users with any [Auth0 supported identity provider](/identityproviders).

## Tutorial

### 1. Install Auth0.Windows8.Cs NuGet package

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the Auth0.Windows8.Cs package, running the command:

${snippet(meta.snippets.dependencies)}

### 2. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section in the Auth0 dashboard and make sure that <strong>Allowed Callback URLs</strong> contains the following value:</p>

<pre><code>https://${account.namespace}/mobile</pre></code>
</div>

### 3. Integration
There are three options to do the integration:

1. Using the [Auth0 Login Widget](/libraries/lock) inside a Web View (this is the simplest with only a few lines of code required).
2. Creating your own UI (more work, but higher control the UI and overall experience).
3. Using specific user name and password.

#### Option 1: Authentication using Login Widget

To start with, we'd recommend using the __Login Widget__. Here is a snippet of code to copy & paste on your project.
Since we are using `await` (.NET 4.5 or greater), your method needs to be `async`:

${snippet(meta.snippets.setup)}

${snippet(meta.snippets.use)}

![](//cdn.auth0.com/docs/img/win8-cs-step1.png)

#### Option 2: Authentication with your own UI

If you know which identity provider you want to use, you can add a `connection` parameter and the user will be sent straight to the specified `connection`:

```cs
var user = await auth0.LoginAsync("auth0waadtests.onmicrosoft.com") // connection name here
```

> connection names can be found on Auth0 dashboard. E.g.: `facebook`, `linkedin`, `somegoogleapps.com`, `saml-protocol-connection`, etc.

#### Option 3: Authentication with specific user name and password (only for providers that support this)

```cs
var user = await auth0.LoginAsync(
	"my-db-connection", 	// connection name here
	"username",
	"password");
```

#### Scope

Optionally you can specify the `scope` parameter. There are various possible values for `scope`:

* __scope: "openid"__ _(default)_ - It will return, not only the `access_token`, but also an `id_token` which is a Json Web Token (JWT). The JWT will only contain the user id.
* __scope: "openid {attr1} {attr2} {attrN}"__ - If you want only specific user's attributes to be part of the `id_token` (For example: `__scope: "openid name email picture"`).

You can get more information about this in the [Scopes documentation](/scopes).

## Accessing user information

The `Auth0User` has the following properties:

* `Profile`: returns a `Newtonsoft.Json.Linq.JObject` object (from [Json.NET component](http://components.xamarin.com/view/json.net/)) containing all available user attributes (e.g.: `user.Profile["email"].ToString()`).
* `IdToken`: is a Json Web Token (JWT) containing all of the user attributes and it is signed with your client secret. This is useful to call your APIs and flow the user identity.
* `Auth0AccessToken`: the `access_token` that can be used to access Auth0's API. You would use this for example to [link user accounts](/link-accounts).


**Congratulations!**
