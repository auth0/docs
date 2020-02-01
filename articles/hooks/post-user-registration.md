---
description: Learn about the Post User Registration Hook available for Database Connections and Passwordless Connections.
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

# Post User Registration Hook

The Post User Registration Hook allows custom actions to be executed after a new user registers an account and is added to the database. This hook executes asynchronously with the rest of the Auth0 pipeline and its outcome does not affect the Auth0 transaction.

With the Post User Registration Hook, you can do things like send a chat notification about the user's new account or create a new record in a customer relationship management system.

The Post User Registration Hook is available for both [Database Connections](/connections/database) and [Passwordless Connections](/connections/passwordless). You can create a new Post User Registration Hook using the [Dashboard](/hooks/create) or the [Command Line Interface](/hooks/create).

## Starter code and parameters

After you've created a new Hook that uses the Post-User Registration extensibility point, open up the Hook and edit it using the Webtask Editor embedded in the Dashboard. 

The parameters listed in the comment at the top of the code indicate the Auth0 objects (and the parameters within the objects) that can be passed into and used by the Hook's function. 

```js
/**
@param {object} user - The user being created
@param {string} user.id - user id (user GUID without "auth0|" database prefix)
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user name
@param {string} user.email - email
@param {boolean} user.emailVerified - is email verified?
@param {string} user.phoneNumber - phone number
@param {boolean} user.phoneNumberVerified - is phone number verified?
@param {object} user.user_metadata - user metadata
@param {object} user.app_metadata - application metadata
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
  // Perform any asynchronous actions, such as send notification to Slack.
  cb();
};
```

The callback function `cb` at the end of the sample code is used to signal completion and must not be omitted (even though the extensibility point ignores response objects).

### Response

The Post-User Registration extensibility point ignores any response object.

## Testing Hooks

::: note
Executing the code using the Runner requires a save, which means that the original code will be overwritten.
:::

Once you've modified the sample code with the specific <dfn data-key="scope">scopes</dfn> of additional claims you'd like added to your <dfn data-key="access-token">Access Tokens</dfn>, test Hooks using the Runner. The runner simulates a call to the Hook with the appropriate user information body/payload. The following is the sample body that populates the Runner by default (these are the same objects/parameters detailed in the comment at the top of the sample Hook code):

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

## Example: Integrate with Slack

```js
module.exports = function (user, context, cb) {

  // Read more about incoming webhooks at https://api.slack.com/incoming-webhooks
  var SLACK_HOOK = 'YOUR SLACK HOOK URL';

  // Post the new user's name and email address to the selected channel
  var slack = require('slack-notify')(SLACK_HOOK);
  var message = 'New User: ' + (user.name || user.email) + ' (' + user.email + ')';
  var channel = '#some_channel';

  slack.success({
   text: message,
   channel: channel
  });

  // Return immediately; the request to the Slack API will continue on the sandbox
  cb();
};
```