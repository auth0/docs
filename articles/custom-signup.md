# Custom Signup

By default, [Lock](lock)'s `signup` mode does not support custom fields. Instead, add additional fields by implementing your own UI for signup around [Lock](lock). Lock will still be used for logging in to your application, while additional fields will be sent to the `user_metadata` field of the user's profile.

Note that there is currently no built-in method of validation for user-supplied custom fields. Validation must be done with an [Auth0 rule](/rules) or with custom logic in your application.

You can find the [full source of this example on GitHub](https://github.com/auth0/auth0-custom-signup-apiv2-sample), or [see it live here](https://auth0.github.io/auth0-custom-signup-apiv2-sample/).

## Overview

The signup flow for custom forms always includes the following steps:

1. [Sign up the user](/auth-api#!#post--dbconnections-signup) with just their username and password. **This endpoint only works for database connections**.
2. [Log in the user](/auth-api#!#post--oauth-ro) by `POST`-ing a user credentials object to the [/oauth/ro](/auth-api#!#post--oauth-ro) endpoint in exchange for a [JWT](/scopes) (JSON Web Token).
3. [Call API v2 with the user's JWT](/api/v2#!/Users/patch_users_by_id) to [add the custom fields to `user_metadata`](/api/v2/changes#user-metadata).

## 1. Example Signup form

In this example, `name` and `color` are custom fields.

```html
<form id="signup">
  <fieldset>
    <legend>Sign up</legend>
    <p>
      <input type="email" id="signup-email" placeholder="Email" required/>
    </p>
    <p>
      <input type="password" id="signup-password" placeholder="Password" required/>
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


## 2. Auth0.js and dependencies

Include the Auth0.js and jQuery libraries in the `<head>` of your document as CDN links...

```html
<script src="https://cdn.auth0.com/w2/auth0-6.7.js"></script>
<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
```

...or as dependencies in a `package.json` file by running:

```shell
npm install --save auth0-js jquery
```

You will also need to create an Auth0 Object. The Auth0 Object takes as an argument a configuration object that includes your Auth0 domain and ClientID. If you're logged in, your data should be populated in the examples below. 

```js
var auth0 = new Auth0({
  domain: '${account.namespace}',
  clientID: '${account.clientId}'
});
```

## 3. Submitting the form 

Forms can be submitted using Popup Mode or Redirect mode. To learn more about the differences between Popup and Redirect modes,
please refer to [this document](/libraries/lock/authentication-modes).

### Popup Mode

First, you sign up a new user through Auth0. If the signup is successful,
a call to the `users/{user_id}` endpoint is made with the `PATCH` method, which adds your custom fields to the
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
    password: $('#signup-password').val()
  }, signupCallback);

});
```

### Redirect mode

Popup mode may not be appropriate for some web apps or mobile apps. In fact, **Redirect mode is recommended whenever possible to avoid potential browser compatibility issues.** 

To use redirect mode, configure a callback function available at an endpoint on your server. Use this endpoint (`callbackURL`) when calling `auth0.signup`. After a successful login, Auth0 will redirect the user to the configured callback URL
with a JWT (`id_token`) in the query string.


```js
var auth0 = new Auth0({
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
