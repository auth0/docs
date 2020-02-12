---
description: Understand how the Resource Owner Password Grant (ROPG) is used by highly-trusted apps to provide active authentication. 
topics:
  - api-authentication
  - oidc
  - resource-owner-password
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Resource Owner Password Credentials Exchange

<%= include('../../_includes/_ropg-warning.md') %>

<%= include('./_about.md') %>

The [Resource Owner Password Credentials exchange](/api-auth/grant/password) is used by highly-trusted applications to provide active authentication. Unlike the authorization code and implicit grants, this authentication mechanism does not redirect users to Auth0. It authenticates users with a single request, exchanging their password credentials for a token.

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
      <pre class="text hljs"><code>POST /oauth/ro HTTP 1.1
Content-Type: application/json
{
  "grant_type": "password",
  "client_id": "123",
  "username": "alice",
  "password": "A3ddj3w",
  "connection": "my-database-connection",
  "scope": "openid email favorite_color offline_access",
  "device": "my-device-name"
}</code></pre>
    <ul>
        <li>The <code>device</code> parameter is only needed if <a href="/tokens/concepts/refresh-tokens">requesting a <dfn data-key="refresh-token">Refresh Token</dfn></a> by passing the <code>offline_access</code> <dfn data-key="scope">scope</dfn>.</li>
    </ul>
    </div>
    <div id="request-oidc" class="tab-pane">
      <pre class="text hljs"><code>POST /oauth/token HTTP 1.1
Content-Type: application/x-www-form-urlencoded

grant_type=http%3A%2F%2Fauth0.com%2Foauth%2Fgrant-type%2Fpassword-realm&client_id=123&username=alice&password=A3ddj3w&realm=my-database-connection&scope=openid+email+offline_access&audience=https%3A%2F%2Fapi.example.com
</code></pre>
    <ul>
        <li>The endpoint to execute token exchanges is <code>/oauth/token</code>.</li>
        <li><a href="/api-auth/tutorials/password-grant#realm-support">Auth0's own grant type</a> is used to authenticate users from a specific connection (<code>realm</code>). The <a href="/api-auth/tutorials/password-grant">standard OIDC password grant</a> is also supported, but it does not accept Auth0-specific parameters such as <code>realm</code>.</li>
        <li><code>favorite_color</code> is no longer a valid scope.</li>
        <li>The <code>device</code> parameter is removed.</li>
        <li>The <code>audience</code> parameter is optional.</li>
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
        <li>The returned Access Token is only valid for calling the <a href="/api/authentication#get-user-info">/userinfo endpoint</a>.</li>
        <li>A Refresh Token will be returned only if a <code>device</code> parameter was passed and the <code>offline_access</code> scope was requested.</li>
    </ul>
    </div>
    <div id="response-oidc" class="tab-pane">
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
        <li>The returned Access Token is valid for calling the <a href="/api/authentication#get-user-info">/userinfo endpoint</a> (provided that the API specified by the <code>audience</code> param uses <code>RS256</code> as <a href="/tokens/concepts/signing-algorithms">signing algorithm</a>) and optionally the resource server specified by the <code>audience</code> parameter.</li>
        <li>The ID Token will be forcibly signed using RS256 if requested by a <a href="/applications/concepts/app-types-confidential-public#public-applications">public application</a>.</li>
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
            <li>The ID Token will be forcibly signed using RS256 if requested by a <a href="/api-auth/application-types">public application</a>.</li>
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
            <li>The returned Access Token is a JWT valid for calling the <a href="/api/authentication#get-user-info">/userinfo endpoint</a> (provided that the API specified by the <code>audience</code> param uses <code>RS256</code> as <a href="/tokens/concepts/signing-algorithms">signing algorithm</a>) as well as the resource server specified by the <code>audience</code> parameter.</li>
            <li>Note that an opaque Access Token could still be returned if /userinfo is the only specified audience.</li>
        </ul>
    </div>
  </div>
</div>

## Standard password grant requests

The Auth0 password realm grant is not defined by standard OIDC, but it is suggested as an alternative to the legacy resource owner endpoint because it supports the Auth0-specific `realm` parameter. The [standard OIDC grant is also supported](/api-auth/tutorials/password-grant) when using OIDC authentication.

## Keep reading

<%= include('./_index.md') %>
