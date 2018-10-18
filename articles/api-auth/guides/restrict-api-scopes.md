---
  description: Learn how to restrict access to API scopes.
  topics:
  - api-authentication
  - oidc
  - scopes
  contentType: 
  - how-to
  useCase:
  - secure-api
  - call-api
---

# Restrict Access to Your API's Scopes

By default, an [application](/applications) can request any [scope you have defined for your API](/scopes#api-scopes), and the end user will be prompted to approve requested scopes during the authorization flow. 

Instead, you may want to restrict available scopes based on, for example, the user's role, application association, location, and so on. To do so, you can use [rules](/rules). If a restricted user attempts to request scopes not permitted to them, they will receive an `HTTP 401` response.


## Example: Deny access based on the API audience

This demonstrates how you deny access to an API depending on the `audience` parameter. In this example, we deny access to all users if the API they are trying to access has the `audience` set to `http://todoapi2.api`.

```js
function (user, context, callback) {

  /*
   *  Denies access to user-based flows based on audience
   */

  var audience = '';

  audience = audience
              || (context.request && context.request.query && context.request.query.audience)
              || (context.request && context.request.body && context.request.body.audience);

  if (audience === 'http://todoapi2.api' || !audience) {
    return callback(new UnauthorizedError('end_users_not_allowed'));
  }

  return callback(null, user, context);
}
```

::: note
The value of an API's `audience` is displayed at the **API Audience** field, at [Dashboard > APIs](${manage_url}/#/apis).
:::


## Example: Deny access based on the Client ID

This demonstrates how you deny access to an API depending on the application with which the user is associated. In this example, we deny access to all users if the application through which they log in has an ID equal to `CLIENT_ID`. (This is equivalent to disabling **all** Connections for the application.)

```js
function (user, context, callback) {

  /*
   *  Denies access to user-based flows based on client ID
   */

  var client_id = '';
  client_id = context.clientID;

  if (client_id === 'CLIENT_ID') {
    return callback(new UnauthorizedError('end_users_not_allowed'));
  }

  return callback(null, user, context);
}
```

::: note
The value of a client's ID is displayed in the **Client ID** field at [Dashboard > Applications](${manage_url}/#/applications).
:::

## Example: Deny access based on the user's role

We discuss this approach in depth in our [SPA + API Architecture Scenario](/architecture-scenarios/spa-api), specifically, the [Configure the Authorization Extension](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension) section. In this section, you will learn how to configure the [Authorization Extension](/extensions/authorization-extension) and create a custom [Rule](/rules) that will ensure scopes are granted based on the permissions of a user.
