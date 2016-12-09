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
  "scope": "${scope}",
  "https://foo.com/claim": "bar"
}
```

**Note:** You can use [JWT.IO](https://jwt.io/) to decode, verify and generate JWT.
