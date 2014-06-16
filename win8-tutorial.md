# Using Auth0 with Windows App Store in JavaScript

This tutorial explains how to integrate Auth0 with a Windows App Store. `Auth0.Windows8.Js` helps you authenticate users with any [Auth0 supported identity provider](identityproviders).

## Tutorial

### 1. Install Auth0.Windows8.Js NuGet package

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the Auth0.Windows8.Js package, running the command:

<pre><code>Install-Package Auth0.Windows8.Js</pre></code>

And add reference to the JavaScript code in the __default.html__, include the following line in the `<head>` element: 

```html
<script src="/js/auth0.js"></script>
```

### 2. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>Go to the <b>Application Settings</b> section on Auth0 Admin app and make sure that <b>App Callbacks URLs</b> has the following value:</p>

<pre><code>https://@@account.namespace@@/mobile</pre></code>
</div>

### 3. Integration
There are three options to do the integration: 

1. Using the [Auth0 Login Widget](login-widget2) inside a Web View (this is the simplest with only a few lines of code required).
2. Creating your own UI (more work, but higher control the UI and overall experience).
3. Using specific user name and password.

#### Option 1: Authentication using Login Widget

To start with, we'd recommend using the __Login Widget__. Here is a snippet of code to copy & paste on your project: 

```javascript

var auth0 = new Auth0Client(
  "@@account.namespace@@",
  "@@account.clientId@@");

auth0.Login(function (err, result) {
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

![](img/win8-cs-step1.png)

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
* __scope: "openid profile"__ - If you want the entire user profile to be part of the `id_token`.

## Accessing user information

The `Auth0User` has the following properties:

* `Profile`: returns a JSON object containing all available user attributes (e.g.: `user.Profile.email`).
* `IdToken`: is a Json Web Token (JWT) containing all of the user attributes and it is signed with your client secret. This is useful to call your APIs and flow the user identity (or Windows Azure Mobile Services, see below).
* `Auth0AccessToken`: the `access_token` that can be used to access Auth0's API. You would use this for example to [link user accounts](link-accounts).

> If you want to use __Windows Azure Mobile Services__ (WAMS) you should create a WAMS app in Auth0 and set the Master Key that you can get on the Windows Azure portal. Then you have change your Windows Store App to use the client id and secret of the WAMS app just created and set the callback of the WAMS app to be `https://@@account.tenant@@.auth0.com/mobile`. Finally, you have to set the `MobileServiceAuthenticationToken` property of the `MobileServiceUser` with the `IdToken` property of `Auth0User`.

**Congratulations!**
