# Using Auth0 with PhoneGap/Cordova

This tutorial explains how to integrate Auth0 with a Phonegap/Cordova application.

## Tutorial

### 1. Get Auth0.js or Auth0 Login Widget

We support multiple ways of doing this:

 * Using bower install `auth0.js` or the `auth0-widget.js` package.
 * Using npm install `auth0-js` or the `auth0-widget.js` package.
 * Download directly from here: [Auth0.js](@@auth0js_url@@) or [Auth0 Widget](@@widget_url@@).

Move that script into your scripts folder (usually `app/scripts/`). Then, in you `index.html` reference that file. For Auth0.js case it will look like this:

   ```
   <script src="scripts/auth0.js"> </script>
   ```

   or in case of the widget:

   ```
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

### 3a. If you are using the widget

```
<script type="text/javascript">
	
  var widget = new Auth0Widget({
    domain:         'your-domain.auth0.com',
    clientID:       'your-client-id'
  });
  
</script>
<button onclick="widget.signin({ scope: 'openid profile' })">Login</button>
```

### 3b. If you are using Auth0.js

```
<button class="signin-google">Sign in with Google</button><br>
<br><p>--- or ---</p>
<label>Email</label><input type="text" id="email"><br>
<label>Password</label><input type="password" id="password"><br>
<button class="signin-db">Sign in with Email/Password</button>

<script src="lib/jquery.js"></script>
<script>
  var auth0 = new Auth0({
    domain:         'your-domain.auth0.com',
    clientID:       'your-client-id'
  });

  $('.signin-google').on('click', function() {
    auth0.signin({connection: 'google-oauth2'}, function (err, profile, id_token, access_token, state) {
      /* 
          store the profile and id_token in a cookie or local storage
            $.cookie('profile', profile);
            $.cookie('id_token', id_token);
        */    
    }); 
  });

  $('.signin-db').on('click', function() {
    auth0.signin({
      connection: 'foo', 
      username: 'bar', 
      password: 'foobar'
    },
    function (err, profile, id_token, access_token, state) {
      /* 
          store the profile and id_token in a cookie or local storage
            $.cookie('profile', profile);
            $.cookie('id_token', id_token);
        */
    });
  });
</script>
```

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
