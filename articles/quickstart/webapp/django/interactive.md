---
title: Add Login to your Django Application
description: This guide demonstrates how to integrate Auth0 with a Python Django application using the Authlib SDK.
interactive:  true
files:
 - files/webappexample/templates/index
 - files/webappexample/settings
 - files/webappexample/urls
 - files/webappexample/views
github:
  path: https://github.com/auth0-samples/auth0-django-web-app/tree/master/01-Login
locale: en-US
---

# Add Login to your Django Application


<p>Auth0 allows you to add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with a Python <a href="https://www.djangoproject.com/">Django</a> application using the <a href="https://authlib.org/">Authlib</a> SDK.</p><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/dashboard/us/auth0-dsepaid/">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000/</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p></div></p>

## Install dependencies


<p>For this integration, you will add several library dependencies, such as Authlib. Create a <code>requirements.txt</code> file in your project directory, and include the following:</p><p><pre><code>authlib ~= 1.0

django ~= 4.0

python-dotenv ~= 0.19

requests ~= 2.27

</code></pre>

</p><p>Run the following command from your shell to make these dependencies available:</p><p><code>pip install -r requirements.txt</code></p>

## Configure your .env file


<p>Next, create an <code>.env</code> file in your project directory. This file will hold your client keys and other configuration details.</p><p><pre><code>AUTH0_CLIENT_ID=${account.clientId}

AUTH0_CLIENT_SECRET=${account.clientSecret}

AUTH0_DOMAIN=${account.namespace}

</code></pre>

</p>

## Create an application


<p>If you already have a Django application setup, skip to the next step. For a new application project, run the following command:</p><p><code>django-admin startproject webappexample</code></p><p>Change to the new project folder:</p><p><code>cd webappexample</code></p>

## Update settings.py {{{ data-action="code" data-code="webappexample/settings.py" }}}


<p>Open the <code>webappexample/settings.py</code> file to review the <code>.env</code> values.</p><p>At the top of the file, add the <code>os</code> and <code>dotenv</code> imports.</p><p>Next, beneath the <code>BASE_DIR</code> definition, add the <code>TEMPLATE_DIR</code> variable.</p><p>Next, find the <code>TEMPLATES</code> variable and update the <code>DIRS</code> value to add our <code>TEMPLATE_DIR</code> string. This determines the path of the template files, which you will create in a future step. Keep any other content of this array the same.</p><p>At the end of this file, add the code to load the Auth0 config.</p>

## Setup your application {{{ data-action="code" data-code="webappexample/views.py#1:18" }}}


<p>To begin creating your application, open the <code>webappexample/views.py</code> file in your IDE.</p><p>Import all the libraries your application needs.</p><p>Now you can configure Authlib to handle your application&#39;s authentication with Auth0.</p><p>Learn more about the configuration options available for Authlib&#39;s OAuth <code>register()</code> method from <a href="https://docs.authlib.org/en/latest/client/frameworks.html#using-oauth-2-0-to-log-in">their documentation.</a></p>

## Setup your route handlers {{{ data-action="code" data-code="webappexample/views.py#20:52" }}}


<p>In this example, you will add four routes for your application: the login, callback, logout, and index routes.</p><ul><li><p><code>login</code> - When visitors to your app visit the <code>/login</code> route, they will reach Auth0 to begin the authentication flow.</p></li><li><p><code>callback</code> - After your users finish logging in with Auth0, they will return to your application at the <code>/callback</code> route. This route saves the session for the user and bypasses the need for them to login again when they return.</p></li><li><p><code>logout</code> - The <code>/logout</code> route signs users out from your application. This route clears the user session in your app and redirects to the Auth0 logout endpoint to ensure the session is no longer saved. Then, the application redirects the user to your home route.</p></li><li><p><code>index</code> - The home route will render an authenticated user&#39;s details or allow visitors to sign in.</p></li></ul><p></p>

## Register your routes {{{ data-action="code" data-code="webappexample/urls.py" }}}


<p>Replace the contents of your <code>webappexample/urls.py</code> file with the code on the right to connect to these new routes.</p><p>This will route the <code>/login</code>, <code>/callback</code>, <code>/logout</code> and <code>/</code> routes to the correct handlers.</p>

## Add templates {{{ data-action="code" data-code="webappexample/templates/index.html" }}}


<p>Next, you will create a template file used in the home page route.</p><p>Create a new sub-directory within the <code>webappexample</code> folder named <code>templates</code>, and create a <code>index.html</code> file.</p><p>The <code>index.html</code> file will contain template code to display the user&#39;s info if logged in or present them with a login button if logged out.</p>

## Run your application


<p>You&#39;re ready to run your application! From your project directory, open a shell and use:</p><p><pre><code>python3 manage.py migrate

python3 manage.py runserver 3000

</code></pre>

</p><p>Your application should now be ready to open from your browser at <a href="http://localhost:3000">http://localhost:3000</a>.</p><p><div class="checkpoint">Django - Step 10 - Run your application - Checkpoint <div class="checkpoint-default"><p>Visit <a href="http://localhost:3000/">http://localhost:3000</a> to verify. You should find a login button routing to Auth0 for login, then back to your application to see your profile information.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Verify any errors in the console.</p></li><li><p>Verify the domain and Client ID imported correctly.</p></li><li><p>Verify your tenant configuration.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
