---
title: Delete Roles
description: Learn how to delete a role using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
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
# Delete Roles

This guide will show you how to delete a <dfn data-key="role">[role](/authorization/concepts/rbac)</dfn> using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/roles/delete-roles). Roles are used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

1. Navigate to the [Users & Roles > Roles](${manage_url}/#/roles) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the Role to view.

![Select Role](/media/articles/authorization/role-list.png)

2. Click **Remove this Role**, and confirm.

![Delete Role](/media/articles/authorization/role-def-settings.png)