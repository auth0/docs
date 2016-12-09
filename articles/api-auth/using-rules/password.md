---
description: Describes using rules with Resource Owner Password Grant.
---

# Using Rules with Resource Owner Password Grant

You can now add [rules](/rules) into the [Resource Owner Password Grant](/api-auth/grant/password) exchange pipeline where you exchange a `username` and `password` for an `access_token`, and optionally a `refresh_token`.

## Prior to Beginning Your Configuration

<%= include('./_includes/prerequisites.md') %>

## Creating the Rule

**Note**: You can only create one rule, which will then be executed for **all** clients and APIs.

### 1. Create the Rule For Use with Webtasks

Create a file named `myrule.js`, and enter the following:

```js
module.exports = function(user, client, scope, audience, context, cb) {
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

* `wt-compiler = auth0-ext-compilers/password-exchange`
* `auth0-extension = runtime`
* `auth0-extension-name = password-exchange`
* `auth0-extension-secret = {random_secret}`

The same `{random_secret}` value provided to the `auth0-extension-secret` metadata property must also be provided to the webtask code as an `auth0-extension-secret` secret parameter. This prevents unauthorized calls to this webtask. A secret may be conveniently created using `openssl` tool if your platform has it available:

```
SECRET=$(openssl rand 32 -base64) && \
wt create myrule.js \
  --meta wt-compiler=auth0-ext-compilers/password-exchange \
  --meta auth0-extension=runtime \
  --meta auth0-extension-name=password-exchange \
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
    "text": "{\"grant_type\":\"password\",\"username\": \"user@example.com\",\"password\": \"pwd\",\"audience\": \"https://someapi.com/api\", \"scope\": \"read:sample\", \"client_id\": \"${account.clientId}\", \"client_secret\": \"${account.clientSecret}\"}"
  }
}
```

Before you make the `POST` call you must replace the following values:
* `username`: Resource Owner's identifier.
* `password`: Resource Owner's secret.
* `audience`: API Identifier that the client is requesting access to.
* `client_id`: Client ID of the client making the request.
* `client_secret`: Client Secret of the client making the request. This parameter is only required when the **Token Endpoint Authentication Method** of your Non Interactive Client is set to `Post`. If it is `None` you do not need this parameter. To check the value navigate to [Dashboard Client Settings](${manage_url}/#/clients/${account.clientId}/settings).
* `scope`: String value of the different scopes the client is asking for. Multiple scopes are separated with whitespace.

A successful response contains an `access_token`:

```js
{
  "access_token": "eyJz93a...k4laUWw",
  "token_type": "Bearer"
}
```

The contents of the decoded `access_token` look like this:

```json
{
  "iss": "${account.namespace}/",
  "sub": "${account.clientId}@clients",
  "aud": "API_IDENTIFIER",
  "exp": 1472832994,
  "iat": 1472746594,
  "scope": "read:sample extra",
  "https://foo.com/claim": "bar"
}
```

**Note:** You can use [JWT.IO](https://jwt.io/) to decode, verify and generate JWT.

## Implementation Notes

### Input Parameters

The input parameters for the rule, including sample snippets:

* **user** (`object`): The authenticated user:

```json
{
    "tenant": "tenant_name",
    "id": "user_id",
    "displayName": "user_name",
    "email": "email",
    "user_metadata": {
         "some_user_metadata": "value"
    },
    "app_metadata": {
         "some_app_metadata": "another value"
    }
}
```

* **client** (`object`): The client asking for the token, including the `client` metadata (a key-value pair that can be set by client):

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

* **scope** (`string array`): The scopes available on the API that you have defined.

* **audience** (`string`): The API identifier available via the API settings page.

* **context** (`object`): The contextual information about the request:

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
