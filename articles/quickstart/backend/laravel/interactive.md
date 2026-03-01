---
title: Add Authorization to Your Laravel Application
description: This guide demonstrates how to integrate Auth0 with a new (or existing) Laravel 9 or 10 application.
interactive:  true
files:
 - files/routes/api
github:
  path: sample
locale: en-US
---

# Add Authorization to Your Laravel Application


<p><a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer noopener">Auth0&#39;s Laravel SDK</a> allows you to quickly add token-based authorization and route access control to your Laravel application. This guide demonstrates how to integrate Auth0 with a new (or existing) <a href="https://github.com/auth0/laravel-auth0#support-policy" target="_blank" rel="noreferrer noopener">Laravel 9 or 10</a> application.</p><hr/><p><b>Backend applications differ from traditional web applications in that they do not handle user authentication or have a user interface. They provide an API that other applications can interact with. They accept </b><a href="https://auth0.com/docs/secure/tokens/access-tokens" target="_blank" ><b>access tokens</b></a><b> from </b><b><code>Authorization</code></b><b> headers in requests to control access to routes.</b></p><p>Separate front-end applications are usually built to interact with these types of backends. These can be anything from <a href="https://auth0.com/docs/quickstart/spa" target="_blank" >single-page applications</a> or <a href="https://auth0.com/docs/quickstart/native" target="_blank" >native or mobile apps</a> (all of which Auth0 also provides SDKs for!)</p><p>When users need to interact with your backend application, they first authenticate with Auth0 using the frontend application. The frontend application then retrieves an access token from Auth0, which it can use to make requests to your backend application on behalf of the user.</p><p>As their name implies, <a href="https://auth0.com/docs/secure/tokens/access-tokens" target="_blank" >access tokens</a> are designed to address matters of access control (authorization), and do not contain information about the user. <b>Backend applications work exclusively with access tokens.</b> You can retrieve information about the user who created the token using the <a href="https://auth0.com/docs/api/management/v2" target="_blank" >Management API</a>, which we will demonstrate later.</p><p></p>

## Laravel Installation


<p><b>If you do not already have a Laravel application set up</b>, open a shell to a suitable directory for a new project and run the following command:</p><p><pre><code class="language-bash">composer create-project --prefer-dist laravel/laravel auth0-laravel-api ^9.0

</code></pre>

</p><p>All the commands in this guide assume you are running them from the root of your Laravel project, directory so you should <code>cd</code> into the new project directory:</p><p><pre><code class="language-bash">cd auth0-laravel-api

</code></pre>

</p>

## SDK Installation


<p>Run the following command within your project directory to install the <a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer noopener">Auth0 Laravel SDK</a>:</p><p><pre><code class="language-bash">composer require auth0/login:^7.8 --update-with-all-dependencies

</code></pre>

</p><p>Then generate an SDK configuration file for your application:</p><p><pre><code class="language-bash">php artisan vendor:publish --tag auth0

</code></pre>

</p>

## SDK Configuration


<p>Run the following command from your project directory to download the <a href="https://github.com/auth0/auth0-cli" target="_blank" rel="noreferrer noopener">Auth0 CLI</a>:</p><p><pre><code class="language-bash">curl -sSfL https://raw.githubusercontent.com/auth0/auth0-cli/main/install.sh | sh -s -- -b .

</code></pre>

</p><p>Then authenticate the CLI with your Auth0 account, choosing &quot;as a user&quot; when prompted:</p><p><pre><code class="language-bash">./auth0 login

</code></pre>

</p><p>Next, create a new application with Auth0:</p><p><pre><code class="language-bash">./auth0 apps create \

--name &quot;My Laravel Backend&quot; \

--type &quot;regular&quot; \

--auth-method &quot;post&quot; \

--callbacks &quot;http://localhost:8000/callback&quot; \

--logout-urls &quot;http://localhost:8000&quot; \

--reveal-secrets \

--no-input \

--json &gt; .auth0.app.json

</code></pre>

