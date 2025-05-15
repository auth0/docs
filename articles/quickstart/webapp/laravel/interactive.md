---
title: Add Login to Your Laravel Application
description: This guide demonstrates how to integrate Auth0 with a new (or existing) Laravel 9 or 10 application.
interactive:  true
files:
 - files/routes/web
github:
  path: sample
locale: en-US
---

# Add Login to Your Laravel Application


<p><a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer noopener">Auth0&#39;s Laravel SDK</a> allows you to quickly add authentication, user profile management, and routing access control to your Laravel application. This guide demonstrates how to integrate Auth0 with a new (or existing) <a href="https://github.com/auth0/laravel-auth0#support-policy" target="_blank" rel="noreferrer noopener">Laravel 9 or 10</a> application.</p><p>Test Change</p><p></p>

## Laravel Installation


<p><b>If you do not already have a Laravel application set up</b>, open a shell to a suitable directory for a new project and run the following command:</p><p><pre><code class="language-bash">composer create-project --prefer-dist laravel/laravel auth0-laravel-app ^9.0

</code></pre>

</p><p>All the commands in this guide assume you are running them from the root of your Laravel project, directory so you should <code>cd</code> into the new project directory:</p><p><pre><code class="language-bash">cd auth0-laravel-app

</code></pre>

</p>

## SDK Installation


<p>Run the following command within your project directory to install the <a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer noopener">Auth0 Laravel SDK</a>:</p><p><pre><code class="language-bash">composer require auth0/login:^7.8 --update-with-all-dependencies

</code></pre>

</p><p>Then generate an SDK configuration file for your application:</p><p><pre><code class="language-bash">php artisan vendor:publish --tag auth0

</code></pre>

</p>

## SDK Configuration


<p>Run the following command from your project directory to download the Auth0 CLI:</p><p><pre><code class="language-bash">curl -sSfL https://raw.githubusercontent.com/auth0/auth0-cli/main/install.sh | sh -s -- -b .

</code></pre>

</p><p>Then authenticate the CLI with your Auth0 account, choosing &quot;as a user&quot; when prompted:</p><p><pre><code class="language-bash">./auth0 login

</code></pre>

</p><p>Next, create a new application with Auth0:</p><p><pre><code class="language-bash">./auth0 apps create \

  --name &quot;My Laravel Application&quot; \

  --type &quot;regular&quot; \

  --auth-method &quot;post&quot; \

  --callbacks &quot;http://localhost:8000/callback&quot; \

  --logout-urls &quot;http://localhost:8000&quot; \

  --reveal-secrets \

  --no-input \

  --json &gt; .auth0.app.json

</code></pre>

</p><p>You should also create a new API:</p><p><pre><code class="language-bash">./auth0 apis create \

  --name &quot;My Laravel Application's API&quot; \

  --identifier &quot;https://github.com/auth0/laravel-auth0&quot; \

  --offline-access \

  --no-input \

  --json &gt; .auth0.api.json

</code></pre>

</p><p>This produces two files in your project directory that configure the SDK.</p><p>As these files contain credentials it&#39;s important to treat these as sensitive. You should ensure you do not commit these to version control. If you&#39;re using Git, you should add them to your <code>.gitignore</code> file:</p><p><pre><code class="language-bash">echo &quot;.auth0.*.json&quot; &gt;&gt; .gitignore

</code></pre>

</p>

## Login Routes


<p>The SDK automatically registers all the necessary routes for your application&#39;s users to authenticate.</p><p><div class="tablew"><table class="table"><thead>

<tr>

<th>**Routes**</th>

<th>**Purpose**</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>/login</code></td>

<td>Initiates the authentication flow.</td>

</tr>

<tr>

<td><code>/logout</code></td>

<td>Logs the user out.</td>

</tr>

<tr>

<td><code>/callback</code></td>

<td>Handles the callback from Auth0.</td>

</tr>

</tbody>

</table></div></p><p>If you require more control over these, or if they conflict with existing routes in your application, you can manually register the SDK&#39;s controllers instead. Please see <a href="https://github.com/auth0/laravel-auth0" target="_blank" rel="noreferrer noopener">the SDK&#39;s README</a> for advanced integrations.</p>

## Access Control {{{ data-action="code" data-code="routes/web.php#6:12" }}}


<p>Laravel&#39;s authentication facilities use &quot;guards&quot; to define how users are authenticated for each request. You can use the Auth0 SDK&#39;s authentication guard to restrict access to your application&#39;s routes.</p><p>To require users to authenticate before accessing a route, you can use Laravel&#39;s <code>auth</code> middleware.</p><p><pre><code class="language-php">Route::get('/private', function () {

  return response('Welcome! You are logged in.');

})-&gt;middleware('auth');

</code></pre>

</p><p>You can also require authenticated users to have specific <a href="https://auth0.com/docs/manage-users/access-control/rbac" target="_blank" >permissions</a> by combining this with Laravel&#39;s <code>can</code> middleware.</p><p><pre><code class="language-php">Route::get('/scope', function () {

    return response('You have `read:messages` permission, and can therefore access this resource.');

})-&gt;middleware('auth')-&gt;can('read:messages');

