---
description: Understand how the implicit grant is used by apps that are incapable of securely storing secrets such as SPA JS apps.
topics:
  - api-authentication
  - oidc
  - implicit
contentType: concept
useCase:
  - secure-api
  - call-api
---

# Implicit Grant

<%= include('./_about.md') %>

The [Implicit grant](/flows/concepts/implicit) is used by applications that are incapable of securely storing secrets, such as single-page JavaScript applications.
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
    response_type=token
    &scope=openid email favorite_color offline_access
    &client_id=123
    &state=af0ifjsldkj
    &redirect_uri=https://app.example.com
    &device=my-device-name</code></pre>
    <ul>
        <li>The <code>device</code> parameter is only needed if <a href="/tokens/concepts/refresh-tokens">requesting a <dfn data-key="refresh-token">Refresh Token</dfn></a> by passing the <code>offline_access</code> <dfn data-key="scope">scope</dfn>.</li>
    </ul>
    </div>
    <div id="request-oidc" class="tab-pane">
      <pre class="text hljs"><code>GET /authorize?
    response_type=token id_token
    &scope=openid email
    &client_id=123
    &state=af0ifjsldkj
    &nonce=jxdlsjfi0fa
    &redirect_uri=https://app.example.com
    &audience=https://api.example.com </code></pre>
    <ul>
        <li>This <code>response_type</code> parameter indicates that we want to receive both an <dfn data-key="access-token">Access Token</dfn> and ID Token.</li>
        <li><dfn data-key="refresh-token">Refresh Tokens</dfn> are not allowed in the implicit grant. <a href="/api-auth/tutorials/silent-authentication">Use <code>prompt=none</code> instead</a>.</li>
        <li><code>favorite_color</code> is no longer a valid scope.</li>
        <li>The <dfn data-key="audience"><code>audience</code></dfn> parameter is optional.</li>
        <li>The <dfn data-key="nonce"><code>nonce</code></dfn> parameter must be a <a href="/api-auth/tutorials/nonce">cryptographically-secure random string</a>.</li>
    </ul>
    </div>
  </div>
</div>

## Authentication response

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#response-legacy" data-toggle="tab">Legacy</a></li>
      <li><a href="#response-oidc" data-toggle="tab">OIDC-conformant</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="response-legacy" class="tab-pane active">
      <pre class="text hljs"><code>HTTP/1.1 302 Found
Location: https://app.example.com/#
    access_token=SlAV32hkKG
    &expires_in=86400
    &state=af0ifjsldk
    &id_token=eyJ...
    &refresh_token=8xLOxBtZp8
    &token_type=Bearer</code></pre>
    <ul>
        <li>The returned Access Token is valid for calling the <a href="/api/authentication#get-user-info">/userinfo endpoint</a>.</li>
        <li>A Refresh Token will be returned only if a <code>device</code> parameter was passed and the <code>offline_access</code> scope was requested.</li>
    </ul>
    </div>
    <div id="response-oidc" class="tab-pane">
      <pre class="text hljs"><code>HTTP/1.1 302 Found
Location: https://app.example.com/#
    access_token=eyJ...
    &expires_in=86400
    &state=af0ifjsldk
    &id_token=eyJ...
    &token_type=Bearer</code></pre>
    <ul>
        <li>The returned Access Token is valid for calling the <a href="/api/authentication#get-user-info">/userinfo endpoint</a> (provided that the API specified by the <code>audience</code> param uses <code>RS256</code> as <a href="/tokens/concepts/signing-algorithms">signing algorithm</a>) and optionally the resource server specified by the <code>audience</code> parameter.</li>
        <li>If using <code>response_type=id_token</code>, Auth0 will only return an ID Token.</li>
        <li>Refresh Tokens are not allowed in the implicit grant. <a href="/api-auth/tutorials/silent-authentication">Use <code>prompt=none</code> instead</a>.</li>
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
    "https://app.example.com/favorite_color": "blue",
    "nonce": "jxdlsjfi0fa"
}</code></pre>
        <ul>
            <li>The <code>favorite_color</code> claim must be <a href="/tokens/guides/create-namespaced-custom-claims">namespaced</a> and added through a rule.</li>
            <li>After validating the ID Token, the application must <a href="/api-auth/tutorials/nonce">validate the nonce to mitigate replay attacks</a>.</li>
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
            <li>The returned Access Token is a JWT valid for calling the <a href="/api/authentication#get-user-info">/userinfo endpoint</a>(provided that the API specified by the <code>audience</code> param uses <code>RS256</code> as <a href="/tokens/concepts/signing-algorithms">signing algorithm</a>) as well as the resource server specified by the <code>audience</code> parameter.</li>
            <li>Note that an opaque Access Token could still be returned if /userinfo is the only specified audience.</li>
        </ul>
    </div>
  </div>
</div>

## Keep reading

<%= include('./_index.md') %>
