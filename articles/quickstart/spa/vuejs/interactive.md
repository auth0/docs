---
title: Add Login to Your Vue Application
description: This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any Vue application using the Auth0 Vue SDK.
interactive:  true
files:
 - files/index
 - files/login
 - files/logout
 - files/profile
github:
  path: 01-Login
locale: en-US
---

# Add Login to Your Vue Application


<p></p><p>Auth0 allows you to add authentication to almost any application type. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any Vue application using the Auth0 Vue SDK.</p><p><div class="alert-container" severity="warning"><p>This quickstart is designed for using <a href="https://github.com/auth0/auth0-vue" target="_blank" rel="noreferrer noopener">Auth0 Vue</a> with Vue 3 applications. If you are using Vue 2, please check out the <a href="https://github.com/auth0/auth0-vue/blob/main/tutorial/vue2-login.md" target="_blank" rel="noreferrer noopener">Vue 2 Tutorial with Auth0 SPA SDK</a> instead or visit the <a href="https://developer.auth0.com/resources/guides/spa/vue/basic-authentication/v2-javascript" target="_blank" rel="noreferrer noopener">Vue.js Authentication 2 By Example</a> guide.</p></div></p><p>To use this quickstart, you will need:</p><ul><li><p>A free Auth0 account or log in to Auth0.</p></li><li><p>A working Vue project that you want to integrate with OR you can download a sample application after logging in.</p></li></ul><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/dashboard/us/dev-1-2s2aq0/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p></div></p><h3>Configure Allowed Web Origins</h3><p>An Allowed Web Origin is a URL that you want to be allowed to access to your authentication flow. This must contain the URL of your project. If not properly set, your project will be unable to silently refresh authentication tokens, so your users will be logged out the next time they visit your application or refresh a page.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p></div></p>

## Install the Auth0 Vue SDK {{{ data-action="code" data-code="index.js" }}}


<p>Auth0 provides a <a href="https://github.com/auth0/auth0-vue" target="_blank" rel="noreferrer noopener">Vue SDK</a> to simplify the process of implementing Auth0 authentication and authorization in Vue 3 apps.</p><p>Install the Auth0 Vue SDK by running the following commands in your terminal:</p><p><pre><code class="language-bash">cd &lt;your-project-directory&gt;

npm install @auth0/auth0-vue

</code></pre>

</p><h3>Register the plugin</h3><p>For the SDK to function, you must register the plugin with your Vue application using the following properties:</p><ul><li><p><code>domain</code>: The domain of your Auth0 tenant. This value is in the Auth0 Dashboard under your Application&#39;s Settings in the Domain field. If you are using a <a href="https://auth0.com/docs/custom-domains" target="_blank" >custom domain</a>, set this to the value of your custom domain instead.</p></li><li><p><code>clientId</code>: The ID of the Auth0 Application you set up earlier in this quickstart. Find this in the Auth0 Dashboard under your Application&#39;s Settings in the Client ID field.</p></li><li><p><code>authorizationParams.redirect_uri</code>: The URL in your application that you would like Auth0 to redirect users to after they have authenticated. This corresponds to the callback URL you set up earlier in this quickstart. This value is in the Auth0 Dashboard under your Application&#39;s Settings in the Callback URLs field. Make sure what you enter in your code matches what you set up earlier or your users will see an error.</p></li></ul><p>The plugin will register the SDK using both <code>provide</code> and <code>app.config.globalProperties</code>. This enables both the <a href="https://vuejs.org/guide/introduction.html#composition-api" target="_blank" rel="noreferrer noopener">Composition API</a> and <a href="https://vuejs.org/guide/introduction.html#options-api" target="_blank" rel="noreferrer noopener">Options API</a>.</p><p><div class="checkpoint">vue quickstart step 2 checkpoint <div class="checkpoint-default"><p>The plugin is now configured. Run your application to verify that:</p><ul><li><p>the SDK is initializing correctly</p></li><li><p>your application is not throwing any errors related to Auth0</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Verify you selected the correct application</p></li><li><p>Save your changes after entering your URLs</p></li><li><p>Verify the domain and Client ID imported correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Add login to your application {{{ data-action="code" data-code="login.js" }}}


