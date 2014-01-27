# Using Auth0 in Single Page Apps / HTML5

### 1. Setting up the callback URL in Auth0

  <div class="setup-callback">
  <p>After authenticating the user on Auth0, we will do a GET to a URL on your web site. For security purposes, you have to register this URL  on the <strong>Application Settings</strong> section on Auth0 Admin app.</p>

  <pre><code>http://localhost:PORT/callback</pre></code>
  </div>

### 2. Triggering login manually or integrating the Auth0 widget

@@sdk2WithCallbackOnHash@@

> Ignore the `callbackOnLocationHash` option and the `widget.parseHash` method if you are using the <a target="_new" href="https://github.com/auth0/auth0-aspnet-owin">Auth0-ASPNET-Owin</a> nuget package (use `@ClaimsPrincipal.Current.FindFirst("id_token").Value` instead).

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

To validate the token on the server side, we have tutorials for several platforms and languages to get you up and running as quickly as possible:

* [ASP.NET Web API](aspnetwebapi-tutorial)
* [Node.js API](nodeapi-tutorial)
* [Ruby API](rubyapi-tutorial)
* [PHP API](phpapi-tutorial)

> If your language/platform is missing you could Google for "JWT or JSON Web Token yourplatform". Or let us know: [support@auth0.com](mailto:support@auth0.com)
 
