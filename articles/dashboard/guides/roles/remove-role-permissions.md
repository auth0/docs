---
title: Remove Permissions from Roles
description: Learn how to remove permissions added to a role using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - permissions
  - roles
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Remove Permissions from Roles

This guide will show you how to remove the [permissions](/authorization/concepts/rbac) assigned to a <dfn data-key="role">role</dfn> using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/roles/remove-role-permissions). The assigned permissions and roles are used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

1. Navigate to the [Users & Roles > Roles](${manage_url}/#/roles) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the role to view.

![Select Role](/media/articles/authorization/role-list.png)

2. Click the **Permissions** view, then click the trashcan icon next to the permission you want to remove, and confirm.

![Remove Permissions](/media/articles/authorization/role-def-permissions.png)
