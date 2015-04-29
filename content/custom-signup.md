# Custom Signup

In some cases, you may want to customize the user sign up form with more fields. The [Auth0Lock](lock) has a `signup` mode but it does not support adding arbitrary fields, so you will have to implement your own UI for signup. Note that you can still use the Auth0Lock for signin though.

> You can find the source code of this example in [this github repository](https://github.com/auth0/node-auth0/tree/master/examples/custom-signup).

### 1. Create the following HTML for signup:

```html
<form id="create-user">
  <fieldset>
  <legend>Create a new user</legend>
  <input type="text" name="email" placeholder="Email" />
  <input type="password" name="password" placeholder="Password" />
  <input type="text" name="color" placeholder="Favorite Color" />
  <input type="text" name="food" placeholder="Favorite Food" />
  <input type="submit" name="submit" />
  </fieldset>
</form>
```

Notice that `color` and `food` are custom fields and we will be storing them too.

### 2. Add the Auth0Lock to it

```html
<script src="@@widget_url_no_scheme@@"></script>
```

```js
window.lock = new Auth0Lock('@@account.clientId@@', '@@account.namespace@@');

window.lock.getClient()._callbackURL = '@@account.callback@@';
window.lock.getClient()._callbackOnLocationHash = true;
```

### 3. Bind the submit event

Then, bind the `submit` event of the form so the user data is sent to our server side.

```js
$('#create-user').submit(function (event) {
  if (event && event.preventDefault) {
    event.preventDefault();
  }

  var userData = {};

  userData.email     = $('#create-user input[name=email]').val();
  userData.password  = $('#create-user input[name=password]').val();
  userData.color     = $('#create-user input[name=color]').val();
  userData.food      = $('#create-user input[name=food]').val();

  $.ajax({
    url: '/signup',
    type: 'POST',
    data: JSON.stringify(userData),
    contentType: 'application/json',
    dataType: 'json',
    success: function(xhr, status) {
      // We are login the user programatically after creating it
      lock.getClient().login({
        'username': userData.email,
        'password': userData.password,
        'connection': 'Username-Password-Authentication'
      }, function (err, profile, id_token, access_token) {
        // store the profile in localstorage/cookie
      });
    },
    error: function () {
      // TODO handle signup error
    }
  });

  return false;
});
```

>***Notes***: This example is focused on client side login for an SPA for example using the **Popup flow**. Using this approach, you get the user's tokens by a callback function in the login method. If you are looking for the **Redirect flow** (where the user gets redirectd after the signup) check the [Redirect flow section](#redirect-flow).

### 4. Server Side

After receiving the request from the client, the JSON contained in the body of the message must be enriched with the `connection` field, that indicates in which connection the user must be stored. `POST` that JSON to `/api/users` and in case that succeeds the user is created.


	POST /api/users
    Authorization: Bearer .... access_token ....

    {
         email: "...",        // taken from request
         password: "...",
         color: "...",
         food: "...",
         connection: "..." 		// added by the server
    }

> Bear in mind that before doing that you may need to generate an access token. Check the API section for more information.
> In case you are using any of our bindings for Node.js, ASP.NET you may use those instead of doing the HTTP requests manually.

### Optional: Verifying password strength

Password policies for database connections can be configured in the dashboard.
For more information, [check out the documentation](password-strength).

The configured password policies, along with other connection information, can be retrieved publicly by accessing a JSONP file at the following URL:

    https://cdn.auth0.com/client/@@account.clientId@@.js

This file can then be parsed client-side to find the current password policy configured in the dashboard.
[Here is an example of how this can be done](https://github.com/auth0/auth0-password-policy-sample).

## Redirect flow
To enable the redirect flow, you must remove the callback function in the login method:

```js
...

lock.getClient().login({
  'username': userData.email,
  'password': userData.password,
  'connection': 'Username-Password-Authentication'
});

...
```

After this, Lock will redirect the user to the callback URL after authenticated. In this example, as the `_callbackOnLocationHash` is `true`, it redirects the user to the callback with the tokens in the URL hash:

```
@@account.callback@@#access_token=#THE_ACCESS_TOKEN#&id_token=#THE_ID_TOKEN#&token_type=Bearer
```

If you are working on a regular webapp, you will need to use the `code` response type which adds a `code` GET parameter to the URL in order to handle it on your backend. To accomplish this, just set the `_callbackOnLocationHash` to `false`. 

```
window.lock.getClient()._callbackOnLocationHash = false;
```
