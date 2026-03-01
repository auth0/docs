---
title: Add Login to Your Flutter Application
description: This guide demonstrates how to integrate Auth0 with a Flutter application using the Auth0 Flutter SDK.
interactive:  true
files:
 - files/main_view
 - files/profile_view
github:
  path: sample
locale: en-US
---

# Add Login to Your Flutter Application


<p>Auth0 allows you to quickly add authentication and access user profile information in your application. This guide demonstrates how to integrate Auth0 with a Flutter application using the <a href="https://github.com/auth0/auth0-flutter" target="_blank" rel="noreferrer noopener">Auth0 Flutter SDK</a>.</p><p><div class="alert-container" severity="default"><p>The Flutter SDK currently only supports Flutter applications running on Android, iOS, or Web platforms.</p></div></p><p>This quickstart assumes you already have a <a href="https://flutter.dev/" target="_blank" rel="noreferrer noopener">Flutter</a> application up and running. If not, check out the <a href="https://docs.flutter.dev/get-started/install" target="_blank" rel="noreferrer noopener">Flutter &quot;getting started&quot; guides</a> to get started with a simple app.</p><p>You should also be familiar with the <a href="https://docs.flutter.dev/reference/flutter-cli" target="_blank" rel="noreferrer noopener">Flutter command line tool</a>.</p><p></p>

## Configure Auth0


<p>When you signed up for Auth0, a new application was created for you, or you could have created a new one. You will need some details about that application to communicate with Auth0. You can get these details from the <a href="https://manage.auth0.com/#/applications" target="_blank" rel="noreferrer noopener">Application Settings</a> section in the Auth0 dashboard.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/6SC7KnyzCyO8cwXQfril1X/c0d6756c28de0ddcbe938307e529d47a/client_settings.png" alt="" /><p><div class="alert-container" severity="default"><p>When using the Default App with a Native or Single Page Application, ensure to update the <b>Token Endpoint Authentication Method</b> to <code>None</code> and set the <b>Application Type</b> to either <code>SPA</code> or <code>Native</code>.</p></div></p><p>You need the following information:</p><ul><li><p><b>Domain</b></p></li><li><p><b>Client ID</b></p></li></ul><p><b></b><div class="alert-container" severity="default"><p>If you download the sample from the top of this page, these details are filled out for you.</p></div></p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application where Auth0 redirects the user after they have authenticated. The callback URL for your app must be added to the <b>Allowed Callback URLs</b> field in your <a href="https://manage.auth0.com/#/applications" target="_blank" rel="noreferrer noopener">Application Settings</a>. If this field is not set, users will be unable to log in to the application and will get an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with the sample project you downloaded from the top of this page, you should set the <b>Allowed Callback URL</b> to <code>http://localhost:3000</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that Auth0 can return to after the user has been logged out of the authorization server. This is specified in the <code>returnTo</code> query parameter. The logout URL for your app must be added to the <b>Allowed Logout URLs</b> field in your <a href="https://manage.auth0.com/#/applications" target="_blank" rel="noreferrer noopener">Application Settings</a>. If this field is not set, users will be unable to log out from the application and will get an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with the sample project you downloaded from the top of this page, the logout URL you need to add to the <b>Allowed Logout URLs</b> field is <code>http://localhost:3000</code>.</p></div></p><h3>Configure Allowed Web Origins</h3><p>You need to add the URL for your app to the <b>Allowed Web Origins</b> field in your <a href="https://manage.auth0.com/#/applications/{yourClientId}/settings" target="_blank" rel="noreferrer noopener">Application Settings</a>. If you don&#39;t register your application URL here, the application will be unable to silently refresh the authentication tokens and your users will be logged out the next time they visit the application, or refresh the page.</p><p><div class="alert-container" severity="default"><p>If you are following along with the sample project you downloaded from the top of this page, you should set the <b>Allowed Web Origins</b> to <code>http://localhost:3000</code>.</p></div></p><p></p>