</p><p>You should also create a new API:</p><p><pre><code class="language-bash">./auth0 apis create \

--name &quot;My Laravel Backend API&quot; \

--identifier &quot;https://github.com/auth0/laravel-auth0&quot; \

--offline-access \

--no-input \

--json &gt; .auth0.api.json

</code></pre>

</p><p>This produces two files in your project directory that configure the SDK.</p><p>As these files contain credentials it&#39;s important to treat these as sensitive. You should ensure you do not commit these to version control. If you&#39;re using Git, you should add them to your <code>.gitignore</code> file:</p><p><pre><code class="language-bash">echo &quot;.auth0.*.json&quot; &gt;&gt; .gitignore

</code></pre>

</p>

## Access Control {{{ data-action="code" data-code="routes/api.php#6:16" }}}


<p>The SDK automatically registers its authorization guard with your Laravel application for use with the <code>api</code> middleware, which by default Laravel applies to all routes in your application&#39;s <code>routes/api.php</code> file.</p><p><div class="alert-container" severity="warning"><p>For the SDK to work as expected without additional configuration, <b>you should define your routes in the </b><b><code>routes/api.php</code></b><b> file.</b></p></div></p><p>You can use the Auth0 SDK&#39;s authorization guard to restrict access to your application&#39;s routes.</p><p>To reject requests that do not contain a valid access token in the <code>Authorization</code> header, you can use Laravel&#39;s <code>auth</code> middleware:</p><p><pre><code class="language-php">Route::get('/private', function () {

 return response()-&gt;json([

 'message' \=&gt; 'Your token is valid; you are authorized.',

 ]);

})-&gt;middleware('auth');

</code></pre>

</p><p>You can also require the provided token to have specific <a href="https://auth0.com/docs/manage-users/access-control/rbac" target="_blank" >permissions</a> by combining this with Laravel&#39;s <code>can</code> middleware:</p><p><pre><code class="language-php">Route::get('/scope', function () {

 return response()-&gt;json([

 'message' =&gt; 'Your token is valid and has the `read:messages` permission; you are authorized.',

 ]);

})-&gt;middleware('auth')-&gt;can('read:messages');

</code></pre>

</p>

## Token Information {{{ data-action="code" data-code="routes/api.php#18:30" }}}


<p>Information about the provided access token is available through Laravel&#39;s <code>Auth</code> Facade, or the <code>auth()</code> helper function.</p><p>For example, to retrieve the user&#39;s identifier and email address:</p><p><pre><code class="language-php">Route::get('/', function () {

 if (! auth()-&gt;check()) {

 return response()-&gt;json([

 'message' =&gt; 'You did not provide a valid token.',

 ]);

 }



 return response()-&gt;json([

 'message' =&gt; 'Your token is valid; you are authorized.',

 'id' =&gt; auth()-&gt;id(),

 'token' =&gt; auth()?-&gt;user()?-&gt;getAttributes(),

 ]);

});

</code></pre>

</p>

## Retrieve User Information {{{ data-action="code" data-code="routes/api.php#32:51" }}}


<p>You can retrieve information about the user who created the access token from Auth0 using the <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md" target="_blank" rel="noreferrer noopener">Auth0 Management API</a>. The SDK provides a convenient wrapper for this API, accessible through the SDK&#39;s <code>management()</code> method.</p><p><b>Before making Management API calls you must enable your application to communicate with the Management API.</b> This can be done from the <a href="https://manage.auth0.com/#/apis/" target="_blank" rel="noreferrer noopener">Auth0 Dashboard&#39;s API page</a>, choosing <code>Auth0 Management API</code>, and selecting the &#39;Machine to Machine Applications&#39; tab. Authorize your Laravel application, and then click the down arrow to choose the scopes you wish to grant.</p><p>For the following example, you should grant the <code>read:users</code> scope. A list of API endpoints and the required scopes can be found in <a href="https://auth0.com/docs/api/management/v2" target="_blank" >the Management API documentation</a>.</p><p><pre><code class="language-php">use Auth0\Laravel\Facade\Auth0;



