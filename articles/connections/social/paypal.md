---
connection: PayPal
image: /media/connections/paypal.png
seo_alias: paypal
index: 10
---

# Obtain a Client Id and Secret for PayPal

To configure an OAuth connection with PayPal, you will need to register Auth0 on the **PayPal Developer** portal.

## 1. Log in into Developer Portal

Go to the [PayPal Developer](https://developer.paypal.com/) portal and log in with your PayPal credentials. Click on **Dashboard**.

From the **My Apps** page, click **Create App**:

![](/media/articles/connections/social/paypal/paypal-2.png)

Name your app and then click **Create App**:

![](/media/articles/connections/social/paypal/paypal-2a.png)

## 2. Complete information about your Auth0 instance

Scroll down to the **Sandbox App Settings** section and enter your *Return URL*:

	https://${account.namespace}/login/callback

then click **Save**:

![](/media/articles/connections/social/paypal/paypal-3.png)

**NOTE:** You can control the scope of access to customer data (profile, email, address, and phone) through Auth0 but you also need to enable this access on the PayPal portal by selecting the desired attributes under the **Advanced options** of the**Log In with PayPal** feature:

![](/media/articles/connections/social/paypal/paypal-3a.png)

## 3. Get your Client Id and Secret

Your `Client Id` and `Secret` are displayed in the **Sandbox API Credentials** section at the top of the same page.

![](/media/articles/connections/social/paypal/paypal-4.png)

## 4. Copy your *Client Id* and *Client Secret*

Go to your Auth0 Dashboard and select **Connections > Social**, then choose **PayPal**. Copy the `Client Id` and `Client Secret` from the **PayPal Developer** portal into the fields on this page on Auth0 and click **Save**:

![](/media/articles/connections/social/paypal/paypal-5.png)
