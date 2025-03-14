---
title: Assign Roles to Users
description: Learn how to assign roles to a user using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - roles
  - users
  - user-profile
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Assign Roles to Users

This guide will show you how to assign <dfn data-key="role">[roles](/authorization/concepts/rbac)</dfn> to a user using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/users/assign-roles-users). The assigned roles can be used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

<%= include('../../../authorization/_includes/_predefine-roles') %>

1. Navigate to the [Users & Roles > Users](${manage_url}/#/users) page in the [Auth0 Dashboard](${manage_url}/). 

![View Users](/media/articles/authorization/user-list.png)

2. Click **`...`** next to the user you want to modify, and select **Assign Roles**.

![Select Assign Roles](/media/articles/authorization/user-list-assign-roles.png)

3. Choose the role(s) you wish to assign, then click **Assign**.

![Assign Role](/media/articles/authorization/user-assign-roles.png)


You can also assign roles to users from their individual profile page.

1. Navigate to the [Users & Roles > Users](${manage_url}/#/users) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the user to view.

![Select User](/media/articles/authorization/user-list.png)

2. Click the **Roles** view, and click **Assign Role**.

![View Roles](/media/articles/authorization/user-prof-empty-roles.png)

3. Choose the role you wish to assign, then click **Assign**.

![Assign Role](/media/articles/authorization/user-assign-roles.png)