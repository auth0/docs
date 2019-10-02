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
  * If you have chosen to use [embedded login](/login/embedded), [set up Cross-Origin Resource Sharing (CORS)](/dashboard/guides/applications/set-up-cors).

## Steps

1. [Set up the passwordless connection](#set-up-the-passwordless-connection): Set up the passwordless connection with which users can authenticate.

2. [Configure the login page](#configure-the-login-screen): Configure your login page to work with passwordless.

3. [Configure your application](#configure-your-application): Configure your application to call the login page. 

Optional: [Explore Sample Use Cases](/connections/passwordless/concepts/sample-use-cases-rules)


## Set up the passwordless connection

Set up the passwordless connection. This includes choosing the authentication method (SMS or email), customizing message text, and selecting code options.

To learn how, see [Set Up Passwordless Connections](/dashboard/guides/connections/set-up-connections-passwordless).

## Configure the login page

Configure your login page to work with passwordless. This includes setting up the passwordless fields on your login page and selecting user interface options.

### Universal Login

The best option is to use Auth0's Universal Login feature, which allows you to handle the various flavors of authentication without having to do any integration work. Better yet, your application will inherit all improvements Auth0 makes to its login flow without you needing to change a single line of code.

::: warning
We strongly recommend implementing passwordless with <dfn data-key="universal-login">[Universal Login](/universal-login)</dfn>. In fact, if you are building a Native application, which uses device-specific hardware and software, Universal Login is the only way to go.

To learn how to configure your login page for use with passwordless, see [Configure Universal Login with Passwordless](/dashboard/guides/universal-login/configure-login-page-passwordless).
:::

You can use Universal Login with Passwordless authentication in two ways:

* **Universal Login + Lock (passwordless)**: Configure your login page using Universal Login with the Lock (passwordless) template. The Lock (passwordless) template provides a sample login page using Auth0's Lock widget with Passwordless mode. You can customize the template using [available Lock options](/libraries/lock/v11#passwordless). 

* **Universal Login + Custom UI + Auth0.js**: Configure your login page using Universal Login with the Custom UI template. The Custom UI template provides a sample login page using HTML, CSS, and Auth0.js. You can customize the template to use your own HTML and CSS styling. You will also need to customize it to work with Passwordless by using available [Auth0.js options](/libraries/auth0js/v9#passwordless-login).

To learn how to configure your login page for passwordless using Universal Login, see [Configure Universal Login with Passwordless](/dashboard/guides/universal-login/configure-login-page-passwordless).

### Embedded Login

An alternative option is to use an embedded login form with the Lock (with Passwordless) widget. Using [Embedded Login](/login/embedded) with any application type leaves your application vulnerable to cross-origin resource sharing (CORS) attacks and requires the use of [Auth0 Custom Domains](/custom-domains), which is a paid feature. 

::: warning
If you are building a Native application, which uses device-specific hardware and software,Embedded Login is not a viable option. In this case, to provide passwordless authentication to your users, you must use Universal Login.
:::

To learn how to configure an embedded login page for use with passwordless, see [Configure Login Page for Passwordless: Embedded + Lock (with Passwordless)](/connections/passwordless/guides/configure-login-page-embedded).

## Configure your application

Set up your application to call the login page and handle the authentication callback. To do this, use our Quickstarts for your selected application type:

### Regular Web Applications

Use any [Regular Web App Quickstart](/quickstart/webapp) to learn how to call the login page and handle the server-side authentication callback.

### Single-Page Applications

Use any [Single-Page App Quickstart](/quickstarts/spa) and follow only the **Login** step to learn how to call the login page, handle the callback, and acquire your user's information.

### Native Applications

Use one of the following QuickStarts and follow only the **Login** step to learn how to call the login page with Universal Login:

* [iOS (Swift) Quickstart](/quickstart/native/ios-swift/00-login)
* [Android Quickstart](/quickstart/native/android/00-login)