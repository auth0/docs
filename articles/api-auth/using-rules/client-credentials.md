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

### 2. Create the Webtask to Use Your Rule

<%= include('./_includes/_create-webtask', {
	  grant: 'credentials-exchange'
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
* `client_secret`: Client Secret of the client making the request. This parameter is only required when the **Token Endpoint Authentication Method** of your Non Interactive Client is set to `Post`. If it is `None` you do not need this parameter. To check the value navigate to [Dashboard Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

<%= include('./_includes/_response', {
	  scope: 'test extra'
}) %>

## Implementation Notes

### Input Parameters

The input parameters for the rule, including sample snippets:

<%= include('./_includes/_input-params') %>

### Auth0 Runtime Expectation

<%= include('./_includes/_runtime') %>

### Logs

<%= include('./_includes/_logs') %>
