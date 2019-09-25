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

This tutorial will show you how to implement passwordless authentication.

## Prerequisites

**Before beginning this tutorial:**

* [Register your Application with Auth0](/dashboard/guides/applications/register-app-regular-web). 
  * Select the appropriate **Application Type**.
  * Add an **Allowed Callback URL**.
  * If you have chosen to use [embedded login](/login/embedded), [set up Cross-Origin Resource Sharing (CORS)](/dashboard/guides/applications/set-up-cors).

## Steps

1. [Set up the passwordless connection](#set-up-the-passwordless-connection): Set up the passwordless connection with which users can authenticate.

2. [Configure the Login Screen](#configure-the-login-screen): Configure your login screen to work with passwordless.

3. [Configure your application](#configure-your-application): Configure your application to call the login page. 

Optional: [Explore Sample Use Cases](/connections/passwordless/concepts/sample-use-cases-rules)


## Set up the passwordless connection

Set up the passwordless connection. This includes choosing the authentication method (SMS or email), customizing message text, and selecting code options.

To learn how, see [Set Up Passwordless Connections](/dashboard/guides/connections/set-up-connections-passwordless).

## Configure the login screen

Configure your login screen to work with passwordless. 

We strongly recommend implementing passwordless with <dfn data-key="universal-login">[Universal Login](/universal-login)</dfn>, which redirects users to a central domain, through which authentication is performed, before redirecting users back to your application. To learn how to configure your login page for use with passwordless, see [Configure Universal Login with Passwordless](/dashboard/guides/universal-login/configure-login-page-passwordless).

::: warning
If you are building a Native application, which uses device-specific hardware and software, Universal Login is the only way to go.
:::

Alternatively, you can use an embedded login form with the Lock (with Passwordless) widget. Using [Embedded Login](/login/embedded) with any application type leaves your application vulnerable to cross-origin resource sharing (CORS) attacks and requires the use of [Auth0 Custom Domains](/custom-domains), which is a paid feature. To learn how to configure an embedded login page for use with passwordless, see [Configure Login Page for Passwordless: Embedded + Lock (with Passwordless)](/connections/passwordless/guides/configure-login-page-embedded).

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