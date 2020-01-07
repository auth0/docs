---
description: Learn how to install the Delegated Administration Extension, which allows you to expose the Users section of the Auth0 Dashboard to a select group of users without allowing them access to the rest of the Dashboard.
topics:
  - extensions
  - delegated-admin
  - dae
contentType:
  - how-to
useCase: 
  - extensibility-extensions
  - setup-delegated-admin
  - install-delegated-admin-extension
---
# Install the Delegated Admin Extension

This guide will show you how to install the [Delegated Admin Extension](/extensions/delegated-admin), which allows you to expose the Users section of the Auth0 Dashboard to a select group of users without allowing them access to the rest of the Dashboard.

::: warning
Before you install and configure the Delegated Admin extension, you need to [create a Delegated Admin Dashboard application](/dashboard/guides/extensions/delegated-admin-create-app) in Auth0.
:::

1. Go to [Dashboard > Extensions](${manage_url}/#/extensions) and filter for `Delegated Admin`.

2. Click on the **Delegated Administration Dashboard** box in the list of provided extensions. The **Install Extension** window will open.

3. Set the following configuration variables:

    | Variable | Description |
    | --- | --- |
    | **EXTENSION_CLIENT_ID** | **Client ID** of the application with which you plan to use this extension. |
    | **TITLE** | Custom title that will appear at the top of the Delegated Adminstration Dashboard page. |
    | **CUSTOM_CSS** | (*Optional*) Link to a custom CSS you can use to style the look of your Delegated Administration Dashboard page. |
    | **FAVICON_PATH** | (*Optional*) Path to custom favicon. |
    | **AUTH0_CUSTOM_DOMAIN** | (*Optional*) If you have a custom domain name configured, enter it here (e.g., `login.example.com`). This will change the authorization endpoint to `https://login.example.com/login`. |
    | **FEDERATED_LOGOUT** | (*Optional*) Indicates whether to sign out from the connection when users log out. |

::: note
Setting the `AUTH0_CUSTOM_DOMAIN` variable does not affect the extension URL, it only changes the authorization endpoint. When a custom domain is used, users that are logging into the extension will be navigated to `https://AUTH0_CUSTOM_DOMAIN/login` instead of the default `https://tenant-name.us.auth0.com/login`. 
:::

4. Click **Install**.

    If you navigate back to the [Applications](${manage_url}/#/applications) view, you will see that there has been an additional application created by the extension. This application is authorized to access the [Management API](/api/management/v2), so you shouldn't modify it.

    ![](/media/articles/extensions/delegated-admin/two-clients.png)

Next, learn how to [use the Delegated Admin Extension](/dashboard/guides/extensions/delegated-admin-use-extension).