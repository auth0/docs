---
description: Understand how refresh tokens are used in an OIDC-conformant authentication pipeline.
topics:
  - api-authentication
  - oidc
  - tokens
  - refresh tokens
contentType: concept
useCase:
  - secure-api
  - call-api
---

# OIDC-Conformant Refresh Tokens

<%= include('./_about.md') %>

There are some changes to how <dfn data-key="refresh-token">Refresh Tokens</dfn> are used in the OIDC-conformant authentication pipeline:

* Using the [implicit grant](/api-auth/tutorials/adoption/implicit) for authentication will no longer return Refresh Tokens.
  Use [silent authentication](/api-auth/tutorials/silent-authentication) (such as `prompt=none`) instead.
* Refresh Tokens should only be used by [confidential applications](/applications/concepts/app-types-confidential-public#confidential-applications). However, they can also be used by Native (public) applications to obtain Refresh Tokens for mobile apps. 
* The `/delegation` endpoint is deprecated. To obtain new tokens from a Refresh Token, the `/oauth/token` endpoint should be used instead:

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#refresh-oidc" data-toggle="tab">OIDC-conformant (token endpoint)</a></li>
      <li><a href="#refresh-legacy" data-toggle="tab">Legacy (delegation)</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="refresh-legacy" class="tab-pane">
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
    <div id="refresh-oidc" class="tab-pane active">
      <pre class="text hljs"><code>POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&refresh_token=123&client_id=123&client_secret=123&scope=openid+profile&audience=https%3A%2F%2Fapi.example.com
</code></pre>
<ul><li>The <code>audience</code> and <code>client_secret</code> parameters are optional. The <code>client_secret</code> is not needed when requesting a <code>refresh_token</code> for a mobile app.</li></ul>
   </div>
  </div>
</div>

Please note that Refresh Tokens must be kept confidential in transit and storage, and they should be shared only among the authorization server and the client to whom the Refresh Tokens were issued.

## Keep reading

<%= include('./_index.md') %>
