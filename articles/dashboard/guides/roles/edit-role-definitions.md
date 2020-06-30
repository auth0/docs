---
title: Edit Role Definitions
description: Learn how to edit a role definition using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
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
# Edit Role Definitions

This guide will show you how to edit a <dfn data-key="role">[role](/authorization/concepts/rbac)</dfn> definition using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/roles/edit-role-definitions). Roles are used with the API Authorization Core feature set.

<%= include('../../../authorization/_includes/_enable-authz-core') %>

1. Navigate to the [Users & Roles > Roles](${manage_url}/#/roles) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the role to view.

![Select Role](/media/articles/authorization/role-list.png)

2. Edit the role name and description, then click **Update Role**.

![Edit Role Definition](/media/articles/authorization/role-def-settings.png)