</code></pre>

</p>

## User Information {{{ data-action="code" data-code="routes/web.php#14:24" }}}


<p>Information about the authenticated user is available through Laravel&#39;s <code>Auth</code> Facade, or the <code>auth()</code> helper function.</p><p>For example, to retrieve the user&#39;s identifier and email address:</p><p><pre><code class="language-php">Route::get('/', function () {

  if (! auth()-&gt;check()) {

    return response('You are not logged in.');

  }



  $user = auth()-&gt;user();

  $name = $user-&gt;name ?? 'User';

  $email = $user-&gt;email ?? '';



  return response(&quot;Hello {$name}! Your email address is {$email}.&quot;);

});;

</code></pre>

</p>

## User Management {{{ data-action="code" data-code="routes/web.php#26:43" }}}


<p>You can update user information using the <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md" target="_blank" rel="noreferrer noopener">Auth0 Management API</a>. All Management endpoints are accessible through the SDK&#39;s <code>management()</code> method.</p><p><b>Before making Management API calls you must enable your application to communicate with the Management API.</b> This can be done from the <a href="${manage_url}/#/apis/" target="_blank" rel="noreferrer noopener">Auth0 Dashboard&#39;s API page</a>, choosing <code>Auth0 Management API</code>, and selecting the &#39;Machine to Machine Applications&#39; tab. Authorize your Laravel application, and then click the down arrow to choose the scopes you wish to grant.</p><p>For the following example, in which we will update a user&#39;s metadata and assign a random favorite color, you should grant the <code>read:users</code> and <code>update:users</code> scopes. A list of API endpoints and the required scopes can be found in <a href="https://auth0.com/docs/api/management/v2" target="_blank" >the Management API documentation</a>.</p><p><pre><code class="language-php">use Auth0\Laravel\Facade\Auth0;



Route::get('/colors', function () {

  $endpoint = Auth0::management()-&gt;users();



  $colors = ['red', 'blue', 'green', 'black', 'white', 'yellow', 'purple', 'orange', 'pink', 'brown'];



  $endpoint-&gt;update(

    id: auth()-&gt;id(),

    body: [

        'user_metadata' =&gt; [

            'color' =&gt; $colors[random_int(0, count($colors) - 1)]

        ]

    ]

  );



  $metadata = $endpoint-&gt;get(auth()-&gt;id());

  $metadata = Auth0::json($metadata);



  $color = $metadata['user_metadata']['color'] ?? 'unknown';

  $name = auth()-&gt;user()-&gt;name;



  return response(&quot;Hello {$name}! Your favorite color is {$color}.&quot;);

})-&gt;middleware('auth');

</code></pre>

</p><p>A quick reference guide of all the SDK&#39;s Management API methods is <a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md" target="_blank" rel="noreferrer noopener">available here</a>.</p>

## Run the Application


<p>You are now ready to start your Laravel application, so it can accept requests:</p><p><code>php artisan serve</code></p><p><code></code><div class="checkpoint">Laravel - Step 8 - Run the Application - Checkpoint <div class="checkpoint-default"><p>Open your web browser and try accessing the following routes:</p><ul><li><p><a href="http://localhost:8000/" target="_blank" rel="noreferrer noopener">http://localhost:8000</a> to see the public route.</p></li><li><p><a href="http://localhost:8000/private" target="_blank" rel="noreferrer noopener">http://localhost:8000/private</a> to be prompted to authenticate.</p></li><li><p><a href="http://localhost:8000/" target="_blank" rel="noreferrer noopener">http://localhost:8000</a> to see the public route, now authenticated.</p></li><li><p><a href="http://localhost:8000/scope" target="_blank" rel="noreferrer noopener">http://localhost:8000/scope</a> to check if you have the <code>read:messages </code><a href="https://auth0.com/docs/manage-users/access-control/rbac" target="_blank" >permission</a>.</p></li><li><p><a href="http://localhost:8000/update" target="_blank" rel="noreferrer noopener">http://localhost:8000/update</a> to update the user&#39;s profile.</p></li><li><p><a href="http://localhost:8000/logout" target="_blank" rel="noreferrer noopener">http://localhost:8000/logout</a> to log out.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p><h3>Additional Reading</h3><ul><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Users.md" target="_blank" rel="noreferrer noopener">User Repositories and Models</a> extends the Auth0 Laravel SDK to use custom user models, and how to store and retrieve users from a database.</p></li><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Events.md" target="_blank" rel="noreferrer noopener">Hooking Events</a> covers how to listen for events raised by the Auth0 Laravel SDK, to fully customize the behavior of your integration.</p></li><li><p><a href="https://github.com/auth0/laravel-auth0/blob/main/docs/Management.md" target="_blank" rel="noreferrer noopener">Management API</a> support is built into the Auth0 Laravel SDK, allowing you to interact with the Management API from your Laravel application.</p></li></ul><p></p>
