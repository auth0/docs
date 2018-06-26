---
description: Custom DB script templates for user login
toc: true
---
# Custom Database Script Templates: Login

Auth0 provides the following custom database script templates that you can use when implementing user login functionality. While Auth0 has populated default templates in the Dashboard script editor, you can use the following links to recover the original code and notes once you've made and saved edits.

## Notes

When working on your login script, keep in mind that:

* This script will be executed each time a user attempts to login
* The two parameters, **email** and **password**, are used to validate the authenticity of the user 
* The login script is **mandatory**. The other scripts (if implemented) will be used for sign up, email verification, password reset, and deleting users

## Sample Scripts

Auth0 provides sample scripts in the following languages:

::: next-steps
* [JavaScript](/connections/database/custom-db/templates/login/index#javascript)
:::

### JavaScript

```js
function login (email, password, callback) {
  // This script should authenticate a user against the credentials stored in
  // your database.
  // It is executed when a user attempts to log in or immediately after signing
  // up (as a verification that the user was successfully signed up).
  //
  // Everything returned by this script will be set as part of the user profile
  // and will be visible by any of the tenant admins. Avoid adding attributes
  // with values such as passwords, keys, secrets, etc.
  //
  // The `password` parameter of this function is in plain text. It must be
  // hashed/salted to match whatever is stored in your database. For example:
  //
  //     var bcrypt = require('bcrypt@0.8.5');
  //     bcrypt.compare(password, dbPasswordHash, function(err, res)) { ... }
  //
  // There are three ways this script can finish:
  // 1. The user's credentials are valid. The returned user profile should be in
  // the following format: https://auth0.com/docs/user-profile/normalized
  //     var profile = {
  //       user_id: ..., // user_id is mandatory
  //       email: ...,
  //       [...]
  //     };
  //     callback(null, profile);
  // 2. The user's credentials are invalid
  //     callback(new WrongUsernameOrPasswordError(email, "my error message"));
  // 3. Something went wrong while trying to reach your database
  //     callback(new Error("my error message"));
  //
  // A list of Node.js modules which can be referenced is available here:
  //
  //    https://tehsis.github.io/webtaskio-canirequire/

  var msg = "Please implement the Login script for this database connection " +
       "at https://manage.auth0.com/#/connections/database";
  return callback(new Error(msg));
}
```