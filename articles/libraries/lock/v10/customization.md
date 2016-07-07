
::: panel-info Lock Version
Heads up! This document is using the latest version of Lock (version 10). See changes from the old version in the [new features](libraries/lock/v10/new-features) page, see a learn how to migrate from version 9 to version 10 in the [migration guide](libraries/lock/v10/migration-guide), or see the [Lock 9 Documentation](/libraries/lock/v9) if you're looking for information about Lock 9.
:::

# Lock: User configurable options
The **Auth0Lock** can be customized through the `options` parameter sent to the constructor.

```js
var lock = new Auth0Lock('clientID', 'account.auth0.com', options);
```

## Table of Contents

**Display Options**:
- [allowedConnections](#allowedconnections-array-)
- [autoclose](#autoclose-boolean-)
- [autofocus](#autofocus-boolean-)
- [avatar](#avatar-object-)
- [closable](#closable-boolean-)
- [container](#container-string-)
- [language](#language-string-)
- [languageDictionary](#languagedictionary-object-)
- [popupOptions](#popupoptions-object-)
- [rememberLastLogin](#rememberlastlogin-boolean-)

**Theming Options**:
- [theme](#theme-string-)

**Social Options**:
- [socialButtonStyle](#socialbuttonstyle-string-)

**Authentication setup**:
- [auth](#auth-object-)
- [params](#params-object-)
- [redirect](#redirect-boolean-)
- [redirectUrl](#redirecturl-string-)
- [responsetype](#responsetype-string-)
- [sso](#sso-boolean-)

**Database Options**:
- [additionalSignUpFields](#additionalsignUpfields-array-)
- [allowLogin](#allowlogin-boolean-)
- [allowForgotPassword](#allowforgotpassword-boolean-)
- [allowSignup](#allowsignup-boolean-)
- [defaultDatabaseConnection](#defaultdatabaseconnection-string-)
- [initialScreen](#initialscreen-string-)
- [loginAfterSignup](loginaftersignup-boolean-)
- [forgotPasswordLink](forgotpasswordlink-string-)
- [mustAcceptTerms](mustacceptterms-Boolean-)
- [prefill](prefill-object-)
- [signupLink](signuplink-string-)
- [usernameStyle](usernamestyle-string-)

**Enterprise Options**:
- [defaultEnterpriseConnection](#defaultenterpriseconnection-string-)


---

## Display Options

### allowedConnections {Array}
Array of connections that will be used for the `signin|signup|reset` actions. Defaults to all enabled connections.

```js
// The following will only display
// username and password sign in form
var options = {
  allowedConnections: ['Username-Password-Authentication']
};

// ... social connections only
var options = {
  allowedConnections: ['twitter', 'facebook', 'linkedin']
};

// ... enterprise connections only
var options = {
  allowedConnections: ['qraftlabs.com']
};
```

![](/media/articles/libraries/lock/customization/connections.png)

### autoclose {Boolean}

Determines whether or not the Lock will be closed automatically after a successful sign in. Defaults to false.

::: panel-info Side effects
If the Lock is not `closable` it won't be closed, even if this option is set to true.
:::

```js
var options = {
  autoclose: true
};
```

### autofocus {Boolean}

If true, the focus is set to the first field on the widget. Defaults to `false` when being rendered on a mobile device, or if a `container` option is provided; defaults to `true` in all other cases.

```js
var options = {
  autofocus: false
};
```

### avatar {Object}

By default, Gravatar is used to fetch the user avatar and display name, but you can obtain them from anywhere with the `avatar` option.

```js
var options = {
  avatar: {
    url: function(email, cb) {
      // Obtain the avatar url for the email input by the user, Lock
      // will preload the image it before displaying it.
      // Note that in case of an error you call cb with the error in
      // the first arg instead of `null`.
      var url = obtainAvatarUrl(email);
      cb(null, url);
    },
    displayName: function(email, cb) {
      // Obtain the display name for the email input by the user.
      // Note that in case of an error you call cb with the error in
      // the first arg instead of `null`.
      var displayName = obtainDisplayName(email);
      cb(null, displayName);
    }
  }    
};
```

Or, if you want to display no avatar at all, simply pass in `null`.

```js
var options = {
  avatar: null
};
```

![](/media/articles/libraries/lock/customization/gravatar.png)

### closable {Boolean}

Determines whether or not the Lock can be closed. When a `container` option is provided its value is always `false`, otherwise it defaults to `true`.

```js
var options = {
  closable: false
};
```

![](/media/articles/libraries/lock/customization/closable.png)

### container {String}

The `id` of the html element where the widget will be shown. This makes the widget appear inline instead of in a modal window.

```html
<div id="hiw-login-container"></div>

<script>
  var options = {
    container: 'hiw-login-container'
  };

  // initialize
  var lock = new Lock('xxxxxx', '<account>.auth0.com', options);

  // render
  lock.show();
</script>
```

![](/media/articles/libraries/lock/customization/container.png)

### language {String}:

Specifies the language of the widget. Defaults to "en".


```js
// select a supported language
var options = {
  language: 'en'
};
```

![](/media/articles/libraries/lock/customization/language.png)

### languageDictionary {Object}

Allows customization of every piece of text displayed in the Lock. Defaults to {}. See below Language Dictionary Specification for the details.

```js
var options = {
  languageDictionary: {
    emailInputPlaceholder: "something@youremail.com",
    title: "Log me in"
  },
};
```

![](/media/articles/libraries/lock/customization/languageDictionary.png)

### popupOptions {Object}

Allows the customization the location of the popup in the screen. Any position and size feature allowed by window.open is accepted. Defaults to {}.

Options for the `window.open` [position and size][windowopen-link] features. This only applies if `popup` is set to true.

```js
var options = {
  redirect: false,
  popupOptions: { width: 300, height: 400, left: 200, top: 300 }
};
```

![](/media/articles/libraries/lock/customization/popupOptions.png)

### rememberLastLogin {Boolean}

Determines whether or not to show a screen that allows you to quickly log in with the account you used the last time. Defaults to true.
Request for SSO data and enable **Last time you signed in with[...]** message. Defaults to `true`.

```js
var options = {
  rememberLastLogin: false
};
```

![](/media/articles/libraries/lock/customization/rememberLastLogin.png)

---

## Theming Options

#### theme {Object}

Theme options are grouped in the `theme` property of the `options` object.

### logo {String}

The value for `logo` is an URL for an image that will be placed in the Lock's header, and defaults to Auth0's logo. It has a recommended max height of `58px` for a better user experience.

```js
var options = {
  theme: {
    logo: 'https://example.com/assets/logo.png'
  }  
};
```

#### primaryColor {String}

The `primaryColor` property defines the primary color of the Lock; all colors used in the widget will be calculated from it. This option is useful when providing a custom `logo`, to ensure all colors go well together with the `logo`'s color palette. Defaults to `#ea5323`.

```js
var options = {
  theme: {
    logo: 'https://example.com/assets/logo.png',
    primaryColor: 'green'
  }  
};
```

::: panel-info Disabling the header badge altogether
To disable the header badge entirely, [UI customizations][ui-customization] are required.
:::

---

## Social Options 

### socialButtonStyle {String}

Determines the size of the buttons for the social providers. Possible values are `big` and `small`. The default style depends on the connections that are available:
 - If only social connections are available, it will default to `big` when there are 5 connections at most, and default to `small` otherwise.
 - If connections from types other than social are also available, it will default to `big` when there are 3 social connections at most, and default to `small` otherwise.

```js
// First image, with three connections, and other connections - forcing small buttons
var options = {
  allowedConnections: ['facebook', 'linkedin', 'amazon'],
  socialButtonStyle: 'small'
};
```

```js
// Second image, with socialButtonStyle remaining at default behavior - three connections, no other connections
var options = {
  allowedConnections: ['facebook', 'linkedin', 'amazon']
};
```

```js
// Third image, with socialButtonStyle remaining at default behavior - three connections, with other connections
var options = {
  allowedConnections: ['facebook', 'linkedin', 'amazon']
};
```

```js
// Fourth image, with three connections, and no other connections - forcing small buttons
var options = {
  allowedConnections: ['facebook', 'linkedin', 'amazon'],
  socialButtonStyle: 'small'
};
```

![](/media/articles/libraries/lock/customization/socialBigButtons.png)

---

## Authentication Options

### auth {Object}

Authentication options are grouped in the auth property of the options object.

```js
var options = {
  auth: {
   params: {param1: "value1"},
   redirect: true,
   redirectUrl: "some url",
   responseType: "token",
   sso: true
  }
};
```

### params {Object}

You can send parameters when starting a login by adding them to the options object. The example below adds a `state` parameter with a value equal to `foo`. [Read here][authparams-link] to learn more about what `authParams` can be set.

```js
var options = {
  auth: {
    params: {state: "foo"},
  }
};  
```

::: panel-info Supported parameters
For more details about supported parameters check the [Authentication Parameters][authparams-link] documentation page.
:::

### redirect {Boolean}

Defaults to true. When set to true, redirect mode will be used. If set to false, popup mode is chosen. 

::: panel-warning Popup mode
WARNING: There is a known bug that prevents popup mode from functioning properly in Android or Firefox on iOS, and in Internet Explorer under certain circumstances. As such we recommend either only using redirect mode or detecting these special cases and selectively enabling redirect mode. See more info here.
:::

```js
var options = {
  auth: {
    params: {redirect: false},
  }
};  
```

### redirectUrl {String}

The URL Auth0 will redirect back to after authentication. Defaults to the empty string "" (no redirect URL).

```js
var options = {
  auth: {
    params: {redirectUrl: 'http://testurl.com'}
  }
};  
```

### responseType {String}

The value of `responseType` should be set to "token" for Single Page Applications, and "code" otherwise. Defaults to "code" when redirectUrl is provided, and to "token" otherwise.

```js
var options = {
  auth: {
    params: {responseType: 'token'}
  }
};  
```

### sso {Boolean}

 When Lock is initialized it will make a request to obtain SSO data. If the `sso` option is set to `true`, the data is fetched and a cookie is set after a successful login.

::: panel-warning Multifactor authentication
Failing to set this to true will result in multifactor authentication not working correctly.
:::

```js
var options = {
  auth: {
    params: {sso: true}
  }
};  
```

---

## Database Options

### additionalSignUpFields {Array}

### allowLogin {Boolean}

### allowForgotPassword {Boolean}

When set to false, `allowForgotPassword` hides the "Don't remember your password?" link in the Login screen, making the Forgot Password screen unreachable. Defaults to true. 

::: panel-info Side effects
Keep in mind that if you are using a database connection with a custom database which doesn't have a change password script the Forgot Password screen won't be available.
:::


```js
//
var options = {
  allowForgotPassword: true
};
```

![](/media/articles/libraries/lock/customization/allowForgotPassword.png)

### allowSignUp {Boolean}

When set to `false`, hides the login and sign up tabs in the login screen, making the sign up screen unreachable. Defaults to `true`. Keep in mind that if the database connection has sign ups disabled or you are using a custom database which doesn't have a create script, then the sign up screen won't be available.

Also bear in mind that this option **only** controls client-side appearance, and does not completely stop new sign ups from determined anonymous visitors. If you are looking to fully prevent new users from signing up, you must use the **Disable Sign Ups** option in the dashboard, in the connection settings.

```js
var options = {
  allowSignUp: false
};
```

![](/media/articles/libraries/lock/customization/disableSignupAction.png)

### defaultDatabaseConnection {String}

Specifies the database connection that will be used when there is more than one available.

```js
var options = {
  defaultDatabaseConnection: 'test-database'
};
```

### initialScreen {string}

### loginAfterSignup {Boolean}

Determines whether or not the user will be automatically signed in after a successful sign up. Defaults to `true`.

```js
var option = {
  loginAfterSignup: false
};
```

### forgotPasswordLink {String}

Set the URL for a page that allows the user to reset her password. When set to a non-empty string, the user will be sent to the provided URL when clicking the "Don't remember your password?" link in the login screen.

```js
//
var options = {
  forgotPasswordLink: 'https://yoursite.com/reset-password'
};
```

### mustAcceptTerms {Boolean}

When set to `true` displays a checkbox input along the terms and conditions that must be checked before signing up. The terms and conditions can be specified via the `languageDictionary` option, see the example below. Defaults to `false`.

```js
//
var options = {
  mustAcceptTerms: true
};
```

### prefill {Object}

Allows to set the initial value for the email and/or username inputs. When omitted, no initial value will be provided.

```js
//
var options = {
  prefill: '{prefill: {email: "someone@auth0.com", username: "someone"}}'
};
```

### signupLink {String}

Set the URL to be requested when clicking on the Signup button. 

::: panel-info Side effects
When set to a non empty string, this option forces `allowSignUp` to `true`.
:::

```js
//
lock.show({
  signupLink: 'https://yoursite.com/signup'
});
```

### usernameStyle {String}

Determines what will be used to identify the user, a `username` or an `email`. Defaults to `email`.

```js
var options = {
  usernameStyle: 'username'
};
```

![](/media/articles/libraries/lock/customization/usernameStyle.png)

---

## Enterprise Options

### defaultEnterpriseConnection {String}

Specifies the enterprise connection which allows to login using an username and a password that will be used when there is more than one available or there is a database connection. If a `defaultDatabaseConnection` is provided the database connection will be used and this option will be ignored.

```js
var options = {
  defaultEnterpriseConnection: 'test-database'
};
```

### defaultADUsernameFromEmailPrefix {Boolean}

Resolve the AD placeholder username from the email's prefix. Defaults to `true`.

```js
var options = {
  defaultADUsernameFromEmailPrefix: false
};
```

![](/media/articles/libraries/lock/customization/defaultADUsernameFromEmailPrefix.png)

### integratedWindowsLogin {Boolean}

Allows for Realm discovery by `AD`, `LDAP` connections. Defaults to `true`.

```js
// disable Realm discovery to force
// input of credentials
var options = {
  integratedWindowsLogin: false
};
```

// Vars

[authparams-link]: /libraries/lock/v10/sending-authentication-parameters
[windowopen-link]: https://developer.mozilla.org/en-US/docs/Web/API/Window.open#Position_and_size_features

[ui-customization]: /libraries/lock/v10/ui-customization
