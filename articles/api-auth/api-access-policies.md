---
  description: Writing rules to restrict user/client access to an API
---

# Restrict Client or User Access to APIs

In certain cases, you might want to grant permissions to only selected clients or users to access your API. Anyone else with any other scope(s) who attempts to access the API receives an HTTP 401 response. You can do this via [rules](/rules).

## Background

By default, users can access *any* scope for the API. As such, you need to implement and use [rules](/rules) to prevent user-based flows from scopes you don't want the user to have. Within the rule, you can deny access based on `scope`, `audience`, `client`, and so on.

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
