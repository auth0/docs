---
section: libraries
toc: true
description: lock-passwordless to Lock 10 with Passwordless Mode Migration Guide
---
# lock-passwordless to Lock 10 with Passwordless Mode Migration Guide

The following instructions assume you are migrating from **lock-passwordless** to the latest **Lock 10** using the **Passwordless** mode.

The goal of this migration guide is to provide you with all of the information you would need to update your lock-passwordless installation to Lock 10 using the Passwordless Mode. Your first step is to remove lock-passwordless from your project and include the latest version of Lock 10. Beyond that, take a careful look at each of the areas on this page. You will need to change your implementation to reflect the new changes, not only the initialization of `Auth0LockPasswordless` and your calls to Lock methods, but especially any customization options you were implementing may need inspected and changed. Take a look below for more information!

## General Changes and Additions

### Importing Auth0LockPasswordless
If you're loading from the CDN, you can still use `Auth0LockPasswordless`. The difference is that you'll provide options in the constructor, like we do with `Auth0Lock`:

#### Using the CDN

##### Before

```html
<script src="http://cdn.auth0.com/js/lock-passwordless-2.2.3.min.js"></script>

<script>
  var lock = new Auth0LockPasswordless(clientID, domain);
</script>

```

##### After

```html
<script src="https://cdn.auth0.com/js/lock/10.x.y/lock.min.js"></script>

<script>
  var options = {
    oidcConformant: true
  }
  var lock = new Auth0LockPasswordless(clientID, domain, options);
</script>
```

#### Using npm + module bundler

##### Before

```js
import Auth0LockPasswordless from 'auth0-lock-passwordless';
var lock = new Auth0LockPasswordless(clientID, domain);
```

##### After

```js
import Auth0LockPasswordless from 'auth0-lock/passwordless';
var options = {
  oidcConformant: true
};
var lock = new Auth0LockPasswordless(clientID, domain, options);
```

### Initialization Options

`Auth0LockPasswordless` has the same [options available](/libraries/lock/v10/customization) as `Auth0Lock` in addition to a single new option that determines if you want to use a Magic Link or a Email Code when using an email passwordless connection. For this property, `passwordlessMethod`, only two values are accepted:

- `code` if you want to use an Email Code
- `link` if you want to use a Magic Link

```js
var options = {
  oidcConformant: true,
  passwordlessMethod: 'code' //or link
};
var lock = new Auth0LockPasswordless(clientID, domain, options);
```

### Choose between sms or email

We recommend that you setup which passwordless connections you want enabled in [the dashboard](https://manage.auth0.com/#/connections/passwordless), but if you want to have more than one passwordless connection enabled in the dashboard, you can restrict `Auth0LockPasswordless` to use only one of them using the [`allowedConnections`](/libraries/lock/v10/customization#allowedconnections-array-) option.
If you have both `sms` and `email` passwordless connections enabled in the dashboard, `Auth0LockPasswordless` will use `email` by default.

#### Example with only sms enabled

```js
var options = {
  oidcConformant: true,
  allowedConnections: ['sms']
};
var lock = new Auth0LockPasswordless(clientID, domain, options);
```

#### Example with only email enabled

```js
var options = {
  oidcConformant: true,
  allowedConnections: ['email']
};
var lock = new Auth0LockPasswordless(clientID, domain, options);
```

### Show the widget
In the previous version, you can call the passwordless method directly (sms, socialOrMagiclink, socialOrSms etc). In the new version, you'll have to use [the show method](/libraries/lock/v10/api#show-) in order to display the widget.

```js
var options = {
  oidcConformant: true
};
var lock = new Auth0LockPasswordless(clientID, domain, options);
lock.show();
```

### Subscribe to events
As of Lock 10, we expose a few events that you can subscribe to in order to be notified when the user is authenticated or an error occurs. So, instead of callbacks from `lock-passwordless`, you have to subscribe to events that you want to know about. To read more about Lock events, see [here](/libraries/lock/v10/api#on-).

```js
var options = {
  oidcConformant: true
};
var lock = new Auth0LockPasswordless(clientID, domain, options);
lock.on("authenticated", function(authResult) {
  alert(authResult.accessToken);
});
```

### Customization options

Some options have to be renamed.

* `dict` is now `languageDictionary`. [Read more](https://github.com/auth0/lock#language-dictionary-specification) about the language dictionary specification
* `connections` is now `allowedConnections`
* `socialBigButtons` is now `socialButtonStyle`
* all the authentication options were moved to a new `auth` property. [Read more](https://github.com/auth0/lock#authentication-options)

## Further Reading

- Take a look at [Lock 10's docs page](/libraries/lock/v10) for more details on how Lock works.
- Check out the [customization page](/libraries/lock/v10/customization) for more details on all of the customization options that are available.