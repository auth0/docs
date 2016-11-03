---
title: Using Passwordless Authentication with a Magic Link via email on SPA
---

# Authenticate users with a Magic Link via e-mail on SPA

<%= include('./_introduction-email-magic-link') %>

## Setup

<%= include('./_setup-email') %>

<%= include('./_setup-callback', {spa:true} ) %>

## Implementation

### Use Auth0 UI widget (Lock)

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-passwordless-sample',
  path: ''
}) %>

<%= include('./_init-passwordless-lock') %>

Then you can trigger the passwordless authentication using a magic link with the following code:

```html
<script src="${lock_passwordless_url}"></script>
<script type="text/javascript">
  function login(){
    // Initialize Passwordless Lock instance
    var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}');
    // Open the lock in Email Magic Link mode
    lock.magiclink();
  }
</script>
<a href="javascript:login()">Login</a>
```

The user will receive an email with the magic link. Once the user clicks on this link, Auth0 will handle the authentication and redirect back to the application with the token as the hash location. You can parse the hash and retrieve the full user profile as follows:

```js
//parse hash on page load
$(document).ready(function(){
  var hash = lock.parseHash(window.location.hash);

  if (hash && hash.error) {
    alert('There was an error: ' + hash.error + '\n' + hash.error_description);
  } else if (hash && hash.id_token) {
    //use id_token for retrieving profile.
    localStorage.setItem('id_token', hash.id_token);
    //retrieve profile
    lock.getProfile(hash.id_token, function (err, profile) {
      if (err){
        //handle err
      } else {
        //use user profile
      }
    });
  }
});
```

### Use your own UI

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-passwordless-sample',
  path: ''
}) %>

You can perform passwordless authentication with a magic link in your single-page application using your own UI with the [Auth0 JavaScript client library](/libraries/auth0js).

<%= include('./_init-auth0js', {withCallbackURL:false} ) %>

You can then trigger the passwordless login using a magic link with the following code:

```js
function sendMagicLink(){
  var email = $('input.email').val();
  auth0.requestMagicLink({ email: email }, function(err) {
    if (err) {
      alert('error sending e-mail: ' + err.error_description);
      return;
    }
    // the request was successful and you should
    // receive the magic link in the specified email
  });
}
```

Once the user clicks the magic link, they will be redirected to the application callback URL, where you will need to parse the token with `auth0.parseHash`:

```js
//parse hash on page load
$(document).ready(function(){
  var hash = auth0.parseHash(window.location.hash);

  if (hash && hash.error) {
    alert('There was an error: ' + hash.error + '\n' + hash.error_description);
  } else if (hash && hash.id_token) {
    //use id_token for retrieving profile.
    localStorage.setItem('id_token', hash.id_token);
    //retrieve profile
    auth0.getProfile(hash.id_token, function (err, profile) {
      if (err){
        //handle err
      } else {
        //use user profile
      }
    });
  }
});
```
