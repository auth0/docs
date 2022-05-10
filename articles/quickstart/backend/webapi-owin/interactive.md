---
title: Add Authorization to an ASP.NET Owin Web API application
description: This tutorial demonstrates how to add authorization to an ASP.NET OWIN API using the standard JWT middleware.
budicon: 448
topics:
  - quickstart
  - backend
  - webapi-owin
github:
  path: Quickstart/01-Authorization
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/startup
  - files/openid-connect-signing-key-resolver
  - files/scope-authorize-attribute
  - files/api-controller
---

# Add Authorization to an ASP.NET Owin Web API application.
Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing ASP.NET Owin Web API application using the `Microsoft.Owin.Security.Jwt` package.

If you haven't created an API in your Auth0 dashboard yet, you can use the interactive selector to create a new Auth0 API or select an existing API that represents the project you want to integrate with. 

Alternatively, you can read [our getting started guide](get-started/auth0-overview/set-up-apis) that helps you set up your first API through the Auth0 dashboard.

Every API in Auth0 is configured using an API Identifier that your application code will use as the Audience to validate the access token.

<!-- markdownlint-disable MD041 MD002 -->

<%= include('../../../_includes/_api_auth_intro') %>

## Define permissions
<%= include('../_includes/_api_scopes_access_resources') %>


## Install dependencies

To use Auth0 Access Tokens with ASP.NET Owin Web API you will use the OWIN JWT Middleware which is available in the `Microsoft.Owin.Security.Jwt` NuGet package.

```bash
Install-Package Microsoft.Owin.Security.Jwt
```

## Configure the middleware {{{ data-action=code data-code="Startup.cs" }}}

Go to the `Configuration` method of your `Startup` class and add a call to `UseJwtBearerAuthentication` passing in the configured `JwtBearerAuthenticationOptions`.

The `JwtBearerAuthenticationOptions` needs to specify your Auth0 API Identifier in the `ValidAudience` property, and the full path to your Auth0 domain as the `ValidIssuer`. You will need to configure the `IssuerSigningKeyResolver` to use the instance of `OpenIdConnectSigningKeyResolver` to resolve the signing key:

::: panel-warning Do not forget the trailing backslash
Please ensure that the URL specified for `ValidIssuer` contains a trailing backslash as this needs to match exactly with the issuer claim of the JWT. This is a common misconfiguration error which will cause your API calls to not be authenticated correctly.
:::

## Verifying the token signature {{{ data-action=code data-code="OpenIdConnectSigningKeyResolver.cs" }}}
As the OWIN JWT middleware doesn't use Open ID Connect Discovery by default, you will need to provide a custom `IssuerSigningKeyResolver`. To do this, create the `OpenIdConnectSigningKeyResolver` class and ensure to return the correct `SecurityKey` by implementing `GetSigningKey`.

This class is then used as `TokenValidationParameters.IssuerSigningKeyResolver` while configuring the middleware in `Startup.cs`.

:::note
Such a custom resolver was previously published as part of the `Auth0.OpenIdConnectSigningKeyResolver` package through Nuget. As [this package is not available anymore](https://github.com/auth0/auth0-aspnet-owin/blob/master/SECURITY-NOTICE.md), you will need to provide this yourself.
:::

## Validate scopes {{{ data-action=code data-code="ScopeAuthorizeAttribute.cs" }}}

The JWT middleware verifies that the Access Token included in the request is valid; however, it doesn't yet include any mechanism for checking that the token has the sufficient **scope** to access the requested resources.

Create a class called `ScopeAuthorizeAttribute` which inherits from `System.Web.Http.AuthorizeAttribute`. This Authorization Attribute will check that the `scope` claim issued by your Auth0 tenant is present, and if so it will ensure that the `scope` claim contains the requested scope.

## Protect API endpoints {{{ data-action=code data-code="ApiController.cs" }}}

<%= include('../_includes/_api_endpoints') %>

The JWT middleware integrates with the standard ASP.NET Authentication and Authorization mechanisms, so you only need to decorate your controller action with the `[Authorize]` attribute to secure an endpoint.

To ensure that a scope is present in order to call a particular API endpoint, you simply need to decorate the action with the `ScopeAuthorize` attribute and pass the name of the required `scope` in the `scope` parameter.

::::checkpoint

:::checkpoint-default

Now that you have configured your application, run your application to verify that:
* `GET /api/public` is available for non-authenticated requests.
* `GET /api/private` is available for authenticated requests.
* `GET /api/private-scoped` is available for authenticated requests containing an Access Token with the `read:messages` scope.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure `ValidIssuer` and `ValidAudience` are configured correctly
* make sure the token is added as the `Authorization` header
* does the token have the correct scopes? You can use [jwt.io](https://jwt.io/) to verify.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::
