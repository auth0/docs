---
title: Add Authorization to Your Express.js API Application
description: This guide demonstrates how to integrate Auth0 with any new or existing Express.js API application using the express-oauth2-jwt-bearer package.
interactive:  true
files:
 - files/server
github:
  path: https://github.com/auth0-samples/auth0-express-api-samples/tree/master/01-Authorization-RS256
locale: en-US
---

# Add Authorization to Your Express.js API Application


<p>This guide demonstrates how to integrate Auth0 with any new or existing Express.js API application using the <code>express-oauth2-jwt-bearer</code> package.</p><p>If you have not created an API in your Auth0 dashboard yet, use the interactive selector to create a new Auth0 API or select an existing project API.</p><p>To set up your first API through the Auth0 dashboard, review <a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis">our getting started guide</a>. Each Auth0 API uses the API Identifier, which your application needs to validate the access token.</p><p><div class="alert-container" severity="default"><p><b>New to Auth0?</b> Learn <a href="https://auth0.com/docs/overview">how Auth0 works</a> and read about <a href="https://auth0.com/docs/api-auth">implementing API authentication and authorization</a> using the OAuth 2.0 framework.</p></div></p><p></p>

## Define permissions


<p>Permissions let you define how resources can be accessed on behalf of the user with a given access token. For example, you might choose to grant read access to the <code>messages</code> resource if users have the manager access level, and a write access to that resource if they have the administrator access level.</p><p>You can define allowed permissions in the <b>Permissions</b> view of the Auth0 Dashboard&#39;s <a href="https://manage.auth0.com/#/apis">APIs</a> section.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5EnGfdqLVZ8fuIxbUn7gm1/7e6b2fb38a7452b2b540099a4a888822/configure-permissions.png" alt="" /><p><div class="alert-container" severity="default"><p>This example uses the <code>read:messages</code> scope.</p></div></p>

## Install dependencies


<p>First, install the SDK with <code>npm</code>.</p><p><pre><code class="language-powershell">npm install --save express-oauth2-jwt-bearer

</code></pre>

</p>

## Configure the middleware {{{ data-action="code" data-code="server.js#1:10" }}}


<p>Configure <code>express-oauth2-jwt-bearer</code> with your Domain and API Identifier.</p><p>The <code>checkJwt</code> middleware shown to the right checks if the user&#39;s access token included in the request is valid. If the token is not valid, the user gets a 401 Authorization error when they try to access the endpoints.</p><p>The middleware does not check if the token has sufficient scope to access the requested resources.</p>

## Protect API endpoints {{{ data-action="code" data-code="server.js#12:32" }}}


<p>To protect an individual route by requiring a valid JWT, configure the route with the <code>checkJwt</code> middleware constructed from <code>express-oauth2-jwt-bearer</code>.</p><p>You can configure individual routes to look for a particular scope. To achieve that, set up another middleware with the <code>requiresScope</code> method. Provide the required scopes and apply the middleware to any routes you want to add authorization to.</p><p>Pass the <code>checkJwt</code> and <code>requiredScopes</code> middlewares to the route you want to protect.</p><p>In this configuration, only access tokens with the <code>read:messages</code> scope can access the endpoint.</p><h3>Make a Call to Your API</h3><p>To make calls to your API, you need an Access Token. You can get an Access Token for testing purposes from the <b>Test</b> view in your <a href="https://manage.auth0.com/#/apis">API settings</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/5HUMcKGXoNOvdJNXFI73oi/46a590997c56f9ca9aaf4d7da916575a/Tokens_-_English.png" alt="" /><p>Provide the Access Token as an <code>Authorization</code> header in your requests.</p><p><pre><code>curl --request GET \

  --url http://${account.namespace}/api_path \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'

</code></pre>

</p><p><div class="checkpoint">Node JS API Step 4 Checkpoint <div class="checkpoint-default"><p>Now that you have configured your application, run your application to verify that:</p><ul><li><p><code>GET /api/public </code>is available for non-authenticated requests.</p></li><li><p><code>GET /api/private </code>is available for authenticated requests.</p></li><li><p><code>GET /api/private-scoped </code>is available for authenticated requests containing an access token with the <code>read:messages </code>scope.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Verify you added the token as the <code>Authorization</code> header</p></li><li><p>Ensure the token has the correct scopes. Verify with <a href="https://jwt.io/">jwt.io</a>.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
