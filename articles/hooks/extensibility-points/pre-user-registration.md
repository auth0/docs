---
title: Pre-User Registration
description: Learn how hooks can be used with the Pre-User Registration extensibility point, which is available for database connections and passwordless connections.
toc: true
topics:
    - hooks
    - extensibility-points
    - pre-user-registration
contentType:
  - how-to
useCase: extensibility-hooks
v2: true
---

# Pre-User Registration

At the Pre-User Registration extensibility point, Hooks allow custom actions to be executed when a new user is created. For example, you may add custom `app_metadata` or `user_metadata` to the newly-created user, or even prevent the creation of the user in the database.

Hooks at this extensibility point are blocking (synchronous), which means they execute as part of the trigger's process and will prevent the rest of the Auth0 pipeline from running until the Hook is complete.

The Pre-User Registration extensibility point is available for [Database Connections](/connections/database) and [Passwordless Connections](/connections/passwordless).

::: note
The `triggerId` for the Pre-User Registration extensibility point is `pre-user-registration`. To learn how to create Hooks for this extensibility point, see [Create New Hooks](/hooks/create).
:::

To learn about other extensibility points, see [Extensibility Points](/hooks/extensibility-points).

## Starter code and parameters

When creating a Hook executed at the Pre-User Registration extensibility point, you may find the following starter code helpful. Parameters that can be passed into and used by the Hook function are listed at the top of the code sample.

```js
/**
@param {object} user - user being created
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user's username
@param {string} user.password - user's password
@param {string} user.email - user's email
@param {boolean} user.emailVerified - indicates whether email is verified
@param {string} user.phoneNumber - user's phone number
@param {boolean} user.phoneNumberVerified - indicates whether phone number is verified
@param {object} context - Auth0 context info, such as connection
@param {string} context.renderLanguage - language of the signup flow
@param {string} context.request.ip - ip address
@param {string} context.request.language - language of the application agent
@param {object} context.connection - connection info
@param {object} context.connection.id - connection ID
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - Hook (webtask) context
@param {function} cb - Function (error, response)
*/

module.exports = function (user, context, cb) {
  var response = {};

  // Add user or app metadata to the newly-created user
  // response.user = {
  //   user_metadata: { foo: 'bar' },
  //   app_metadata: { vip: true, score: 7 }
  // };

  response.user = user;

  cb(null, response);
};
```

Please note:

* The callback function (`cb`) at the end of the sample code signals completion and *must* be included.

### Default response

When you run a Hook executed at the Pre-User Registration extensibility point, the default response object is:

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

::: note
Hooks executed at the Pre-User Registration extensibility point do not pass error messages to any Auth0 APIs.
:::

### Starter code response

Once you've customized the starter code, you can test the Hook using the Runner embedded in the Hook Editor. The Runner simulates a call to the Hook with the appropriate body and response.

<%= include('../_includes/_test_runner_save_warning') %>

When you run a Hook based on the starter code, the response object is:

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
    "request": {
        "language": "en-us",
        "ip": "123.123.123.123"
    },
    "connection": {
      "id": "con_xxxxxxxxxxxxxxxx",
      "name": "Username-Password-Authentication",
      "tenant": "my-tenant"
    }
  }
}
```

## Sample script: Add metadata to new users

In this example, we use a Hook to add metadata to new users upon creation.

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

### Response

When we run this Hook, the response object is:

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

## Sample script: Customize the error message and language for user messages

In this example, we use a Hook to prevent a user from registering, then return a custom error message in our tenant logs and show a custom, translated error message to the user when they are denied. To return the user message and use the translation functionality, your tenant must be configured to use the [Universal Login - New Experience](/universal-login/new).

```js
module.exports = function (user, context, cb) {
  const isUserDenied = ...; // determine if a user should be allowed to register

  if (isUserDenied) {
    const LOCALIZED_MESSAGES = {
      en: 'You are not allowed to register.',
      es: 'No tienes permitido registrarte.'
    };

    const localizedMessage = LOCALIZED_MESSAGES[context.renderLanguage] || LOCALIZED_MESSAGES['en'];
    return cb(new PreUserRegistrationError('Denied user registration in Pre-User Registration Hook', localizedMessage));
  }
};
```

Please note:
* The custom `PreUserRegistrationError` class allows you to control the message seen by the user who is attempting to register.
* The first parameter passed to `PreUserRegistrationError` controls the error message that appears in your tenant logs.
* The second parameter controls the error message seen by the user who is attempting to register. In this example, the `context.renderLanguage` parameter generates a user-facing message in the appropriate language for the user. You can use these parameters only if your tenant is configured to use the [Universal Login - New Experience](/universal-login/new).
