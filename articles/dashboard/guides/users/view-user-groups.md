---
title: View User Groups
description: Learn how to view groups assigned to a user using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - users
  - user-profile
  - groups
contentType: 
  - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# View User Groups

This guide will show you how to view the [groups](/authorization/concepts/rbac) assigned to a user using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/users/view-user-groups). Groups are used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

1. Navigate to the [Users & Roles > Users](${manage_url}/#/users) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the user to view.

![Select User](/media/articles/authorization/user-list.png)

2. Click the **Users** view.

![View Users](/media/articles/authorization/user-prof-groups.png)

The following information is displayed for each group:

| **Column** | **Description** |
|------------|-----------------|
| Name | Name of the group from the group definition. |
| Description | Description of the group from the group definition. |
