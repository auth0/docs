---
description: How to use Auth0.js v7 with the Hosted Login Page
---
# Using Auth0.js v7 in the Hosted Login Page

::: version-warning
This document covers an outdated version of auth0.js. We recommend that you [upgrade to v8](/libraries/auth0js).
:::

Within the Hosted Login page, you can use the the [Auth0.js v7 SDK](/libraries/auth0js/v87), instead of [Lock](/libraries/lock), to perform authentication using a custom UI (you can also use Auth0.js _in addition_ to Lock, for authentication or user management tasks).

Auth0.js v7 is a legacy version of the SDK, and is *not* the recommended version for projects that [are able to [use Auth0.js v8](/hosted-pages/login/auth0js/v8) for their hosted login page instead. You can read the Reasons to Migrate and the API Auth sections of the [Auth0.js Migration Guide](/libraries/auth0js/v8/migration-guide#reasons-to-migrate) to learn whether version 8 of Auth0.js is appropriate for your applications.

## Login Form Example

In this example, you'll create a basic username/password form that allows the user to log in and authenticate using [Auth0.js v7](/libraries/auth0js/v7).

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Sign In with Auth0</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
  <form id="usernamepasswordform">
    <label for="email">Email:</label>
    <input id="email" type="text" />
    <br />
    <label for="password">Password:</label>
    <input id="password" type="password" />
    <br />
    <button>Submit</button>
  </form>
  <!--[if IE 8]>
  <script src="//cdnjs.cloudflare.com/ajax/libs/ie8/0.2.5/ie8.js"></script>
  <![endif]-->

  <!--[if lte IE 9]>
  <script src="https://cdn.auth0.com/js/base64.js"></script>
  <script src="https://cdn.auth0.com/js/es5-shim.min.js"></script>
  <![endif]-->

  <script src="//cdn.auth0.com/w2/auth0-7.6.1.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.1.1.min.js"> </script>
  <script>
    // Decode utf8 characters properly
    var config = JSON.parse(decodeURIComponent(escape(window.atob('config'))));

    var auth0Client = new Auth0({
        domain:       config.auth0Domain,
        clientID:     config.clientID,
        callbackURL:  config.callbackURL,
        responseType: config.callbackOnLocationHash ? 'token' : 'code'
    });
    $('#usernamepasswordform').on('submit', function(e) {
      // make sure to provide config.internalOptions
      var options = $.extend({}, config.internalOptions, {
        // assuming a single database-type connection
        connection: 'Username-Password-Authentication',
        username: $('#email').val(),
        password: $('#password').val()
      });
      e.preventDefault();
      auth0Client.login(options);
    });
  </script>
</body>
</html>
```
