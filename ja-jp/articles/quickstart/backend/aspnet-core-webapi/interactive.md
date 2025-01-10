---
title: Add Authorization to an ASP.NET Core Web API application
description: This tutorial demonstrates how to add authorization to an ASP.NET Core Web API application using the standard JWT middleware.
budicon: 500
topics:
    - quickstart
    - backend
    - aspnetcore
    - web-api
github:
    path: Quickstart/01-Authorization
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/appsettings
  - files/configure-middleware
  - files/has-scope-handler
  - files/has-scope-requirement
  - files/api-controller
---

# Add Authorization to Your ASP.NET Core Web API Application

Auth0 allows you to add authentication and access user profile information in almost any application type quickly. This guide demonstrates how to integrate Auth0 with any new or existing ASP.NET Web API application using the `Microsoft.AspNetCore.Authentication.JwtBearer` package.

If you haven't created an API in your Auth0 dashboard yet, you can use the interactive selector to create a new Auth0 API or select an existing API that represents the project you want to integrate with. 

Alternatively, you can [read our getting started guide](/get-started/auth0-overview/set-up-apis), which will help you set up your first API through the Auth0 Dashboard.

Note that every API in Auth0 is configured using an API Identifier; your application code will use the API Identifier as the Audience to validate the access token.

<!-- markdownlint-disable MD041 MD002 -->

<%= include('../../../_includes/_api_auth_intro') %>

## Define permissions
<%= include('../_includes/_api_scopes_access_resources') %>

## Install dependencies

To allow your application to validate access tokens, add a reference to the `Microsoft.AspNetCore.Authentication.JwtBearer` Nuget package:

```text
Install-Package Microsoft.AspNetCore.Authentication.JwtBearer
```

## Configure the middleware {{{ data-action=code data-code="Startup.cs" }}}

Set up the authentication middleware by configuring it in your application's `Program.cs` file:

1. Register the authentication services by making a call to the `AddAuthentication` method. Configure `JwtBearerDefaults.AuthenticationScheme` as the default scheme.
 
2. Register the JWT Bearer authentication scheme by making a call to the `AddJwtBearer` method. Configure your Auth0 domain as the authority and your Auth0 API Identifier as the audience, and be sure that your Auth0 domain and API Identifier are set in your application's **appsettings.json** file. 

:::note
In some cases, the access token will not have a `sub` claim; in this case, the `User.Identity.Name` will be `null`. If you want to map a different claim to `User.Identity.Name`, add it to `options.TokenValidationParameters` within the `AddJwtBearer()` call.
:::

3. Add the authentication and authorization middleware to the middleware pipeline by adding calls to the `UseAuthentication` and `UseAuthorization` methods under the `var app = builder.Build();` method.

## Validate scopes {{{ data-action=code data-code="HasScopeHandler.cs" }}}

To ensure that an access token contains the correct scopes, use [Policy-Based Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies) in the ASP.NET Core:

1. Create a new authorization requirement called `HasScopeRequirement`, which will check whether the `scope` claim issued by your Auth0 tenant is present, and if so, will check that the claim contains the requested scope.
2. Under your `Program.cs` file's `var builder = WebApplication.CreateBuilder(args);` method, add a call to the `app.AddAuthorization` method.
3. Add policies for scopes by calling `AddPolicy` for each scope.
4. Register a singleton for the `HasScopeHandler` class.

## Protect API endpoints {{{ data-action=code data-code="ApiController.cs" }}}

The JWT middleware integrates with the standard ASP.NET Core [Authentication](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/) and [Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/) mechanisms.

To secure an endpoint, add the `[Authorize]` attribute to your controller action (or the entire controller if you want to protect all of its actions).

When securing endpoints that require specific scopes, make sure that the correct scope is present in the `access_token`. To do so, add the `Authorize` attribute to the `Scoped` action and pass `read:messages` as the `policy` parameter.

## Call your API

The way in which you call your API depends on the type of application you are developing and the framework you are using. To learn more, read the relevant application Quickstart:

* [Single-Page Applications](/quickstart/spa)
* [Mobile / Native Application](/quickstart/native)

### Get an access token

Regardless of the type of application you are developing or the framework you are using, to call your API, you need an access token.

If you are calling your API from a Single-Page Application (SPA) or a Native application, after the authorization flow completes, you will get an access token.

If you are calling the API from a command-line tool or another service where a user entering credentials does not exist, use the [OAuth Client Credentials Flow](/api/authentication#client-credentials). To do so, register a [Machine-to-Machine Application](${manage_url}/#/applications), and pass in the **Client ID** as the `client_id` parameter, the **Client Secret** as the `client_secret` parameter, and the API Identifier (the same value you used to configure the middleware earlier in this quickstart) as the `audience` parameter when making the following request:

:::note
To learn more about getting the Client ID and Client Secret for your machine-to-machine application, read [Application Settings](/get-started/dashboard/application-settings).
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
- check that the token has the correct scopes (you can use [jwt.io](https://jwt.io/) to verify)

Still having issues? To get more help, check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com).

:::

::::
