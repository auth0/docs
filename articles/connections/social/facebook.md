---
title: Add Facebook Login to Your App
connection: Facebook
index: 2
image: /media/connections/facebook.png
seo_alias: facebook
description: Learn how to add login functionality to your app with Facebook. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
topics:
  - authentication
  - connections
  - social
  - facebook
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---
# Add Facebook Login to Your App

This guide will show you how to add functionality to your web app that allows your users to log in with Facebook. Along the way, you will also learn how to get an <dfn data-key="access-token">Access Token</dfn> that will allow you to access the Facebook API.

## 1. Set up your app in Facebook

To learn how, follow Facebook's [App Development](https://developers.facebook.com/docs/apps) docs. During this process, Facebook will generate an **App ID** and **App Secret** for your application; you can find these in the app's **Basic Settings**.

While setting up your app, make sure you use the following settings:

* When asked to select scenarios, choose **Facebook Login**.
* On the **Facebook Login** > **Settings** page, under **Valid Oauth Redirect URIs**, enter your <dfn data-key="callback">callback URL</dfn>: `https://${account.namespace}/login/callback`.
* On the **Facebook Login** > **Settings** page, you can also set a **Deauthorize Callback URL** that will be called when a user deauthorizes your app.

<%= include('../_find-auth0-domain-redirects') %>

::: warning
If your application requests sensitive permissions, it may be [subject to review by Facebook](https://developers.facebook.com/docs/apps/review/). Only the `default` and `email` permissions do not currently require app review. For info on Facebook permissions, see Facebook's [Facebook Login Permissions Reference](https://developers.facebook.com/docs/facebook-login/permissions/).
:::

## 2. Create and enable a connection in Auth0

[Set up the Facebook social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **App ID** and **App Secret** generated in Step 1.

## 3. Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social).

::: note
Facebook allows you to create a copy of your application to use for testing purposes. A test application has its own unique **App ID** and **App Secret**. Because Auth0 only allows one Facebook connection to be configured per tenant, you have two options for testing in Auth0:

* While testing, use the testing application's **App ID** and **App Secret** in Auth0's social connection, and then change these values when you are ready to connect to the production application.

* [Create another Auth0 tenant](/dashboard/guides/tenants/create-multiple-tenants) to use for testing purposes and [set up a test environment](/dev-lifecycle/setting-up-env#set-the-environment).
:::


## Access Facebook's API

<%= include('../_call-api', {
  "idp": "Facebook"
}) %>

Facebook lets you select the minimum version of the Facebook API that is available to the application. This can be changed in the in the 'Settings/Advanced' section of your application in the Facebook developer portal. 

Auth0 has been tested with version 3.2. We recommend setting that as the minimum version, but it could work with newer versions.

## Facebook Re-Authentication

Once users authenticate, they will be prompted to accept the permissions your app has requested. Once they authenticate and accept, they will not be expected to re-authenticate unless you force them to. To learn how to force re-authentication, see Facebook's [Re-Authentication](https://developers.facebook.com/docs/facebook-login/reauthentication) docs.

## Additional Info

You can find additional info at Facebook's: [Facebook Login](https://developers.facebook.com/docs/facebook-login).

<%= include('../_quickstart-links.md') %>
