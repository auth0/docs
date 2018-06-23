<%= include('../../../../_includes/_callback_url') %>

This tutorial series uses a callback URL that looks like this:

```js
demo://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback
```

Replace `YOUR_APP_PACKAGE_NAME` with your application's package name, available as the `applicationId` attribute in the `app/build.gradle` file.
