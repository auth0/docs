---
section: libraries
toc: true
description: Details on the Lock v11 API.
---
# Lock API Reference

Lock has many methods, features, and configurable options. This reference is designed to direct you to the ones that you need, and discuss how to use them. Click below to go straight the method you're looking for, or just browse! If you're looking for information about events emitted by Lock, they're listed under the [on()](#on-event-callback-) method section!

- [new Auth0Lock](#auth0lock) - Instantiating Lock
- [getUserInfo()](#getuserinfo-) - Obtaining the profile of a logged in user
- [show()](#show-) - Showing the Lock widget
- [on()](#on-) - Listening for events
- [resumeAuth()](#resumeauth-) - Use to complete authentication flow when `autoParseHash` is false
- [checkSession()](#checksession-) - Get a new token from Auth0 for an authenticated user
- [logout()](#logout-) - Log out the user

## Auth0Lock

```js
new Auth0Lock(clientID, domain, options)
```

Initializes a new instance of `Auth0Lock` configured with your application's `clientID` and your account's `domain` from your [Auth0](${manage_url}/) management dashboard. The third and optional parameter is an `options` object used to configure Lock for your application's needs. You can find this information at your [application settings](${manage_url}/#/applications).

- **clientId {String}**: Required parameter. Your application's _clientId_ in Auth0.
- **domain {String}**: Required parameter. Your Auth0 _domain_. Usually _your-account.auth0.com_.
- **options {Object}**: Optional parameter. Allows for the configuration of Lock's appearance and behavior. See [the configuration options page](/libraries/lock/v11/configuration) for details.

**Example:**

```js
var clientId = '${account.clientId}';
var domain = '${account.namespace}';
// Instantiate Lock - without custom options
var lock = new Auth0Lock(clientId, domain);

// Listen for the authenticated event and get profile
lock.on("authenticated", function(authResult) {
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    // Save token and profile locally
    localStorage.setItem("accessToken", authResult.accessToken);
    localStorage.setItem("profile", JSON.stringify(profile));

    // Update DOM
  });
});
```

## getUserInfo()

```js
getUserInfo(accessToken, callback)
```

Once the user has logged in and you are in possesion of a token, you can use that token to obtain the user's profile with `getUserInfo`. This method replaces the deprecated `getProfile()`.

- **accessToken {String}**: User token.
- **callback {Function}**: Will be invoked after the user profile been retrieved.

**Example:**

```js
lock.getUserInfo(accessToken, function(error, profile) {
  if (!error) {
    alert("hello " + profile.name);
  }
});
```

## show()

```js
show(options)
```

The `show` method displays the widget. Beginning with Lock version 10.2.0, the `show` method can now accept an `options` object as a parameter. Note that this parameter is meant to be used as a way to _override_ your Lock's `options` for this particular displaying of the widget - options should be _set_ when instantiating Lock, and _overridden_, only if needed for your specific use case, here.

The following subset of `options` to be overridden from the values they were given (or their defaults) when Lock was instantiated:

- [allowedConnections](/libraries/lock/v11/configuration#allowedconnections-array-)
- [auth.params](/libraries/lock/v11/configuration#params-object-)
- [allowLogin](/libraries/lock/v11/configuration#allowlogin-boolean-)
- [allowSignUp](/libraries/lock/v11/configuration#allowsignup-boolean-)
- [allowForgotPassword](/libraries/lock/v11/configuration#allowforgotpassword-boolean-)
- [initialScreen](/libraries/lock/v11/configuration#initialscreen-string-)
- [rememberLastLogin](/libraries/lock/v11/configuration#rememberlastlogin-boolean-)

For more detail on the entire list of configurable options that can be chosen when instantiating Lock, as opposed to the limited subset above that can be overridden in the `show` method, please see the [user configurable options page](/libraries/lock/v11/configuration).

Options override examples:

```js
// Show the Lock widget, without overriding any options
lock.show();
```

```js
// Show the Lock widget, overriding some options
lock.show({
  allowedConnections: ["twitter", "facebook"],
  allowSignUp: false
});
```

::: panel When to set your configuration options
Options should be set when first instantiating Lock `var lock = new Auth0Lock(clientId, domain, options);`. Options should only be passed to `show` in order to override your previously set options while displaying the widget at this particular time and place.

Previous users of Lock 9 should note that this is a different behavior from `options` in Lock 9, where all options were set as parameters of `show` and not at instantiation.
:::

There is an additional option that can be set in the `show` method called `flashMessage`.

### flashMessage

This object is _only_ available as an option for the `show` method, not for use in the normal `options` object when instantiating Lock. The `flashMessage` object shows an error or success flash message when Lock is shown. It has the following parameters:

- **type** {String}: The message type, it should be either `error` or `success`.
- **text** {String}: The text to show.

An example of usage:

```js
lock.show({
  flashMessage:{
    type: 'success',
    text: 'Amazing Success!!'
  }
});
```

![Lock - Flash Message](/media/articles/libraries/lock/v10/flashMessage.png)

A practical application of the `flashMessage` option is to handle authorization errors. The `flashMessage` can be populated with error description text.

```js
lock.on('authorization_error', function(error) {
  lock.show({
    flashMessage: {
      type: 'error',
      text: error.errorDescription
    }
  });
});
```

So, if `tester@example.com` were now to try to sign in, being a user who is blocked, the user will be shown Lock again, and receive the following error message:

![Lock - Flash Message](/media/articles/libraries/lock/v10/flashmessage2.png)

Rather than simply failing to login, and Lock closing.

## hide()

```js
hide()
```

The `hide` method closes the widget if it is currently open. The widget closes itself under most circumstances, so this method would primarily be invoked in specific use cases only. For instance, one might wish to listen for the `unrecoverable_error` event and then `hide` the Lock and redirect to their own custom error page. Another example is users who are implementing [popup mode](/libraries/lock/v11/popup-mode), and might need to manually `hide` the widget after the `authenticated` event fires.

Example usage to hide (close) the Lock widget in popup mode:

```js
// Listen for authenticated event and hide Lock
lock.on("authenticated", function() {
  lock.hide();

  // Whatever else you'd like to do on authenticated event

});
```

## on()

```js
on(event, callback)
```

Lock will emit events during its lifecycle. The `on` method can be used to listen for particular events and react to them.

- `show`: emitted when Lock is shown. Has no arguments.
- `hide`: emitted when Lock is hidden. Has no arguments.
- `unrecoverable_error`: emitted when there is an unrecoverable error, for instance when no connection is available. Has the error as the only argument.
- `authenticated`: emitted after a successful authentication. Has the authentication result as the only argument. The authentication result contains the token which can be used to get the user's profile or stored to log them in on subsequent checks. 
- `authorization_error`: emitted when authorization fails. Has error as the only argument.
- `hash_parsed`: every time a new Auth0Lock object is initialized in redirect mode (the default), it will attempt to parse the hash part of the url looking for the result of a login attempt. This is a low level event for advanced use cases and `authenticated` and `authorization_error` should be preferred when possible. After that this event will be emitted with `null` if it couldn't find anything in the hash. It will be emitted with the same argument as the `authenticated` event after a successful login or with the same argument as `authorization_error` if something went wrong. This event won't be emitted in [popup mode](/libraries/lock/v11/authentication-modes) because there is no need to parse the url's hash part.
- `forgot_password ready`: emitted when the "Forgot password" screen is shown. (Only in Version >`10.18`)
- `forgot_password submit`: emitted when the user clicks on the submit button of the "Forgot password" screen. (Only in Version >`10.14`)
- `signin ready`: emitted when the "Sign in" screen is shown.
- `signup ready`: emitted when the "Sign up" screen is shown.
- `signin submit`: emitted when the user clicks on the submit button of the "Login" screen. (Only in Version >`10.18`)
- `signup submit`: emitted when the user clicks on the submit button of the "Sign Up" screen. (Only in Version >`10.18`)
- `federated login`: emitted when the user clicks on a social connection button. Has the connection name and the strategy as arguments. (Only in Version >`10.18`)

The `authenticated` event listener has a single argument, an `authResult` object. This object contains the following properties: `accessToken`, `idToken`, `state`, `refreshToken` and `idTokenPayload`.

An example use of the `authenticated` event:

```js
// Listen for authenticated event; pass the result to a function as authResult
lock.on("authenticated", function(authResult) {
  // Call getUserInfo using the token from authResult
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }
    // Store the token from authResult for later use
    localStorage.setItem('accessToken', authResult.accessToken);
    // Display user information
    show_profile_info(profile);
  });
});
```

## resumeAuth()

If you set the [auth.autoParseHash](/libraries/lock/v11/configuration#autoparsehash-boolean-) option to `false`, you'll need to call this method to complete the authentication flow. This method is useful when you're using a client-side router that uses a `#` to handle urls (angular2 with `useHash`, or react-router with `hashHistory`).

- **hash** {String}: The hash fragment received from the redirect.
- **callback** {Function}: Will be invoked after the parse is done. Has an error (if any) as the first argument and the authentication result as the second one. If there is no hash available, both arguments will be `null`.

```js
lock.resumeAuth(hash, function(error, authResult) {
  if (error) {
    alert("Could not parse hash");
  }
  console.log(authResult.accessToken);
});
```

## checkSession()

The `checkSession` method allows you to acquire a new token from Auth0 for a user who is already authenticated against Auth0 for your domain. It takes the following parameters:

- **options** {Object}: Optional. Accepts any valid OAuth2 parameters that would normally be sent to `/authorize`. If you omit them, it will use the ones provided when initializing Auth0.
- **callback** {Function}: Will be invoked with the token renewal result. Has an error (if any) as the first argument and the authentication result as the second one.

```js
lock.checkSession({}, function(err, authResult) {
  // handle error or new tokens
});
```

## logout()

Logs out the user.

- **options** {Object}: This is optional and follows the same rules as [auth0.js logout](/libraries/auth0js#logout)

```js
lock.logout({
  returnTo: 'https://myapp.com/bye-bye'
});
```
