---
title: Assign Users to Groups
description: Learn how to assign users to groups using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - groups
  - users
  - user-profile
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Assign Users to Groups

This guide will show you how to assign users to [groups](/authorization/concepts/rbac) using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/groups/assign-group-users). Groups can be used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

<%= include('../../../authorization/_includes/_predefine-groups') %>

<%= include('../../../../authorization/_includes/_view-limits') %>

1. Navigate to the [Users & Roles > Groups](${manage_url}/#/groups) page in the [Auth0 Dashboard](${manage_url}/). 

![View Groups](/media/articles/dashboard/guides/group-list-added.png)

2. Click the **Users** tab, then click **Add Users**.

![Assign Users](/media/articles/dashboard/guides/group-def-users-empty.png)

3. Select the users to assign to the group, and click **Assign**.

![Add Users to Groups](/media/articles/dashboard/guides/group-select-users.png)