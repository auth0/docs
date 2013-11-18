# Using Auth0 in Single Page Apps / HTML5

### 1. Setting up the callback URL in Auth0

  <div class="setup-callback">
  <p>After authenticating the user on Auth0, we will do a POST to a URL on your web site. For security purposes, you have to register this URL  on the <strong>Application Settings</strong> section on Auth0 Admin app.</p>

  <pre><code>http://localhost:PORT/callback</pre></code>
  </div>

### 2. Triggering login manually or integrating the Auth0 widget

@@sdk2WithCallbackOnHash@@

### 3. Validate the JsonWebToken on the server

Auth0 returns a standard [JSON Web Token](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-12) in the browser location hash (http://yourapp#id_token=...). This token should be sent to the backend APIs to be validated.

We have tutorials for several platforms and languages to get you up and running as quickly as possible:

* [ASP.NET Web API](aspnetwebapi-tutorial)
* [Node.js API](nodeapi-tutorial)
* [Ruby API](rubyapi-tutorial)
* [PHP API](phpapi-tutorial)
 
