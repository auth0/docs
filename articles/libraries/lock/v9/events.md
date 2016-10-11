---
description: Lock V9 API syntax
---

<%= include('../_includes/_lock-version-9') %>

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
- `close`: Triggers when the user manually closes the Lock.
- `hidden`: Triggers when the Lock has hidden.
- `signin ready`: Triggers when signin mode view is displayed.
- `signin submit`: Triggers when signin mode is submitted.
- `signin success`: Triggers when signin has succeeded with no error.
- `signin error`: Triggers when there's an error on the signin workflow.
- `signup ready`: Triggers when signup mode is displayed.
- `signup submit`: Triggers when singup mode is submitted.
- `signup success`: Triggers when signup was succeeded with no error.
- `signup error`: Triggers when there's an error on the signup workflow.
- `reset ready`: Triggers when reset mode is displayed.
- `reset submit`: Triggers when reset mode is submitted.
- `reset success`: Triggers when reset has succeeded with no error.
- `reset error`: Triggers when there's an error on the reset workflow.
- `loggedin ready`: Triggers when loggedin mode is displayed.
- `loggedin submit`: Triggers when loggedin panel is submitted.
- `kerberos ready`: Triggers when integrated windows authentication mode is displayed.
- `kerberos submit`: Triggers when integrated windows authentication mode is submitted.
- `loading ready`: Triggers when loading mode is displayed.
- `error shown`: Triggers when an error was displayed.

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
- `avatar hidden`: Triggered when Lock avatar has been hidden.
- `client fetch success`: Triggers when `clientID`'s config data is fetched.
- `client fetch error`: Triggers when there's an error when fetching `clientID`'s config data.
- `client loaded`: Triggers when `clientID`'s config data was loaded.
- `client initialized`: Triggers when `clientID`'s config data is fetched and loaded.


