---
description: The credentials-exchange extensibility point for use with Hooks
---

# Extensibility Point: Credentials Exchange

The `credentials-exchange` extensibility point allows you to change the scopes and add custom claims to the tokens issued by the Auth0 API's `POST /oauth/token` endpoint.

::: panel-info Client Credentials Grant
Please see [Calling APIs from a Service](/api-auth/grant/client-credentials) for more information on the Client Credentials Grant.
:::

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

The default response object is as follows:

```json
{
  "scope": "array of strings"
}
```

You can add the following as claims to the issued token:

* The `scope` property of the response object;
* Any properties with namespaced property names:

  * URLs with HTTP or HTTPS schemes
  * URLs with hostnames that *aren't* auth0.com, webtask.io, webtask.run, or the associated subdomain names

The extensibility point will ignore all other response object properties.

## How to implement this

You can implement a Hook for this extensibility point using either the Dashboard or the Auth0 CLI. For detailed steps refer to [Using Hooks with Client Credentials Grant](/api-auth/tutorials/client-credentials/customize-with-hooks).

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
