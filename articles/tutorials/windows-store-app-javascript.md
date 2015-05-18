---
title: Using Auth0 with Windows App Store in JavaScript
---

# Authenticating Users Anywhere with Auth0

## Goals

1. Build a Windows Store app that authenticates users with any identity provider (e.g. Facebook, Google, MS Account, Twitter, PayPal, LinkedIn, Office365, Google Apps, etc)

2. Once authenticated, call Auth0 API to retrieve user's information.

> The tutorial will take 10 minutes approximately. You are just 10 minutes away from the (W) token :). You shouldn't, but if you need help: http://chat.auth0.com

## Before you start

This tutorial assumes you are familiar with JavaScript & Visual Studio 2012.

## Create an Auth0 Account

1. Open an account with [Auth0](https://developers.auth0.com)
2. You can login with a Google, Github or a Microsoft Account:

![](@@env.MEDIA_URL@@/articles/windowsstore-js-auth0-tutorial/3dmCI.png)

3. After login, enter a name for your account. This will uniquely identify you in Auth0. We will refer to this as {YOUR_TENANT_NAME} later in the tutorial.

![](@@env.MEDIA_URL@@/articles/windowsstore-js-auth0-tutorial/3dmFE.png)

4. Choose the type of application you are building. Select __Windows 8__:

![](@@env.MEDIA_URL@@/articles/windowsstore-js-auth0-tutorial/3drhv.png)

Keep Auth0 open. You will later need information from the dashboard to test your app.

## Build the Windows Store App

###1. Open Visual Studio 2012 and create a new blank Windows Store App:

![](@@env.MEDIA_URL@@/articles/windowsstore-js-auth0-tutorial/windowsstore-javascript-step1.png)

###2. Add a basic UI to the app

Open the `default.html` file and replace `<p>Content goes here</p>` to a `button`:

```html
<script src="/js/auth0.js"></script>
```

![](@@env.MEDIA_URL@@/articles/windowsstore-js-auth0-tutorial/windowsstore-javascript-step2.png)

###3. Add the auth0Client.js javascript

This javascript will encapsulate all access to Auth0. Add a new file named `auth0Client.js` under the `js` folder:

![](@@env.MEDIA_URL@@/articles/windowsstore-js-auth0-tutorial/windowsstore-javascript-step3.png)

And add the following code:

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

Replace __{YOUR TENANT NAME}__ with the name you used when you created the account with Auth0. And __{YOUR CLIENT ID}__ with the `clientId` value you can get from your settings page:

![](@@env.MEDIA_URL@@/articles/windowsstore-js-auth0-tutorial/3dqSy.png)

And add reference to the javaScript code in the `default.html`, including the following line in the <head> element:

```html

<script src="/js/auth0Client.js"></script>
```

###4. Wire-up UI controls to Auth0Client

Add the following code in `auth0Client.js` after `"use strict";` to handle the click event:

```javascript

var page = WinJS.UI.Pages.define("/default.html", {
    ready: function (element, options) {
        document.getElementById("login").addEventListener("click", Login, false);
    }
});
```

###5. Test the application:

When you run the application you will see the Login Screen with the __Auth0 Login Widget__:

![](@@env.MEDIA_URL@@/articles/windowsstore-js-auth0-tutorial/windowsstore-javascript-step5.png)

It will show "Google" as an option to authenticate. Place a breakpoint in the `var access_token = result.responseData.split("#")[1].split("&")[1].split("=")[0];` line and complete authentication. If everything is successful, you will see the `access_token`.

###6. Enable other identity providers

Go back to [Auth0](https://app.auth0.com) and select __Connections__, __Social__:

![](@@env.MEDIA_URL@@/articles/windowsstore-js-auth0-tutorial/3drDu.png)

Enable any of the providers available by clicking on the `Disabled` button.

Run the app again and you will see the providers you just enabled on the login screen:

![](@@env.MEDIA_URL@@/articles/windowsstore-js-auth0-tutorial/windowsstore-javascript-step6.2.png)

###7. Getting user attributes

Open the `default.html` file and paste the following content after the `<button>` element:

```html

<div data-win-control="Output">
  <textarea id="auth0DebugArea" rows="15" cols="150"></textarea>
</div>
```

Open the `auth0Client.js` file, replace `var access_token = result.responseData.split("#")[1].split("&")[1].split("=")[0];` with the following code:

```javascript
var access_token = result.responseData.split("#")[1].split("&")[0];
WinJS.xhr({ url: "https://{YOUR_TENANT_NAME}.auth0.com/userinfo/?" + access_token, responseType: "json" })
    .done(function complete(result) {
        log("User Profile: " + result.responseText);
    },
          function (err) {
              log("Error in getting user profile: " + err.responseData);
          });
```

And add the following `function`:

```javascript
function log(msg) {
    document.getElementById("auth0DebugArea").value += msg + "\r\n";
}
```

Run the app again and you will see the user info after login:

![](@@env.MEDIA_URL@@/articles/windowsstore-js-auth0-tutorial/windowsstore-javascript-step7.png)

## Congratulations!! Go get your token!
