---
description: Learn how to implement roles-based authorization (RBAC) in different scenarios and explore how to use rules with RBAC.
toc: true
topics:
  - authorization
  - authorization-extension
  - rbac
  - roles
  - permissions
  - groups
  - policies
  - rules
  - access-control
contentType: 
    - concept
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Sample Use Cases: Role-Based Access Control

Let's take a look at some examples of why you might need and how you could use [role-based access control (RBAC)](/authorization/concepts/rbac) in your authorization flow.

## Role-Based Access Control with roles only

Let's say you are a business who provides business-to-business software-as-a-service to non-profit organizations. Your product allows non-profits to create, manage, and market products to potential donors. Your application contains several different modules, two of which are:

* a gift shop point of sale (POS) module that enables non-profits to effectively create pop-up t-shirt shops and manage their sales.
* a marketing module that allows non-profits to create and distribute newsletters to their donors.

You want to use Auth0 to control the access of your non-profit customers to different parts of your application. Without RBAC, all non-profit employees and volunteers will have access to all features of your application, which is not ideal, especially since one of them is an animal rescue who has a variety of volunteers with knowledge of only the area in which they volunteer.

Instead, you implement RBAC, [creating some permissions](/dashboard/guides/apis/add-permissions-apis) that users of your gift shop POS module would need:

* `read:catalog-item`
* `read:customer-profile`
* `create:invoice`

And to make these easier to manage, you [create a role](/dashboard/guides/roles/create-roles) called `Gift Shop Manager` and [add these permissions to that role](/dashboard/guides/roles/add-permissions-roles).

Similarly, you [create permissions](/dashboard/guides/apis/add-permissions-apis) for users of your marketing module, which include:

* `create:newsletter`
* `edit:newsletter`
* `delete:newsletter`
* `send:newsletter`
* `edit:distribution-list`

And you [create a role](/dashboard/guides/roles/create-roles) called `Newsletter Admin` and [add these permissions to that role](/dashboard/guides/roles/add-permissions-roles).

Now, when your animal rescue brings in their volunteer, Astrid, to run their pop-up t-shirt shop, Astrid can be [assigned the role](/dashboard/guides/users/assign-roles-users) of `Gift Shop Manager`. When you assign this <dfn data-key="role">role</dfn> to Astrid, she is granted all the permissions that you assigned to the role. Since Astrid knows nothing about publishing newsletters (and isn't the best with email), you never assigned her the `Newsletter Admin` role, so she never has access to the marketing module.

From a more technical perspective, when Astrid logs into your product, Auth0 authenticates and authorizes her and includes the permissions in the returned <dfn data-key="access-token">Access Token</dfn>. Then, your product inspects the token to learn which module to display to Astrid.

By using Auth0's RBAC, you avoid building and maintaining separate authorization systems; instead, you use the token you already receive during authorization. And when Astrid moves away or decides she is tired of running the gift shop and would rather coordinate the foster program, you can easily [remove the `Gift Shop Manager` role](/dashboard/guides/users/remove-user-roles) from her and [assign her a new role](/dashboard/guides/users/assign-roles-users).

And if maintaining the roles and permissions for all of your customers becomes too unwieldy, you can also use the Auth0 API to create a module within your product that allows customers to manage their own RBAC, thereby reducing liability and cutting staffing costs.

## Role-Based Access Control with roles and groups

Using the previous example as a starting point, let's say your non-profit customer, the animal rescue, has grown to be so successful that they are no longer a volunteer-only organization. Now, the founder is the CEO and spends so much time working on the mission of the organization that they are paid a salary. In addition, the pop-up teeshirt shop has been so successful at raising funds and gathering attention that the CEO has decided to hire a marketing professional, Marco, to both run the gift shop and also develop additional products and place them.

So you [create some additional permissions](/dashboard/guides/apis/add-permissions-apis) that Marco will need for the gift shop POS module:

* `create:catalog-item`
* `delete:catalog-item`

And you [add these permissions](/dashboard/guides/roles/add-permissions-roles) to a new [role that you create](/dashboard/guides/roles/create-roles) called `Product Manager`. At this point, you could assign both the new `Product Manager` role and the previously-created `Gift Shop Manager` role to Marco. Or you could create groups to manage your roles and permissions more effectively.

Let's say you decide that you want to make sure that all employees of the organization (which currently consist of the CEO and Marco) have access to all permissions available for both the gift shop and marketing modules. But you want Astrid, and other volunteers, to still be able to sell items at the pop-up teeshirt shops. So you [create two groups](/dashboard/guides/groups/create-groups):

* `Employees`
* `Volunteers`

To the `Employees` group, you [add the following roles](/dashboard/guides/groups/assign-group-roles):

* `Product Manager`
* `Gift Shop Manager`
* `Newsletter Admin`

To the `Volunteers` group, you add the following roles:

* `Gift Shop Manager`

Then you [assign the CEO and Marco](/dashboard/guides/groups/assign-group-users) to the `Employees` group, and assign Astrid and any other volunteers to the `Volunteers` group.

Now, the CEO and Marco have all permissions that exist in the system (because every permission is assigned to one of the roles that is assigned to the `Employees` group to which they belong). And Astrid will have all permissions that you created for the `Gift Shop Manager` role (because the `Gift Shop Manager` role is assigned to the `Volunteers` group to which she belongs).

Later, if the rescue grows and hires more employees, you can easily change your groups and add roles and users to them. This way, you don't have to individually manipulate permissions for Marco, Astrid, and any other employees or volunteers.

## Keep reading

- [Role-Based Access Control (RBAC)](/authorization/concepts/rbac)
- [How to Use Auth0's Core Authorization Feature Set](/authorization/guides/how-to)
- [Troubleshooting: Role-Based Access Control and Authorization](/authorization/concepts/troubleshooting)