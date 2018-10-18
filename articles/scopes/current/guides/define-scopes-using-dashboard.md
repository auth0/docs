---
description: Learn how to define API scopes using the Auth0 Dashboard.
topics:
  - scopes
  - API
  - Dashboard
contentType:
  - how-to
useCase:
  - development
  - secure-api
---

# Define API Scopes Using the Auth0 Dashboard

To define [API scopes](/scopes/current/api-scopes) using the [Dashboard](${manage_url}/#/apis), select the API you want to edit, and open its **Scopes** tab.

Provide the following parameters:

| Parameter | Description |
| - | - |
| Name | The name of your scope |
| Description | A friendly description for your scope |

Click **Add** when you've provided the requested values.

![API Scopes](/media/articles/scopes/api-scopes.png)

::: warning
By default, any user of any application can ask for any scope defined here. You can implement access policies to [restrict requests for available scopes](/api-auth/guides/restrict-api-scopes) via [Rules](/rules).
:::

