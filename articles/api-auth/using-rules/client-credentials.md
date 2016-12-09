---
description: Describes using rules with Client Credentials Grant.
---

# Using Rules with Client Credentials Grants

You can now add [rules](/rules) into the [client credentials](/api-auth/grant/client-credentials) exchange pipeline where you exchange a `client_id` and `secret` for an `access_token`.

## Prior to Beginning Your Configuration

<%= include('./_includes/_prerequisites.md') %>

## Creating the Rule

**Note**: You can only create one rule, which will then be executed for **all** clients and APIs.

### 1. Create the Rule For Use with Webtasks

<%= include('./_includes/_create-rule', {
	  args: 'client, scope, audience, context, cb'
}) %>

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

### 2. Create the Webtask to Use Your Rule

Create the Webtask. You will need to set the following static metadata fields for the Webtask:

* `wt-compiler = auth0-ext-compilers/client-credentials-exchange`
* `auth0-extension = runtime`
* `auth0-extension-name = credentials-exchange`
* `auth0-extension-secret = {random_secret}`

The same `{random_secret}` value provided to the `auth0-extension-secret` metadata property must also be provided to the webtask code as an `auth0-extension-secret` secret parameter. This prevents unauthorized calls to this webtask. A secret may be conveniently created using `openssl` tool if your platform has it available:

```
SECRET=$(openssl rand 32 -base64) && \
wt create myrule.js \
  --meta wt-compiler=auth0-ext-compilers/client-credentials-exchange \
  --meta auth0-extension=runtime \
  --meta auth0-extension-name=credentials-exchange \
  --meta auth0-extension-secret=$SECRET \
  --secret auth0-extension-secret=$SECRET
```

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

If all is well, you will receive a JWT `access_token` that looks like this:

```json
{
  "iss": "${account.namespace}/",
  "sub": "${account.clientId}@clients",
  "aud": "API_IDENTIFIER",
  "exp": 1472832994,
  "iat": 1472746594,
  "scope": "test extra",
  "https://foo.com/claim": "bar"
}
```

## Implementation Notes

### Input Parameters

The input parameters for the rule, including sample snippets:

* **client** - `object` - the client asking for the token, including the `client` metadata (a key-value pair that can be set by client)

    ```json
    {
      "tenant":  "tenant_name",
      "id": "tenant_id",
      "name": "test_client",
      "metadata": {
        "some_metadata": "value"
      }
    }
    ```

* **scope** - `string array` - the scopes available on the API that you have defined
* **audience** - `string` - the API identifier available via the API settings page
* **context** - `object` - the contextual information about the request

    ```json
    {
      "ip": "123.123.123.123",
      "userAgent": "...",
      "webtask": {
        "secrets": { "FOO": "bar" }
      }
    }
    ```

### Auth0 Runtime Expectation

The Auth0 Runtime expects you to return an `access_token` that looks like the following:

```json
{
  "https://anything.com/foo": "bar",
  "scope": [ "scope1", "scope2" ]
}
```

If you decide not to issue the token, you can return `Error (cb(new Error('access denied')))`.

### Logs

You can use `wt logs` to see realtime logs. For additional information on reading the output, please consult [Webtask Streaming Logs](https://webtask.io/docs/api_logs).
