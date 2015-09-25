# Authenticate users with a one time code via SMS in Single Page Apps

<%= include('./_introduction-sms', { isMobile: true }) %>

## Setup

<%= include('./_setup-sms-twilio') %>

## Implementation

### Use Auth0 UI widget (Lock)

#### Initialize

Auth0 Lock Passwordless is a professional looking dialog that allows users to log in by receiving a one-time password via email or text message.

After installing [Lock Passwordless](https://github.com/auth0/lock-passwordless) you will have to initialize it with your clientId and domain. You can find this information at your [application settings](${uiAppSettingsURL}).
    

```
<script src="${lock_passwordless_url}"></script>
<script type="text/javascript">
	// Initialize Passwordless Lock instance
  var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}');
  //...
</script>
<a href="javascript:signin()">Login</a>
```

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

[PICTURE]

Then, it will ask for a code that has been sent over a text message to the given number. The code will be used as a one-time password to log in.

[PICTURE]

After the code is validated, the callback of the `lock.sms` function is invoked. If there are any errors, they will be displayed in the UI widget. Otherwise the user will be successfully authenticated.

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

#### Send Code by SMS

After the user fills in the phone number to which the SMS will be send within your custom UI, you can start the passwordless authentication like this:

```js
function sendSMS(){
  const phoneNumber = $('input.phone-number').val();
  auth0.startPasswordless({phoneNumber}, err => {
    if (err) {
      alert(`error sending SMS: <%="${err.error_description}"%>`);
      return;
    }
    // the request was successful and you should 
    // receive the passcode to the specified phone
    $(".enter-phone").hide();
    $(".enter-code").show();
  });
}
```
This will send an SMS to the specified phone number

[SCREENSHOT]

The user must now fill the code in your custom UI. After that you can continue with the login as follows:

```
function login(){
  const phone = $('input.phone-number').val();
  const passcode = $('input.code').val();
  //submit the passcode to authenticate the phone
  auth0.login({phone,passcode},function(err, profile, id_token, access_token){
    if (err){
      alert(`Couldn't login <%= "${err.message}"%>`);
    } else {
	    // the authentication was successful 
	    // you can use profile, id_token and access_token
      localStorage.setItem('userToken', id_token);
      alert.show(`Welcome <%="${profile.name}"%>!`);
    }
  });
};
```


