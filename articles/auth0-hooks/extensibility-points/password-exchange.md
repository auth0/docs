---
description: The password-exchange extensibility point for use with Auth0 Hooks
---

# Extensibility Point: Password Exchange

The `password-exchange` extensibility point allows you to change the scopes and add custom claims to the tokens issued by the Auth0 API's `POST /oauth/token` endpoint using `grant_type=password`.

## Starter Code

```js
module.exports = function (user, client, scope, audience, context, cb) {
  var access_token = {};
  access_token.scope = scope;
  // Modify scopes or add extra claims
  // access_token['https://example.com/claim'] = 'bar';
  // access_token.scope.push('extra');
  cb(null, access_token);
};
```

The default response body is as follows:

```json
{
  "scope": "array of strings"
}
```

You can add the following as claims to the issued token:

* The `scope` property of the response body;
* Any properties with namespaced property names:

  * URLs with HTTP or HTTPS schemes
  * URLs with hostnames that *aren't* auth0.com, webtask.io, webtask.run, or the associated subdomain names

The extensibility point will ignore all other response properties.

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
* **user.user_metadata** [object] - user metadata
* **user.tenant** [string] - the Auth0 Tenant name
