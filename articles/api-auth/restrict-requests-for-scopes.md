---
  title: Restrict Application or User Requests for API Permissions
  description: Learn how to write rules that will restrict user/client access to permissions (scopes) for an API.
  topics:
  - api-authentication
  - oidc
  - scopes
  - permissions
contentType: how-to
useCase:
  - secure-api
  - call-api
---

# Restrict Application or User Requests for API Permissions

By default, any user associated with an [Auth0 application](/applications) can request any [custom API permissions] (/scopes/current/api-scopes) that have been created. Sometimes you may not want to allow an application to request certain permissions, though. For example, you may want to restrict access to an API's permissions based on the calling application or a user's role or location. To do so, we use [rules](/rules).

## Example: Deny access to anyone calling the API

In this example, we want to deny access to all users who are calling the API. To do this, we create a [rule](/rules) to deny access depending on the `audience` parameter. In this case, the `audience` value for our API is `http:://todoapi2.api`, so this is the audience we will refuse.

::: note
The value of an API's `audience` is displayed in the **API Audience** field in the [APIs section of the Auth0 Dashboard](${manage_url}/#/apis).
:::

When a restricted user attempts to access the API, they will receive an `HTTP 401` response.

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

## Example: Deny access to users from a specific calling application

In this example, we want to deny access to all users who are accessing the API from a specific calling application. To do this, we create a [rule](/rules) to deny access depending on the `client_id` parameter. This is equivalent to disabling all connections for an application.

::: note
The value of an application's `client_id` is displayed in the **Client ID** field in the [Applications section of the Auth0 Dashboard](${manage_url}/#/applications).
:::

When a restricted user attempts to access the API, they will receive an `HTTP 401` response.

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
