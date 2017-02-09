---
description: The client-credentials-exchange extensibility point for use with Auth0 Hooks
---

# Extensibility Point: `client-credentials-exchange`

The `client-credentials-exchange` extensibility point allows you to change the scopes and add custom claims to the tokens issued by the Auth0 API's `POST /oauth/token` endpoint.

You can include the following in the body of your request:

```json
{
  "audience": "string",
  "client": {
    "name": "string",
    "id": "string",
    "metadata": "object",
    "tenant": "string"
  },
  "scope": "array of strings"
}
```

The body of the response is as follows:

```json
{
  "scope": "array of strings"
}
```

In addition to the `scope` property, the response may include properties that:

* Are URLs with `http` or `https` schemes
* Have hostnames (including subdomains) other than:
  * `auth0.com`
  * `webtask.io`
  * `webtask.run`

The extensibility point will add no other properties as claims to the issued token.

## Starter Code

```js
module.exports = function (client, scope, audience, context cb) {
  // call the callback with an error to signal authorization failure
  // or with a mapping of claims to values (including scopes).
  cb(null, { claim: 'value' }); // return error or a mapping of access token claims
};
```
