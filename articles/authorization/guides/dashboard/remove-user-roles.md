---
description: Learn how to remove roles assigned to a user using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - permissions
  - roles
  - users
  - user-profile
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Remove Roles Assigned to Users

This guide will show you how to remove the [roles](/authorization/concepts/rbac) assigned to a user using Auth0's Dashboard. This task can also be performed [using the Management API](/authorization/guides/api/remove-user-roles). The assigned roles are used with the API Authorization Core feature set.

<%= include('../_includes/_enable-authz-core') %>

1. Navigate to the [Users & Roles > Users](${manage_url}/#/users) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the user to view.

![Select User](/media/articles/authorization/user-list.png)

2. Click the **Roles** view, then click the trashcan icon next to the role you want to remove.

![Remove Roles](/media/articles/authorization/user-prof-roles.png)
