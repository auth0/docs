---
title: Remove Permissions from Groups
description: Learn how to remove permissions added to a group using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - permissions
  - groups
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Remove Permissions from Groups

This guide will show you how to remove the [permissions](/authorization/concepts/rbac) assigned to a group using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/groups/remove-group-permissions). The assigned permissions and groups are used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

1. Navigate to the [Users & Roles > Groups](${manage_url}/#/groups) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the group to view.

![Select Group](/media/articles/authorization/role-list.png)

2. Click the **Permissions** view, then click the trashcan icon next to the permission you want to remove, and confirm.

![Remove Permissions](/media/articles/authorization/role-def-permissions.png)
