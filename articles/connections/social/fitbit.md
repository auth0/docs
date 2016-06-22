---
connection: Fitbit
image: /media/connections/fitbit.png
seo_alias: fitbit
---

# Obtain a *Client ID* and *Client Secret* for Fitbit

**Fitbit has ended support for OAuth 1.0. New connections with Fitbit will use OAuth 2.0. Please see the following for reference on OAuth 2.0 at Fitbit: [https://dev.fitbit.com/docs/oauth2/](https://dev.fitbit.com/docs/oauth2/).**

To configure a Fitbit OAuth connection, you will need to register a new application in Fitbit.

## 1. Register a new Fitbit app

Log into the [Fitbit's Developer site](https://dev.fitbit.com) and select **REGISTER AN APP**:

![](/media/articles/connections/social/fitbit/fitbit-register-oauth2.png)

## 2. Enter your Callback URL

Complete the registration form with information about your new app. In the **Callback URL** field, enter:

	https://${account.namespace}/login/callback

and click **Register**.

## 3. Copy your new app's *Client ID* and *Client Secret*

From the **Edit Application** page, copy the `Client ID` and `Client Secret`:

![](/media/articles/connections/social/fitbit/fitbit-manage-oauth2.png)

## 4. Enter your Client ID and Client Secret

Go to your Auth0 Dashboard and select **Connections > Social**, then choose **Fitbit**. Copy the `Client ID` and `Client Secret` from the **Manage My Apps** page of your app on Fitbit into the fields on this page on Auth0:

![](/media/articles/connections/social/fitbit/fitbit-auth0-dashboard.png)

**NOTE:** Fitbit is a registered trademark and service mark of Fitbit, Inc. Auth0 is designed for use with the Fitbit platform. This product is not part of Fitbit, and Fitbit does not service or warrant the functionality of this product.
