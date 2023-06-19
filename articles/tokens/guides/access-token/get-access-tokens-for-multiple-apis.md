---
title: Get Access Tokens for Multiple APIs
description: Learn how to get Access Tokens for multiple APIs.
topics:
  - tokens
  - access-tokens
  - apis
contentType:
  - how-to
useCase:
  - invoke-api
---
# Get Access Tokens for Multiple APIs

There are times when you may need to obtain more than one access token, to be able to call more than one API. You will need a way to differentiate between these tokens and calls.

## Single-Page Applications

In SPAs you can use the [Auth0 SPA SDK](/libraries/auth0-spa-js) and can trigger Silent Authentication with the audience for the new token. The [Get Access Token for a different audience](/libraries/auth0-spa-js#get-access-token-for-a-different-audience) example shows how to do this using the SDK's `getTokenSilently()` method.

## Applications with a Backend

In backend apps, you need to redirect to `/authorize` once per API, using `prompt=none&audience=YourAudience`. To know which token you need to call for each API you need to use the `state` parameter as way to correlate requests and responses.

```js
// First state + audience stored
const state0 = uniq_id();
req.session.states[0] = { state: state0, audience: 'YourAudience0' }

// Second state + audience stored
const state1 = uniq_id();
req.session.states[1] = { state: state1, audience: 'YourAudience1' }
```

Then, you need to make an authorize call, using the appropriate SDK method if you are using one, or just a regular GET request, with these values included:

```
auth0.authorize({..., state: req.session.states[0].state, audience: req.session.states[0].audience }
```

In this manner, you can be certain of which API to call for what purpose, and which returned response is from which API. Checking the state in the response and then comparing it to your stored states will tell you the audience that it was paired with, which will tell you the API that it is responding from.

## Read more

* [Access Tokens](/tokens/access-token)
* [Use an Access Token](/tokens/guides/access-token/use-access-tokens)
* [Validate an Access Token](/tokens/guides/access-token/validate-access-token)
* [JSON Web Token](/jwt)
* [JSON Web Token Claims](/tokens/jwt-claims)
* [Token Best Practices](/tokens/concepts/token-best-practices)
* [Quickstarts](/quickstarts)
* [Authentication and Authorization Flows](/flows)