---
title: View User Permissions
description: Learn how to view permissions assigned to a user using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
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
# View User Permissions

This guide will show you how to view the [permissions](/authorization/concepts/rbac) assigned to a user using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/users/view-user-permissions). The assigned permissions are used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

1. Navigate to the [Users & Roles > Users](${manage_url}/#/users) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the user to view.

![Select User](/media/articles/authorization/user-list.png)

2. Click the **Permissions** view.

![View Permissions](/media/articles/authorization/user-prof-permissions.png)

The following information is displayed for each permission:

| **Column** | **Description** |
|------------|-----------------|
| Name | Name of the permission from the permission definition. |
| Description | Description of the permission from the permission definition. |
| API | Name of the API to which the permission is attached. |
| Assignment | Indicates whether the permission is directly assigned to the user or is assigned via a <dfn data-key="role">role</dfn>. |
