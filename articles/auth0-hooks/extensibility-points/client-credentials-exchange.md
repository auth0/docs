# Extensibility Point: `client-credentials-exchange`

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

The response:
