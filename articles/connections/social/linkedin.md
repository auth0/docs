---
title: Add LinkedIn Login to Your App
connection: LinkedIn
index: 3
image: /media/connections/linkedin.png
seo_alias: linkedin
description: Learn how to add login functionality to your app with LinkedIn. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
topics:
  - authentication
  - connections
  - social
  - linkedin
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---
# Add LinkedIn Login to Your App

This guide will show you how to add functionality to your web app that allows your users to log in with LinkedIn. Along the way, you will also learn how to get an Access Token that will allow you to access the LinkedIn API.

## 1. Create your app in LinkedIn

Log in to the [LinkedIn Developer portal](https://www.linkedin.com/developers), and click **Create App**.

You'll be asked to provide basic details about your app, including your:

* App name
* Company
* Privacy policy URL
* Business email
* App logo

You'll also need to select the products you'd like to add/integrate into your app. By default, you'll get the abilities to **Share on LinkedIn** and **Sign In with LinkedIn**. You can, however, also use the **Marketing Developer Platform**.

Finally, indicate that you agree to LinkedIn's legal terms, and click **Create App**.

### Client ID and Client Secret

LinkedIn automatically generates a **Client ID** and **Client Secret** for your application; you can find these on the app's **Auth** screen under **Application credentials**. Make a note of these values, since you'll need to provide them to Auth0 at a later point.

### OAuth 2.0 Settings

You will need to provide the appropriate Redirect URL for your app to LinkedIn. You can do this via the **Auth** screen under **OAuth 2.0 Settings**. Click the **pencil** icon, then click **Add redirect URL**. When prompted, provide the following:

| Field |    Description |
|-------|-------------|
| Redirect URLs |    `https://${account.namespace}/login/callback` |

<%= include('../_find-auth0-domain-redirects') %>

Click **Update** to save your changes.

## 2. Create and enable a connection in Auth0

[Set up the LinkedIn social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **Client ID** and **Client Secret** generated in Step 1.

## 3. Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social).

## Access LinkedIn's API

<%= include('../_call-api', {
  "idp": "LinkedIn"
}) %>

::: note
On 1 March 2019, LinkedIn replaced their sign-in API with version 2.0, and all LinkedIn connections in Auth0 were automatically updated to use this version. To learn more, see [Migration to LinkedIn API V2](/migrations/guides/linkedin-api-deprecation).
:::

<%= include('../_quickstart-links.md') %>
