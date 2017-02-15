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

The default response object is as follows:

```json
{
  "accessToken": {
    "scope": ["array", "of", "strings"],
    "claim1": "value1",
    "claim2": "value2"
  },
  "idToken": {
    "claimA": "valueA",
    "claimB": "valueB"
  }
}
```

You can include one or both of the two optional properties in the response object:

* `accessToken`: the token for claims corresponding to `access_token`, including the scope property
* `idToken`: the token for claims corresponding to `id_token`

Property names for custom claims must meet the following requirements:

* They must be properly namespaced. You must use a valid URL with HTTP/HTTPS schemes as the prefix (such as `https://example.com/someClaimName`).
* The hostname of the URL **cannot** be:

  * auth0.com
  * webtask.io
  * webtask.run

  Additionally, you cannot use any subdomains of the above domains.

The extensibility point will ignore all other response object properties.

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
