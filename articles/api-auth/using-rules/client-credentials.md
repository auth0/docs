---
description: How to add a webtask and run it each time a Client Credentials grant is executed.
---

# Using Rules with Client Credentials Grants

You can write functions in JavaScript and have them run every time a [Client Credentials grant](/api-auth/grant/client-credentials) is executed, using [webtasks](https://webtask.io/).

## Before you begin

Please ensure that:

* You have the [Webtask Command Line Interface (CLI) installed](${manage_url}/#/account/webtasks).
* You have created an [API defined with the appropriate scopes](${manage_url}/#/apis).
* You have created a [non-interactive client](${manage_url}/#/clients) that is authorized to use the API created in the previous step.

For details on how to create an API and a non-interactive client for Client Credentials, refer to [Setting up a Client Credentials Grant using the Management Dashboard](/api-auth/config/using-the-auth0-dashboard).

## Create the Rule

You can only create one rule, which will then be executed for **all** clients and APIs.

### 1. Create the Rule For Use with Webtasks

Create a file named `myrule.js`, and enter the following:

```js
module.exports = function(client, scope, audience, context, cb) {
  var access_token = {};
  access_token['https://foo.com/claim'] = 'bar';
  access_token.scope = scope;
  access_token.scope.push('extra');
  cb(null, access_token);
};
```
This is a sample rule that will:

* Add an arbitrary claim (`https://foo.com/claim`) to the `access_token`.
* Add an extra scope to the default scopes configured on your [API](${manage_url}/#/apis).

::: panel-info Custom claims namespaced format
In order to improve compatibility for client applications, Auth0 will now return profile information in a [structured claim format as defined by the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that in order to add custom claims to ID tokens or access tokens, they must conform to a namespaced format to avoid possible collisions with standard OIDC claims. That is why we named our arbitrary claim `https://foo.com/claim`, instead of `claim`.
:::


### 2. Create the Webtask to Use Your Rule

<%= include('./_includes/_create-webtask', {
	  grant: 'credentials-exchange',
		compiler: 'client-credentials-exchange'
}) %>

### 3. Test Your Setup

To test your newly-created rule and webtask, make the following `POST` call:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"client_id\": \"${account.clientId}\",\"client_secret\": \"${account.clientSecret}\",\"audience\": \"API_IDENTIFIER\",\"grant_type\": \"client_credentials\"}"
  }
}
```

Before you make the `POST` call you must replace the following values:
* `audience`: API Identifier that the client is requesting access to.
* `client_id`: Client ID of the client making the request.
* `client_secret`: Client Secret of the client making the request.

<%= include('./_includes/_response', {
	  scope: 'test extra'
}) %>

## Implementation Notes

### Input Parameters

The input parameters for the rule, including sample snippets:

<%= include('./_includes/_input-params') %>

### Auth0 Runtime Expectation

The Auth0 Runtime expects you to return an `access_token` that looks like the following:

```json
{
  "https://foo.com/claim": "bar",
  "scope": [ "scope1", "scope2" ]
}
```

If you decide not to issue the token, you can return `cb(new Error('access denied'))`.

### Logs

<%= include('./_includes/_logs') %>
