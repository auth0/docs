---
description: Learn how to implement roles-based authorization (RBAC) in different scenarios and explore how to use rules with RBAC.
toc: true
topics:
  - authorization
  - authorization-extension
  - rbac
  - roles
  - permissions
  - policies
  - rules
contentType: 
    - concept
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Sample Use Cases: Role-Based Access Control

Let's take a look at an example of why you might need and how you could use [role-based access control (RBAC)](/authorization/concepts/rbac) in your authorization flow.

Let's say you are a business who provides business-to-business software-as-a-service to non-profit organizations. Your product allows non-profits to create, manage, and market products to potential donors. Your application contains several different modules, two of which are:

* a gift shop point of sale (POS) module that enables non-profits to effectively create pop-up teeshirt shops and manage their sales. 
* a marketing module that allows non-profits to create and distribute newsletters to their donors.

You want to use Auth0 to control the access of your non-profit customers to different parts of your application. Without RBAC, all non-profit employees and volunteers will have access to all features of your application, which is not ideal, especially since one of them is an animal rescue who has a variety of volunteers with knowledge of only the area in which they volunteer.

Instead, you implement RBAC, [creating some permissions](/scopes/current/guides/define-api-scopes-dashboard) that users of your gift shop POS module would need:

* `read:catalog-item`
* `read:customer-profile`
* `create:invoice`

And to make these easier to manage, you [create a role](/authorization/guides/create-roles) called `Gift Shop Manager` and [add these permissions to that role](/authorization/guides/add-permissions-roles).

Similarly, you [create permissions](/scopes/current/guides/define-api-scopes-dashboard) for users of your marketing module, which include:

* `create:newsletter`
* `edit:newsletter`
* `delete:newsletter`
* `send:newsletter`
* `edit:distribution-list`

And you [create a role](/authorization/guides/dashboard/create-roles) called `Newsletter Admin` and [add these permissions to that role](/authorization/guides/dashboard/add-permissions-roles).

Now, when your animal rescue brings in their volunteer, Astrid, to run their pop-up teeshirt shop, Astrid can be [assigned the role](/authorization/guides/dashboard/assign-roles-users) of `Gift Shop Manager`. When you assign this role to Astrid, she is granted all the permissions that you assigned to the role. Since Astrid knows nothing about publishing newsletters (and isn't the best with email), you never assigned her the `Newsletter Admin` role, so she never has access to the marketing module.
 
From a more technical perspective, when Astrid logs into your product, Auth0 authenticates and authorizes her and includes the permissions in the returned Access Token. Then, your product inspects the token to learn which module to display to Astrid.

By using Auth0's RBAC, you avoid building and maintaining separate authorization systems; instead, you use the token you already receive during authorization. And when Astrid moves away or decides she is tired of running the gift shop and would rather coordinate the foster program, you can easily [remove the `Gift Shop Manager` role](/authorization/guides/dashboard/remove-user-roles) from her and [assign her a new role](/authorization/guides/dashboard/assign-roles-users).

And if maintaining the roles and permissions for all of your customers becomes too unwieldy, you can also use the Auth0 API to create a module within your product that allows customers to manage their own RBAC, thereby reducing liability and cutting staffing costs.

## Keep reading

- [Role-Based Access Control (RBAC)](/authorization/concepts/rbac)
- [How to Use Auth0's Core Authorization Feature Set](/authorization/guides/how-to)
- [Troubleshooting: Role-Based Access Control and Authorization](/authorization/concepts/troubleshooting)