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

This guide will show you how to enable [role-based access control (RBAC)](/authorization/concepts/rbac) using Auth0's Dashboard. This effectively enables the API Authorization Core feature set.

1. Navigate to the [APIs](${manage_url}/#/apis) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the API to view.

![View APIs](/media/articles/authorization/api-list.png)

2. Scroll to **Access Settings** and enable the **Enforce Authorization Policies** toggle.

![View APIs](/media/articles/authorization/api-setting-toggle-rbac.png)

3. Scroll up to the **Token Dialect** setting, select your setting, and click **Save**.

![View APIs](/media/articles/authorization/api-setting-token-dialect.png)

Available options include:

| Value | Description |
|-------|-------------|
| OAuth2 | Includes only requested permissions in the Access Token. |
| OAuth2 with Authorization | Includes all permissions for a user in the Access Token. Allows you to make minimal calls to retrieve permissions, but increases token size. |
