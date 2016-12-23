---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 ASP Classic SDK to add authentication and authorization to your web app.
budicon: 448
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Microsoft Internet Information Services (IIS)
:::



**Please follow the steps below to configure your existing ASP.Net Classic WebApp to use it with Auth0.**

## Showing the Login Widget

First, we need to create the `default.asp` which will show the Login Widget from Auth0.

${snippet(meta.snippets.setup)}

After logging in with any provider, Auth0 will redirect the user to `/callback.asp`.

## Processing the Callback Response

For parsing JSON response, we'll download [json2.js](http://cdnjs.cloudflare.com/ajax/libs/json2/20130526/json2.js) and put it in the project directory.

We need to add the handler for the Auth0 callback so that we can authenticate the user and get their information. For that, we'll create the `callback.asp` file.

It will implement the basic OAuth 2 flow:

1. Exchanges the **code** for an **access_token**
1. Calls the **Userinfo** endpoint to get the current logged in user profile using the access_token as credentials.

${snippet(meta.snippets.use)}
