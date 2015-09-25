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

With the e-mail connection users are requested to enter their e-mail address after which Auth0 will send an email to the user containing the one time code. 

After entering the code in your application, the user will be created in the `email` connection and then authenticated. 

![](/media/articles/connections/passwordless/passwordless-create-user-flow.png)

If the user already exists, we will just authenticate the user:

![](/media/articles/connections/passwordless/passwordless-authenticated-flow.png)


### Setup

#### 1. Optional: Configure an Email Provider

By default Auth0 will send out the emails from its own infrastructure but optionally you can [configure your own Email Provider](/articles/email/providers) to better monitor and troubleshoot the email communication

#### 2. Configure the connection

On the **Email** page under [Connections > Passwordless](https://manage.auth0.com/#/connections/passwordless) you are able to configure the behavior and the contents of the email.

![](/media/articles/connections/passwordless/passwordless-email-config.png)

The email contents can be writting in HTML with the Liquid syntax, allowing you to conditionally shape the contents of the email. The following macros are available when defining the template:

 - `{{ application.name }}`
 - `{{ code }}` (the one time code)


### 3. Configure Callback URL

[TODO: include client-platforms/_callback.md]

### Use Auth0 UI widget (Lock)

Auth0 Lock Passwordless is a professional looking dialog that allows users to log in by receiving a one-time password via email or text message.

After installing [Lock Passwordless](https://github.com/auth0/lock-passwordless) you will have to initialize it with your clientId and domain. You can find this information at your [application settings](${uiAppSettingsURL}).


```html
<script src="${lock_passwordless_url}"></script>
<script type="text/javascript">
  
  // Initialize Passwordless Lock instance
  const lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}');
  //...

</script>  
```

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

![](/media/articles/connections/passwordless/spa-email-1.png)

Then, it will ask for a code that has been sent in an email to the given address. The code will be used as a one-time password to log in.

![](/media/articles/connections/passwordless/spa-email-2.png)

After the user enters the code he received by email, lock will authenticate it and call the callback function, where you will have the the id_token and profile available.

### Use your own UI

You can perform passwordless authentication in your SPA with your own custom UI using the Auth0 javascript client library [auth0-js](/libraries/auth0js).

#### Initialize

Construct a new instance of the Auth0 client as follows:

```
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  'use strict';
  const auth0 = new Auth0({
    clientID: '${account.clientId}',
    domain: '${account.namespace}'
  });
  //...
</script>
```

#### Send Code by Email

After the user fills in the email to send the one time authentication code in your custom UI, you can start the passwordless authentication like this:


```js

function sendEmail(){
  const email = $('input.email').val();
  auth0.startPasswordless({ email, send: 'code' }, err => {
    if (err) {
      alert(`error sending e-mail: <%= "${err.error_description}" %>`);
      return;
    }
    // the request was successful and you should 
    // receive the code to the specified email
    $(".enter-code").show();
  });
}
```

This will send an email containg the one time code.

[EMAIL SCREENSHOT]

The user must now fill the code in your custom UI. After that you can continue with the login as follows:


```js
function login(){
  const username = $('input.email').val();
  const password= $('input.code').val();

  //submit the passcode to complete authentication
  auth0.login(
    {
      connection:'email',
      username,
      password,
      'sso':false
    },(err, profile, id_token, access_token) => {
      if (err){
        alert(`Couldn't login <%= "${err.message}"%>`);
      } else {

        //save id_token to local storage
        localStorage.setItem('userToken', id_token);
        
        //use profile
        alert(`Welcome <%= "${profile.name}!"%>`);
      }
    });
}
```

## Authenticate users with Magic Link via e-mail
Diagram: flow

### Use Auth0 UI widget (Lock)

#### Initialize Lock

After installing [Lock Passwordless](https://github.com/auth0/lock-passwordless) you will have to initialize it with your clientId and domain:


```html
<script src="${lock_passwordless_url}"></script>
<script type="text/javascript">
  
  // Initialize Passwordless Lock instance
  const lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}');
  //...

</script>  
```

#### Login

Then you can trigger the passwordless authentication using a magic like like this:


```js
function login(){
  lock.magiclink();
}
```

#### Process the magic link callback

The magic link has the following format:

```
https://${account.namespace}/authorize?scope=openid&response_type=token&redirect_uri=${account.callback}&email=someone%40yourcompany.com&verification_code=738402&connection=email&client_id=${account.clientId}
```

When the user clicks on the magic link received by email and he is authenticated, he will be redirected to your callback url.

| Notice that if you have more than one allowed callback urls configured in your dashboard, it will use the first one.

Once the user clicks the magic link and he is succesfully authenticated, Auth0 will redirect him to the callback url. Auth0 will append a few extra parameters after a hash on the URL. These include: an access_token and an id_token (a JWT). You can parse the hash and retrieve the full user profile as follows:

```js
//this should be supported by lock instead
const auth0 = new Auth0({
  clientID: ${account.clientId},
  domain: ${account.namespace}
});
//parse hash on page load
$(document).ready(() => {
	const hash = auth0.parseHash(window.location.hash);

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

#### Initialize

Construct a new instance of the Auth0 client as follows:

```
<script src="${auth0js_url}"></script>
<script type="text/javascript">
	'use strict';
	const auth0 = new Auth0({
	  clientID: '${account.clientId}',
	  domain: '${account.namespace}'
	});
	//...
</script>
```

#### Login
Trigger the passwordless login using a magic link

```js
function sendMagicLink(){
  const email = $('input.email').val();
  auth0.startPasswordless({email}, err => {
    if (err) {
      alert(`error sending e-mail: <%= "${err.error_description}" %>`);
      return;
    }
    // the request was successful and you should 
    // receive the magic link in the specified email
  });
} 
```

#### Process the magic link callback

The magic link has the following format:

```
https://${account.namespace}/authorize?scope=openid&response_type=token&redirect_uri=${account.callback}&email=someone%40yourcompany.com&verification_code=738402&connection=email&client_id=${account.clientId}
```

When the user clicks on the magic link received by email and he is authenticated, he will be redirected to your callback url.

| Notice that if you have more than one allowed callback urls configured in your dashboard, it will use the first one.

Once the user clicks the magic link and is succesfully authenticated, Auth0 will redirect him to the callback url. Auth0 will append a few extra parameters after a hash on the URL. These include: an access_token and an id_token (a JWT). You can parse the hash and retrieve the full user profile as follows:

```js
$(document).ready(() => {
  var hash = auth0.parseHash(window.location.hash);

  if (hash && hash.id_token) {

  	//use result.id_token to call your rest api

    //retrieve profile
    auth0.getProfile(hash.id_token, function (err, profile) {
      if (err){
        alert(`There was an error retrieving your profile: <%= "${err.message}" %>`);
      } else {
        //user profile
      }
    });

  } else if (hash && hash.error) {
    alert(`There was an error: <%= " ${hash.error} "%> '\n' <%= "${hash.error_description}" %>`);
  }

});
```
