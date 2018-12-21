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

This guide will show you how to define custom scopes for an API using Auth0's Dashboard.


1. Navigate to the [APIs](${manage_url}/#/apis) section of the dashboard, and select the API you want to edit.

2. Click the **Scopes** tab.

3. Provide the following values for your custom scope:

| Parameter   | Description |
| ----------- | ----------- |
| Name        | The name of your scope. |
| Description | A friendly description for your scope. |

2. Click **Add**.

![API Scopes](/media/articles/scopes/api-scopes.png)
