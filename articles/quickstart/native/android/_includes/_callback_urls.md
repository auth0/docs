## Configure Callback URLs

<%= include('../../_includes/_callback-url-introduction') %>

To set a callback URL, navigate to the [settings](${manage_url}/#/applications/${account.clientId}/settings) for your client application and include the URL in the "Allowed Callback URLs" text box.

This tutorial series make use of a **Callback URL** that looks like this:

```js
demo://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback
```

Remember to replace `YOUR_APP_PACKAGE_NAME` with your actual application's package name, available in the `app/build.gradle` file as the `applicationId` attribute.
