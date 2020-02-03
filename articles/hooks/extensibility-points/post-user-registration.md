---
title: Post User Registration
description: Learn how hooks can be used with the Post User Registration extensibility point, which is available for database connections and passwordless connections.
beta: true
toc: true
topics:
    - hooks
    - extensibility-points
    - post-user-registration
contentType:
  - how-to
useCase: extensibility-hooks
v2: true
---

# Post User Registration

At the Post User Registration extensibility point, Hooks allow custom actions to be executed after a new user registers an account and is added to the database. For example, you may send a message to Slack or create a record in your customer relationship management (CRM) system.

The Hook added to this extensibility point executes asynchronously with the rest of the Auth0 pipeline, and its outcome does not affect the Auth0 transaction.

The Post User Registration extensibility point is available for [Database Connections](/connections/database) and [Passwordless Connections](/connections/passwordless).

::: note
The `triggerId` for the Post User Registration extensibility point is `post-user-registration`. To learn how to create Hooks for this extensibility point, see [Create New Hooks](/hooks/create).
:::

To learn about other extensibility points, see [Extensibility Points](/hooks/extensibility-points).

## Starter code and parameters

When creating a Hook executed at the Post User Registration extensibility point, you may find the following starter code helpful. Parameters that can be passed into and used by the Hook function are listed at the top of the code sample.

```js
/**
@param {object} user - user being created
@param {string} user.id - user's ID (user GUID without "auth0|" database prefix)
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user's username
@param {string} user.email - user's email
@param {boolean} user.emailVerified - indicates whether email is verified
@param {string} user.phoneNumber - user's phone number
@param {boolean} user.phoneNumberVerified - indicates whether phone number is verified
@param {object} user.user_metadata - user's user metadata
@param {object} user.app_metadata - user's application metadata
@param {object} context - Auth0 context info, such as connection
@param {string} context.requestLanguage - language of the application agent
@param {object} context.connection - connection info
@param {object} context.connection.id - connection ID
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - Hook (webtask) context
@param {function} cb - function (error, response)
*/

module.exports = function (user, context, cb) {
  // Perform any asynchronous actions, such as send notification to Slack.
  cb();
};
```

Please note:

* The callback function (`cb`) at the end of the sample code signals completion and *must* be included.

### Default response

Hooks executed at the Post User Registration extensibility point ignore any response object.

### Starter code response

Once you've customized the starter code, you can test the Hook using the Runner embedded in the Hook Editor. The Runner simulates a call to the Hook with the appropriate body and response. 

<%= include('../_includes/_test_runner_save_warning') %>

When you run a Hook based on the starter code, the response object is:

```json
{
  "user": {
    "tenant": "my-tenant",
    "username": "user1",
    "email": "user1@foo.com",
    "emailVerified": true,
    "phoneNumber": "1-000-000-0000",
    "phoneNumberVerified": true,
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

## Sample script: Integrate with Slack

In this example, we use a Hook to have Slack post a new user's username and email address to a specified channel upon user registration.

```js
module.exports = function (user, context, cb) {

  // Read more about incoming webhooks at https://api.slack.com/incoming-webhooks
  var SLACK_HOOK = 'YOUR SLACK HOOK URL';

  // Post the new user's name and email address to the selected channel
  var slack = require('slack-notify')(SLACK_HOOK);
  var message = 'New User: ' + (user.username || user.email) + ' (' + user.email + ')';
  var channel = '#some_channel';

  slack.success({
   text: message,
   channel: channel
  });

  // Return immediately; the request to the Slack API will continue on the sandbox
  cb();
};
```
