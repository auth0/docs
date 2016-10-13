---
connection: WordPress
image: /media/connections/wordpress.png
seo_alias: wordpress
index: 11
description: How to obtain a Client Id and Client Secret for WordPress.
---

# Obtaining a Client ID and Client Secret for WordPress

To configure WordPress OAuth2 connections, you will need to register Auth0 with the [WordPress Developer Portal](http://developer.wordpress.com/).

## 1. Log In to the Developer Portal

Go to the [WordPress Developer Portal](http://developer.wordpress.com/), and log in with your WordPress credentials. Select **My Applications**.

![](/media/articles/connections/social/wordpress/wordpress-dev-portal.png)

## 2. Provide Your Auth0 Client Information.

If you have not already registered your application with Wordpress, click **Create New Application**:

![](/media/articles/connections/social/wordpress/create-new-app.png)

Complete the fields on the *Create an Application* screen with the requested details. Use this URL as your callback: `https://${account.namespace}/login/callback`

![](/media/articles/connections/social/wordpress/create-new-app-config-screen.png)

Once you've done so (or if you have previously registered your application), you will see your application listed on your dashboard landing page.

![](/media/articles/connections/social/wordpress/my-apps.png)

## 3. Get Your Client ID and Client Secret

Once you have created/registered your application, you will see it listed on your dashboard landing page. Click **Manage Application** to be taken to a display of your OAuth Information.

![](/media/articles/connections/social/wordpress/oauth-info.png)

Copy your new `Client ID` and `Client Secret` values, and paste them into the appropriate Connection settings page in Auth0.
