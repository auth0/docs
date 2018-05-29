---
section: libraries
description: Lock V9 API Reference
title: Lock 9 API Reference
toc: true
tags:
  - libraries
  - lock
---
# Lock 9: API Reference

<%= include('../../../_includes/_version_warning_lock') %>

## Methods

### Auth0Lock(clientID, domain[, options])

Initialize `Auth0Lock` with a `clientID` and the account's `domain`.

```js
var lock = new Auth0Lock('xxxxxx', '<account>.auth0.com');
```

::: note
For a full detail on options and parameters you can check the [Auth0Lock initialization][lock-initialization] wiki notes.
:::

### .show([options, callback])

Open the widget on `signin` mode with `signup` and `reset` button actions if enabled for the configured/default account connection.

You may call this method with a single parameter, two or even none. The following examples ilustrate this:

```js
var lock = new Auth0Lock('xxxxxx', '<account>.auth0.com');

// using defaults and resolved configuration
// from you account details
lock.show();

// passing some options
lock.show(options);

// provide with a callback `fn` to be invoked
// at success or error authentication
lock.show(function (err, profile, token) {});

// or both options and callback
lock.show(options, function (err, profile, token) {});

```

::: note
Check the [Auth0Lock customization][lock-customization] article for more examples and options specification. Or enter the [Authentication modes][application-types] notes to learn more about implementing different authentication mechanics.
:::

### .showSignin([options, callback])

Open the widget on `signin` mode, but without the bottom `signup` nor `reset` button actions. This method is useful when your site has custom *signup* and *reset* links at a different form.

You may call this method with a single parameter, two or even none. The following examples ilustrate this:

```js
var lock = new Auth0Lock('xxxxxx', '<account>.auth0.com');

// using defaults and resolved configuration
// from you account details
lock.showSignin();

// passing some options
lock.showSignin(options);

// provide with a callback `fn` to be invoked
// on `reset` success or error
lock.showSignin(function (err, profile, token) {});

// or both options and callback
lock.showSignin(options, function (err, profile, token) {});
```

::: note
Check the [Auth0Lock customization][lock-customization] article for more examples and options specification. Or enter the [Authentication modes][application-types] notes to learn more about implementing different authentication mechanics.
:::

### .showSignup([options, callback])

Open the widget on `signup` mode, but without the `cancel` button action to go back to `signin`. This method is useful when your site has custom *signin* and *reset* links at a different form.

You may call this method with a single parameter, two or even none. The following examples ilustrate this:

```js
var lock = new Auth0Lock('xxxxxx', '<account>.auth0.com');

// using defaults and resolved configuration
// from you account details
lock.showSignup();

// passing some options
lock.showSignup(options);

// provide with a callback `fn` to be invoked
// on `reset` success or error
lock.showSignup(function (err) {});

// or both options and callback
lock.showSignup(options, function (err) {});
```

::: note
Check the [Auth0Lock customization][lock-customization] article for more examples and options specification. Or enter the [Authentication modes][application-types] notes to learn more about implementing different authentication mechanics.
:::

### .showReset([options, callback])

Open the widget on `reset` mode, but without the bottom `cancel` button action to go back to `signin`.  This method is useful when your site has custom *signin* and *signup* links at a different form.

You may call this method with a single parameter, two or even none. The following examples ilustrate this:

```js
var lock = new Auth0Lock('xxxxxx', '<account>.auth0.com');

// using defaults and resolved configuration
// from you account details
lock.showReset();

// passing some options
lock.showReset(options);

// provide with a callback `fn` to be invoked
// on `reset` success or error
lock.showReset(function (err) {});

// or both options and callback
lock.showReset(options, function (err) {});
```

::: note
Check the [Auth0Lock customization][lock-customization] article for more examples and options specification. Or enter the [Authentication modes][application-types] notes to learn more about implementing different authentication mechanics.
:::

### .hide([callback])

Close the widget and invoke `callback` when removed from DOM.

```js
var lock = new Auth0Lock('xxxxxx', '<account>.auth0.com');

// normal display
lock.show(options);

// trigger hide when esc key pressed
document.addEventListener('keypress', function(e) {
  // hide if esc
  lock.hide();
}, false);
```

### .logout([query])

Log out loggedin user with optional query parameters for the `GET` request.

```js
var lock = new Auth0Lock('xxxxxx', '<account>.auth0.com');

// Call logout with query parameters
lock.logout({ ref: window.location.href });
```

## Events

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

### Index of events

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

### Examples

```js
// Modify the options before the signin is submitted.
// Useful for changing the authParams based on the email address (which is available in the context).
lock.on('signin submit', function (options, context) {
   if (!options.authParams)
      options.authParams = {};
   options.authParams.login_hint = context.email;
});
```

### Internals (use at your own risk)

- `icon shown`: Triggered when Lock icon or gravatar image has been shown.
- `icon hidden`: Triggered when Lock icon or gravatar image has been hidden.
- `avatar shown`: Triggered when Lock avatar has been shown.
- `avatar hidden`: Triggered when Lock avatar has been hidden.
- `client fetch success`: Triggers when `clientID`'s config data is fetched.
- `client fetch error`: Triggers when there's an error when fetching `clientID`'s config data.
- `client loaded`: Triggers when `clientID`'s config data was loaded.
- `client initialized`: Triggers when `clientID`'s config data is fetched and loaded.