---
description: Learn how to delete permissions for APIs using the Auth0 Management Dashboard.
topics:
  - authorization
  - dashboard
  - RBAC
  - scopes
  - permissions
contentType:
  - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Delete API Permissions

::: warning
By default, any user of any application can ask for any permission defined here. You can implement access policies to limit this behavior via [Rules](/rules).
:::

This guide will show you how to delete permissions for an API using Auth0's Dashboard.

1. Navigate to the [APIs](${manage_url}/#/apis) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the API to view.

![View APIs](/media/articles/authorization/api-list.png)

2. Click the **Permissions** tab, then click the trashcan icon next to the user you want to remove, and confirm.

![Delete Permissions](/media/articles/authorization/api-def-permissions.png)

## Keep reading

- [How to Customize the Consent Prompt](/scopes/current/guides/customize-consent-prompt)
- [How to Represent Multiple APIs Using a Single Logical API in Auth0](/api-auth/tutorials/represent-multiple-apis)
- [Role-Based Access Control (RBAC)](/authorization/concepts/rbac)
- [Enable Role-Based Access Control for APIs](/authorization/guides/enable-rbac)