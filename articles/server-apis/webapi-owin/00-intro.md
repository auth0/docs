---
title: Introduction
name: Introduction to the Quickstart, and configuring environment
budicon: 715
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnet-owin-webapi-sample',
  path: '00-Starter-Seed/WebApi',
  requirements: [
    'Microsoft Visual Studio 2015 Update 3',
    'Microsoft.Owin.Security.Jwt NuGet Package V3.0.1',
    'System.IdentityModel.Tokens.Jwt NuGet Package v4.0.2',
    'Auth0.OpenIdConnectSigningKeyResolver NuGet Package v1.0.0'
  ]
}) %>

<%= include('../../_includes/_api_auth_intro') %>

<%= include('../../api-auth/_region-support') %>

This Quickstart will guide you through the various tasks related to using Auth0-issued JSON Web Tokens to secure your ASP.NET (OWIN) Web API.

## Seed & Samples

If you would like to follow along with this Quickstart you can download the [seed project](https://github.com/auth0-samples/auth0-aspnet-owin-webapi-sample/tree/master/00-Starter-Seed). The seed project is just a basic ASP.NET Web API with a simple controller and some of the NuGet packages which will be needed included. It has also defined some of the required Auth0-related settings in the `appSettings` key of the `Web.config`.

The final project after each of the steps is also available in the [Sample repository](https://github.com/auth0-samples/auth0-aspnet-owin-webapi-sample). You can find the final result for each step in the relevant folder inside the repository.

## 1. Enable OAuth 2.0 API Authorization

<%= include('../../_includes/_configure_oauth2aas') %>

## 2. Create a Resource Server (API)

In the [APIs section](https://manage.auth0.com/#/apis) of the Auth0 Dashboard, click the **Create API** button. Provide a **Name** and **Identifier** for your API. Be sure to choose the RS256 signing algorithm.

![Create API](/media/articles/server-apis/webapi-owin/create-api-rs256.png)

Also update the `web.config` file in your project with the correct **Domain** and **API Identifier** for your API, e.g.

```xml
<appSettings>
  <add key="Auth0Domain" value="${account.namespace}" />
  <add key="Auth0ApiIdentifier" value="YOUR_API_IDENTIFIER" />
</appSettings>
```

## 3. Install Dependencies

To use Auth0 Access Tokens with ASP.NET Core you will use the JWT Middleware which is available in the `Microsoft.Owin.Security.Jwt` NuGet package. Also install the `Auth0.OpenIdConnectSigningKeyResolver` NuGet package which will assist you in verifying the token signature.

```bash
Install-Package Microsoft.Owin.Security.Jwt
Install-Package Auth0.OpenIdConnectSigningKeyResolver
```

The seed project contains both these NuGet packages, but if you are adding it to your own existing project you will only need to add the one which is relevant for your scenario.

That's all you need to start working with Auth0 in your Web API!

Please continue with the [Authentication](/quickstart/backend/webapi-owin/01-authentication) tutorial to secure your Web API.
