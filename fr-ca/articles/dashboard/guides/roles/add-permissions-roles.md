---
title: Add Permissions to Roles
description: Learn how to add permissions to roles for Auth0's API Authorization Core feature using the Auth0 Management Dashboard.
topics:
  - authorization
  - dashboard
  - roles
  - permissions
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Add Permissions to Roles

This guide will show you how to add permissions to <dfn data-key="role">[roles](/authorization/concepts/rbac)</dfn> using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/roles/add-permissions-roles). The roles and their permissions can be used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

<%= include('../../../authorization/_includes/_predefine-roles') %>
<%= include('../../../authorization/_includes/_predefine-permissions') %>

1. Navigate to the [Users & Roles > Roles](${manage_url}/#/roles) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the role to view.

![Click Create Role](/media/articles/authorization/role-list-added.png)

2. Click the **Permissions** tab, then click **Add Permissions**.

![Add Permissions](/media/articles/authorization/role-def-empty-permissions.png)

3. Select the API from which you want to assign permissions, then select the permissions to add to the role, and click **Add Permissions**.

![Add Permissions to Roles](/media/articles/authorization/role-select-add-permissions.png)