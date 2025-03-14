---
title: Add Login to Your PHP Application
description: This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any PHP application using the Auth0 PHP SDK.
interactive:  true
files:
 - files/index
 - files/login
 - files/logout
 - files/profile
 - files/router
 - files/callback
github:
  path: https://github.com/auth0-samples/auth0-php-web-app/tree/main/app
locale: en-US
---

# Add Login to Your PHP Application


<p>Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any PHP application using the Auth0 PHP SDK.</p><p>To use this quickstart, you’ll need to:</p><ul><li><p>Sign up for a free Auth0 account or log in to Auth0.</p></li><li><p>Have a working PHP project that you want to integrate with. Alternatively, you can view or download a sample application after logging in.</p></li></ul><p></p><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000/callback</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p><p></p></div></p><h3>Configure Allowed Web Origins</h3><p>An Allowed Web Origin is a URL that you want to be allowed to access to your authentication flow. This must contain the URL of your project. If not properly set, your project will be unable to silently refresh authentication tokens, so your users will be logged out the next time they visit your application or refresh a page.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p><p></p></div></p>

## Install the Auth0 PHP SDK {{{ data-action="code" data-code="index.php" }}}


<p>Auth0 provides a <a href="https://github.com/auth0/auth0-PHP">PHP SDK</a> (Auth0-PHP) to simplify the process of implementing Auth0 authentication and authorization in PHP apps.</p><p>The Auth0 PHP SDK requires <a href="https://www.php-fig.org/psr/psr-17/">PSR-17</a> and <a href="https://www.php-fig.org/psr/psr-18/">PSR-18</a> compatible HTTP libraries to be installed for managing network requests. If you don&#39;t have libraries available, you can install reliable choices by running the following commands in your terminal:</p><p><pre><code class="language-powershell">cd &lt;your-project-directory&gt;

composer require symfony/http-client nyholm/psr7

</code></pre>

</p><p>Now install the Auth0 PHP SDK by running the following command in your terminal:</p><p><pre><code class="language-powershell">composer require auth0/auth0-php

</code></pre>

</p><h3>Configure the Auth0 SDK</h3><p>Create a new file in your application called <code>index.php</code>, and copy in the code from the interactive panel to the right under the <b>index.php</b> tab.</p><p>For the SDK to function properly, you must set the following properties in the Auth0 SDK during initialization:</p><ul><li><p><code>domain</code>: The domain of your Auth0 tenant. Generally, you can find this in the Auth0 Dashboard under your Application&#39;s Settings in the Domain field. If you are using a <a href="https://auth0.com/docs/custom-domains">custom domain</a>, you should set this to the value of your custom domain instead.</p></li><li><p><code>clientId</code>: The ID of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application&#39;s Settings in the Client ID field.</p></li><li><p><code>clientSecret</code>: The secret of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application&#39;s Settings in the Client Secret field.</p></li><li><p><code>redirectUri</code>: The URL in your application that you would like Auth0 to redirect users to after they have authenticated. This corresponds to the callback URL you set up earlier in this quickstart. You can also find this value in the Auth0 Dashboard under your Application&#39;s Settings in the Callback URLs field. Make sure what you enter in your code matches what you set up earlier or your users will see an error.</p></li><li><p><code>cookieSecret</code>: A long secret value used to encrypt the session cookie. You can generate a suitable string by running <code>openssl rand -hex 32 </code>in your terminal.</p></li></ul><p><div class="checkpoint">PHP Step 2 Checkpoint <div class="checkpoint-default"><p>Your Auth0 SDK should now be properly configured. Run your application to verify that:</p><ul><li><p>The SDK is initializing correctly.</p></li><li><p>Your application is not throwing any errors related to Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>

## Create routes {{{ data-action="code" data-code="router.php" }}}


<p>Now install a routing library, to help direct incoming requests to your application. This isn&#39;t a required step, but simplifies our application structure for the purposes of this quickstart.</p><p><pre><code class="language-powershell">composer require steampixel/simple-php-router

</code></pre>

</p><p>Create a new file in your application called <code>router.php</code> to define our routes, and copy in the code from the interactive panel to the right.</p>

## Add login to your application {{{ data-action="code" data-code="login.php" }}}


<p>Now that you have configured your Auth0 Application and the Auth0 PHP SDK, you need to set up login for your project. To do this, you will use the SDK’s <code>login()</code> method to create a login button that redirects users to the Auth0 Universal Login page. After a user successfully authenticates, they will be redirected to the callback URL you set up earlier in this quickstart.</p><p>Create a new file in your application called <code>login.php</code> to handle logging process, and copy in the code from the interactive panel to the right, which contains the logic needed for login.</p><p><div class="checkpoint">Php step 4 checkpoint <div class="checkpoint-default"><p>You should now be able to log in or sign up using a username and password.</p><p>Click the login link and verify that:</p><ul><li><p>Your application redirects you to the Auth0 Universal Login page.</p></li><li><p>You can log in or sign up.</p></li><li><p>Auth0 redirects you back to your application using the value of the <code>redirectUri </code>you used to configure the SDK.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>You configured the correct <code>redirectUri</code>.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Add logout to your application {{{ data-action="code" data-code="logout.php" }}}


<p>Users who log in to your project will also need a way to log out. We will handle a logout button using the SDK’s <code>logout()</code> method. When users log out, they will be redirected to your <a href="https://auth0.com/docs/api/authentication?http#logout">Auth0 logout</a> endpoint, which will then immediately redirect them to the logout URL you set up earlier in this quickstart.</p><p>Create a new file in your application called <code>logout.php</code> for handling the process, and copy in the code from the interactive panel, which contains the logic needed for logout. Then, update your <code>index.php</code> file to include the logout button.</p><p><div class="checkpoint">PHP Section 5 Checkpoint <div class="checkpoint-default"><p>Run your application and click the logout button, verify that:</p><ul><li><p>Your application redirects you to the address you specified as one of the Allowed Logout URLs in your Application Settings.</p></li><li><p>You are no longer logged in to your application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>You configured the correct Logout URL.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Show User Profile Information {{{ data-action="code" data-code="profile.php" }}}


<p>Now that your users can log in and log out, you will likely want to be able to retrieve the <a href="https://auth0.com/docs/users/concepts/overview-user-profile">profile information</a> associated with authenticated users. For example, you may want to be able to display a logged-in user’s name or profile picture in your project.</p><p>The Auth0 PHP SDK provides user information through the <code>getCredentials()</code> method. Review the <code>profile.php</code> code in the interactive panel to see an example of how to use it.</p><p>Because the method contains sensitive information related to the user&#39;s identity, its availability depends on the user&#39;s authentication status. To prevent render errors, you should always check if the <code>getCredentials()</code> method returns an <code>object</code> or <code>null</code> to determine whether Auth0 has authenticated the user before your application consumes the results.</p><p><div class="checkpoint">Php section 6 Checkpoint <div class="checkpoint-default"><p>Verify that:</p><ul><li><p>You can display the <code>nickname </code>or any other user property correctly after you have logged in.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>You created the <code>profile.php</code> file and are logged in.</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
