---
description: The password-exchange extensibility point for use with Auth0 Hooks
---

# Extensibility Point: Password Exchange

The `password-exchange` extensibility point allows you to change the scopes and add custom claims to the tokens issued by the Auth0 API's `POST /oauth/token` endpoint using `grant_type=password`.

## Starter Code

```js
module.exports = function (user, context, cb) {
  // Send message to Slack etc.
  cb(null, { slack_notified: true });
};
```

## Parameters

* **audience** [string] - audience claim of the token
* **cb** [function] - function (parameters: error, accessTokenClaims)
* **client** [object] - information about the Client
* **client.id** [string] - Client ID
* **client.metadata** [object] - Client metadata
* **client.name** [string] - name of the Client
* **client.tenant** [string] - name of the Auth0 Tenant
* **context** [object] - additional authorization context
* **context.webtask** [object] - the context in which the Webtask runs
* **scope** [array|undefined] - array of strings representing the scope claim *or* undefined
* **user** [object] - the logged-in user
* **user.app_metadata** [object] - application metadata
* **user.displayName** - the displayed name of the user
* **user.id** [string] - the user's unique identifier
* **user.tenant** [string] - the Auth0 Tenant name
* **user.user_metadata** [object] - user metadata
