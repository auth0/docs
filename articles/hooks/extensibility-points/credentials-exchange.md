---
description: The credentials-exchange extensibility point for use with Hooks
toc: true
beta: true
---

# Extensibility Point: Credentials Exchange

The `credentials-exchange` extensibility point allows you to change the scopes and add custom claims to the [access tokens](/tokens/access-token) issued by the [Auth0 API's `POST /oauth/token` endpoint](/api/authentication#authorization-code).

::: note
Please see [Calling APIs from a Service](/api-auth/grant/client-credentials) for more information on the Client Credentials Grant.
:::

## How to Implement This

You can implement a Hook for this extensibility point using either the Dashboard or the Auth0 CLI. For detailed steps refer to [Using Hooks with Client Credentials Grant](/api-auth/tutorials/client-credentials/customize-with-hooks).

### Types of Claims

You can add the following as claims to the issued token:

* The `scope` property of the response object;
* Any properties with namespaced property names:

  * URLs with HTTP or HTTPS schemes
  * URLs with hostnames that *aren't* auth0.com, webtask.io, webtask.run, or the associated subdomain names

The extensibility point will ignore all other response object properties.

::: note
If you need to configure client secrets and access them within your Hook, you can do so using `context.webtask.secrets.SECRET_NAME`.
:::

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

The default response object every time you run this Hook is as follows:

```json
{
  "scope": "array of strings"
}
```

### Example: Add Scope to the Access Token

This example shows you how to use the Hook to add an additional scope to the scopes already existing on the access token.

```js
module.exports = function(client, scope, audience, context, cb) {
    // Scopes to be added
    var access_token = {};

    // Get the scope that's currently on the access token
    // and add it to the object we're working with
    access_token.scope = scope;

    // Append the `read:resource` scope
    access_token.scope.push('read:resource');

    // Callback to indicate completion and to return new
    // array of scopes
    cb(null, access_token);
};
```

Using the [test runner](https://webtask.io/docs/editor/runner), we see that the response is as follows:

```json
{
  "scope": [
    "read:connections",
    "read:resource"
  ]
}
```

### Example: Add a Claim to the Access Token

This example show you have to add a namespaced claim and its value to the access token.

```js
module.exports = function(client, scope, audience, context, cb) {
    // Claims to be added
    var access_token = {};

    // New claim to add to the token
    access_token['https://example.com/foo'] = 'bar';

    // Callback to indicate completion and to return new claim
    cb(null, access_token);
  };
```

Using the [test runner](https://webtask.io/docs/editor/runner), we see that the response is as follows:

```json
{
  "https://example.com/foo": "bar"
}
```
