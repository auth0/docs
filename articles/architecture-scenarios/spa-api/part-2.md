---
description: Auth0 Configuration for the SPA + API architecture scenario
toc: true
---

# SPA + API: Auth0 Configuration

In this section we will review all the configurations we need to apply at the [Auth0 Dashboard](${manage_url}).

## Create the API

Navigate to the [APIs section](${manage_url}/#/apis) of the dashboard, and click the **Create API** button.

You will be asked to supply the following details for your API:

- __Name__: a friendly name for the API. Does not affect any functionality.
- __Identifier__: a unique identifier for the API. We recommend using a URL but note that this doesn't have to be a publicly available URL, Auth0 will not call your API at all. This value cannot be modified afterwards.
- __Signing Algorithm__: the algorithm to sign the tokens with. The available values are `HS256` and `RS256`. When selecting RS256 the token will be signed with the tenant's private key. For more details on the signing algorithms see the [Signing Algorithms paragraph](#signing-algorithms) below.

![Create API](/media/articles/architecture-scenarios/spa-api/create-api.png)

Fill in the required information and click the **Create** button.

## Signing Algorithms

When you create an API you have to select the algorithm your tokens will be signed with. The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

::: note
The signature is part of a JWT. If you are not familiar with the JWT structure please refer to [JSON Web Tokens (JWTs) in Auth0](/jwt#what-is-the-json-web-token-structure-).
:::

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that. That algorithm, which is part of the JWT header, is the one you select for your API: `HS256` or `RS256`.

- __RS256__ is an [asymmetric algorithm](https://en.wikipedia.org/wiki/Public-key_cryptography) which means that there are two keys: one public and one private (secret). Auth0 has the secret key, which is used to generate the signature, and the consumer of the JWT has the public key, which is used to validate the signature.

- __HS256__ is a [symmetric algorithm](https://en.wikipedia.org/wiki/Symmetric-key_algorithm) which means that there is only one secret key, shared between the two parties. The same key is used both to generate the signature and to validate it. Special care should be taken in order for the key to remain confidential.

The most secure practice, and our recommendation, is to use __RS256__. Some of the reasons are:

- With RS256 you are sure that only the holder of the private key (Auth0) can sign tokens, while anyone can check if the token is valid using the public key.
- Under HS256, If the private key is compromised you would have to re-deploy the API with the new secret. With RS256 you can request a token that is valid for multiple audiences.
- With RS256 you can implement key rotation without having to re-deploy the API with the new secret.

::: note
For a more detailed overview of the JWT signing algorithms refer to [JSON Web Token (JWT) Signing Algorithms Overview](https://auth0.com/blog/json-web-token-signing-algorithms-overview/).
:::

## Configure the Scopes

Once the application has been created you will need to configure the Scopes which applications can request during authorization.

In the settings for your API, go to the **Scopes** tab. In this section you can add the scopes for our business case: `read:timesheets`, `create:timesheets`, `delete:timesheets`, and `approve:timesheets`.

![Add Scopes](/media/articles/architecture-scenarios/spa-api/add-scopes.png)

## Create the Application

There are four application types in Auth0: 
- __Native__ (used by mobile or desktop apps), 
- __Single Page Web Applications__, 
- __Regular Web Applications__ and 
- __Machine to Machine Applications__ (used by CLIs, Daemons, or services running on your backend). 

For this scenario we want to create a new Application for our SPA, hence we will use Single Page Application as the application type.

To create a new Application, navigate to the [dashboard](${manage_url}) and click on the [Applications](${manage_url}/#/applications}) menu option on the left. Click the __+ Create Application__ button.

Set a name for your Application (we will use `Timesheets SPA`) and select `Single Page Web Applications` as the type.

Click __Create__.

![Create Application](/media/articles/architecture-scenarios/spa-api/create-client.png)

That's it for now. When we are done with the SPA implementation we will revisit the dashboard and this Application's settings to make some changes in its configuration.

## Configure the Authorization Extension

You will need to ensure that the Authorization Extension is installed for your tenant. You can refer to the [Authorization Extension documentation](/extensions/authorization-extension#how-to-install) for details on how to do this.

### Define Permissions 

You will now define the required Permissions, according to the scopes you have already defined: `read:timesheets`, `create:timesheets`, `delete:timesheets`, and `approve:timesheets`.

In the Authorization Extension, click the **Permissions** tab, and then click on the **Create Permission** button. 

In the dialog, capture the details for each permission. 

Ensure that the name of the permission is exactly the same as the corresponding scope:

![Create Permission](/media/articles/architecture-scenarios/spa-api/create-permission.png)

Proceed to create the permissions for all the remaining scopes:

![Permissions](/media/articles/architecture-scenarios/spa-api/permissions.png)

### Define Roles

Next let's configure the two Roles: employee and manager.

Head over to the **Roles** tab, click the **Create Role** button, and select the **Timesheets SPA** application. 

Set the **Name** and **Description** to `Employee`, and select the `delete:timesheets`, `create:timesheets` and `read:timesheets` permissons. Click on **Save**.

![Create Employee Role](/media/articles/architecture-scenarios/spa-api/create-employee-role.png)

Next, follow the same process to create a `Manager` role, and ensure that you have selected all the permissions.

![Create Manager Role](/media/articles/architecture-scenarios/spa-api/create-manager-role.png)

### Assign Users to Roles

You need to assign all users to either the `Manager` or the `Employee` role. 

You can do this by going to the **Users** tab in the Authorization Extension and selecting a user. 

On the user information screen, go to the **Roles** tab. Click **Add Role to User**, and select the appropriate role.

![Add User to Role](/media/articles/architecture-scenarios/spa-api/add-user-role.png)

### Configuring the Authorization Extension

You will also need to ensure that the Rule for the Authorization Extension is published. 

To do so, click on your user avatar in the top right of the Authorization Extension, and select **Configuration**.

![Navigate to Configuration](/media/articles/architecture-scenarios/spa-api/select-configuration.png)

Make sure that **Permissions** are enabled and then click **Publish Rule**.

![Pulish Rule](/media/articles/architecture-scenarios/spa-api/publish-rule.png)

### Create a Rule to validate token scopes

The final step in this process is to create a Rule which will validate that the scopes contained in an `access_token` is valid based on the permissions assigned to the user. Any scopes which are not valid for a user should be removed from the `access_token`.

In your Auth0 Dashboard, go to the **Rules** tab. You should see the Rule created by the Authorization Extension:

![Rules](/media/articles/architecture-scenarios/spa-api/rules-1.png)

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

![Rules](/media/articles/architecture-scenarios/spa-api/rules-2.png)

<%= include('./_stepnav', {
 prev: ["1. Solution Overview", "/architecture-scenarios/application/spa-api/part-1"], next: ["3. API + SPA Implementation", "/architecture-scenarios/application/spa-api/part-3"]
}) %>
