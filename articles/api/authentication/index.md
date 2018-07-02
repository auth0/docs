---
title: Authentication API Explorer
fullWidth: true
contentType: 
    - index
    - reference
---

<div class="api-section" data-section="none">
  <%= include('./_introduction') %>
</div>

<div class="api-section" data-section="none">
  <%= include('./_login') %>
</div>

<div class="api-section" data-section="none">
  <%= include('./_logout') %>
</div>

<div class="api-section" data-section="none">
  <%= include('./_passwordless') %>
</div>

<div class="api-section" data-section="none">
  <%= include('./_sign-up') %>
</div>

<div class="api-section" data-section="none">
  <%= include('./_change-password') %>
</div>

<div class="api-section" data-section="none">
  <%= include('./_userinfo') %>
</div>

<div class="api-section" data-section="none">
  <%= include('./_multifactor-authentication') %>
</div>

<div class="api-section" data-section="none">
  <%= include('./_saml-sso') %>
</div>

<div class="api-section" data-section="none">
  <%= include('./_wsfed-req') %>
</div>

<div class="api-section" data-section="none">
  <%= include('./_impersonation') %>
</div>

<div class="api-section" data-section="none">
  <%= include('./_application-reg') %>
</div>

<span data-section-label="api-authz">API Authorization</span>
<div class="api-section" data-section="api-authz">
  <%= include('./api-authz/_authz-client') %>
</div>
<div class="api-section" data-section="api-authz">
  <%= include('./api-authz/_get-token') %>
</div>
<div class="api-section" data-section="api-authz">
  <%= include('./api-authz/_revoke-refersh-token') %>
</div>

<span data-section-label="legacy">Legacy</span>
<div class="api-section" data-section="legacy">
  <%= include('./legacy/_login') %>
</div>
<div class="api-section" data-section="legacy">
  <%= include('./legacy/_userinfo') %>
</div>
<div class="api-section" data-section="none">
  <%= include('./legacy/_linking') %>
</div>
<div class="api-section" data-section="legacy">
  <%= include('./legacy/_delegation') %>
</div>
<div class="api-section" data-section="legacy">
  <%= include('./legacy/_resource-owner') %>
</div>

<span data-section-label="errors">Errors</span>
<div class="api-section" data-section="errors">
 <%= include('./errors/_errors') %>
</div>
<div class="api-section" data-section="errors">
 <%= include('./errors/_oauth-revoke') %>
</div>
<div class="api-section" data-section="errors">
 <%= include('./errors/_oauth-access_token') %>
</div>
<div class="api-section" data-section="errors">
 <%= include('./errors/_oauth-ro') %>
</div>
<div class="api-section" data-section="errors">
 <%= include('./errors/_passwordless-start') %>
</div>
