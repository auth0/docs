---
title: View Role Users
description: Learn how to view users assigned to a role using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - permissions
  - roles
  - users
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# View Role Users

This guide will show you how to view the users assigned to a <dfn data-key="role">[role](/authorization/concepts/rbac)</dfn> using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/roles/view-role-users). Roles are used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

1. Navigate to the [Users & Roles > Roles](${manage_url}/#/roles) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the role to view.

![Select Role](/media/articles/authorization/role-list.png)

2. Click the **Users** view.

![View Users](/media/articles/authorization/role-def-users.png)

The following information is displayed for each user:

| **Attribute** | **Description** |
|---------------|-----------------|
| Picture | User's picture from the user profile. |
| Name | User's name from the user profile. |
| Email address | User's email address from the user profile. |