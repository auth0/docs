---
title: Add Login to Your Angular Application
description: This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any Angular application using the Auth0 Angular SDK.
interactive:  true
files:
 - files/main
 - files/login-button
 - files/logout-button
 - files/user-profile
github:
  path: Sample-01
locale: en-US
---

# Add Login to Your Angular Application


<p><div class="alert-container" severity="default"><p>Visit the <a href="https://developer.auth0.com/resources/guides/spa/angular/basic-authentication" target="_blank" rel="noreferrer noopener">Angular Authentication By Example</a> guide for a deep dive into implementing user authentication in Angular. This guide provides additional details on how to create a sign-up button, add route guards, and call a protected API from Angular.</p></div></p><p>Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any Angular application using the <a href="https://github.com/auth0/auth0-angular" target="_blank" rel="noreferrer noopener">Auth0 Angular SDK</a>.</p><p>To use this quickstart, you’ll need to:</p><ul><li><p>Sign up for a free Auth0 account or log in to Auth0.</p></li><li><p>Have a working Angular project that you want to integrate with. Alternatively, you can view or download a sample application after logging in.</p></li></ul><p></p><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:4200</code>.</p><p>

</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:4200</code>.</p><p>

</p></div></p><h3>Configure Allowed Web Origins</h3><p>An Allowed Web Origin is a URL that you want to be allowed to access to your authentication flow. This must contain the URL of your project. If not properly set, your project will be unable to silently refresh authentication tokens, so your users will be logged out the next time they visit your application or refresh a page.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:4200</code>.</p><p></p></div></p>

## Install the Auth0 Angular SDK


<p>Auth0 provides an <a href="https://github.com/auth0/auth0-angular" target="_blank" rel="noreferrer noopener">Angular SDK</a> to simplify the process of implementing Auth0 authentication and authorization in Angular applications.</p><p>Install the Auth0 Angular SDK by running the following command in your terminal:</p><p><code>npm install @auth0/auth0-angular</code></p><p>The SDK exposes several types that help integrate Auth0 in an Angular application idiomatically, including a module and an authentication service.</p>

## Register and providing Auth0 {{{ data-action="code" data-code="main.ts#7:13" }}}


<p>The SDK exports <code>provideAuth0</code>, which is a provide function that contains all the services required for the SDK to function. To register this with your application:</p><ol><li><p>Open the <code>main.ts </code>file.</p></li><li><p>Import the <code>provideAuth0 </code>function from the <code>@auth0/auth0-angular </code>package.</p></li><li><p>Add <code>provideAuth0 </code>to the application by adding it to the <code>providers </code>inside <code>bootstrapApplication</code>.</p></li><li><p>Inject <code>AuthService </code>into <code>AppComponent</code>.</p></li></ol><p>The <code>provideAuth0</code> function takes the properties <code>domain</code> and <code>clientId</code>; the values of these properties correspond to the <b>Domain</b> and <b>Client ID</b> values that you can find under <b>Settings</b> in the Single-Page Application (SPA) that you registered with Auth0. On top of that, we configure <code>authorizationParams.redirect_uri</code>, which allows Auth0 to redirect the user back to the specific URL after successfully authenticating.</p><p><div class="alert-container" severity="default"><p>If you are using a <a href="https://auth0.com/docs/custom-domains" target="_blank" >custom domain with Auth0</a>, the value of the domain property is the value of your custom domain instead of the value reflected in the &quot;Settings&quot; tab.</p></div></p>

## Add login to your application {{{ data-action="code" data-code="login-button.ts#11:13" }}}


<p>Now that you have configured your Auth0 Application and the Auth0 Angular SDK, you need to set up login for your project. To do this, you will use the SDK’s <code>loginWithRedirect()</code> method from the <code>AuthService</code> class to redirect users to the Auth0 Universal Login page where Auth0 can authenticate them. After a user successfully authenticates, they will be redirected to your application and the callback URL you set up earlier in this quickstart.</p><p>Create a login button in your application that calls <code>loginWithRedirect()</code> when selected.</p><p><div class="checkpoint">Angular Step 4 Checkpoint <div class="checkpoint-default"><p>You should now be able to log in to your application.</p><p>Run your application, and select the login button. Verify that:</p><ul><li><p>you can log in or sign up using a username and password.</p></li><li><p>your application redirects you to the <a href="https://auth0.com/universal-login" target="_blank" >Auth0 Universal Login</a> page.</p></li><li><p>you are redirected to Auth0 for authentication.</p></li><li><p>Auth0 successfully redirects back to your application after authentication.</p></li><li><p>you do not receive any errors in the console related to Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a few things to double check:</p><ul><li><p>make sure you configured the correct <code>authorizationParams.redirect_uri</code></p></li><li><p>make sure you added the<code>LoginButtonComponent</code> button to the module&#39;s declarations</p></li></ul><p>Still having issues? To get more help, check out our <a href="https://auth0.com/docs/" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a>.</p></div>

  </div></p>

