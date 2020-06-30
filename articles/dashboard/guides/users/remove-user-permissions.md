---
title: Remove Permissions from Users
description: Learn how to remove permissions directly assigned to a user using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - permissions
  - users
  - user-profile
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Remove Permissions from Users

This guide will show you how to remove the [permissions](/authorization/concepts/rbac) directly assigned to a user using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/users/remove-user-permissions). The assigned permissions are used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

1. Navigate to the [Users & Roles > Users](${manage_url}/#/users) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the user to view.

![Select User](/media/articles/authorization/user-list.png)

2. Click the **Permissions** view, then click the trashcan icon next to the permission you want to remove, and confirm.

![Remove Permissions](/media/articles/authorization/user-prof-permissions.png)
