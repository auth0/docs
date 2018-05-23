---
description: Auth0 Configuration for the Mobile + API architecture scenario
toc: true
---

# Mobile + API: Auth0 Configuration

In this section we will review all the configurations we need to apply at the [Auth0 Dashboard](${manage_url}).


## Create the API

Click on the [APIs menu option](${manage_url}/#/apis) on the left, and click the Create API button.

You will be required to supply the following details for your API:

- __Name__: a friendly name for the API. Does not affect any functionality.
- __Identifier__: a unique identifier for the API. We recommend using a URL but note that this doesn't have to be a publicly available URL, Auth0 will not call your API at all. This value cannot be modified afterwards.
- __Signing Algorithm__: the algorithm to sign the tokens with. The available values are `HS256` and `RS256`. When selecting RS256 the token will be signed with the tenant's private key. For more details on the signing algorithms see the Signing Algorithms paragraph below.

![Create API](/media/articles/architecture-scenarios/mobile-api/create-api.png)

Fill in the required information and click the __Create__ button.

<%= include('../../_includes/_api-signing-algorithms.md') %>

<%= include('../../_includes/_api-configure-scopes.md') %>

## Create the Application

There are four application types in Auth0: __Native__ (used by mobile or desktop apps), __Single Page Web Applications__, __Regular Web Applications__ and __Machine to Machine Application__ (used by CLIs, Daemons, or services running on your backend). For this scenario we want to create a new Application for our mobile application, hence we will use Native as the application type.

To create a new Application, navigate to the [dashboard](${manage_url}) and click on the [Applications](${manage_url}/#/applications}) menu option on the left. Click the __+ Create Application__ button.

Set a name for your Application (we will use `Timesheets Mobile`) and select `Native` as the type.

Click __Create__.

![Create Application](/media/articles/architecture-scenarios/mobile-api/create-application.png)

## Configure the Authorization Extension

You will need to ensure that the Authorization Extension is installed for your tenant. You can refer to the [Authorization Extension documentation](/extensions/authorization-extension#how-to-install) for details on how to do this.

### Define Permissions 

You will need to define Permissions which correlates with the scopes you have already defined. In the Authorization Extension, click the _Permissions_ tab, and then click on the **Create Permission** button. In the dialog, capture the details for each permission. Ensure that the name of the permission is exactly the same as the corresponding scope:

![Create Permission](/media/articles/architecture-scenarios/mobile-api/create-permission.png)

Proceed to create the permissions for all the remaining scopes:

![Permissions](/media/articles/architecture-scenarios/mobile-api/permissions.png)

### Define Roles

Head over to the _Roles_ tab and create 2 Roles. Click the **Create Role** button and select the **Timesheets SPA** application. Give the Role a name and description of Employee, and select the `delete:timesheets`, `create:timesheets` and `read:timesheets` permissons. Click on **Save**.

![Create Employee Role](/media/articles/architecture-scenarios/mobile-api/create-employee-role.png)

Next, follow the same process to create a **Manager** role, and ensure that you have selected all the permissions:

![Create Manager Role](/media/articles/architecture-scenarios/mobile-api/create-manager-role.png)

### Assign Users to Roles

You will need to assign all users to either the Manager or the User role. You can do this by going to the _Users_ tab in the Authorization Extension and selecting a user. On the user information screen, go to the _Roles_ tab. You can add a role to the user by clicking the **Add Role to User** button, and selecting the approproate role for the user.

![Add User to Role](/media/articles/architecture-scenarios/mobile-api/add-user-role.png)

### Configuring the Authorization Extension

You will also need to ensure that the Rule for the Authorization Extension is published. You can do this by clicking on your user avatar in to top right of the Authorization Extension, and selecting the **Configuration** option:

![Navigate to COnfiguration](/media/articles/architecture-scenarios/mobile-api/select-configuration.png)

Ensure that you have enabled **Permissions** and then click the **Publish Rule** button:

![Pulish Rule](/media/articles/architecture-scenarios/mobile-api/publish-rule.png)

### Create a Rule to validate token scopes

The final step in this process is to create a Rule which will validate that the scopes contained in an `access_token` is valid based on the permissions assigned to the user. Any scopes which are not valid for a user should be removed from the `access_token`.

In your Auth0 Dashboard, go to the _Rules_ tab. You should see the Rule created by the Authorization Extension:

![Rules](/media/articles/architecture-scenarios/mobile-api/rules-1.png)

Click on the **Create Rule** button and select the **Empty Rule** template. You can give the Rule a name, such as **Access Token Scopes**, and then specify the following code for the Rule:

```js
function (user, context, callback) {
  if (context.clientName !== 'Timesheets SPA') {
    return callback(null, user, context);
  }
  
  var permissions = user.permissions || [];
  var requestedScopes = context.request.body.scope || context.request.query.scope;
  var filteredScopes = requestedScopes.split(' ').filter( function(x) {
    return x.indexOf(':') < 0;
  });
  Array.prototype.push.apply(filteredScopes, permissions);
  context.accessToken.scope = filteredScopes.join(' ');

  callback(null, user, context);
}
```

The code above will ensure that all Access Tokens will only contain the scopes which are valid according to a user's permissions. Once you are done you can click on the **Save** button.

Rules execute in the order they are displayed on the Rules page, so ensure that the new rule you created is positioned below the rule for the Authorization Extension, so it executes after the Authorization Extension rule:

![Rules](/media/articles/architecture-scenarios/mobile-api/rules-2.png)

<%= include('./_stepnav', {
 prev: ["1. Solution Overview", "/architecture-scenarios/application/mobile-api/part-1"], next: ["3. API + Mobile Implementation", "/architecture-scenarios/application/mobile-api/part-3"]
}) %>
