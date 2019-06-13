To integrate Auth0 in a hybrid Ionic app, you can use the `@auth0/cordova` package available on npm. This package provides an interface with Cordova which allows you to use the [Proof Key for Code Exchange (PKCE)](https://tools.ietf.org/html/rfc7636) spec. PKCE is recommended for native and hybrid applications to mitigate the threat of authorization code interception.

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

Lastly, be sure that the **Application Type** for your application is set to **Native** in the application settings.

## Install the Dependencies

The required dependencies for using Auth0 in an Ionic application are **auth0.js** and **auth0-cordova**. Install them with npm or yarn.

```bash
# installation with npm
npm install auth0-js @auth0/cordova --save

# installation with yarn
yarn add auth0-js @auth0/cordova
```

## Add Cordova Plugins

You must install the `SafariViewController` plugin from Cordova to be able to use Universal Login. The downloadable sample project already has this plugin added, but if you are embedding Auth0 in your own application, install the plugin via the command line.

```bash
ionic cordova plugin add cordova-plugin-safariviewcontroller
```

The `CustomURLScheme` plugin from Cordova is also required to handle redirects properly. The sample project has it already, but if you're adding Auth0 to your own project, install this plugin as well.

```bash
# replace YOUR_PACKAGE_ID with your app identifier
ionic cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME={YOUR_PACKAGE_ID} --variable ANDROID_SCHEME={YOUR_PACKAGE_ID} --variable ANDROID_HOST=${account.namespace} --variable ANDROID_PATHPREFIX=/cordova/{YOUR_PACKAGE_ID}/callback
```

## Modify config.xml

Add `<preference name="AndroidLaunchMode" value="singleTask" />` to your config.xml. This will allow the Auth0 dialog to properly redirect back to your app.
