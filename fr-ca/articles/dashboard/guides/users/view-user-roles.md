---
title: View User Roles
description: Learn how to view roles assigned to a user using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - permissions
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
# View User Roles

This guide will show you how to view the <dfn data-key="role">[roles](/authorization/concepts/rbac)</dfn> assigned to a user using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/users/view-user-roles). The assigned roles are used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

1. Navigate to the [Users & Roles > Users](${manage_url}/#/users) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the user to view.

![Select User](/media/articles/authorization/user-list.png)

2. Click the **Roles** view.

![View Roles](/media/articles/authorization/user-prof-roles.png)

The following information is displayed for each role:

| **Column** | **Description** |
|------------|-----------------|
| Name | Name of the role from the role definition. |
| Description | Description of the role from the role definition. |
