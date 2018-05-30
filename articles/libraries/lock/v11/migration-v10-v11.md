---
section: libraries
title: Migrating from Lock v10 to v11
description: How to migrate from Lock v10 to v11
toc: true
tags:
  - libraries
  - lock
  - migrations
---
# Migrating from Lock v10 to v11

This guide includes all the information you need to update your Lock v10 application to [Lock v11](/libraries/lock).

## Migration demo

<script src="https://fast.wistia.com/embed/medias/ojf8hrzmwe.jsonp" async></script><script src="https://fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_ojf8hrzmwe videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>

## Migration steps

<%= include('../../_includes/_migrate_universal') %>
<%= include('../../_includes/_get_lock_latest_version') %>
<%= include('../../_includes/_configure_embedded_login', { library : 'Lock v11'}) %>
<%= include('../../_includes/_change_get_profile') %>
<%= include('../../_includes/_oidc_conformant') %>
<%= include('../../_includes/_configure_custom_domain', { library : 'Lock v11'}) %>
<%= include('../../_includes/_verifying_migration') %>

## Behavioral changes in Lock v11

<%= include('../../_includes/_popup_mode') %>
<%= include('../../_includes/_last_logged_in_window') %>
<%= include('../../_includes/_ip_ranges') %>
<%= include('../../_includes/_default_values_lock') %>
<%= include('../../_includes/_embedded_sso') %>
