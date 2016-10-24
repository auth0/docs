---
connection: Exact
image: /media/connections/exact.png
seo_alias: exact
description: How to obtain a Client Id and Client Secret for Exact.
---

# Obtain a *Client Id* and *Client Secret* for Exact

To configure an Exact OAuth2 connection, you will need to register your Auth0 tenant on the [Exact Online App Center](https://apps.exactonline.com/).

## 1. Register a new app

Log into the Exact Online App Center and click on **Manage Apps**:

![](/media/articles/connections/social/exact/exact-register-1.png)

and then click **Add a new application**:

![](/media/articles/connections/social/exact/exact-register-2.png)

## 2. Edit your App Properties.

Enter your app name:

![](/media/articles/connections/social/exact/exact-register-3.png)

In the `Redirect URI`field, enter this value:

    https://${account.namespace}/login/callback

and click **Save**.

## 3. Get your new app's *Client Id* and *Client Secret*

On the following page, your new app will be listed. To retrieve the `Client Id` and `Client Secret`, click **Edit**:

![](/media/articles/connections/social/exact/exact-register-4.png)

On this page, from the **Authorization** section, copy the `Client Id` and `Client Secret` provided.

![](/media/articles/connections/social/exact/exact-register-5.png)

## 4. Copy the *Client Id* and *Client Secret* to the Auth0 dashbaord.

Go to your Auth0 Dashboard and select **Connections > Social**, then choose **Exact**. Copy the `Client Id` and `Client Secret` from the **Manage App** page of your app in the Exact Online App Center into the fields on this page on Auth0.

![](/media/articles/connections/social/exact/exact-register-6.png)

**NOTE:** You can register applications in multiple regions with Exact. By default Auth0 will use `https://start.exactonline.nl`, but this value can be overridden with the `Base URL` parameter.