Route::get('/me', function () {

 $user = auth()-&gt;id();

 $profile = cache()-&gt;get($user);



 if (null === $profile) {

 $endpoint = Auth0::management()-&gt;users();

 $profile = $endpoint-&gt;get($user);

 $profile = Auth0::json($profile);



 cache()-&gt;put($user, $profile, 120);

 }



 $name = $profile['name'] ?? 'Unknown';

 $email = $profile['email'] ?? 'Unknown';



 return response()-&gt;json([

 'name' =&gt; $name,

 'email' =&gt; $email,

 ]);

})-&gt;middleware('auth');

</code></pre>

</p><p><div class="alert-container" severity="default"><p><b>You should cache user information in your application for brief periods.</b> This reduces the number of requests your application makes to Auth0, and improves performance. You should avoid storing user information in your application for long periods as this can lead to stale data. You should also avoid storing user information beyond the user&#39;s identifier in persistent databases.</p></div></p>

## Run the Application


<p>You are now ready to start your Laravel application, so it can accept requests:</p><p><pre><code class="language-php">php artisan serve

</code></pre>

</p>

## Retrieve a Test Token


<p>You can learn more about <a href="https://auth0.com/docs/secure/tokens/access-tokens/get-access-tokens" target="_blank" >retrieving access tokens here</a>. For this quickstart, however, you can simply use an access token from <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">your API settings&#39; &quot;test&quot; view</a>.</p><p><div class="alert-container" severity="default"><p>The <code>/me</code> route we created above will not work with a test token as there is no actual user associated with it.</p></div></p><p><div class="checkpoint">Laravel Quickstart Step 8 Checkpoint <div class="checkpoint-default"><p>Open a shell and try issuing requests to your application.</p><p>Begin by requesting the public route:</p><p><code>curl --request GET \ --url http://localhost:8000/api \ --header &#39;Accept: application/json&#39;</code></p><p>Next, use your access token in an <code>Authorization</code> header to request a protected route:</p><p><code>curl --request GET \ --url http://localhost:8000/api/private \ --header &#39;Accept: application/json&#39; \ --header &#39;Authorization: Bearer YOUR_ACCESS_TOKEN&#39;</code></p><p>Finally, try requesting the scope-protected route, which will only succeed if the access token has the <code>read:messages</code> scope granted:</p><p><code>curl --request GET \ --url http://localhost:8000/api/scope \ --header &#39;Accept: application/json&#39; \ --header &#39;Authorization: Bearer YOUR_ACCESS_TOKEN&#39;</code></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Here are a couple of things to try:</p><ul><li><p>Try running <code>php artisan optimize:clear</code> to clear Laravel&#39;s cache.</p></li><li><p>Ensure your <code>.auth0.app.json</code> and <code>.auth0.api.json</code> files are at the root of your project.</p></li><li><p>Ensure you have enabled your Laravel application as a Machine-to-Machine application and granted it all the necessary scopes for the <code>Auth0 Management API</code> from the <a href="https://manage.auth0.com/#/apis/" target="_blank" rel="noreferrer noopener">Auth0 Dashboard</a>.</p></li></ul><p>Encountering problems? Check the SDK&#39;s <a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer noopener">documentation</a> or our <a href="https://auth0.com/docs" target="_blank" >documentation hub</a>. You should also consider visiting <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">the community</a> where our team and other community members can help answer your questions.</p></div>

  </div></p><h3>Additional Reading</h3><ul><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Users.md" target="_blank" rel="noreferrer noopener">User Repositories and Models</a> extends the Auth0 Laravel SDK to use custom user models, and how to store and retrieve users from a database.</p></li><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Events.md" target="_blank" rel="noreferrer noopener">Hooking Events</a> covers how to listen for events raised by the Auth0 Laravel SDK, to fully customize the behavior of your integration.</p></li><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md" target="_blank" rel="noreferrer noopener">Management API</a> support is built into the Auth0 Laravel SDK, allowing you to interact with the Management API from your Laravel application.</p></li></ul><p></p>
