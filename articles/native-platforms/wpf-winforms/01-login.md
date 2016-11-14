---
title: Login
default: true
description: This tutorial will show you how to use the Auth0 WPF and Winforms SDK to add authentication and authorization to your app.
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-winformsWPF-samples',
  path: '00-Starter-Seed'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Microsoft Visual Studio 2015
* .NET Framework 4.6.1
:::


This tutorial explains how to integrate Auth0 with a WPF or Winforms application. `Auth0.WinformsOrWPF` helps you authenticate users with any [Auth0 supported identity provider](/identityproviders).

## Install Auth0.WinformsOrWPF NuGet Package

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the Auth0.WinformsOrWPF package, running the command:

${snippet(meta.snippets.dependencies)}

## Set up the Auth0 Callback URL

<div class="setup-callback">
<p>Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in the Auth0 dashboard and make sure that <strong>Allowed Callback URLs</strong> contains the following value:</p>

<pre><code>https://${account.namespace}/mobile</pre></code>
</div>

## Integration

There are three options to do the integration:

1. Using [Auth0 Lock](/lock) inside a Web View (this is the simplest with only a few lines of code required).
2. Creating your own UI (more work, but higher control the UI and overall experience).
3. Using specific user name and password.

### Option 1: Auth0 Lock

To start with, we'd recommend using __Lock__. Here is a snippet of code to copy & paste on your project.
Since we are using `await` (.NET 4.5 or greater), your method needs to be `async`:

${snippet(meta.snippets.setup)}

${snippet(meta.snippets.use)}

![](/media/articles/native-platforms/wpf-winforms/wpf-winforms-step1.png)

::: panel-warning Handle Exceptions
**Please note** that an `UnauthorizedAccessException` will be thrown when the user cancels the authentication dialog, so you will need to wrap the call to `LoginAsync` in a try-catch block.
:::

::: panel-warning WPF Applications
For __WPF__ apps you should use `auth0.LoginAsync(new WindowWrapper(new WindowInteropHelper(this).Handle))` instead of `auth0.LoginAsync(this)`
:::

### Option 2: Custom User Interface

If you know which identity provider you want to use, you can add a `connection` parameter and the user will be sent straight to the specified `connection`:

```cs
var user = await auth0.LoginAsync(this, "auth0waadtests.onmicrosoft.com") // connection name here
```

> connection names can be found on Auth0 dashboard. E.g.: `facebook`, `linkedin`, `somegoogleapps.com`, `saml-protocol-connection`, etc.

### Option 3: Specific Username and Password

```cs
var user = await auth0.LoginAsync(
  "my-db-connection",   // connection name here
  "username",
  "password");
```

## Accessing User Information

The `Auth0User` has the following properties:

* `Profile`: returns a `Newtonsoft.Json.Linq.JObject` object (from [Json.NET component](http://components.xamarin.com/view/json.net/)) containing all available user attributes (e.g.: `user.Profile["email"].ToString()`).
* `IdToken`: is a Json Web Token (JWT) containing all of the user attributes and it is signed with your client secret. This is useful to call your APIs and flow the user identity.
* `Auth0AccessToken`: the `access_token` that can be used to access Auth0's API. You would use this for example to [link user accounts](/link-accounts).
