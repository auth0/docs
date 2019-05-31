---
title: Add Roles to Groups
description: Learn how to add roles to groups for Auth0's API Authorization core feature using the Auth0 Management Dashboard.
topics:
  - authorization
  - dashboard
  - roles
  - groups
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Add Roles to Groups

This guide will show you how to add roles to [groups](/authorization/concepts/rbac) using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/groups/add-roles-groups). The groups and their roles can be used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

<%= include('../../../authorization/_includes/_predefine-groups') %>

<%= include('../../../authorization/_includes/_predefine-roles') %>

1. Navigate to the [Users & Roles > Groups](${manage_url}/#/groups) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the group to view.

![Click Group](/media/articles/authorization/role-list-added.png)

2. Click the **Roles** tab, then click **Add Roles**.

![Add Roles](/media/articles/authorization/role-def-empty-permissions.png)

3. Select the roles to add to the group, and click **Add Roles**.

![Add Roles to Groups](/media/articles/authorization/role-select-add-permissions.png)