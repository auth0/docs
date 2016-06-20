# Custom Signup

In some cases, you may want to customize the user sign up form with more fields other than email and password. Read below to learn how to do it using Lock or the API.

## Using Lock

Lock 10 supports custom fields for the signup. Read more: [Lock 10 Preview Release](/libraries/lock/v10).

![custom signup fields](/media/articles/libraries/lock/v10/signupcustom.png)

# Using the API

You can find the [full source of this example on GitHub](https://github.com/auth0/auth0-custom-signup-apiv2-sample), or [see it live here](https://auth0.github.io/auth0-custom-signup-apiv2-sample/).

## Overview

We can describe a custom signup flow with the following steps:

1. [Sign up the user](/auth-api#!#post--dbconnections-signup) with just their username and password
2. [Log them in programatically](/auth-api#!#post--oauth-ro) and [get back a JWT](/scopes)
3. [Call API v2 with the user's JWT](/api/v2#!/Users/patch_users_by_id) to [add the custom fields to `user_metadata`](/api/v2/changes#user-metadata)

## 1. Signup form

```html
<form id="signup">
  <fieldset>
    <legend>Sign up</legend>
    <p>
      <input type="email" id="signup-email" placeholder="Email" required/>
    </p>
    <p>
      <input type="password" id="signup-password" placeholder="Password"
             required/>
    </p>
    <p>
      <input type="text" id="name" placeholder="Full name" required/>
    </p>
    <p>
      <input type="text" id="color" placeholder="Favorite color"/>
    </p>
    <input type="submit" value="Sign up"/>
  </fieldset>
</form>
```

Notice that `name` and `color` are custom fields.

> Note that there is currently no way to validate user-supplied custom fields when signing up.
Validation must be done from an Auth0 rule when logging in, or with custom logic in your application.

## 2. Auth0.js and dependencies

```html
<script src="https://cdn.auth0.com/w2/auth0-6.7.js"></script>
<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
```

```js
window.auth0 = new Auth0({
  domain: '${account.namespace}',
  clientID: '${account.clientId}'
});
```

## 3. Submitting the form (popup mode)

Here we are first signing up the user through Auth0. If the signup is successful,
a call to `PATCH users/{user_id}` is made, which adds the custom fields to the
`user_metadata` field of the user's profile.

> This call to APIv2 is allowed from the client because all JWTs for logged-in
users implicitly include the `update:current_user_metadata` scope by default.
[This document describes how implicit scopes work when using APIv2](/api/v2/changes#scopes).

```js
$('#signup').submit(function (e) {
  e.preventDefault();

  function v2PatchUser (userId, id_token, data, successCallback, errorCallback) {
    $.ajax({
        method: 'patch',
        url: apiEndpoint + 'users/' + userId,
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + id_token
        },
        data: data,
        success: successCallback,
        error: errorCallback
    });
  }

  function signupCallback (err, profile, id_token) {
      if (err) {
        alert('Something went wrong signing up: ' + err);
      } else {
        var data = {
          user_metadata: {
            favorite_color: $('#color').val(),
            name: $('#name').val()
          }
        };
        function updateSuccess () {
          alert('Successfully signed up!');
        }
        function updateError (jqXHR) {
          alert('Something went wrong signing up: ' + jqXHR.responseText);
        }
        v2PatchUser(profile.user_id, id_token, data, updateSuccess, updateError);
      }
  }

  auth0.signup({
    // Don't display a popup to set an SSO cookie
    sso: false,
    auto_login: true,
    connection: 'Username-Password-Authentication',
    email: $('#signup-email').val(),
    password: $('#signup-password').val(),
    user_metadata: {
        field: "value",
        field2: "value2"
    }
  }, signupCallback);

});
```

> You may now send custom fields on user signup!

### Custom Fields

When your users sign up, you can have custom fields sent as part of `user_metadata`.

Limitations:
* `user_metadata` must contain no more than ten fields;
* `user_metadata.field` must be a string;
* `user_metadata.field.value.length` must be fewer than 500 characters;
* `user_metadata.field.length` must be fewer than 100 characters.

## Redirect mode

Popup mode may be inappropriate for regular web apps or mobile apps. To
use redirect mode, configure a callback URL when calling `auth0.signup`. After a
successful login, Auth0 will redirect the user to the configured callback URL
with a JWT (`id_token`) in the query string.

> [To learn more about the differences between popup and redirect modes,
please refer to this document](/libraries/lock/authentication-modes).

```js
window.auth0 = new Auth0({
  domain: '${account.namespace}',
  clientID: '${account.clientId}',
  // Callback made to your server's callback endpoint
  callbackURL: '${account.callback}',
});
```

Your server will then need to call APIv2 to add the necessary custom fields to
the user's profile.


## Optional: Verifying password strength

Password policies for database connections can be configured in the dashboard.
For more information, [check out the documentation](password-strength).

The configured password policies, along with other connection information, can be retrieved publicly by accessing a JSONP file at the following URL:

    https://cdn.auth0.com/client/${account.clientId}.js

This file can then be parsed client-side to find the current password policy configured in the dashboard.
[Here is an example of how this can be done](https://github.com/auth0/auth0-password-policy-sample).

## Add username to Sign Up form

One very simple signup customization is to add a `username` to the signup.

To set this up,  turn on the  `Requires username` setting for a Database connection.

Once this has been done, when a user is created manually in the Auth0 dashboard, then the screen where you enter user information will prompt for both email and username.

Similarly, the Lock widget in sign up mode will prompt for username, email and password.

When a user authenticates, they can log in with username + Password.
