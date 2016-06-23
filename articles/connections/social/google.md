---
connection: Google
image: /media/connections/google.png
description: This page shows you how to connect your Auth0 app to Google. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
alias:
 - gmail
 - google-oauth
 - google-oauth2
seo_alias: google
---

# Connect your app to Google

To connect your Auth0 app to Google and Google Apps, you will need to generate a *Client ID* and *Client Secret* in a Google project, copy these keys into your Auth0 settings, and enable the connection.

## 1. Access the Google API Manager

While logged in to your Google account, go to the [API Manager](https://console.developers.google.com).

From the project dropdown at the top of the page, select **Create a project...**:

![](/media/articles/connections/social/google/goog-api-app-new.png)

## 2. Create your new app

In the dialog box that appears, provide a Project name and click **Create**:

![](/media/articles/connections/social/google/goog-api-app-empty.png)

Google will take a moment to create your project. You will receive a notification when the process completes and the page will switch to your new project.

![](/media/articles/connections/social/google/goog-api-creation-activity.png)

## 3. Set up the Consent Screen

In the left sidebar, select **Credentials**, then select the **OAuth consent screen** tab.

On this page, provide a **Product Name** that will be shown to users when they log in through Google. 

Click **Save**:

![](/media/articles/connections/social/google/goog-api-product-name.png)

## 4. Enable the Google+ API

Select **Overview** in the left nav and choose the **Google+ API** item from the list of APIs:

![](/media/articles/connections/social/google/goog-api-plus-off.png)

Click **Enable API**:

![](/media/articles/connections/social/google/goog-api-plus-on.png)

## 5. Create your *Client Id* and *Client Secret*

Select the **Credentials** tab. 

Click **Create Credentials**. Select **OAuth client ID** in the pop-up menu.

![](/media/articles/connections/social/google/goog-api-credentials.png)

On the following page, select **Web application**, and provide a name for your app.

In the fields below, enter the following information:

* **Authorized JavaScript origins:** `https://${account.namespace}`
* **Authorized redirect URI:** `https://${account.namespace}/login/callback`

![](/media/articles/connections/social/google/goog-api-client-creation.png)

Click **Create**. Your `Client Id` and `Client Secret` will be displayed:

![](/media/articles/connections/social/google/goog-api-client-settings.png)

Save your `Client Id` and `Client Secret` to enter into the connection settings in Auth0 in Step 7.

## 6. Enable the Admin SDK Service

If you are planning to connect to Google Apps enterprise domains, you will need to enable the **Admin SDK** service.

Select **Admin SDK** from the list of APIs on the overview page:

![](/media/articles/connections/social/google/goog-api-admin-sdk.png)

On the **Admin SDK** page, click **Enable**.

![](/media/articles/connections/social/google/goog-api-admin-enable.png)

## 7. Copy your *Client Id* and *Client Secret* into Auth0

Login to the [Auth0 Dashboard](${uiURL}) and select **Connections > Social** in the left navigation.

Select the connection with the Google logo to access this connection's **Settings** page:

![](/media/articles/connections/social/google/goog-settings.png)

Copy the `Client Id` and `Client Secret` from the Credentials page of your project in the **Google API Manager** into the fields on this page on Auth0.

![](/media/articles/connections/social/google/goog-api-aoth0-settings.png)

Select the **Permissions** for each of the features you want to allow your app to access.

Click **Save**:

## 8. Enable the Connection

Go to the **Apps** tab of the Google connection on Auth0 and select each of your existing Auth0 apps for which you want to enable this connection.

Click **Save**.

![](/media/articles/connections/social/google/goog-api-aoth0-apps.png)

## 9. Test your app

Go back to the [Connections > Social](${uiURL}/#/conncetions/social) section of the Auth0 dashboard.

If you have configured your app correctly, you will see a **Try** icon next to the Google logo:

![](/media/articles/connections/social/google/goog-api-trylogo.png)

Click **Try**. 

Click **Allow** in the permissions pop-up screen:

![](/media/articles/connections/social/google/goog-api-permit.png)

If you have configured everything correctly, you will see the **It works!!!** page:

![](/media/articles/connections/social/google/goog-api-works.png)
