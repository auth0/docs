---
title: Configure Login Page -  Universal Login + Custom UI + Auth0.js SDK
description: Learn how to configure your login page for use with passwordless authentication using the Auth0 Management Dashboard. You have a few options; this one will show you how to use the Classic Universal Login experience with the Custom UI template and the Auth0.js SDK.
topics:
  - universal-login
  - passwordless
  - login-page
  - custom-ui
  - auth0-js
  - dashboard
contentType: 
  - how-to
useCase:
  - build-an-app
---
# Configure Login Page - Universal Login + Custom UI + Auth0.js SDK

This guide will show you how to set up a login page for use with [passwordless authentication](/connections/passwordless) using Auth0's Dashboard. 

When setting up a login page for passwordless, you have a few options. This guide uses the [Classic](/universal-login/classic) [Universal Login](/universal-login) experience with the Custom Login Form template. To authenticate users, this template uses the [Auth0.js SDK](/libraries/auth0js).

::: warning
For passwordless authentication to work properly when previewing your login page, you must first have [configured a passwordless connection](/dashboard/guides/connections/configure-passwordless) for your application.
:::

1. Navigate to the [Universal Login](${manage_url}/#/login_settings) page in the [Auth0 Dashboard](${manage_url}/), and click the **Login** tab.

2. Enable the **Custom Login Page** toggle, and select the **Custom Login Form** template.

The HTML template will update with code using CSS and the Auth0.js SDK.

3. Customize the template, and click **Save Changes**.

You can preview customization changes. Make sure to select the correct application for which you want to preview the login page.