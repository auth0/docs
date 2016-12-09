---
description: Describes using rules with Resource Owner Password Grant.
---

# Using Rules with Resource Owner Password Grant

You can now add [rules](/rules) into the [Resource Owner Password Grant](/api-auth/grant/password) exchange pipeline where you exchange a `username` and `password` for an `access_token`, and optionally a `refresh_token`.

## Prior to Beginning Your Configuration

<%= include('./_includes/_prerequisites.md') %>

## Creating the Rule

**Note**: You can only create one rule, which will then be executed for **all** clients and APIs.

### 1. Create the Rule For Use with Webtasks

<%= include('./_includes/_create-rule', {
	  args: 'user, client, scope, audience, context, cb'
}) %>

### 2. Create the Webtask to Use Your Rule

<%= include('./_includes/_create-webtask', {
	  grant: 'password-exchange'
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

<%= include('./_includes/_response', {
	  scope: 'read:sample extra'
}) %>

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

<%= include('./_includes/_input-params') %>

### Auth0 Runtime Expectation

<%= include('./_includes/_runtime') %>

### Logs

<%= include('./_includes/_logs') %>
