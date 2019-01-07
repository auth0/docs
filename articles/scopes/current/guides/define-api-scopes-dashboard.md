---
title: How to Define Permissions for an API Using the Auth0 Dashboard
description: Learn how to define custom permissions (scopes) for your API using the Auth0 Dashboard.
topics:
  - scopes
  - permissions
contentType:
  - how-to
useCase:
  - development
  - secure-api
---
# How to Define Permissions for an API Using the Auth0 Dashboard

::: warning
By default, any user of any application can ask for any permission defined here. You can implement access policies to limit this behavior via [Rules](/rules).
:::

This guide will show you how to define custom permission levels for an API using Auth0's Dashboard.


1. Navigate to the [APIs](${manage_url}/#/apis) section of the Dashboard, and select the API you want to edit.

2. Click the **Scopes** (or **Permissions**) tab and provide the following values for your custom permission level:

| Parameter   | Description |
| ----------- | ----------- |
| Name        | The name of your permission level. |
| Description | A friendly description for your permission level. |

![API Permissions](/media/articles/scopes/api-scopes.png)

3. Click **Add**.


## Keep reading

- [How to Customize the Consent Prompt](/scopes/current/guides/customize-consent-prompt)
- [How to Represent Multiple APIs Using a Proxy API in Auth0](/api-auth/tutorials/represent-multiple-apis)
