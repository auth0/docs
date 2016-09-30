---
title: Login
description: This tutorial will show you how to use the Auth0 Electron SDK to add authentication and authorization to your app.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-electron-samples/tree/master/00-Starter-Seed',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-electron-samples',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 5.0.0
* Electron 0.36.7
:::

<%= include('../../_includes/_signup') %>

**Otherwise, if you already have an existing application, please follow the steps below.**

### 1. Setting up the Callback URL

<div class="setup-callback">
<p>Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in your Auth0 dashboard and make sure that the <b>Allowed Callback URLs</b> field contains the following values:</p>

```
https://${account.namespace}/mobile, file:///
```

</div>

### 2. Add Auth0Lock to Your Project

Add **Auth0Lock** to your `index.html` file and set the viewport.

${snippet(meta.snippets.dependencies)}

### 3. Add the auth0-electron Script to Your Project

You can copy `auth0-electron.js` [from GitHub](https://github.com/auth0/auth0-electron/blob/master/auth0-electron.js) or download it with the seed project from the link above.

### 4. Follow the Guide Specific to the Front End Technology You're Using

You can use any front end technology you like in your Electron application. We support the following:

* [AngularJS](/client-platforms/angularjs)
* [Angular2](/client-platforms/angular2)
* [Ember](/client-platforms/emberjs)
* [Ember 2](/client-platforms/ember2js)
* [jQuery](/client-platforms/jquery)
* [React](/client-platforms/react)
* [Socket.io](/client-platforms/socket-io)
* [Vanilla JS](/client-platforms/vanillajs)
* [VueJS](/client-platforms/vuejs)

### 5. All done!

You have completed the implementation of Auth0 in your Electron app. Congrats!
