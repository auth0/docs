---
title: Add Google Login to Your App
connection: Google
index: 1
image: /media/connections/google.png
description: Learn how to add login functionality to your app with Google. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
alias:
 - gmail
 - google-oauth
 - google-oauth2
seo_alias: google
toc: true
topics:
  - authentication
  - connections
  - social
  - google
contentType: how-to
useCase:
    - add-login
    - customize-connections
    - add-idp
---
# Add Google Login to Your App

This guide will show you how to add functionality to your web app that allows your users to log in with Google. Along the way, you will also learn how to get an Access Token that will allow you to access the Google API.

1. Generate a **Client ID** and **Client Secret** in your Google project. To do this, follow Google's [Setting up OAuth 2.0](https://support.google.com/googleapi/answer/6158849) doc, and copy the Client ID and Client Secret that you generate.

Make sure you use the following settings:

* On the **OAuth consent screen**, under **Authorized domains**, add `auth0.com`.
* When asked to select an application type, choose **Web application** and set the following parameters:

| Field | Description |
| - | - |
| Name | The name of your application. |
| Authorized JavaScript origins | `https://${account.namespace}` |
| Authorized redirect URIs | `https://${account.namespace}/login/callback` |

<%= include('../_find-auth0-domain-redirects) %>

::: warning
If your application requests sensitive OAuth scopes, it may be [subject to review by Google](https://developers.google.com/apps-script/guides/client-verification).
:::

2. Enable the **Google Admin SDK Service**. To do this, follow Google's [Enable and disable APIs](https://support.google.com/googleapi/answer/6158841) doc.

3. [Set up the Google social connection](/connections/guides/set-up-connections-social) in Auth0. Make sure you have the Client ID and Client Secret generated in Step 1.

4. [Test the connection](/connections/guides/test-connections-social).

5. Access Google's API.

<%= include('../_call-api', {
  "idp": "Google"
}) %>

6. Optional: Get a [Refresh Token](/tokens/refresh-token/current#get-a-refresh-token) from Google to refresh your Access Token once it expires. To ensure your application is secure, pay close attention to the [restrictions on using Refresh Tokens](/tokens/refresh-token/current#restrictions-on-refresh-token-usage).

<%= include('../_quickstart-links.md') %>
