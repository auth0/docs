# Custom Signup

In some cases, you may want to customize the user sign up form with more fields other than email and password.
[Lock](lock) has a `signup` mode but it does not support adding arbitrary fields,
so you will have to implement your own UI for signup.
Lock can still be used for logging in to your application.

> Note that there is currently no way to validate user-supplied custom fields when signing up.
Validation must be done from an Auth0 rule when logging in, or with custom logic in your application.

You can find the [full source of this example on GitHub](https://github.com/auth0/auth0-custom-signup-apiv2-sample), or [see it live here](https://auth0.github.io/auth0-custom-signup-apiv2-sample/).

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

## 2. Auth0.js and dependencies

```html
<script src="https://cdn.auth0.com/w2/auth0-6.js"></script>
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
[This document describes how implicit scopes work when using APIv2](https://auth0.com/docs/api/v2/changes#7).

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
    password: $('#signup-password').val()
  }, signupCallback);

});
```

## Redirect mode

Popup mode may be inappropriate for regular web apps or mobile apps. To
use redirect mode, configure a callback URL when calling `auth0.signup`. After a
successful login, Auth0 will redirect the user to the configured callback URL
with a JWT (`id_token`) in the query string.

> [To learn more about the differences between popup and redirect modes,
please refer to this document](https://auth0.com/docs/libraries/lock/authentication-modes).

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

