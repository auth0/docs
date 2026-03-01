---
title: Add Login to your Express Application
description: This guide demonstrates how to integrate Auth0, add user login, logout, and profile to a Node.js Express application using the Express OpenID Connect SDK.
interactive:  true
files:
 - files/server
github:
  path: 01-Login
locale: en-US
---

# Add Login to your Express Application


<p>Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add user login, logout, and profile to a Node.js Express application using the Express OpenID Connect SDK.</p><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000/callback</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000/</code>.</p></div></p>

## Install the Express OpenID Connect SDK {{{ data-action="code" data-code="server.js#2:16" }}}


<p>Your application will need the <a href="https://github.com/auth0/express-openid-connect" target="_blank" rel="noreferrer noopener"><code>express-openid-connect</code></a> package which is an Auth0-maintained OIDC-compliant SDK for Express.</p><p>Install the Express OpenID Connect SDK by running the following commands in your terminal:</p><p><pre><code class="language-bash">cd &lt;your-project-directory&gt;

npm install express-openid-connect

</code></pre>

</p><h3>Configure Router</h3><p>The Express OpenID Connect library provides the <code>auth</code> router in order to attach authentication routes to your application. You will need to configure the router with the following configuration keys:</p><ul><li><p><code>authRequired</code> - Controls whether authentication is required for all routes.</p></li><li><p><code>auth0Logout</code> - Uses Auth0 logout feature.</p></li><li><p><code>baseURL</code> - The URL where the application is served.</p></li><li><p><code>secret</code> - A long, random string.</p></li><li><p><code>issuerBaseURL</code> - The Domain as a secure URL found in your <a href="https://manage.auth0.com/#/applications/{yourClientId}/settings" target="_blank" rel="noreferrer noopener">Application settings</a>.</p></li><li><p><code>clientID</code> - The Client ID found in your <a href="https://manage.auth0.com/#/applications/{yourClientId}/settings" target="_blank" rel="noreferrer noopener">Application settings</a>.</p></li></ul><p>For additional configuration options visit the <a href="https://auth0.github.io/express-openid-connect" target="_blank" rel="noreferrer noopener">API documentation</a>.</p><p><div class="alert-container" severity="default"><p>You can generate a suitable string for <code>LONG_RANDOM_STRING</code> using <code>openssl rand -hex 32</code> on the command line.</p></div></p><p><div class="checkpoint">Express - Step 2 - Install the Express OpenID Connect SDK - Checkpoint <div class="checkpoint-default"><p>A user can now log into your application by visiting the <code>/login</code> route provided by the library. If you are running your project on <code>localhost:3000</code>, that link would be <a href="http://localhost:3000/login" target="_blank" rel="noreferrer noopener"><code>http://localhost:3000/login</code></a>.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. You should check the error details on the Auth0 login page to make sure you have entered the callback URL correctly.</p><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Display User Profile {{{ data-action="code" data-code="server.js#25:28" }}}


<p>To display the user&#39;s profile, your application should provide a protected route.</p><p>Add the <code>requiresAuth</code> middleware for routes that require authentication. Any route using this middleware will check for a valid user session and, if one does not exist, it will redirect the user to log in.</p><p><div class="checkpoint">Express - Step 3 - Display User Profile - Checkpoint <div class="checkpoint-default"><p>A user can log out of your application by visiting the <code>/logout</code> route provided by the library. If you are running your project on <code>localhost:3000</code>, that link would be <a href="http://localhost:3000/logout" target="_blank" rel="noreferrer noopener"><code>http://localhost:3000/logout</code></a>.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. You should check that you configured the logout URL correctly.</p><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>
