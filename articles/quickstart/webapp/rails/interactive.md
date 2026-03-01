---
title: Add Login to Your Ruby on Rails Application
description: This tutorial demonstrates how to add user login to a Ruby on Rails application.
interactive:  true
files:
 - files/config/auth0
 - files/auth0
 - files/auth0_controller
 - files/routes
 - files/secured
github:
  path: sample
locale: en-US
---

# Add Login to Your Ruby on Rails Application


<p></p><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000/auth/auth0/callback</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p></div></p><h3>Configure Allowed Web Origins</h3><p>An Allowed Web Origin is a URL that you want to be allowed to access to your authentication flow. This must contain the URL of your project. If not properly set, your project will be unable to silently refresh authentication tokens, so your users will be logged out the next time they visit your application or refresh a page.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p></div></p>

## Add dependencies


<p>Use <code>omniauth-auth0</code>, a custom <a href="https://github.com/intridea/omniauth#omniauth-standardized-multi-provider-authentication" target="_blank" rel="noreferrer noopener">OmniAuth strategy</a>, to handle the authentication flow.</p><p>Add the following dependencies to your <code>Gemfile</code>:</p><p><pre><code class="language-ruby">gem 'omniauth-auth0', '~&gt; 3.0'

gem 'omniauth-rails_csrf_protection', '~&gt; 1.0' # prevents forged authentication requests

</code></pre>

</p><p>Once your gems are added, install the gems with <code>bundle install</code>.</p>

## Configure the SDK {{{ data-action="code" data-code="config/auth0.yml" }}}


<p>Create a configuration file <code>./config/auth0.yml</code> to specify your Auth0 domain, client ID, and client secret values located in your Auth0 Dashboard under application <b>Settings</b>.</p>

## Configure the OmniAuth middleware {{{ data-action="code" data-code="auth0.rb" }}}


<p>Create the following initializer file <code>./config/initializers/auth0.rb</code> and <a href="https://github.com/auth0/omniauth-auth0/blob/master/EXAMPLES.md#send-additional-authentication-parameters" target="_blank" rel="noreferrer noopener">configure</a> the <b>OmniAuth</b> middleware with the configuration file you created in the previous step.</p><p>Ensure that <code>callback_path</code> matches the value given in the &quot;Allowed Callback URLs&quot; setting in your Auth0 application.</p>

## Add an Auth0 controller {{{ data-action="code" data-code="auth0_controller.rb" }}}


