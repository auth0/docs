---
title: Connect your app to Yahoo!
connection: Yahoo!
image: /media/connections/yahoo.png
seo_alias: yahoo
index: 15
description: How to obtain a Consumer Key and Consumer Secret for Yahoo!
toc: true
topics:
  - connections
  - social
  - yahoo
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect your app to Yahoo!

These steps will guide you through how to create an application with Yahoo! and how to add it as a social connection in the Auth0 Dashboard.

## 1. Add a New Application

To begin, you need a Yahoo user ID. If you don’t have one ([login.yahoo.com](https://login.yahoo.com) or [admanager.yahoo.com](https://admanager.yahoo.com)), you need to create one.

Then, go to [Yahoo Developer Apps](https://developer.yahoo.com/apps/) and click on the **Create an App** button.

Create an **Application Name** and select **Web Application** as the **Application Type**. 

In the **Redirect URI(s)** field enter:

`https://${account.namespace}`

<%= include('../_find-auth0-domain-redirects') %>

For the **API Permissions**, select **Profiles (Social Directory)**. You may select additional API Permissions, but you need the **Profiles (Social Directory)** option at the very least (otherwise, Yahoo doesn't return the user's email address).

For each API Permission that you allow, you can choose the specific subset of permissions available to the app (e.g., read-only, read/write).

Click **Create App** to proceed.

## 2. Get your **Client Key** and **Client Secret**

Once the application is created, Yahoo will show you your **Client ID** (Consumer Key) and **Client Secret** (Consumer Secret). Copy these values, because you will use them to set up the connection in Auth0.

## 3. Set up the Connection in Auth0

In a separate tab or page, go to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard.

Click on the **Yahoo!** connection.

Enter your **Client Key** and **Client Secret** from Yahoo! then click **SAVE**.

![Enter your key and secret](/media/articles/connections/social/yahoo/setup-connection.png)

Next, click on the **Applications** tab next to **Settings** and enable which of your applications will be able to use this connection.

![Enable Applications](/media/articles/connections/social/yahoo/enable-clients.png)

When finished, click **SAVE**.

## 4. Test the Connection

On the [Connections > Social](${manage_url}/#/connections/social) page of the Auth0 dashboard you should now see a **TRY** button with the Yahoo! connection.

![Try button](/media/articles/connections/social/yahoo/try-button.png)

Click on this to test the new connection. This should bring up a confirmation page for the connection:

![Connection Approval](/media/articles/connections/social/yahoo/approve-connection.png)

If accepted, you should be able to see the **It Works!** confirmation page that your connection has been configured correctly.

<%= include('../_quickstart-links.md') %>
