---
description: The pre-user-registration extensibility point for use with Hooks
beta: true
---

# Extensibility Point: Pre-User Registration

For [Database Connections](/connections/database), the `pre-user-registration` extensibility point allows you to add custom `app_metadata` or `user_metadata` to a newly-created user.

This allows you to implement scenarios including (but not limited to):

* Enforcing a custom password policy;
* Preventing signups for those who meet certain requirements;
* Setting conditional `app_metadata` or `user_metadata` on users that do not yet exist;
* Preventing (blacklisting) the use of personal email domains.

## Starter Code and Parameters

```js
/**
@param {object} user - The user being created
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user name
@param {string} user.password - user's password
@param {string} user.email - email
@param {boolean} user.emailVerified - is e-mail verified?
@param {string} user.phoneNumber - phone number
@param {boolean} user.phoneNumberVerified - is phone number verified?
@param {object} context - Auth0 connection and other context info
@param {string} context.requestLanguage - language of the client agent
@param {object} context.connection - information about the Auth0 connection
@param {object} context.connection.id - connection id
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - webtask context
@param {function} cb - function (error, response)
*/
module.exports = function (user, context, cb) {
  var response = {};

  // Add user or app metadata to the newly created user
  // response.user = {
  //   user_metadata: { foo: 'bar' },
  //   app_metadata: { vip: true, score: 7 }
  // };

  response.user = user;

  cb(null, response);
};
```

The default response object every time the Hook runs is as follows:

```json
{
  "user": {
    "user_metadata": "object",
    "app_metadata": "object",
  }
}
```

If you specify `app_metadata` and `user_metadata` in the response object, Auth0 adds this information to the new user.

Metadata property names must not:

* Start with the `$` character;
* Contain the `.` character.

### Example: Add Metadata to New Users

```js
module.exports = function (user, context, cb) {
  var response = {};

  response.user = {
   user_metadata: { foo: 'bar' },
   app_metadata: { vip: true, score: 7 }
  };

  cb(null, response);
};
```

Using the [test runner](https://webtask.io/docs/editor/runner), we see that the response, reflecting the updated metadata, is as follows:

```json
{
  "user": {
    "user_metadata": {
      "foo": "bar"
    },
    "app_metadata": {
      "vip": true,
      "score": 7
    }
  }
}
```

### Allow Signups for Users with Whitelisted Email Domains

```js
module.exports = function (user, context, cb) {
  
  // Whitelisted domains
  const whitelist = [
    'example1.com', 
    'example2.com'
  ]; 

  const userHasAccess = whitelist.some(domain => {
    const emailSplit = user.email.split('@');
    return emailSplit[emailSplit.length - 1].toLowerCase() === domain;
  });

  if (!userHasAccess) {  
    return cb('You may not sign up with an email address using your current domain.');
  }

  const response = { user };
  return cb(null, response);
};
```

Using the [test runner](https://webtask.io/docs/editor/runner), we see that the response is as follows:

```json
{
  "message": "Email domain not allowed.",
  "statusCode": 500,
  "stack": "Error: Email domain not allowed.\n    at respondWithError (/data/sandbox/node_modules/auth0-ext-compilers/lib/adapter.js:11:17)\n    at buildResponse (/data/sandbox/node_modules/auth0-ext-compilers/lib/adapter.js:96:24)\n    at /data/sandbox/node_modules/auth0-ext-compilers/lib/compilers/user-registration.js:31:20\n    at module.exports.cb (/data/io/3713487827af469cb0b4d89ea2aed8aa/webtask.js:32:12)\n    at /data/sandbox/node_modules/auth0-ext-compilers/lib/compilers/user-registration.js:30:16\n    at Object.is_authorized (/data/sandbox/node_modules/auth0-ext-compilers/lib/authorization.js:13:81)\n    at userRegistrationHandler (/data/sandbox/node_modules/auth0-ext-compilers/lib/compilers/user-registration.js:9:18)\n    at /data/sandbox/node_modules/auth0-ext-compilers/lib/adapter.js:90:20\n    at finish (/data/sandbox/node_modules/auth0-ext-compilers/node_modules/wreck/lib/index.js:369:16)\n    at wrapped (/data/sandbox/node_modules/auth0-ext-compilers/node_modules/wreck/node_modules/hoek/lib/index.js:871:20)"
}
```
