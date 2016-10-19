---
connection: Google
index: 1
image: /media/connections/google.png
description: This page shows you how to connect your Auth0 client to Google. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
alias:
 - gmail
 - google-oauth
 - google-oauth2
seo_alias: google
---

# Connect Your Client to Google

To connect your Auth0 client to Google and Google Apps, you will need to generate a *Client ID* and *Client Secret* in a Google project, copy these keys into your Auth0 settings, and enable the Connection.

## 1. Access the Google API Manager

While logged in to your Google account, go to the [API Manager](https://console.developers.google.com/projectselector/apis/credentials).

## 2. Create Your New App

To create your new app, navigate to **Credentials** using the left-hand menu:

![](/media/articles/connections/social/google/credentials.png)

While you are on the **Credentials** page, click on **Create a project**.

In the dialog box that appears, provide a Project name, answer Google's email- and privacy-related questions, and click **Create**:

![](/media/articles/connections/social/google/create-new-project.png)

Google will take a moment to create your project. When the process completes, Google will prompt you to create the credentials you need.

![](/media/articles/connections/social/google/create-credentials.png)

Click on **Create credentials** to display a pop-up menu listing the types of credentials you can create. Select the **OAuth client ID** option.

## 3. Set Up the Consent Screen

At this point, Google will display a warning banner that says, "To create an OAuth client ID, you must first set a product name on the consent screen." Click **Configure consent screen** to begin this process.

![](/media/articles/connections/social/google/create-client-id.png)

Provide a **Product Name** that will be shown to users when they log in through Google.

![](/media/articles/connections/social/google/oauth-consent-screen.png)

Click **Save**:

## 4. Create your *Client Id* and *Client Secret*

At this point, you will be prompted to provide additional information about your app.

![](/media/articles/connections/social/google/create-client-id-config.png)

Select **Web application**, and provide a name for your app.

Under **Restrictions**, enter the following information:

* **Authorized JavaScript origins:** `https://${account.namespace}`
* **Authorized redirect URI:** `https://${account.namespace}/login/callback`

Click **Create**. Your `Client Id` and `Client Secret` will be displayed:

![](/media/articles/connections/social/google/oauth-client-info.png)

Save your `Client Id` and `Client Secret` to enter into the connection settings in Auth0 in Step 7.

## 6. Enable the Admin SDK Service

If you are planning to connect to Google Apps enterprise domains, you will need to enable the **Admin SDK** service.

Navigate to the **Library** page of the API Manager.

Select **Admin SDK** from the list of APIs:

![](/media/articles/connections/social/google/api-manager-library.png)

On the **Admin SDK** page, click **Enable**.

![](/media/articles/connections/social/google/enable-admin-sdk.png)

## 7. Enable the Connection

Login to the [Auth0 Dashboard](${manage_url}) and select **Connections > Social** in the left navigation.

Select the connection with the Google logo to access this connection's **Settings** page:

![](/media/articles/connections/social/google/goog-settings.png)

Select each of your existing Auth0 Clients for which you want to enable this connection.

Click **Save**.

![](/media/articles/connections/social/google/goog-api-aoth0-apps.png)

## 8. Copy your *Client Id* and *Client Secret* into Auth0

Copy the `Client Id` and `Client Secret` from the Credentials page of your project in the **Google API Manager** into the fields on this page on Auth0.

![](/media/articles/connections/social/google/goog-api-aoth0-settings.png)

Select the **Permissions** for each of the features you want to allow your app to access.

Click **Save**.

## 9. Test your connection

Go back to the [Connections > Social](${manage_url}/#/conncetions/social) section of the Auth0 dashboard.

If you have configured your connection correctly, you will see a **Try** icon next to the Google logo:

![](/media/articles/connections/social/google/goog-api-trylogo.png)

Click **Try**.

Click **Allow** in the permissions pop-up screen:

![](/media/articles/connections/social/google/goog-api-permit.png)

If you have configured everything correctly, you will see the **It works!!!** page:

![](/media/articles/connections/social/google/goog-api-works.png)
