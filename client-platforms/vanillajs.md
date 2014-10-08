---
lodash: true
---

## Generic SPA / Vanilla JS Tutorial

Please follow the steps below to configure your JS app to use Auth0.

@@includes.callback@@

### 1. Adding the Auth0 scripts and setting the right viewport

````html
<!-- Auth0Lock script -->
<script src="@@widget_url_no_scheme@@"></script>

<!-- Setting the right viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

We're including the Auth0 lock script to the `index.html`

### 2. Create the Auth0Lock instance

Configuring the Auth0Lock will let your app work with Auth0

````js
var lock = null;
document.addEventListener( "DOMContentLoaded", function(){
  lock = new Auth0Lock('@@account.clientId@@', '@@account.namespace@@');
});
```

### 3. Let's implement the login

Now we're ready to implement the Login.

````html
<!-- ... -->
<input id="btn-login" class="btn-login" type="submit" />
<!-- ... -->
```

Once the user clicks on the login button, we'll call the `.show()` method of Auth0's `lock` we've just created.

````js
var userProfile = null;

document.getElementById('btn-login').addEventListener('click', function() {
  lock.show({ popup: true }, function(err, profile, token) {
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

We need to save the token so that we can use it later when calling a server or an API. In this case, we're saving that token in LocalStorage.

If you want to check all the available arguments for the show method, check the [Auth0Lock](@@base_url@@/lock) documentation.



### 4. Showing user information

We already have the `userProfile` variable with the user information. Now, we can set that information to a span:

````js
document.getElementById('nick').textContent = userProfile.nickname;
```

````html
<p>His name is <span id="nick"></span></p>
```

You can [click here](@@base_url@@/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

### 5. Logging out

In our case, logout means just deleting the saved token from localStorage and redirecting the user to the home page.

````js
localStorage.removeItem('userToken');
userProfile = null;
window.location.href = "/";
```

### 6. Sit back and relax

Now it's time to sit back, relax and open a beer. You've implemented Login and Signup with Auth0 and VanillaJS.
