---
description: Learn how to manage permissions in a role-based access control (RBAC) system using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
  - rbac
  - scopes
  - permissions
  - roles
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Manage Role-Based Access Control Permissions

This guide will show you how to manage permissions in a  [role-based access control (RBAC)](/authorization/concepts/rbac) system using Auth0's Dashboard. These permissions are used with the API Authorization Core feature set.

<%= include('../../_includes/_rbac_vs_extensions') %>

<%= include('../_includes/_enable-authz-core') %>

We provide various functions to help you manage your permissions, which you can access through either the Auth0 Dashboard or the Auth0 Management API.

Using the Dashboard, you can:

- [Define permissions for APIs](/dashboard/guides/apis/add-permissions-apis)
- [Delete permissions from APIs](/dashboard/guides/apis/delete-permissions-apis)
- [Add permissions to roles](/dashboard/guides/roles/add-permissions-roles)
- [Assign permissions to users](/dashboard/guides/users/assign-permissions-users)
- [View role permissions](/dashboard/guides/roles/view-role-permissions)
- [View user permissions](/dashboard/guides/users/view-user-permissions)
- [Remove role permissions](/dashboard/guides/roles/remove-role-permissions)
- [Remove user permissions](/dashboard/guides/users/remove-user-permissions)

Using the Management API, you can:

- [Update permissions for APIs](/api/management/guides/apis/update-permissions-apis)
- [Add permissions to roles](/api/management/guides/roles/add-permissions-roles)
- [Assign permissions to users](/api/management/guides/users/assign-permissions-users)
- [View role permissions](/api/management/guides/roles/view-role-permissions)
- [View user permissions](/api/management/guides/users/view-user-permissions)
- [Remove permissions from roles](/api/management/guides/roles/remove-role-permissions)
- [Remove permissions from users](/api/management/guides/users/remove-user-permissions)

## Keep reading

- [Role-Based Access Control (RBAC)](/authorization/concepts/rbac)
- [Create Roles](/dashboard/guides/roles/create-roles)
- [Register APIs with Auth0](/architecture-scenarios/mobile-api/part-2#create-the-api)
- [Troubleshooting: Role-Based Access Control and Authorization](/authorization/concepts/troubleshooting)
