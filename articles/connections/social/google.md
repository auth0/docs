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

To connect your Auth0 client to Google, you will need to generate a *Client ID* and *Client Secret* in a Google project, copy these keys into your Auth0 settings, and enable the Connection.

**NOTE**: This doc refers to the client steps to connect your client to Google. If you are looking to manage authentication in your app, see [Next Steps](#next-steps) below.

## Generate the Google Client ID and Client Secret

1. While logged in to your Google account, go to the [API Manager](https://console.developers.google.com/projectselector/apis/credentials).

2. Create your new app by navigating to **Credentials** using the left-hand menu:

  ![API Manager Credentials](/media/articles/connections/social/google/credentials.png)

3. While you are on the **Credentials** page, click on **Create a project**.

4. In the dialog box that appears, provide a Project name, answer Google's email- and privacy-related questions, and click **Create**:

  ![Create New Project](/media/articles/connections/social/google/create-new-project.png)

5. Google will take a moment to create your project. When the process completes, Google will prompt you to create the credentials you need.

  ![Create Google Credentials](/media/articles/connections/social/google/create-credentials.png)

6. Click on **Create credentials** to display a pop-up menu listing the types of credentials you can create. Select the **OAuth client ID** option.

7. At this point, Google will display a warning banner that says, "To create an OAuth client ID, you must first set a product name on the consent screen." Click **Configure consent screen** to begin this process.

  ![Configure Consent Screen](/media/articles/connections/social/google/create-client-id.png)

8. Provide a **Product Name** that will be shown to users when they log in through Google.

  ![OAuth Consent Screen](/media/articles/connections/social/google/oauth-consent-screen.png)

9. Click **Save**.

10. At this point, you will be prompted to provide additional information about your newly-created app.

  ![Web App Credentials Configuration](/media/articles/connections/social/google/create-client-id-config.png)

11. Select **Web application**, and provide a name for your app.

12. Under **Restrictions**, enter the following information:

    * **Authorized JavaScript origins:** `https://${account.namespace}`
    * **Authorized redirect URI:** `https://${account.namespace}/login/callback`

13. Click **Create**. Your `Client Id` and `Client Secret` will be displayed:

  ![OAuth Client ID and Secret](/media/articles/connections/social/google/oauth-client-info.png)

  Save your `Client Id` and `Client Secret` to enter into the Connection settings in Auth0.

### Enable the Admin SDK Service

If you are planning to connect to Google Apps enterprise domains, you will need to enable the **Admin SDK** service.

1. Navigate to the **Library** page of the API Manager.

2. Select **Admin SDK** from the list of APIs:

  ![Google API Manager Library](/media/articles/connections/social/google/api-manager-library.png)

3. On the **Admin SDK** page, click **Enable**.

  ![API Manager Dashboard for Admin SDK](/media/articles/connections/social/google/enable-admin-sdk.png)

## Enable the Connection in Auth0

1. Log in to the [Auth0 Dashboard](${manage_url}) and select **Connections > Social** in the left navigation.

2. Select the connection with the Google logo to access this connection's **Settings** page:

  ![](/media/articles/connections/social/google/goog-settings.png)

3. Select each of your existing Auth0 Clients for which you want to enable this connection. Click **Save** when you're done.

    ![](/media/articles/connections/social/google/goog-api-aoth0-apps.png)

4. Switch over to the *Settings* tab. Copy the `Client Id` and `Client Secret` from the Credentials page of your project in the **Google API Manager** into the fields on this page on Auth0.

    ![](/media/articles/connections/social/google/goog-api-aoth0-settings.png)

5. Select the **Permissions** for each of the features you want to allow your app to access. Click **Save** when you're done.

## Test Your Connection

1. Go back to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard. If you have configured your connection correctly, you will see a **Try** icon next to the Google logo:

    ![](/media/articles/connections/social/google/goog-api-trylogo.png)

2. Click **Try**.

3. Click **Allow** in the permissions pop-up screen:

    ![](/media/articles/connections/social/google/goog-api-permit.png)

If you have configured everything correctly, you will see the **It works!!!** page:

    ![](/media/articles/connections/social/google/goog-api-works.png)

<%= include('../_quickstart-links.md') %>
