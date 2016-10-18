---
title: Login
description: This tutorial will show you how to use the Auth0 Electron SDK to add authentication and authorization to your app.
budicon: 448
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-electron-samples',
  path: '01-Login'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 5.0.0
* Electron 1.4.3
:::

## 1. Setting up the Callback URL

<div class="setup-callback">
<p>Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in your Auth0 dashboard and make sure that the <b>Allowed Callback URLs</b> field contains the following values:</p>

```
https://${account.namespace}/mobile, file:///
```

</div>

## 2. Add the Lock Widget

Add **Auth0Lock** to your `index.html` file and set the viewport.

${snippet(meta.snippets.dependencies)}

> **Note:** Certain functionality provided by the Lock widget, such as single sign-on, does not work well in Electron. For best results, add `auth: { sso: false }` to your Lock configuration options.

## 4. Follow the Front End Quickstarts

You can use any front end technology you like in your Electron application. Follow the [quickstart](/quickstart/spa) guide specific to your use case.
