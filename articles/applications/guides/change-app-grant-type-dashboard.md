---
title: Change an Application's Grant Types Using the Dashboard
description: Explains how to change the grant types for an application using the Auth0 dashboard.
toc: false
topics:
  - dashboard
  - grants
contentType: 
  - how-to
useCase:
  - add-login
  - call-api
  - secure-api
---

# Change an Application's Grant Types using the Auth0 Dashboard

You can set an Application's `grant_types` property using the Dashboard.

::: warning
As of 8 June 2017, new Auth0 customers **cannot** add *any* of the legacy grant types to their Applications. Only customers as of 8 June 2017 can add legacy grant types to their existing Applications.
:::

1. Navigate to [Applications](${manage_url}/#/applications).

![Auth0 Applications](/media/articles/clients/client-grant-types/clients.png)

2. Click on the cog icon <i class="icon icon-budicon-329"></i> next to your Application to launch its settings page.

![Auth0 Application Settings](/media/articles/clients/client-grant-types/client-settings.png)

3. Scroll to the bottom of the settings page, and click **Advanced Settings**.

![Auth0 Application Advanced Settings](/media/articles/clients/client-grant-types/client-advanced-settings.png)

4. Click the **Grant Types** tab, and enable or disable the respective grants for the Application. Click **Save Changes**.

![Auth0 Application Grant Types](/media/articles/clients/client-grant-types/grant-types.png)


## Keep Reading

* [Change an Application's Grant Types using the Management API](/applications/guides/change-app-grant-type-mgmt-api)
