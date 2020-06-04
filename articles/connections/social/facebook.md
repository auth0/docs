---
title: Connect Apps to Facebook
connection: Facebook
index: 13
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
# Connect Apps to Facebook

You can add functionality to your web app that allows your users to log in with Facebook. 

## Prerequisites

Before you connect your Auth0 app to Facebook, you must have a [Facebook Developer](https://developers.facebook.com/) account. Follow the instructions in [Facebook App Development](https://developers.facebook.com/docs/apps) docs. You must get an <dfn data-key="access-token">access token</dfn> that allows you to access the Facebook API.

## Steps

To connect your app to Facebook, you will:

1. [Set up your app in Facebook](#set-up-your-app-in-facebook)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Facebook

1. Log in to the [Facebook Developer](https://developers.facebook.com/) portal. 
2. Follow steps for [App Development](https://developers.facebook.com/docs/apps#register) to register your app. 
3. Add Facebook Login to your app in the App Dashboard. When asked to select a scenario, choose **Facebook Login**.
4. On the **Facebook Login > Settings** page, under **Valid Oauth Redirect URIs**, enter your <dfn data-key="callback">callback URL</dfn>: 

  `https://${account.namespace}/login/callback`

  You can also set a **Deauthorize Callback URL** that will be called when a user deauthorizes your app.

<%= include('../_find-auth0-domain-redirects') %>

::: note
If your application requests sensitive permissions, it may be [subject to review by Facebook](https://developers.facebook.com/docs/apps/review/). Only the `default` and `email` permissions do not currently require app review. For info on Facebook permissions, see Facebook's [Facebook Login Permissions Reference](https://developers.facebook.com/docs/facebook-login/permissions/).
:::

Once you are done you should have two pieces of information: the **Client ID** and **Client Secret** for your app.

### Create and enable a connection in Auth0

[Set up the Facebook social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

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

## Context Facebook field deprecation

As of 30 July 2019, Facebook connections that request the `context` field fail, so Auth0 does not request it for all connections.

If you are not using the ‘context’ field in the Facebook profile returned by Auth0 in your application, then your application will keep working without changes. Otherwise, you will need to adjust your application code so it does not rely on it.
 
If you want to make sure your application is not affected we recommend you make sure that the ‘Social context’ field is unchecked in the Facebook connection properties.

<%= include('../_quickstart-links.md') %>
