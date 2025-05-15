---
title: Add Login to Your Python Flask Application
description: This guide demonstrates how to integrate Auth0 with a Python Flask application using the Authlib SDK.
interactive:  true
files:
 - files/server
 - files/templates/home
github:
  path: 01-Login
locale: en-US
---

# Add Login to Your Python Flask Application


<p>Auth0 allows you to add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with a Python <a href="https://flask.palletsprojects.com/" target="_blank" rel="noreferrer noopener">Flask</a> application using the <a href="https://authlib.org/" target="_blank" rel="noreferrer noopener">Authlib</a> SDK.</p><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000/callback</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p><p></p></div></p>

## Install dependencies


<p>Create a <code>requirements.txt</code> file in your project directory:</p><p><pre><code class="language-powershell"># 📁 requirements.txt -----



flask&gt;=2.0.3

python-dotenv&gt;=0.19.2

authlib&gt;=1.0

requests&gt;=2.27.1

</code></pre>

</p><p>Run the following command from your shell to enable these dependencies in your project:</p><p><pre><code class="language-powershell">pip install -r requirements.txt

</code></pre>

</p>

## Configure your .env file


<p>Next, create an <code>.env</code> file in your project directory. This file will hold your client keys and other configuration details.</p><p><pre><code># 📁 .env -----



AUTH0_CLIENT_ID=${account.clientId}

AUTH0_CLIENT_SECRET=${account.clientSecret}

AUTH0_DOMAIN=${account.namespace}

APP_SECRET_KEY=

</code></pre>

</p><ul><li><p>Generate a string for <code>APP_SECRET_KEY </code>using <code>openssl rand -hex 32 </code>from your shell.</p></li></ul><p></p>

## Setup your application {{{ data-action="code" data-code="templates/home.html" }}}


<p>Next, set up your application. Create a <code>server.py</code> file in your project directory - this file will contain your application logic.</p><p>Import all the libraries your application needs.</p><p>Load the configuration <code>.env</code> file you made in the previous step.</p><p>Configure Authlib to handle your application&#39;s authentication with Auth0. To learn more about the configuration options available for Authlib&#39;s OAuth <code>register()</code> method from <a href="https://docs.authlib.org/en/latest/client/frameworks.html#using-oauth-2-0-to-log-in" target="_blank" rel="noreferrer noopener">their documentation.</a></p>

## Setup your routes {{{ data-action="code" data-code="server.py" }}}


<p>In this example, you will add four routes to the application: login, callback, logout, and home.</p><p>When visitors to your app visit the <code>/login</code> route, your application will route them to the Auth0 login page.</p><p>After your users log in with Auth0, your application will route them to the <code>/callback</code> route. This route saves the session for the user and bypasses the need for them to login again when they return.</p><p>The <code>/logout</code> route signs users out from your application. This route clears the user session in your app and redirects to the Auth0 logout endpoint to ensure the session is no longer saved. Then, the application redirects the user to your home route.</p><p>Your <code>/ </code>home route either renders an authenticated user&#39;s details or allows visitors to sign in.</p>

## Add templates


<p>Next, create the template file used in the home route (during <code>render_template()</code> calls).</p><p>Create a new sub-directory in your project folder named <code>templates</code>, and create <code>home.html</code> in the directory. Paste the content from the right into that file.</p>

## Run your application


<p>To run your application, navigate to the root of your project directory and open a terminal. Run the following command:</p><p><pre><code class="language-python">python3 server.py

</code></pre>

</p><p><div class="checkpoint">Python Step 7 Checkpoint <div class="checkpoint-default"><p>Visit <a href="http://localhost:3000/" target="_blank" rel="noreferrer noopener">http://localhost:3000</a> to verify. You should find a login button routing to Auth0 for login, then back to your application to see your profile information.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Verify any errors in the console.</p></li><li><p>Verify the domain and Client ID imported correctly.</p></li><li><p>Verify your tenant configuration.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com" target="_blank" rel="noreferrer noopener">community page</a> to get more help</p><p></p></div>

  </div></p>
