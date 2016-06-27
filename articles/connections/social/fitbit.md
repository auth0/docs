---
connection: Fitbit
image: /media/connections/fitbit.png
seo_alias: fitbit
index: 14
---

# Obtain a *Consumer Key* and *Consumer Secret* for Fitbit

To configure a Fitbit oAuth connection, you will need to register a new application in Fitbit.

## 1. Register a new Fitbit app

Log into the [Fitbit's Developer site](https://dev.fitbit.com) and select **REGISTER AN APP**:

![](/media/articles/connections/social/fitbit/fitbit-register-1.png)

## 2. Enter your Callback URL

Complete the registration form with information about your new app. In the **Callback URL** field, enter:

	https://${account.namespace}/login/callback

and click **Register**.

## 3. Copy your new app's *Consumer Key* and *Consumer Secret*

From the **Edit Application** page, copy the `Consumer Key` and `Consumer Secret`:

![](/media/articles/connections/social/fitbit/fitbit-register-2.png)

## 4. Enter your Consumer Key and Consumer Secret

Go to your Auth0 Dashboard and select **Connections > Social**, then choose **Fitbit**. Copy the `Consumer Key` and `Consumer Secret` from the **Edit Application** page of your app on Fitbit into the fields on this page on Auth0:

![](/media/articles/connections/social/fitbit/fitbit-register-3.png)

**NOTE:** Fitbit is a registered trademark and service mark of Fitbit, Inc. Auth0 is designed for use with the Fitbit platform. This product is not part out by Fitbit, and Fitbit does not service or warrant the functionality of this product.
