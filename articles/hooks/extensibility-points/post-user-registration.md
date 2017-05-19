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
@param {object} client - information about the client
@param {string} client.name - name of client
@param {string} client.id - client id
@param {string} client.tenant - Auth0 tenant name
@param {object} client.metadata - client metadata
@param {array|undefined} scope - array of strings representing the scope claim or undefined
@param {string} audience - token's audience claim
@param {object} context - additional authorization context
@param {object} context.webtask - webtask context
@param {function} cb - function (error, accessTokenClaims)
*/
module.exports = function(client, scope, audience, context, cb) {
  var access_token = {};
  access_token.scope = scope;

  // Modify scopes or add extra claims
  // access_token['https://example.com/claim'] = 'bar';
  // access_token.scope.push('extra');

  cb(null, access_token);
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
