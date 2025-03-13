---
title: Add Authorization to Your Flask API Application
description: This guide demonstrates how to integrate Auth0 with any new or existing Python API built with Flask.
interactive:  true
files:
 - files/validator
 - files/server
github:
  path: https://github.com/auth0-samples/auth0-python-api-samples/tree/master/00-Starter-Seed
locale: en-US
---

# Add Authorization to Your Flask API Application


<p>This guide demonstrates how to integrate Auth0 with any new or existing Python API built with <a href="https://flask.palletsprojects.com/">Flask</a>.</p><p>If you haven&#39;t created an API in your Auth0 dashboard yet, you can use the interactive selector to create a new Auth0 API or select an existing API that represents the project you want to integrate with.</p><p>Alternatively, you can read <a href="https://auth0.com/docs/get-started/auth0-overview/set-up-apis">our getting started guide</a> that helps you set up your first API through the Auth0 dashboard.</p><p>Every API in Auth0 is configured using an API Identifier that your application code will use as the Audience to validate the Access Token.</p><p><div class="alert-container" severity="default"><p><b>New to Auth0?</b> Learn <a href="https://auth0.com/docs/overview">how Auth0 works</a> and read about <a href="https://auth0.com/docs/api-auth">implementing API authentication and authorization</a> using the OAuth 2.0 framework.</p></div></p><p></p>

## Define permissions


<p>Permissions let you define how resources can be accessed on behalf of the user with a given access token. For example, you might choose to grant read access to the <code>messages</code> resource if users have the manager access level, and a write access to that resource if they have the administrator access level.</p><p>You can define allowed permissions in the <b>Permissions</b> view of the Auth0 Dashboard&#39;s <a href="https://manage.auth0.com/#/apis">APIs</a> section.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/e61793a2822d095666002c3f65c71ac2/configure-permissions.png" alt="Auth0 Dashboard> Applications > APIs > [Specific API] > Permissions tab" /><p><div class="alert-container" severity="default"><p>This example uses the <code>read:messages</code> scope.</p></div></p>

## Install dependencies


<p>Add the following dependencies to your <code>requirements.txt</code>:</p><p><pre><code class="language-powershell"># /requirements.txt



    flask

    Authlib

</code></pre>

</p>

## Create the JWT validator {{{ data-action="code" data-code="validator.py" }}}


<p>We&#39;re going to use a library called <a href="https://github.com/lepture/authlib">Authlib</a> to create a <a href="https://docs.authlib.org/en/latest/flask/1/resource-server.html">ResourceProtector</a>, which is a type of <a href="https://flask.palletsprojects.com/patterns/viewdecorators/">Flask decorator</a> that protects our resources (API routes) with a given validator.</p><p>The validator will validate the Access Token that we pass to the resource by checking that it has a valid signature and claims.</p><p>We can use AuthLib&#39;s <code>JWTBearerTokenValidator</code> validator with a few tweaks to make sure it conforms to our requirements on <a href="https://auth0.com/docs/secure/tokens/access-tokens/validate-access-tokens">validating Access Tokens</a>.</p><p>To create our <code>Auth0JWTBearerTokenValidator</code> we need to pass it our <code>domain</code> and <code>audience</code> (API Identifier). It will then get the public key required to verify the token&#39;s signature and pass it to the <code>JWTBearerTokenValidator</code> class.</p><p>We&#39;ll then override the class&#39;s <code>claims_options</code> to make sure the token&#39;s expiry, audience and issue claims are validated according to our requirements.</p>

## Create a Flask application {{{ data-action="code" data-code="server.py" }}}


<p>Next we&#39;ll create a Flask application with 3 API routes:</p><ul><li><p><code>/api/public </code>A public endpoint that requires no authentication.</p></li><li><p><code>/api/private </code>A private endpoint that requires a valid Access Token JWT.</p></li><li><p><code>/api/private-scoped </code>A private endpoint that requires a valid Access Token JWT that contains the given <code>scope</code>.</p></li></ul><p>The protected routes will have a <code>require_auth</code> decorator which is a <code>ResourceProtector</code> that uses the <code>Auth0JWTBearerTokenValidator</code> we created earlier.</p><p>To create the <code>Auth0JWTBearerTokenValidator</code> we&#39;ll pass it our tenant&#39;s domain and the API Identifier of the API we created earlier.</p><p>The <code>require_auth</code> decorator on the <code>private_scoped</code> route accepts an additional argument <code>&quot;read:messages&quot;</code>, which checks the Access Token for the Permission (Scope) we created earlier.</p><h3>Make a Call to Your API</h3><p>To make calls to your API, you need an Access Token. You can get an Access Token for testing purposes from the <b>Test</b> view in your <a href="https://manage.auth0.com/#/apis">API settings</a>.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6jeVBuypOGX5qMRXeJn5ow/5e79037f6c852d2043789d622bdb9562/Quickstart_Example_App_-_English.png" alt="Auth0 Dashboard> Applications > API > [Specific API] > Test tab" /><p>Provide the Access Token as an <code>Authorization</code> header in your requests.</p><p><pre><code>curl --request GET \

  --url http://${account.namespace}/api_path \

  --header 'authorization: Bearer YOUR_ACCESS_TOKEN_HERE'

</code></pre>

</p>
