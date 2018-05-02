---
section: libraries
description: How to customize the user sign-up form with additional fields using Lock or the Auth0 API.
toc: true
---
# Custom Signup

In some cases, you may want to customize the user sign up form with more fields other than email and password.

:::panel Universal Login
Auth0 offers a [universal login](/hosted-pages/login) option that you can use instead of designing your own custom sign up page. If you want to offer sign up and log in options, and you only need to customize the application name, logo and background color, then universal login via an Auth0 login page might be an easier option to implement.
:::

## Using Lock

Lock supports [custom fields signup](/libraries/lock/customization#additionalsignupfields-array-).

![custom signup fields](/media/articles/libraries/lock/v10/signupcustom.png)

Lock's `additionalSignUpFields` option will only work with database signups. For signups using social identity providers, collecting these fields in the same manner is not possible with Lock, but there are two other options to allow social IDP signups with Lock while still collecting additional custom fields.

### Redirect to another page

One way to use social provider signups with Lock and collect custom fields is to use [redirect rules](/rules/redirect) to redirect the user to another page where you ask for extra information, and then redirect back to finish the authentication transaction.

### Progressive profiling

Another way to collect custom field data when signing users up with social providers is via progressive profiling. Progressive profiling is a way by which you can slowly build up user profiles over time. You collect the bare minimum details upon signup, but when a user later interacts with your app, you collect a small amount of data (perhaps one question) each time until their profile is complete. This allows for collecting the desired information, but with less friction at signup, since the goal of using a social IDP for signup is, at least in part, making it more effortless and streamlined for the user.

For further reference, here is our [documentation on progressive profiling](/user-profile/progressive-profiling) as well as an Auth0 [blog post on progressive profiling](https://auth0.com/blog/progressive-profiling/).

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

The `name` and `color` are custom fields.

::: note
There is currently no way to validate user-supplied custom fields when signing up. Validation must be done from an Auth0 [Rule](/rules) at login, or with custom, **server-side** logic in your application.
:::

### 2. Send the Form Data

Send a POST request to the [/dbconnections/signup](/api/authentication/reference#signup) endpoint in Auth0. You will need to send your `ClientId`, the `email` and `password` of the user being signed up, and the custom fields as part of `user_metadata`.

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

## Custom fields limitations

When your users sign up, the custom fields are sent as part of `user_metadata`. The limitations of this field are:

* `user_metadata` must contain no more than 10 fields
* `user_metadata.field` must be a string
* `user_metadata.field.value.length` must be fewer than 500 characters
* `user_metadata.field.length` must be fewer than 100 characters
* The current size limit for `user_metadata` is **16 MB**

## Redirect mode

After a successful login, Auth0 will redirect the user to your configured callback URL with a JWT (`id_token`) in the query string.

::: note
To learn more about the differences between popup and redirect modes, please refer to [this document](/libraries/lock/v10/popup-mode).
:::

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

To enable this feature, turn on the `Requires Username` setting on the [Connections > Database](${manage_url}/#/connections/database/) section of the dashboard under the **Settings** tab for the connection you wish to edit.

Once this has been set, when a user is created manually in the Auth0 dashboard, the screen where users enter their information will prompt them for both an email and a username.

Similarly, the Lock widget in sign up mode will prompt for a username, email and password.

Then users can log in with Username and Password.

## Optional: Verifying password strength

Password policies for database connections can be configured in the dashboard. For more information, see: [Password Strength in Auth0 Database Connections](/connections/database/password-strength).

If required for implementation of custom signup forms, the configured password policies, along with other connection information, can be retrieved from the the [Management v2 API](/api/management/v2#!/Connections/get_connections_by_id). The result can be parsed client-side, and will contain information about the current password policy (or policies) configured in the dashboard for that connection.
