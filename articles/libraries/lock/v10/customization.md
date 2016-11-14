---
description: Lock 10 has many configurable options that allow you to change the behavior, appearance, and connectivity of the Lock widget - this resource provides the details on those options for you!
---

<%= include('../_includes/_lock-version') %>

# Lock: User configurable options
The **Auth0Lock** can be configured through the `options` parameter sent to the constructor. These options can alter the way that the Lock widget behaves, how it deals with connections, additional signup fields that you require for your project, the language and text values, colors, and images on the widget, and many more. Take a look at the index below if you know what you are looking for, or browse the options for more details.

```js
var lock = new Auth0Lock('clientID', 'account.auth0.com', options);
```

## Index of Configurable Options

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
- [theme](#theme-object-)
- [authButtons](#authbuttons-object-)
- [labeledSubmitButton](#labeledsubmitbutton-boolean-)
- [logo](#logo-string-)
- [primaryColor](#primarycolor-string-)

**Social Options**:
- [socialButtonStyle](#socialbuttonstyle-string-)

**Authentication setup**:
- [auth](#auth-object-)
- [connectionScopes](#connectionscopes-object-)
- [params](#params-object-)
- [redirect](#redirect-boolean-)
- [redirectUrl](#redirecturl-string-)
- [responseMode](#responsemode-string-)
- [responseType](#responsetype-string-)
- [sso](#sso-boolean-)

**Database Options**:
- [additionalSignUpFields](#additionalsignupfields-array-)
- [allowLogin](#allowlogin-boolean-)
- [allowForgotPassword](#allowforgotpassword-boolean-)
- [allowSignUp](#allowsignup-boolean-)
- [defaultDatabaseConnection](#defaultdatabaseconnection-string-)
- [initialScreen](#initialscreen-string-)
- [loginAfterSignUp](#loginaftersignup-boolean-)
- [forgotPasswordLink](#forgotpasswordlink-string-)
- [mustAcceptTerms](#mustacceptterms-boolean-)
- [prefill](#prefill-object-)
- [signUpLink](#signuplink-string-)
- [usernameStyle](#usernamestyle-string-)

**Enterprise Options**:
- [defaultEnterpriseConnection](#defaultenterpriseconnection-string-)

**Other Options**:
- [clientBaseUrl](#clientbaseurl-string-)
- [languageBaseUrl](#languagebaseurl-string-) 

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

Examples of `allowedConnections`:

![Lock - Allowed Connections](/media/articles/libraries/lock/v10/customization/lock-allowedconnections-database.png)

![Lock - Allowed Connections](/media/articles/libraries/lock/v10/customization/lock-allowedconnections-social.png)

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
      // will preload the image before displaying it.
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

Default behavior with Gravatar:

![Lock - Avatar](/media/articles/libraries/lock/v10/customization/lock-avatar.png)


### closable {Boolean}

Determines whether or not the Lock can be closed. When a `container` option is provided its value is always `false`, otherwise it defaults to `true`.

```js
var options = {
  closable: false
};
```

![Lock - Closable](/media/articles/libraries/lock/v10/customization/lock-closable.png)


### container {String}

The `id` of the html element where the widget will be shown. 

::: panel-info Side effects
This makes the widget appear inline within your `div` instead of in a modal pop-out window.
:::


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

![Lock - Container](/media/articles/libraries/lock/v10/customization/lock-container.png)

### language {String}:

Specifies the language of the widget. Defaults to "en". See the [internationalization directory](https://github.com/auth0/lock/blob/master/src/i18n/) for a current list of provided languages.


```js
// select a supported language
var options = {
  language: 'es'
};
```

![Lock - Language](/media/articles/libraries/lock/v10/customization/lock-language.png)


### languageDictionary {Object}

Allows customization of every piece of text displayed in the Lock. Defaults to {}. See English language [Language Dictionary Specification](https://github.com/auth0/lock/blob/master/src/i18n/en.js) for the full list of `languageDictionary` values able to be altered with this object.

```js
var options = {
  languageDictionary: {
    emailInputPlaceholder: "something@youremail.com",
    title: "Log me in"
  },
};
```

![Lock - Language Dictionary](/media/articles/libraries/lock/v10/customization/lock-languagedictionary.png)

Additionally, check out the [Customizing Error Messages](/libraries/lock/v10/customizing-error-messages) page or the [Internationalization](/libraries/lock/v10/i18n) page for more information about the use of the `languageDictionary` option.


### popupOptions {Object}

Allows the customization the location of the popup in the screen. Any position and size feature allowed by window.open is accepted. Defaults to {}.

Options for the `window.open` [position and size][windowopen-link] features. This only applies if `redirect` is set to `false`.

```js
var options = {
  redirect: false,
  popupOptions: { width: 300, height: 400, left: 200, top: 300 }
};
```

### rememberLastLogin {Boolean}

Determines whether or not to show a screen that allows you to quickly log in with the account you used the last time. Defaults to true.
Request for SSO data and enable **Last time you signed in with[...]** message. Defaults to `true`.

```js
var options = {
  rememberLastLogin: false
};
```

---

## Theming Options

### theme {Object}

Theme options are grouped in the `theme` property of the `options` object.

#### authButtons {Object}

Allows the customization of buttons in Lock. Each custom connection whose button you desire to customize should be listed by name, each with their own set of parameters. The customizable parameters are listed below:

- **displayName** {String}: The name to show instead of the connection name when building the button title, such as `LOGIN WITH MYCONNECTION` for login).
- **primaryColor** {String}: The button's background color. Defaults to "#eb5424".
- **foregroundColor** {String}: The button's text color. Defaults to "#FFFFFF".
- **icon** {String}: The URL of the icon for this connection. For example: "http://site.com/logo.png".

```js
var options = {
  theme: {
    authButtons: {
      "testConnection": {
        displayName: "Test Conn", 
        primaryColor: "#b7b7b7", 
        foregroundColor: "#000000", 
        icon: "http://example.com/icon.png"
      },
      "testConnection2": {
        primaryColor: "#000000", 
        foregroundColor: "#ffffff", 
      }
    }
  }
};
```

#### labeledSubmitButton {Boolean}

This option indicates whether or not the submit button should have a label, and defaults to `true`. When set to `false`, an icon will be shown instead. 

```js
var options = {
  theme: {
    labeledSubmitButton: false
  }  
};
```

![Lock - Labeled Submit Button](/media/articles/libraries/lock/v10/customization/lock-theme-labeledsubmitbutton.png)

If the label is set to true, which is the default, the label's text can be customized through the [languageDictionary](#languagedictionary-object-) option.

#### logo {String}

The value for `logo` is an URL for an image that will be placed in the Lock's header, and defaults to Auth0's logo. It has a recommended max height of `58px` for a better user experience.

```js
var options = {
  theme: {
    logo: 'https://example.com/logo.png'
  }  
};
```

![Lock - Theme - Logo](/media/articles/libraries/lock/v10/customization/lock-theme-logo.png)


#### primaryColor {String}

The `primaryColor` property defines the primary color of the Lock; all colors used in the widget will be calculated from it. This option is useful when providing a custom `logo`, to ensure all colors go well together with the `logo`'s color palette. Defaults to `#ea5323`.

```js
var options = {
  theme: {
    logo: 'https://example.com/logo.png',
    primaryColor: '#31324F'
  }  
};
```

![Lock - Theme - Primary Color](/media/articles/libraries/lock/v10/customization/lock-theme-primarycolor.png)


---

## Social Options 

### socialButtonStyle {String}

Determines the size of the buttons for the social providers. Possible values are `big` and `small`. The default style depends on the connections that are available:
 - If only social connections are available, it will default to `big` when there are 5 connections at most, and default to `small` otherwise.
 - If connections from types other than social are also available, it will default to `big` when there are 3 social connections at most, and default to `small` otherwise.

First example, with three social connections, and other connections (in this case, a username-password connection) - with forced small buttons.

```js
var options = {
  socialButtonStyle: 'small'
};
```

![Lock - Social Button Style](/media/articles/libraries/lock/v10/customization/lock-socialbuttonstyle-small.png)
 
---

Second example, with `socialButtonStyle` remaining at default behavior - three social connections, with no other connections enabled for this client in the dashboard.

```js
var options = {};
```

![Lock - Social Button Style](/media/articles/libraries/lock/v10/customization/lock-socialbuttonstyle-default-social.png)
 
---

Third example, with `socialButtonStyle` remaining at default behavior - the app has three social connections, with other connections turned on in the dashboard (in this case, a username-password connection).

```js
var options = {};
```

![Lock - Social Button Style](/media/articles/libraries/lock/v10/customization/lock-socialbuttonstyle-default.png)

---
 
Fourth example, with three social connections, and no other connections enabled in the dasbboard, but with forced small buttons.

```js
var options = {
  socialButtonStyle: 'small'
};
```

![Lock - Social Button Style](/media/articles/libraries/lock/v10/customization/lock-socialbuttonstyle-small-social.png)
 
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

#### connectionScopes {Object}

This option allows you to set scopes to be sent to the oauth2/social connection for authentication.

```js
var options = {
  auth: {
    connectionScopes: {
      'facebook': ['scope1', 'scope2']
    }
  }
};
```

A listing of particular scopes for your social connections can be acquired from the provider in question. For example, [Facebook for Developers](https://developers.facebook.com/docs/facebook-login/permissions/) reference has a listing of separate permissions that can be requested for your connection.

#### params {Object}

You can send parameters when starting a login by adding them to the options object. The example below adds a `state` parameter with a value equal to `foo` and also adds a `scope` parameter (which includes the scope, and then the requested attributes). [Read here][authparams-link] to learn more about what `authParams` can be set.

```js
var options = {
  auth: {
    params: {
      state: 'foo',
      scope: 'openid email user_metadata app_metadata picture'
    },
  }
};  
```

::: panel-info Supported parameters
For more details about supported parameters check the [Authentication Parameters][authparams-link] documentation page.
:::

#### redirect {Boolean}

Defaults to true. When set to true, redirect mode will be used. If set to false, popup mode is chosen. 

::: panel-warning Popup mode
WARNING: There is a known bug that prevents popup mode from functioning properly in Android or Firefox on iOS, and in Internet Explorer under certain circumstances. As such we recommend either only using redirect mode or detecting these special cases and selectively enabling redirect mode. See more info here.
:::

```js
var options = {
  auth: {
    redirect: false
  }
};  
```

#### redirectUrl {String}

The URL Auth0 will redirect back to after authentication. Defaults to the empty string "" (no redirect URL).

```js
var options = {
  auth: {
    redirectUrl: 'http://testurl.com'
  }
};  
```

::: panel-info Side effects
When the `redirectUrl` is provided (set to non blank value) the `responseType` option will be defaulted to `code` if not manually set.
:::

#### responseMode {String}

Should be set to `"form_post"` if you want the code or the token to be transmitted via an HTTP POST request to the `redirectUrl`, instead of being included in its query or fragment parts. 

Otherwise, this option should be omitted, and is omitted by default.

```js
var options = {
  auth: {
    responseMode: 'form_post'
  }
};  
```

#### responseType {String}

The value of `responseType` should be set to "token" for Single Page Applications, and "code" otherwise. Defaults to "code" when redirectUrl is provided, and to "token" otherwise.

```js
var options = {
  auth: {
    responseType: 'token'
  }
};  
```

#### sso {Boolean}

 When Lock is initialized it will make a request to obtain SSO data. If the `sso` option is set to `true`, the data is fetched and a cookie is set after a successful login.

::: panel-warning Multifactor authentication
Failing to set this to true will result in multifactor authentication not working correctly.
:::

```js
var options = {
  auth: {
    sso: true
  }
};  
```

---

## Database Options

### additionalSignUpFields {Array}

Extra input fields can be added to the sign up screen with the `additionalSignUpFields` option. Every input must have a `name` and a `placeholder`, and an `icon` url can also be provided. Also, the initial value can be provided with the `prefill` option, which can be a string with the value or a function that obtains it. Other options depend on the type of the field, which is defined via the type option and defaults to "text".

::: panel-info Intended for use with database signup only
`additionalSignupFields` are intended for use with database signups only. If you have social sign ups too, you can ask for the additional information after the users sign up. You can use the `databaseAlternativeSignupInstructions` i18n key to display these instructions.
:::

The new fields are rendered below the regular sign up input fields in the order they are provided. 

#### Text Fields

A `validator` function can also be provided.

```js
var options = {
  additionalSignUpFields: [{
    name: "address",
    placeholder: "enter your address",
    // The following properties are optional
    icon: "https://example.com/assests/address_icon.png",
    prefill: "street 123",
    validator: function(address) {
      return {
         valid: address.length >= 10,
         hint: "Must have 10 or more chars" // optional
      };
    }
  },
  {
    name: "full_name",
    placeholder: "Enter your full name"
  }]
}
```

![Lock - Additional Signup Fields](/media/articles/libraries/lock/v10/customization/lock-additionalsignupfields.png)


#### Select Field

```js
var options = {
  additionalSignUpFields: [{
    type: "select",
    name: "location",
    placeholder: "choose your location",
    options: [
      {value: "us", label: "United States"},
      {value: "fr", label: "France"},
      {value: "ar", label: "Argentina"}
    ],
    // The following properties are optional
    icon: "https://example.com/assests/location_icon.png",
    prefill: "us"
  }]
}
```

The `options` array items for `select` fields must adhere to the following format:
`{label: “non empty string”, value: “non empty string”}`, and at least one option must be defined.

The `options` and `prefill` values can be provided through a function:

```js
var options = {
  additionalSignUpFields: [{
    type: "select",
    name: "location",
    placeholder: "choose your location",
    options: function(cb) {
      // obtain options, in case of error you call cb with the error in the
      // first arg instead of null
      cb(null, options);
    },
    icon: "https://example.com/assests/location_icon.png",
    prefill: function(cb) {
      // obtain prefill, in case of error you call cb with the error in the
      // first arg instead of null
      cb(null, prefill);
    }
  }]
}
```

::: panel-info Using additionalSignupFields for email
Some use cases may be able to use `additionalSignupFields` data for email templates, such as an option for language preferences, the value of which could then be used to set the language of templated email communications.
:::

### allowLogin {Boolean}

When set to `false` the widget won't display the login screen. This is useful if you want to use the widget just for signups (the login and signup tabs in the signup screen will be hidden) or to reset passwords (the back button in the forgot password screen will be hidden). In such cases you may also need to specify the `initialScreen`, `allowForgotPassword` and `allowSignUp` options. It defaults to `true`.

```js
//
var options = {
  allowLogin: false
};
```

![Lock - Allow Login](/media/articles/libraries/lock/v10/customization/lock-allowlogin.png)

### allowForgotPassword {Boolean}

When set to false, `allowForgotPassword` hides the "Don't remember your password?" link in the Login screen, making the Forgot Password screen unreachable. Defaults to true. 

::: panel-info Side effects
Keep in mind that if you are using a database connection with a custom database which doesn't have a change password script the Forgot Password screen won't be available.
:::

```js
//
var options = {
  allowForgotPassword: false
};
```

![Lock - Allow Forgot Password](/media/articles/libraries/lock/v10/customization/lock-allowforgotpassword.png)

### allowSignUp {Boolean}

When set to `false`, hides the login and sign up tabs in the login screen, making the sign up screen unreachable. Defaults to `true`. Keep in mind that if the database connection has sign ups disabled or you are using a custom database which doesn't have a create script, then the sign up screen won't be available.

Also bear in mind that this option **only** controls client-side appearance, and does not completely stop new sign ups from determined anonymous visitors. If you are looking to fully prevent new users from signing up, you must use the **Disable Sign Ups** option in the dashboard, in the connection settings.

```js
var options = {
  allowSignUp: false
};
```

![Lock - Social Button Style](/media/articles/libraries/lock/v10/customization/lock-allowsignup.png)

### defaultDatabaseConnection {String}

Specifies the database connection that will be used when there is more than one available.

```js
var options = {
  defaultDatabaseConnection: 'test-database'
};
```

### initialScreen {string}

The name of the screen that will be shown when the widget is opened. Valid values are `login`, `signUp`, and `forgotPassword`. If this option is left unspecified, the widget will default to the first screen that is available from that list.

```js
var options = {
  initialScreen: 'forgotPassword'
};
```

### loginAfterSignUp {Boolean}

Determines whether or not the user will be automatically signed in after a successful sign up. Defaults to `true`.

```js
var option = {
  loginAfterSignUp: false
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

When set to `true` displays a checkbox input alongside the terms and conditions that must be checked before signing up. The terms and conditions can be specified via the `languageDictionary` option. This option will only take effect for users signing up with database connections. Defaults to `false`.

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

### signUpLink {String}

Set the URL to be requested when clicking on the Signup button. 

::: panel-info Side effects
When set to a non empty string, this option forces `allowSignUp` to `true`.
:::

```js
//
var options = {
  signUpLink: 'https://yoursite.com/signup'
};
```

### usernameStyle {String}

Determines what will be used to identify the user for a Database connection that has the `requires_username` flag set (if it is not set, `usernameStyle` option will be ignored). Possible values are `"username"` and `"email"`. By default both `username` and `email` are allowed; setting this option will limit logins to use one or the other.

```js
var options = {
  // Limits logins to usernames only, not emails
  usernameStyle: 'username'
};
```

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

### integratedWindowsLogin {Boolean}

Allows for Realm discovery by `AD`, `LDAP` connections. Defaults to `true`.

```js
// disable Realm discovery to force
// input of credentials
var options = {
  integratedWindowsLogin: false
};
```

---

## Other Options

### clientBaseUrl {String}

This option can overr URL to override client settings base URL. By default, it uses Auth0's CDN URL when the domain has the format `*.auth0.com`. For example, if your URL is `contoso.eu.auth0.com`, then by default, the `clientBaseUrl` is `cdn.eu.auth0.com`. If the `clientBaseUrl` option is set instead, it uses the provided domain. This would only be necessary if your specific use case dictates that your client not use the default behavior.

```js
var options = {
  clientBaseUrl: "http://www.example.com"
};
```

### languageBaseUrl {String}

Overrides the language source url for Auth0's provided translations. By default, this option uses Auth0's CDN URL `https://cdn.auth0.com` since this is where all of the provided translations are stored. By providing another value, you can use another source for the language translations if needed.

```js
var options = {
  languageBaseUrl: "http://www.example.com"
};
```

<%= include('../_includes/_lock-toc') %>

<!-- Vars-->

[authparams-link]: /libraries/lock/v10/sending-authentication-parameters
[windowopen-link]: https://developer.mozilla.org/en-US/docs/Web/API/Window.open#Position_and_size_features
