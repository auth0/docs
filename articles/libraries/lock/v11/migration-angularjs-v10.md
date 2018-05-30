---
section: libraries
title: Migrating Angular 1.x Applications to from Lock v10 to Lock v11
description: How to migrate Angular 1.x Applications from Lock v10 to v11
toc: true
tags:
  - libraries
  - lock
  - migrations
  - angular
---
# Migrating Angular 1.x applications from Lock v10 to v11

## Migration steps

<%= include('../../_includes/_get_lock_latest_version') %>

### Update angular-lock

AngularJS (a.k.a. Angular 1.x) applications usually use the [angular-lock package](https://www.npmjs.com/package/angular-lock). To use Lock v11 you need to update to the latest version (3.x).

You can update the angular-lock library using npm or yarn.

```bash
# installation with npm
npm install --save angular-lock
 
# installation with yarn
yarn add angular-lock
```

The script files need to be added to your build system, or added to the project with a script tag.

```html
<script src="node_modules/angular-lock/dist/angular-lock.js"></script>
```

<%= include('../../_includes/_configure_embedded_login', { library : 'Lock v11'}) %>
<%= include('../../_includes/_change_get_profile') %>
<%= include('../../_includes/_oidc_conformant') %>

## Behavioral Changes in Lock v11

<%= include('../../_includes/_popup_mode') %>
<%= include('../../_includes/_last_logged_in_window') %>
<%= include('../../_includes/_ip_ranges') %>
<%= include('../../_includes/_default_values_lock') %>
