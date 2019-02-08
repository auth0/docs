---
title: Connect your app to Google
connection: Google
index: 1
image: /media/connections/google.png
description: This article describes how to connect your app to Google. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
alias:
 - gmail
 - google-oauth
 - google-oauth2
seo_alias: google
toc: true
topics:
  - connections
  - social
  - google
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect your App to Google

This article describes how to add login with Google functionality to your app. It also discusses how you can get an Access Token in order to access the Google API.

First you need to connect your Auth0 application to Google. This is summarized in the following steps:

1. Generate a **Client ID** and **Client Secret** in a Google project
2. Enable the **Google Admin SDK Service**
3. Copy your Google **Client ID** and **Client Secret** keys into your Auth0 dashboard
4. Enable the Google social connection in Auth0

::: warning
If your client requests sensitive OAuth scopes, it may be [subject to review by Google](https://developers.google.com/apps-script/guides/client-verification).
:::

## 1. Generate the Google Client ID and Client Secret

1. Log in to your Google account and go to the [APIs & services](https://console.developers.google.com/projectselector/apis/credentials).

2. Navigate to **Credentials** using the left-hand menu:

  ![API Manager Credentials](/media/articles/connections/social/google/credentials.png)

3. On the **Credentials** page, click **Create credentials** and choose **OAuth client ID**.

  ![Create New Credentials](/media/articles/connections/social/google/create-new-credentials.png)

4. On the **Create client id** page, select **Web application**. In the new fields that display, set the following parameters:

| Field | Description |
| - | - |
| Name | The name of your web app |
| Authorized JavaScript origins | `https://${account.namespace}` |
| Authorized redirect URIs | `https://${account.namespace}/login/callback` |

  ![Web App Credentials Configuration](/media/articles/connections/social/google/create-client-id-config.png)

  Click **Create** to proceed.

5. Your `Client Id` and `Client Secret` will be displayed:

  ![OAuth Client ID and Secret](/media/articles/connections/social/google/oauth-client-info.png)

  Save your `Client Id` and `Client Secret` to enter into the Connection settings in Auth0.

## 2. Enable the Admin SDK Service

If you are planning to connect to Google Apps enterprise domains, you will need to enable the **Admin SDK** service.

1. Navigate to the **Library** page of the API Manager.

2. Select **Admin SDK** from the list of APIs:

  ![Google API Manager Library](/media/articles/connections/social/google/api-manager-library.png)

3. On the **Admin SDK** page, click **Enable**. If successful, the **Enable** link turns into **Disable**.

  ![API Manager Dashboard for Admin SDK](/media/articles/connections/social/google/enable-admin-sdk.png)

## 3. Enable the Connection in Auth0

1. Log in to the [Auth0 Dashboard](${manage_url}) and select **Connections > Social** in the left navigation.

2. Select the connection with the Google logo to access this connection's **Settings** page:

  ![](/media/articles/connections/social/google/goog-settings.png)

3. Select each of your existing Auth0 Clients for which you want to enable this connection. Click **Save** when you're done.

    ![](/media/articles/connections/social/google/goog-api-aoth0-apps.png)

4. Switch over to the *Settings* tab. Copy the `Client Id` and `Client Secret` from the Credentials page of your project in the **Google API Manager** into the fields on this page on Auth0.

    ![](/media/articles/connections/social/google/goog-api-aoth0-settings.png)

5. Select the **Permissions** for each of the features you want to allow your app to access. Click **Save** when you're done.

## 4. Test Your Connection

1. Go back to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard. If you have configured your connection correctly, you will see a **Try** icon next to the Google logo:

    ![](/media/articles/connections/social/google/goog-api-trylogo.png)

2. Click **Try**.

3. Click **Allow** in the permissions pop-up screen:

   ![](/media/articles/connections/social/google/goog-api-permit.png)

If you have configured everything correctly, you will see the **It works!!!** page:

   ![](/media/articles/connections/social/google/goog-api-works.png)

## 5. Access Google API

<%= include('../_call-api', {
  "idp": "Google"
}) %>

## Optional: Get a Refresh Token

You can also get a [Refresh Token](/tokens/refresh-token) from Google in order to refresh your Access Token, once it expires.

You can do this by setting the `access_type=offline` parameter when you call the [Auth0 `/authorize` endpoint](/api/authentication#social). 

If you use [Lock](/libraries/lock) you can set this parameter in the [params object](/libraries/lock/configuration#params-object-).

Note that you can only get a Refresh Token, if you are using one of the following OAuth 2.0 flows:
* [Regular Web App Login Flow](/flows/concepts/regular-web-app-login-flow)
* [Native/Mobile Login Flow](/flows/concepts/mobile-login-flow)
* [Resource Owner Password](/api-auth/grant/password)

:::note
A Single Page Application (normally implementing the [Single-Page Login Flow](/flows/concepts/single-page-login-flow)) should not under any circumstances get a Refresh Token. The reason for that is that the SPA is a public client and as such **cannot hold credentials securely**.
:::

<%= include('../_quickstart-links.md') %>
