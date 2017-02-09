---
description: The pre-user-registration extensibility point for use with Auth0 Hooks
---

# Extensibility Point: `pre-user-registration`

The `pre-user-registration` extensibility point allows you to:

* Prevent creation of an application user;
* Add custom `app_metadata` or `user_metadata` to a newly-created user.

This allows you to implement scenarios including:

* Enforcing a custom password policy;
* Preventing signups for those who meet certain requirements (such as existing users or users using a particular Social Connection);
* Setting conditional `app_metadata` or `user_metadata` on users that do not yet exist;
* Preventing (blacklisting) personal email domains.

You can include the following in your request body:

```json
{
  "user": {
    "id": "string",
    "tenant": "string",
    "username": "string",
    "password": "string",
    "email": "string",
    "emailVerified": "boolean",
    "phoneNumber": "string",
    "phoneNumberVerified": "boolean",
    "user_metadata": "object",
    "app_metadata": "object"
  },
  "context": {
    "requestLanguage": "string",
    "connection": {
      "id": "string",
      "name": "string",
      "tenant": "string"
    }
  }
}
```

:::panel-warning Metadata
The names of properties in `user.user_metadata` and `user.app_metadata must not:

* contain the `.` character;
* begin with the `$` character.
:::

You will receive the following response:

```json
{
  "user": {
    "user_metadata": "object",
    "app_metadata": "object",
  }
}
```

The newly-created user's profile will include `user_metadata` and/or `app_metadata` if specified in the response body.

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
