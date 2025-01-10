---
title: Create Roles
description: Learn how to create a role using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - roles
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Create Roles

This guide will show you how to create <dfn data-key="role">[roles](/authorization/concepts/rbac)</dfn> using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/roles/create-roles). The roles can be used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

<%= include('../../../authorization/_includes/_predefine-permissions') %>

1. Navigate to the [Users & Roles > Roles](${manage_url}/#/roles) page in the [Auth0 Dashboard](${manage_url}/), and click **Create Role**.

![Click Create Role](/media/articles/authorization/role-list.png)

2. Name the role and add a description, then click **Create**.

![Add Role](/media/articles/authorization/role-name-role.png)

3. Click **Add Permissions**.

![Add Permissions](/media/articles/authorization/role-def-empty-permissions.png)

4. Select the API from which you want to add permissions, then select the permissions to add to the role, and click **Add Permissions**.

![Add Permissions to Roles](/media/articles/authorization/role-select-add-permissions.png)