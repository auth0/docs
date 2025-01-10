To integrate Auth0 in a hybrid Cordova application, you can use the `@auth0/cordova` package available on npm. This package provides an interface with Cordova which allows you to use the [Proof Key for Code Exchange (PKCE)](https://tools.ietf.org/html/rfc7636) spec. PKCE is recommended for native and hybrid applications to mitigate the threat of authorization code interception.

::: note
Please note that PKCE authentication requires testing on either an emulated or real device. Attempting authentication when testing in the browser will fail because PKCE requires a device browser.
:::

<%= include('../../../_includes/_new_app') %>

<%= include('../../../_includes/_callback_url') %>

The **Callback URL** to be used for your application includes your app's package ID which is found in the `config.xml` file for your app.

Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in your Auth0 dashboard and set your **Callback URL** in the **Allowed Callback URLs** box.

```bash
# replace YOUR_PACKAGE_ID with your app package ID
YOUR_PACKAGE_ID://${account.namespace}/cordova/YOUR_PACKAGE_ID/callback
```

Add `file` as an allowed origin to the **Allowed Origins (CORS)** box.

```bash
file://*
```

Lastly, be sure that the **Application Type** for your application is set to **Native** in its settings.

${snippet(meta.snippets.dependencies)}

${snippet(meta.snippets.setup)}