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
contentType: 
    - concept
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Authorization Core vs. Authorization Extension

Auth0 currently provides two way of implementing [role-based access control (RBAC)](/authorization/concepts/rbac)--our core implementation, which is currently being released, and our Authorization Extension, which will eventually be deprecated. Our new core implementation improves performance and scalability and will eventually provide a more flexible RBAC system than the Authorization Extension.

While we recommend using the RBAC features present in the Authorization core, we understand that some implementations may require use of the Authorization Extension until Authorization core features match its full functionality. To help you decide which feature is right for your implementation, we present the differences between the two:

| Feature | Authorization Core | Authorization Extension |
|---------|--------------------|-------------------------|
| **Roles** |
| Create/edit/delete roles | Yes | Yes |
| Search roles by name | In future release | Yes |
| Roles can contain permissions from one or more APIs | Yes | No |
| Roles can be assigned to groups | In future release | Yes |
| Roles are attached to specific applications | No | Yes |
| Roles can contain permissions from any application | Yes | No |
| Roles can be nested and are hierarchical | In future release | No |
| Roles can be assigned across multiple tenants | ? | No |
| View permissions by role | Yes | Yes |
| View users by role | Yes | Yes |
| **Users** |
| Create/edit/delete users | Yes | Yes |
| Search users by user, email, connection | Yes | Yes |
| Search users by identity provider, login count, last login, phone number | Yes | No |
| Search users using lucene syntax | Yes | No |
| Users can be assigned to roles | Yes - up to 5 roles per user | Yes - restriction here? |
| Users can be assigned to groups | In future release | Yes |
| View roles by user | Yes | Yes |
| View permissions by user | In future release | Yes |
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
| Create/edit/delete groups | In future release | Yes |
| Search groups by name | In future release | Yes |
| Groups can be sourced from local users | In future release | Yes |
| Groups can be sources from third-party directories (for example, AD, LDAP, SAML) | In future release | No |
| Groups can be nested and are hierarchical | In future release | Yes |
| Groups can be mapped from pre-existing groups and connections | In future release | Yes |
| Groups can contain roles from any application | In future release | Yes |
| View nested groups by group | In future release | Yes |
| View roles by group | In future release | Yes |
| View users by group | In future release | Yes |
| **Configuration** |
| Customize configuration | Yes | Yes |
| Rules allow for customization of authorization decision | Yes | Yes |
| Configure whether to allow API access to authorization context | Yes | Yes |
| Configure adding permissions to Access Token | Yes | Yes |
| Configure adding groups or roles to Access Token | In future release | Yes |
| Configure whether authorization context persists in user's app_metadata | In future release | Yes |
| Configure third-party identity provider pass-through for groups, roles, and permissions | In future release | Yes |
| User import/export via JSON | In future release | Yes |
| Create custom authorization policies | ? | No |
| Create deny assignments | ? | No |
| **Performance/Scalability** |
| Enhanced performance and scalability | Yes | No - limited to 500KB of data (1000 groups, 3000 users, where each user is a member of 3 groups; or 20 groups, 7000 users, where each user is a member of 3 groups) |

## Keep reading

- [Role-Based Access Control(RBAC)](/authorization/concepts/rbac)
- [Authorization Policies](/authorization/concepts/policies)
- [Rules for Authorization Policies](/authorization/concepts/authz-rules)
- [Sample Use Cases: Role-based Access Control and Rules with Authorization](/authorization/concepts/sample-use-cases)
- [How to Use Auth0's Core Authorization Feature Set](/authorization/guides/how-to)
- [Authorization Extension](/extensions/authorization-extension)