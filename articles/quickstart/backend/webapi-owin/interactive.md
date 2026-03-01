---
title: Add Authorization to Your ASP.NET OWIN Web API Application
description: This tutorial demonstrates how to add authorization to an ASP.NET OWIN API using the standard JWT middleware.
interactive:  true
files:
 - files/Startup
 - files/OpenIdConnectSigningKeyResolver
 - files/ScopeAuthorizeAttribute
 - files/ApiController
github:
  path: Quickstart/Sample
locale: en-US
---

# Add Authorization to Your ASP.NET OWIN Web API Application


<p>Auth0 allows you to add authorization to any kind of application. This guide demonstrates how to integrate Auth0 with any new or existing ASP.NET Owin Web API application using the <code>Microsoft.Owin.Security.Jwt</code> package.</p><p>If you have not created an API in your Auth0 dashboard yet, you can use the interactive selector to create a new Auth0 API or select an existing API for your project.</p><p>To set up your first API through the Auth0 dashboard, review <a data-contentfulid="450QmC9wuUtjlt8UQzRgPd-en-US">our getting started guide</a>.</p><p>Each Auth0 API uses the API Identifier, which your application needs to validate the access token.</p><p><div class="alert-container" severity="default"><p><b>New to Auth0?</b> Learn <a data-contentfulid="43RIpZkDhzyy40WfzZvz4y-en-US">how Auth0 works</a> and read about <a data-contentfulid="6eZFaxxcNpFYwyEI05AXXA-en-US">implementing API authentication and authorization</a> using the OAuth 2.0 framework.</p></div></p><p></p>

## Define permissions


<p>Permissions let you define how resources can be accessed on behalf of the user with a given access token. For example, you might choose to grant read access to the <code>messages</code> resource if users have the manager access level, and a write access to that resource if they have the administrator access level.</p><p>You can define allowed permissions in the <b>Permissions</b> view of the Auth0 Dashboard&#39;s <a href="https://manage.auth0.com/#/apis" target="_blank" rel="noreferrer noopener">APIs</a> section. The following example uses the <code>read:messages</code> scope.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/e61793a2822d095666002c3f65c71ac2/configure-permissions.png" alt="Auth0 Dashboard> Applications > APIs > [Specific API] > Permissions tab" /><p></p>

## Install dependencies


<p>Install the <code>Microsoft.Owin.Security.Jwt</code> NuGetPackage. This package contains the OWIN JWT Middleware necessary to use Auth0 access tokens in the ASP.NET Owin Web API.</p><p><pre><code class="language-powershell">Install-Package Microsoft.Owin.Security.Jwt

</code></pre>

</p><p></p>

## Configure the middleware {{{ data-action="code" data-code="Startup.cs" }}}


<p>Go to the <code>Configuration</code> method of your <code>Startup</code> class and add a call to <code>UseJwtBearerAuthentication</code> passing in the configured <code>JwtBearerAuthenticationOptions</code>.</p><p>The <code>JwtBearerAuthenticationOptions</code> needs to specify your Auth0 API Identifier in the <code>ValidAudience</code> property, and the full path to your Auth0 domain as the <code>ValidIssuer</code>. You will need to configure the <code>IssuerSigningKeyResolver</code> to use the instance of <code>OpenIdConnectSigningKeyResolver</code> to resolve the signing key.</p><p><div class="alert-container" severity="warning"><p><b>Do not forget the trailing slash.</b></p><p>Ensure the URL specified for <code>ValidIssuer</code> contains a trailing forward slash (<code>/</code>). This must match exactly with the JWT issuer claim. API calls will not authenticate correctly if you misconfigured this value.</p><p><b></b></p></div></p>

## Verify the token signature {{{ data-action="code" data-code="OpenIdConnectSigningKeyResolver.cs" }}}


<p>The OWIN JWT middleware does not use Open ID Connect Discovery by default, so you must provide a custom <code>IssuerSigningKeyResolver</code>. </p><p>Create the <code>OpenIdConnectSigningKeyResolver</code> class and ensure to return the correct <code>SecurityKey</code> by implementing <code>GetSigningKey</code>. This class is then used as <code>TokenValidationParameters.IssuerSigningKeyResolver</code> while configuring the middleware in <code>Startup.cs</code>.</p><p><div class="alert-container" severity="default"><p>This custom resolver is deprecated and <a href="https://github.com/auth0/auth0-aspnet-owin/blob/master/SECURITY-NOTICE.md" target="_blank" rel="noreferrer noopener">no longer available</a>. You must provide this custom resolver yourself.</p></div></p>

## Validate scopes {{{ data-action="code" data-code="ScopeAuthorizeAttribute.cs" }}}


<p>The JWT middleware verifies that the access token included in the request is valid; however, it doesn&#39;t yet include any mechanism for checking that the token has the sufficient <b>scope</b> to access the requested resources.</p><p>Create a class called <code>ScopeAuthorizeAttribute</code> which inherits from <code>System.Web.Http.AuthorizeAttribute</code>. This attribute will check that the <code>scope</code> claim issued by your Auth0 tenant is present, and if so, it will ensure that the <code>scope</code> claim contains the requested scope.</p>

## Protect API endpoints {{{ data-action="code" data-code="ApiController.cs" }}}


<p>The routes shown below are available for the following requests:</p><ul><li><p><code>GET /api/public</code>: Available for non-authenticated requests.</p></li><li><p><code>GET /api/private</code>: Available for authenticated requests containing an access token with no additional scopes.</p></li><li><p><code>GET /api/private-scoped</code>: Available for authenticated requests containing an access token with the <code>read:messages </code>scope granted.</p></li></ul><p>The JWT middleware integrates with the standard ASP.NET authentication and authorization mechanisms, so you only need to decorate your controller action with the <code>[Authorize]</code> attribute to secure an endpoint.</p><p>Update the action with the <code>ScopeAuthorize</code> attribute and pass the name of the required <code>scope</code> in the <code>scope</code> parameter. This ensures the correct scope is available to call a specific API endpoint.</p><p><div class="checkpoint">ASP.NET API OWIN Quickstart - Step 6 Checkpoint <div class="checkpoint-default"><p>Now that you have configured your application, run your application and verify that:</p><ul><li><p><code>GET /api/public </code>is available for non-authenticated requests.</p></li><li><p><code>GET /api/private </code>is available for authenticated requests.</p></li><li><p><code>GET /api/private-scoped </code>is available for authenticated requests containing an access token with the <code>read:messages </code>scope.</p></li></ul><p></p></div>

  <div class="checkpoint-success"></div>

  <div class="checkpoint-failure"><p>If your application did not start successfully:</p><ul><li><p>Ensure your configured the <code>ValidIssuer</code> and <code>ValidAudience</code> values correctly</p></li><li><p>Verify you added the token as the <code>Authorization</code> header</p></li><li><p>Ensure the token has the correct scopes. Verify with <a href="https://jwt.io/" target="_blank" rel="noreferrer noopener">jwt.io</a>.</p></li></ul><p>Still having issues? Check out our <a href="/docs" target="_self" >documentation</a> or visit our <a href="https://community.auth0.com/" target="_blank" rel="noreferrer noopener">community page</a> to get more help.</p></div>

  </div></p>
