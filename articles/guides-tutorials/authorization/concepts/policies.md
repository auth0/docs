---
description: Understand the concept of authorization policies and how they apply in Auth0.
toc: true
topics:
  - authorization
  - rbac
  - roles
  - permissions
  - policies
contentType: 
    - concept
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Authorization Policies

Behind the scenes, [role-based authorization](/authorization/concepts/rbac) uses a pre-configured authorization policy, which contains conditions that allow code to evaluate whether a user should be permitted to access a protected API.

The authorization policy determines:

* how to define and organize the users or <dfn data-key="role">roles</dfn> that are affected by the policy
* what logic and conditions apply to the policy and whether their outcome permits or denies access

When using Auth0's core authorization and [role-based access control (RBAC)](/authorization/concepts/rbac), the policy includes evaluating the roles and permissions assigned to users. To use these features, you must [enable role-based access control for APIs](/dashboard/guides/apis/enable-rbac). 

You can further customize the authorization policy by using [rules](/rules). To learn how, see [Rules for Authorization Policies](/authorization/concepts/authz-rules).

## Keep reading

- [Role-Based Access Control (RBAC)](/authorization/concepts/rbac)
- [Rules for Authorization Policies](/authorization/concepts/authz-rules)
- [Sample Use Cases: Role-Based Access Control](/authorization/concepts/sample-use-cases-rbac)
- [Sample Use Cases: Rules with Authorization](/authorization/concepts/sample-use-cases-rules)
- [How to Use Auth0's Core Authorization Feature Set](/authorization/guides/how-to)
- [Troubleshooting: Role-Based Access Control and Authorization](/authorization/concepts/troubleshooting)


