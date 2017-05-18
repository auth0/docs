---
  description: Writing rules to restrict user/client access to an API
---

# Restrict Client or User Access to APIs

By default, any user associated with an Auth0 client can request an API's scope(s). If you would like to restrict access to the API's scopes based on the user's role, [client](/clients) association, location, and so on, you can do so via [rules](/rules). Then, if a restricted user attempts to request scopes not permitted to them, they will receive an HTTP 401 response.

## Example: Scopes Based on the `audience` Parameter

The following [rule](/rules) sample demonstrates how you would check for and permit/deny access depending on the `audience` parameter, as well as the client ID.

```js
function (user, context, callback) {

  var audience = '';
  var client_id = '';

  client_id = context.clientID;

  audience = audience
              || (context.request && context.request.query && context.request.query.audience)
              || (context.request && context.request.body && context.request.body.audience);

  if ((audience === 'http://todoapi2.api' || !audience) && (context.clientID === 'CLIENT_ID')) {
    return callback(new UnauthorizedError('end_users_not_allowed'));
  }

  return callback(null, user, context);
}
```
