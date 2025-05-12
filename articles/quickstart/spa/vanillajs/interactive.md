---
title: Add Login to Your JavaScript Application
description: This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in a Single-Page Application (SPA) that uses plain JavaScript, using the Auth0 SPA SDK.
interactive:  true
files:
 - files/app
github:
  path: 01-Login
locale: en-US
---

# Add Login to Your JavaScript Application


<p>Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in a Single-Page Application (SPA) that uses plain JavaScript, using the <a href="https://github.com/auth0/auth0-spa-js" target="_blank" rel="noreferrer noopener">Auth0 SPA SDK</a>.</p><p>To use this quickstart, you’ll need to:</p><ul><li><p>Sign up for a free Auth0 account or log in to Auth0.</p></li><li><p>Have a working project that you want to integrate with. Alternatively, you can view or download a sample application after logging in.</p></li></ul><p><div class="alert-container" severity="default"><p>This quickstart assumes you are adding Auth0 to a plain JavaScript application, as opposed to using a framework such as React or Angular.</p></div></p><p></p><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p></div></p><h3>Configure Allowed Web Origins</h3><p>An Allowed Web Origin is a URL that you want to be allowed to access to your authentication flow. This must contain the URL of your project. If not properly set, your project will be unable to silently refresh authentication tokens, so your users will be logged out the next time they visit your application or refresh a page.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p></div></p>

## Add the Auth0 SPA SDK


<p>Auth0 provides a SPA SDK (auth0-spa-js) to simplify the process of implementing Auth0 authentication and authorization in JavaScript applications. You can install the Auth0 SPA SDK as an NPM package or from the CDN. For the purpose of this quickstart, we will use the CDN. Include this script tag on your HTML page:</p><p><pre><code class="language-javascript">&lt;script src=&quot;https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js&quot;&gt;&lt;/script&gt;

</code></pre>

</p>

## Create the Auth0 client {{{ data-action="code" data-code="app.js#1:7" }}}


<p>Create a new instance of the Auth0 client provided by the Auth0 SPA SDK and provide the Auth0 application details you created earlier in this quickstart.</p><p>If a user has previously logged in, the client will refresh the authentication state on page load; the user will still be logged in once the page is refreshed.</p>

## Add login to your application {{{ data-action="code" data-code="app.js#8:14" }}}


<p>Now that you have configured your Auth0 Application, added the Auth0 SPA SDK, and created the Auth0 client, you need to set up login for your project. To do this, you will use the SDK’s <code>loginWithRedirect()</code> method to redirect users to the Auth0 Universal Login page where Auth0 can authenticate them. After a user successfully authenticates, they will be redirected to the callback URL you set up earlier in this quickstart.</p><p>Create a login button in your application that calls <code>loginWithRedirect()</code> when selected.</p><p><div class="checkpoint">Javascript quickstart step 4 checkpoint <div class="checkpoint-default"><p>You should now be able to log in to your application.</p><p>Run your application, and select the login button. Verify that:</p><ul><li><p>you can log in or sign up using a username and password</p></li><li><p>your application redirects you to the <a href="https://auth0.com/universal-login" target="_blank" >Auth0 Universal Login</a> page</p></li><li><p>you are redirected to Auth0 for authentication</p></li><li><p>Auth0 successfully redirects back to your application after authentication</p></li><li><p>you do not receive any errors in the console related to Auth0</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a few things to double check:</p><ul><li><p>make sure that the correct application is selected</p></li><li><p>make sure you saved after entering your URLs</p></li><li><p>make sure the Auth0 client has been correctly configured with your Auth0 domain and client ID</p></li></ul><p>Still having issues? To get more help, check out our <a href="https://auth0.com/docs/" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a>.</p></div>

  </div></p>

## Handle the callback from Auth0 {{{ data-action="code" data-code="app.js#16:21" }}}


