---
title: Remove Users from Roles
description: Learn how to remove users assigned to a role using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - permissions
  - roles
  - users
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Remove Users from Roles

This guide will show you how to remove the users assigned to a <dfn data-key="role">[role](/authorization/concepts/rbac)</dfn> using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/roles/remove-role-users). Roles are used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

1. Navigate to the [Users & Roles > Roles](${manage_url}/#/roles) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the role to view.

![Select Role](/media/articles/authorization/role-list.png)

2. Click the **Users** tab, then click the trashcan icon next to the user you want to remove, and confirm.

![View Users](/media/articles/authorization/role-def-users.png)
