---
description: This page explains how to configure and utilize the SSO Dashboard Extension
---

# Auth0 Extension: Single Sign-On (SSO) Dashboard

The **SSO Dashboard** extension allows you to create a dashboard with multiple enterprise applications that can be enabled for single sign-on for your users for login.

[View this Extension on GitHub](https://github.com/auth0-extensions/auth0-sso-dashboard-extension)

## Configure the extension

To install and configure this extension, click on the **SSO Dashboard** box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the dashboard. The **Install Extension** window will open.

![Install SSO Dashboard Extension](/media/articles/extensions/sso-dashboard/install-extension.png)

Set the following configuration variables:

- **EXTENSION_CLIENT_ID**: This is the **Client ID** of the application you have created in the [Clients](${manage_url}/#/clients) that you wish to use this extension with.
- **TITLE**: This the custom title that will appear at the top of the SSO Dashboard
- **CUSTOM_CSS**: This is an optional field that can contain a link to custom CSS you can use to style the look of your SSO Dashboard page.

Once you have provided this information, click **INSTALL**.

Navigate to the [Extensions](${manage_url}/#/extensions) page and click on the **Installed Extensions** tab.

Click on the row for the **SSO Dashboard** extension. The first time you click on your installed extension, you will be asked to grant it the required permissions.

Once you agree, you will be directed to your custom **SSO Dashboard** page, which will have the **TITLE** you provided at the top of the page, and if you provided a custom CSS file that styling will be applied.

![Your Custom SSO Dashboard](/media/articles/extensions/sso-dashboard/dashboard.png)

## Add a new application

To add a new application to your dashboard to be used for single sign-on, go to the **Settings** page of the dashboard by clicking on the link on the upper right corner of the page and click **Settings** from the dropdown.

Then click on the **CREATE APP** button to add a new application.

![Dashboard Settings](/media/articles/extensions/sso-dashboard/settings.png)

You will then need to enter the following fields for the new application:

**Type**: This field is a dropdown where you select the either SAML, OpenID-Connect, or WS-Federation depending on the type of application.
**Application**: This is the application name of the application you have created that you wish to associate the login of users.
**Name**: The name of the new application you are adding.
**Logo**: Enter the url of the logo you wish to user as an icon for the application.
**Callback**: This is one of the **Allowed Callback URLs** under your [Client Settings](${manage_url}/#/clients) of the application.
**Connection**: Select the connection type from the dropdown. You can add/edit your available connection types in the [Connections section of the Auth0 Management dashboard](${manage_url}/#/co.nnections/database).
**Enabled**: Select this checkbox for this application to be visible (published) to your users.

![Create a new application](/media/articles/extensions/sso-dashboard/new-app.png)

Once completed click the **CREATE** button.

Your new application will then appear on the **Applications** page of the SSO dashboard with any other applications that have been created.

![SSO Dashboard Applications](/media/articles/extensions/sso-dashboard/dashboard-apps.png)

You can click on an application here to test the connection.

## Update an existing application

To edit an existing application go to the **Settings** page of the dashboard by clicking on the link on the upper right corner of the page and click **Settings** from the dropdown.

You can change whether users can see the application (if it is enabled) with the **Publish** or **Unpublish** buttons. 

You can delete an application with the **X** button, a confirmation box will popup to confirm the deletion.

To update an application's settings, click the gear icon.

![Change Application Settings](/media/articles/extensions/sso-dashboard/change-settings.png)

Here you can change any of your application settings, or also delete the application.


