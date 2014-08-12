# Using Auth0 with PhoneGap/Cordova

This tutorial explains how to integrate Auth0 with a Phonegap/Cordova application.

## Tutorial

### 1. Get Auth0.js or Auth0 Login Widget

We support multiple ways of doing this:

 * Using bower install `auth0.js` or the `auth0-widget.js` package.
 * Using npm install `auth0-js` or the `auth0-widget.js` package.
 * Download directly from here: [Auth0.js](@@auth0js_url@@) or [Auth0 Widget](@@widget_url@@).

Move that script into your scripts folder (usually `app/scripts/`). Then, in you `index.html` reference that file. For Auth0.js case it will look like this:

   ```html
   <script src="scripts/auth0.js"> </script>
   ```

   or in case of the widget:

   ```html
   <script src"scripts/auth0-widget.js"> </script>
   ```

### 2. Install InAppBrowser

Execute the following command to include `InAppBrowser` in your app:

```sh
 cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git
```

And add to your `config.xml`:

```xml
<feature name="InAppBrowser">
    <param name="ios-package" value="CDVInAppBrowser" />
</feature>
```


### 3. Customize it to your needs

@@sdk2@@

### 4. Add the platforms you want to support:

For instance, to support ios and android:

```
cordova platform add ios
cordova platform add android
```

### 5. Build your phonegap project

```
cordova build
```

Then, you can try your project by doing:

```
cordova emulate ios
```

Or if you want to try it on a browser:

```
cordova serve ios
```
