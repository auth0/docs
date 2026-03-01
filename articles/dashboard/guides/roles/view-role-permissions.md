---
title: View Role Permissions
description: Learn how to view permissions added to a role using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - permissions
  - roles
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# View Role Permissions

This guide will show you how to view the [permissions](/authorization/concepts/rbac) added to a <dfn data-key="role">role</dfn> using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/roles/view-role-permissions). The assigned permissions and roles are used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

1. Navigate to the [Users & Roles > Roles](${manage_url}/#/roles) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the role to view.

![Select Role](/media/articles/authorization/role-list.png)

2. Click the **Permissions** view.

![View Permissions](/media/articles/authorization/role-def-permissions.png)

The following information is displayed for each permission:

| **Column** | **Description** |
|----------------|-----------------|
| Name | Name of the permission from the permission definition. |
| Description | Description of the permission from the permission definition. |
| API | Name of the API to which the permission is attached. |