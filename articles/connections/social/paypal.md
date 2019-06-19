---
title: Connect your app to PayPal
connection: PayPal
image: /media/connections/paypal.png
seo_alias: paypal
index: 10
description: How to obtain a Client Id and Client Secret for PayPal.
toc: true
topics:
  - connections
  - social
  - paypal
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect your app to PayPal

To configure an OAuth connection with PayPal, register your Auth0 Application on the [**PayPal Developer Portal**](https://developer.paypal.com/).

## 1. Register your app at the PayPal Developer Portal

Go to the [PayPal Developer Portal](https://developer.paypal.com/) and log in with your PayPal credentials. Click on **Dashboard** in the upper-right corner.

![](/media/articles/connections/social/paypal/dev-portal.png)

You will be directed to the **My Apps & Credentials** page. Scroll down to under the **REST API Apps** section, click **Create App**.

![](/media/articles/connections/social/paypal/apps-and-creds.png)

On the **Create New App** page, provide a value for **App Name** and click **Create App**:

![](/media/articles/connections/social/paypal/create-new-app.png)

## 2. Get your PayPal Client ID and Secret

Once PayPal has created your app, you will be shown the API credentials for this particular application. Copy both the **Client ID** and **Secret** values (the Secret value is initially hidden) for later use.

![](/media/articles/connections/social/paypal/api-creds.png)

Note that by default you are editing your Sandbox account. Switch to your live account by toggling to **Live** on the top right of the page.

## 3. Provide PayPal with information about your app

Scroll down to the **Sandbox App Settings** section and **Show** the **Return URL** box. Enter your <dfn data-key="callback">callback URL</dfn>:

`https://${account.namespace}/login/callback`

<%= include('../_find-auth0-domain-redirects') %>

![](/media/articles/connections/social/paypal/sandbox-settings.png)

If you would like to control the scope of access to customer data (such as profile information, email address, home address, and phone number) through Auth0, you need to enable access to this information by selecting the desired attributes under the **Advanced Options**, which becomes available to you if you enable the **Log In with PayPal** feature.

![](/media/articles/connections/social/paypal/log-in-with-paypal.png)

For your Sandbox Account to work, check the Full Name, Date of birth, Timezone, Locale, and Language because Auth0 requires this Basic Profile information.

Click **Save**:


## 4. Provide your PayPal Client Id and Secret to your Auth0 application

Go to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 Dashboard. Under the **Social** page, click to enable **PayPal**.

![](/media/articles/connections/social/paypal/social-connections.png)

Paste in the **Client Id** and **Secret** from the **PayPal Developer Portal** into the **App ID** and **App Secret** fields on this page on Auth0, respectively, then click **Save**.

![](/media/articles/connections/social/paypal/paypal-settings.png)

## 5. Enable and test the connection

Switch the **Paypal** connection in the dashboard to enabled. Then under **Applications**, choose which of your applications you want to enable this connection and then click **SAVE**.

![Enable Applications](/media/articles/connections/social/paypal/enable-clients.png)

Now you should see a **TRY** button for the **Paypal** connection.

![Try Paypal](/media/articles/connections/social/paypal/try-button.png)

This allows you to test your connection to see if it has been configured properly.

::: note
The Target URL field that you enter can take up to 3 hours for the change to go into effect with Paypal. This can cause the connection to fail until it is updated.
:::

## Additional Information

[Paypal Docs](https://developer.paypal.com/docs/)

<%= include('../_quickstart-links.md') %>
