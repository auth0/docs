---
section: libraries
description: How to select different connection types for multiple login options with Lock V11.
topics:
  - libraries
  - lock
  - connections
contentType:
  - how-to
useCase:
  - add-login
  - customize-connections
---
# Selecting from Multiple Connection Options

With Auth0 you can offer users multiple methods of authenticating. This is important with SaaS or multi-tenant apps, where many organization use a single app. Each organization might use different systems such as LDAP, Active Directory, G Suite, or username/password stores.

In Auth0, you can associate different *connections* (methods of authentication) to specific applications, or directly to a tenant (as [domain connections](/api/management/guides/connections/promote-connection-domain-level)). When a user logs in, one of these connections will need to be selected as the one to use.

![](/media/articles/hrd/sd4h-6wlwOsQA1PCQKLAmtQ.png)

::: note
Selecting the appropriate Identity Providers from multiple options is called "Home Realm Discovery".
:::

If you use at most one database connection and zero or more social connections the selection process is straightforward. The user will either:

* Click on one of the social identity providers buttons (e.g. "Log in with Google")
* Enter their email and password (meaning "I will use the database connection").

But if the application or tenant have other connection types enabled (like enterprise connections or multiple databases) the selection process might be more involved. How do you indicate that a user wants to use a specific database connection if more than one is enabled? What if a user wants to use an enterprise connection to log in using <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn>?

If you implement [a custom login UI](/libraries/when-to-use-lock#when-to-implement-lock-vs-a-custom-ui) you have full control over the authentication flow. You can choose the connection based on context (like the given email address) or by asking the user, then provide the `connection` parameter to one of Auth0.js' [login methods](/libraries/auth0js/v9#login).

## Lock and multiple connections

<dfn data-key="lock">Lock</dfn> has built in functionality for identity provider selection. For social connections, it shows logos for all those enabled in a particular app. It also provides username/email and password fields if a database connection or Active Directory connection are enabled. 

## Using email domains with enterprise connections

An additional feature in Lock is the use of email domains as a way of routing authentication requests. Enterprise connections in Auth0 can be mapped to `domains`. For example, when configuring an ADFS or a <dfn data-key="security-assertion-markup-language">SAML-P</dfn> identity provider:

![](/media/articles/libraries/lock/enterprise-connection.png)

If a connection has domains mapped to it, then the password input field gets disabled automatically when a user enters an email with a mapped domain.

![Lock using HRD/SSO](/media/articles/libraries/lock/hrd-sso.png)

In the example above the domain `auth0.com` has been mapped to an enterprise connection.

Notice that you can associate multiple domains to a single connection.

## Selecting among multiple database connections

If your application has multiple database connections enabled, Lock needs to know which one to use. You can provide a [`connectionResolver` option](https://github.com/auth0/lock#other-options), which takes a function that decides the connection to use based on the user input and context. In this example an alternative database connection is used if the email domain is "auth0.com":

```
var options = {
  connectionResolver: function (username, context, cb) {
    var domain = username.indexOf('@') !== -1 && username.split('@')[1];
    if (domain && domain ==='auth0.com') {
      // If the username is test@auth0.com, the connection used will be the `auth0-users` connection.
      cb({ type: 'database', name: 'auth0-users' });
    } else {
      // Use the default approach to figure it out the connection
      cb(null);
    }
  }
}
```

You can use the [`defaultDatabaseConnection` option](/libraries/lock/v11/configuration#defaultdatabaseconnection-string-) to specify the database connection that will be used by default.

## Filtering available connections programmatically

The [`allowedConnections` option](/libraries/lock/v11/configuration#allowedconnections-array-) in Lock lets you indicate which of the available connections should be presented as an option to the user.

This lets you tailor the experience based on additional input or context (e.g. "Click here to log in as a student, or here to log in as a faculty member").


```js
var lock = new Auth0Lock(
  '${account.clientId}',
  '${account.namespace}',
  {
    allowedConnections: ['YOUR CONNECTION HERE'];
  }
);
```

::: note
Note that you can also provide the `allowedConnections` option to the `lock.show()` method if providing it at instantiation is not ideal for your use case. Please refer to the [API documentation](/libraries/lock/v11/api#show-) for the `show` method for more information.
:::

# Sending realm information from the application

Sometimes the application requesting an authentication can know, in advance, the realm intented to be used by the user. E.g. a multi-tenant application might use URLs in the form of: `https://{customer}.yoursite.com` or `https://www.yoursite.com/{customer}`. When a user arrives at your application with the vanity URL, you can pick up that `tenant` value and pass it as the `login_hint` in the `authorize` request:

```
https://{YOUR_AUTH0_DOMAIN}/authorize?client_id=[...]&login_hint={customer}
```

`login_hint` is a hint to the authorization server (Auth0) to indicate what the user might use to log in. In this case, based on the URL where the user landed, we treat the "customer" as the realm.

The default hosted login page code uses it to pre-fill the email field in Lock, but we can modify the code to alter the default database connection to be used if a realm is provided instead of an actual email address:

```js
// from the default Hosted Login Page template
var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));
[...]

var loginHint = config.extraParams.login_hint;
var realmHint;

// if the login hint is not an email address, we treat it as a realm hint
if (loginHint && loginHint.indexOf('@') < 0) {
  realmHint = loginHint;
  loginHint = null;
}

// now we map the realm into an actual database
var defaultDatabaseConnection;
if (realmHint === 'acme') {
  defaultDatabaseConnection = 'acme-users';
} else if (realmHint === 'auth0') {
  defaultDatabaseConnection = 'auth0-DB';
}
    
// When configuring Lock, we provide the values obtained before
var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
  [...] // other options
  prefill: loginHint ? { email: loginHint, username: loginHint } : null,
  defaultDatabaseConnection: defaultDatabaseConnection
}
```

The above code is, of course, just a sample. You could expand this logic to filter out social connections, or to set a default connection to be used even if an email address is provided as a `login_hint`. 

Mapping the "customer" as a realm is an arbitrary design decision for this example. But it is generally a good idea to isolate applications from the actual "connection" concept used within Auth0 and use the more abstract "realm" concept instead, possibly doing a realm-to-connection mapping within the hosted login page (where it's easier to make changes if necessary).
