---
section: libraries
title: Migrating AngularJS Applications from Auth0.js v8 to v9
description: How to migrate AngularJS Applications from Auth0.js v8 to v9
toc: true
---
# Migrating AngularJS applications from Auth0.js v8 to v9

This guide includes all the information you need to update Auth0.js from v8 to v9. Find out if you should upgrade or not by reading [Migrating to Auth0.js v9](/libraries/auth0js/v9/migration-guide).

## Migration Steps

<%= include('../../_includes/_get_auth0_js_latest_version') %>

### Update angular-auth0

AngularJS (a.k.a. Angular 1.x) applications usually use the [angular-auth0 package](https://www.npmjs.com/package/angular-auth0). To use Auth0.js v9 you need to update to the latest version (3.x).

You can update the angular-auth0 library using npm or yarn.

```bash
# installation with npm
npm install --save angular-auth0
 
# installation with yarn
yarn add angular-auth0
```

The script files need to be added to your build system, or added to the project with a script tag.

```html
<script src="node_modules/angular-auth0/dist/angular-auth0.js"></script>
```

<%= include('../../_includes/_configure_embedded_login') %>
<%= include('../../_includes/_change_get_profile') %>
<%= include('../../_includes/_review_get_ssodata') %>

## Behavioral Changes

<%= include('../../_includes/_hosted_pages') %>
<%= include('../../_includes/_default_values') %>
