---
title: Post Change Password
description: Learn how hooks can be used with the Post Change Password extensibility point, which is available for database connections.
beta: true
toc: true
topics:
    - hooks
    - extensibility-points
    - post-change-password
contentType:
    - how-to
useCase: extensibility-hooks
v2: true
---

# Post Change Password

At the Post Change Password extensibility point, Hooks allow custom actions to be executed after a successful user password change, whether initiated by a user for their own password or by a tenant administrator for another user's password. For example, you may send an email to a user to notify them that their password has been changed.

The Hook added to this extensibility point executes asynchronously with the rest of the Auth0 pipeline, and its outcome does not affect the Auth0 transaction.

The Post Change Password extensibility point is available for [Database Connections](/connections/database).

::: note
The `triggerId` for the Post Change Password extensibility point is `post-change-password`. To learn how to create Hooks for this extensibility point, see [Create New Hooks](/hooks/create).
:::

To learn about other extensibility points, see [Extensibility Points](/hooks/extensibility-points).

## Starter code and parameters

When creating a Hook executed at the Post Change Password extensibility point, you may find the following starter code helpful. Parameters that can be passed into and used by the Hook function are listed at the top of the code sample.

```js
/**
@param {object} user - affected user
@param {string} user.id - user's ID
@param {string} user.username - user's username
@param {string} user.email - user's email
@param {string} user.last_password_reset - date/time the user's password was last changed
@param {object} context - Auth0 context info, such as connection
@param {object} context.connection - connection info
@param {object} context.connection.id - connection ID
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - Hook (webtask) context
@param {function} cb - function (error)
**/

module.exports = function (user, context, cb) {
  // Perform any asynchronous actions, e.g. send notification to Slack.
  cb();
};
```

Please note: 

* The callback function (`cb`) at the end of the sample code signals completion and *must* be included.

### Default response

Hooks executed at the Post Change Password extensibility point ignore any response object. If an error is returned, a tenant log entry is created, but this does not affect the Auth0 transaction.

### Starter code response

Once you've customized the starter code, you can test the Hook using the Runner embedded in the Hook Editor. The Runner simulates a call to the Hook with the appropriate body and response. 

<%= include('../_includes/_test_runner_save_warning') %>

When you run a Hook based on the starter code, the response object is:

```json
{
  "user": {
    "id": "abc123",
    "username": "user1",
    "email": "user1@foo.com",
    "last_password_reset": "2019-02-27T14:14:29.206Z"
  },
  "context": {
    "connection": {
      "id": "con_xxxxxxxxxxxxxxxx",
      "name": "Username-Password-Authentication",
      "tenant": "my-tenant"
    }
  }
}
```

## Sample script: Send a notification email upon password change

In this example, we use a Hook to have SendGrid send a notification email to the user upon password change.

```js
module.exports = function (user, context, cb) {

  const request = require('request');

  // https://sendgrid.api-docs.io/v3.0/mail-send
  request.post({
    url: 'https://api.sendgrid.com/v3/mail/send',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    json: {
      personalizations: [{
        to: [{
          email: user.email
        }]
      }],
      from: {
        email: 'admin@example.com'
      },
      subject: 'Your password was changed',
      content: [{
        type: 'text/plain',
        value: 'The password for your ' + context.connection.name + ' account ' + user.email + ' was recently changed.'
      }]
    }
  }, function (err, resp, body) {
    if (err || resp.statusCode !== 202) {
      return cb(err || new Error(body.errors[0].message));
    }

    cb();
  });
};
```
