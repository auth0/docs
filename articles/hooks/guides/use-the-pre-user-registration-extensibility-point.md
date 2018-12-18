---
description: The pre-user-registration extensibility point for use with Hooks
beta: true
topics:
    - hooks
    - extensibility-points
contentType:
  - how-to
useCase: extensibility-hooks
v2: true
---
# Implement Custom Actions Using Pre-User Registration Extensibility Points

For [Database Connections](/connections/database), the Pre-User Registration extensibility point allows you to add custom data points to a newly-created user's profile.

This allows you to implement scenarios such as setting conditional information (in the form of [metadata](/users/concepts/overview-user-metadata) on users that do not exist yet.

Implement a [Hook](/hooks/concepts/overview-hooks) using this extensibility point with either the [Dashboard](/hooks/guides/create-delete-hooks-using-dashboard) or the [Command Line Interface](/hooks/guides/create-delete-hooks-using-cli). 

## Starter code and parameters

After you've created a new Hook that uses the Pre-User Registration extensibility point, open up the Hook and edit it using the Webtask Editor embedded in the Dashboard. 

The parameters listed in the comment at the top of the code indicate the Auth0 objects (and the parameters within the objects) that can be passed into and used by the Hook's function.

```js
/**
@param {object} user - The user being created
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user name
@param {string} user.password - user's password
@param {string} user.email - email
@param {boolean} user.emailVerified - is email verified?
@param {string} user.phoneNumber - phone number
@param {boolean} user.phoneNumberVerified - is phone number verified?
@param {object} context - Auth0 connection and other context info
@param {string} context.requestLanguage - language of the application agent
@param {object} context.connection - information about the Auth0 connection
@param {object} context.connection.id - connection id
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - webtask context
@param {function} cb - function (error, response)
*/
module.exports = function (user, context, cb) {
  var response = {};

  // Add user or app metadata to the newly created user
  // response.user = {
  //   user_metadata: { foo: 'bar' },
  //   app_metadata: { vip: true, score: 7 }
  // };

  response.user = user;

  cb(null, response);
};
```

The callback function `cb` at the end of the sample code is used to signal completion and must not be omitted.

### Response

The default response object every time the Hook runs is similar to the following:

```json
{
  "user": {
    "tenant": "my-tenant",
    "username": "user1",
    "password": "xxxxxxx",
    "email": "user1@foo.com",
    "emailVerified": false,
    "phoneNumber": "1-000-000-0000",
    "phoneNumberVerified": false,
    "user_metadata": {
      "hobby": "surfing"
    },
    "app_metadata": {
      "plan": "full"
    }
  }
}
```

If you specify `app_metadata` and `user_metadata` in the response object, Auth0 adds this information to the new user.

::: note
Metadata property names must not start with the `$` character or contain the `.` character.
:::

## Testing your Hook

::: note
Executing the code using the Runner requires a save, which means that your original code will be overwritten.
:::

Once you've modified the sample code with the specific scopes of additional claims you'd like added to your Access Tokens, test your Hook using the Runner. The runner simulates a call to the Hook with the appropriate user information body/payload. The following is the sample body that populates the Runner by default (these are the same objects/parameters detailed in the comment at the top of the sample Hook code):

```json
{
  "user": {
    "tenant": "my-tenant",
    "username": "user1",
    "password": "xxxxxxx",
    "email": "user1@foo.com",
    "emailVerified": false,
    "phoneNumber": "1-000-000-0000",
    "phoneNumberVerified": false,
    "user_metadata": {
      "hobby": "surfing"
    },
    "app_metadata": {
      "plan": "full"
    }
  },
  "context": {
    "requestLanguage": "en-us",
    "connection": {
      "id": "con_xxxxxxxxxxxxxxxx",
      "name": "Username-Password-Authentication",
      "tenant": "my-tenant"
    }
  }
}
```

## Example: Add metadata to new users

```js
module.exports = function (user, context, cb) {
  var response = {};

  response.user = {
   user_metadata: { foo: 'bar' },
   app_metadata: { vip: true, score: 7 }
  };

  cb(null, response);
};
```

Using the [test runner](https://webtask.io/docs/editor/runner), we see that the response, reflecting the updated metadata, is as follows:

```json
{
  "user": {
    "user_metadata": {
      "foo": "bar"
    },
    "app_metadata": {
      "vip": true,
      "score": 7
    }
  }
}
```

::: note
The Pre-Registration Hook does not currently pass error messages to any Auth0 APIs.
:::