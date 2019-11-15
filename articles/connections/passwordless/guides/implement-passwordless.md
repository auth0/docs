---
title: Implement Passwordless Authentication
description: Learn how to allow users to authenticate to your application using passwordless authentication. This guide will show you how to set up your passwordless connection, configure your login screen, and configure your application.
toc: true
topics:
  - authentication
  - connections
  - passwordless
  - universal-login
  - lock
contentType: tutorial
useCase:
  - customize-connections
  - build-app
---
# Implement Passwordless Authentication

This guide will show you how to implement [passwordless authentication](/connections/passwordless), which will allow your users to log in without a password. Instead, they will use a one-time-use code or magic link received via SMS or email.

## Prerequisites

**Before beginning this guide:**

* [Register your Application with Auth0](/getting-started/set-up-app). 
  * Select the appropriate **Application Type**.
  * Add an **Allowed Callback URL**.

## Passwordless authentication with Universal Login

1. [Set up the passwordless connection](#set-up-the-passwordless-connection): Set up the passwordless connection with which users can authenticate.
1. [Configure the Universal Login page](#configure-the-universal-login-page): Configure your login page to work with passwordless.
1. [Configure your application to use Universal Login](#configure-your-application-to-use-universal-login): Configure your application to call the login page. 

Optional: [Explore Sample Use Cases](/connections/passwordless/concepts/sample-use-cases-rules)

### Set up the passwordless connection

Set up the passwordless connection. This includes choosing the authentication method (SMS or email), customizing message text, and selecting code options.

To learn how, see [Set Up Passwordless Connections](/dashboard/guides/connections/set-up-connections-passwordless).

### Configure the Universal Login page

The best option is to use Auth0's Universal Login feature, which allows you to handle the various flavors of authentication without having to do any integration work. Better yet, your application will inherit all improvements Auth0 makes to its login flow without you needing to change a single line of code.

::: warning
We strongly recommend implementing passwordless with <dfn data-key="universal-login">[Universal Login](/universal-login)</dfn>. In fact, if you are building a Native application, which uses device-specific hardware and software, Universal Login is the only way to go.

To learn how to configure your login page for use with passwordless, see [Configure Universal Login with Passwordless](/dashboard/guides/universal-login/configure-login-page-passwordless).
:::

You can use Universal Login with Passwordless authentication in two ways:

* **Universal Login + Lock (passwordless)**: Configure your login page using Universal Login with the Lock (passwordless) template. The Lock (passwordless) template provides a sample login page using Auth0's Lock widget with Passwordless mode. You can customize the template using [available Lock options](/libraries/lock/v11#passwordless). 

* **Universal Login + Custom UI + Auth0.js**: Configure your login page using Universal Login with the Custom UI template. The Custom UI template provides a sample login page using HTML, CSS, and Auth0.js. You can customize the template to use your own HTML and CSS styling. You will also need to customize it to work with Passwordless by using available [Auth0.js options](/libraries/auth0js/v9#passwordless-login).

To learn how to configure your login page for passwordless using Universal Login, see [Configure Universal Login with Passwordless](/dashboard/guides/universal-login/configure-login-page-passwordless).

### Configure your application to use Universal Login

Set up your application to call the login page and handle the authentication callback. To do this, use our Quickstarts for your selected application type:

#### Regular Web Applications

Use any [Regular Web App Quickstart](/quickstart/webapp) to learn how to call the login page and handle the server-side authentication callback.

#### Single-Page Applications

Use any [Single-Page App Quickstart](/quickstarts/spa) and follow only the **Login** step to learn how to call the login page, handle the callback, and acquire your user's information.

#### Native Applications

Use one of the following QuickStarts and follow only the **Login** step to learn how to call the login page with Universal Login:

* [iOS (Swift) Quickstart](/quickstart/native/ios-swift/00-login)
* [Android Quickstart](/quickstart/native/android/00-login)

## Passwordless authentication with /oauth/token

An alternative option is to call the passwordless endpoints yourself. This is **not an option for Single-Page Applications**, which should use Universal Login, but is available for Native Apps or for Regular Web Apps. First, you must turn on the **Passwordless OTP** grant in your [Dashboard > Applications > (YOUR APPLICATION) > Settings > Advanced Settings > Grant Types](${manage_url}). Once this is done, you call the `passwordless/start` endpoint:

```json
POST https://YOUR_AUTH0_DOMAIN/passwordless/start
Content-Type: application/json
{
"client_id": "${account.clientid}",
“client_secret”: “YOUR_CLIENT_SECRET”, // only required for Web Apps as Native apps don’t have a client secret
"connection": "email", // accepts "email" or "sms"
"email": "EMAIL", // Value should be the user's email for connection=email; for sms, use "phone_number": "PHONE_NUMBER"
"send": "code",
"authParams": { // any authentication parameters that you would like to add
   "scope": "openid",
   "state": "YOUR_STATE" // Fill in your unique state here
   }
}
```

The user will then receive the OTP code (either by email or sms, whichever you chose). Your application will prompt the user for that code to complete the authentication flow. When the user enters the code, you can complete the authentication flow by calling the `/oauth/token` endpoint with the following parameters:

```json
POST https://YOUR_AUTH0_DOMAIN/oauth/token
Content-Type: application/json
{
  “grant_type” : “http://auth0.com/oauth/grant-type/passwordless/otp”
  "client_id": "${manage_url}",
  "client_secret": "YOUR_CLIENT_SECRET", // only for web apps, native apps don’t have a client secret
  "otp": "CODE",
  “audience” : “api-audience”,
  "realm": "email", // or "sms" 
  “username”:”<email address>”, // or "<phone number>"
  "scopes": "openid profile email"
}
```

If all went well, Auth0 will return a response similar to the following:

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
"access_token":"eyJz93a...k4laUWw",
"refresh_token":"GEbRxBN...edjnXbL",
"id_token":"eyJ0XAi...4faeEoQ",
"token_type":"Bearer",
"expires_in":86400
}
```

You can then decode the ID Token to get information about the user, or use the Access Token to call your API as normal.