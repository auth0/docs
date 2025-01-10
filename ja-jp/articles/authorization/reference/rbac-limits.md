---
title: Authorization Core Limits
description: Reference limits in place for the Authorization Core feature set.
topics:
  - authorization
contentType: 
    - reference
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Authorization Core RBAC Limits

The Authorization Core Role-Based Access Control (RBAC) feature set is subject to the following limits: 

| Feature | Limit |
|---------|-------|
| Roles per tenant | 1000 |
| Scopes per API | 1000 |
| Roles per user (directly assigned) | 50 |
| Permissions per user (directly assigned) | 1000 |
| Permissions per role (directly assigned)	| 1000 |

Note that limitations on permissions per user affect those assigned directly. Technically, a user could have more permissions than noted if the permissions were assigned to different roles and then the roles were assigned to the user.

## Keep reading

- [Role-Based Access Control in Auth0](/authorization#role-based-access-control-in-Auth0)
- [Role-Based Access Control (RBAC)](/authorization/concepts/rbac)
- [Authorization Core vs. Authorization Extension](/authorization/concepts/core-vs-extension)
- [How to Use Auth0's Core Authorization Feature Set](/authorization/guides/how-to)