---
title: Connect Your App to Google Workspace
connection: Google Workspace
image: /media/connections/gsuite.png
public: true
seo_alias: g-suite
description: Learn how to connect your app to Google Workspace using an enterprise connection.
crews: crew-2
toc: true
topics:
    - connections
    - enterprise
    - google
    - workspace
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect Your App to Google Workspace

::: panel Using Google Social and Enterprise Connections
If you have an existing [Google Social Connection](/connections/social/google) for your application and you create a new Google Workspace connection for the same domain, users affiliated with the social connection with now be logged in with the new enterprise connection. This will occur regardless of whether you enable the Google Workspace enterprise connection.
:::

## Prerequisites

  * [Register your Application with Auth0](/getting-started/set-up-app). 
  * Select an appropriate **Application Type**.
  * Add an **Allowed Callback URL** of **`${account.callback}`**.
  * Make sure your Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include the appropriate flows.

## Steps

To connect your application to Google Workspace, you must:

1. [Set up your app in Google](#set-up-your-app-in-google)
2. [Create an enterprise connection in Auth0](#create-an-enterprise-connection-in-auth0).
3. [Enable the enterprise connection for your Auth0 Application](#enable-the-enterprise-connection-for-your-auth0-application).
4. [Test the connection](#test-the-connection).

::: panel Google Workspace Account
Before proceeding, you will need a valid Google Workspace account and must have **your own** Google Workspace Organization for which you are an administrator. 
:::

## Set up your app in Google

To allow users to log in using Google Workspace, you must register your application in the Google developer console.

::: warning
Before proceeding, you must have already set up **your own** Google Workspace Organization for which you are an administrator.
:::

### Register a new application

To learn how to register a new application with Google, follow Google's [Setting up OAuth 2.0](https://support.google.com/googleapi/answer/6158849) doc. During this process, Google will generate a **Client ID** and **Client Secret** for your application; make note of these.

While setting up your app, be sure to use these settings:

* On the **OAuth consent screen**, under **Authorized domains**, add `auth0.com`.
* When asked to select an application type, choose **Web application** and set the following parameters:

| Field | Description |
| ----- | ----------- |
| Name | The name of your application. |
| Authorized JavaScript origins | `https://${account.namespace}` |
| Authorized redirect URIs | `https://${account.namespace}/login/callback` |

<%= include('../_find-auth0-domain-redirects') %>

::: warning
If your application requests sensitive OAuth <dfn data-key="scope">scopes</dfn>, it may be [subject to review by Google](https://developers.google.com/apps-script/guides/client-verification).
:::

### Enable the Admin SDK Service

If you plan to connect to Google Workspace enterprise domains, you need to enable the **Admin SDK Service**. To learn how, follow Google's [Enable and disable APIs](https://support.google.com/googleapi/answer/6158841) doc.

## Create an enterprise connection in Auth0

Next, you will need to create and configure a Google Workspace Enterprise Connection in Auth0. Make sure you have the **Client ID** and **Client Secret** generated when you set up your app in the Google developer console.

1. Navigate to [Auth0 Dashboard > Authentication > Enterprise](${manage_url}/#/connections/enterprise), locate **Google Workspace**, and click its `+`.

![Create Connection Type](/media/articles/connections/dashboard-connections-enterprise-list.png)

2. Enter details for your connection, and select **Create**:

| Field | Description |
| ----- | ----------- |
| **Connection name** | Logical identifier for your connection; it must be unique for your tenant. Once set, this name can't be changed. |
| **Google Workspace Domain** | Google Workspace domain name for your organization. |
| **Client ID** | Unique identifier for your registered Google application. Enter the saved value of the **Client ID** for the app you just registered in the Google developer console. |
| **Client Secret** | String used to gain access to your registered Google application. Enter the saved value of the **Client Secret** for the app you just registered in the Google developer console. |
| **Attributes** | Basic attributes for the signed-in user that your app can access. Indicates how much information you want stored in the Auth0 User Profile. Options include: **Basic Profile** (`email`, `email verified` flag) and **Extended Profile** (name, public profile URL, photo, gender, birthdate, country, language, and timezone). |
| **Extended Attributes** | Extended attributes for the signed-in user that your app can access. Options include: **Groups** (distribution list(s) to which the user belongs), **Is Domain Administrator** (indicates whether the user is a domain administrator), **Is Account Suspended** (indicates whether the user's account is suspended), and **Agreed to Terms** (indicates whether the user has agreed to the terms of service). |
| **Auth0 APIs** | When **Enable Users API** is selected, indicates that you require the ability to make calls to the Google Directory API. |
| **Sync user profile attributes at each login** | When enabled, Auth0 automatically syncs user profile data with each user login, thereby ensuring that changes made in the connection source are automatically updated in Auth0. |

![Create Connection Type](/media/articles/connections/dashboard-connections-enterprise-create_google-workspace_default-empty.png)

3. If you have appropriate administrative permissions to configure your Google Workspace settings so you can use Google's Admin APIs, then click **Continue**. Otherwise, provide the given URL to your administrator so that they can adjust the required settings.

4. On the **Login Experience** tab you can configure how users log in with this connection.

<%= include('./_login-experience-tab.md') %>

## Enable the enterprise connection for your Auth0 application

To use your new AD connection, you must first [enable the connection](/dashboard/guides/connections/enable-connections-enterprise) for your Auth0 Applications.

## Test the connection

Now you're ready to [test your connection](/dashboard/guides/connections/test-connections-enterprise).

## Requesting Refresh Tokens from Google

Google always returns an Access Token, which is stored in the user profile. If you add `access_type=offline&approval_prompt=force` to the authorization request, Auth0 will forward these parameters to Google. Google will then return a Refresh Token, which will also be stored in the user profile. 

<%= include('../_quickstart-links.md') %>
