---
description: The extensibility points for use with Auth0 Hooks
url: /hooks/extensibility-points
---

# Extensibility Points

The following is a list of supported extensibility hooks:

- [`client-credentials-exchange`](#client-credentials-exchange)
- [`password-exchange`](#password-exchange)
- [`pre-user-registration`](#pre-user-registration)
- [`post-user-registration`](#post-user-registration)

## `client-credentials-exchange`
The `client-credentials-exchange` extensibility point allows you to modify the scopes and add custom claims to the tokens issued by the Auth0 API's `POST /oauth/token` endpoint.

```har
{
    "method": "POST",
    "url": "https://${account.namespace}.auth0.com/oauth/token",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [{
        "name": "Authorization",
        "value": "Bearer ABCD"
    }],
    "queryString": [],
    "postData": {
        "mimeType": "application/json",
        "text": "\"audience\": \"string\", \"client\": \"{\"name\": \"string\", \"id\": \"string\", \"metadata\": \"object\", \"tenant\": \"string\"}, \"tenant\": \"array of strings\""
    },
    "headersSize": -1,
    "bodySize": -1,
    "comment": ""
}
```

The response
