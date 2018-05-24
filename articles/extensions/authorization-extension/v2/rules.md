---
title: Using Rules with the Authorization Extension
description: How to use information from the extension in rules
toc: true
---

# Authorization Extension: Rules

You can use [rules](/rules) with the Authorization Extension to do things like:

* Add [custom claims](/scopes/current#custom-claims) to the issued token
* Determining the user's group membership, roles and permissions
* Storing the user's groups, roles and permissions info as [part of the `app_metadata`](/extensions/authorization-extension/v2/configuration#persistence)
* Adding the user's groups, roles and permissions to the [outgoing token](/extensions/authorization-extension/v2/configuration#token-contents)) (which can be requested via the `openid groups permissions roles` scope)

Because the above logic is part of a rule, it will only be executed in the context of a login. If users are added to or removed from a group, this change will only be reflected in Auth0 after the user's next login.

## Add Custom Claims to the Issued Token

If you'd like to add custom claims to your tokens, you can do so by creating additional [rule](/rules) that allows the Authorization Extension to do so.

::: note
You should [limit the number of claims](/extensions/authorization-extension/v2/configuration#data-limitations) you add to the token.
:::

```js
function (user, context, callback) {
  var namespace = 'http://yourdomain/claims/'; // You can set your own namespace, but do not use an Auth0 domain

  // Add the namespaced tokens. Remove any which is not necessary for your scenario
  context.idToken[namespace + "permissions"] = user.permissions;
  context.idToken[namespace + "groups"] = user.groups;
  context.idToken[namespace + "roles"] = user.roles;
  
  callback(null, user, context);
}
```

This rule must run **after** the Authorization Extension rule. To make sure this happens, make sure that you place it below the Authorization Extension rule.

::: note
When calling the `/authorize` endpoint or configuring Lock, you'll need to specify the information you want in the `scope` by indicating `groups`, `permissions` and/or `roles`.
:::

## Control App Access

You can also write rules that are executed after the Authorization Extension rule to do things like control access to your application. One method of doing this is to specify the roles that are required for each application using the [application metadata](/rules/metadata-in-rules#reading-metadata).

### Step 1: Set the Application Metadata's `required_roles`

In this step, you'll set the Application's metadata with it's roles, which are groups of permissions that you've grouped together to create a specific set of functionality. You can think of this step as "tagging" the Application so that the rules you'll set up in the next step know which Application to act on.

⁠⁠⁠⁠1. To set the `context.clientMetadata` field with `required_roles`, begin by selecting the application you want to work with [in the dashboard](${manage_url}/#/applications).

This brings you to the application's **Settings**. Scroll down and click **Show Advanced Settings** at the bottom of the page.

![Click Advanced Settings Link](/media/articles/extensions/authorization/adv-settings-link.png)

2. Under **Application Metadata** add an item setting the **Key** to `required_roles` and in **Value** field list your roles in comma separated style. Click the **CREATE** button to add the field.

![Example of required roles](/media/articles/extensions/authorization/required-roles.png)

3. When finished click **Save Changes**. Now when you login from this application, in `context.clientMetadata` you will have the `required_roles` with the roles value string you entered.

### Step 2: Create the Rule Enforcing Application Roles

Now that each Application has a role associated with it, you can create the rule executes with this piece of application information in context.

::: warning
Before creating this rule, enable **Roles** under the [Token Contents](/extensions/authorization-extension/v2/configuration#token-contents) and [publish the Authorization Extension rule](/extensions/authorization-extension/v2/configuration#publish-the-authorization-extension-rule). Then, add this rule and make sure it is listed *after* the generated "auth0-authorization-extension" rule.
:::

After setting `required_roles`, create a new [rule](${manage_url}/#/rules) with the following body:

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

## Keep Reading

::: next-steps
* [Import/Export Data](/extensions/authorization-extension/v2/import-export-data)
* [Troubleshoot Errors](/extensions/authorization-extension/v2/troubleshooting)
* [Enable API Access to the Extension](/extensions/authorization-extension/v2/api-access)
:::
