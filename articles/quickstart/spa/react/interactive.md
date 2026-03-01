---
title: Add Login to your React Application
description: This guide demonstrates how to integrate Auth0 with any new or existing React application using the Auth0 React SDK.
interactive:  true
files:
 - files/index
 - files/login
 - files/logout
 - files/profile
github:
  path: Sample-01
locale: en-US
---

# Add Login to your React Application


<p>Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any React application using the Auth0 React SDK. Test</p><p>To use this quickstart, you’ll need to:</p><ul><li><p>Sign up for a free Auth0 account or log in to Auth0.</p></li><li><p>Have a working React project that you want to integrate with. Alternatively, you can view or download a sample application after logging in.</p></li></ul><p><div class="alert-container" severity="default"><p>Visit the <a href="https://developer.auth0.com/resources/guides/spa/react/basic-authentication" target="_blank" rel="noreferrer noopener">React Authentication By Example</a> guide for a deep dive into implementing user authentication in React. This guide provides additional details on how to create a sign-up button, add route guards using React Router, and call a protected API from React.</p></div></p><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p></div></p><h3>Configure Allowed Web Origins</h3><p>An Allowed Web Origin is a URL that you want to be allowed to access to your authentication flow. This must contain the URL of your project. If not properly set, your project will be unable to silently refresh authentication tokens, so your users will be logged out the next time they visit your application or refresh a page.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p></div></p>

## Install the Auth0 React SDK {{{ data-action="code" data-code="index.js" }}}


<p>Auth0 provides a <a href="https://github.com/auth0/auth0-react" target="_blank" rel="noreferrer noopener">React SDK</a> (auth0-react.js) to simplify the process of implementing Auth0 authentication and authorization in React apps.</p><p>Install the Auth0 React SDK by running the following commands in your terminal:</p><p><pre><code>cd &lt;your-project-directory&gt;

npm install @auth0/auth0-react

</code></pre>

</p><h3>Configure the Auth0Provider component</h3><p>For the SDK to function properly, you must set the following properties in the Auth0Provider component:</p><ul><li><p><code>domain</code>: The domain of your Auth0 tenant. Generally, you can find this in the Auth0 Dashboard under your Application&#39;s Settings in the Domain field. If you are using a <a href="https://auth0.com/docs/custom-domains" target="_blank" >custom domain</a>, you should set this to the value of your custom domain instead.</p></li><li><p><code>clientId</code>: The ID of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application&#39;s Settings in the Client ID field.</p></li><li><p><code>authorizationParams.redirect_uri</code>: The URL in your application that you would like Auth0 to redirect users to after they have authenticated. This corresponds to the callback URL you set up earlier in this quickstart. You can also find this value in the Auth0 Dashboard under your Application&#39;s Settings in the Callback URLs field. Make sure what you enter in your code matches what you set up earlier or your users will see an error.</p></li></ul><p><div class="checkpoint">React Quickstart - Step 2 Checkpoint <div class="checkpoint-default"><p>Your Auth0Provider component should now be properly configured. Run your application to verify that:</p><ul><li><p>The SDK is initializing correctly.</p></li><li><p>Your application is not throwing any errors related to Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID imported correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Add login to your application {{{ data-action="code" data-code="login.js" }}}


<p>Now that you have configured your Auth0 Application and the Auth0 React SDK, you need to set up login for your project. To do this, you will use the SDK’s loginWithRedirect() method to create a login button that redirects users to the Auth0 Universal Login page. After a user successfully authenticates, they will be redirected to the callback URL you set up earlier in this quickstart.</p><p><div class="alert-container" severity="default"><p>This guide focuses on using the <code>useAuth0()</code> custom React Hook. If you are using class components, check out <a href="https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#use-with-a-class-component" target="_blank" rel="noreferrer noopener">these samples using the <code>withAuth0()</code> higher-order component</a>.</p></div></p><p>Create a new file in your application called <code>login.js</code> for the login button component, and copy in the code from the interactive panel to the right, which contains the logic needed for login. Then, update your <code>index.js</code> file to include the new login button.</p><p><div class="checkpoint">React Quickstart - Step 3 Checkpoint <div class="checkpoint-default"><p>You should now be able to log in or sign up using a username and password.</p><p>Click the login button and verify that:</p><ul><li><p>Your React Application redirects you to the Auth0 Universal Login page.</p></li><li><p>You can log in or sign up.</p></li><li><p>Auth0 redirects you to your application using the value of the <code>authorizationParams.redirect_uri </code>you used to configure the <code>Auth0Provider.</code></p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>you configured the correct <code>authorizationParams.redirect_uri</code></p></li><li><p>you added the Login button to the <code>index.js</code> file</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Add logout to your application {{{ data-action="code" data-code="logout.js" }}}


<p>Users who log in to your project will also need a way to log out. Create a logout button using the SDK’s logout() method. When users log out, they will be redirected to your <a href="https://auth0.com/docs/api/authentication?javascript#logout" target="_blank" >Auth0 logout</a> endpoint, which will then immediately redirect them to the logout URL you set up earlier in this quickstart.</p><p>Create a new file in your application called <code>logout.js</code> for the logout button component, and copy in the code from the interactive panel, which contains the logic needed for logout. Then, update your <code>index.js</code> file to include the logout button.</p><p><div class="checkpoint">React Quickstart - Step 4 Checkpoint <div class="checkpoint-default"><p>Run your application and click the logout button, verify that:</p><ul><li><p>Your React application redirects you to the address you specified as one of the Allowed Logout URLs in your Application Settings.</p></li><li><p>You are no longer logged in to your application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>you configured the correct Logout URL</p></li><li><p>you added the Logout button to the <code>index.js</code> file</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Show User Profile Information {{{ data-action="code" data-code="profile.js" }}}


<p>Now that your users can log in and log out, you will likely want to be able to retrieve the <a href="https://auth0.com/docs/users/concepts/overview-user-profile" target="_blank" >profile information</a> associated with authenticated users. For example, you may want to be able to display a logged-in user’s name or profile picture in your project.</p><p>The Auth0 React SDK provides user information through the <code>user</code> property. Review the <code>profile.js</code> code in the interactive panel to see an example of how to use it.</p><p>Because the <code>user</code> property contains sensitive information related to the user&#39;s identity, its availability depends on the user&#39;s authentication status. To prevent render errors, you should always:</p><ul><li><p>Use the <code>isAuthenticated </code>property to determine whether Auth0 has authenticated the user before React renders any component that consumes the <code>user </code>property.</p></li><li><p>Ensure that the SDK has finished loading by checking that <code>isLoading </code>is false before accessing the <code>isAuthenticated </code>property.</p></li></ul><img src="//images.ctfassets.net/cdy7uua7fh8z/5Lp4Zahxd2v6wSJmy9JaM4/8625115fc5b27b7f6f4adf9003c30b3a/Login_Screen_-_English.png" alt="" /><p><div class="checkpoint">React Quickstart - Step 5 Checkpoint <div class="checkpoint-default"><p>Verify that:</p><ul><li><p>You can display the <code>user.name </code>or any other user property within a component correctly after you have logged in.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>you added the <code>isLoading</code> check before accessing the <code>isAuthenticated</code> property</p></li><li><p>you added the <code>Profile</code> component to the <code>index.js</code> file</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>
