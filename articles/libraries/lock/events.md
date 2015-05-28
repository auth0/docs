## Lock: API syntax

```js
var lock = new Auth0Lock(clientID, domain).

// called every time triggered
lock.on('signin ready', function() {
  // signin mode is displayed
});

// called only once
lock.once('signup ready', function() {
  // signup mode is displayed
});

// remove all listener handlers for `event`
lock.removeAllListeners('signin ready');

// remove just the following handler
lock.removeListener('signin ready', signinHandlerFn);
```

## Index of events

- `shown`: Triggers when the Lock early opens.
- `ready`: Triggers when the Lock is ready for user interaction.
- `hidden`: Triggers when Lock has hidden.
- `signin ready`: Triggers when signin mode view is displayed.
- `signin submit`: Triggers when signin panel is being submitted (for database and enterprise connections).
- `signup ready`: Triggers when signup mode is displayed.
- `reset ready`: Triggers when reset mode is displayed.
- `loggedin ready`: Triggers when loggedin mode is displayed.
- `kerberos ready`: Triggers when integrated windows authentication mode is displayed.
- `loading ready`: Triggers when loading mode is displayed.
- `client initialized`: (**internal only**)Triggers when `clientID`'s config data is fetched and loaded.

## Examples

```js
// Modify the options before the signin is submitted.
// Useful for changing the authParams based on the email address (which is available in the context).
lock.on('signin submit', function (options, context) {
   if (!options.authParams)
      options.authParams = {};
   options.authParams.login_hint = context.email;
});
```

## Internals (use at your own risk)

- `icon shown`: Triggered when Lock icon or gravatar image has been shown.
- `icon hidden`: Triggered when Lock icon or gravatar image has been hidden.
- `avatar shown`: Triggered when Lock avatar has been shown.
- `icon hidden`: Triggered when Lock avatar has been hidden.
