A successful response contains an `access_token`:

```js
{
  "access_token": "eyJ...1ww",
  "expires_in": 36000,
  "scope": "SCOPES_GRANTED_TO_THE_CLIENT",
  "token_type": "Bearer"
}
```

When this `access_token` is sent to the API, it can decode it and retrieve the arbitrary claim we added. The decoded contents of the token look like this:

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
