# Using Auth0 with Windows App Store in JavaScript

This tutorial explains how to integrate Auth0 with a Windows App Store. `Auth0.Windows8.Js` helps you authenticate users with any [Auth0 supported identity provider](identityproviders).

## Tutorial

### 1. Install Auth0.Windows8.Cs NuGet package

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the Auth0.Windows8.Js package, running the command:

<pre><code>Install-Package Auth0.Windows8.Js</pre></code>

And add reference to the JavaScript code in the __default.html__, include the following line in the <head> element: 

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

1. Using the [Auth0 Login Widget](login-widget) inside a Web View (this is the simplest with only a few lines of code required).
2. Creating your own UI (more work, but higher control the UI and overall experience).
3. Using specific user name and password.

#### Option 1: Authentication using Login Widget

To start with, we'd recommend using the __Login Widget__. Here is a snippet of code to copy & paste on your project: 

```javascript

var auth0 = new Auth0Client(
  "@@account.tenant@@",
  "@@account.clientId@@",
  "@@account.clientSecret@@");

auth0.Login(function (err, result) {
  if (err) return err;
  var profile = result;
});
```

![](img/win8-cs-step1.png)

#### Option 2: Authentication with your own UI

If you know which identity provider you want to use, you can add a `connection` parameter to the constructor and the user will be sent straight to the specified `connection`:

```javascript
auth0.Login("auth0waadtests.onmicrosoft.com", function (err, result) {
  if (err) return err;
  var profile = result;
});
```

> connection names can be found on Auth0 dashboard. E.g.: `facebook`, `linkedin`, `somegoogleapps.com`, `saml-protocol-connection`, etc.

#### Option 3: Authentication with specific user name and password (only for providers that support this)

```javascript
auth0.Login(
  "my-db-connection",
  "username",
  "password", 
  function (err, result) {
    if (err) return err;
    var profile = result;
  });
```

**Congratulations!**