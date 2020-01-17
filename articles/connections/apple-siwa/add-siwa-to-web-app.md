---
title: Add Sign In with Apple to Web or Other Apps
description: Learn how to add native login functionality to your web or other app with Apple. 
toc: true
topics:
  - authentication
  - connections
  - social
  - apple
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---
# Add Sign In with Apple to Web or Other Apps

You can add functionality to your web application that allows your users to authenticate using their Apple login credentials. As with other identity providers supported by Auth0, when your users log in, they can click the **Sign In with Apple** button, and they'll be taken to the Apple sign-in screen. They will see the name of your app and a placeholder icon. They will enter their Apple ID and password. If their Apple ID has two-factor authentication enabled, they'll be prompted for that as well.

## Prerequisites

Before you configure Sign In with Apple (SIWA) for your native app in Auth0, you must:

* Have an [Apple Developer](https://developer.apple.com/programs/) account, which is a paid account with Apple. (There is no free trial available unless you are part of their [iOS Developer University Program](https://developer.apple.com/support/compare-memberships/).)
* [Register Your App in the Apple Developer Portal](/connections/apple-siwa/set-up-apple) if you have not already done so. Make a note of the following IDs and key for the application connection settings in the Auth0 Dashboard:
  * **Services ID** (Client ID)
  * **Apple Team ID**
  * **Client Secret Signing Key**
  * **Key ID**

::: note
If you are using the Classic Universal Login flow or embedding `Lock.js` in your application, make sure you are using `Lock.js` version 11.16 or later. 
:::

## Configure and enable the connection in Auth0

Once you have the credentials you need from your Apple Developer account, you must configure the connection settings and enable the connection for your application in Auth0. You can complete these tasks using either the Auth0 Dashboard or Management API.

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#dashboard" data-toggle="tab">Dashboard</a></li>
      <li><a href="#mgmt-api" data-toggle="tab">Management API</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="dashboard" class="tab-pane active">

1. Navigate to [Social Connections](${manage_url}/#/connections/social)  page in the [Auth0 Dashboard](${manage_url}/), and click the **Apple** connection.

2. On the **Settings** tab, enter the following fields, and click **Save**:
    * **Client ID** (Services ID)
    * **Apple Team ID**
    * **Client Secret Signing Key**
    * **Key ID**

    ![Application Connection Settings](/media/articles/connections/social/apple/apple-connection.png)

    ::: note
    The **Client Secret Signing Key** is contained within the key file you downloaded while setting up the key on the Apple Developer site. You can copy and paste the contents of that file into this field.
    :::

3. [Test the connection](/connections/apple-siwa/test-siwa-connection). 

</div>
    <div id="mgmt-api" class="tab-pane">

1. Make a `POST` call to the [Create a Connection endpoint](/api/management/v2/#!/Connections/post_connections). Be sure to replace `MGMT_API_ACCESS_TOKEN`, `CLIENT_ID`, `APPLE_TEAM_ID`, `APPLE_KEY_ID`, `APPLE_SERVICES_ID`, and `APPLE_CLIENT_SECRET_SIGNING_KEY` placeholder values with your Management API Access Token, Auth0 Client ID, Apple Team ID, Apple Key ID, Apple Services ID, and Apple Client Secret Signing Key values, respectively.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/api/v2/connections",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"name\": \"My Apple Connection\", \"strategy\": \"apple\", \"enabled_clients\": [ { \"CLIENT_ID\" },{ \"CLIENT_ID\" } ], \"options\":{ \"team_id\": \"APPLE_TEAM_ID\", \"client_id\": \"APPLE_SERVICES_ID\", \"kid\": \"APPLE_KEY_ID\", \"app_secret\": \"APPLE_CLIENT_SECRET_SIGNING_KEY\", \"email\": true, \"name\": true} }"
  }
}
```

| Value | Description |
| - | - |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `create:connections`. |
| `CLIENT_ID` | Client ID of the application for which you want the connection enabled. You can find this on the settings page for your[Application](${manage_url}/#/applications) in the [Auth0 Dashboard](${manage_url}/). |
| `APPLE_TEAM_ID` | Team ID of your Apple team. You can find this in the Apple Developer Portal under **Membership Details**. |
| `APPLE_SERVICES_ID` | Services ID for your Apple application. You can find this in the Apple Developer Portal under **Certificates, Identifiers & Profiles**. |
| `APPLE_CLIENT_SECRET_SIGNING_KEY` | Client Secret Signing Key for your Apple application. You can find this in the Apple Developer Portal under **Certificates, Identifiers & Profiles**. |
| `APPLE_KEY_ID` | Key ID of the Client Secret Signing Key for your Apple application. You can find this in the Apple Developer Portal under **Certificates, Identifiers & Profiles**.|
    </div>
  </div>
</div>

## Keep reading

* [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa)
* [Rate Limits on Native Social Logins](/policies/rate-limits#limits-on-native-social-logins)
* [Test Sign In with Apple Configuration](/connections/apple-siwa/test-siwa-connection)
