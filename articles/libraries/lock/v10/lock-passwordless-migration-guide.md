---
section: libraries
toc: true
description: Migration Guide for lock-passwordless to Lock 10 with Passwordless Mode
---
# Migration Guide for lock-passwordless to Lock 10 with Passwordless Mode

The following instructions assume you are migrating from **lock-passwordless** to the latest **Lock 10** using the **Passwordless** mode.

The [lock-passwordless](https://github.com/auth0/lock-passwordless) widget was previously a standalone library, separate from [Lock 10](https://auth0.com/docs/libraries/lock/v10). Now, you can migrate your apps to use the newest Lock Passwordless, which is integrated directly into Lock 10. Lock 10 with Passwordless Mode is the latest method by which to quickly and simply deploy a login widget for passwordless authentication in your apps.

The goal of this migration guide is to provide you with all of the information that you will need to update your **lock-paswordless** installation to **Lock 10** (using Lock 10's **Passwordless Mode**). 

First, you will need to remove **lock-passwordless** from your project, and instead include the [latest release version of Lock 10](https://github.com/auth0/lock/releases). Beyond that, you will then need to take a careful look at each of the sections in this migration guide in order to find out which changes you will need to make to your implementation.

Of particular importance will be the initialization of `Auth0LockPasswordless`, your calls to Lock methods (now the same methods as used in Lock 10), and also your previously implemented customization options, which will need inspected and changed to use the corresponding options for Lock 10.

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