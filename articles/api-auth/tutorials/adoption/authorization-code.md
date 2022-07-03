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

# Authorization Code Grant

<%= include('./_about.md') %>

The [Authorization Code Grant](/flows/concepts/auth-code) is used by server-side applications that are capable of securely storing secrets, or by [native applications through PKCE](/flows/concepts/auth-code-pkce).
This document describes the differences of this flow between the legacy and OIDC-conformant authentication pipelines.

## Authentication request

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#request-legacy" data-toggle="tab">Legacy</a></li>
      <li><a href="#request-oidc" data-toggle="tab">OIDC-conformant</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="request-legacy" class="tab-pane active">
      <pre class="text hljs"><code>GET /authorize?
    response_type=code
    &scope=openid email favorite_color offline_access
    &client_id=123
    &state=af0ifjsldkj
    &redirect_uri=https://app.example.com/callback
    &device=my-device-name</code></pre>
    <ul>
        <li>The <code>device</code> parameter is only needed if <a href="/tokens/concepts/refresh-tokens">requesting a <dfn data-key="refresh-token">Refresh Token</dfn></a> by passing the <code>offline_access</code> <dfn data-key="scope">scope</dfn>.</li>
    </ul>
    </div>
    <div id="request-oidc" class="tab-pane">
      <pre class="text hljs"><code>GET /authorize?
    response_type=code
    &scope=openid email offline_access
    &client_id=123
    &state=af0ifjsldkj
    &redirect_uri=https://app.example.com/callback
    &audience=https://api.example.com </code></pre>
    <ul>
        <li><code>favorite_color</code> is no longer a valid scope value.</li>
        <li>The <code>device</code> parameter is removed.</li>
        <li>The <dfn data-key="audience"><code>audience</code></dfn> parameter is optional.</li>
    </ul>
    </div>
  </div>
</div>

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

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/oauth/token",
    "headers": [
      { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
    ],
    "postData" : {
      "mimeType": "application/x-www-form-urlencoded",
      "params": [
        {
          "name": "grant_type",
          "value": "authorization_code"
        },
        {
          "name": "client_id",
          "value": "${account.clientId}"
        },
        {
          "name": "client_secret",
          "value": "YOUR_CLIENT_SECRET"
        },
        {
          "name": "code",
          "value": "YOUR_AUTHORIZATION_CODE"
        },
        {
          "name": "redirect_uri",
          "value": "${account.callback}"
        }
      ]
    }
}
```

## Code exchange response

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#exchange-legacy" data-toggle="tab">Legacy</a></li>
      <li><a href="#exchange-oidc" data-toggle="tab">OIDC-conformant</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="exchange-legacy" class="tab-pane active">
      <pre class="text hljs"><code>HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
{
    "access_token": "SlAV32hkKG",
    "token_type": "Bearer",
    "refresh_token": "8xLOxBtZp8",
    "expires_in": 3600,
    "id_token": "eyJ..."
}</code></pre>
    <ul>
        <li>The returned <dfn data-key="access-token">Access Token</dfn> is only valid for calling the <a href="/api/authentication#get-user-info">/userinfo endpoint</a>.</li>
        <li>A <dfn data-key="refresh-token">Refresh Token</dfn> will be returned only if a <code>device</code> parameter was passed and the <code>offline_access</code> scope was requested.</li>
    </ul>
    </div>
    <div id="exchange-oidc" class="tab-pane">
      <pre class="text hljs"><code>HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
{
    "access_token": "eyJ...",
    "token_type": "Bearer",
    "refresh_token": "8xLOxBtZp8",
    "expires_in": 3600,
    "id_token": "eyJ..."
}</code></pre>
        <ul>
            <li>The returned Access Token is valid for optionally calling the API specified in the <code>audience</code> parameter and the <a href="/api/authentication#get-user-info">/userinfo endpoint</a> (provided that the API uses <code>RS256</code> as the <a href="/tokens/concepts/signing-algorithms">signing algorithm</a> and <code>openid</code> is used as a <code>scope</code> parameter). If you are not implementing your own Resource Server (API), then you can use <code>https://{$account.namespace}/userinfo</code> as the <code>audience</code> parameter, which will return an opaque Access Token.</li>
            <li>A Refresh Token will be returned only if the <code>offline_access</code> scope was granted.</li>
        </ul>
    </div>
  </div>
</div>

## ID Token structure

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#idtoken-legacy" data-toggle="tab">Legacy</a></li>
      <li><a href="#idtoken-oidc" data-toggle="tab">OIDC-conformant</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="idtoken-legacy" class="tab-pane active">
      <pre class="json hljs"><code>{
    "sub": "auth0|alice",
    "iss": "https://${account.namespace}/",
    "aud": "123",
    "exp": 1482809609,
    "iat": 1482773609,
    "email": "alice@example.com",
    "email_verified": true,
    "favorite_color": "blue"
}</code></pre>
    </div>
    <div id="idtoken-oidc" class="tab-pane">
      <pre class="json hljs"><code>{
    "sub": "auth0|alice",
    "iss": "https://${account.namespace}/",
    "aud": "123",
    "exp": 1482809609,
    "iat": 1482773609,
    "email": "alice@example.com",
    "email_verified": true,
    "https://app.example.com/favorite_color": "blue"
}</code></pre>
        <ul>
            <li>The <code>favorite_color</code> claim must be <a href="/tokens/guides/create-namespaced-custom-claims">namespaced</a> and added through a rule.</li>
        </ul>
    </div>
  </div>
</div>

## Access Token structure (optional)

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#accesstoken-legacy" data-toggle="tab">Legacy</a></li>
      <li><a href="#accesstoken-oidc" data-toggle="tab">OIDC-conformant</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="accesstoken-legacy" class="tab-pane active">
      <pre class="text hljs"><code>SlAV32hkKG</code></pre>
      <ul>
        <li>The returned Access Token is opaque and only valid for calling the <a href="/api/authentication#get-user-info">/userinfo endpoint</a>.</li>
      </ul>
    </div>
    <div id="accesstoken-oidc" class="tab-pane">
      <pre class="json hljs"><code>{
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
}</code></pre>
        <ul>
            <li>The returned Access Token is valid for optionally calling the API specified in the <code>audience</code> parameter and the <a href="/api/authentication#get-user-info">/userinfo endpoint</a> (provided that the API uses <code>RS256</code> as the <a href="/tokens/concepts/signing-algorithms">signing algorithm</a> and <code>openid</code> is used as a <code>scope</code> parameter). If you are not implementing your own Resource Server (API), then you can use <code>https://{$account.namespace}/userinfo</code> as the <code>audience</code> parameter, which will return an opaque Access Token.</li>
        </ul>
    </div>
  </div>
</div>

## Keep reading

<%= include('./_index.md') %>
