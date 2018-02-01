---
section: libraries
title: Migrating to from Auth0.js v8 to v9
description: How to migrate from Auth0.js v8 to v9
toc: true
---
# Migrating from Auth0.js v8 to v9

This guide includes all the information you need to update [Auth0.js](/libraries/auth0js) from v8 to v9.  Find out if you should upgrade or not by reading [Migrating to Auth0.js v9](/libraries/auth0js/v9/migration-guide).

## Migration steps

<%= include('../../_includes/_get_auth0_js_latest_version') %>
<%= include('../../_includes/_configure_embedded_login', { library : 'Auth0.js v9'}) %>
<%= include('../../_includes/_review_get_ssodata') %>
<%= include('../../_includes/_legacy_flows') %>

## Behavioral Changes

<%= include('../../_includes/_default_values') %>
