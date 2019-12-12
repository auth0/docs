---
description: Best practices for keeping your Auth0 environment safe when working with rules and external calls.
toc: true
topics:
  - rules
  - extensibility
contentType:
  - reference
useCase: extensibility-rules
---
## Security

The following are suggestions designed to help you keep your Auth0 environment secure when working with Rules (especially those that call external third-party services).

### Always use HTTPS

Always use HTTPS, not HTTP, when making calls to external services or when executing [redirect](#redirection) as part of your rule implementation.

### Store security sensitive values in rule Settings

Security-sensitive information, such as credentials or API keys, should be stored in your [rule settings](${manage_url}/#/rules) where they'll be obfuscated, encrypted, and available via the [`configuration`](#configuration-object) object. Do not store these values as literals in your rules code. For example, do not write code like this:

```js
const myApiKey = 'abc123';
```

Instead, prefer to store (secret) information so that it's accessible via the [`configuration`](#configuration-object) object:

```js
const myApiKey = configuration.myApiKey;
```

### Do not send entire `context` object to external services

For rules that send information to an external service, make sure you are not sending the entire [context](#context-object) object, since this object may contain tokens or other sensitive data. For rules that send information to external services, you should only send a *subset* of the less sensitive attributes from the `context` object when and where necessary.

::: warning
In a similar fashion, avoid passing **any** aspect of the [`auth0`](#auth0-object) object outside of a rule.
:::

### Check if an email is verified

Whenever granting authorization predicated on email address or email address characteristics, always start by checking if the email address is verified:

```js
function (user, context, callback) {
  // Access should only be granted to verified users.
  if (!user.email || !user.email_verified) {
    return callback(new UnauthorizedError('Access denied.'));
  }
	  .
	  .
}
```

### Check for exact string matches

For rules that determine access control based on a particular string, such as an email domain, check for an exact string match instead of checking for a substring match. If you check only for a substring, your rule may not function as you intend. For example, in:

```js
if( _.findIndex(connection.options.domain_aliases, function(d){
  return user.email.indexOf(d) >= 0;
}
```

the code (above) would return `true` given emails such as:
* `user.domain.com@not-domain.com`
* `“user@domain.com”@not-domain.com` (quotes included)

which may not be as desired. Instead, prefer to perform exact matches using code such as:

```js
const emailSplit = user.email.split('@');
const userEmailDomain = emailSplit[emailSplit.length - 1].toLowerCase();
```

For further explanation, see the **Check if user email domain matches configured domain rule template** [on GitHub](https://github.com/auth0/rules/blob/master/src/rules/check-domains-against-connection-aliases.js) or via the [Auth0 dashboard](${manage_url}/#/rules/new).

### Contextual bypass for Multi-Factor Authentication (MFA)

[Multi-Factor Authentication (MFA)](/multifactor-authentication) provides an additional layer of security in order to guard against unauthorized access. From a user experience perspective, this typically requires additional user interaction to provide a second authentication factor&mdash;i.e., typically presenting some additional credential(s) or authorizing some form of access request.

There are situations, though, when it may be desirable to bypass MFA for a user who has been designated as requiring multi-factor authentication. For instance, it maybe desirable to bypass MFA if a user has already presented both primary and secondary factors as part of authentication in the current browser context. Contextual checking in this way can help improve the user experience. However, if not done properly, it can open up serious security loop-holes which could lead to subsequent security breaches due to MFA being skipped. We therefore recommend that you observe the following guidance when considering whether to employ contextual bypass of MFA or not:

::: panel Best Practice
As a recommended best practice, use of `allowRememberBrowser` or `context.authentication` should be the only options considered for contextual bypass when using out-of-box MFA. Setting `allowRememberBrowser` to `true` lets users check a box so they will only be [prompted for multi-factor authentication periodically](/multifactor-authentication/custom#change-the-frequency-of-authentication-requests), whereas [`context.authentication`](/rules/references/context-object) can be used safely and accurately to determine when MFA was last performed in the current browser context; you can see some sample use of `context.authentication` in the out-of-box supplied rule, [Require MFA once per session](https://github.com/auth0/rules/blob/master/src/rules/require-mfa-once-per-session.js).
:::

* **do not perform MFA bypass** based on conditional logic related to [silent authentication](/api-auth/tutorials/silent-authentication) (e.g., `context.request.query.prompt === 'none'`)
* **do not perform MFA bypass** based on conditional logic using some form of device fingerprinting (e.g., where `user.app_metadata.lastLoginDeviceFingerPrint ===  deviceFingerPrint`)
* **do not perform MFA bypass** based on conditional logic using geographic location (e.g., where `user.app_metadata.last_location === context.request.geoip.country_code`)

#### Context checking when using custom MFA providers

In a similar fashion to that already discussed, we recommend following guidance provided in the items listed above for any rules that redirect users to custom multi-factor authentication providers. For example, for custom providers, there's no safe way to effectively bypass MFA during silent authentication because [redirection](#redirection) (required for custom MFA) will always fail in silent authentication situations.