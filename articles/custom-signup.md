---
description: How to customize the user sign-up form with additional fields using Lock or the Auth0 API.
---

# Custom Signup

In some cases, you may want to customize the user sign up form with more fields other than email and password.

## Using Lock

Lock 10 supports custom fields signup. For more information, see: [Lock 10 Preview Release](/libraries/lock/v10).

![custom signup fields](/media/articles/libraries/lock/v10/signupcustom.png)

## Using the API

### 1. Create a Sign Up form to capture custom fields

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

**NOTE**:  `name` and `color` are custom fields.

::: panel-info Custom field validation
There is currently no way to validate user-supplied custom fields when signing up. Validation must be done from an Auth0 [Rule](/rules) at login, or with custom logic in your application.
:::

### 2. Send the Form Data

Send a POST request to the [/dbconnections/signup](/api/authentication#!#post--dbconnections-signup) endpoint in Auth0. You will need to send your `ClientId`, the `email` and `password` of the user being signed up, and the custom fields as part of `user_metadata`.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/dbconnections/signup",
  "headers": [{
    "name": "Content-Type",
    "value": "application/json"
  }],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"client_id\": \"${account.clientId}\",\"email\": \"$('#signup-email').val()\",\"password\": \"$('#signup-password').val()\",\"user_metadata\": {\"name\": \"john\",\"color\": \"red\"}}"
  }
}
```

## Custom Fields Limitations

When your users sign up, the custom fields are sent as part of `user_metadata`. The limitations of this field are:

* `user_metadata` must contain no more than 10 fields;
* `user_metadata.field` must be a string;
* `user_metadata.field.value.length` must be fewer than 500 characters;
* `user_metadata.field.length` must be fewer than 100 characters.

## Redirect mode

Popup mode may be inappropriate for regular web apps or mobile apps. To use redirect mode, configure a callback URL when calling `auth0.signup`. After a
successful login, Auth0 will redirect the user to the configured callback URL with a JWT (`id_token`) in the query string.

**NOTE**: To learn more about the differences between popup and redirect modes, see: [Lock: Authentication Modes](/libraries/lock/v9/authentication-modes).

```js
window.auth0 = new Auth0({
  domain: '${account.namespace}',
  clientID: '${account.clientId}',
  // Callback made to your server's callback endpoint
  callbackURL: '${account.callback}',
});
```

Your server will then need to call APIv2 to add the necessary custom fields to the user's profile.

## Add Username to Sign Up form

One common signup customization is to add a `username` to the signup.

To enable this feature, turn on the `Requires Username` setting on the [Connections > Database](${uiURL}/#/connections/database/) section of the dashboard under the **Settings** tab for the connection you wish to edit.

Once this has been set, when a user is created manually in the Auth0 dashboard, the screen where users enter their information will prompt them for both an email and a username.

Similarly, the Lock widget in sign up mode will prompt for a username, email and password.

Then users can log in with Username and Password.

## Optional: Verifying password strength

Password policies for database connections can be configured in the dashboard. For more information, see: [Password Strength in Auth0 Database Connections](/connections/database/password-strength).

The configured password policies, along with other connection information, can be retrieved publicly by accessing a JSONP file at the following URL:

`https://cdn.auth0.com/client/${account.clientId}.js`

This file can then be parsed client-side to find the current password policy configured in the dashboard. For an example, see: [Custom signup with password policy](https://github.com/auth0/auth0-password-policy-sample).


