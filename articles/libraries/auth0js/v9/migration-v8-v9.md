---
section: libraries
title: Migrating to from Auth0.js v8 to v9
description: How to migrate from Auth0.js v8 to v9
toc: true
tags:
  - libraries
  - auth0js
  - migrations
---
# Migrating from Auth0.js v8 to v9

This guide includes all the information you need to update [Auth0.js](/libraries/auth0js) from v8 to v9. Find out if you should upgrade or not by reading [Migrating to Auth0.js v9](/libraries/auth0js/v9/migration-guide).

## Migration demo

<script src="https://fast.wistia.com/embed/medias/bxwxqkiopo.jsonp" async></script><script src="https://fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:62.5% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_bxwxqkiopo videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>

## Migration steps

<%= include('../../_includes/_migrate_universal') %>
<%= include('../../_includes/_get_auth0_js_latest_version') %>
<%= include('../../_includes/_configure_embedded_login', { library : 'Auth0.js v9'}) %>
<%= include('../../_includes/_review_get_ssodata') %>

#### Migration with getSSOData demo

<script src="https://fast.wistia.com/embed/medias/is2d4ocwwn.jsonp" async></script><script src="https://fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:62.5% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_is2d4ocwwn videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>

<%= include('../../_includes/_configure_custom_domain', { library : 'Auth0.js v9'}) %>

<%= include('../../_includes/_legacy_flows') %>

<%= include('../../_includes/_verifying_migration') %>

## Behavioral Changes

<%= include('../../_includes/_default_values') %>
