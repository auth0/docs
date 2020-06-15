---
title: Connect Apps to WordPress
connection: WordPress
image: /media/connections/wordpress.png
seo_alias: wordpress
index: 35
description: Learn how to add login functionality to your app with WordPress. You will need to obtain a Client Id and Client Secret for WordPress.
toc: true
topics:
  - connections
  - social
  - wordpress
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Apps to WordPress

You can add functionality to your web app that allows your users to log in with WordPress. 

## Prerequisites

Before connecting your Auth0 app to WordPress, you must have a [WordPress Developer](http://developer.wordpress.com/) account.

## Steps

To connect your app to WordPress, you will:

1. [Set up your app in WordPress](#set-up-your-app-in-wordpress)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in WordPress

1. Log in to the [WordPress Developer Portal](http://developer.wordpress.com/) and select **My Apps** from the top menu.

2. If you have not already registered your application with Wordpress, click **Create New Application**:

3. Complete information about your app on the **Create an Application** screen.

| Field | Value to Provide |
| - | - |
| Website URL | `https://${account.namespace}` |
| Redirect URL | `https://${account.namespace}/login/callback` |
|Javascript Origins | (optional) Whitelist URLs to prevent unauthenticated GET requests|
|Type | Select **Web** as the client type|

<%= include('../_find-auth0-domain-redirects') %>

4. After completing the fields, click on the **Create** button.

5. On the **My Applications** dashboard page, click **Manage Application**. Under the **OAuth Information** your **Client ID** and **Client Secret** are displayed.

### Create and enable a connection in Auth0

[Set up the WordPress social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
