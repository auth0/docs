---
title: Using Passwordless Authentication in a Regular Web App with SMS
---

# Authenticate users with a one-time code via SMS in a Regular Web App

<%= include('./_introduction-sms', { isMobile: false }) %>

## Setup

<%= include('./_setup-sms-twilio') %>

<%= include('./_setup-callback', {spa:false} ) %>

## Implementation

### Use Auth0 UI widget (Lock)

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-node-passwordless-sample',
  path: ''
}) %>

<%= include('./_init-passwordless-lock') %>

Then you can trigger the login widget with the following code:

```html
<script src="${lock_passwordless_url}"></script>
<script type="text/javascript">
  function login(){
    // Initialize Passwordless Lock instance
    var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}');
    // Open Lock in SMS mode
    lock.sms( {callbackURL: '${account.callback}'} );
  }
</script>
<a href="javascript:login()">Login</a>
```

This will open a dialog that asks the user for their phone number.

![](/media/articles/connections/passwordless/passwordless-sms-enter-phone-web.png)

Then Auth0 will use Twilio to send an SMS to the user containing the one-time code:

<div class="phone-mockup"><img src="/media/articles/connections/passwordless/passwordless-sms-receive-code-web.png" alt="SMS one-time code"/></div>

Lock will ask for the code that has been sent to the provided number via SMS. The code can then be used as a one-time password to log in:

![](/media/articles/connections/passwordless/passwordless-sms-enter-code-web.png)

Once the user enters the code received via SMS, Lock will authenticate the user and redirect to the specified `callbackURL`.

**NOTE:** You can follow any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the server-side authentication callback.

### Use your own UI

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-node-passwordless-sample',
  path: ''
}) %>

You can perform passwordless authentication in your regular web app with your own custom UI using the [Auth0 JavaScript client library](/libraries/auth0js).

<%= include('./_init-auth0js', {withCallbackURL:true} ) %>

You must provide a way for the user to enter a phone number to which the one-time code will be sent via SMS. Then you can begin the passwordless authentication as follows:

```js
function sendSMS(){
  var phoneNumber = $('input.phone-number').val();
  auth0.requestSMSCode({ phoneNumber:phoneNumber}, function(err) {
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

This will send an SMS containing the one-time code. The user must now enter the code into your custom UI. Then you can continue with the login as follows:

```js
function login(){
  var phone = $('input.phone-number').val();
  var code = $('input.code').val();
  //submit the passcode to authenticate the phone
  auth0.verifySMSCode({ phoneNumber: phone, code: code }, function(err){
    alert('code verification failed. ' + err.statusCode + ' '+ err.error);
  });
};
```

If authentication is successful, the user will be redirected to the `callbackURL` specified in the Auth0 constructor.

**NOTE:** You can follow any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the authentication callback on the server-side.