<p>When the browser is redirected back to your application process, your application should call the <code>handleRedirectCallback()</code> function on the Auth0 client only when it detects a callback from Auth0. One way to do this is to only call <code>handleRedirectCallback()</code> when <code>code</code> and <code>state</code> query parameters are detected.</p><p>If handling the callback was successful, the parameters should be removed from the URL so the callback handler will not be triggered the next time the page loads.</p><p><div class="checkpoint">Javascript quickstart step 5 checkpoint <div class="checkpoint-default"><p>Your callback from Auth0 should now be properly handled.</p><p>Run your application, and select the login button again. Verify that:</p><ul><li><p>Auth0 successfully redirects back to your application after authentication.</p></li><li><p>the query parameters are removed from the URL.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a few things to double check:</p><ul><li><p>check that the <code>redirect_uri</code> option has been configured to your application&#39;s URL</p></li><li><p>if you have an <code>error</code> query parameter, inspect it to learn the cause of the error</p></li></ul><p>Still having issues? To get more help, check out our <a href="https://auth0.com/docs/" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a>.</p></div>

  </div></p>

## Add logout to your application {{{ data-action="code" data-code="app.js#23:29" }}}


<p>Users who log in to your project will also need <a href="https://auth0.com/docs/logout/guides/logout-auth0" target="_blank" >a way to log out</a>. The Auth0 client provides a <code>logout()</code> method that you can use to log a user out of your app. When users log out, they will be redirected to your <a href="https://auth0.com/docs/api/authentication?javascript#logout" target="_blank" >Auth0 logout endpoint</a>, which will then immediately redirect them to your application and the logout URL you set up earlier in this quickstart.</p><p>Create a logout button in your application that calls <code>logout()</code> when selected.</p><p><div class="alert-container" severity="default"><p>The SDK exposes an <code>isAuthenticated()</code> function that allows you to check whether a user is authenticated or not. You can render the login and logout buttons conditionally based on the value of the <code>isAuthenticated()</code> function. Alternatively, you can use a single button to combine both login and logout buttons as well as their conditional rendering.</p></div></p><p><div class="checkpoint">javascript quickstart step 6 checkpoint <div class="checkpoint-default"><p>

You should now be able to log out of your application.</p><p>Run your application, log in, and select the logout button. Verify that:</p><ul><li><p>you are redirected to Auth0&#39;s logout endpoint.</p></li><li><p>Auth0 successfully redirects back to your application and the correct logout URL.</p></li><li><p>you are no longer logged in to your application.</p></li><li><p>you do not receive any errors in the console related to Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a few things to double check:</p><ul><li><p>make sure that you configured the logout URL as one of the <b>Allowed Logout URLS </b>in your application&#39;s <b>Settings</b></p></li><li><p>inspect the <a href="https://manage.auth0.com/#/logs" target="_blank" rel="noreferrer noopener">application logs</a> for further errors</p></li></ul><p>Still having issues? To get more help, check out our <a href="https://auth0.com/docs/" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a>.</p></div>

  </div></p>

## Show user profile information {{{ data-action="code" data-code="app.js#31:45" }}}


<p>Now that your users can log in and log out, you will likely want to be able to retrieve the <a href="https://auth0.com/docs/users/concepts/overview-user-profile" target="_blank" >profile information</a> associated with authenticated users. For example, you may want to be able to personalize the user interface by displaying a logged-in user’s name or profile picture.</p><p>The Auth0 SPA SDK provides user information through the <code>getUser()</code> function exposed by the Auth0 client. The Auth0 client also exposes an <code>isAuthenticated()</code> function that allows you to check whether a user is authenticated or not, which you can use to determine whether to show or hide UI elements, for example. Review the code in the interactive panel to see examples of how to use these functions.</p><p><div class="checkpoint">Javascript quickstart step 7 checkpoint <div class="checkpoint-default"><p>You should now be able to view user profile information.</p><p>Run your application, and verify that:</p><ul><li><p>user information displays correctly after you have logged in.</p></li><li><p>user information does not display after you have logged out.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a few things to double check:</p><ul><li><p>ensure that all the previous steps work without issue</p></li><li><p>check your code that manages the UI in response to the authentication state</p></li><li><p>inspect the <a href="https://manage.auth0.com/#/logs" target="_blank" rel="noreferrer noopener">application logs</a> for further errors relating to silent authentication</p></li></ul><p>Still having issues? To get more help, check out our <a href="https://auth0.com/docs/" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a>.</p></div>

  </div></p>
