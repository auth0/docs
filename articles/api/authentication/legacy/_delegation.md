# Delegation

```http
POST https://${account.namespace}/delegation
Content-Type: application/json
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
By default, this feature is disabled for tenants without an add-on in use as of 8 June 2017. Legacy tenants who currently use an add-on that requires delegation may continue to use this feature. If delegation functionality is changed or removed from service at some point, customers who currently use it will be notified beforehand and given ample time to migrate.
:::

A delegation token can be obtained and used when an application needs to call the API of an Application Addon, such as Firebase or SAP, registered and configured in Auth0, in the same tenant as the calling program.

Given an existing token, this endpoint will generate a new token signed with the `target` app' secret. This is used to flow the identity of the user from the application to an API.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | Τhe `client_id` of your app |
| `grant_type` <br/><span class="label label-danger">Required</span> | Use `urn:ietf:params:oauth:grant-type:jwt-bearer`|
| `id_token` or `refresh_token` <br/><span class="label label-danger">Required</span> | The existing token of the user. |
| `target`        | The target `client_id` |
| <dfn data-key="scope">`scope`</dfn>         | Use `openid` or `openid profile email` |
| `api_type`       | The API to be called. |

### Remarks

- The `profile` scope value requests access to the End-User's default profile Claims, which are: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`.

- The `email` scope value requests access to the `email` and `email_verified` Claims.

- Delegation is __not supported__ in version 8 of [auth0.js](/libraries/auth0js). For a sample in version 7 of the library, refer to [Delegation Token Request](/libraries/auth0js/v7#delegation-token-request).

- This endpoint limits up to 10 requests per minute from the same IP address with the same `user_id`.

- This endpoint will return three HTTP Response Headers, that provide relevant data on its rate limits:
  - `X-RateLimit-Limit`: Number of requests allowed per minute.
  - `X-RateLimit-Remaining`: Number of requests available. Each new request reduces this number by 1. For each minute that passes, requests are added back, so this number increases by 1 each time.
  - `X-RateLimit-Reset`: Remaining time until the rate limit (`X-RateLimit-Limit`) resets. The value is in [UTC epoch seconds](https://en.wikipedia.org/wiki/Unix_time).


### Learn More

- [Delegation Tokens](/tokens/delegation)
- [Auth0 API Rate Limit Policy](/policies/rate-limits)