---
title: Add Login to your ASP.NET OWIN Application
description: This guide demonstrates how to integrate Auth0 with any new or existing ASP.NET OWIN application using the Microsoft.Owin.Security.OpenIdConnect Nuget package.
interactive:  true
files:
 - files/Web
 - files/Startup
 - files/AccountController
github:
  path: https://github.com/auth0-samples/auth0-aspnet-owin-mvc-samples/tree/master/Quickstart/Sample
locale: en-US
---

# Add Login to your ASP.NET OWIN Application


<p>Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing ASP.NET OWIN application using the <code>Microsoft.Owin.Security.OpenIdConnect</code> Nuget package.</p><p></p>

## Configure Auth0


<p>To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.</p><h3>Configure an application</h3><p>Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.</p><p>Any settings you configure using this quickstart will automatically update for your Application in the <a href="https://manage.auth0.com/#/">Dashboard</a>, which is where you can manage your Applications in the future.</p><p>If you would rather explore a complete configuration, you can view a sample application instead.</p><h3>Configure Callback URLs</h3><p>A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000/</code>.</p></div></p><h3>Configure Logout URLs</h3><p>A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.</p><p><div class="alert-container" severity="default"><p>If you are following along with our sample project, set this to <code>http://localhost:3000</code>.</p></div></p>

## Configure the project {{{ data-action="code" data-code="Web.config" }}}


<h3>Install from Nuget</h3><p>To integrate Auth0 with ASP.NET OWIN, you can use the <code>Microsoft.Owin.Security.OpenIdConnect</code> and <code>Microsoft.Owin.Security.Cookies</code> Nuget packages.</p><p><pre><code>Install-Package Microsoft.Owin.Security.OpenIdConnect

Install-Package Microsoft.Owin.Security.Cookies

</code></pre>

</p><p><div class="alert-container" severity="default"><p>Issues occur when configuring the OWIN cookie middleware and System.Web cookies at the same time. To learn more, read <a href="https://github.com/aspnet/AspNetKatana/wiki/System.Web-response-cookie-integration-issues">System.Web cookie integration issues doc</a> to mitigate these problems.</p></div></p><h3>Configure the credentials</h3><p>For the SDK to function properly, set the following properties in <code>Web.config</code>:</p><ul><li><p><code>auth0:Domain</code>: The domain of your Auth0 tenant. You can find this in the Auth0 Dashboard under your application&#39;s <b>Settings </b>in the Domain field. If you are using a <a href="https://auth0.com/docs/custom-domains">custom domain</a>, set this to the value of your custom domain instead.</p></li><li><p><code>auth0:ClientId</code>: The ID of the Auth0 application you created in Auth0 Dashboard. You can find this in the Auth0 Dashboard under your application&#39;s <b>Settings </b>in the Client ID field.</p></li></ul><p></p>

## Configure the middleware {{{ data-action="code" data-code="Startup.cs#18:74" }}}


<p>To enable authentication in your ASP.NET OWIN application, go to the Configuration method of your Startup class and configure the cookie and OIDC middleware.</p><p>It is essential that you register both the cookie middleware and the OpenID Connect middleware as both are required (in that order) for authentication to work. The OpenID Connect middleware handles the authentication with Auth0. Once users have authenticated, their identity is stored in the cookie middleware.</p><p>In the code snippet, AuthenticationType is set to <b>Auth0</b>. Use AuthenticationType in the next section to challenge the OpenID Connect middleware and start the authentication flow. RedirectToIdentityProvider notification event constructs the correct <a data-contentfulid="5sl85ipAFaf8i4CH9wD6VA-en-US">logout URL</a>.</p>

## Add login to your application {{{ data-action="code" data-code="AccountController.cs#7:16" }}}


<p>To allow users to log in to your ASP.NET OWIN application, add a <code>Login</code> action to your controller.</p><p>Call <code>HttpContext.GetOwinContext().Authentication.Challenge</code> and pass <code>&quot;Auth0&quot;</code> as the authentication scheme. This invokes the OIDC authentication handler that was registered earlier. Be sure to specify the corresponding <code>AuthenticationProperties</code>, including a <code>RedirectUri</code>.</p><p>After successfully calling <code>HttpContext.GetOwinContext().Authentication.Challenge</code>, the user redirects to Auth0 and signed in to both the OIDC middleware and the cookie middleware upon being redirected back to your application. This will allow the users to be authenticated on subsequent requests.</p><p><div class="checkpoint">ASP.NET (OWIN) - Step 4 - Checkpoint <div class="checkpoint-default"><p>Now that you have configured Login, run your application to verify that:</p><ul><li><p>Navigating to your <code>Login</code> action will redirect to Auth0</p></li><li><p>Entering your credentials will redirect you back to your application.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple of things to double-check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID are configured correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Add logout to your application {{{ data-action="code" data-code="AccountController.cs#34:39" }}}


<p>From your controller&#39;s action, call <code>HttpContext.GetOwinContext().Authentication.SignOut</code> with the <code>CookieAuthenticationDefaults.AuthenticationType</code> authentication scheme to log the user out of your application.</p><p>Additionally, if you want to log the user out from Auth0 (this might also log them out of other applications that rely on Single Sign-On), call <code>HttpContext.GetOwinContext().Authentication.SignOut</code> with the <code>&quot;Auth0&quot;</code> authentication scheme.</p><p><div class="checkpoint">ASP.NET (OWIN) - Step 5 - Checkpoint <div class="checkpoint-default"><p>Now that you have configured Logout, run your application to verify that:</p><ul><li><p>Navigating to your <code>Logout</code> action ensures the user is logged out.</p></li><li><p>During logout, you redirect to Auth0 and instantly redirect back to your application during log out.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple of things to double-check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>did you save after entering your URLs?</p></li><li><p>make sure the domain and client ID are configured correctly</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>

## Show user profile information {{{ data-action="code" data-code="AccountController.cs#18:32" }}}


<p>After the middleware successfully retrieves the tokens from Auth0, it extracts the user&#39;s information and claims from the ID token and makes them available as <code>ClaimsIdentity</code>. Access the extracted information by using the <code>User</code> property on the controller.</p><p>To create a user profile, retrieve a user&#39;s name, email address, and profile image from the <code>User</code> and pass it to the view from inside your controller.</p><p><div class="checkpoint">ASP.NET (OWIN) - Step 6 - Checkpoint <div class="checkpoint-default"><p>Now that you have set up your action to render the user&#39;s profile, run your application to verify that:</p><ul><li><p>Navigating to your <code>Profile</code> action after being successfully logged in, shows the user&#39;s profile.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>Sorry about that. Here are a couple things to double-check:</p><ul><li><p>make sure the correct application is selected</p></li><li><p>make sure the domain and client ID are configured correctly</p></li><li><p>Did you set <code>openid profile email</code> as the scope?</p></li></ul><p>Still having issues? Check out our <a href="https://auth0.com/docs">documentation</a> or visit our <a href="https://community.auth0.com/">community page</a> to get more help.</p></div>

  </div></p>
