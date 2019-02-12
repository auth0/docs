---
title: Update an Application's Grant Types using the Dashboard
description: Learn how to update an application's grant types using the Auth0 Dashboard.
topics:
  - applications
  - grant-types
contentType: how-to
useCase:
  - build-an-app
---
# Update an Application's Grant Types using the Dashboard

This guide will show you how to change your application's grant types using Auth0's Dashboard.

::: warning
As of 8 June 2017, new Auth0 customers **cannot** add *any* of the legacy grant types to their Applications. Only customers as of 8 June 2017 can add legacy grant types to their existing Applications.
:::

::: warning
Attempting to use any flow with a Application lacking the appropriate `grant_types` for that flow (or with the field empty) will result in the following error:

```text
Grant type `grant_type` not allowed for the client.
```
:::

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/). 

![Auth0 Applications](/media/articles/clients/client-grant-types/clients.png)

2. Click the name of your application to see its settings.

![Auth0 Application Settings](/media/articles/clients/client-grant-types/client-settings.png)

3. Scroll to the bottom of the settings page, and click **Advanced Settings**.

![Auth0 Application Advanced Settings](/media/articles/clients/client-grant-types/client-advanced-settings.png)

4. Click the **Grant Types** tab, and enable or disable the appropriate grants for the application. When finish, click **Save Changes**.

![Auth0 Application Grant Types](/media/articles/clients/client-grant-types/grant-types.png)
