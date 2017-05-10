---
title: Using Passwordless Authentication in SPA with SMS
---

<div class="alert alert-info">
This document covers Passwordless Authentication, and uses the most up-to-date version of auth0.js - version 8. We recommend using this version, but if you are already using version 7, you can see the Passwordless documentation that uses version 7 using the dropdown at the top of this document. If you are interested in upgrading to use auth0.js v8, take a look at the <a href="/libraries/auth0js/v8/migration-guide">migration guide</a>.
</div>

# Authenticate Users With a One Time Code via SMS in a SPA

<%= include('../../_introduction-sms', { isMobile: true }) %>

## Setup

<%= include('../../_setup-sms-twilio') %>

<%= include('../../_setup-cors') %>

## Implementation

### Use Lock (the Auth0 UI widget)

<%= include('../../_init-passwordless-lock') %>

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

<%= include('../../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-passwordless-sample',
  path: ''
}) %>

You can perform passwordless authentication in your SPA with your own custom UI using the [Auth0 JavaScript client library](/libraries/auth0js).

<%= include('../../_init-auth0js_v8', {redirectUri:false} ) %>

You must provide a way for the user to enter a phone number to which the SMS will be sent. Then you can begin the passwordless authentication as follows (assuming the name of your form input as `input.phone-number`):

```js
function sendSMS(){
  var phone = $('input.phone-number').val();

  webAuth.passwordlessStart({
    connection: 'sms',
    send: 'code',
    phoneNumber: phone
  }, function (err,res) {
    if (err) {
      // Handle error
    }
    // Hide the input and show the code entry screen
    $('.enter-phone').hide();
    $('.enter-code').show();
  });
}
```

This will send an SMS to the provided phone number. The user must now enter the code they received into your custom UI. Then you can continue with the login as follows (assuming the name of your form inputs as `input.phone-number` and `input.code`):

```js
function login(){
  var phone = $('input.phone-number').val();
  var code = $('input.code').val();
  
  webAuth.passwordlessVerify({
    connection: 'sms',
    phoneNumber: phone,
    verificationCode: code
  }, function (err,res) {
    if (err) {
      // Handle error
    }
    // If successful, save the user's token and proceed
  });
};
```

Check out the [Auth0.js SDK reference documentation](/libraries/auth0js) for more information.
