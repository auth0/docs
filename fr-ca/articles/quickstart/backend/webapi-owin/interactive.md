---
title: Add Authorization to an ASP.NET Owin Web API application
description: This tutorial demonstrates how to add authorization to an ASP.NET OWIN API using the standard JWT middleware.
budicon: 448
topics:
  - quickstart
  - backend
  - webapi-owin
github:
  path: Quickstart/Sample
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/startup
  - files/openid-connect-signing-key-resolver
  - files/scope-authorize-attribute
  - files/api-controller
---

# Add Authorization to Your ASP.NET Owin Web API Application
Auth0 allows you to add authorization to any kind of application. This guide demonstrates how to integrate Auth0 with any new or existing ASP.NET Owin Web API application using the `Microsoft.Owin.Security.Jwt` package.

If you have not created an API in your Auth0 dashboard yet, you can use the interactive selector to create a new Auth0 API or select an existing API for your project. 

To set up your first API through the Auth0 dashboard, review [our getting started guide](get-started/auth0-overview/set-up-apis).

Each Auth0 API uses the API Identifier, which your application needs to validate the access token.

<!-- markdownlint-disable MD041 MD002 -->

<%= include('../../../_includes/_api_auth_intro') %>

## Define permissions
<%= include('../_includes/_api_scopes_access_resources') %>


## Install dependencies

Install the `Microsoft.Owin.Security.Jwt` NuGetPackage. This package contains the OWIN JWT Middleware necessary to use Auth0 access tokens in the ASP.NET Owin Web API.
```bash
Install-Package Microsoft.Owin.Security.Jwt
```

## Configure the middleware {{{ data-action=code data-code="Startup.cs" }}}

Go to the `Configuration` method of your `Startup` class and add a call to `UseJwtBearerAuthentication` passing in the configured `JwtBearerAuthenticationOptions`.

The `JwtBearerAuthenticationOptions` needs to specify your Auth0 API Identifier in the `ValidAudience` property, and the full path to your Auth0 domain as the `ValidIssuer`. You will need to configure the `IssuerSigningKeyResolver` to use the instance of `OpenIdConnectSigningKeyResolver` to resolve the signing key:

::: panel-warning Do not forget the trailing slash
Ensure the URL specified for `ValidIssuer` contains a trailing forward slash (`/`). This must match exactly with the JWT issuer claim. API calls will not authenticate correctly if you misconfigured this value.
:::

## Verifying the token signature {{{ data-action=code data-code="OpenIdConnectSigningKeyResolver.cs" }}}
The OWIN JWT middleware does not use Open ID Connect Discovery by default, so you must provide a custom `IssuerSigningKeyResolver`. Create the `OpenIdConnectSigningKeyResolver` class and ensure to return the correct `SecurityKey` by implementing `GetSigningKey`.
This class is then used as `TokenValidationParameters.IssuerSigningKeyResolver` while configuring the middleware in `Startup.cs`.

:::note
This custom resolver is deprecated and [no longer available](https://github.com/auth0/auth0-aspnet-owin/blob/master/SECURITY-NOTICE.md). You must provider this customer resolver yourself.
:::

## Validate scopes {{{ data-action=code data-code="ScopeAuthorizeAttribute.cs" }}}

The JWT middleware verifies that the access token included in the request is valid; however, it doesn't yet include any mechanism for checking that the token has the sufficient **scope** to access the requested resources.

Create a class called `ScopeAuthorizeAttribute` which inherits from `System.Web.Http.AuthorizeAttribute`. This attribute will check that the `scope` claim issued by your Auth0 tenant is present, and if so it will ensure that the `scope` claim contains the requested scope.

## Protect API endpoints {{{ data-action=code data-code="ApiController.cs" }}}

<%= include('../_includes/_api_endpoints') %>

The JWT middleware integrates with the standard ASP.NET authentication and authorization mechanisms, so you only need to decorate your controller action with the `[Authorize]` attribute to secure an endpoint.

Update the action with the `ScopeAuthorize` attribute and pass the name of the required `scope` in the `scope` parameter. This ensures the correct scope is available to call a specific API endpoing.

::::checkpoint

:::checkpoint-default

Now that you have configured your application, run your application to verify that:
* `GET /api/public` is available for non-authenticated requests.
* `GET /api/private` is available for authenticated requests.
* `GET /api/private-scoped` is available for authenticated requests containing an access token with the `read:messages` scope.

:::

:::checkpoint-failure
If your application did not start successfully:
* Ensure your configured the  `ValidIssuer` and `ValidAudience` values correctly
* Verify you added the token as the `Authorization` header
* Ensure the token has the correct scopes. Verify with [jwt.io](https://jwt.io/).

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::
