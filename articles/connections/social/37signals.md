---
connection: Basecamp
image: /media/connections/basecamp.png
alias:
  - basecamp
  - thirtysevensignals
seo_alias: 37signals
description: How to obtain a Client Id and Client Secret for 37Signals.
---

# Obtain a *Client Id* and *Client Secret* for 37Signals

To configure a 37Signals OAuth2 connection, you will need to register your Auth0 tenant on the [37Signals Integration Portal](https://integrate.37signals.com/).

### 1. Register a new App

Log into the Integration Portal. Select **New Application** and enter some general information about your app (name, website, logo) on first page:

![](/media/articles/connections/social/37signals/37signals-register-1.png)

### 2. Define the scope of access and enter your callback URL

On the next page, select which 37Signals applications you want to access, and enter your Auth0 callback URL in the **Redirect URI** field:

    https://${account.namespace}/login/callback

![](/media/articles/connections/social/37signals/37signals-register-2.png)

### 3. Generate your *Client Id* and *Client Secret*

Once your app is registered, a `Client Id` and `Client Secret` are generated for you.

![](/media/articles/connections/social/37signals/37signals-register-4.png)

Go to your Auth0 Dashboard and select **Connections > Social**, then choose **37Signals**. Copy the `Client Id` and `Client Secret` from the Integration Portal into the fields on this page.

![](/media/articles/connections/social/37signals/37signals-add-connection.png)
