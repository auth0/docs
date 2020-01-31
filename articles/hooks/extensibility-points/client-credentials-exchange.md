---
title: Client Credentials Exchange
description: Learn how hooks can be used with the Client Credentials Exchange extensibility point, which is available for database connections and passwordless connections.
beta: true
toc: true
topics:
    - hooks
    - extensibility-points
    - client-credentials-exchange
    - credentials-exchange
contentType:
  - how-to
useCase: extensibility-hooks
v2: true
---

# Client Credentials Exchange

At the Client Credentials Exchange extensibility point, Hooks allow custom actions to be executed after an <dfn data-key="access-token">Access Token</dfn> is issued through the Authentication API [`POST /oauth/token` endpoint](/api/authentication#client-credentials-flow) using the [Client Credentials Flow](/flows/concepts/client-credentials). For example, you may add custom claims to the Access Token or modify its <dfn data-key="scope">scopes</dfn>.

The Client Credentials Exchange extensibility point is available for [Database Connections](/connections/database) and [Passwordless Connections](/connections/passwordless).

::: note
The `triggerId` for the Client Credentials Exchange extensibility point is `credentials-exchange`. To learn how to create Hooks for this extensibility point, see [Create New Hooks](/hooks/create).
:::

To learn about other extensibility points, see [Extensibility Points](/hooks/extensibility-points).

## Starter code and parameters

When creating a Hook executed at the Client Credentials Exchange extensibility point, you may find the following starter code helpful. Parameters that can be passed into and used by the Hook function are listed at the top of the code sample.

```js
/**
@param {object} client - client information
@param {string} client.name - client name
@param {string} client.id - client ID
@param {string} client.tenant - Auth0 tenant name
@param {object} client.metadata - client metadata
@param {array|undefined} scope - either an array of strings representing the token's scope claim, or undefined
@param {string} audience - token's audience claim
@param {object} context - Auth0 context info
@param {object} context.webtask - Hook (webtask) context
@param {function} cb - function (error, accessTokenClaims)
*/

module.exports = function(client, scope, audience, context, cb) {
  var access_token = {};
  access_token.scope = scope; // do not remove this line

  // Modify scopes or add extra claims
  // access_token['https://example.com/claim'] = 'bar';
  // access_token.scope.push('extra');

  cb(null, access_token);
};
```

Please note:

* The callback function (`cb`) at the end of the sample code signals completion and *must* be included.
- The line `access_token.scope = scope` ensures that all granted <dfn data-key="scope">scopes</dfn> will be present in the <dfn data-key="access-token">Access Token</dfn>. Removing it will reset all scopes, and the token will include only any scopes you might add with the script.

### Default response

When you run a Hook executed at the Client Crentials Exchange extensibility point, the default response object is:

```json
{
  "scope": "array of strings"
}
```

### Starter code response

Once you've customized the starter code with your scopes and additional claims, you can test the Hook using the Runner embedded in the Hook Editor. The Runner simulates a call to the Hook with the same body and response that you would get with a Client Credentials Exchange. 

<%= include('../_includes/_test_runner_save_warning') %>

When you run a Hook based on the starter code, the response object is:

```json
{
  "audience": "https://my-tenant.auth0.com/api/v2/",
  "client": {
    "id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "name": "client-name",
    "tenant": "my-tenant",
    "metadata": {
      "plan": "full"
    }
  },
  "scope": [
    "read:connections"
  ]
}
```

## Sample script: Add an additional scope to the Access Token

In this example, we use a Hook to add an additional [scope](/scopes) to those already existing for the Access Token.

```js
module.exports = function(client, scope, audience, context, cb) {
    // Scopes to be added
    var access_token = {};

    // Get the scope that's currently on the Access Token
    // and add it to the object we're working with
    // Do not remove this line!
    access_token.scope = scope;

    // Append the `read:resource` scope
    access_token.scope.push('read:resource');

    // Callback to indicate completion and to return new
    // array of scopes
    cb(null, access_token);
};
```

### Response

When we run this Hook, the response object is:

```json
{
  "scope": [
    "read:connections",
    "read:resource"
  ]
}
```

## Sample script: Add a claim to the Access Token

In this example, we add a [namespaced](/tokens/guides/create-namespaced-custom-claims) custom claim and its value to the Access Token.

You can add the following as claims to the issued token:

* The `scope` property of the response object
* Any properties with [namespaced](/tokens/concepts/claims-namespacing) property names

The extensibility point will ignore all other response object properties.

<%= include('../_includes/_access_hook_secrets') %>

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

### Response

When we run this Hook, the response object is:

```json
{
  "https://example.com/foo": "bar"
}
```