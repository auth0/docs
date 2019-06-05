---
title: Create Groups
description: Learn how to create a group using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - groups
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Create Groups

This guide will show you how to create [groups](/authorization/concepts/rbac) using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/groups/create-groups). The groups can be used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

<%= include('../../../authorization/_includes/_predefine-roles') %>

1. Navigate to the [Users & Roles > Groups](${manage_url}/#/groups) page in the [Auth0 Dashboard](${manage_url}/), and click **Create Group**.

![Click Create Group](/media/articles/authorization/role-list.png)

2. Name the group and add a description, then click **Create**.

![Add Group](/media/articles/authorization/role-name-role.png)

3. Click **Add Roles**.

![Add Roles](/media/articles/authorization/role-def-empty-permissions.png)

4. Select the API from which you want to add permissions, then select the permissions to add to the group, and click **Add Permissions**.

![Add Permissions to Roles](/media/articles/authorization/role-select-add-permissions.png)