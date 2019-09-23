---
title: Configure Login Page -  Universal Login + Lock with Passwordless
description: Learn how to configure your login page for use with passwordless authentication using the Auth0 Management Dashboard. You have a few options; this guide will show you how to use the Classic Universal Login experience with the Lock (with Passwordless) template.
topics:
  - universal-login
  - passwordless
  - login-page
  - lock
  - dashboard
contentType: 
  - how-to
useCase:
  - build-an-app
---
# Configure Login Page: Universal Login + Lock with Passwordless

This guide will show you how to set up a login page for use with [passwordless authentication](/connections/passwordless) using Auth0's Dashboard. 

When setting up a login page for passwordless, you have a few options. This guide uses the [Classic](/universal-login/classic) [Universal Login](/universal-login) experience with the [Lock (with Passwordless)](/libraries/lock/v11#passwordless) template. To authenticate users, this template uses the Auth0 Lock widget and can be customized accordingly.

::: warning
For passwordless authentication to work properly when previewing your login page, you must first have [configured a passwordless connection](/dashboard/guides/connections/set-up-connections-passwordless) for your application.
:::

1. Navigate to the [Universal Login](${manage_url}/#/login_settings) page in the [Auth0 Dashboard](${manage_url}/), and click the **Login** tab.

2. Enable the **Custom Login Page** toggle, and select the **Lock (passwordless)** template.

The HTML template will update with code using the Lock widget with passwordless customization options.

3. Customize the template, and click **Save Changes**.

You can use HTML and CSS to customize the login form. To learn more about how to use the Auth0.js SDK with the Custom Login Form template, see [Auth0.js SDK: Passwordless Login](/libraries/auth0js/v9#passwordless-login).

You can preview customization changes. Make sure to select the correct application for which you want to preview the login page.