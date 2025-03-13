---
title: Add Authorization to Your Ruby on Rails API
description: This tutorial performs access token validation using the jwt Gem within a custom Auth0Client class.
interactive:  true
files:
 - files/app/controllers/application_controller
 - files/app/lib/auth0_client
 - files/app/controllers/concerns/secured
 - files/app/controllers/public_controller
 - files/app/controllers/private_controller
github:
  path: https://github.com/auth0-samples/auth0-rubyonrails-api-samples/tree/master/01-Authentication-RS256
locale: en-US
---

# Add Authorization to Your Ruby on Rails API


<p>This tutorial performs access token validation using the <a href="https://github.com/jwt/ruby-jwt"><b>jwt</b></a> Gem within a custom <code>Auth0Client</code> class. A Concern called <code>Secured</code> is used to authorize endpoints which require authentication through an incoming access token.</p><p>If you have not created an API in your Auth0 dashboard yet, use the interactive selector to create a new Auth0 API or select an existing API for your project.</p><p>To set up your first API through the Auth0 dashboard, review <a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis">our getting started guide</a>.</p><p>Each Auth0 API uses the API Identifier, which your application needs to validate the access token.</p><p><div class="alert-container" severity="default"><p><b>New to Auth0?</b> Learn <a href="https://auth0.com/docs/overview">how Auth0 works</a> and read about <a href="https://auth0.com/docs/api-auth">implementing API authentication and authorization</a> using the OAuth 2.0 framework.</p></div></p><p></p>

## Define permissions


<p>Permissions let you define how resources can be accessed on behalf of the user with a given access token. For example, you might choose to grant read access to the <code>messages</code> resource if users have the manager access level, and a write access to that resource if they have the administrator access level.</p><p>You can define allowed permissions in the <b>Permissions</b> view of the Auth0 Dashboard&#39;s <a href="https://manage.auth0.com/#/apis">APIs</a> section.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/e61793a2822d095666002c3f65c71ac2/configure-permissions.png" alt="Auth0 Dashboard> Applications > APIs > [Specific API] > Permissions tab" /><p><div class="alert-container" severity="default"><p>This example uses the <code>read:messages</code> scope.</p></div></p>

## Install dependencies


<p>Install the <b>jwt </b>Gem.</p><p><pre><code class="language-powershell">gem 'jwt'

    bundle install

</code></pre>

 </p><p></p>

## Create an Auth0Client class {{{ data-action="code" data-code="app/controllers/concerns/secured.rb" }}}


<p>Create a class called <code>Auth0Client</code>. This class decodes and verifies the incoming access token taken from the <code>Authorization</code> header of the request.</p><p>The <code>Auth0Client</code> class retrieves the public key for your Auth0 tenant and then uses it to verify the signature of the access token. The <code>Token</code> struct defines a <code>validate_permissions</code> method to look for a particular <code>scope</code> in an access token by providing an array of required scopes and check if they are present in the payload of the token.</p>

## Define a Secured concern {{{ data-action="code" data-code="app/controllers/concerns/secured.rb" }}}


<p>Create a Concern called <code>Secured</code> which looks for the access token in the <code>Authorization</code> header of an incoming request.</p><p>If the token is present, the <code>Auth0Client.validate_token</code> will use the <code>jwt</code> Gem to verify the token&#39;s signature and validate the token&#39;s claims.</p><p>In addition to verifying that the access token is valid, the Concern also includes a mechanism for confirming the token has the sufficient <b>scope</b> to access the requested resources. In this example we define a <code>validate_permissions</code> method that receives a block and checks the permissions by calling the <code>Token.validate_permissions</code> method from the <code>Auth0Client</code> class.</p><p>For the <code>/private-scoped</code> route, the scopes defined will be intersected with the scopes coming in the payload, to determine if it contains one or more items from the other array.</p>

## Include the Secure concern in your ApplicationController {{{ data-action="code" data-code="app/controllers/application_controller.rb" }}}


<p>By adding the <code>Secure</code> concern to your application controller, you&#39;ll only need to use a <code>before_action</code> filter in the controller that requires authorization.</p>

## Create the public endpoint {{{ data-action="code" data-code="app/controllers/public_controller.rb" }}}


<p>Create a controller to handle the public endpoint <code>/api/public</code>.</p><p>The <code>/public</code> endpoint does not require any authorization so no <code>before_action</code> is needed.</p>

## Create the private endpoints {{{ data-action="code" data-code="app/controllers/private_controller.rb" }}}


<p>Create a controller to handle the private endpoints: <code>/api/private</code> and <code>/api/private-scoped</code>.</p><p><code>/api/private</code> is available for authenticated requests containing an access token with no additional scopes.</p><p><code>/api/private-scoped</code> is available for authenticated requests containing an access token with the <code>read:messages</code> scope granted</p><p>The protected endpoints need to call the <code>authorize</code> method from the <code>Secured</code> concern, for that you use <code>before_action :authorize</code>, this ensure the <code>Secured.authorize</code> method is called before every action in the <code>PrivateController</code>.</p><h3>Make a Call to Your API</h3><p>To make calls to your API, you need an Access Token. You can get an Access Token for testing purposes from the <b>Test</b> view in your <a href="https://manage.auth0.com/#/apis">API settings</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6jeVBuypOGX5qMRXeJn5ow/5e79037f6c852d2043789d622bdb9562/Quickstart_Example_App_-_English.png" alt="Auth0 Dashboard> Applications > API > [Specific API] > Test tab" /><p>Provide the Access Token as an <code>Authorization</code> header in your requests.</p><p><pre><code class="language-bash">curl --request GET \

  --url http://${account.namespace}/api_path \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'

</code></pre>

</p><p><div class="checkpoint">Ruby on rails Step 7 Checkpoint <div class="checkpoint-default"><p>Now that you have configured your application, run your application to verify that:</p><ul><li><p><code>GET /api/public </code>is available for non-authenticated requests.</p></li><li><p><code>GET /api/private </code>is available for authenticated requests.</p></li><li><p><code>GET /api/private-scoped </code>is available for authenticated requests containing an Access Token with the <code>read:messages </code>scope.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Verify you added the token as the <code>Authorization</code> header</p></li><li><p>Ensure the token has the correct scopes. Verify with <a href="https://jwt.io/">jwt.io</a>.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
