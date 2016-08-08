---
  description: A description of the /oauth/token API endpoint listing its parameters.
---

# POST /oauth/token

An `access_token` is required to call the Auth0 API. You can generate one by authenticating with your global `client_id` and `client_secret`. The token will be valid for 24 hours.

```JSON
POST https://${account.namespace}/oauth/token
Content-Type: 'application/json'
{
  "client_id":        "{client-id}",
  "client_secret":    "{client-secret}",
  "grant_type":       "client_credentials"
}
```

## Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | your global `client_id` |
| `client_secret`  | string     | your global `client_secret` |
| `grant_type`     | string     | `client_credentials` |
