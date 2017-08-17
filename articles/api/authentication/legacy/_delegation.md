<!-- markdownlint-disable -->

# Delegation

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/delegation
Content-Type: 'application/json'
{
  "client_id": "${account.clientId}",
  "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
  "id_token" or "refresh_token" : "TOKEN",
  "target": "TARGET_CLIENT_ID",
  "scope": "openid",
  "api_type": "API_TYPE"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/delegation' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "grant_type":"urn:ietf:params:oauth:grant-type:jwt-bearer", "id_token|refresh_token":"TOKEN", "target":"TARGET_CLIENT_ID", "scope":"openid", "api_type":"API_TYPE"}'
```

```javascript
// Delegation is not supported in version 8 of auth0.js.
// For a version 7 sample refer to: https://auth0.com/docs/libraries/auth0js/v7#delegation-token-request
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/delegation",
  "link": "#delegation"
}) %>

::: warning
With the latest Auth0 authentication pipeline, this endpoint should not be used to exchange an ID token issued to one client for a new one issued to a different client, or to use a refresh token for a fresh ID token. For more information refer to [Introducing OIDC Conformant Authentication > Delegation](/api-auth/intro#delegation).

This feature is disabled by default for new tenants as of 8 June 2017. Please see [Client Grant Types](/clients/client-grant-types) for more information.
:::

A delegation token should be obtained and used when a client program needs to call the API of an Application Addon, such as Firebase or SAP, registered and configured in Auth0, in the same tenant as the calling program.

Given an existing token, this endpoint will generate a new token signed with the `target` client's secret. This is used to flow the identity of the user from the application to an API.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | Τhe `client_id` of your client |
| `grant_type` <br/><span class="label label-danger">Required</span> | Use `urn:ietf:params:oauth:grant-type:jwt-bearer`|
| `id_token` or `refresh_token` <br/><span class="label label-danger">Required</span> | The existing token of the user. |
| `target `        | The target `client_id` |
| `scope `         | Use `openid` or `openid profile email` |
| `api_type`       | The API to be called. |

### Test with Postman

<%= include('../../../_includes/_test-with-postman') %>

### Test with Authentication API Debugger

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test.

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set the fields **ID Token**, **Refresh Token** and **Target Client ID**. Click **Delegation**.


### Remarks

- The `profile` scope value requests access to the End-User's default profile Claims, which are: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`.

- The `email` scope value requests access to the `email` and `email_verified` Claims.

- Delegation is __not supported__ in version 8 of [auth0.js](/libraries/auth0js). For a sample in version 7 of the library, refer to [Delegation Token Request](/libraries/auth0js/v7#delegation-token-request).

- This endpoint limits up to 10 requests per minute from the same IP address with the same `user_id`.

- This endpoint will return three HTTP Response Headers, that provide relevant data on its rate limits:
  - `X-RateLimit-Limit`: Number of requests allowed per minute.
  - `X-RateLimit-Remaining`: Number of requests available. Each new request reduces this number by 1. For each minute that passes, requests are added back, so this number increases by 1 each time.
  - `X-RateLimit-Reset`: Remaining time until the rate limit (`X-RateLimit-Limit`) resets. The value is in [UTC epoch seconds](https://en.wikipedia.org/wiki/Unix_time).


### More Information

- [Delegation Tokens](/tokens/delegation)

- [Auth0 API Rate Limit Policy](/policies/rate-limits)
