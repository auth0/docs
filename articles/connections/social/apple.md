---
title: Connect Web Apps to Apple
connection: Apple
image: /media/connections/apple.svg
seo_alias: apple
description: Learn how to add login functionality to your web app with Apple. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true 
index: 2
public: true
topics:
  - authentication
  - connections
  - social
  - apple
contentType: concept
useCase:
  - add-login
  - connections
  - add-siwa
---
# Connect Web Apps to Apple

You can add functionality to your web application that allows your users to log in with Apple. The [Apple App Store Developer Guidelines](https://developer.apple.com/app-store/review/guidelines/#sign-in-with-apple) require that Sign In With Apple (SIWA) must be available in all applications that exclusively use third-party sign-in options, such as Facebook or Google.

::: note
To add SIWA capabilities to your native app, see [Add Sign In with Apple to Native iOS Apps](/connections/nativesocial/apple).
:::

## Prerequisites

Before you configure SIWA for your app in Auth0, you must have an [Apple Developer Program](https://developer.apple.com/programs/) account, which is a paid account. A free trial is available if you are a member of the [iOS Developer University Program](https://developer.apple.com/support/compare-memberships/).

## Steps

To connect your app to Apple, you will:

1. [Set up your app in Apple](#set-up-your-app-in-apple)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

## Set up your app in Apple

1. [Register Your App in the Apple Developer Portal](/connections/apple-siwa/set-up-apple). 
2. Note the following IDs and keys:
    * Services ID (Client ID)
    * Apple Team ID
    * Client Secret Signing Key
    * Key ID

::: note
If you are using the Classic Universal Login flow or embedding `Lock.js` in your application, make sure you are using `Lock.js` version 11.16 or later. 
:::

### Create and enable a connection in Auth0

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

#### Dashboard

[Set up the Apple social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the following values:
* Client ID (Services ID)
* Apple Team ID
* Client Secret Signing Key
* Key ID
    </div>
    <div id="mgmt-api" class="tab-pane">
    
#### Management API

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

### Test the connection

[Test the connection](/connections/apple-siwa/test-siwa-connection) to verify the connection works. 

If you have issues, see [Troubleshooting Sign In with Apple](/connections/apple-siwa/troubleshooting). 