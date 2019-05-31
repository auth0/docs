---
title: Remove Users from Groups
description: Learn how to remove users assigned to a group using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - permissions
  - groups
  - users
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Remove Users from Groups

This guide will show you how to remove the users assigned to a group using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/groups/remove-group-users). Groups are used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

1. Navigate to the [Users & Roles > Groups](${manage_url}/#/groups) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the group to view.

![Select Group](/media/articles/authorization/role-list.png)

2. Click the **Users** tab, then click the trashcan icon next to the user you want to remove, and confirm.

![View Users](/media/articles/authorization/role-def-users.png)
