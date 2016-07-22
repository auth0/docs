# Auth0 Extension: Authorization Extension

The Auth0 Authorization Extension provides user authorization support in Auth0. Currently, this extension supports authorizations using Groups.

## Setting Up a New Authorization Extension

To install the Authorization extension, click on the "Auth0 Authorization" box on the main Extensions page of the Management Portal. You will be prompted to install the app.

![](/media/articles/extensions/authorization/app-install.png)

Once installed, you will see the app listed under "Installed Extensions."

![](/media/articles/extensions/authorization/installed-extensions.png)

When you click on the link to open the extension for the first time, you will be prompted to provide permission for the extension to access your Auth0 account. If you do so, you will be redirected to the Authorization Dashboard.

![](/media/articles/extensions/authorization/auth-dashboard.png)

## Rule Behavior for the Authorization Extension

The rule that is automatically created when the extension is installed will do the following:

1. Determine the user's group membership using information provided by the Extension,;
2. Store the user's group membership info as part of the `app_metadata`;
3. Add the user's group membership to the outgoing token (which can be requested via the **OpenID Groups** scope);
4. Verify that the user has been granted access to the current application.

## Managing Authorizations Using Groups

To create and manage the Groups with which you will use to manage users' settings, click on the "Groups" link on the Authorization Dashboard.

When creating a Group, you will provide a **name** for the group, as well as a **description** of what that Group does.

![](/media/articles/extensions/authorization/create-group.png)

There are two ways for you to manage users and their Group memberships:

* Opening the **group** and managing the group's users;

    ![](/media/articles/extensions/authorization/group-membership.png)

* Opening the **user** and managing the user's group membership.

    ![](/media/articles/extensions/authorization/user-membership.png)

The Groups that you will create are dependent on the needs of your business process. For example, you might have a Group for your users in Finance, a group for your users in IT, and so on. Additionally, you may create nested groups, similar to the following:

* Example Company
    * Accounting
        * External Accountants
    * Human Resources
    * Finance
        * Finance IT Support
    * Management

To create nested Groups, you must first create all of the individual groups via the CREATE button on the Groups page of the Authorization Dashboard.

![](/media/articles/extensions/authorization/add-nested-groups.png)

To nest the groups:

1. Open up the top-level Group (in the example above, this would be the Example Company Group);
2. Click on the "Nested Groups" tab;
3. Click on the ADD button in the top right corner. You will be presented with a list of Groups that can be added to the primary Group. To select a particular Group, click on the bright blue "Add Group" button at the end of the row. After each selection, you will be returned to the primary Group page. Continue this process until you have included all the Groups you need.

With nested Groups, adding a user to a sub-Group also grants the user permissions granted to the Groups that are parents of that Group. For example, adding a user to the External Accountants group automatically makes them a member of the Finance and Company Groups. Please note, however, that the user is only explicitly a member of External Accountants; all other memberships are purely dynamic and are calculated as needed (for example, when loading the user's group memberships).

![](/media/articles/extensions/authorization/nested-groups.png)

To prevent confusion, you will be shown both the explicit members AND the "calculated members" that result from nested groups whenever you open a specific Groups page in the Authorization Dashboard.

## Group Mappings

Group Mappings allow you to dynamically "add" users to different Groups based on the users' Connections.

For example, suppose your company has the following Groups of users:

* **Americas - West**, which consists of users who connect via *google-oauth2*;
* **Europe - West**, which consists of users who connect via *google-oauth2*.

With Group Mappings, you can consolidate these Groups and the permissions allotted to the included users into one larger group, such as Overall Company Group. Similar to nested Groups, the memberships of the users in Overall Company Group is not explicit, but dynamic, and are calculated at runtime. Such memberships will appear listed as such under the Groups page.

![](/media/articles/extensions/authorization/group-mapping.png)

## Controlling Application Access

Generally, if a user is included in a Connection that is enabled for a specific application, that user is granted access to that application. With the Authorization Extension, you may further specify the users that are allowed access to certain applications.

To set application access permissions, go to the "Applications" tab of the Authorization Dashboard. You will be presented with an overview of your applications and any security settings that may apply.

![](/media/articles/extensions/authorization/auth-apps.png)

The extension sets permissions per application, so you will be presented with specific security details once you click on a listed app. For example, you may specify that only those in the **Management** Group may access an application called "My App." To do so, click on the "Add" button located on the top-right corner.

![](/media/articles/extensions/authorization/no-groups-auth.png)

You will be presented with a list of Groups that can be added to this application. Once you do so, users within the group will be allocated authorization access.

![](/media/articles/extensions/authorization/select-auth-groups.png)

Users who are not a part of either of these groups are not granted access to the application, and such access (or lack thereof) is enforced through an automatically-created rule when the extension is installed.

![](/media/articles/extensions/authorization/auth-groups.png)

## Dashboard Integration

Once you have installed the Authorization Extension, you will see a new item near the bottom of the left-hand navigation menu on the Management Dashboard. Clicking on this will open the extension immediately.

![](/media/articles/extensions/authorization/nav-panel.png)
