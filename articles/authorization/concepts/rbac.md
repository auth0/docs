---
description: Understand the concept of role-based access control and how it applies in Auth0.
toc: true
topics:
  - authorization
  - rbac
  - roles
  - permissions
contentType: 
    - concept
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Role-Based Access Control

Role-based access control (RBAC) refers to the idea of assigning permissions to users based on their <dfn data-key="role">role</dfn> within an organization. It provides fine-grained control and offers a simple, manageable approach to access management that is less prone to error than assigning permissions to users individually.

When using RBAC, you analyze the system needs of your users and group them into roles based on common responsibilities and needs. You then assign one or more roles to each user and one or more permissions to each role. The user-role and role-permissions relationships make it simple to perform user assignments since users no longer need to be managed individually, but instead have privileges that conform to the permissions assigned to their role(s). 

For example, if you were applying RBAC at a non-profit organization, you could give all W2 employees access to Google for research, and all contractors access to corporate email.

When planning your access control strategy, it's best practice to assign users the fewest number of permissions that allow them to get their work done.

## Benefits of RBAC

With RBAC, access management is easier as long as you adhere strictly to the role requirements. RBAC helps you:

* create systematic, repeatable assignment of permissions
* easily audit user privileges and correct identified issues
* quickly add and change roles, as well as implement them across APIs
* cut down on the potential for error when assigning user permissions
* integrate third-party users by giving them pre-defined roles
* more effectively comply with regulatory and statutory requirements for confidentiality and privacy

## RBAC Model

### Roles

Essentially, a role is a collection of permissions that you can apply to users. Using roles makes it easier to add, remove, and adjust permissions than assigning permissions to users individually. As your user base increases in scale and complexity, roles become particularly useful.

You can also use roles to collect permissions defined for various APIs. For example, say you have a marketing module that allows users to create and distribute newsletters to customers. Your marketing content specialist creates all of the newsletters and prepares them for distribution. Similarly, you have an event module that allows users to create, publish, and manage event registration. Your event coordinator creates the events. Once the VP of Marketing approves the newsletters and events, their assistant publishes the events and distributes the newsletters. In this case, your Newsletter API could have a `distribute:newsletters` permission and your Event API could have a `publish:events` permission. These permissions could then be gathered into a role called `Marketing Publisher` and assigned to the VP of Marketing's assistant.

## Overlapping role assignments

RBAC is an additive model, so if you have overlapping role assignments, your effective permissions are the union of your role assignments.

For example, let's say you have an API that provides data for an event application. You create a role of `Organizer` and assign it permissions that allow it to view, create, and edit events. You also create a role of `Registrant` and assign it permissions that allow it to view and register for events. Any users with both `Organizer` and `Registrant` roles will be able to view, create, edit, and register for events.

## Role-based access control in Auth0

<%= include('../../_includes/_rbac_methods') %>

### Extending RBAC 

You can provide even more finely-grained control by using [rules](/rules) to restrict access based on a combination of attributes, such as user department, time of day, location of access, or any other user or API attribute (for example, username, security clearance, or API name).

For more info about using rules with authorization policies, see [Rules with Authorization Policies](/authorization/concepts/authz-rules).

## Keep reading

- [How to Use Auth0's Core Authorization Feature Set](/authorization/guides/how-to)
- [Enable Role-Based Access Control (RBAC) for APIs](/dashboard/guides/apis/enable-rbac)
- [Authorization Core vs. Authorization Extension](/authorization/concepts/core-vs-extension)
- [Troubleshooting: Role-Based Access Control and Authorization](/authorization/concepts/troubleshooting)
