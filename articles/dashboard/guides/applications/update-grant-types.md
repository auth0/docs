---
title: Update Grant Types
description: Learn how to update an application's grant types using the Auth0 Management Dashboard.
topics:
  - applications
  - grant-types
  - dashboard
contentType: how-to
useCase:
  - build-an-app
---
# Update Grant Types

This guide will show you how to change your application's grant types using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/applications/update-grant-types).

::: warning
As of 8 June 2017, new Auth0 customers **cannot** add legacy grant types to their Applications. Customers as of 8 June 2017 can add legacy grant types to only their existing Applications.
:::

::: panel Troubleshooting
* The device code grant type is only available for native apps.

* Attempting to use a flow with an Application lacking the appropriate `grant_types` for that flow (or with the field empty) will result in the following error:

```text
Grant type `grant_type` not allowed for the client.
```
:::

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the Application to view.

![View Applications](/media/articles/dashboard/guides/app-list.png)

2. Scroll to the bottom of the page, and click **Advanced Settings**.

![View Advanced Settings](/media/articles/clients/client-grant-types/client-advanced-settings.png)

3. Click the **Grant Types** tab, and enable or disable the appropriate grants for the application. When finished, click **Save Changes**.

![Select Grant Types](/media/articles/clients/client-grant-types/grant-types.png)
