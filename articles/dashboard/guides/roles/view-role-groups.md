---
title: View Role Groups
description: Learn how to view groups assigned to a role using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - roles
  - groups
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# View Role Groups

This guide will show you how to view the [groups](/authorization/concepts/rbac) assigned to a role using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/roles/view-role-groups). Groups and roles are used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

1. Navigate to the [Users & Roles > Roles](${manage_url}/#/roles) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the role to view.

![Select Role](/media/articles/authorization/role-list.png)

2. Click the **Groups** view.

![View Group](/media/articles/authorization/role-def-groups.png)

The following information is displayed for each group:

| **Column** | **Description** |
|----------------|-----------------|
| Name | Name of the group from the group definition. |
| Connection | Name of the connection to which the group belongs. |