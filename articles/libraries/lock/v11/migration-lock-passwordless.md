---
section: libraries
toc: true
description: Migration Guide from lock-passwordless to Lock v11 with Passwordless Mode
tags:
  - libraries
  - lock
  - migrations
  - passwordless
---
# Migration Guide for lock-passwordless to Lock v11 with Passwordless Mode

The following instructions assume you are migrating from the **lock-passwordless** widget to Lock v11.2+ using **Passwordless Mode**.

The [lock-passwordless](https://github.com/auth0/lock-passwordless) widget was previously a standalone library, separate from [Lock](/libraries/lock). Now, you can migrate your apps to use the Passwordless Mode which is integrated directly into Lock v11. Lock v11 with Passwordless Mode is the latest method by which to deploy a login widget for passwordless authentication in your apps.

To get started, you will need to remove **lock-passwordless** from your project, and instead include the [latest release version of Lock v11](https://github.com/auth0/lock/releases). 

::: note
To use Passwordless Mode, you must use Lock v11.2 or above.
:::

Beyond that, you will then need to take a careful look at each of the sections in this migration guide in order to find out which changes you will need to make to your implementation. Of particular importance will be the following:

* The initialization of `Auth0LockPasswordless`
* Your calls to Lock methods (now the same methods as used in Lock v11)
* Your previously implemented customization options, which will need inspected and changed to use the corresponding options for Lock v11.

## General changes and additions

### Importing Auth0LockPasswordless

You can import Auth0LockPasswordless in the same ways as you would normally import Lock; using the CDN or via NPM.

#### Using the CDN

If you're loading from the CDN, you can still use `Auth0LockPasswordless`. The difference is that you'll provide your options in the constructor, like we do with `Auth0Lock`:

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#cdn-before" data-toggle="tab">Before</a></li>
      <li><a href="#cdn-after" data-toggle="tab">After</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="cdn-before" class="tab-pane active">
    <pre class="hljs html"><code>
    &lt;script src=&quot;http://cdn.auth0.com/js/lock-passwordless-2.2.3.min.js&quot;&gt;&lt;/script&gt;
    &lt;script&gt;
      var lock = new Auth0LockPasswordless(clientID, domain);
    &lt;/script&gt;
    </code></pre>
    </div>
    <div id="cdn-after" class="tab-pane">
    <pre class="hljs html"><code>
    &lt;script src=&quot;${lock_url}&quot;&gt;&lt;/script&gt;
    &lt;script&gt;
      // example use of options
      var options = {
        closable: false
      }
      var lock = new Auth0LockPasswordless(clientID, domain, options);
    &lt;/script&gt;
    </code></pre>
    </div>
  </div>
</div>

#### Using npm + module bundler

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#npm-before" data-toggle="tab">Before</a></li>
      <li><a href="#npm-after" data-toggle="tab">After</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="npm-before" class="tab-pane active">
    <pre class="hljs js"><code>
    import Auth0LockPasswordless from 'auth0-lock-passwordless';
    var lock = new Auth0LockPasswordless(clientID, domain);
    </code></pre>
    </div>
    <div id="npm-after" class="tab-pane">
    <pre class="hljs js"><code>
    import {Auth0LockPasswordless} from 'auth0-lock';
    var options = {
      closable: false
    };
    var lock = new Auth0LockPasswordless(clientID, domain, options);
    </code></pre>
    </div>
  </div>
</div>

### Initialization options

`Auth0LockPasswordless` has the same [options available](/libraries/lock/v11/configuration) as `Auth0Lock` in addition to a single new option that determines if you want to use a Magic Link or a Email Code when using an email passwordless connection. For this property, `passwordlessMethod`, only two values are accepted:

- `code` if you want to use an Email Code
- `link` if you want to use a Magic Link

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#method-code" data-toggle="tab">PasswordlessMethod: Code</a></li>
      <li><a href="#method-link" data-toggle="tab">PasswordlessMethod: Link</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="method-code" class="tab-pane active">
    <pre class="hljs js"><code>
    var options = {
      passwordlessMethod: 'code'
    };
    var lock = new Auth0LockPasswordless(clientID, domain, options);
    </code></pre>
    </div>
    <div id="method-link" class="tab-pane">
    <pre class="hljs js"><code>
    // example use of options
    var options = {
      passwordlessMethod: 'link'
    };
    var lock = new Auth0LockPasswordless(clientID, domain, options);
    </code></pre>
    </div>
  </div>
</div>

### Choose between SMS or email

We recommend that you setup which passwordless connections you want enabled in [the dashboard](${manage_url}/#/connections/passwordless), but if you want to have more than one passwordless connection enabled in the dashboard, you can restrict `Auth0LockPasswordless` to use only one of them using the [allowedConnections](/libraries/lock/v11/customization#allowedconnections-array-) option.
If you have both `sms` and `email` passwordless connections enabled in the dashboard, `Auth0LockPasswordless` will use `email` by default.

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li><a href="#sms-enabled" data-toggle="tab">SMS Enabled</a></li>
      <li><a href="#email-enabled" data-toggle="tab">Email Enabled</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="sms-enabled" class="tab-pane active">
    <pre class="hljs js"><code>
    var options = {
      allowedConnections: ['sms']
    };
    var lock = new Auth0LockPasswordless(clientID, domain, options);
    </code></pre>
    </div>
    <div id="email-enabled" class="tab-pane">
    <pre class="hljs js"><code>
    var options = {
      allowedConnections: ['email'],
      passwordlessMethod: 'code'
    };
    var lock = new Auth0LockPasswordless(clientID, domain, options);
    </code></pre>
    </div>
  </div>
</div>

### Show the widget

In the old `lock-passwordless`, you could call the passwordless method directly (sms, socialOrMagiclink, socialOrSms etc). In Lock v11, you'll have to use [the show method](/libraries/lock/v11/api#show-) in order to display the widget.

```js
var lock = new Auth0LockPasswordless(clientID, domain);
lock.show();
```

### Subscribe to events

Lock exposes a few events that you can subscribe to in order to be notified when the user is authenticated or an error occurs. So, instead of callbacks from `lock-passwordless`, you have to subscribe to events that you want to know about. To read more about Lock events, see [here](/libraries/lock/v11/api#on-).

```js
var lock = new Auth0LockPasswordless(clientID, domain);
lock.on("authenticated", function(authResult) {
  alert(authResult.accessToken);
});
```

### Customization options

Some options have to be renamed.

* `dict` is now [languageDictionary](/libraries/lock/v11/configuration#languagedictionary-object-)
* `connections` is now [allowedConnections](/libraries/lock/v11/configuration#allowedconnections-array-)
* `socialBigButtons` is now [socialButtonStyle](/libraries/lock/v11/configuration#socialbuttonstyle-string-)
* all the authentication options were moved into an [auth object](/libraries/lock/v11/configuration#auth-object-)

## Further Reading

::: next-steps
- [Lock 11 Reference - an overview on how Lock works](/libraries/lock/v11)
- [Lock 11 Configuration - details on the available configuration options for Lock](/libraries/lock/v11/configuration)
:::
