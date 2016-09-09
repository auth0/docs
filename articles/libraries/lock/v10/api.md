<%= include('../_includes/_lock-version') %>

# API

Lock has many methods, features, and configurable options. This reference is designed to direct you to the ones that you need, and discuss how to use them. Click below to go straight the method you're looking for, or just browse! If you're looking for information about events emitted by Lock, they're listed under the [on()](#on-event-callback-) method section!

* [new Auth0Lock](#new-auth0lock-clientid-domain-options-) - Instantiating Lock
* [getProfile()](#getprofile-token-callback-) - Obtaining the profile of a logged in user
* [show()](#show-options-) - Showing the Lock widget
* [on()](#on-event-callback-) - Listening for events

## new Auth0Lock(clientID, domain, options)

Initializes a new instance of `Auth0Lock` configured with your client's `clientID` and your account's `domain` from your [Auth0](${uiURL}/) management dashboard. The third and optional parameter is an `options` object used to configure Lock for your application's needs. You can find this information at your [application settings](${uiURL}/#/applications).

- **clientId {String}**: Required parameter. Your application's _clientId_ in Auth0.
- **domain {String}**: Required parameter. Your Auth0 _domain_. Usually _your-account.auth0.com_.
- **options {Object}**: Optional parameter. Allows for the configuration of Lock's appearance and behavior. See [the configuration options page](/libraries/lock/v10/customization) for details.

### Example

```js
var clientId = '${account.clientId}';
var domain = '${account.namespace}';
// Instantiate Lock - without custom options
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');

// Listen for the authenticated event and get profile
lock.on("authenticated", function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    // Save token and profile locally
    localStorage.setItem("idToken", authResult.idToken);
    localStorage.setItem("profile", JSON.stringify(profile));

    // Update DOM
  });
});
```

### getProfile(token, callback)

Once the user has logged in and you are in possesion of a token, you can use that token to obtain the user's profile with `getProfile`.

- **token {String}**: User token.
- **callback {Function}**: Will be invoked after the user profile been retrieved.

#### Example

```js
lock.getProfile(token, function(error, profile) {
  if (!error) {
    alert("hello " + profile.name);
  }
});
```

### show(options)

The `show` method displays the widget. Beginning with Lock version 10.2.0, the `show` method can now accept an `options` object as a parameter. Note that this parameter is meant to be used as a way to _override_ your Lock's `options` for this particular displaying of the widget - options should be _set_ when instantiating Lock, and _overridden_, only if needed for your specific use case, here. 

The following subset of `options` to be overridden from the values they were given (or their defaults) when Lock was instantiated:

* [allowedConnections](/libraries/lock/v10/customization#allowedconnections-array-)
* [auth.params](/libraries/lock/v10/customization#params-object-)
* [allowLogin](/libraries/lock/v10/customization#allowlogin-boolean-)
* [allowSignUp](/libraries/lock/v10/customization#allowsignup-boolean-)
* [allowForgotPassword](/libraries/lock/v10/customization#allowforgotpassword-boolean-)
* [initialScreen](/libraries/lock/v10/customization#initialscreen-string-)
* [rememberLastLogin](/libraries/lock/v10/customization#rememberlastlogin-boolean-)

For more detail on the entire list of configurable options that can be chosen when instantiating Lock, as opposed to the limited subset above that can be overridden in the `show` method, please see the [user configurable options page](/libraries/lock/v10/customization).

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

::: panel-info When to set your configuration options
Options should be set when first instantiating Lock `var lock = new Auth0Lock(clientId, domain, options);`. Options should only be passed to `show` in order to override your previously set options while displaying the widget at this particular time and place.

Previous users of Lock 9 should note that this is a different behavior from `options` in Lock 9, where all options were set as parameters of `show` and not at instantiation.
:::

### hide([callback])

The `hide` method closes the widget if it is currently open. The widget closes itself under most circumstances, so this method would primarily be invoked in specific use cases only. For instance, one might wish to listen for the `unrecoverable_error` event and then `hide` the Lock and redirect to their own custom error page. Another example is users who are implementing [popup mode](/libraries/lock/v10/popup-mode), and might need to manually `hide` the widget after the `authenticated` event fires.

Example usage to hide (close) the Lock widget in popup mode:
```js
// Listen for authenticated event and hide Lock
lock.on("authenticated", function() {
  lock.hide();
  
  // Whatever else you'd like to do on authenticated event
  
});
```

### on(event, callback)

Lock will emit events during its lifecycle. The `on` method can be used to listen for particular events and react to them.

- `show`: emitted when Lock is shown. Has no arguments.
- `hide`: emitted when Lock is hidden. Has no arguments.
- `unrecoverable_error`: emitted when there is an unrecoverable error, for instance when no connection is available. Has the error as the only argument.
- `authenticated`: emitted after a successful authentication. Has the authentication result as the only argument. The authentication result contains the token which can be used to get the user's profile or stored to log them in on subsequent checks. 

The `authenticated` event listener has a single argument, an `authResult` object. This object contains the following properties: `idToken`, `accessToken`, `state`, `refreshToken` and `idTokenPayload`.

An example use of the `authenticated` event:

```js
// Listen for authenticated event; pass the result to a function as authResult
lock.on("authenticated", function(authResult) {
  // Call getProfile using the token from authResult
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }
    // Store the token from authResult for later use
    localStorage.setItem('idToken', authResult.idToken);
    // Display user information
    show_profile_info(profile);
  });
});
```

- `authorization_error`: emitted when authorization fails. Has the error as its only argument.
- `hash_parsed`: _Note that this is a low level event for advanced use cases, and `authenticated` and `authorization_error` should be preferred when possible._ Every time a new Auth0Lock object is initialized in redirect mode (the default), it will attempt to parse the hash part of the URL, looking for the result of a login attempt. After that, this event will be emitted with `null` if it couldn't find anything in the hash. It will be emitted with the same argument as the `authenticated` event after a successful login or with the same argument as `authorization_error` if something went wrong. This event won't be emitted in [popup mode](/libraries/lock/v10/popup-mode), because in popup mode, there is no need to parse the URL's hash part.

<%= include('../_includes/_lock-toc') %>
