---
title: Add Authorization to Your ASP.NET Core Web API Application
description: This tutorial demonstrates how to add authorization to an ASP.NET Core Web API application using the standard JWT middleware.
interactive:  true
files:
 - files/appsettings
 - files/Program
 - files/HasScopeHandler
 - files/HasScopeRequirement
 - files/ApiController
github:
  path: https://github.com/auth0-samples/auth0-aspnetcore-webapi-samples/tree/master/Quickstart/01-Authorization
locale: en-US
---

# Add Authorization to Your ASP.NET Core Web API Application


<p>Auth0 allows you to add authentication and access user profile information in almost any application type quickly. This guide demonstrates how to integrate Auth0 with any new or existing ASP.NET Web API application using the <code>Microsoft.AspNetCore.Authentication.JwtBearer</code> package.</p><p>If you haven&#39;t created an API in your Auth0 dashboard yet, you can use the interactive selector to create a new Auth0 API or select an existing API that represents the project you want to integrate with.</p><p>Alternatively, you can <a data-contentfulid="450QmC9wuUtjlt8UQzRgPd-en-US">read our getting started guide</a>, which will help you set up your first API through the Auth0 Dashboard.</p><p>Note that every API in Auth0 is configured using an API Identifier; your application code will use the API Identifier as the Audience to validate the access token.</p><p><div class="alert-container" severity="default"><p><b>New to Auth0?</b> Learn <a data-contentfulid="43RIpZkDhzyy40WfzZvz4y-en-US">how Auth0 works</a> and read about <a data-contentfulid="6eZFaxxcNpFYwyEI05AXXA-en-US">implementing API authentication and authorization</a> using the OAuth 2.0 framework.</p></div></p><p></p><p></p>

## Define permissions


<p>Permissions let you define how resources can be accessed on behalf of the user with a given access token. For example, you might choose to grant read access to the <code>messages</code> resource if users have the manager access level, and grant write access to that resource if they have the administrator access level.</p><p>You can define allowed permissions in the <b>Permissions</b> view of the Auth0 Dashboard&#39;s <a href="https://manage.auth0.com/#/apis">APIs</a> section. The following example uses the <code>read:messages</code> scope.</p><img src="//images.ctfassets.net/cdy7uua7fh8z/1s3Yp5zqJiKiSWqbPSezNO/e61793a2822d095666002c3f65c71ac2/configure-permissions.png" alt="Auth0 Dashboard> Applications > APIs > [Specific API] > Permissions tab" /><p></p>

## Install dependencies


<p>To allow your application to validate access tokens, add a reference to the <code>Microsoft.AspNetCore.Authentication.JwtBearer</code> NuGet package:</p><p><pre><code class="language-powershell">Install-Package Microsoft.AspNetCore.Authentication.JwtBearer

</code></pre>

</p>

## Configure the middleware {{{ data-action="code" data-code="Program.cs" }}}


<p>Set up the authentication middleware by configuring it in your application&#39;s <code>Program.cs</code> file:</p><ol><li><p>Register the authentication services by making a call to the <code>AddAuthentication</code> method. Configure <code>JwtBearerDefaults.AuthenticationScheme</code> as the default scheme.</p></li><li><p>Register the JWT Bearer authentication scheme by making a call to the <code>AddJwtBearer</code> method. Configure your Auth0 domain as the authority and your Auth0 API Identifier as the audience, and be sure that your Auth0 domain and API Identifier are set in your application&#39;s <b>appsettings.json</b> file.

<div class="alert-container" severity="default"><p>In some cases, the access token will not have a <code>sub</code> claim; in this case, the <code>User.Identity.Name</code> will be <code>null</code>. If you want to map a different claim to <code>User.Identity.Name</code>, add it to <code>options.TokenValidationParameters</code> within the <code>AddJwtBearer()</code> call.</p></div></p></li><li><p>Add the authentication and authorization middleware to the middleware pipeline by adding calls to the <code>UseAuthentication </code>and <code>UseAuthorization </code>methods under the <code>var app = builder.Build(); </code>method.</p></li></ol><p></p><p></p>

## Validate scopes {{{ data-action="code" data-code="HasScopeHandler.cs" }}}


