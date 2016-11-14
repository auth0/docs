---
title: Authorization API Explorer
---

<div class="api-section" data-section="none">
  <%= include('./_introduction') %>
</div>
<div class="api-section" data-section="none">
  <%= include('./_errors') %>
</div>

<span data-section-label="scenarios">Scenarios</span>

<div class="api-section" data-section="scenarios">
  <%= include('./scenarios/_social') %>
</div>
<div class="api-section" data-section="scenarios">
  <%= include('./scenarios/_ad-ldap') %>
</div>
<div class="api-section" data-section="scenarios">
  <%= include('./scenarios/_database') %>
</div>
<div class="api-section" data-section="scenarios">
  <%= include('./scenarios/_passwordless') %>
</div>
<div class="api-section" data-section="scenarios">
  <%= include('./scenarios/_logout') %>
</div>
<div class="api-section" data-section="scenarios">
  <%= include('./scenarios/_impersonation') %>
</div>
<div class="api-section" data-section="scenarios">
  <%= include('./scenarios/_linking') %>
</div>

<span data-section-label="protocols">Protocols</span>

<div class="api-section" data-section="protocols">
  <%= include('./protocols/_oauth2') %>
</div>

<div class="api-section" data-section="protocols">
  <%= include('./protocols/_oidc') %>
</div>

<div class="api-section" data-section="protocols">
  <%= include('./protocols/_saml') %>
</div>
<div class="api-section" data-section="protocols">
  <%= include('./protocols/_ws-fed') %>
</div>

<span data-section-label="other">Other</div>

<div class="api-section" data-section="other">
  <%= include('./other/_tokeninfo') %>
</div>

<div class="api-section" data-section="other">
  <%= include('./other/_userinfo') %>
</div>

<div class="api-section" data-section="other">
  <%= include('./other/_delegation') %>
</div>
