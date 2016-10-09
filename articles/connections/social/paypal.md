---
connection: PayPal
image: /media/connections/paypal.png
seo_alias: paypal
index: 10
description: How to obtain a Client Id and Client Secret for PayPal.
---

# Obtain a PayPal Client Id and Secret

To configure an OAuth connection with PayPal, register your Auth0 Client on the [**PayPal Developer Portal**](https://developer.paypal.com/).

## 1. Registering Your Auth0 Client Using the PayPal Developer Portal

Go to the [PayPal Developer Portal](https://developer.paypal.com/) and log in with your PayPal credentials. Click on **Dashboard** in the upper-right corner.

![](/media/articles/connections/social/paypal/dev-portal.png)

You will be directed to the *My Apps & Credentials* page immediately. Under the *REST API Apps* section, click **Create App**

![](/media/articles/connections/social/paypal/apps-and-creds.png)

On the *Create New App* page, provide a value for **App Name** and click **Create App**:

![](/media/articles/connections/social/paypal/create-new-app.png)

## 2. Obtain Your PayPal Client ID and Secret

Once PayPal has created your app, you will be shown the API credentials for this particular application. Copy both the **Client ID** and **Secret** values (the Secret value is initially hidden) for later use.

![](/media/articles/connections/social/paypal/api-creds.png)

## 3. Provide PayPal with Information About Your Auth0 Client

Scroll down to the **Sandbox App Settings** section and **Show** the **Return URL** box. Enter the following value:

`https://${account.namespace}/login/callback`

![](/media/articles/connections/social/paypal/sandbox-settings.png)

If you would like to control the scope of access to customer data (such as profile information, email address, home address, and phone number) through Auth0, you need to enable access to this information by selecting the desired attributes under the **Advanced Options**, which becomes available to you if you enable the **Log In with PayPal** feature.

![](/media/articles/connections/social/paypal/log-in-with-paypal.png)

Click **Save**:

## 4. Provide Your PayPal Client Id and Secret to Your Auth0 Client

Log in to your [Auth0 Management Dashboard](${manage_url}). Using the left-side navigation bar, select **Connections**. Under the **Social** page, enable **PayPal**.

![](/media/articles/connections/social/paypal/social-connections.png)

Paste in the `Client Id` and `Client Secret` from the **PayPal Developer Portal** into the **App ID** and **App Secret** fields on this page on Auth0, respectively, and click **Save**

![](/media/articles/connections/social/paypal/paypal-settings.png)
