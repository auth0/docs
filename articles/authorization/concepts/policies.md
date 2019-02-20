---
description: Understand the concept of authorization policies and how they apply in Auth0.
beta: true
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

Behind the scenes, [role-based authorization](/authorization/concepts/rbac) uses a pre-configured authorization policy, which contains conditions that allow code to evaluate whether a user should be permitted to access a protected resource.

The authorization policy determines:

* How to define and organize the users or roles that are affected by the policy
* What logic and conditions apply to the policy and whether their outcome permits or denies access

To use Auth0's core authorization feature and role-based access control, you must [enable the Authorization policies flag](/authorization/guides/enable-authz-policies.md).

## Keep reading

* Learn to [create authorization rules]() to use with the pre-configured authorization policy


