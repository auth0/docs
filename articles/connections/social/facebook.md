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

## Context Facebook field deprecation

On **July 30th 00:00 UTC**, Facebook connections that request the `context` field will fail, so Auth0 will stop requesting it for all connections at that time.

On April 30th [Facebook deprecated]( https://developers.facebook.com/docs/graph-api/changelog/4-30-2019-endpoint-deprecations) the use of the ‘Social Context’ field for new applications. Auth0 continued to request that field by default for Facebook connections created before April 30th 2019. You can make sure the field is not requested before July 30th by unchecking the ‘Social context’ field in the User Data connection section:
 
![facebook context](/media/articles/migrations/facebook-context.png)
 
Once you uncheck ‘Social context’, the profile data will not include the context field. The field has the following content:
 
```
"context": {
  "mutual_likes": {"data": [],"summary": {"total_count": 0}},
  "id": "dXNlcl9...UZD"
}
```
 
**Do I need to take any action?**
 
If you are not using the ‘context’ field in the Facebook profile returned by Auth0 in your application, then your application will keep working without changes. Otherwise, you will need to adjust your application code so it does not rely on it.
 
If you want to make sure your application is not affected on July 30th we recommend you to uncheck the ‘Social context’ field in the Facebook connection properties.

## Keep reading

You can find additional info at Facebook's: [Facebook Login](https://developers.facebook.com/docs/facebook-login).

<%= include('../_quickstart-links.md') %>
