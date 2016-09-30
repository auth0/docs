---
description: Lock V10 migration guide to move from Auth0 Widget to Lock.
---

# Lock: Migration Guide

This guide will walk you through the needed changes to migrate from **Auth0Widget** to **Auth0Lock**.

## Initialization

While with the legacy Widget you had to:

```js
var widget = new Auth0Widget({
  domain:         'your-domain.auth0.com',
  clientID:       'YOUR_CLIENT_ID',
  callbackURL:    'http:://your-domain.com/your_callback'
});
```

In the new Auth0Lock becomes:

```js
var lock = new Auth0Lock('YOUR_CLIENT_ID', 'your-domain.auth0.com');
```
> All other options that used to be passed along on the initialization process have been moved to the [show API](#api).

To learn how and when to set the `callbackURL` in **Auth0Lock** please read [this guide][callbackurl-link].

For more information about Auth0Lock's initialization, check the [[Auth0Lock Initialization]] section.

## API

The legacy `.signin()` method has been renamed to `.showSignin()`. Same applies to `.signup()` as `.showSignup()` and `.reset()` as `.showReset()`. There is also a `.show()` method which uses account's default settings to resolve what should be displayed.

The following example illustrates the main changes:

```js
widget.signin({
  connections: [
    'facebook',
    'google-oauth2',
    'twitter',
    'Username-Password-Authentication'
  ]
});
```

In the new Auth0Lock becomes:

```js
lock.showSignin({
  connections: [
    'facebook',
    'google-oauth2',
    'twitter',
    'Username-Password-Authentication'
  ]
});
```
> Check the [API documentation][api-readme-url] section in the [README][readme-url] for a further walk through this methods.

Also, `Auth0Widget` callback order has changed: `onload` widget event has been removed as a callback and added as an event. The callback that was executed when the user has been signed in is now the second argument. For instance, this:

```js
widget.signin({
  popup: true
}, null, function (err, profile) {

});
```

now is written as:

```js
lock.showSignin({
  popup: true
}, function (err, profile) {

});
```

## Customization

Some of the customization options have been renamed. You can check the [[Auth0Lock Customization]] section for a detailed specification on each allowed option.

You can also follow here the most important breaking changes on namings:

Widget Name                   | Lock Name
------------------------------|-------------------------------------------------------
`callbackOnLocationHash`      | `responseType` <sup>[1](#response-type-ref)</sup>
`showIcon`                    | Removed from API options <sup>[2](#show-icon-ref)</sup>
`standalone`                  | `closable`
`_avoidInitialFocus`          | `focusInput`
`showSignup`                  | `disableSignupAction`
`showPassword`                | `disableResetAction`
`forgotLink`                  | `resetLink`
`chrome`                      | Removed from API options <sup>[3](#chrome-ref)</sup>
`standalone`                  | `closable`
`enableReturnUserExperience`  | `rememberLastLogin`
`enableADRealmDiscovery`      | `integratedWindowsLogin`
`username_style`              | `usernameStyle`
`userPwdConnectionName`       | `defaultUserPasswordConnection`
`extraParams`                 | `authParams`

<a name="response-type-ref"></a> <sup>1</sup>: [`responseType`][responseType] can be either `token` (`callbackOnLocation: true`) or `code` (`callbackOnLocation: false`).

<a name="show-icon-ref"></a> <sup>2</sup>: The `showIcon` option has been removed. When [`icon`][icon] property is provided it will be immediately displayed. In case you'd like to hide the default icon badge, the recommended way is by CSS customization. Check our [[UI customization]] page for that.

<a name="chrome-ref"></a> <sup>3</sup>: The `chrome` option has been removed. In case you'd like to hide the default icon badge, the recommended way is by CSS customization. Check our [[UI customization]] page for that.

> The following options have been moved under `authParams` main property for a matter of semantics: `access_token`, `scope`, `protocol`, `device`, `request_id`, `connection_scopes`, `nonce`, `offline_mode` and `state`.


## Events

Many of the event names changed. The general rule to apply for the proper handling is to replace the `_` for ` ` (single space).

So, for example if you had `signin_ready` now it is `signin ready`.

Also, the one named `transition_mode` has been deprecated and removed from the list of Events.

For more information about events, check [Auth0 Lock Events](/libraries/lock/v10/events) section.

<%= include('../_includes/_lock-toc') %>

<!-- Links -->
[readme-url]: /libraries/lock
[api-readme-url]:/libraries/lock#api
[responseType]: /libraries/lock/v10/customization#responsetype-boolean
[icon]: /libraries/lock/v10/customization#icon-string
[callbackurl-link]: /libraries/lock/v10/customization#callbackurl-string


