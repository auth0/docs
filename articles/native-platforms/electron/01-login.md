---
title: Login
description: This tutorial will show you how to use the Auth0 Electron SDK to add authentication and authorization to your app.
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-electron-samples',
  path: '01-Login',
  requirements: [
    'NodeJS 5.0.0',
    'Electron 1.4.3'
  ] 
}) %>

## Configure the Callback URL

<div class="setup-callback">
<p>Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in your Auth0 dashboard and make sure that the <b>Allowed Callback URLs</b> field contains the following values:</p>

```
https://${account.namespace}/mobile, file:///
```

</div>

## Add the Lock Widget

Add **Auth0Lock** to your `index.html` file and set the viewport.

${snippet(meta.snippets.dependencies)}

> **Note:** Some functionality provided by Lock is meant for regular web browsers. For best results, add `auth: { sso: false }` to your Lock configuration options.

## Follow the Front End Quickstarts

You can use any front end technology you like in your Electron application. Follow the [quickstart](/quickstart/spa) guide specific to your use case.

In the simple case of using [jQuery](/quickstart/spa/jquery), you can provide a control to render the Lock widget which will allow the user to log in.

![Lock](/media/articles/electron/lock-open.png)

If the user logs in with a social provider, they will be prompted for their credentials.

![Lock Google](/media/articles/electron/lock-google-open.png)
