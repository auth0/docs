---
description: Best practices for writing and managing Auth0 Rules.
topics:
  - best-practices
  - rules
contentType:
    - reference
useCase:
  - best-practices
  - rules
---

# Rules Best Practices

This article covers best practices for using [rules](/rules). Before you start writing rules, we recommend that you:

* Review [what you can use rules for](/rules#what-can-i-use-rules-for-)
* Take a look at some [sample rules](/rules/references/samples)

## General recommendations

The following suggestions are designed to optimize the performance of your Auth0 implementation when using rules.

### Handle errors

Make sure your rules code catches errors (especially after calls with a higher likelihood of triggering an error). Also, ensure every branch through the code ends with a return statement to call the callback function.

### Review rule order

Rules execute in the order shown on the Auth0 Dashboard. If a rule depends on the execution of another rule, move the dependent rule to a lower position in the rules list.

### Exit the rule as soon as possible

To improve performance, write rules that exit as soon as possible.

For example, if a rule has three checks to decide if it should run, the first check should eliminate the most cases. It should then be followed by the check that eliminates the second-highest number of cases for the rule to run, and so on.

### Reduce API requests

Try to minimize the number of API calls you make in your rules. Too many can slow down login response time, as well as cause failures during a timeout.

Avoid calling the Management API if at all possible, especially in high traffic environments.

### Avoid calls to Management API to get Connection-related details

We have recently expanded the connection properties available in rules [context object](/rules/references/context-object). You should now obtain connection info from the context object instead of calling the Auth0 Management API.

Removing calls to the Management API (as well as the extra call required to get the appropriate Access Token) will make your rule code more performant and reliable.

In particular, if you are using the **Check if user email domain matches configured domain** rule template, check out the latest version [on Github](https://github.com/auth0/rules/blob/master/src/rules/check-domains-against-connection-aliases.js) or on the [Auth0 dashboard](${manage_url}/#/rules/new) to see the new best practices.

The included changes should not alter any functionality while still improving the performance of rules that had once relied on calls to the Management API.

### Cache results

Rules have a [global variable you can use to cache information](/rules/guides/cache-resources). For API calls that are not user-specific, use this variable to cache the results between users (e.g., getting an access token for your API).

### Limited read or update users scopes

If you use the [Management API in rules](/rules/current/management-api) just to read or update the current user, use the `auth0.accessToken` variable instead. This token will suffice if you only need the `read:users` and `update:users` scopes.

### Rules for specific applications

To run a rule for only specific applications, check for a [client metadata field](/rules/references/context-object) instead of comparing the client.

This can improve performance as the rule only executes for clients with a particular metadata field, rather than checking Client IDs. It also makes adding new clients and reading the rule code easier.

You can set client metadata for your application on the dashboard by going to [Application Settings -> Advanced Settings -> Application Metadata](${manage_url}/#/applications/). To access client metadata in rules, use the [context object](/rules/references/context-object).

### Reduce calls to paid services

If you have rules that call a paid service, such as sending SMS messages using Twilio, make sure that you only use the service when necessary to avoid extra charges. To help reduce calls to paid services:

* Disallow public sign-ups to reduce the numbers of users who can sign up and trigger calls to paid services.
* Mitigate the risk of credential theft to avoid account takeover by hackers who might use hijacked accounts to trigger calls to paid services.
* Ensure your users have [strong passwords when using Database connections](/connections/database/password-strength).
* Ensure your users utilize multi-factor authentication.
* Ensure that the rule only gets triggered for an authorized subset of users or under other appropriate conditions. For example, you may want to add logic that checks if a user has a particular email domain, role/group, or subscription level before triggering the call to the paid service.

## Security recommendations

We’ve put together the following tips to help you keep your Auth0 implementation secure when writing rules.

### Store sensitive values in settings

Sensitive information, such as credentials or API keys, should be stored in your [rules settings](${manage_url}/#/rules) where they will be encrypted. Do not store these values in your rules code. For example, do not write code like this:

```js
const myApiKey = 'abc123';
```

Instead, store secrets in the rules settings and access them using the [configuration object](/rules/guides/configuration):

```js
const myApiKey = configuration.myApiKey;
```

### Don’t send the entire context object to external services

For rules that send information to an external service, make sure you are not sending the entire [context object](/rules/references/context-object), since this object may contain tokens or other sensitive data.

Instead of sending the context object to an external service to debug your rules, you should use the **Auth0 Real-Time Webtask Logs Extension** instead. For rules that send information to external services, you should only send a *subset* of the less sensitive attributes from the context object.

### Use HTTPS

Always use HTTPS, not HTTP, connections when making calls to external services in your rules code.

### Don’t use conditional logic for MFA based on silent authentication, device fingerprint, or geolocation

Don’t use rules that trigger multi-factor authentication based on silent authentication, a known device, or a known location.

The following code examples are ones we **do not recommend** you use (scroll past these examples for a more secure alternative).

Silent authentication or “prompt === none”:

```js
function (user, context, callback) {
  if (context.request.query && context.request.query.prompt === 'none') {
    // skip MFA for silent token requests
    return callback(null, user, context);
  }
  // ...
}
```

Device fingerprint:

```js
function (user, context, callback) {
  var deviceFingerPrint = getDeviceFingerPrint();
  user.app_metadata = user.app_metadata || {};

  // Inadequate verification check
  if (user.app_metadata.lastLoginDeviceFingerPrint !==  deviceFingerPrint) {
    user.app_metadata.lastLoginDeviceFingerPrint = deviceFingerPrint;
    context.multi-factor = {
      // ...
    };
  }
  function getDeviceFingerPrint() {
    var shasum = crypto.createHash('sha1');
    shasum.update(context.request.userAgent);
    shasum.update(context.request.ip);
    return shasum.digest('hex');
  }
}
```

Geolocation:

```js
function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};

  // Inadequate verification check
  if (user.app_metadata.last_location !== context.request.geoip.country_code) {
    user.app_metadata.last_location = context.request.geoip.country_code;
    context.multi-factor = {
      // ...
    };
  }
  // ...
}
```

If you have any MFA-related rules based on these checks, remove the conditional logic and **use the `allowRememberBrowser` parameter** instead. Setting `allowRememberBrowser` to `true` lets users check a box so they will only be prompted for multi-factor authentication every 30 days.

For example:

```js
context.multi-factor = {
  provider: 'guardian',
  allowRememberBrowser: true
};
```

### Don’t use conditional logic based on silent authentication to redirect to custom MFA provider

Don’t use rules that redirect users to custom multi-factor authentication providers based on silent authentication. Doing so can lead to edge cases where the user can skip the MFA process. For example, we **do not recommend** the following:

Silent authentication or “prompt === none”

```js
function (user, context, callback) {
  if (context.request.query && context.request.query.prompt === 'none') {
  // skip MFA for silent token requests
    return callback(null, user, context);
  }
  //redirect to custom MFA
  context.redirect = {
    url: "https://example.com/"
  };
  // ...
}
```

Instead, you should **remove the check for silent authentication and switch to an Auth0-supported multi-factor authentication provider**. Remove the conditional logic from your code, and use the `allowRememberBrowser` parameter instead. Setting `allowRememberBrowser` to `true` lets users check a box so they will only be prompted for multi-factor authentication every 30 days.

```js
context.multi-factor = {
  provider: 'guardian',
  allowRememberBrowser: true
};
```

### Always check if an email is verified

Whenever granting authorization based on an email address, always start by checking if the user has verified the email address:

```js
function (user, context, callback) {
  // Access should only be granted to verified users.
  if (!user.email || !user.email_verified) {
    return callback(new UnauthorizedError('Access denied.'));
  }
  // ...
}
```

### Check for exact string matches, not substring matches

For rules that determine access control based on a particular string, such as an email domain, check for an exact string match instead of checking for a substring. If you check only for a substring, your rule may not function as you intend.

For example:

```js
if( _.findIndex(connection.options.domain_aliases, function(d){
  return user.email.indexOf(d) >= 0;
}
```

The code above would return true given emails such as these:
* `user.domain.com@not-domain.com`
* `“user@domain.com”@not-domain.com` (quotes included)

Instead, for exact matches, you should use code such as:

```js
const emailSplit = user.email.split('@');
const userEmailDomain = emailSplit[emailSplit.length - 1].toLowerCase();
```

See the **Check if user email domain matches configured domain rule template** [on GitHub](https://github.com/auth0/rules/blob/master/src/rules/check-domains-against-connection-aliases.js) or on the [Auth0 dashboard](${manage_url}/#/rules/new) for more information.
