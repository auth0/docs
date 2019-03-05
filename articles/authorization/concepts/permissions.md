---
description: Understand the concept of permissions, how it relates to scopes, and how both apply to the role-based access control model used in Auth0.
toc: true
topics:
  - authorization
  - rbac
  - roles
  - permissions
  - scopes
contentType: 
    - concept
useCase:
  - build-an-app
---
# Permissions

::: note
Often, the concepts of scopes and permissions are unintentionally combined. This article discusses permissions and the distinction between permissions and scopes. For more info about scopes, see [Scopes](/scopes).
:::

_Permissions_ refer to all of the actions that that can be performed within an API, regardless of the way in which an application gains access to it. Since only the API can know all of the possible actions that it can handle, it should have its own internal access control system in which it defines its own permissions.

Commonly, a user is assigned permissions for an API, which we then typically refer to as the user's _privileges_. For example, in an API that allows users to manipulate addresses in an address book, you would create read and write permissions. You would then assign some users read privileges, others write privileges, and yet others both read and write privileges. 

It is also possible to assign permissions directly to an app without any user in the picture. Regardless, in all cases, permissions answer the question, "What can be done with resource X?"

## Permissions vs. Scopes

Permissions differ from [OAuth 2.0](/protocols/oauth2) [scopes](/scopes), which is the mechanism an application uses to ask for _delegated access_ to a resource. In other words, scopes allow applications to access resources on behalf of a user and represent a set of actions the app would like to do on their behalf. Scopes answer the question, "What has the user allowed this application to do on its behalf with resource X?" 

Scopes are limited in that they cannot allow an application to do more than what the user is already allowed to do within the API being accessed; they are not meant to grant permissions to the application that are beyond the privileges the user already possesses. To determine an application's effective permissions, an API should combine incoming scopes with the privileges assigned within its own internal access control system and make access control decisions accordingly.

## Permissions in Auth0

Auth0 uses the term Permissions in the Dashboard to indicate where to define available scopes that can be: 

* requested by an application, and
* used by an API in its internal access control system to determine the effective permissions for a calling application.

You can also build a [role-based access control (RBAC) system](/authorization/concepts/rbac) using our [Authorization core feature set or Authorization Extension](/authorization/concepts/corevsextension).

## Keep reading

- [Scopes](/scopes)
- [Role-based Access Control (RBAC)](/authorization/concepts/rbac)
