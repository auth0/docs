---
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

This guide will show you how to enable [role-based access control (RBAC)](/authorization/concepts/rbac) using Auth0's Dashboard. This task can also be performed [using the Management API](/authorization/guides/api/enable-rbac). This effectively enables the API Authorization Core feature set.

1. Navigate to the [APIs](${manage_url}/#/apis) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the API to view.

![View APIs](/media/articles/authorization/api-list.png)

2. Scroll to **Access Settings** and enable the **Enable RBAC** toggle.

![View APIs](/media/articles/authorization/api-setting-toggle-rbac.png)

3. Scroll to the **Token Dialect** setting, select your setting, and click **Save**.

![View APIs](/media/articles/authorization/api-setting-token-dialect.png)

Available options include:

| Value | Description |
|-------|-------------|
| OAuth2 with Scope | In the `scope` claim of the Access Token, includes an intersection of the requested permissions and the permissions assigned to the user. No `permissions` claim is passed. |
| OAuth2 with Permissions | In the `scope` claim of the Access Token, includes an intersection of the requested permissions and the permissions assigned to the user. In the `permissions` claim of the Access Token, includes all permissions assigned to the user. Allows you to make minimal calls to retrieve permissions, but increases token size. |

When RBAC is disabled, default behavior is observed; an application can request any permission defined for the API, and the `scope` claim will include all requested permissions.

::: warning
Remember that any configured [rules](/authorization/concepts/authz-rules) run _after_ the RBAC-based authorization decisions are made, so they may override default behavior.
:::
