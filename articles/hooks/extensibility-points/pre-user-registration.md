---
title: Using the Pre-User Registration Extensibility Point
description: The pre-user-registration extensibility point for use with Hooks
toc: true
beta: true
tags:
    - hooks
    - extensibility-points
---

# Extensibility Point: Pre-User Registration

For [Database Connections](/connections/database), the `pre-user-registration` extensibility point allows you to add custom `app_metadata` or `user_metadata` to a newly-created user.

This allows you to implement scenarios such as setting conditional [metadata](/metadata) on users that do not exist yet.

## How to Implement This

You can implement a [Hook](/hooks#work-with-hooks) using this extensibility point with either the [Dashboard](/hooks/dashboard) or the [Command Line Interface](/hooks/cli). 

## Starter Code and Parameters

After you've created a new Hook that uses the Pre-User Registration extensibility point, you can open up the Hook and edit it using the Webtask Editor embedded in the Dashboard. 

The parameters listed in the comment at the top of the code indicate the Auth0 objects (and the parameters within the objects) that can be passed into and used by the Hook's function. For example, the `client` object comes with the following parameters: application name, client ID, the Auth0 tenant name with which the application is associated, and application metadata. 

```js
/**
@param {object} user - The user being created
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user name
@param {string} user.password - user's password
@param {string} user.email - email
@param {boolean} user.emailVerified - is e-mail verified?
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

## Testing Your Hook

::: note
Executing the code using the Runner requires a save, which means that your original code will be overwritten.
:::

Once you've modified the sample code with the specific scopes of additional claims you'd like added to your Access Tokens, you can test your Hook using the Runner. The runner simulates a call to the Hook with the appropriate user information body/payload. The following is the sample body that populates the Runner by default (these are the same objects/parameters detailed in the comment at the top of the sample Hook code):

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

## Example: Add Metadata to New Users

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