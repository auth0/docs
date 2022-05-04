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

# Add Authorization to an ASP.NET Core Web API application.
Auth0 allows you to add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing ASP.NET Web API application using the `Microsoft.AspNetCore.Authentication.JwtBearer` package.

If you haven't created an API in your Auth0 dashboard yet, you can use the interactive selector to create a new Auth0 API or select an existing API that represents the project you want to integrate with. 

Alternatively, you can read [our getting started guide](get-started/auth0-overview/set-up-apis) that helps you set up your first API through the Auth0 dashboard.

Every API in Auth0 is configured using an API Identifier that your application code will use as the Audience to validate the access token.

<!-- markdownlint-disable MD041 MD002 -->

<%= include('../../../_includes/_api_auth_intro') %>

## Define permissions
<%= include('../_includes/_api_scopes_access_resources') %>

## Install dependencies

Add a reference to the `Microsoft.AspNetCore.Authentication.JwtBearer` Nuget package, which is needed in order to validate Access Tokens.

```text
Install-Package Microsoft.AspNetCore.Authentication.JwtBearer
```

## Configure the middleware {{{ data-action=code data-code="Startup.cs" }}}

The middleware can be configured from your application's `Startup.cs` file. In the `ConfigureServices` method, register the authentication services:

1. Make a call to the `AddAuthentication` method. Configure `JwtBearerDefaults.AuthenticationScheme` as the default schemes.  
2. Make a call to the `AddJwtBearer` method to register the JWT Bearer authentication scheme. Configure your Auth0 domain as the authority, and your Auth0 API identifier as the audience. In some cases, the access token will not have a `sub` claim which leads to `User.Identity.Name` being `null`. If you want to map a different claim to `User.Identity.Name`, add it to `options.TokenValidationParameters` within the `AddJwtBearer()` call.

To add the authentication and authorization middleware to the middleware pipeline, add a call to the `UseAuthentication` and `UseAuthorization` methods in your Startup's `Configure` method.

The code expects the Auth0 Domain and Audience are set in the application's **appsettings.json** file. 

## Validate scopes {{{ data-action=code data-code="HasScopeHandler.cs" }}}

To make sure that an Access Token contains the correct scope, use the [Policy-Based Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/policies) in ASP.NET Core.

Create a new authorization requirement called `HasScopeRequirement`. This requirement checks if the `scope` claim issued by your Auth0 tenant is present. If the `scope` claim exists, the requirement checks if the `scope` claim contains the requested scope.

In your Startup's `ConfigureServices` method, add a call to the `AddAuthorization` method. To add policies for the scopes, call `AddPolicy` for each scope. Also ensure that you register the `HasScopeHandler` as a singleton.

## Protect API Endpoints {{{ data-action=code data-code="ApiController.cs" }}}

The JWT middleware integrates with the standard ASP.NET Core [Authentication](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/) and [Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/) mechanisms. 

To secure an endpoint, add the `[Authorize]` attribute to your controller action (or the entire controller if you want to protect all of its actions).

To secure endpoints that require specific scopes, we need to make sure that the correct scope is present in the `access_token`. To do that, add the `Authorize` attribute to the `Scoped` action and pass `read:messages` as the `policy` parameter. 


## Calling Your API 

### Obtaining an Access Token

If you are calling the API from a Single-Page Application or a Mobile/Native application, after the authorization flow is completed, you will get an Access Token. How you get the token and how you make the call to the API will be dependent on the type of application you are developing and the framework you are using. For more information refer to the relevant application Quickstarts which contain detailed instructions:

* [Single-Page Applications](/quickstart/spa)
* [Mobile / Native Application](/quickstart/native)

If you are calling the API from a command-line tool or another service, where there isn't a user entering their credentials, you need to use the [OAuth Client Credentials flow](/api/authentication#client-credentials). To do that, register a [Machine to Machine Application](${manage_url}/#/applications), and then subsequently use the **Client ID** and **Client Secret** of this application when making the request below and pass those along in the `client_id` and `client_secret` parameters respectively. Also include the Audience for the API you want to call, ensure this has the same value as the audience used to configure the middleware in your ASP.NET Core Web API.

:::note
Read [Application Settings](https://auth0.com/docs/get-started/dashboard/application-settings) for more information on getting the Client ID and Client Secret for your machine-to-machine app.
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

### Calling a secure endpoint

You can make a request to the `/api/private` and `/api/private-scoped` endpoints, including the Access Token as a Bearer token in the **Authorization** header of the request:

```har
{
  "method": "GET",
  "url": "http://localhost:3010/api/private",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN" }
  ]
}
```

In order to call the `/api/private-scoped` endpoint, ensure the permissions are configured correctly and that the Access Token being used includes the `read:messages` scope.
