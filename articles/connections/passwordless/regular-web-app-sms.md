---
title: Using Passwordless Authentication in a Regular Web App with SMS
description: How to authenticate users with a one-time code via SMS in a traditional web app that runs on the server
toc: true
tags:
    - connections
    - web-apps
    - passwordless
    - sms
---
# Authenticate users with a one-time code via SMS in a Regular Web App

:::warning
Passwordless is designed to be called from the client-side, and has a [rate limit](/policies/rate-limits#authentication-api) of 50 requests per hour per IP. If you call it from the server-side, your backend's IP may easily hit these rate limits.
:::

<%= include('_introduction-sms', { isMobile: false }) %>

## Setup

<%= include('_setup-sms-twilio') %>

<%= include('_setup-callback', {spa:false} ) %>

## Implementation

### Use Lock

<%= include('_init-passwordless-lock') %>

Then you can trigger the login widget with the following code:

```html
<script src="${lock_url}"></script>
<script type="text/javascript">
  function login() {
    var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}', {
        allowedConnections: ['sms'],             // Should match the SMS connection name  
        auth: {
          redirectUrl: '${account.callback}',
          responseType: 'code'
        }
      });
    lock.show();
  };
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

::: note
You can follow any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the server-side authentication callback.
:::

### Use your own UI

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-node-passwordless-sample',
  path: ''
}) %>

You can perform passwordless authentication in your regular web app with your own custom UI using the [Auth0 JavaScript application library](/libraries/auth0js).

<%= include('_init-auth0js_v9', {redirectUri:true} ) %>

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
  });
};
```

If authentication is successful, the user will be redirected to the `redirectUri` specified in the Auth0 constructor.

::: note
You can follow up with any of the [Regular Web App Quickstarts](/quickstart/webapp) to see how to handle the authentication callback on the server-side.
:::

Check out the [Auth0.js SDK reference documentation](/libraries/auth0js) for more information.
