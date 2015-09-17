---
connection: Google / Gmail
image: /media/connections/google.svg
alias:
 - gmail
 - google-oauth
 - google-oauth2
---

# Obtain a *Client Id* and *Client Secret* for Google

To configure OAuth connections with Google or Google Apps, you will need to register Auth0  on the Google Developers Console.

## 1. Log into the API Console
Log into your Google account, go to the [Developers Console](https://console.developers.google.com), and click *Create an empty project*:

![](/media/articles/connections/social/google/goog-api-app-new.png)

## 2. Create your new app

In the dialog box that appears, provide a Project name and a Project ID for your new app and click **Create**:

![](/media/articles/connections/social/google/goog-api-app-empty.png)

An activity will begin, as shown in the following figure. Once the activity is completed you will be redirected to the project's dashboard to continue with the next steps.

![](/media/articles/connections/social/google/goog-api-creation-activity.png)

## 3. Enable the Google+ API

Click **Enable APIs**:

![](/media/articles/connections/social/google/goog-api-app-api.png)

Locate the **Google+ API** item in the list:

![](/media/articles/connections/social/google/goog-api-plus-off.png)

And click **Enable API**:

![](/media/articles/connections/social/google/goog-api-plus-on.png)

## 4. Set up the Consent Screen

In the left sidebar, under **APIs & auth**, select **Credentials**, then click **OAuth consent screen**. On this page, enter your **Product Name** that will be shown when users try to log in through Google. Then click **Save**:

![](/media/articles/connections/social/google/goog-api-product-name.png)

**NOTE:** If this field is left blank, your users may see errors such as `invalid_client: no application name` when attempting to log in.

## 5. Get your *Client Id* and *Client Secret*

Click **Credentials** in the left sidebar and then click the **Add Credentials** dropdown and select **OAuth 2.0 client ID**:

![](/media/articles/connections/social/google/goog-api-credentials.png)

Select **Web application**, and provide a name for your app.

In the fields below, enter the following information:

* Authorized JavaScript origins: `https://${account.namespace}`
* Authorized redirect URI: `https://${account.namespace}/login/callback`

![](/media/articles/connections/social/google/goog-api-client-creation.png)

Click **Create**. Your `Client Id` and `Client Secret` will be displayed:

![](/media/articles/connections/social/google/goog-api-client-settings.png)

You can now use this `Client Id` and `Client Secret` for your connection settings in Auth0.

## 6. Enable Admin SDK Service

If you are planning to connect to Google Apps enterprise domains, you need to enable the **Admin SDK** service.

To do so, click **API** in the left sidebar, locate the **Admin SDK** item and click **Enable API**.

![](/media/articles/connections/social/google/goog-api-admin-sdk.png)

## 7. Copy your *Client Id* and *Client Secret*

Go to your Auth0 Dashboard and select **Connections > Social**, then choose **Google**. Copy the `Client Id` and `Client Secret` from the **Google Developer Console** into the fields on this page on Auth0 and click **Save**:

![](/media/articles/connections/social/google/goog-api-aoth0-settings.png)