<p>To ensure that an access token contains the correct scopes, use <a href="https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies">Policy-Based Authorization</a> in the ASP.NET Core:</p><ol><li><p>Create a new authorization requirement called <code>HasScopeRequirement</code>, which will check whether the <code>scope </code>claim issued by your Auth0 tenant is present, and if so, will check that the claim contains the requested scope.</p></li><li><p>Under your <code>Program.cs </code>file&#39;s <code>var builder = WebApplication.CreateBuilder(args); </code>method, add a call to the <code>app.AddAuthorization </code>method.</p></li><li><p>Add policies for scopes by calling <code>AddPolicy </code>for each scope.</p></li><li><p>Register a singleton for the <code>HasScopeHandler </code>class.</p></li></ol><p></p>

## Protect API endpoints {{{ data-action="code" data-code="ApiController.cs" }}}


<p>The JWT middleware integrates with the standard ASP.NET Core <a href="https://docs.microsoft.com/en-us/aspnet/core/security/authentication/">Authentication</a> and <a href="https://docs.microsoft.com/en-us/aspnet/core/security/authorization/">Authorization</a> mechanisms.</p><p>To secure an endpoint, add the <code>[Authorize]</code> attribute to your controller action (or the entire controller if you want to protect all of its actions).</p><p>When securing endpoints that require specific scopes, make sure that the correct scope is present in the <code>access_token</code>. To do so, add the <code>Authorize</code> attribute to the <code>Scoped</code> action and pass <code>read:messages</code> as the <code>policy</code> parameter.</p>

## Call your API

The way in which you call your API depends on the type of application you are developing and the framework you are using. To learn more, read the relevant application Quickstart:

* <a href="/quickstart/spa" target="_blank" rel="noreferrer">Single-Page Applications</a>
* <a href="/quickstart/native" target="_blank" rel="noreferrer">Mobile / Native Application</a>

### Get an access token

Regardless of the type of application you are developing or the framework you are using, to call your API, you need an access token.

If you are calling your API from a Single-Page Application (SPA) or a Native application, after the authorization flow completes, you will get an access token.

If you are calling the API from a command-line tool or another service where a user entering credentials does not exist, use the <a href="/api/authentication#client-credentials" target="_blank" rel="noreferrer">OAuth Client Credentials Flow</a>. To do so, register a <a href="${manage_url}/#/applications" target="_blank" rel="noreferrer">Machine-to-Machine Application</a>, and pass in the **Client ID** as the `client_id` parameter, the **Client Secret** as the `client_secret` parameter, and the API Identifier (the same value you used to configure the middleware earlier in this quickstart) as the `audience` parameter when making the following request:

:::note
To learn more about getting the Client ID and Client Secret for your machine-to-machine application, read <a href="/get-started/dashboard/application-settings" target="_blank" rel="noreferrer">Application Settings</a>.
:::

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
  ],
  "postData": {
    "mimeType": "application/x-www-form-urlencoded",
    "params": [
      {
        "name": "grant_type",
        "value": "client_credentials"
      },
      {
        "name": "client_id",
        "value": "${account.clientId}"
      },
      {
        "name": "client_secret",
        "value": "YOUR_CLIENT_SECRET"
      },
      {
        "name": "audience",
        "value": "${apiIdentifier}"
      }
    ]
  }
}
```

### Call a secure endpoint

Now that you have an access token, you can use it to call secure API endpoints. When calling a secure endpoint, you must include the access token as a Bearer token in the **Authorization** header of the request. For example, you can make a request to the `/api/private` endpoint: 

```har
{
  "method": "GET",
  "url": "http://localhost:3010/api/private",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN" }
  ]
}
```

Call the `/api/private-scoped` endpoint in a similar way, but ensure that the API permissions are configured correctly and that the access token includes the `read:messages` scope.

::::checkpoint

:::checkpoint-default
You should now be able to call the `/api/private` and `/api/private-scoped` endpoints. 

Run your application, and verify that:

- `GET /api/private` is available for authenticated requests.
- `GET /api/private-scoped` is available for authenticated requests containing an access token with the `read:messages` scope.

:::

:::checkpoint-failure
Sorry about that. Here are a few things to double check:

- make sure `ValidIssuer` and `ValidAudience` are configured correctly
- make sure the token is added as the `Authorization` header
- check that the token has the correct scopes (you can use <a href="https://jwt.io/" target="_blank" rel="noreferrer">jwt.io</a> to verify)

Still having issues? To get more help, check out our <a href="https://auth0.com/docs" target="_blank" rel="noreferrer">documentation</a> or visit our <a href="https://community.auth0.com" target="_blank" rel="noreferrer">community page</a>.

:::

::::
