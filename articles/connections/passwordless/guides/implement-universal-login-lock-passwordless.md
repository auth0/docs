---
title: Implement Passwordless Authentication - Universal Login + Lock (with Passwordless)
description: Learn how to allow users to authenticate to your application using passwordless authentication. This guide will show you how to use the Classic Universal Login experience with the Lock (with Passwordless) template,which is the Auth0-recommended implementation.
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
# Implement Passwordless Authentication: Universal Login + Lock (with Passwordless)

::: note
This tutorial will show you how to implement passwordless authentication with a login screen using [Universal Login](/universal-login) with the Lock (with Passwordless) template, which is Auth0's recommended implementation (and the only implementation available for native applications). If you want to learn more about passwordless and alternative implementation methods, see [Passwordless Authentication](/connections/passwordless).
:::

## Prerequisites

**Before beginning this tutorial:**

* [Register your Application with Auth0](/dashboard/guides/applications/register-app-regular-web). 
  * Select the appropriate **Application Type**.
  * Add an **Allowed Callback URL**.

## Steps

1. [Configure the passwordless connection](#configure-the-passwordless-connection): Set up the passwordless connection with which users can authenticate.

2. [Configure the Login Screen](#configure-the-login-screen): Set up your login screen to work with passwordless.

3. [Configure your application](#configure-your-application): Set up your application to call the login page. 

Optional: [Explore Sample Use Cases](/connections/passwordless/concepts/sample-use-cases-rules)


## Configure the passwordless connection

Set up the passwordless connection. This includes choosing the authentication method (SMS or email), customizing message text, and selecting code options.

To learn how, see [Configure a passwordless connection](/dashboard/guides/connections/set-up-connections-passwordless).

## Configure the login screen

Set up your login screen to work with passwordless. In this guide, that includes using Universal Login with the Lock (with Passwordless) template.

* [Configure Login Page: Universal Login + Lock with Passwordless](/dashboard/guides/universal-login/configure-universal-login-lock-passwordless)

## Configure your application

Set up your application call the login page. 

Native applications:

Choose one of the following QuickStarts and follow only the **Login** step:

* [iOS (Swift) Quickstart](/quickstart/native/ios-swift/00-login)
* [Android Quickstart](/quickstart/native/android/00-login)

::: note
The process for invoking Universal Login from a native app is the same whether `lock-passwordless` will be used inside the login page or not.
:::


