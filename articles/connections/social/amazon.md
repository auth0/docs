---
connection: Amazon Web Services
image: /media/connections/amazon.png
alias:
  - aws
  - amazon-web-services
seo_alias: amazon
index: 9
description: How to obtain a Client Id and Client Secret for Amazon.
---

# Obtain a *Client Id* and *Client Secret* for Amazon

To configure an Amazon connection with Auth0, you will need to register your app on the Amazon portal.

This doc refers to the client steps to connect your client. If you are looking to manage authentication in your application, see [Next Steps](#next-steps) below.

### 1. Add a new Application
Log into [Login with Amazon](http://login.amazon.com) and select **App Console**.

![](/media/articles/connections/social/amazon/amazon-login-1.png)

### 2. Register a new application

Click on the **Register New Application** button and enter a **Name**, **Description**, and **Privacy Notice URL** for your app. Click **Save**.

![](/media/articles/connections/social/amazon/amazon-register-app.png)

### 3. Enter your callback URL

Expand the **Web Settings** section. Enter your Auth0 JavaScript origin in the **Allowed JavaScript Origins** field and callback URLs in the **Allowed Return URLs** field. The JavaScript origin address for your app should be:

    https://${account.namespace}/login/

and the callback address for your app should be:

    https://${account.namespace}/login/callback

### 4. Copy your *Client Id* and *Client Secret*

Go to your Auth0 Dashboard and select **Connections > Social**, then choose **Amazon**. Copy the `Client Id` and `Client Secret` from the **Web Settings** of your app on Amazon into the fields on this page on Auth0.

![](/media/articles/connections/social/amazon/amazon-add-connection.png)

<%= include('../_quickstart-links.md') %>
