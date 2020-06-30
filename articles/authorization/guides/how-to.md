---
description: Learn to use Auth0's API Authorization features using the Management Dashboard.
topics:
  - authorization
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# How to Use Auth0's Core Authorization Feature Set

The core Authorization features of Auth0 allow for [role-based access control (RBAC)](/authorization/concepts/rbac) of your APIs.

<%= include('../../_includes/_rbac_vs_extensions') %>

<%= include('../_includes/_enable-authz-core') %>

To use the core functionality most efficiently, you should do the following:

1. [Register API with Auth0](/getting-started/set-up-api)
2. [Define permissions for API](/dashboard/guides/apis/add-permissions-apis)
3. [Create roles](/dashboard/guides/roles/create-roles)
4. [Assign roles to users](/dashboard/guides/users/assign-roles-users)
5. [Assign permissions to users](/dashboard/guides/users/assign-permissions-users), if needed.

## Keep reading
- [Manage Roles](/authorization/guides/manage-roles)
- [Manage Role-Based Access Control Users](/authorization/guides/manage-users)
- [Manage Role-Based Access Control Permissions](/authorization/guides/manage-permissions)
- [Enable Role-Based Access Control (RBAC) for APIs](/dashboard/guides/apis/enable-rbac)
- [Troubleshooting: Role-Based Access Control and Authorization](/authorization/concepts/troubleshooting)


