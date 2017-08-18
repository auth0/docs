---
description: The post-user-registration extensibility point for use with Hooks
beta: true
---

# Extensibility Point: Post-User Registration

For [Database Connections](/connections/database), the `post-user-registration` extensibility point allows you to implement custom actions that execute after a new user registers and is added to the database. Hooks associated with the `post-user-registration` extensibility point execute asynchronously from the actions that are a part of the Auth0 authentication process.

This allows you to implement scenarios including (but not limited to):

* Sending notifications to Slack or via e-mail about the user's new account;
* Creating a new user record in a CRM system.

## Starter Code and Parameters

```js
/**
@param {object} user - The user being created
@param {string} user.id - user id
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user name
@param {string} user.email - email
@param {boolean} user.emailVerified - is e-mail verified?
@param {string} user.phoneNumber - phone number
@param {boolean} user.phoneNumberVerified - is phone number verified?
@param {object} user.user_metadata - user metadata
@param {object} user.app_metadata - application metadata
@param {object} context - Auth0 connection and other context info
@param {string} context.requestLanguage - language of the client agent
@param {object} context.connection - information about the Auth0 connection
@param {object} context.connection.id - connection id
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - webtask context
@param {function} cb - function (error, response)
*/
module.exports = function (user, context, cb) {
  // Perform any asynchronous actions, e.g. send notification to Slack.
  cb();
};
```

:::panel-warning Response Object
The Post-User Registration extensibility point ignores any response object.
:::

### Example: Integrate with Slack

```js
module.exports = function (user, context, cb) {

  // Get your Slack's hook URL from https://slack.com/services/10525858050
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
  cb(null, user, context);
};
```
