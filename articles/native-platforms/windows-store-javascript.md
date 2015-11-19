---
title: Windows Store App in Javascript Tutorial
name: Windows Store (JS)
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
  dependencies: native-platforms/windows-store-javascript/dependencies
  setup: native-platforms/windows-store-javascript/setup
  use: native-platforms/windows-store-javascript/use
alias:
  - windows-8
  - windows-81
  - windows-tablet
  - surface
---

# Windows Store App in Javascript Tutorial

This tutorial explains how to integrate Auth0 with a Windows App Store. `Auth0.Windows8.Js` helps you authenticate users with any [Auth0 supported identity provider](/identityproviders).

## Tutorial

### 1. Install Auth0.Windows8.Js NuGet package

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the Auth0.Windows8.Js package, running the command:

${snippet(meta.snippets.dependencies)}

And add reference to the JavaScript code in the __default.html__, include the following line in the `<head>` element:

${snippet(meta.snippets.setup)}

### 2. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>Go to the <a href="${uiAppSettingsURL}">Application Settings</a> section on Auth0 Admin app and make sure that <b>App Callbacks URLs</b> has the following value:</p>

<pre><code>https://${account.namespace}/mobile</pre></code>
</div>

### 3. Integration
There are three options to do the integration:

1. Using the [Auth0 Login Widget](/libraries/lock) inside a Web View (this is the simplest with only a few lines of code required).
2. Creating your own UI (more work, but higher control the UI and overall experience).
3. Using specific user name and password.

#### Option 1: Authentication using Login Widget

To start with, we'd recommend using the __Login Widget__. Here is a snippet of code to copy & paste on your project:

${snippet(meta.snippets.use)}

![](//cdn.auth0.com/docs/img/win8-cs-step1.png)

#### Option 2: Authentication with your own UI

If you know which identity provider you want to use, you can add a `connection` parameter and the user will be sent straight to the specified `connection`:

```javascript
auth0.Login({ connection: "auth0waadtests.onmicrosoft.com" }, function (err, result) {
  if (err) return err;
  /*
  Use result to do wonderful things, e.g.:
    - get user email => result.Profile.email
    - get facebook/google/twitter/etc access token => result.Profile.identities[0].access_token
    - get Windows Azure AD groups => result.Profile.groups
    - etc.
  */
});
```

> connection names can be found on Auth0 dashboard. E.g.: `facebook`, `linkedin`, `somegoogleapps.com`, `saml-protocol-connection`, etc.

#### Option 3: Authentication with specific user name and password (only for providers that support this)

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
      - get facebook/google/twitter/etc access token => result.Profile.identities[0].access_token
      - get Windows Azure AD groups => result.Profile.groups
      - etc.
    */
  });
```

#### Scope

Optionally you can specify the `scope` parameter. There are two possible values for scope today:

* __scope: "openid"__ _(default)_ - It will return, not only the `access_token`, but also an `id_token` which is a Json Web Token (JWT). The JWT will only contain the user id.
* __scope: "openid {attr1} {attr2} {attrN}"__ - If you want only specific user's attributes to be part of the `id_token` (For example: `__scope: "openid name email picture"`).

You can get more information about this in the [Scopes documentation](/scopes).

## Accessing user information

The `Auth0User` has the following properties:

* `Profile`: returns a JSON object containing all available user attributes (e.g.: `user.Profile.email`).
* `IdToken`: is a Json Web Token (JWT) containing all of the user attributes and it is signed with your client secret. This is useful to call your APIs and flow the user identity.
* `Auth0AccessToken`: the `access_token` that can be used to access Auth0's API. You would use this for example to [link user accounts](/link-accounts).


**Congratulations!**
