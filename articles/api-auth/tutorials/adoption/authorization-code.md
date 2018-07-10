---
description: OIDC-conformant Authorization Code grant
topics:
  - api-authentication
  - oidc
  - authorization-code
contentType: concept
useCase:
  - secure-api
  - call-api
---

# Authorization Code grant

<%= include('./_about.md') %>

The [Authorization Code grant](/api-auth/grant/authorization-code) is used by server-side applications that are capable of securely storing secrets, or by [native applications through PKCE](/api-auth/grant/authorization-code-pkce).
This document describes the differences of this flow between the legacy and OIDC-conformant authentication pipelines.

## Authentication request

<code-block>
  <code-block-tab data-title="Legacy">

  ```text
  GET /authorize?
    response_type=code
    &scope=openid email favorite_color offline_access
    &client_id=123
    &state=af0ifjsldkj
    &redirect_uri=https://app.example.com/callback
    &device=my-device-name
  ```

  - The `device` parameter is only needed if [requesting a Refresh Token](/tokens/refresh-token) by passing the `offline_access` scope.

  </code-block-tab>
  <code-block-tab data-title="OIDC-conformant">

  ```text
  GET /authorize?
    response_type=code
    &scope=openid email offline_access
    &client_id=123
    &state=af0ifjsldkj
    &redirect_uri=https://app.example.com/callback
    &audience=https://api.example.com
  ```

  - `favorite_color` is no longer a valid scope value.
  - The `device` parameter is removed.
  - The `audience` parameter is optional.

  </code-block-tab>
</code-block>

## Authentication response

The response from Auth0 is identical in both pipelines:

```text
HTTP/1.1 302 Found
Location: https://app.example.com/callback?
    code=SplxlOBeZQQYbYS6WxSbIA
    &state=af0ifjsldkj
```


## Code exchange request

An authorization code can be exchanged in the same way in both pipelines:

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

## Code exchange response

<code-block>
  <code-block-tab data-title="Legacy">

  ```text
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

  - The returned Access Token is only valid for calling the [/userinfo endpoint](/api/authentication#get-user-info).
  - A Refresh Token will be returned only if a `device` parameter was passed and the `offline_access` scope was requested.

  </code-block-tab>
  <code-block-tab data-title="OIDC-conformant">

  ```text
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

  - The returned Access Token is valid for optionally calling the API specified in the `audience` parameter and the [/userinfo endpoint](/api/authentication#get-user-info) (provided that the API uses `RS256` as the signing algorithm and `openid` is used as a `scope` parameter). If you are not implementing your own Resource Server (API), then you can use `https://{$account.namespace}/userinfo` as the `audience` parameter, which will return an opaque Access Token.
  - A Refresh Token will be returned only if the `offline_access` scope was granted.
  
  </code-block-tab>
</code-block>

## ID Token structure

<code-block>
  <code-block-tab data-title="Legacy">

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

  </code-block-tab>
  <code-block-tab data-title="OIDC-conformant">

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

  - The `favorite_color` claim must be namespaced and added through a rule.
  
  </code-block-tab>
</code-block>

## Access Token structure (optional)


<code-block>
  <code-block-tab data-title="Legacy">

  ```text
  SlAV32hkKG
  ```

  - The returned Access Token is opaque and only valid for calling the [/userinfo endpoint](/api/authentication#get-user-info).

  </code-block-tab>
  <code-block-tab data-title="OIDC-conformant">

  ```json
  {
    "sub": "auth0|alice",
    "iss": "https://${account.namespace}/",
    "aud": [
        "https://api.example.com",
        "https://${account.namespace}/userinfo"
    ],
    "azp": "123",
    "exp": 1482816809,
    "iat": 1482809609,
    "scope": "openid email"
  }
  ```

  - The returned Access Token is valid for optionally calling the API specified in the `audience` parameter and the [/userinfo endpoint](/api/authentication#get-user-info) (provided that the API uses `RS256` as the signing algorithm and `openid` is used as a `scope` parameter). If you are not implementing your own Resource Server (API), then you can use `https://{$account.namespace}/userinfo` as the `audience` parameter, which will return an opaque Access Token.
  
  </code-block-tab>
</code-block>

## Further reading

<%= include('./_index.md') %>
