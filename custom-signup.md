# Custom Signup

In some cases, you may want to customize the user sign up form with more fields. The [Login Widget](login-widget2) has a `signup` mode but it does not support adding arbitrary fields, so you will have to implement your own UI for signup. Note that you can still use the Login Widget for signin thought.

> You can find the source code of this example in [this github repository](https://github.com/auth0/custom-signup-sample).

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

### 2. Add the Auth0 Widget to it

```html
<script src="https://cdn.auth0.com/w2/auth0-widget-2.4.0.min.js"></script>
```

```js
window.widget = new Auth0Widget({
  domain:                     'contoso.auth0.com',
  clientID:                   'DyG9nCwIEofSy66QM3oo5xU6NFs3TmvT',
  callbackURL:                'http://localhost:1337/',
  callbackOnLocationHash:     true
});
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
      widget.getClient().login({
        'username': userData.email,
        'password': userData.password,
        'connection': 'Username-Password-Authentication'
      });
    },
    error: function () {
      // TODO handle signup error
    }
  });

  return false;
});
```


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

### 5. Add the necessary code to show the profile when logged in:

```js
widget.parseHash(window.location.hash, function (profile, id_token, access_token, state) {
  $('#user-profile .email').text(profile.email);
  $('#user-profile .color').text(profile.color);
  $('#user-profile .food').text(profile.food);
});
```
