---
description: The post-user-registration extensibility point for use with Auth0 Hooks
---

# Extensibility Point: `post-user-registration`

The `post-user-registration` extensibility point allows you to implement custom actions that execute after a new user registers and is added to the database. Hooks associated with the `post-user-registration` extensibility point execute asynchronously from the actions that are a part of the Auth0 authentication process.

This allows you to implement scenarios including:

* Sending notifications to Slack or via e-mail about the user's new account;
* Creating a new user record in SalesForce.

You can include the following in the body of your request:

```json
{
  "user": {
    "id": "string",
    "tenant": "string",
    "username": "string",
    "email": "string",
    "emailVerified": "boolean",
    "phoneNumber": "string",
    "phoneNumberVerified": "boolean",
    "user_metadata": "object",
    "app_metadata": "object"
  },
  "context": {
    "requestLanguage": "string",
    "connection": {
      "id": "string",
      "name": "string",
      "tenant": "string"
    }
  }
}
```

While Auth0 logs the response body, the response doesn't affect user processing, so it can be any valid JSON object.

The newly-created user's profile will include `user_metadata` and/or `app_metadata` if specified in the response body.

## Starter Code

```js
module.exports = function (user, context, cb) {
  // Send message to Slack etc.
  cb(null, { slack_notified: true });
};
```
