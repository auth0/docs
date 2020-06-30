---
title: Configure Universal Login with Passwordless
description: Learn how to configure your login page for use with passwordless authentication using the Auth0 Management Dashboard.
topics:
  - universal-login
  - passwordless
  - login-page
  - lock
  - dashboard
  - auth0-js
contentType: 
  - how-to
useCase:
  - build-an-app
---
# Configure Universal Login with Passwordless

[Universal Login](/universal-login) is Auth0's implementation of the login flow, which is the key feature of an Authorization Server. Each time a user needs to prove their identity, your applications redirect to Universal Login and Auth0 will do what is needed to guarantee the user's identity. By choosing Universal Login, you don't have to do any integration work to handle the various flavors of authentication.

This guide will show you how to set up a login page for use with [passwordless authentication](/connections/passwordless) using Auth0's Dashboard. 

::: warning
For passwordless authentication to work properly when previewing your login page, you must first have [configured a passwordless connection](/connections/passwordless#implement-passwordless) for your application.
:::

When setting up a login page for passwordless, you have a few options. To learn how to configure your universal login page to use passwordless, select your implementation:

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#lock" data-toggle="tab">Universal Login + Lock (passwordless)</a></li>
      <li><a href="#custom" data-toggle="tab">Universal Login + Custom UI + Auth0.js</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="lock" class="tab-pane active">

## Universal Login + Lock (passwordless)
      
This login page uses the [Classic](/universal-login/classic) [Universal Login](/universal-login) experience with the **Lock (passwordless)** template. To authenticate users, this template uses the [Auth0 Lock widget with Passwordless mode](/libraries/lock/v11#passwordless) and can be customized accordingly.

1. Navigate to the [Universal Login](${manage_url}/#/login_settings) page in the [Auth0 Dashboard](${manage_url}/), and click the **Login** tab.

2. Enable the **Custom Login Page** toggle, and select the **Lock (passwordless)** template.

The HTML template will update with code using the Lock widget with passwordless customization options.

3. Customize the template, and click **Save Changes**.

You can use HTML and CSS to customize the login form. To learn more about how to customize the **Lock (passwordless)** template, see [Lock: Passwordless](/libraries/lock/v11#passwordless).

You can preview customization changes. Make sure to select the correct application for which you want to preview the login page.
    </div>
    <div id="custom" class="tab-pane">

## Universal Login + Custom UI + Auth0.js

This login page uses the [Classic](/universal-login/classic) [Universal Login](/universal-login) experience with the **Custom Login Form** template. To authenticate users, this template uses the [Auth0.js SDK](/libraries/auth0js) and can be customized accordingly.

1. Navigate to the [Universal Login](${manage_url}/#/login_settings) page in the [Auth0 Dashboard](${manage_url}/), and click the **Login** tab.

2. Enable the **Custom Login Page** toggle, and select the **Custom Login Form** template.

The HTML template will update with code using CSS and the Auth0.js SDK.

3. Customize the template, and click **Save Changes**.

You can use HTML and CSS to customize the login form. To learn more about how to use the Auth0.js SDK with the **Custom Login Form** template, see [Auth0.js SDK: Passwordless Login](/libraries/auth0js/v9#passwordless-login).

You can preview customization changes. Make sure to select the correct application for which you want to preview the login page.
    </div>
  </div>
</div>