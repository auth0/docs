---
connection: Github
image: /media/connections/github.png
seo_alias: github
index: 7
description: How to obtain a Client Id and Client Secret for GitHub.
---

# Obtain a *Client Id* and *Client Secret* for GitHub

To configure a GitHub connection, you will need to register Auth0 with GitHub.

## 1. Add a new application
Log into GitHub and go to [Register new application](https://github.com/settings/applications/new):

![](/media/articles/connections/social/github/github-addapp-1.png)

## 2. Register your new app

Complete the information on this page then click **Register application**. The callback address for your app will be:

  https://${account.namespace}/login/callback

![](/media/articles/connections/social/github/github-addapp-2.png)

## 3. Get your *Client Id* and *Client Secret*

Once the application is registered, your app's `Client Id` and `Client Secret` will be displayed on the following page:

![](/media/articles/connections/social/github/github-addapp-3.png)

### 4. Copy your *Client Id* and *Client Secret*

Go to your Auth0 Dashboard and select **Connections > Social**, then choose **Github**. Copy the `Client Id` and `Client Secret` from the **Developer Applications** of your app on Github into the fields on this page on Auth0.

![](/media/articles/connections/social/github/github-addapp-4.png)