## Add logout to your application {{{ data-action="code" data-code="logout-button.ts#19:25" }}}


<p>Users who log in to your project will also need <a href="https://auth0.com/docs/logout/guides/logout-auth0" target="_blank" >a way to log out</a>. The SDK provides a <code>logout()</code> method on the <code>AuthService</code> class that you can use to log a user out of your app. When users log out, they will be redirected to your <a href="https://auth0.com/docs/api/authentication?javascript#logout" target="_blank" >Auth0 logout endpoint</a>, which will then immediately redirect them to your application and the logout URL you set up earlier in this quickstart.</p><p>Create a logout button in your application that calls <code>logout()</code> when selected.</p><p><div class="alert-container" severity="default"><p>The SDK exposes an <code>isAuthenticated$</code> observable on the <code>AuthService</code> class that allows you to check whether a user is authenticated or not. You can render the login and logout buttons conditionally based on the value of the <code>isAuthenticated$</code> observable. Alternatively, you can use a single button to combine both login and logout buttons as well as their conditional rendering.</p></div></p><p><div class="checkpoint">Angular Step 5 checkpoint <div class="checkpoint-default"><p>You should now be able to log out of your application.</p><p>Run your application, log in, and select the logout button. Verify that:</p><ul><li><p>you are redirected to Auth0&#39;s logout endpoint.</p></li><li><p>Auth0 successfully redirects back to your application and the correct logout URL.</p></li><li><p>you are no longer logged in to your application.</p></li><li><p>you do not receive any errors in the console related to Auth0.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a few things to double check:</p><ul><li><p>make sure that you configured the logout URL as one of the <b>Allowed Logout URLS </b>in your application&#39;s <b>Settings</b></p></li><li><p>check that you added the <code>LogoutButtonComponent</code> to the module&#39;s declarations</p></li><li><p>inspect the <a href="https://manage.auth0.com/#/logs" target="_blank" rel="noreferrer noopener">application logs</a> for further errors</p></li></ul><p>Still having issues? To get more help, check out our <a href="https://auth0.com/docs/" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a>.</p></div>

  </div></p>

## Show user profile information {{{ data-action="code" data-code="user-profile.ts" }}}


<p>Now that your users can log in and log out, you will likely want to be able to retrieve the <a href="https://auth0.com/docs/users/concepts/overview-user-profile" target="_blank" >profile information</a> associated with authenticated users. For example, you may want to be able to personalize the user interface by displaying a logged-in user’s name or profile picture.</p><p>The Auth0 Angular SDK provides user information through the <code>user$</code> observable exposed by the <code>AuthService</code> class. Because the <code>user$</code> observable contains sensitive information and artifacts related to the user&#39;s identity, its availability depends on the user&#39;s authentication status. Fortunately, the <code>user$</code> observable is configured to only emit values once the <code>isAuthenticated$</code> observable is true, so there is no need to manually check the authentication state before accessing the user profile data.</p><p>The SDK also exposes an <code>isAuthenticated$</code> observable on the <code>AuthService</code> class that allows you to check whether a user is authenticated or not, which you can use to determine whether to show or hide UI elements, for example.</p><p>Review the <code>UserProfileComponent</code> code in the interactive panel to see examples of how to use these functions.</p><p><div class="checkpoint">Angular Step 6 Checkpoint <div class="checkpoint-default"><p>You should now be able to view user profile information.</p><p>Run your application, and verify that:</p><ul><li><p>user information displays correctly after you have logged in.</p></li><li><p>user information does not display after you have logged out.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a few things to double check:</p><ul><li><p>make sure you are logged in</p></li><li><p>make sure you are trying to access an existing property such as <code>user.name</code></p></li><li><p>make sure you added the <code>UserProfileComponent</code> component to the correct module&#39;s declarations</p></li></ul><p>Still having issues? To get more help, check out our <a href="https://auth0.com/docs/" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a>.</p></div>

  </div></p>
