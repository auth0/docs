---
title: Add Login to Your Laravel Application
description: This guide demonstrates how to integrate Auth0 with a new (or existing) Laravel 9 or 10 application.
interactive:  true
files:
 - files/routes/web
github:
  path: https://github.com/auth0-samples/laravel/tree/bf356d877b5dae566286fc8400da94b8b4b0ac76/sample
locale: en-US
---

# Add Login to Your Laravel Application


<p><a href="https://github.com/auth0/laravel-auth0">Auth0&#39;s Laravel SDK</a> allows you to quickly add authentication, user profile management, and routing access control to your Laravel application. This guide demonstrates how to integrate Auth0 with a new (or existing) <a href="https://github.com/auth0/laravel-auth0#support-policy">Laravel 9 or 10</a> application.</p><p></p>

## Laravel Installation


<p><b>If you do not already have a Laravel application set up</b>, open a shell to a suitable directory for a new project and run the following command:</p><p><code>composer create-project --prefer-dist laravel/laravel auth0-laravel-app ^9.0</code></p><p>All the commands in this guide assume you are running them from the root of your Laravel project, directory so you should <code>cd</code> into the new project directory:</p><p><code>cd auth0-laravel-app</code></p>

## SDK Installation


<p>Run the following command within your project directory to install the <a href="https://github.com/auth0/laravel-auth0">Auth0 Laravel SDK</a>:</p><p><code>composer require auth0/login:^7.8 --update-with-all-dependencies</code></p><p>Then generate an SDK configuration file for your application:</p><p><code>php artisan vendor:publish --tag auth0</code></p>

## SDK Configuration


<p>Run the following command from your project directory to download the Auth0 CLI:</p><p><code>curl -sSfL https://raw.githubusercontent.com/auth0/auth0-cli/main/install.sh | sh -s -- -b .</code></p><p>Then authenticate the CLI with your Auth0 account, choosing &quot;as a user&quot; when prompted:</p><p><code>./auth0 login</code></p><p>Next, create a new application with Auth0:</p><p></p><p>You should also create a new API:</p><p></p><p>This produces two files in your project directory that configure the SDK.</p><p>As these files contain credentials it&#39;s important to treat these as sensitive. You should ensure you do not commit these to version control. If you&#39;re using Git, you should add them to your <code>.gitignore</code> file:</p><p><code>echo &quot;.auth0.*.json&quot; &gt;&gt; .gitignore</code></p>

## Login Routes


<p>The SDK automatically registers all the necessary routes for your application&#39;s users to authenticate.</p><p></p><p>If you require more control over these, or if they conflict with existing routes in your application, you can manually register the SDK&#39;s controllers instead. Please see <a href="https://github.com/auth0/laravel-auth0">the SDK&#39;s README</a> for advanced integrations.</p>

## Access Control {{{ data-action="code" data-code="routes/web.php#6:12" }}}


<p>Laravel&#39;s authentication facilities use &quot;guards&quot; to define how users are authenticated for each request. You can use the Auth0 SDK&#39;s authentication guard to restrict access to your application&#39;s routes.</p><p>To require users to authenticate before accessing a route, you can use Laravel&#39;s <code>auth</code> middleware.</p><p></p><p>You can also require authenticated users to have specific <a href="https://auth0.com/docs/manage-users/access-control/rbac">permissions</a> by combining this with Laravel&#39;s <code>can</code> middleware.</p><p></p>

## User Information {{{ data-action="code" data-code="routes/web.php#14:24" }}}


<p>Information about the authenticated user is available through Laravel&#39;s <code>Auth</code> Facade, or the <code>auth()</code> helper function.</p><p>For example, to retrieve the user&#39;s identifier and email address:</p><p></p>

## User Management {{{ data-action="code" data-code="routes/web.php#26:43" }}}


<p>You can update user information using the <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md">Auth0 Management API</a>. All Management endpoints are accessible through the SDK&#39;s <code>management()</code> method.</p><p><b>Before making Management API calls you must enable your application to communicate with the Management API.</b> This can be done from the <a href="${manage_url}/#/apis/">Auth0 Dashboard&#39;s API page</a>, choosing <code>Auth0 Management API</code>, and selecting the &#39;Machine to Machine Applications&#39; tab. Authorize your Laravel application, and then click the down arrow to choose the scopes you wish to grant.</p><p>For the following example, in which we will update a user&#39;s metadata and assign a random favorite color, you should grant the <code>read:users</code> and <code>update:users</code> scopes. A list of API endpoints and the required scopes can be found in <a href="https://auth0.com/docs/api/management/v2">the Management API documentation</a>.</p><p></p><p>A quick reference guide of all the SDK&#39;s Management API methods is <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md">available here</a>.</p>

## Run the Application


<p>You are now ready to start your Laravel application, so it can accept requests:</p><p><code>php artisan serve</code></p><p><code></code><div class="checkpoint">Laravel - Step 8 - Run the Application - Checkpoint <div class="checkpoint-default"><p>Open your web browser and try accessing the following routes:</p><ul><li><p><a href="http://localhost:8000/">http://localhost:8000</a> to see the public route.</p></li><li><p><a href="http://localhost:8000/private">http://localhost:8000/private</a> to be prompted to authenticate.</p></li><li><p><a href="http://localhost:8000/">http://localhost:8000</a> to see the public route, now authenticated.</p></li><li><p><a href="http://localhost:8000/scope">http://localhost:8000/scope</a> to check if you have the <code>read:messages </code><a href="https://auth0.com/docs/manage-users/access-control/rbac">permission</a>.</p></li><li><p><a href="http://localhost:8000/update">http://localhost:8000/update</a> to update the user&#39;s profile.</p></li><li><p><a href="http://localhost:8000/logout">http://localhost:8000/logout</a> to log out.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p><h3>Additional Reading</h3><ul><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Users.md">User Repositories and Models</a> extends the Auth0 Laravel SDK to use custom user models, and how to store and retrieve users from a database.</p></li><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Events.md">Hooking Events</a> covers how to listen for events raised by the Auth0 Laravel SDK, to fully customize the behavior of your integration.</p></li><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md">Management API</a> support is built into the Auth0 Laravel SDK, allowing you to interact with the Management API from your Laravel application.</p></li></ul><p></p>
