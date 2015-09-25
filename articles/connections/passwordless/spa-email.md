---
title: Using Passwordless Authentication on SPA with e-mails
connection: Email
image:
alias:
  - email
  - spa
---

# Passwordless Authentication via e-mail on Single Page Apps

## Authenticate users with a one time code via e-mail

<%= include('./_introduction-email', { isMobile: false }) %>

### Setup

<%= include('./_setup-email') %>

<%= include('../../client-platforms/_callback') %>

## Implementation

### Use Auth0 UI widget (Lock)

<%= include('./_init-passwordless-lock') %>

Then you can trigger the login like this:

```js
function login(){
  // Open the lock in Email Code mode with the ability to handle
  // the authentication in page
  lock.emailcode((err, profile, id_token, state) => {
    if (!err) {
      
      // Save the JWT token.
      localStorage.setItem('userToken', id_token);
      
      //use profile

    }
  });
}
```

This will first open a dialog that asks the user for an email address. 

![](/media/articles/connections/passwordless/passwordless-email-receive-code-web.png)

Then, it will ask for a code that has been sent in an email to the given address. The code will be used as a one-time password to log in.

![](/media/articles/connections/passwordless/passwordless-email-enter-code-web.png)

After the user enters the code he received by email, lock will authenticate it and call the callback function, where you will have the the id_token and profile available.

### Use your own UI

You can perform passwordless authentication in your SPA with your own custom UI using the Auth0 javascript client library [auth0-js](/libraries/auth0js).

<%= include('./_init-auth0js') %>

You will have to provide a way for the user to enter the emali to which the one time code will be sent. Then you can start the passwordless authentication like this:

```js

function sendEmail(){
  const email = $('input.email').val();
  auth0.startPasswordless({ email: email, send: 'code' }, function(err) {
    if (err) {
      alert('error sending e-mail: '+ err.error_description);
      return;
    }
    // the request was successful and you should 
    // receive the code to the specified email
    $(".enter-code").show();
  });
}
```

This will send an email containg the one time code. The user must now fill the code in your custom UI. After that you can continue with the login as follows:

```js
function login(){
  const username = $('input.email').val();
  const password= $('input.code').val();

  //submit the passcode to complete authentication
  auth0.login(
    {
      connection: 'email',
      username: username,
      password: password,
      sso: false
    }, function(err, profile, id_token, access_token) {
      if (err){
        alert('Couldn\'t login '+ err.message);
      } else {

        //save id_token to local storage
        localStorage.setItem('userToken', id_token);
        
        //use profile
        alert('Welcome '+ profile.name);
      }
    });
}
```

## Authenticate users with Magic Link via e-mail

<%= include('./_introduction-email-magic-link') %>

### Use Auth0 UI widget (Lock)

<%= include('./_init-passwordless-lock') %>

Then you can trigger the passwordless authentication using a magic like like this:

```js
function login(){
  lock.magiclink();
}
```
#### Magic Link

The user will receive an email with the magic link. The magic link has the following format:

```
https://${account.namespace}/authorize?scope=openid&response_type=token&redirect_uri=${account.callback}&email=someone%40company.com&verification_code=738402&connection=email&client_id=${account.clientId}
```

When the user clicks on the magic link received by email and he is authenticated, he will be redirected to your callback url.

> Notice that if you have more than one allowed callback urls configured in your dashboard, it will use the first one.

Once the user clicks the magic link and he is succesfully authenticated, Auth0 will redirect him to the callback url. Auth0 will append a few extra parameters after a hash on the URL. These include: an access_token and an id_token (a JWT). You can parse the hash and retrieve the full user profile as follows:

```js
var auth0 = new Auth0({
  clientID: ${account.clientId},
  domain: ${account.namespace}
});
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

### Use your own UI

You can perform passwordless authentication with a magic link in your SPA with your own custom UI using the Auth0 javascript client library [auth0-js](/libraries/auth0js).

<%= include('./_init-auth0js') %>

You can then trigger the passwordless login using a magic link like this:

```js
function sendMagicLink(){
  var email = $('input.email').val();
  auth0.startPasswordless({email:email}, function(err) {
    if (err) {
      alert('error sending e-mail: '+ err.error_description);
      return;
    }
    // the request was successful and you should 
    // receive the magic link in the specified email
  });
} 
```

After the user clicks the magic link and is successfully authenticated, he is redirected to your callback URL, where you need to parse the token with `auth0.parseHash`. The code snippet is the same as for the [Passwordless Lock Widget](#magic-link).
