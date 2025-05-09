---
title: Add Login to Your ASP.NET MVC Application
description: This guide demonstrates how to integrate Auth0 with any new or existing ASP.NET MVC application using the Auth0.AspNetCore.Authentication SDK.
interactive:  true
files:
 - files/Program
 - files/appsettings
 - files/AccountController
github:
  path: Quickstart/Sample
locale: en-US
---

# Add Login to Your ASP.NET MVC Application


<p>Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing ASP.NET MVC application using the <b>Auth0.AspNetCore.Authentication</b> SDK.</p><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/" target="_blank" rel="noreferrer noopener">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000/callback</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p><p></p></div></p>

## Install and Configure the SDK {{{ data-action="code" data-code="Program.cs" }}}


<h3>Install from Nuget</h3><p>To integrate Auth0 with ASP.NET Core you can use our SDK by installing the <code>Auth0.AspNetCore.Authentication</code> <a href="https://www.nuget.org/packages/Auth0.AspNetCore.Authentication/" target="_blank" rel="noreferrer noopener">Nuget package</a> to your application.</p><p></p><h3>Configure the middleware</h3><p>To enable authentication in your ASP.NET Core application, use the middleware provided by the SDK. Go to the <code>Program.cs</code> file and call <code>builder.Services.AddAuth0WebAppAuthentication()</code> to register the SDK&#39;s middleware.</p><p>Ensure to configure the <code>Domain</code> and <code>ClientId</code>, these are required fields to ensure the SDK knows which Auth0 tenant and application it should use.</p><p>Make sure you have enabled authentication and authorization in your <code>Program.cs</code> file.</p>

## Login {{{ data-action="code" data-code="AccountController.cs" }}}


<p>To allow users to login to your ASP.NET MVC application, add a <code>Login</code> action to your controller.</p><p>Call <code>HttpContext.ChallengeAsync()</code> and pass <code>Auth0Constants.AuthenticationScheme</code> as the authentication scheme. This will invoke the OIDC authentication handler that our SDK registers internally. Be sure to also specify the corresponding <code>authenticationProperties</code>, which you can construct using the <code>LoginAuthenticationPropertiesBuilder</code>.</p><p>After succesfully calling <code>HttpContext.ChallengeAsync()</code>, the user will be redirected to Auth0 and signed in to both the OIDC middleware and the cookie middleware upon being redirected back to your application. This will allow the users to be authenticated on subsequent requests.</p><p><div class="checkpoint">ASP.NET MWC Step 3 Checkpoint <div class="checkpoint-default"><p>Now that you have configured Login, run your application to verify that:</p><ul><li><p>Navigating to your <code>Login </code>action will redirect to Auth0</p></li><li><p>Entering your credentials will redirect you back to your application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID are configured correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Display User Profile


<p>After the middleware has successfully retrieved the tokens from Auth0, it will extract the user&#39;s information and claims from the ID Token and makes them available as the <code>User.Claims</code> property on the controller.</p><p>You can create a custom user profile page for displaying a user&#39;s name, email address, and profile image, by retrieving the corresponding information from the <code>User</code> and pass it to the view from inside your controller.</p><p><div class="checkpoint">ASP.NET MWC Step 4 Checkpoint <div class="checkpoint-default"><p>Now that you have set up your action to render the user&#39;s profile, run your application to verify that:</p><ul><li><p>Navigating to your <code>Profile </code>action after being succesfully logged in, shows the user&#39;s profile.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID are configured correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>

## Logout


<p>Logging out the user from your own application can be done by calling <code>HttpContext.SignOutAsync</code> with the <code>CookieAuthenticationDefaults.AuthenticationScheme</code> authentication scheme from inside your controller&#39;s action.</p><p>Additionally, If you also want to log the user out from Auth0 (this might also log them out of other applications that rely on Single Sign On), call <code>HttpContext.SignOutAsync</code> with the <code>Auth0Constants.AuthenticationScheme</code> authentication scheme as well as the appropriate <code>authenticationProperties</code> that can be constructed using the <code>LogoutAuthenticationPropertiesBuilder</code>.</p><p></p><p><div class="checkpoint">ASP.NET MWC Step 5 Checkpoint <div class="checkpoint-default"><p>Now that you have configured Logout, run your application to verify that:</p><ul><li><p>Navigating to your <code>Logout </code>action will ensure the user is logged out.</p></li><li><p>When also logging out from Auth0, you should be redirected to Auth0 and instantly redirected back to your own application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here&#39;s a couple things to double check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID are configured correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>
