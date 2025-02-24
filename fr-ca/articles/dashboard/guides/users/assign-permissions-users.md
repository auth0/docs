---
title: Assign Permissions to Users
description: Learn how to assign permissions to a user using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
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
# Assign Permissions to Users

This guide will show you how to assign [permissions](/authorization/concepts/rbac) to a user using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/users/assign-permissions-users). The assigned permissions can be used with the API Authorization Core feature set.

::: note
Adding permissions directly to a user circumvents the benefits of [role-based access control (RBAC)](/authorization/concepts/rbac) and is not typically recommended.
:::

<%= include('../../../authorization/_includes/_enable-authz-core') %>

<%= include('../../../authorization/_includes/_predefine-permissions') %>

1. Navigate to the [Users & Roles > Users](${manage_url}/#/users) page in the [Auth0 Dashboard](${manage_url}/). 

![View Users](/media/articles/authorization/user-list.png)

2. Click **`...`** next to the user you want to modify, and select **Assign Permissions**.

![Select Assign Permissions](/media/articles/authorization/user-list-assign-permissions.png)

3. Select the API from which you want to assign permissions, then select the permissions to assign to the user, and click **Add Permissions**.

![Assign Permissions](/media/articles/authorization/user-add-permissions.png)

You can also assign permissions to users from their individual profile page.

1. Navigate to the [Users & Roles > Users](${manage_url}/#/users) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the user to view.

![Select User](/media/articles/authorization/user-list.png)

2. Click the **Permissions** tab, and click **Assign Permissions**.

![View Roles](/media/articles/authorization/user-prof-empty-permissions.png)

3. Select the API from which you want to assign permissions, then select the permissions to assign to the user, and click **Add Permissions**.

![Assign Permissions](/media/articles/authorization/user-add-permissions.png)