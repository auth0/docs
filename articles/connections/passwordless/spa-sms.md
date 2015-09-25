---
title: Using Passwordless Authentication in SPA with SMS
connection: SMS
image:
alias:
  - sms
  - spa
  - single-page-app
---

# Authenticate users with a one time code via SMS in a SPA

<%= include('./_introduction-sms', { isMobile: true }) %>

## Setup

<%= include('./_setup-sms-twilio') %>

## Implementation

### Use Auth0 UI widget (Lock)

<%= include('./_init-passwordless-lock') %>

You can then trigger the login widget with the following code:

```js
function signin () {
	var appearanceOpts = {
		autoclose:true
	};
  // Open the lock in SMS mode with the ability to handle the authentication in page
	lock.sms(appearanceOpts,function(error, profile, id_token, access_token, state, refresh_token) {
	  if (!error) {
	    //usually save profile and id_token
	  }
	});
};
```

This will open a dialog that asks the user for a phone number.

![](/media/articles/connections/passwordless/passwordless-sms-enter-phone-web.png)

Then Auth0 will use Twilio to send an SMS to the user containing the one time code:

![](/media/articles/connections/passwordless/passwordless-sms-receive-code-web.png)

Lock will ask for the code that has been sent over the text message to the given number. The code will be used as a one-time password to log in:

![](/media/articles/connections/passwordless/passwordless-sms-enter-code-web.png)

If the code is correct, the user will be authenticated. This will call the callback of the `lock.sms` function where you'll typically store the `id_token`, `refresh_token` and user profile after which the user will be able to continue to the authenticated part of the application. 

> A sample application is available in [the jQuery Passwordless Authentication repository on GitHub](https://github.com/auth0/auth0-jquery-passwordless-sample).

### Use your own UI

You can perform passwordless authentication in your SPA with your own custom UI using the Auth0 javascript client library [auth0-js](/libraries/auth0js).

<%= include('./_init-auth0js') %>

You will have to provide a way for the user to enter the phone number to which the SMS will be sent. Then you can start the passwordless authentication like this:

```js
function sendSMS(){
  const phoneNumber = $('input.phone-number').val();
  auth0.startPasswordless({phoneNumber:phoneNumber}, function(err) {
    if (err) {
      alert('error sending SMS: '+ err.error_description);
      return;
    }
    // the request was successful and you should 
    // receive the passcode to the specified phone
    $('.enter-phone').hide();
    $('.enter-code').show();
  });
}
```

This will send an SMS to the specified phone number. The user must now fill the code in your custom UI. After that you can continue with the login as follows:

```js
function login(){
  const phone = $('input.phone-number').val();
  const passcode = $('input.code').val();
  //submit the passcode to authenticate the phone
  auth0.login({phone,passcode},function(err, profile, id_token, access_token){
    if (err){
      alert('Couldn\'t login ' + err.message);
    } else {
	    // the authentication was successful 
	    // you can use profile, id_token and access_token
      localStorage.setItem('userToken', id_token);
      alert.show('Welcome '+ profile.name );
    }
  });
};
```

> A sample application is available in [the jQuery Passwordless Authentication repository on GitHub](https://github.com/auth0/auth0-jquery-passwordless-sample).