<p>Create an Auth0 controller to handle the authentication callback, <code>logout</code> action, and methods for constructing the logout URL.</p><p>Run the command: <code>rails generate controller auth0 callback failure logout --skip-assets --skip-helper --skip-routes --skip-template-engine</code>.</p><p>Inside the callback method, assign the hash of user information - returned as <code>request.env[&#39;omniauth.auth&#39;]</code> - to the active session.</p><p>To configure logout, clear all the objects stored within the session by calling the <code>reset_session</code> method within the <code>logout</code> action. Then, redirect to the Auth0 logout endpoint. To learn more about <code>reset_session</code>, read <a href="http://api.rubyonrails.org/classes/ActionController/Base.html#M000668" target="_blank" rel="noreferrer noopener">Ruby on Rails ActionController documentation</a>.</p>

## Configure routes {{{ data-action="code" data-code="routes.rb" }}}


<p>Add these routes to your <code>./config/routes.rb</code> file.</p><p>Routes must be in place so Rails knows how to route the various Auth0 callback URLs to the Auth0 controller you created in the previous step.</p><p><div class="checkpoint">Ruby on Rails Quickstart - Step 6 Checkpoint <div class="checkpoint-default"><p>Run your application to verify it continues to work as intended and you aren&#39;t receive any errors relating to Auth0.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Please double-check that the previous steps completed without error.</p><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Add login to your application


<p>A user can now log into your application by visiting the <code>/auth/auth0</code> endpoint.</p><p><div class="alert-container" severity="warning"><p>To <a href="https://github.com/cookpad/omniauth-rails_csrf_protection" target="_blank" rel="noreferrer noopener">prevent forged authentication requests</a>, use the <code>link_to</code> or <code>button_to</code> helper methods with the <code>:post</code> method.</p></div></p><p><pre><code class="language-ruby">&lt;!-- Place a login button anywhere on your application --&gt;

\${ "<\%= button_to 'Login', '/auth/auth0', method: :post %>" }

</code></pre>

</p><p><div class="checkpoint">Ruby on Rails Quickstart - Step 7 Checkpoint <div class="checkpoint-default"><p>Add a button to your application that redirects the user to the <code>/auth/auth0</code> endpoint when selected. Observe that you redirect to Auth0 to log in, and then back to your app after successful authentication.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple of things you can check:</p><ul><li><p>Ensure that the correct URLs have been set in your Auth0 application as per the first step in this quickstart</p></li><li><p>Check that all the required gems installed correctly</p></li><li><p>Check that the routes have been set up and the Auth0 configuration has been set up in your app</p></li><li><p><a href="https://manage.auth0.com/#/logs" target="_blank" rel="noreferrer noopener">Check the logs</a> for any other errors or messages that may have prevented login from working</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Add logout to your application


<p>Now that you can log in to your Rails application, you need <a data-contentfulid="FhVnaWoVSOQXM0Uxq1nre-en-US">a way to log out</a>. Log out a user by redirecting to the <code>auth/logout</code> action, which redirects them to the Auth0 logout endpoint.</p><p><div class="alert-container" severity="default"><p>To test this after the previous step, you may need to clear out your session and then redirect the user to the Auth0 logout endpoint.</p></div></p><p><pre><code class="language-ruby">&lt;!-- Place a logout button anywhere on your application --&gt;

\${"<%= button_to 'Logout', 'auth/logout', method: :get %>"}

</code></pre>

</p><p><div class="checkpoint">Ruby on Rails Quickstart - Step 8 Checkpoint <div class="checkpoint-default"><p>Add a button to your application that redirects the user to the <code>/auth/logout</code> endpoint when selected. Verify that you redirect to Auth0 and then quickly back to your application, and that you are no longer logged in.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple of things you can check:</p><ul><li><p>Ensure that the correct URLs have been set in your Auth0 client as per the first step in this quickstart</p></li><li><p>Check that the routes have been set up and the Auth0 configuration has been set up in your app</p></li><li><p><a href="https://manage.auth0.com/#/logs" target="_blank" rel="noreferrer noopener">Check the logs</a> for any other errors or messages that may have prevented login from working</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Show user profile information {{{ data-action="code" data-code="routes.rb" }}}


<p>To display the user&#39;s profile, your application should provide a protected route. You can use a <a href="https://guides.rubyonrails.org/getting_started.html#using-concerns" target="_blank" rel="noreferrer noopener">Concern</a> to control access to routes that can be shared across multiple controllers. The concern should automatically redirect to Auth0 when the user is unauthenticated. Otherwise, the concern should return the current user profile.</p><p>Once you have a Concern, include it in any controller that requires a logged-in user. You can then access the user from the session <code>session[:userinfo]</code> as in the following example:</p><p><pre><code class="language-ruby">class DashboardController &lt; ApplicationController

  include Secured



  def show

    @user = session[:userinfo]

  end

end

</code></pre>

</p><p>Once the user loads from the session, use it to display information in your frontend:</p><p><pre><code class="language-xml">&lt;div&gt;

  &lt;p&gt;Normalized User Profile:\${"<%= JSON.pretty_generate(@user[:info])%>"}&lt;/p&gt;

  &lt;p&gt;Full User Profile:\${"<%= JSON.pretty_generate(@user[:extra][:raw_info])%>"}&lt;/p&gt;

&lt;/div&gt;

</code></pre>

</p><p><div class="checkpoint">Ruby on Rails Quickstart - Step 9 Checkpoint <div class="checkpoint-default"><p>Add the <code>Secured</code> concern to your app and then include it in the controller that requires an authenticated user to access it. Verify that an authenticated user has access to actions within that controller and that unauthenticated users are redirected to Auth0 for authentication.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>
