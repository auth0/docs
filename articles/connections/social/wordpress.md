---
connection: WordPress
image: /media/connections/wordpress.png
seo_alias: wordpress
index: 11
description: How to obtain a Client Id and Client Secret for WordPress.
---

# Obtaining a Client ID and Client Secret for WordPress

To configure WordPress OAuth2 connections, you will need to register Auth0 with the [WordPress Developer Portal](http://developer.wordpress.com/).

This doc refers to the client steps to connect your client. If you are looking to manage authentication in your application, see [Next Steps](#next-steps) below.

## 1. Log In to the Developer Portal

Go to the [WordPress Developer Portal](http://developer.wordpress.com/), and log in with your WordPress credentials. Select **My Apps** from the top menu.

![](/media/articles/connections/social/wordpress/wordpress-dev-portal.png)

## 2. Provide Your Auth0 Client Information.

If you have not already registered your application with Wordpress, click **Create New Application**:

![](/media/articles/connections/social/wordpress/create-new-app.png)

Complete all the fields on the **Create an Application** screen.

![](/media/articles/connections/social/wordpress/create-new-app-config-screen.png)

**Name**- the name of your application;

**Description**-  The description of your application;

**Website URL**- The URL to an informational home page about your application;

**Redirect URL**- Enter `https://${account.namespace}/login/callback` in this field;

**Javascript Origins**- (Optional) Whitelist URLs to prevent unauthenticated GET requests;

**Verification Question**- to confirm you are an actual user performing the request;

**Type**- select **Web** as the client type;

After completing the fields, click on the **Create** button.

Then (or if you have previously registered your application) you will see your application listed on your dashboard landing page.

![](/media/articles/connections/social/wordpress/my-apps.png)

## 3. Get Your Client ID and Client Secret

On the **My Applications** dashboard page, click **Manage Application**. Under the **OAuth Information** you will see your **Client ID** and **Client Secret**.

![](/media/articles/connections/social/wordpress/oauth-info.png)

In a seperate tab or window, go to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard. 

Click on the box with the **WordPress** logo.

This will bring up the WordPress connection settings. Copy the **Client ID** and **Client Secret** from your WordPress application.

![Configure settings](/media/articles/connections/social/wordpress/settings.png)

Click **SAVE**. Then click the **Clients** tab and select the applications you wish to enable this connection.

![Enable clients](/media/articles/connections/social/wordpress/enable-clients.png)

Click **SAVE** when finished.

## 4. Test the Connection

In the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard a **TRY** icon will now be displayed next to the WordPress logo:

![Click Try](/media/articles/connections/social/wordpress/try-button.png)

Click **TRY**.

The WordPress access page will appear.

![Connect Your Site](/media/articles/connections/social/wordpress/allow-connection.png)

Click **Approve** and if configured correctly, you will see the **It works!!!** page:

<%= include('../_quickstart-links.md') %>
