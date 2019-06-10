---
title: View Group Users
description: Learn how to view users assigned to a group using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - permissions
  - groups
  - users
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# View Group Users

This guide will show you how to view the users assigned to a group using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/groups/view-group-users). Groups are used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

1. Navigate to the [Users & Roles > Groups](${manage_url}/#/groups) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the group to view.

![Select Group](/media/articles/dashboard/guides/group-list-added.png)

2. Click the **Users** view.

![View Users](/media/articles/dashboard/guides/group-def-users.png)

The following information is displayed for each user:

| **Attribute** | **Description** |
|---------------|-----------------|
| Picture | User's picture from the user profile. |
| Name | User's name from the user profile. |
| Email address | User's email address from the user profile. |