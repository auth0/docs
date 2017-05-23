---
  description: Writing rules to restrict user/client access to an API
---

# Restrict Client or User Requests for API Scopes

By default, any user associated with an Auth0 client can request an API's scope(s). If you would like to restrict access to the API's scopes based on the user's role, [client](/clients) association, location, and so on, you can do so via [rules](/rules). Then, if a restricted user attempts to request scopes not permitted to them, they will receive an HTTP 401 response.

## Example: Scopes Based on the `audience` Parameter

The following [rule](/rules) sample demonstrates how you would check for and permit/deny access depending on the `audience` parameter.

```js
function (user, context, callback) {

  /*
   *  Denies access to user-based flows based on audience
   */

  // If you don't pass audience in the query string
  // or body of the authorization request, the rule uses the
  // default audience (leave the audience variable empty).
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

You can implement similar functionality based on client ID.

```js
function (user, context, callback) {

  /*
   *  Denies access to user-based flows based on client ID
   */

  var client_id = '';

  client_id = context.clientID;

  if (context.clientID === 'CLIENT_ID') {
    return callback(new UnauthorizedError('end_users_not_allowed'));
  }

  return callback(null, user, context);
}
```
