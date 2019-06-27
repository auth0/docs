---
description: Understand the concept of Authorization using Auth0.
toc: true
topics:
  - authorization
  - access-control
contentType: 
    - index
    - concept
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Authorization

Authorization refers to the process of verifying what a user has access to. While often used interchangeably with [authentication](/authentication-auth/current), authorization represents a fundamentally different function. 

In authorization, a user or application is granted access to an API after the API determines the extent of the permissions that it should assign. Usually, authorization occurs after identity is successfully validated through authentication so that the API has some idea of what sort of access it should grant. For a comparison of authorization and authentication, see [Authentication and Authorization](/authorization/concepts/authz-and-authn).

Authorization can be determined through the use of [policies](/authorization/concepts/policies) and [rules](/authorization/concepts/authz-rules), which can be used with [role-based access control (RBAC)](/authorization/concepts/rbac). Regardless of whether RBAC is used, requested access is transmitted to the API via <dfn data-key="scope">scopes</dfn> and granted access is returned in the issued <dfn data-key="access-token">Access Tokens</dfn>.

Since only the API can know all of the possible actions that it can handle, it should have its own internal access control system in which it defines its own permissions. To determine a calling application's effective permissions, an API should combine incoming scopes with the permissions assigned within its own internal access control system and make access control decisions accordingly.

## Access Control in Auth0

Currently, we provide two ways of implementing [role-based access control (RBAC)](/authorization/concepts/rbac), which you can use in place of or in combination with your API's own internal access control system:

* [Authorization Core feature set](/authorization/guides/how-to)
* [Authorization Extension](/extensions/authorization-extension)

We are expanding our Authorization core feature set to match the functionality of the Authorization Extension. Our new core RBAC implementation improves performance and scalability and will eventually provide a more flexible RBAC system than the Authorization Extension.

For now, both implement the key features of RBAC and allow you to restrict the custom scopes defined for an API to those that have been assigned to the user as permissions. For a comparison, see [Authorization Core vs. Authorization Extension](/authorization/concepts/core-vs-extension).

## Keep reading

- [Role-Based Access Control (RBAC)](/authorization/concepts/rbac)
- [Authorization Policies](/authorization/concepts/policies)
- [Sample Use Cases: Role-Based Access Control](/authorization/concepts/sample-use-cases-rbac)
- [Sample Use Cases: Rules with Authorization](/authorization/concepts/sample-use-cases-rules)
- [How to Use Auth0's Core Authorization Feature Set](/authorization/guides/how-to)
- [Authorization Core vs. Authorization Extension](/authorization/concepts/core-vs-extension)
- [Authorization Extension](/extensions/authorization-extension)
- [Troubleshooting: Role-Based Access Control and Authorization](/authorization/concepts/troubleshooting)
