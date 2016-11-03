---
title: Using Passwordless Authentication in SPA with SMS
---

# Authenticate users with a one-time code via SMS in a SPA

<%= include('./_introduction-sms', { isMobile: true }) %>

## Setup

<%= include('./_setup-sms-twilio') %>

<%= include('./_setup-cors') %>

## Implementation

### Use Auth0 UI widget (Lock)

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-passwordless-sample',
  path: ''
}) %>

<%= include('./_init-passwordless-lock') %>

You can then trigger the login widget with the following code:

```html
<script src="${lock_passwordless_url}"></script>
<script type="text/javascript">
  function login(){
    // Initialize Passwordless Lock instance
    var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}');
    // Open the lock in Email Code mode with the ability to handle
    // the authentication in page
    var appearanceOpts = {
      autoclose: true
    };
    // Open the lock in SMS mode with the ability to handle the authentication in page
    lock.sms(appearanceOpts,function (error, profile, id_token, access_token, state, refresh_token) {
      if (!error) {
        //usually save profile and id_token
      }
    });
  }
</script>
<a href="javascript:login()">Login</a>
```

This will open a dialog that asks the user for their phone number.

![](/media/articles/connections/passwordless/passwordless-sms-enter-phone-web.png)

Then Auth0 will use Twilio to send to the user an SMS containing the one-time code:

<div class="phone-mockup"><img src="/media/articles/connections/passwordless/passwordless-sms-receive-code-web.png" alt="SMS one-time code"/></div>

Lock will ask for the code that has been sent via SMS to the provided number. The code can then be used as a one-time password to log in:

![](/media/articles/connections/passwordless/passwordless-sms-enter-code-web.png)

If the code is correct, the user will be authenticated. This will call the callback of the `lock.sms` function where the `id_token`, `refresh_token` and user profile are typically stored. Then the user will be allowed to continue to the authenticated part of the application.

### Use your own UI

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-passwordless-sample',
  path: ''
}) %>

You can perform passwordless authentication in your SPA with your own custom UI using the [Auth0 JavaScript client library](/libraries/auth0js).

<%= include('./_init-auth0js', {withCallbackURL:false} ) %>

You must provide a way for the user to enter a phone number to which the SMS will be sent. Then you can begin the passwordless authentication as follows:

```js
function sendSMS(){
  var phoneNumber = $('input.phone-number').val();
  auth0.requestSMSCode({ phoneNumber:phoneNumber }, function(err) {
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

This will send an SMS to the provided phone number. The user must now enter the code into your custom UI. Then you can continue with the login as follows:

```js
function login(){
  var phone = $('input.phone-number').val();
  var code = $('input.code').val();
  //submit the passcode to authenticate the phone
  auth0.verifySMSCode({ phoneNumber: phone, code: code }, function (err, profile, id_token, access_token) {
    if (err){
      alert('Couldn\'t login ' + err.message);
    } else {
      // the authentication was successful
      // you can use profile, id_token and access_token
      localStorage.setItem('userToken', id_token);
      alert('Welcome ' + profile.name );
    }
  });
};
```
