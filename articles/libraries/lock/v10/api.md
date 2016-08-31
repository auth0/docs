<%= include('../_includes/_lock-version') %>

# API

## new Auth0Lock(clientID, domain, options)

Initializes a new instance of `Auth0Lock` configured with your application `clientID` and your account's `domain` at [Auth0](${uiURL}/). You can find this information at your [application settings](${uiURL}/#/applications).

- **clientId {String}**: Your application _clientId_ in Auth0.
- **domain {String}**: Your Auth0 _domain_. Usually _your-account.auth0.com_.
- **options {Object}**: Allows to customize the dialog's appearance and behavior. See [the customization page](/libraries/lock/v10/customization) for the details.

### Example

```js
var clientId = '${account.clientId}';
var domain = '${account.namespace}';
var lock = new Auth0Lock(clientId, domain);

lock.on("authenticated", function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    localStorage.setItem("token", authResult.idToken);
    localStorage.setItem("profile", JSON.stringify(profile));

    // Update DOM
  });
});
```

### getProfile(token, callback)

Once the user has logged in and you are in possesion of a token, you can obtain the profile with `getProfile`.

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

The `show` method displays the widget. Beginning with Lock version 10.2.0, the `show` method can now accept an `options` object as a parameter, allowing the following subset of `options` to be overridden from the values they were given (or their defaults) when Lock was instantiated:

* [allowedConnections](/libraries/lock/v10/customization#allowedconnections-array-)
* [auth.params](/libraries/lock/v10/customization#params-object-)
* [allowLogin](/libraries/lock/v10/customization#allowlogin-boolean-)
* [allowSignUp](/libraries/lock/v10/customization#allowsignup-boolean-)
* [allowForgotPassword](/libraries/lock/v10/customization#allowforgotpassword-boolean-)
* [initialScreen](/libraries/lock/v10/customization#initialscreen-string-)
* [rememberLastLogin](/libraries/lock/v10/customization#rememberlastlogin-boolean-)

For more detail on the entire list of configurable options that can be chosen when instantiating Lock, as opposed to the limited subset above that can be overridden in the `show` method, please see the [user configurable options page](/libraries/lock/v10/customization).

Options Override Examples:

```js
// Show the Lock widget, without overriding any options
lock.show();

// Show the Lock widget, overriding some options
lock.show({
  allowedConnections: ["twitter", "facebook"],
  allowSignUp: false
});
```

::: panel-info Setting options
Options should be set when first instantiating Lock `var lock = new Auth0Lock(clientId, domain, options);`. Options should only be passed to `show` in order to alter those options while displaying the widget at this particular time and place.
:::

### on(event, callback)

Lock will emit events during its lifecycle.

- `show`: emitted when Lock is shown. Has no arguments.
- `hide`: emitted when Lock is hidden. Has no arguments.
- `unrecoverable_error`: emitted when there is an unrecoverable error, for instance when no connection is available. Has the error as the only argument.
- `authenticated`: emitted after a successful authentication. Has the authentication result as the only argument.
- `authorization_error`: emitted when authorization fails. Has error as the only argument.
- `hash_parsed`: every time a new Auth0Lock object is initialized in redirect mode (the default), it will attempt to parse the hash part of the URL, looking for the result of a login attempt. This is a low level event for advanced use cases, and `authenticated` and `authorization_error` should be preferred when possible. After that, this event will be emitted with `null` if it couldn't find anything in the hash. It will be emitted with the same argument as the `authenticated` event after a successful login or with the same argument as `authorization_error` if something went wrong. This event won't be emitted in [popup mode](/libraries/lock/v10/popup-mode) because in popup mode, there is no need to parse the URL's hash part.

<%= include('../_includes/_lock-toc') %>
