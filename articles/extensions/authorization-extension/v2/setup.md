---
title: Setting Up the Authorization Extension
description: How to set up the Authorization Extension
toc: true
---

# Authorization Extension: Setup

Once you've configured the extension, you can manage your users, as well as the groups, roles and permissions for your users in the Authorization Extension dashboard.

## Users

The **Users** section lists all the current users of your applications. You can use this to search for and select a specific user to see their profile, view or edit their group affiliations, and view or edit their roles.

![Users Section](/media/articles/extensions/authorization/users.png)

## Groups

To create and manage the groups with which you'll manage users' settings, click **Groups** in the Authorization Dashboard.

Click **Create Group** to create a new group for your users. You'll be asked to provide a **name** for the group, as well as a **description** for that group.

![Create a New Group](/media/articles/extensions/authorization/create-group-v2.png)

You can manage your users and their group affiliations in one of two ways:

* Opening the **group** and managing the group's users

    ![Open a Group](/media/articles/extensions/authorization/group-membership-v2.png)

* Opening the **user** and managing the user's group membership(s)

    ![Open a User](/media/articles/extensions/authorization/user-membership-v2.png)

The groups you'll create are dependent on the needs of your business process. For example, you might have a group for your users in finance, a group for your users in IT, and so on. Additionally, you may create nested groups that are similar to the following:

* Example Company
  * Accounting
    * External Accountants
  * Human Resources
  * Finance
    * Finance IT Support
  * Management

To create nested groups, you must first create all of the individual groups via the **CREATE** button on the Groups page of the Authorization Dashboard.

![Add Nested Groups](/media/articles/extensions/authorization/add-nested-groups-v2.png)

To nest the groups:

1. Open up the top-level Group (in the example above, this would be the Example Company Group)
2. Click on the **Nested Groups** tab
3. Click on the **ADD NESTED GROUP** button. You will be presented with a list of Groups that can be added to the primary Group. To select a particular Group, click on the check box to the left of the name. After each selection, you will be returned to the primary group page. Continue this process until you have included all the Groups you need.

With nested groups, adding a user to a sub-group also grants the user permissions granted to the groups that are parents (and grandparents) of that group. For example, adding a user to the External Accountants group automatically makes them a member of the Finance and Company Groups. However, that the user is only explicitly a member of External Accountants; all other memberships are purely dynamic and are calculated as needed (for example, when loading the user's group memberships).

![View Nested Groups](/media/articles/extensions/authorization/nested-groups-v2.png)

To prevent confusion, you will be shown both the explicit members AND the "calculated members" that result from nested groups whenever you open a specific group's page in the Authorization Dashboard.

### Group Mappings

Group Mappings allow you to dynamically "add" users to different Groups based on the users' Connections. Essentially, using the Connection and the groups information provided by the IdP, you can dynamically make the user a member of the group in which you've created the appropriate mapping.

For example, suppose your users are logging in using their Active Directory (AD) credentials. As part of their identity, AD allows users to have group information associated (such as "Administrative" and "Marketing").

You can then configure group mappings to look at a user's profile if they're connecting with the Active Directory connection. When the extension sees that the person is a part of the "Administrative" group, it will automatically make the user a member of your company's Admin group.

![Group Mappings](/media/articles/extensions/authorization/group-mapping-v2.png)

## Roles

The roles that you will create will depend on the access to certain permissions in your application. For example, let's say that you have an application that allows employees to enter in company expenses. You want all employees to be able to submit expenses, but want certain Finance users to have more admin type of actions such as being able to approve or delete expenses. These actions can be mapped to [Permissions](#permissions) and then assigned to a certain Role.

You can create different types of Roles such as: Expense Admins, Expense Manager, and Expense User for your Expense Management Tool.

![Roles](/media/articles/extensions/authorization/roles.png)

To add a role, click the **CREATE ROLE** button from the **Roles** section of the dashboard. Then choose the application this Role applies to (such as Expense Management Tool) and then add a name of the role (such as Expense Admins) and a description of the role. Then select the permissions you wish to grant to this role. If you haven't yet created your permissions you can add them later to an exisiting Role.

![Add a New Role](/media/articles/extensions/authorization/add-role.png)

Once you have a **Role** created, you can add it to a user so they can then have the associated **Permissions**. To add a role to a user, find the user in the **Users** section, then click the **Roles** tab. Then click **ADD ROLE TO USER** to choose which roles you wish to assign to a user, then click **SAVE**.

![Add Role to User](/media/articles/extensions/authorization/add-role-to-user.png)

## Permissions

Permissions are the actions or functions that can be added to Roles.

Using the previous example of an Expense application, let's look at possible roles and how they can be associated with certain permissions:

- Role: Expense User
  - Permissions:
    - View their own expenses
    - Add a new expense

- Role: Expense Admin
  - Permissions:
    - Approve expenses
    - View all user expenses
    - Delete expenses
    - Add a new expense

To create a new permission, go to the **Permissions** section of the Authorization Extension dashboard.

![Permissions](/media/articles/extensions/authorization/permissions.png)

Then click the **CREATE PERMISSION** button. Then enter the name of the permission, the description and select the application for which this permission applies.

![Create Permission](/media/articles/extensions/authorization/create-permission.png)

Once you have your permissions created, you can associate them with [Roles](#roles).
