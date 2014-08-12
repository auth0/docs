# Using Auth0 with Ionic Framework (PhoneGap/Cordova + Angular)

This tutorial explains how to integrate Auth0 with a Ionic application. 

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
 cordova plugin add org.apache.cordova.inappbrowser
```

And add to your `config.xml`:

```xml
<feature name="InAppBrowser">
    <param name="ios-package" value="CDVInAppBrowser" />
</feature>
```

### 3. Customize it to your needs

Take a look at the [Angular Examples](https://github.com/auth0/auth0-angular/tree/master/examples).

