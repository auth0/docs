---
title: Client Credentials Exchange
description: Learn how hooks can be used with the Client Credentials Exchange extensibility point, which is available for database connections and passwordless connections.
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

At the Client Credentials Exchange extensibility point, Hooks allow custom actions to be executed when an <dfn data-key="access-token">Access Token</dfn> is issued through the Authentication API [`POST /oauth/token` endpoint](/api/authentication#client-credentials-flow) using the [Client Credentials Flow](/flows/concepts/client-credentials). For example, you may deny the token from being issued, add custom claims to the Access Token, or modify its <dfn data-key="scope">scopes</dfn>.

Hooks at this extensibility point are blocking (synchronous), which means they execute as part of the trigger's process and will prevent the rest of the Auth0 pipeline from running until the Hook is complete.

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

  // Deny the token and respond with an OAuth2 error response
  // if (denyExchange) {
  //   // To return an HTTP 400 with { "error": "invalid_scope", "error_description": "Not authorized for this scope." }
  //   return cb(new InvalidScopeError('Not authorized for this scope.'));
  //
  //   // To return an HTTP 400 with { "error": "invalid_request", "error_description": "Not a valid request." }
  //   return cb(new InvalidRequestError('Not a valid request.'));
  //
  //   // To return an HTTP 500 with { "error": "server_error", "error_description": "A server error occurred." }
  //   return cb(new ServerError('A server error occurred.'));
  // }

  cb(null, access_token);
};
```

Please note:

* The callback function (`cb`) at the end of the sample code signals completion and *must* be included.
- The line `access_token.scope = scope` ensures that all granted <dfn data-key="scope">scopes</dfn> will be present in the <dfn data-key="access-token">Access Token</dfn>. Removing it will reset all scopes, and the token will include only any scopes you might add with the script.

### Default response

When you run a Hook executed at the Client Credentials Exchange extensibility point, the default response object is:

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

## Sample script: Raise an Error or Deny an Access Token

In this example, we use custom Error objects to generate OAuth2 Error Responses. ([See OAuth2 RFC - Section 5.2](https://tools.ietf.org/html/rfc6749#section-5.2))

If a plain JavaScript error is returned in the callback, such as:

```js
module.exports = function(client, scope, audience, context, cb) {
    // Callback to indicate completion and to return new claim
    cb(new Error("Unknown error occurred.");
  };
```

Then when you request a `client_credentials` grant from the `/oauth/token` endpoint, Auth0 will respond with:

```
HTTP 500
{ "error": "server_error", "error_description": "Unknown error occurred." }
```

However, if you like additional control over the OAuth2 Error Response, three custom Error objects are available to use instead. They are:

### InvalidScopeError

```js
module.exports = function(client, scope, audience, context, cb) {
    const invalidScope = ...; // determine if scope is valid

    if(invalidScope) {
      cb(new InvalidScopeError("Scope is not permitted."));
    }
  };
```

Then when you request a `client_credentials` grant is from the `/oauth/token` endpoint, Auth0 will respond with:

```
HTTP 400
{ "error": "invalid_scope", "error_description": "Scope is not permitted." }
```

### InvalidRequestError

```js
module.exports = function(client, scope, audience, context, cb) {
    const invalidRequest = ...; // determine if request is valid

    if(invalidRequest) {
      cb(new InvalidRequestError("Bad request."));
    }
  };
```

Then when you request a `client_credentials` grant from the `/oauth/token` endpoint, Auth0 will respond with:

```
HTTP 400
{ "error": "invalid_request", "error_description": "Bad request." }
```

### ServerError

```js
module.exports = function(client, scope, audience, context, cb) {
    callOtherService(function(err, response) {
      if(err) {
        return cb(new ServerError("Error calling remote system: " + err.message));
      }
    });
  };
```

Then when you request a `client_credentials` grant from the `/oauth/token` endpoint, Auth0 will respond with:

```
HTTP 400
{ "error": "server_error", "error_description": "Error calling remote system: ..." }
```

::: note
Currently, the behavior of the built-in JavaScript `Error` class and `ServerError` is identical, but the `ServerError` class allows you to be explicit about the OAuth2 error that will be returned.
:::
