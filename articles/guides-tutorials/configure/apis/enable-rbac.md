---
title: Enable Role-Based Access Control for APIs
description: Learn how to enable role-based access control (RBAC) for an API using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - roles
  - rbac
  - apis
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Enable Role-Based Access Control for APIs

This guide will show you how to enable [role-based access control (RBAC)](/authorization/concepts/rbac) using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/apis/enable-rbac). This effectively enables the API Authorization Core feature set.

1. Navigate to the [APIs](${manage_url}/#/apis) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the API to view.

![View APIs](/media/articles/authorization/api-list.png)

2. Scroll to **RBAC Settings** and enable the **Enable RBAC** toggle.

![View APIs](/media/articles/authorization/api-settings-rbac.png)

3. If you want to include all permissions assigned to the user in the `permissions` claim of the Access Token, enable the **Add Permissions in the Access Token** toggle, and click **Save**.

::: note
Including permissions in the Access Token allows you to make minimal calls to retrieve permissions, but increases token size. As long as RBAC is enabled, the `scope` claim of the Access Token includes an intersection of the requested permissions and the permissions assigned to the user, regardless of whether permissions are also included in the Access Token.

When RBAC is disabled, default behavior is observed; an application can request any permission defined for the API, and the `scope` claim will include all requested permissions.
:::

::: warning
Remember that any configured [rules](/authorization/concepts/authz-rules) run _after_ the RBAC-based authorization decisions are made, so they may override default behavior.
:::
