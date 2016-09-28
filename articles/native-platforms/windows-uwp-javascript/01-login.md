---
title: Login
description: This tutorial will show you how to use the Auth0 Windows Universal App Javascript SDK to add authentication and authorization to your app.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0/Auth0.Windows.UWP',
  pkgOrg: 'auth0',
  pkgRepo: 'Auth0.Windows.UWP',
  pkgBranch: 'master',
  pkgPath: 'samples/LoginClientSample.Js',
  pkgFilePath: 'samples/LoginClientSample.Js/js/default.js',
  pkgType: 'replace'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Microsoft Visual Studio 2015
* Windows 10 SDK (10.0.14393)
:::

<%= include('../../_includes/_signup') %>

**Otherwise, if you already have an existing application, please follow the steps below.**

This tutorial explains how to integrate Auth0 with a Windows UWP application written in JavaScript. `Auth0.Windows.UWP.JavaScript` helps you authenticate users with any [Auth0 supported Identity Provider](/identityproviders).

## Tutorial

### 1. Install Auth0.Windows.UWP.JavaScript NuGet package

Use the NuGet Package Manager Console (Tools > Nuget Package Manager > Package Manager Console) to install the Auth0.Windows.UWP.JavaScript package by running the command:

${snippet(meta.snippets.dependencies)}

Also, add reference to the JavaScript code in the `default.html`, by including the following line in the `<head>` element:

${snippet(meta.snippets.setup)}

### 2. Set up the callback URL in Auth0

Go to the [Application Settings](${uiAppSettingsURL}) section of the Auth0 Admin app and make sure that **App Callbacks URLs** has the following value:

`https://${account.namespace}/mobile`

### 3. Integration
There are three options for implementing the integration:

1. Use [Auth0 Lock](/libraries/lock) with the Web Authentication Broker - the simplest method with only a few lines of code required.
2. Use [Auth0 Lock](/libraries/lock) with the Web Authentication Broker with a specific Connection.
3. Build a custom user interface to ask for username and password.

#### Option 1: Use Auth0 Lock

Lock is the recommended option.

Here is a snippet of code to paste into your project:

${snippet(meta.snippets.use)}

![](/media/articles/native-platforms/windows-uwp-javascript/lock-widget-screenshot.png)


#### Option 2: Use the Auth0 Lock with a specific connection

If you know which identity provider you want to use, you can add the `connection` parameter and the user will be directed to the specified `connection`:

```javascript
auth0.Login({ connection: "auth0waadtests.onmicrosoft.com" }, function (err, result) {
  if (err) return err;
  /*
  Use result to do wonderful things, e.g.:
    - get user email => result.Profile.email
    - get Windows Azure AD groups => result.Profile.groups
    - etc.
  */
});
```

**NOTE:** Connection names can be found on Auth0 dashboard (e.g. `facebook`, `linkedin`, `saml-protocol-connection`).

#### Option 3: Build a custom user interface

The third option is to create your own custom user interface to prompt the user for their username and password. You can then pass these credentials, along with the connection name, to the `LoginAsync` method:

```javascript
auth0.Login({
    connection: "my-db-connection",
    username: "username",
    password: "password"
  },
  function (err, result) {
    if (err) return err;
    /*
    Use result to do wonderful things, e.g.:
      - get user email => result.Profile.email
      - get Windows Azure AD groups => result.Profile.groups
      - etc.
    */
  });
```

#### Scope

Optionally you can specify the `scope` parameter. There are two possible values for scope:

* __scope: "openid"__ _(default)_ - this returns the `access_token`, and an `id_token` as a JSON Web Token (JWT). The JWT will only contain the user id.
* __scope: "openid {attr1} {attr2} {attrN}"__ - if you want only specific user attributes to be included in the `id_token` (for example: `scope: "openid name email picture"`).

For more information, see: [Scopes](/scopes).

## Access user information

The `Auth0User` has the following properties:

* `Profile`: returns a `Newtonsoft.Json.Linq.JObject` object from [Json.NET component](http://www.newtonsoft.com/json) containing all available user attributes (e.g.:`user.Profile["email"].ToString()`).
* `IdToken`: a JSON Web Token (JWT) containing all of the user attributes and signed with your client secret.

* `Auth0AccessToken`: the `access_token` that can be used to call the Auth0 API. For example, you could use this token to [Link Accounts](/link-accounts).
