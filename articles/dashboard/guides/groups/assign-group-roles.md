---
title: Assign Roles to Groups
description: Learn how to assign roles to groups for Auth0's API Authorization core feature using the Auth0 Management Dashboard.
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
# Assign Roles to Groups

This guide will show you how to assign roles to [groups](/authorization/concepts/rbac) using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/groups/assign-groups-roles). The groups and their roles can be used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

<%= include('../../../authorization/_includes/_predefine-groups') %>

<%= include('../../../authorization/_includes/_predefine-roles') %>

<%= include('../../../authorization/_includes/_view-limits') %>

1. Navigate to the [Users & Roles > Groups](${manage_url}/#/groups) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the group to view.

![Click Group](/media/articles/dashboard/guides/group-list-added.png)

2. Click the **Roles** tab, then click **Assign Roles**.

![Assign Roles](/media/articles/dashboard/guides/group-def-roles-empty.png)

3. Select the roles to assign to the group, and click **Assign**.

![Add Roles to Groups](/media/articles/dashboard/guides/group-select-roles.png)