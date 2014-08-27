---
lodash: true
---

## Generic SPA / Vanilla JS Tutorial

Please follow the steps below to configure your JS app to use Auth0.

@@includes.callback@@

### 1. Adding the Auth0 scripts and setting the right viewport

````html
<!-- Auth0 widget script -->
<script src="@@widget_url_no_scheme@@"></script>

<!-- Setting the right viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

We're including the Auth0 widget script to the `index.html`

### 2. Configure the Auth0Widget

Configuring the Auth0Widget will let your app work with Auth0

````js
document.addEventListener( "DOMContentLoaded", function(){
  var widget = new Auth0Widget({
    domain: '@@account.namespace@@',
    clientID: '@@account.clientId@@',
    callbackURL: location.href,
    callbackOnLocationHash: true
  });
});
```

### 3. Let's implement the login

Now we're ready to implement the Login. Once the user clicks on the login button, we'll call the `signin` method of Auth0's `widget` we've just created.

````js
var userProfile;

document.getElementById('btn-login').addEventListener('click', function() {
  widget.signin({ popup: true }, null, function(err, profile, token) {
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
  });
});
```

````html
<!-- ... -->
<input type="submit" class="btn-login" id="btn-login" />
<!-- ... -->
```
We need to save the token so that we can use it later when calling a server or an API. In this case, we're saving that token in LocalStorage.

If you want to check all the available arguments for the signin call, please [check here](https://docs.auth0.com/login-widget2)



### 4. Showing user information

We already have the `userProfile` variable with the user information. Now, we can set that information to a span:

````js
document.getElementById('nick').textContent = userProfile.nickname;
```

````html
<p>His name is <span id="nick"></span></p>
```

You can [click here](https://docs.auth0.com/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

### 5. Logging out

In our case, logout means just deleting the saved token from localStorage and redirecting the user to the home page.

````js
localStorage.removeItem('userToken');
userProfile = null;
window.location.href = "/";
```

### 6. Sit back and relax

Now it's time to sit back, relax and open a beer. You've implemented Login and Signup with Auth0 and VanillaJS.
