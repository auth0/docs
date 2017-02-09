---
description: The password-exchange extensibility point for use with Auth0 Hooks
---

# Extensibility Point: `password-exchange`

The `password-exchange` extensibility point allows you to change the scopes and add custom claims to the tokens issued by the Auth0 API's `POST /oauth/token` endpoint using `grant_type=password`.

You can include the following in the body of your request:

```json
{
  "audience": "string",
  "scope": "array of strings",
  "user": {
    "tenant": "string",
    "id": "string",
    "displayName": "string",
    "user_metadata": "object",
    "app_metadata": "object"
  },
  "client": {
    "tenant": "string",
    "id": "string",
    "name": "string",
    "metadata": "object"
  }
}
```

The body of the response is as follows:

```json
{
  "scope": "array of strings"
}
```

In addition to the `scope` property, the response may include properties that:

* Are URLs with `http` or `https` schemes
* Have hostnames (including subdomains) other than:
  * `auth0.com`
  * `webtask.io`
  * `webtask.run`

The extensibility point will add no other properties as claims to the issued token.

## Starter Code

```js
module.exports = function (user, context, cb) {
  // Send message to Slack etc.
  cb(null, { slack_notified: true });
};
```
