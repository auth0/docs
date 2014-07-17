---
lodash: true
---

## Generic SPA / Vanilla JS configuration

Please follow the steps below to configure your JS app to use Auth0.

### 1. Adding the Auth0 scripts and setting the right viewport

```html
<!-- Auth0 widget script -->
<script src="@@widget_url_no_scheme@@"></script>

<!-- Setting the right viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

We're including the Auth0 widget script to the `index.html`

### 3. Configure the Auth0Widget

Configuring the Auth0Widget will let your app work with Auth0

```js
$(document).ready(function() {
  var widget = new Auth0Widget({
    domain: '@@account.namespace@@',
    clientID: '@@account.namespace@@',
    callbackURL: '@@account.callback@@'
    callbackOnLocationHash: true
  });
});
```

### 5. Let's implement the login

Now we're ready to implement the Login. Once the user clicks on the login button, we'll call the `signin` method of Auth0's `widget` we've just created.

```js
document.getElementById('btn-login').addEventListener('click', function() {
  widget.signin({ popup: true });
});
```

```html
<!-- ... -->
<input type="submit" class="btn-login" id="btn-login" />
<!-- ... -->
```

If you want to check all the available arguments for the signin call, please [check here](TODO://)

#### 6. Handling Login success and failure

The `signin` method receives 2 extra arguments:

1. A callback that will be called once the popup is shown
2. A callback that handles login success and failure

In this case, we'll implement the callback #2.

```js
var userProfile;

document.getElementById('btn-login').addEventListener('click', function() {
  widget.signin({ popup: true, null, function(err, profile, token) {
    if (err) {
      // Error callback
      alert('There was an error');
    } else {
      // Success calback

      // Save the JWT token.
      localStorage.setItem('userToken', token);

      // Save the profile
      userProfile = profile;
    }
  }});
});
```

We need to save the token so that we can use it later when calling a server or an API. In this case, we're saving that token in LocalStorage.

#### 8. Showing user information

We already have the `userProfile` variable with the user information. Now, we can set that information to a span:

```js
document.getElementById('nick').textContent = userProfile.nickname;
```

```html
<p>His name is <span id="nick"></span></p>
```

You can [click here](https://docs.auth0.com/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

#### 9. Logging out

In our case, logout means just deleting the saved token from localStorage and redirecting the user to the home page.

```js
localStorage.removeItem('token');
userProfile = null;
window.location.href = "/";
```

#### 9. Sit back and relax

Now it's time to sit back, relax and open a beer. You've implemented Login and Signup with Auth0 and jQuery.

#### Extra Extra

We've learnt how to configure jQuery with Auth0 using a Popup for sign in.

If you want to learn how to implement this with redirect, [you can read here](TODO://)

If you want to implement your custom Signin and Signup form, [you can read here](TODO://)
