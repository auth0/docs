---
description: Learn how to add permissions to APIs using the Auth0 Management Dashboard.
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
# Add API Permissions

This guide will show you how to add permissions to an API using Auth0's Dashboard. This task can also be performed [using the Management API](/authorization/guides/api/update-permissions-apis). 

1. Navigate to the [APIs](${manage_url}/#/apis) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the API to view.

![View APIs](/media/articles/authorization/api-list.png)

2. Click the **Permissions** tab, enter a permission name and description for the permission you want to add, and click **Add**.

![Delete Permissions](/media/articles/authorization/api-def-permissions.png)

## Keep reading

- [How to Customize the Consent Prompt](/scopes/current/guides/customize-consent-prompt)
- [How to Represent Multiple APIs Using a Single Logical API in Auth0](/api-auth/tutorials/represent-multiple-apis)
- [Role-Based Access Control (RBAC)](/authorization/concepts/rbac)
- [Enable Role-Based Access Control for APIs](/authorization/guides/dashboard/enable-rbac)