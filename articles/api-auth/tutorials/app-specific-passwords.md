---
  description: How to use app-specific password flows
---

# App-Specific Passwords

When using app-specific passwords (ASP), there are a couple of different use cases and scenarios possible. One case involves treating app-specific passwords as Bearer tokens. Another case involves accepting app-specific passwords along with a username; this is similar to how basic authentication works.

## Use App-Specific Passwords as Bearer Tokens

Your API consumes ASPs the same way it would consume any other Bearer token, regardless of whether it's a JWT or not.

The primary difference, however, is that using JWT access tokens means that you don't have to make a call to Auth0 to check the token's validity -- the API can verify the validity of the token on its own by checking the token's signature.

With ASPs, your API (which is also known as the *resource server*) needs to call Auth0 to check the ASPs's validity, as well as the validity of the claims associated with the tokens.

Sample flow:

1. The user uses the ASP as a Bearer token to call your API
2. The API recognizes the token as non-JWT, so it has to [introspect](/api-auth/token-instrospection). It makes a call to `oauth/introspect`, and the response indicates whether the token is active or not. If the token is active, the endpoint also returns the claims associated with the token. The response looks something like this:

```json
{
  "token_type": "application_specific_password_token",
  "scope": "read:foo create:foo update:foo",
  "iat": 1490234011,
  "sub": "auth0|1234",
  "aud": "https://demo.api",
  "iss": "https://tenant.auth0.com/",
  "active": true,
  "username": "user@gmail.com"
}
```

3. Upon receiving the results of the call, the API can make an authorization decision, such as whether the user is allowed to use the indicated scopes.

::: note
Anytime the token introspection endpoint is called using an ASP, the ASP record is updated with the `last_accessed` timestamp.
:::
