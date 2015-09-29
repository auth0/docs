---
title: Using Passwordless Authentication with a one time code via email on Regular Web Apps
connection: Email
image:
alias:
  - email
  - regular-web-app
---

# Passwordless Authentication with a one time code via e-mail on Regular Web Apps

<%= include('./_introduction-email', { isMobile: false }) %>

## Setup

<%= include('./_setup-email') %>

<%= include('./_setup-callback', {spa:false} )%>

## Implementation

### Use Auth0 UI widget (Lock)

<%= include('./_init-passwordless-lock') %>

Then you can trigger the login, using the callbackURL option for specifying the endpoint that will handle the authentication server side:

```
<script src="${lock_passwordless_url}"></script>
<script type="text/javascript">
  function login(){
    // Initialize Passwordless Lock instance
    var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}');
    // Open Lock in Email Code mode
    lock.emailcode( {callbackURL: '${account.callback}'} );
  }
</script>
<a href="javascript:login()">Login</a>
```

This will first open a dialog that asks the user for an email address. 

![](/media/articles/connections/passwordless/passwordless-email-request-web.png)

Then Auth0 will send an email to the user containing the one time code:

![](/media/articles/connections/passwordless/passwordless-email-receive-code-web.png)

Then, it will ask for a code that has been sent in an email to the given address. The code will be used as a one-time password to log in.

![](/media/articles/connections/passwordless/passwordless-email-enter-code-web.png)

After the user enters the code he received by email, lock will authenticate him and redirect him to the `callbackURL` you specified before. You can follow any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the authentication callback server side.

> A sample application is available in [the Node.js Passwordless Authentication repository on GitHub](https://github.com/auth0/auth0-node-passwordless-sample).

### Use your own UI

You can perform passwordless authentication in your regular web app with your own custom UI using the Auth0 javascript client library [auth0-js](/libraries/auth0js).

<%= include('./_init-auth0js', {withCallbackURL:true} ) %>

You will have to provide a way for the user to enter the email to which the one time code will be sent. Then you can start the passwordless authentication like this:

```js
function sendEmail(){
  var email = $('input.email').val();
  auth0.requestEmailCode( { email:email }, function(err) {
    if (err) {
      alert('error sending e-mail: '+ err.error_description);
      return;
    }
    // the request was successful and you should 
    // receive the passcode to the specified email
    $('.enter-email').hide();
    $('.enter-code').show();
  });
}
```

This will send an email containg the one time code. The user must now fill the code in your custom UI. After that you can continue with the login as follows:

```js
function login(){
  var email = $('input.email').val();
  var code = $('input.code').val();
  //submit the passcode to authenticate the phone
  auth0.verifyEmailCode({ email: email, code: code }, function(err){
  	if (err){
	    alert('code verification failed. ' + err.statusCode + ' '+ err.error);  	
  	}
  });
};
```

If authentication is successful, the user will be redirected to the `callbackURL` specified in the Auth0 constructor. You can follow any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the authentication callback server side.

> A sample application is available in [the Node.js Passwordless Authentication repository on GitHub](https://github.com/auth0/auth0-node-passwordless-sample).