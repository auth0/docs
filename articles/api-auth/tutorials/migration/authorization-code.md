---
description: OIDC-conformant Authorization Code grant
---

# Authorization Code grant

The [Authorization Code grant](/protocols#oauth-server-side) is used by server-side clients that are capable of securely storing secrets, or by [native clients through PKCE](/api-auth/tutorials/authorization-code-grant-pkce).

## Legacy request

```text
GET /authorize?
    response_type=code
    &scope=openid email favorite_color offline_access
    &client_id=123
    &state=af0ifjsldkj
    &redirect_uri=https://app.example.com/callback
    &device=my-device-name
```

The `device` parameter is only needed if [requesting a refresh token](/tokens/refresh-token) by passing the `offline_access` scope.

### Legacy response

```text
HTTP/1.1 302 Found
Location: https://app.example.com/callback?
    code=SplxlOBeZQQYbYS6WxSbIA
    &state=af0ifjsldkj
```

### Legacy code exchange

The authorization code can be exchanged by calling the /oauth/token endpoint:

```text
POST /oauth/token HTTP/1.1
Content-Type: application/json

{
    "grant_type": "authorization_code",
    "client_id": "123",
    "client_secret": "...",
    "code": "SplxlOBeZQQYbYS6WxSbIA",
    "redirect_uri": "https://app.example.com/callback"
}
```

Exchanging the authorization code results in the following response from Auth0:

```
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache

{
    "access_token": "SlAV32hkKG",
    "token_type": "Bearer",
    "refresh_token": "8xLOxBtZp8",
    "expires_in": 3600,
    "id_token": "eyJ..."
}
```

* The returned access token is only valid for calling the [/userinfo endpoint](https://auth0.com/docs/api/authentication#get-user-info).
* A refresh token will be returned only if a `device` parameter was passed and the `offline_access` scope was requested.

The returned ID token body could have the following structure:

 ```json
{
    "sub": "auth0|alice",
    "iss": "https://${account.namespace}/",
    "aud": "123",
    "exp": 1482809609,
    "iat": 1482773609,
    "email": "alice@example.com",
    "email_verified": true,
    "favorite_color": "blue"
}
```

### OIDC-conformant request

```text
GET /authorize?
    response_type=code
    &scope=openid email offline_access
    &client_id=123
    &state=af0ifjsldkj
    &redirect_uri=https://app.example.com/callback
    &audience=https://api.example.com
```

Note that `favorite_color` is no longer a valid scope value, and that no `device` parameter is being sent.
The `audience` parameter is optional.

### OIDC-conformant response

```text
HTTP/1.1 302 Found
Location: https://app.example.com/callback?
    code=SplxlOBeZQQYbYS6WxSbIA
    &state=af0ifjsldkj
```

The response format is the same as in the legacy pipeline.

### OIDC-conformant code exchange

The authorization code can be exchanged by calling the /oauth/token endpoint as usual:

```text
POST /oauth/token HTTP/1.1
Content-Type: application/json

{
    "grant_type": "authorization_code",
    "client_id": "123",
    "client_secret": "...",
    "code": "SplxlOBeZQQYbYS6WxSbIA",
    "redirect_uri": "https://app.example.com/callback"
}
```

Exchanging the authorization code results in the following response from Auth0:

```
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache

{
    "access_token": "eyJ...",
    "token_type": "Bearer",
    "refresh_token": "8xLOxBtZp8",
    "expires_in": 3600,
    "id_token": "eyJ..."
}
```

* The returned access token is valid for calling the [/userinfo endpoint](https://auth0.com/docs/api/authentication#get-user-info) and optionally the resource server specified by the `audience` parameter.
* A refresh token will be returned only if the `offline_access` scope was granted.

The returned ID token body could have the following structure:

 ```json
{
    "sub": "auth0|alice",
    "iss": "https://${account.namespace}/",
    "aud": "123",
    "exp": 1482809609,
    "iat": 1482773609,
    "email": "alice@example.com",
    "email_verified": true,
    "https://app.example.com/favorite_color": "blue"
}
```

Note that the `favorite_color` claim must be namespaced and added through a rule.

The returned access token could have the following structure:

```json
{
    "sub": "auth0|alice",
    "iss": "https://${account.namespace}/",
    "aud": [
        "https://api.example.com",
        "https://${account.namespace}/userinfo"
    ],
    "exp": 1482816809,
    "iat": 1482809609,
    "scope": "openid email"
}
```

## Further reading

<%= include('./_index.md') %>
