---
description: The client-credentials-exchange extensibility point for use with Auth0 Hooks
---

# Extensibility Point: Client Credentials Exchange

The `client-credentials-exchange` extensibility point allows you to change the scopes and add custom claims to the tokens issued by the Auth0 API's `POST /oauth/token` endpoint.

## Starter Code

```js
module.exports = function(client, scope, audience, context, cb) {
    var access_token = {};
    access_token.scope = scope;
    // Modify scopes or add extra claims
    // access_token['https://example.com/claim'] = 'bar';
    // access_token.scope.push('extra');
    cb(null, access_token);
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
