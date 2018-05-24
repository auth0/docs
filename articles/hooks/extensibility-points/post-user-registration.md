---
title: Using the Post-User Registration Extensibility Point
description: The post-user-registration extensibility point for use with Hooks
beta: true
toc: true
tags:
    - hooks
    - extensibility-points   
---

# Extensibility Point: Post-User Registration

For [Database Connections](/connections/database), the `post-user-registration` extensibility point allows you to implement custom actions that execute after a new user registers and is added to the database. [Hooks](/hooks#work-with-hooks) associated with the `post-user-registration` extensibility point execute asynchronously from the actions that are a part of the Auth0 authentication process.

This allows you to implement scenarios including (but not limited to):

* Sending notifications to Slack or via e-mail about the user's new account;
* Creating a new user record in a CRM system.

## How to Implement This

You can implement a [Hook](/hooks#work-with-hooks) using this extensibility point with either the [Dashboard](/hooks/dashboard) or the [Command Line Interface](/hooks/cli). 

### Starter Code and Parameters

After you've created a new Hook that uses the Post-User Registration extensibility point, you can open up the Hook and edit it using the Webtask Editor embedded in the Dashboard. 

The parameters listed in the comment at the top of the code indicate the Auth0 objects (and the parameters within the objects) that can be passed into and used by the Hook's function. For example, the `client` object comes with the following parameters: application name, client ID, the Auth0 tenant name with which the application is associated, and application metadata. 

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

#### Response

The Post-User Registration extensibility point ignores any response object.

### Testing Your Hook

::: note
Executing the code using the Runner requires a save, which means that your original code will be overwritten.
:::

Once you've modified the sample code with the specific scopes of additional claims you'd like added to your Access Tokens, you can test your Hook using the Runner. The runner simulates a call to the Hook with the appropriate user information body/payload. The following is the sample body that populates the Runner by default (these are the same objects/parameters detailed in the comment at the top of the sample Hook code):

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