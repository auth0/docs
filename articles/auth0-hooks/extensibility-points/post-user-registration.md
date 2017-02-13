---
description: The post-user-registration extensibility point for use with Auth0 Hooks
---

# Extensibility Point: Post-User Registration

The `post-user-registration` extensibility point allows you to implement custom actions that execute after a new user registers and is added to the database. Hooks associated with the `post-user-registration` extensibility point execute asynchronously from the actions that are a part of the Auth0 authentication process.

This allows you to implement scenarios including (but not limited to):

* Sending notifications to Slack or via e-mail about the user's new account;
* Creating a new user record in SalesForce.

## Starter Code

```js
module.exports = function (user, context, cb) {
  // Send message to Slack etc.
  cb(null, { slack_notified: true });
};
```

:::panel-warning Response Body
The Post-User Registration extensibility point ignores any response object.
:::

## Parameters

* **cb** [function] - function (parameters: error, accessTokenClaims)
* **context** [object] - Auth0 Connection and other context information
* **context.connection** [object] - information about the Auth0 Connection
* **context.connection.id** [object] - Connection ID
* **context.connection.name** [object] - Connection name
* **context.connection.tenant** [object] - Connection Tenant
* **context.requestLanguage** [string] - language of the Client agent
* **context.webtask** [object] - the context in which the Webtask runs
* **user** [object] - the logged-in user
* **user.app_metadata** [object] - application metadata
* **user.email** [string] - user's email address
* **user.emailVerified** [Boolean] - indicator for whether user's email has been verified
* **user.id** [string] - the user's unique identifier
* **user.phone** [string] - user's phone number
* **user.phoneVerified** [Boolean] - indicator for whether user's phone number has been verified
* **user.tenant** [string] - the Auth0 Tenant name
* **user.user_metadata** [object] - user metadata
* **user.username** [string] - username
