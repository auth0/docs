---
title: Define Scopes for an API Using the Auth0 Dashboard
description: Learn how to define custom scopes for your API using the Auth0 Dashboard.
topics:
  - scopes
contentType:
  - how-to
useCase:
  - development
  - secure-api
---
# Define Scopes for an API Using the Auth0 Dashboard

::: warning
By default, any user of any application can ask for any scope defined here. You can implement access policies to limit this behavior via [Rules](/rules).
:::

You can define API scopes using the [Dashboard](${manage_url}/#/apis). Select the API you want to edit, and open up its **Scopes** tab.

Provide the following parameters:

| Parameter | Description |
| - | - |
| Name | The name of your scope |
| Description | A friendly description for your scope |

Click **Add** when you've provided the requested values.

![API Scopes](/media/articles/scopes/api-scopes.png)
