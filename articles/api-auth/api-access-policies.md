---
  description: Writing rules to restrict user/client access to an API
---

# Restrict Client or User Access to APIs

By default, any user associated with an Auth0 client can request an API's scope(s). If you would like to restrict access to the API's scopes based on the user's role, you can do so via [rules](/rules). Then, if a restricted user attempts to request scopes not permitted to those with their role, they will receive an HTTP 401 response.

## Implementation

The following [rule](/rules) sample demonstrates how you would check for and permit/deny access depending on the `audience` parameter.

```js
function (user, context, callback) {

  /*
   * This script denies access to user-based flows using
   * the value of the `audience` parameter, which is empty
   * if you have a default set in the Management Dashboard.
   */

  var audience = '';

  audience = audience || (context.request && context.request.query && context.request.query.audience);

  if (audience === 'http://todoapi2.api' || !audience) {
    return callback(new UnauthorizedError('end_users_not_allowed'));
  }

  audience = audience || (context.request && context.request.body && context.request.body.audience);
  if (audience === 'http://todoapi2.api'  || !audience) {
    return callback(new UnauthorizedError('end_users_not_allowed'));
  }

  return callback(null, user, context);
}
```

You can easily modify the script above to check the `scopes`, `clients`, or other value.
