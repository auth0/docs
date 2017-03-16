---
title: OIDC-conformant refresh token use
---

# OIDC-conformant refresh tokens

<%= include('./_about.md') %>

There are two main changes to how refresh tokens are used in the OIDC-conformant authentication pipeline:

* Using the [implicit grant](/api-auth/tutorials/adoption/implicit) for authentication will no longer return refresh tokens.
  Use [silent authentication](/api-auth/tutorials/silent-authentication) (i.e. `prompt=none`) instead.
* Refresh tokens can only be used by [confidential clients](/api-auth/client-types) (i.e. clients able to authenticate)
* The `/delegation` endpoint is considered deprecated. To obtain new tokens from a refresh token, the `/oauth/token` endpoint should be used instead:

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#refresh-legacy" data-toggle="tab">Legacy (delegation)</a></li>
      <li><a href="#refresh-oidc" data-toggle="tab">OIDC-conformant (token endpoint)</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="refresh-legacy" class="tab-pane active">
      <pre class="text hljs"><code>POST /delegation
Content-Type: 'application/json'
{
  "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
  "client_id": "...",
  "refresh_token": "...",
  "scope": "openid profile"
}
</code></pre>
   </div>
    <div id="refresh-oidc" class="tab-pane">
      <pre class="text hljs"><code>POST /oauth/token
Content-Type: application/json
{
  "grant_type": "refresh_token",
  "refresh_token": "...",
  "client_id": "...",
  "client_secret": "...",
  "scope": "openid profile",
  "audience": "https://api.example.com"
}
</code></pre>
<ul><li>The <code>audience</code> parameter is optional.</li></ul>
   </div>
  </div>
</div>

## Further reading

<%= include('./_index.md') %>
