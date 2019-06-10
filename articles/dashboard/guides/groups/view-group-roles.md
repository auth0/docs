---
title: View Group Roles
description: Learn how to view roles added to a group using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - permissions
  - roles
  - groups
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# View Group Roles

This guide will show you how to view the [roles](/authorization/concepts/rbac) added to a group using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/groups/view-group-roles). The roles and groups are used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

1. Navigate to the [Users & Roles > Groups](${manage_url}/#/groups) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the group to view.

![Select Group](/media/articles/dashboard/guides/group-list-added.png)

2. Click the **Roles** view.

![View Roles](/media/articles/dashboard/guides/group-def-roles.png)

The following information is displayed for each role:

| **Column** | **Description** |
|----------------|-----------------|
| Name | Name of the role from the role definition. |
| Description | Description of the role from the role definition. |