---
title: Login
description: This tutorial will show you how to use the Auth0 Electron SDK to add authentication and authorization to your app.
budicon: 448
github:
  path: 01-Login
---

## Configure the Callback URL

<div class="setup-callback">
<p>Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in your Auth0 dashboard and make sure that the <b>Allowed Callback URLs</b> field contains the following values:</p>

```text
https://${account.namespace}/mobile, file:///
```

</div>

## Add the Lock Widget

Add **Auth0Lock** to your `index.html` file and set the viewport.

```html
<!-- Auth0 Lock script -->
<script src="${lock_url}"></script>

<!-- Setting the right viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

::: note
Some functionality provided by Lock is meant for regular web browsers. For best results, add `auth: { sso: false }` to your Lock configuration options.
:::

## Follow the frontend Quickstarts

You can use any frontend technology you like in your Electron application. Follow the [quickstart](/quickstart/spa) guide specific to your use case.

In the simple case of using [jQuery](/quickstart/spa/jquery), you can provide a control to render the Lock widget which will allow the user to log in.

![Lock](/media/articles/electron/lock-open.png)

If the user logs in with a social provider, they will be prompted for their credentials.

![Lock Google](/media/articles/electron/lock-google-open.png)
