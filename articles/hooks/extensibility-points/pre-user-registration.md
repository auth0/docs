---
description: The pre-user-registration extensibility point for use with Hooks
---

# Extensibility Point: Pre-User Registration

For [Database Connections](/connections/database), the `pre-user-registration` extensibility point allows you to:

* Prevent creation of a database user;
* Add custom `app_metadata` or `user_metadata` to a newly-created user.

This allows you to implement scenarios including (but not limited to):

* Enforcing a custom password policy;
* Preventing signups for those who meet certain requirements;
* Setting conditional `app_metadata` or `user_metadata` on users that do not yet exist;
* Preventing (blacklisting) personal email domains.

## Starter Code

```js
module.exports = function (user, context, cb) {
  // call the callback with an error to signal failure
  // an object with optional `user.user_metadata` and `user.app_metadata` properties.
  cb(null, {
    user: {
      user_metadata: { foo: 'bar', baz: 17 },
      app_metadata: { vip: true, brownie_points: 2 }
    }
  });
};
```

The default response object is as follows:

```json
{
  "user": {
    "user_metadata": "object",
    "app_metadata": "object",
  }
}
```

If you specify `app_metadata` and `user_metadata` in the response object, Auth0 adds this information to the new user.

Metadata property names must not:

* Start with the `$` character;
* Contain the `.` character.

## Parameters

* **cb** [function] - function (parameters: error, accessTokenClaims)
* **context** [object] - Auth0 Connection and other context information
* **context.connection** [object] - information about the Auth0 Connection
* **context.connection.id** [object] - Connection ID
* **context.connection.name** [object] - Connection name
* **context.connection.tenant** [object] - Connection Tenant
* **context.requestLanguage** [string] - language of the Client agent
* **context.webtask** [object] - the context in which the Webtask runs
* **user** [object] - the logged-in user
* **user.email** [string] - user's email address
* **user.emailVerified** [Boolean] - indicator for whether user's email has been verified
* **user.id** [string] - the user's unique identifier
* **user.password** [string] - user's password
* **user.phone** [string] - user's phone number
* **user.phoneVerified** [Boolean] - indicator for whether user's phone number has been verified
* **user.tenant** [string] - the Auth0 Tenant name
* **user.username** [string] - username
