---
description: Understand the differences between Auth0's core RBAC release and the Authorization Extension.
toc: true
topics:
  - authorization
  - authorization-extension
  - rbac
  - roles
  - permissions
  - policies
  - rules
  - extensions
  - access-control
contentType: 
    - concept
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Authorization Core vs. Authorization Extension

Auth0 currently provides two ways of implementing [role-based access control (RBAC)](/authorization/concepts/rbac): our Core implementation, which is currently being released, and our Authorization Extension, which will eventually be deprecated. Our Core implementation improves performance and scalability and will eventually provide a more flexible RBAC system than the Authorization Extension.

While we recommend using the RBAC features present in the Authorization Core, we recognize that some implementations may require use of the Authorization Extension until Authorization Core features match its full functionality. To help you decide which feature is right for your implementation, we present the differences between the two:

| Feature | Authorization&nbsp;Core | Authorization&nbsp;Extension |
|---------|-------------------------|------------------------------|
| **<dfn data-key="role">Roles</dfn>** |
| Create/edit/delete roles | Yes | Yes |
| Search roles by name | In future release | Yes |
| Roles can contain permissions from one or more APIs | Yes | No |
| Roles can be assigned to groups | Yes | Yes |
| Roles are attached to specific applications | No | Yes |
| Roles can contain permissions from any API | Yes | No |
| Roles can be nested and are hierarchical | In future release | No |
| Roles can be assigned across multiple tenants | To be determined | No |
| View permissions by role | Yes | Yes |
| View users by role | Yes | Yes |
| **Users** |
| Create/edit/delete users | Yes | Yes |
| Search users by user, email, connection | Yes | Yes |
| Search users by identity provider, login count, last login, phone number | Yes | No |
| Search users using lucene syntax | Yes | No |
| Users can be assigned to roles | Yes&nbsp;([See&nbsp;limits](/authorization/concepts/authz-limits)) | Yes |
| Users can be assigned to groups | Yes | Yes |
| View roles by user | Yes | Yes |
| View permissions by user | Yes | Yes |
| Automatic sync between user permissions and user profile | In future release | No |
| **Permissions** |
| Create/edit/delete permissions | Yes | Yes |
| Search permissions by name, description | In future release | Yes |
| Permissions can be assigned directly to users | Yes | No |
| Permissions can be assigned directly to roles | Yes | Yes |
| Permissions are attached to applications | No | Yes |
| Permissions are attached to APIs | Yes | No |
| View users by permission | In future release | No |
| View roles by permission | In future release | No |
| **Groups** |
| Create/edit/delete groups | Yes | Yes |
| Search groups by name, connection | Yes | Yes |
| Groups can be sourced from local users | Yes | Yes |
| Groups can be sources from third-party directories (for example, AD, LDAP, SAML) | Yes | No |
| Groups can be nested and are hierarchical | In future release | Yes |
| Groups can be mapped from pre-existing groups and connections | Yes | Yes |
| Groups can contain any roles | Yes | Yes |
| View nested groups by group | In future release | Yes |
| View roles by group | Yes | Yes |
| View users by group | Yes | Yes |
| **Configuration** |
| Customize configuration | Yes | Yes |
| Rules allow for customization of authorization decision | Yes | Yes |
| Configure whether to allow API access to authorization context | Yes | Yes |
| Configure adding permissions to <dfn data-key="access-token">Access Token</dfn> | Yes | Yes |
| Configure adding groups or roles to <dfn data-key="access-token">Access Token</dfn> | To be determined | Yes |
| Configure whether authorization context persists in user's app_metadata | To be determined | Yes |
| Configure third-party identity provider pass-through for groups, roles, and permissions | To be determined | Yes |
| User import/export via JSON | To be determined | Yes |
| Create custom authorization policies | Yes | No |
| Create deny assignments | To be determined | No |
| **Performance/Scalability** |
| Enhanced performance and scalability | Yes&nbsp;([See&nbsp;limits](/authorization/concepts/authz-limits)) | No ([See&nbsp;limits](/extensions/authorization-extension/v2/limits)) |

## Keep reading

- [Role-Based Access Control (RBAC)](/authorization/concepts/rbac)
- [Authorization Policies](/authorization/concepts/policies)
- [Rules for Authorization Policies](/authorization/concepts/authz-rules)
- [Authorization Core Limits](/authorization/concepts/authz-limits)
- [Sample Use Cases: Role-Based Access Control](/authorization/concepts/sample-use-cases-rbac)
- [Sample Use Cases: Rules with Authorization](/authorization/concepts/sample-use-cases-rules)
- [How to Use Auth0's Core Authorization Feature Set](/authorization/guides/how-to)
- [Authorization Extension](/extensions/authorization-extension)