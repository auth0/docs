---
title: Connecting Google Apps with Auth0
connection: Google Apps
image: /media/connections/googleapps.png
seo_alias: google-apps
description: Connecting Google Apps with Auth0.
crews: crew-2
toc: true
tags:
    - connections
    - enterprise
    - google
    - google-apps
---

# Connect Your Google App with Auth0

You can connect your Auth0 Application to Google Apps by providing the Google *Client ID* and *Client Secret* to Auth0.

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

::: note
Google may show an "unverified app" screen before displaying the consent screen for your app. To remove the unverified app screen, complete the [OAuth Developer Verification](https://support.google.com/code/contact/oauth_app_verification) process.
:::

10. At this point, you will be prompted to provide additional information about your newly-created app.

  ![Web App Credentials Configuration](/media/articles/connections/social/google/create-client-id-config.png)

11. Select **Web application**, and provide a name for your app.

12. Under **Restrictions**, enter the following information:

    * **Authorized JavaScript origins:** `https://${account.namespace}`
    * **Authorized redirect URI:** `https://${account.namespace}/login/callback`

    ::: note
    If you are using the [custom domains](/custom-domains) feature, you will need to use your custom domain in the redirect URI in the following format: `https://<YOUR_CUSTOM_DOMAIN>/login/callback`.
    :::

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

## Enable and Configure the Auth0 Enterprise Connection

1. Log in to your Auth0 account, and navigate to [Enterprise Connections](${manage_url}/#/connections/enterprise).
2. Scroll down to the row for Google Apps, and click the **Add New** plus icon.

  ![Enterprise Connections](/media/articles/connections/enterprise/google/enterprise-connections.png)

  You will see the *Settings* page for the Google Apps Connection.

  ![Google Apps Enterprise Connection Configuration](/media/articles/connections/enterprise/google/google-apps-connection-settings.png)

3. On the Settings screen, provide the following information:

| Parameter | Description |
| - | - |
| **Google Apps Domain** | the Google Apps domain you're using for authentication |
| **Domain Aliases** (optional) | a comma-separated list of domains registered as aliases for the primary domain |
| **Client ID** | the Client ID for your Google Apps Account |
| **Client Secret** | the Client Secret for your Google Apps Account |
| **Attributes** | the flag that indicates how much information you want stored in the Auth0 User Profile. Select one of the two options: **Basic Profile** (includes the `email` and the `email verified` flag) or **Extended Profile** (includes the name, public profile URL, photo, gender, birthdate, country, language, and timezone) |
| **Extended Attributes: Groups** | the distribution list(s) to which the user belongs |
| **Extended Attributes: Is Domain Administrator** | whether the user is a domain administrator or not |
| **Extended Attributes: Is Account Suspended**  | whether the user's account is suspended or not |
| **Extended Attributes: Agreed to Terms** | whether the user's agreed to the terms of service or not |
| Enable Users API | the flag that indicates whether you've chosen to enable the ability to make calls to the Google Directory API |

Click **Save** when you're done.

4. You will need to configure your settings so that your app can use Google's Admin APIs. If you're the administrator, you can click **Continue** on the Connection's *Settings* page to do so. If not, provide the URL you're given to your administrator so that they can adjust the required Settings.

  ![Google Apps Enterprise Connection Administrator Settings](/media/articles/connections/enterprise/google/config-settings.png)

## Enable the Connection for Your Auth0 Application

To use your newly-created Connection, you'll need to enable it for your Auth0 Application(s).

1. Go to the [Applications](${manage_url}/#/applications) page of the Management Dashboard.
2. Select the Application for which you want to enable the Connection.
3. Click the **Connections** icon for your Application.
4. Scroll down to the *Enterprise* section of the Connections page, and find your Google Apps Connection. Click the slider to enable the Connection. If successful, the slide turns green.

![Auth0 Application Connections](/media/articles/connections/enterprise/google/client-connection.png)

At this point, your users will be able to log in using their Google App credentials.

<%= include('../_quickstart-links.md') %>