<p>Next, you will set up login for your project. You will use the SDK’s <code>loginWithRedirect</code> function exposed on the return value of <code>useAuth0</code>, which you can access in your component&#39;s setup function. It will redirect users to the Auth0 Universal Login page. and, after a user authenticates, redirect then back to the callback URL you set up earlier in this quickstart.</p><h3>Using the Options API</h3><p>If you are using the Options API, you can use the same <code>loginWithRedirect</code> method from the global <code>$auth0</code> property through the <code>this</code> accessor.</p><p><div class="checkpoint">Vue quickstart step 3 checkpoint <div class="checkpoint-default"><p>You should now be able to log in using Auth0 Universal Login.</p><p>Click the login button and verify that:</p><ul><li><p>your Vue application redirects you to the Auth0 Universal Login page</p></li><li><p>you can log in or sign up</p></li><li><p>Auth0 redirects you to your application using the value of the <code>authorizationParams.redirect_uri </code>you used to configure the plugin.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If you were not able to log in using Auth0 Universal Login:</p><ul><li><p>Verify you configured the correct <code>authorizationParams.redirect_uri</code></p></li><li><p>Verify the domain and Client ID are set correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Add logout to your application {{{ data-action="code" data-code="logout.js" }}}


<p>Users who log in to your project will also need a way to log out. When users log out, your application will redirect them to your <a href="https://auth0.com/docs/api/authentication?javascript#logout" target="_blank" >Auth0 logout</a> endpoint, which will then redirect them to the specified <code>logoutParams.returnTo</code> parameter.</p><p>Use the <code>logout</code> function exposed on the return value of <code>useAuth0</code>, which you can access in your component&#39;s <code>setup</code> function, to log the user out of your application.</p><p></p><h3>Using the Options API</h3><p>With the Options API, you can use the same <code>logout</code> method from the global <code>$auth0</code> property through the <code>this</code> accessor.</p><p><div class="checkpoint">vue quickstart step 4 checkpoint <div class="checkpoint-default"><p>Run your application and click the logout button, verify that:</p><ul><li><p>your Vue application redirects you to the <code>logoutParams.returnTo </code>address</p></li><li><p>you are no longer logged in to your application</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"></div>

  </div></p>

## Show user profile information {{{ data-action="code" data-code="profile.js" }}}


<p>Next, you will configure how to retrieve the <a href="https://auth0.com/docs/users/concepts/overview-user-profile" target="_blank" >profile information</a> associated with authenticated users. For example, you may want to be able to display a logged-in user’s name or profile picture in your project. Once the user authenticates, the SDK extracts the user&#39;s profile information and stores it in memory. The application can access the user profile with the reactive <code>user</code> property. To access this property, review your component&#39;s <code>setup</code> function and find the <code>userAuth0</code> return value.</p><p>The <code>user</code> property contains sensitive information related to the user&#39;s identity. It is only available based on the user&#39;s authentication status. To prevent render errors, you should always:</p><ul><li><p>use the <code>isAuthenticated</code> property to determine whether Auth0 has authenticated the user before Vue renders any component that consumes the <code>user</code> property.</p></li><li><p>ensure that the SDK has finished loading by checking that <code>isLoading</code> is false before accessing the <code>isAuthenticated</code> property.</p></li></ul><h3>Using the Options API</h3><p>For the Options API, use the same reactive <code>user</code>, <code>isLoading</code>, and <code>isAuthenticated</code> properties from the global <code>$auth0</code> property through the <code>this</code> accessor.</p><p><div class="checkpoint">vue step 5 checkpoint <div class="checkpoint-default"><p>Verify that:</p><ul><li><p>you can display the <code>user </code>or any of the user properties within a component correctly after you have logged in</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If you are having issues with the <code>user</code> properties:</p><ul><li><p>Verify you added the <code>isLoading</code> check before accessing the <code>isAuthenticated</code> property</p></li><li><p>Verify you added the <code>isAuthenticated</code> check before accessing the <code>user</code> property</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>
