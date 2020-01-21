---
description: Explore solutions to common issues experienced when implementing role-based access control (RBAC) using the Authorization Core feature set.
topics:
  - authorization
  - rbac
  - roles
  - permissions
  - policies
  - troubleshooting
contentType: 
    - concept
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Troubleshoot Role-Based Access Control and Authorization

Here are some solutions to common issues experienced when implementing [role-based access control (RBAC)](/authorization/concepts/rbac) using the Authorization Core feature set.

## Role-based access control is enabled for my API, but the scopes claim is not showing what [you say it should](/dashboard/guides/apis/enable-rbac). 

Make sure that you aren't setting `accessToken.scope` in a [rule]. Remember that any configured [authorization rules](/authorization/concepts/authz-rules) run _after_ the RBAC-based authorization decisions are made, so they may override default behavior.

## Keep reading

- [Sample Use Cases: Role-Based Access Control](/authorization/concepts/sample-use-cases-rbac)
- [Sample Use Cases: Rules with Authorization](/authorization/concepts/sample-use-cases-rules)