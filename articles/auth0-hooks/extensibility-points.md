---
description: The extensibility points for use with Auth0 Hooks
---

# Extensibility Points

The following is a list of supported extensibility hooks and information on what you can do with them.

- `client-credentials-exchange`
- `password-exchange`
- `pre-user-registration`
- `post-user-registration`

Using the `client-credentials-exchange` extensibility point, you can modify the scopes and add custom claims to the tokens issued by the Auth0 API's `POST /oauth/token` endpoint.

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
