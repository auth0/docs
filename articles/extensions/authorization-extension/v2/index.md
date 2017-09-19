---
toc: true
title: Authorization Extension
description: Guidance on setting up and managing the Authorization Extension
---
# Authorization Extension

The Authorization Extension provides support for user authorization via Groups, Roles, and Permissions.





### Roles

The Roles that you will create will depend on the access to certain permissions in your application. For example, let's say that you have an application that allows employees to enter in company expenses. You want all employees to be able to submit expenses, but want certain Finance users to have more admin type of actions such as being able to approve or delete expenses. These actions can be mapped to [Permissions](#permissions) and then assigned to a certain Role.

You can create different types of Roles such as: Expense Admins, Expense Manager, and Expense User for your Expense Management Tool.

![Roles](/media/articles/extensions/authorization/roles.png)

To add a role, click the **CREATE ROLE** button from the **Roles** section of the dashboard. Then choose the application this Role applies to (such as Expense Management Tool) and then add a name of the role (such as Expense Admins) and a description of the role. Then select the permissions you wish to grant to this role. If you haven't yet created your permissions you can add them later to an exisiting Role.

![Add a New Role](/media/articles/extensions/authorization/add-role.png)

Once you have a **Role** created, you can add it to a user so they can then have the associated **Permissions**. To add a role to a user, find the user in the **Users** section, then click the **Roles** tab. Then click **ADD ROLE TO USER** to choose which roles you wish to assign to a user, then click **SAVE**.

![Add Role to User](/media/articles/extensions/authorization/add-role-to-user.png)

### Permissions

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

## Enable API Access

At this point the extension might contain some roles, groups, permissions. Your users might also have been assigned to specific roles and groups.

The Authorization Dashboard can optionally enable API access which will allow you to automate provisioning and query the authorization context of your users in real time.

To get to **API** section, click **API** on the dropdown on the top right of the **Authorization Dashboard**.

![Click API](/media/articles/extensions/authorization/click-api.png)

Under **Settings** you can use the toggle to enable API Access.

You can also set the Token Expiration, Token Issuer, Token Audience and Url. Click the **SAVE** button when finished editing these field.

Click the **Explorer** section to see the API endpoints that can be called.

![Explorer](/media/articles/extensions/authorization/api-explorer.png)

::: note
You can also find detailed information about the endpoints at our [Authorization Extension API Explorer](/api/authorization-extension).
:::

## Rule Behavior for the Authorization Extension

In addition to API access, you can also deploy a rule that reaches out to the extension each time a user logs in. Once the rule is enabled, it will do the following:

1. Determine the user's group membership, roles and permissions using information provided by the Extension;
2. Optionally store the user's groups, roles and permissions info as part of the `app_metadata`, to enable this [see details below](#persistence);
3. Add the user's groups, roles and permissions to the outgoing token (which can be requested via the `openid groups permissions roles` scope), [see Token Contents above](#token-contents);

::: note
Since this logic is part of a rule it will only be executed in the context of a login. If users are added to or removed from a group this will only be reflected within Auth0 after this user logs in again (eg: in the user's `app_metadata` or when calling the `/userinfo` endpoint).
:::

### Control Application Access

In addition, you can write your own rules that are applied after the rule that is published by the extension. For example you can write a rule to control application access. One way to achieve this is to use the [Application Metadata](/rules/metadata-in-rules#reading-metadata) where you can specify on every client that roles are required.

**How to set `required_roles`**

⁠⁠⁠⁠1. To set the `context.clientMetadata` field with `required_roles`, first select your client [in the dashboard](${manage_url}/#/clients). This will bring you to the client's Settings, scroll down and click on the **Show Advanced Settings** link at the bottom of the page.

![Click Advanced Settings Link](/media/articles/extensions/authorization/adv-settings-link.png)

2. Under **Application Metadata** add an item setting the **Key** to `required_roles` and in **Value** field list your roles in comma separated style. Click the **CREATE** button to add the field.

![Example of required roles](/media/articles/extensions/authorization/required-roles.png)

3. When finished click **Save Changes**. Now when you login from this client, in `context.clientMetadata` you will have the `required_roles` with the roles value string you entered.

**Create a Rule that enforces client roles**

After setting `required_roles` you can write a rule that enforces this logic:

```js
function (user, context, callback) {
  context.clientMetadata = context.clientMetadata || {};
  if (context.clientMetadata.required_roles && context.clientMetadata.required_roles.length){
    if (user.roles) {
      var _ = require('lodash');
      var roles = context.clientMetadata.required_roles.split(',');
      var matchingRoles =_.filter(user.roles, function(roleName) {
        return _.includes(roles, roleName);
      });

      if (matchingRoles && matchingRoles.length) {
        return callback(null, user, context);
      }
    }

    return callback(new UnauthorizedError('You do not have the required role to access ' + context.clientName));
  }

 callback(null, user, context);
}
```

::: note
For this to work you must enable "Roles" under the "Token Contents" section and publish the rule. Then add this rule after the generated "auth0-authorization-extension" rule.
:::

## Import/Export Authorization Data

You can import new data or export exisiting authorization data with a JSON file. This can be useful when moving over an environment, but remember roles and permissions are linked to specific clients, so you will need to update to the correct `applicationId` when moving environments.

You can get to the **Import/Export** section by clicking **Configuration** on the dropdown on the top right of the **Authorization Dashboard**.

![Click Configuration](/media/articles/extensions/authorization/click-configuration.png)

And then clicking **Import/Export**.

![Import/Export Section](/media/articles/extensions/authorization/import-export.png)

Use this form to copy and/or paste, or edit JSON data and then click either the **IMPORT** or **EXPORT** button when finished, depending on your use case.

## Storage Types

### Webtask Storage

The extension will use Webtask Storage by default, which is limited to 500 KB. Here are some examples of what this means in terms of scenarios:

 - If you have 1000 groups and 3000 users, where each user is member of 3 groups about 475 KB of data would be used.
 - If you have 20 groups and 7000 users, where each user is member of 3 groups about 480 KB of data would be used.

### Amazon S3

The extension also allows you to config Amazon S3 as a storage provider. In order to use Amazon S3 you will need to:

 1. Create an S3 bucket
 2. Create an IAM user and get the Key ID and Key for that user
 3. Create a policy for the IAM user which allows the user to make changes to the bucket

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:DeleteObject",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::NAME-OF-YOUR-BUCKET/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::NAME-OF-YOUR-BUCKET"
            ],
            "Condition": {}
        }
    ]
}
```

::: note
Amazon S3 is a file based storage platform, which means writes in parallel can cause issues. The storage logic tries to take this into account as much as possible, but if you automate the creation of groups/roles/permissions we suggest you make sequential calls to the API.
:::

## Troubleshooting

### An authentication results in a token that contains Groups but not Roles or Permissions

If this happens, chances are you created roles and permissions for one application (client) but are authenticating with another. For example, you created all your roles/permissions against Website A but create another website client in Auth0 (Website B) and use its `client_id` and `client_secret` in your application.  This can also occur if you click the **Try** button in the Auth0 Dashboard on a Connection that contains one of your users. This will execute an authentication flow using the Auth0 _global application_, which is not the same as the application you configured in the extension.

### My application/client is not shown in the dropdown when setting up the extension

The supported client types for the Authorization extension are: **Native**, **Single Page Web Applications** and **Regular Web Applications**. Clients with no type assigned or non-interactive clients are not supported.
