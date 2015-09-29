---
title: Using Passwordless Authentication in a Regular Web App with SMS
connection: SMS
image:
alias:
  - sms
  - spa
  - single-page-app
---

# Authenticate users with a one time code via SMS in a Regular Web App

<%= include('./_introduction-sms', { isMobile: false }) %>

## Setup

<%= include('./_setup-sms-twilio') %>

<%= include('./_setup-callback', {spa:false} ) %>

## Implementation 

### Use Auth0 UI widget (Lock)

<%= include('./_init-passwordless-lock') %>

You can then trigger the login widget with the following code:

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

This will open a dialog that asks the user for a phone number.

![](/media/articles/connections/passwordless/passwordless-sms-enter-phone-web.png)

Then Auth0 will use Twilio to send an SMS to the user containing the one time code:

![](/media/articles/connections/passwordless/passwordless-sms-receive-code-web.png)

Lock will ask for the code that has been sent over the text message to the given number. The code will be used as a one-time password to log in:

![](/media/articles/connections/passwordless/passwordless-sms-enter-code-web.png)

After the user enters the code he received by sms, lock will authenticate him and redirect him to the `callbackURL` you specified before. You can follow any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the authentication callback server side.

> A sample application is available in [the Node.js Passwordless Authentication repository on GitHub](https://github.com/auth0/auth0-node-passwordless-sample).

### Use your own UI

You can perform passwordless authentication in your regular web app with your own custom UI using the Auth0 javascript client library [auth0-js](/libraries/auth0js).

<%= include('./_init-auth0js', {withCallbackURL:true} ) %>

You will have to provide a way for the user to enter the phone number to which the one time code will be sent over SMS. Then you can start the passwordless authentication like this:

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

This will send an email containing the one time code. The user must now fill the code in your custom UI. After that you can continue with the login as follows:

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

If authentication is successful, the user will be redirected to the `callbackURL` specified in the Auth0 constructor. You can follow any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the authentication callback server side.

> A sample application is available in [the Node.js Passwordless Authentication repository on GitHub](https://github.com/auth0/auth0-node-passwordless-sample).
