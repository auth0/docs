---
title: Assign Users to Groups
description: Learn how to assign users to groups for Auth0's API Authorization core feature using the Auth0 Management Dashboard.
topics:
  - authorization
  - dashboard
  - groups
  - users
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Assign Users to Groups

This guide will show you how to add permissions to [groups](/authorization/concepts/rbac) using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/roles/add-permissions-groups). The groups and their permissions can be used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

<%= include('../../../authorization/_includes/_predefine-groups') %>

<%= include('../../../authorization/_includes/_predefine-permissions') %>

1. Navigate to the [Users & Roles > Groups](${manage_url}/#/groups) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the group to view.

![Click Create Group](/media/articles/authorization/role-list-added.png)

2. Click the **Permissions** tab, then click **Add Permissions**.

![Add Permissions](/media/articles/authorization/role-def-empty-permissions.png)

3. Select the API from which you want to assign permissions, then select the permissions to add to the group, and click **Add Permissions**.

![Add Permissions to Group](/media/articles/authorization/role-select-add-permissions.png)