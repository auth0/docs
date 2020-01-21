---
description: Learn about the Client Credentials Exchange Hook available for Database Connections.
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

# Client Credentials Exchange Hook

The Client Credentials Exchange Hook lets you modify the <dfn data-key="scope">scopes</dfn> and add custom claims to <dfn data-key="access-token">Access Tokens</dfn> issued from the [`POST /oauth/token` Auth0 API](/api/authentication#client-credentials-flow) during runtime.

The Client Credentials Exchange Hook is available for [Database Connections](/connections/database) and [Passwordless Connections](/connections/passwordless). You can create a new Post Change Password hook using the [Dashboard](/hooks/guides/create-hooks-using-dashboard) or the [Command Line Interface](/hooks/guides/create-hooks-using-cli).

::: note
For more information on the Client Credentials Grant check out:

* [Client Credentials Flow](/flows/concepts/client-credentials)
* [Using Hooks with Client Credentials Grant](/api-auth/tutorials/client-credentials/customize-with-hooks).
:::

## Claim types

You can add the following as claims to the issued token:

* The `scope` property of the response object
* Any properties with [namespaced](/tokens/concepts/claims-namespacing) property names

The extensibility point will ignore all other response object properties.

::: note
If you need to configure client secrets and access them within Hooks, use `context.webtask.secrets.SECRET_NAME`.
:::

## Starter code and parameters

After you've created a new Client Credentials Exchange Hook, open up the Hook and edit it using the Webtask Editor embedded in the Dashboard. 

The parameters listed in the comment at the top of the code indicate the Auth0 objects and their parameters that can be passed into and used by the Hook's function. For example, the `client` object comes with the following parameters: client name, client ID, the Auth0 tenant name with which the client is associated, and client metadata. 

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
  access_token.scope = scope; // do not remove this line

  // Modify scopes or add extra claims
  // access_token['https://example.com/claim'] = 'bar';
  // access_token.scope.push('extra');

  cb(null, access_token);
};
```

Pay attention to the following:
- The callback function `cb` at the end of the sample code is used to signal completion and must not be omitted.
- The line `access_token.scope = scope` ensures that all granted <dfn data-key="scope">scopes</dfn> will be present in the <dfn data-key="access-token">Access Token</dfn>. Removing it will reset all scopes and the token will include only any additional ones you might add with the script.

### Response

The default response object every time you run this Hook is as follows:

```json
{
  "scope": "array of strings"
}
```

## Testing Hooks

::: note
Executing the code using the Runner requires a save, which means that the original code will be overwritten.
:::

Once you've modified the sample code with the specific scopes of additional claims you'd like added to your Access Tokens, you can test the hook using the Runner. The Runner simulates a call to the Hook with the same body/payload that you would get with a Credentials Exchange. 

The following is the sample body that populates the Runner by default (these are the same objects/parameters detailed in the comment at the top of the sample Hook code):

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

## Example: add an additional scope to the Access Token

This example shows you how to use the Hook to add an additional [scope](/scopes) to the scopes already existing on the Access Token.

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

Using the [test runner](https://webtask.io/docs/editor/runner), we see that the response is as follows:

```json
{
  "scope": [
    "read:connections",
    "read:resource"
  ]
}
```

## Example: add a claim to the Access Token

This example shows you how to add a [namespaced](/tokens/guides/create-namespaced-custom-claims) claim and its value to the Access Token.

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