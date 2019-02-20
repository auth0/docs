---
description: Learn to use Auth0's API Authorization features using the Management Dashboard.
toc: true
topics:
  - authorization
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# API Authorization

The Authorization features of Auth0 allow for roles-based access control to your APIs. Once you add your API(s) to your [Dashboard](${manage_url}/#/apis), you can set up permissions on them, and then set up roles with blocks of permissions which can be added to users. 

## Set up an API and permissions

First, go to the [Dashboard > APIs](${manage_url}/#/apis) and set up your API. 

![Create an API](/media/articles/authorization/api-main.png)

Next, make sure to add permissions to the API (Referred to in this setting as 'scopes').

![Create Permissions](/media/articles/authorization/api-permissions.png)

Granularity here is sometimes better than generalizations. It can be easier to add numerous permissions to a role or user than to add two large, blanket permissions at the beginning and then try to separate those into more specific permissions later.

## User roles

Roles are essentially a collection of permissions that you can apply to users. The use of roles make it easier to add, remove, and adjust permissions that are given to groups of users. These buckets of permissions allow the administrator to give different users sets of permissions without keeping track of each individual user who might need them and having to modify the permissions of every user when permissions need to be added or changed. This gets especially important as your user base increases in scale and complexity.

Another use of roles is to group together permissions from various APIs. If you have multiple APIs, and some users who need access to certain functionality on several of them, you can give those users a single role that holds permissions from several APIs at once.

### Create user roles

To create roles, head to the [Dashboard > Users & Roles > Roles](${manage_url}/#/roles) screen.

![Roles](/media/articles/authorization/roles.png)

Here you will see a listing of all of the roles which you have created so far. If you click "Add Role" you will be shown a screen similar to this one.

![Add Role](/media/articles/authorization/role-add.png)

Here, you may give the role a name, and select some permissions to add to it.

![Add Permissions to Roles](/media/articles/authorization/role-permissions-add.png)

## Adding roles and permissions to users

Once the permissions are created on the API, and any desired roles are created, now they can be applied to users.

On the [Dashboard > Users & Roles > Users](${manage_url}/#/users) page, choose a user and then select the Roles tab.

![Add Role](/media/articles/authorization/user-roles.png)

On the Roles tab of the User screen, you can view the current roles attached to a user, and add more. When you add roles, you will get a dropdown selection of existing roles on your tenant to pick and choose from at will.

![Add Role](/media/articles/authorization/user-roles-add.png)

Furthermore, permissions may be added directly to a user. This circumvents the benefits of a roles-based system, and is not typically the recommended course of action, but in some cases may be appropriate. To do so, go to the Permissions tab on the User screen. 

![Add Role](/media/articles/authorization/user-permissions.png)

And then add permissions as desired. The selector screen will show all permissions from all APIs, unless filtered.

![Add Role](/media/articles/authorization/user-permissions-add.png)
