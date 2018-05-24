---
title: Using the Credentials Exchange Extensibility Point
description: The credentials-exchange extensibility point for use with Hooks
toc: true
beta: true
tags:
    - hooks
    - extensibility-points
    - credentials-exchange
---

# Extensibility Point: Credentials Exchange

The `credentials-exchange` extensibility point allows you to change the scopes and add custom claims to the [Access Tokens](/tokens/access-token) issued by the [Auth0 API's `POST /oauth/token` endpoint](/api/authentication#authorization-code) during runtime.

::: note
Please see [Calling APIs from a Service](/api-auth/grant/client-credentials) for more information on the Client Credentials Grant.
:::

## Types of Claims Available

You can add the following as claims to the issued token:

* The `scope` property of the response object;
* Any properties with namespaced property names:

  * URLs with HTTP or HTTPS schemes
  * URLs with hostnames that *aren't* auth0.com, webtask.io, webtask.run, or the associated subdomain names

The extensibility point will ignore all other response object properties.

::: note
If you need to configure client secrets and access them within your Hook, you can do so using `context.webtask.secrets.SECRET_NAME`.
:::

## How to Implement This

You can implement a [Hook](/hooks#work-with-hooks) using this extensibility point with either the [Dashboard](/hooks/dashboard) or the [Command Line Interface](/hooks/cli). 

For detailed steps on implementing the grant, please refer to [Using Hooks with Client Credentials Grant](/api-auth/tutorials/client-credentials/customize-with-hooks).

### Starter Code and Parameters

After you've created a new Hook that uses the Credentials Exchange extensibility point, you can open up the Hook and edit it using the Webtask Editor embedded in the Dashboard. 

The parameters listed in the comment at the top of the code indicate the Auth0 objects (and the parameters within the objects) that can be passed into and used by the Hook's function. For example, the `client` object comes with the following parameters: client name, client ID, the Auth0 tenant name with which the client is associated, and client metadata. 

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

The callback function `cb` at the end of the sample code is used to signal completion and must not be omitted.

#### Response

The default response object every time you run this Hook is as follows:

```json
{
  "scope": "array of strings"
}
```

### Testing Your Hook

::: note
Executing the code using the Runner requires a save, which means that your original code will be overwritten.
:::

Once you've modified the sample code with the specific scopes of additional claims you'd like added to your Access Tokens, you can test your Hook using the Runner. The runner simulates a call to the Hook with the same body/payload that you would get with a Credentials Exchange. The following is the sample body that populates the Runner by default (these are the same objects/parameters detailed in the comment at the top of the sample Hook code):

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

## Example: Add Scope to the Access Token

This example shows you how to use the Hook to add an additional scope to the scopes already existing on the Access Token.

```js
module.exports = function(client, scope, audience, context, cb) {
    // Scopes to be added
    var access_token = {};

    // Get the scope that's currently on the Access Token
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

## Example: Add a Claim to the Access Token

This example show you have to add a namespaced claim and its value to the Access Token.

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