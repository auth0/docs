---
section: libraries
title: Migrating from Lock v9 to v11
description: How to migrate from Lock v9 to v11
toc: true
---
# Migrating from Lock v9 to v11

This guide includes all the information you need to update your Lock 9 installation to Lock 11.

## Migration Steps

<%= include('../../_includes/_get_lock_latest_version') %>

### Follow the Lock v9 to v10 Migration Guide

Follow the [instructions to migrate from Lock v9 to v10](/libraries/lock/v10/migration-guide)

<%= include('../../_includes/_configure_embedded_login') %>
<%= include('../../_includes/_change_get_profile') %>
<%= include('../../_includes/_oidc_conformant') %>

## Behavioral Changes in Lock v11

<%= include('../../_includes/_hosted_pages') %>
<%= include('../../_includes/_popup_mode') %>
<%= include('../../_includes/_default_values_lock') %>
<%= include('../../_includes/_ip_ranges') %>
