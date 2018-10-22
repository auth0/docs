---
toc: true
description: How to Use the Auth0.js with the Hosted Login Page 
topics:
  - login
  - auth0js
  - hosted-pages
contentType: how-to
useCase: customize-hosted-pages
---
# Using Auth0.js in the Hosted Login Page

Within the login page, you can use the [Auth0.js SDK](/libraries/auth0js), instead of [Lock](/libraries/lock), to perform authentication using a custom UI.

## Auth0.js Template for the Login Page

You can start out with a basic template that will provide you with a working, ready-to-use example of a custom UI using Auth0.js v9 in your Universal Login page. 

In the [dashboard](${manage_url}), go to **Hosted Pages**, and then to the **Login** page section. 

At the top of the code editor for the page contents, you'll see a dropdown, titled **Default Templates**. Here you can choose from `Lock`, `Lock Passwordless`, or `Custom UI`. 

Choose `Custom UI` to get started.

![Login Page](/media/articles/hosted-pages/hlp-customui.png)

The template showcases using Auth0.js to allow users to sign up, log in with a database connection, or login with a social provider (Google, in this example).

Additionally, you can take a look at the following example scenario using Auth0.js as well.

### Passwordless example

With [passwordless authentication](/connections/passwordless), the user is prompted to enter an email or an SMS number, at which they will receive a one-time code to enter, or a "magic link" to click, which will authenticate them. In this example, the user will enter an email, and receive a one-time code.

For this example, replace the code in the login page editor with the following template:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Sign In with Auth0</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
  <style>
    body, html {
      height: 100%;
      background-color: #f9f9f9;
    }

    .login-container {
      position: relative;
      height: 100%;
    }

    .login-box {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      padding: 15px;
      background-color: #fff;
      box-shadow: 0px 5px 5px #ccc;
      border-radius: 5px;
      border-top: 1px solid #e9e9e9;
    }

    .login-header {
      text-align: center;
    }

    .login-header img {
      width: 75px;
    }

    #error-message {
      display: none;
    }
  </style>
<body>
  <div class="login-container">
    <div class="col-xs-12 col-sm-4 col-sm-offset-4 login-box">
      <div class="login-header">
        <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg"/>
        <h3>Welcome</h3>
        <h5>PLEASE LOG IN</h5>
      </div>
      <div id="error-message" class="alert alert-danger"></div>
      <div class="enter-email">
        <label>Enter your email: </label>
        <input class="email"/>
        <br><br>
        <button id="btn-email" class="btn btn-primary">Send Email</button>
      </div>
      <div class="enter-code" style="display: none;">
        <label>Enter the code you received: </label>
        <input class="code"/>
        <br><br>
        <button id="btn-login" class="btn btn-primary">Submit Code</button>
      </div>
    </div>
  </div>

  <!--[if IE 8]>
  <script src="//cdnjs.cloudflare.com/ajax/libs/ie8/0.2.5/ie8.js"></script>
  <![endif]-->

  <!--[if lte IE 9]>
  <script src="https://cdn.auth0.com/js/polyfills/1.0/base64.min.js"></script>
  <script src="https://cdn.auth0.com/js/polyfills/1.0/es5-shim.min.js"></script>
  <![endif]-->

  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script src="https://cdn.auth0.com/js/auth0/8.7/auth0.min.js"></script>
  <script src="https://cdn.auth0.com/js/polyfills/1.0/object-assign.min.js"></script>
  <script>
    window.addEventListener('load', function() {

      var config = JSON.parse(
        decodeURIComponent(escape(window.atob('@@config@@')))
      );

      var params = Object.assign({
        domain: config.auth0Domain,
        clientID: config.clientID,
        redirectUri: config.callbackURL,
        responseType: 'token'
      }, config.internalOptions);

      var webAuth = new auth0.WebAuth(params);

      // Submit email to begin Passwordless transaction
      function sendEmail(){
        var email = $('input.email').val();
        webAuth.passwordlessStart({
          connection: 'email',
          send: 'code',
          email: email
        }, function(err,res) {
          if (err) {
            displayError(err);
            return;
          }
          $('.enter-email').hide();
          $('.enter-code').show();
        });
      };
      // Submit the passcode to complete authentication
      function login(){
        var email = $('input.email').val();
        var code = $('input.code').val();
        webAuth.passwordlessLogin({
          connection: 'email',
          email: email,
          verificationCode: code
        }, function (err,res) {
          if (err){
            if (err) displayError(err);
          }
        });
      };

      function displayError(err) {
        var errorMessage = document.getElementById('error-message');
        errorMessage.innerHTML = err.description;
        errorMessage.style.display = 'block';
      }

      document.getElementById('btn-email').addEventListener('click', sendEmail);
      document.getElementById('btn-login').addEventListener('click', login);

    });
  </script>
</body>
</html>
```

This should allow you to prompt your users to enter their email address, receive a code, and enter it to verify.

<%= include('_single-browser-magic-link') %>


Once the transaction is complete and they're redirected to your application, you'll want to [parse the URL hash](/libraries/auth0js#extract-the-authresult-and-get-user-info) to acquire their token and finish your authentication process.

<%= include('./_custom-domains') %>

## Next Steps

Are you looking for more information about the SDK used here, or about Passwordless authentication? Or are you ready to get started implementing Universal Login?

::: next-steps
* [Read more About the Auth0.js SDK](/libraries/auth0js)
* [Get Started with Universal Login](${manage_url}/#/login_page)
:::