## Install the Auth0 Flutter SDK


<p>Add the Auth0 Flutter SDK into the project:</p><p><pre><code class="language-javascript">flutter pub add auth0_flutter

</code></pre>

</p><p>Add the following script tag to your <code>index.html</code> page:</p><p><pre><code class="language-javascript">&lt;script src=&quot;https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js&quot; defer&gt;&lt;/script&gt;

</code></pre>

</p>

## Add login to your application {{{ data-action="code" data-code="main_view.dart" }}}


<p><a href="https://auth0.com/docs/authenticate/login/auth0-universal-login" target="_blank" >Universal Login</a> is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security, and the fullest array of features.</p><p>Integrate Auth0 Universal Login in your Flutter Web app by using the <code>Auth0Web</code> class. Redirect your users to the Auth0 Universal Login page using <code>loginWithRedirect()</code>.</p><p><div class="alert-container" severity="default"><p>You will normally need to specify the <code>redirectUrl</code> parameter to <code>loginWithRedirect</code>. Omitting this will cause Auth0 to use the <a href="https://auth0.com/docs/authenticate/login/auth0-universal-login/configure-default-login-routes" target="_blank" >default login route</a>, which is not configured by default.</p></div></p><p>When a user logs in, they are redirected back to your application. You are then able to access the ID and access tokens for this user by calling <code>onLoad</code> during startup and handling the credentials that are given to you:</p><p><pre><code class="language-javascript">auth0.onLoad().then((final credentials) =&gt; setState(() {

    // Handle or store credentials here

    _credentials = credentials;

  }));

</code></pre>

</p><p><div class="checkpoint">Flutter web step 3 checkpoint <div class="checkpoint-default"><p>Add a button to your app that calls <code>loginWithRedirect()</code> and logs the user into your app. Verify that you are redirected to Auth0 for authentication and then back to your application.</p><p>Verify that you can access <code>credentials</code> as a result of calling <code>onLoad</code> and that you&#39;re able to access the ID and access tokens.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not launch successfully:</p><ul><li><p>Ensure the Allowed Callback URLs are set properly</p></li><li><p>Verify you saved your changes after entering your URLs</p></li><li><p>Make sure the domain and client ID values are imported correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Add logout to your application


<p>To log users out, redirect them to the Auth0 logout endpoint to clear their login session by calling the Auth0 Flutter SDK <code>logout()</code>. <a href="https://auth0.com/docs/authenticate/login/logout" target="_blank" >Read more about logging out of Auth0</a>.</p><p><div class="alert-container" severity="default"><p>You will normally want to specify <code>returnToUrl</code> when calling <code>logout</code>, otherwise Auth0 <a href="https://auth0.com/docs/authenticate/login/logout/redirect-users-after-logout" target="_blank" >will default to the first URL in the Allowed Logout URLs list</a>.</p></div></p><p><div class="checkpoint">Flutter web step 4 checkpoint <div class="checkpoint-default"><p>Add a button to your app that calls <code>logout()</code> and logs the user out of your application. When you select it, verify that your Flutter app redirects you to the logout endpoint and back again. You should not be logged in to your application.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not log out successfully:</p><ul><li><p>Ensure the Allowed Logout URLs are set properly</p></li><li><p>Verify you saved your changes after entering your URLs</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Show user profile information {{{ data-action="code" data-code="profile_view.dart" }}}


<p>The user profile automatically retrieves user profile properties for you when the page loads, and can be accessed and stored by calling <code>onLoad</code> during application startup. The returned object from <code>onLoad</code> contains a <code>user</code> property with all the user profile properties. This is internally populated by decoding the ID token.</p><p><div class="checkpoint">Flutter web step 5 checkpoint <div class="checkpoint-default"><p>Log in and inspect the <code>user</code> property on the result. Verify the current user&#39;s profile information, such as <code>email</code> or <code>name</code>.</p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not return user profile information:</p><ul><li><p>Verify the ID token is valid</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>
