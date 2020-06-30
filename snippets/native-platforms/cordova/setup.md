### Add Cordova Plugins

You must install the `SafariViewController` plugin from Cordova to be able to show the login page. The downloadable sample project already has this plugin added, but if you are adding Auth0 to your own application, install the plugin via the command line.

```bash
cordova plugin add cordova-plugin-safariviewcontroller
```

The `CustomURLScheme` plugin from Cordova is also required to handle redirects properly. The sample project has it already, but if you're adding Auth0 to your own project, install this plugin as well.

```bash
# replace YOUR_PACKAGE_ID with your app identifier
cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME={YOUR_PACKAGE_ID} --variable ANDROID_SCHEME={YOUR_PACKAGE_ID} --variable ANDROID_HOST=${account.namespace} --variable ANDROID_PATHPREFIX=/cordova/{YOUR_PACKAGE_ID}/callback
```

## Integrate Auth0 in your Application

### Modify config.xml

Add `<preference name="AndroidLaunchMode" value="singleTask" />` to your config.xml. This will allow the Auth0 dialog to properly redirect back to your app.