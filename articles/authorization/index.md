---
description: Understand the concept of Authorization using Auth0.
toc: true
topics:
  - authorization
contentType: 
    - index
    - concept
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Authorization

Authorization refers to the process of verifying what you have access to. While often used interchangeably with [authentication](/authentication-auth), authorization represents a fundamentally different function. 

In authorization, a user or application is granted access to an API (or other resource) after the API determines the extent of the [permissions](/authorization/concepts/permissions) that it should assign. Usually, authorization occurs after identity is successfully validated through authentication so that the API has some idea of what sort of access it should grant. For a comparison of authorization and authentication, see [Authentication and Authorization](/authorization/concepts/authz-and-authn).

Authorization can be determined through the use of [policies](/authorization/concepts/policies) and [rules](/authorization/concepts/authz-rules) used with [roles-based access control (RBAC)](/authorization/concepts/rbac). Regardless of whether RBAC is used, requested access is transmitted to the API via [scopes](/scopes) contained in [Access Tokens](/tokens/overview-access-tokens).

# Roles-based access control in Auth0

Auth0 currently provides two way of implementing role-based access control (RBAC)--the Authorization core feature set and the Authorization Extension. For a comparison, see [Authorization Core vs. Authorization Extension](/authorization/concepts/core-vs-extension).

## Keep reading
- How to manage roles
- How to manage permissions
- How to add a permission to a role
