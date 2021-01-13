---
title: Connect Your App to Google G Suite
connection: Google G Suite
image: /media/connections/gsuite.png
public: true
seo_alias: g-suite
description: Learn how to connect your app to Google G Suite using an enterprise connection.
crews: crew-2
toc: true
topics:
    - connections
    - enterprise
    - google
    - g-suite
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect Your App to Google G Suite

::: panel Using Google Social and Enterprise Connections
If you have an existing [Google Social Connection](/connections/social/google) for your application and you create a new Google G Suite connection for the same domain, users affiliated with the social connection with now be logged in with the new enterprise connection. This will occur regardless of whether you enable the G Suite enterprise connection or not.
:::

## Prerequisites

**Before beginning:**

* [Register your Application with Auth0](/getting-started/set-up-app). 
  * Select an appropriate **Application Type**.
  * Add an **Allowed Callback URL** of **`${account.callback}`**.
  * Make sure your Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include the appropriate flows.

## Steps

To connect your application to Google G Suite, you must:

1. [Set up your app in Google](#set-up-your-app-in-google)
2. [Create an enterprise connection in Auth0](#create-an-enterprise-connection-in-auth0).
3. [Enable the enterprise connection for your Auth0 Application](#enable-the-enterprise-connection-for-your-auth0-application).
4. [Test the connection](#test-the-connection).

::: panel Google G Suite Account
Before proceeding, you will need a valid Google G Suite account and must have **your own** Google G Suite Organization for which you are an administrator. 
:::

## Set up your app in Google

To allow users to log in using Google G Suite, you must register your application in the Google developer console.

::: warning
Before proceeding, you must have already set up **your own** Google G Suite Organization for which you are an administrator.
:::

### Register a new application

To learn how to register a new application with Google, follow Google's [Setting up OAuth 2.0](https://support.google.com/googleapi/answer/6158849) doc. During this process, Google will generate a **Client ID** and **Client Secret** for your application; make note of these.

While setting up your app, make sure you use the following settings:

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

If you are planning to connect to Google G Suite enterprise domains, you will need to enable the **Admin SDK Service**. To learn how, follow Google's [Enable and disable APIs](https://support.google.com/googleapi/answer/6158841) doc.

## Create an enterprise connection in Auth0

Next, you will need to create and configure a Google G Suite Enterprise Connection in Auth0. Make sure you have the **Client ID** and **Client Secret** generated when you set up your app in the Google developer console.

1. Navigate to the [Connections > Enterprise](${manage_url}/#/connections/enterprise) page in the [Auth0 Dashboard](${manage_url}/), and click the `+` next to **Google G Suite**.

![Create Connection Type](/media/articles/dashboard/connections/enterprise/conn-enterprise-list.png)

2. Enter general information for your connection:

| Field | Description |
| ----- | ----------- |
| **Connection name** | Logical identifier for your connection; it must be unique for your tenant. Once set, this name can't be changed. |
| **Display name** (optional) | Text used to customize the login button for Universal Login. When set, the Universal Login login button reads: "Continue with {Display name}". |
| **Logo URL** (optional) | URL of image used to customize the login button for Universal Login. When set, the Universal Login login button displays the image as a 20px by 20px square. |
| **G Suite Domain** | Google G Suite domain name for your organization. |
| **Domain Aliases** (optional) | Comma-separated list of domains registered as aliases for the primary domain. |

![Configure General Google G Suite Settings](/media/articles/dashboard/connections/enterprise/conn-enterprise-gsuite-settings-1.png)

3. Enter credentials, select attributes, and configure advanced settings for your connection, then click **Create**:

| Field | Description |
| ----- | ----------- |
| **Client ID** | Unique identifier for your registered Google application. Enter the saved value of the **Client ID** for the app you just registered in the Google developer console. |
| **Client Secret** | String used to gain access to your registered Google application. Enter the saved value of the **Client Secret** for the app you just registered in the Google developer console. |
| **Attributes** | Basic attributes for the signed-in user that your app can access. Indicates how much information you want stored in the Auth0 User Profile. Options include: **Basic Profile** (`email`, `email verified` flag) and **Extended Profile** (name, public profile URL, photo, gender, birthdate, country, language, and timezone). |
| **Extended Attributes** | Extended attributes for the signed-in user that your app can access. Options include: **Groups** (distribution list(s) to which the user belongs), **Is Domain Administrator** (indicates whether the user is a domain administrator), **Is Account Suspended** (indicates whether the user's account is suspended), and **Agreed to Terms** (indicates whether the user has agreed to the terms of service). |
| **Auth0 APIs** | When **Enable Users API** is selected, indicates that you require the ability to make calls to the Google Directory API. |

![Configure Advanced Google G Suite Settings](/media/articles/dashboard/connections/enterprise/conn-enterprise-gsuite-settings-2.png)

4. If you have appropriate administrative permissions to configure your G Suite settings so you can use Google's Admin APIs, then click **Continue**. Otherwise, provide the given URL to your administrator so that they can adjust the required settings.

## Enable the enterprise connection for your Auth0 application

To use your new AD connection, you must first [enable the connection](/dashboard/guides/connections/enable-connections-enterprise) for your Auth0 Applications.

## Test the connection

Now you're ready to [test your connection](/dashboard/guides/connections/test-connections-enterprise).

<%= include('../_quickstart-links.md') %>
