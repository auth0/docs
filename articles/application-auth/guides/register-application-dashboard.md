---
title: Register Your Application with Auth0
description: Explains how to register an application with Auth0 using the Dashboard.
toc: true
topics:
  - authentication
  - oauth2
  - mobile-apps
  - desktop-apps
  - dashboard
contentType: 
  - how-to
useCase:
  - add-login
---
# Register Your Application with Auth0


1. Go to the [Auth0 Dashboard](${manage_url}), and click on [Applications](${manage_url}/#/applications) in the left-hand nav bar. 

2. Click **Create Application**.

The **Create Application** window will open, allowing you to enter the name of your new Application. 

3. Choose the [**Application Type**](/application-auth/reference/dashboard/app-settings.md), and click **Create** to proceed.

![](/media/articles/client-auth/mobile-desktop/create-client.png)

4. Once Auth0 creates the Application, navigate to the Application's **Settings** tab to:

* Add the appropriate callback URL to the **Allowed Callback URLs** field.
* Enable the **OIDC Conformant** Flag under the *OAuth* area of *Advanced Settings*.

![](/media/articles/client-auth/mobile-desktop/allowed-callback-url.png)

5. Scroll to the bottom of the page and click **Save**.
