# Using Auth0 in Single Page Apps / HTML5

### 1. Setting up the callback URL in Auth0

  <div class="setup-callback">
  <p>After authenticating the user on Auth0, we will redirect to a URL on your web site. For security purposes you must register this URL on the <a href="@@uiAppSettingsURL@@" target="_new">Application Settings</a> section on Auth0 Admin app.</p>

  <pre><code>http://localhost:PORT/callback</pre></code>
  </div>

### 2. Triggering login manually or integrating the Auth0 widget

@@sdk2WithCallbackOnHash@@

### 3. Validate the JsonWebToken on the server

Auth0 returns a standard [JSON Web Token](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-12) in the browser location hash (http://yourapp#id_token=...). This token should be sent to the backend APIs to be validated in the `Authorization` header.

This sample code sends the JSON Web Token on each call:

    $.ajaxSetup({
      'beforeSend': function(xhr) {
        if ($.cookie('id_token')) {        
          xhr.setRequestHeader('Authorization', 
                'Bearer ' + $.cookie('id_token'));
        }
      }
    });

> Setting the cookie on the client-side using this method requires [jQuery.Cookie](https://github.com/carhartl/jquery-cookie).

To validate the token on the server side, we have tutorials for several platforms and languages to get you up and running as quickly as possible. Look at the Web APIs section on the sidebar.