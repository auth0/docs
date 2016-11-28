---
title: Introduction
name: Introduction to the Quickstart, and configuring environment
description: This Quickstart will guide you through the various tasks related to using Auth0-issued JSON Web Tokens to secure your ASP.NET Core Web API.
budicon: 715
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-webapi-sample',
  path: '00-Starter-Seed',
  requirements: [
    '.NET Core 1.0',
    'Visual Studio 2015 Update 3 (Optional)',
    'Visual Studio Code (Optional)'
  ]
}) %>

<%= include('../../_includes/_api_auth_intro') %>

<%= include('../../api-auth/_region-support') %>

This Quickstart will guide you through the various tasks related to using Auth0-issued Access Tokens to secure your ASP.NET Core Web API.

## Seed & Samples

If you would like to follow along with this Quickstart you can download the [seed project](https://github.com/auth0-samples/auth0-aspnetcore-webapi-sample/tree/master/00-Starter-Seed). The seed project is just a basic ASP.NET Web API with a simple controller and some of the NuGet packages which will be needed included. It also contains an `appSettings.json` file where you can configure the various Auth0-related settings for your application.

The final project after each of the steps is also available in the [Sample repository](https://github.com/auth0-samples/auth0-aspnetcore-webapi-sample). You can find the final result for each step in the relevant folder inside the repository.

## 1. Enable OAuth 2.0 API Authorization

<%= include('../../_includes/_configure_oauth2aas') %>

## 2. Create a Resource Server (API)

In the [APIs section]("${manage_url}/#/apis) of the Auth0 Dashboard, click the **Create API** button. Provide a **Name** and **Identifier** for your API. Be sure to choose the RS256 signing algorithm.

![Create API](/media/articles/server-apis/aspnet-core-webapi/create-api-rs256.png)

Also update the `appsettings.json` file in your project with the correct **Domain** and **API Identifier** for your API, e.g.

```json
{
  "Auth0": {
    "Domain": "${account.namespace}",
    "ApiIdentifier": "YOUR_API_IDENTIFIER"
  }
}
```

## 3. Install Dependencies

To use Auth0 Access Tokens with ASP.NET Core you will use the JWT Middleware. Add the `Microsoft.AspNetCore.Authentication.Jwt` package to your application.

```text
Install-Package Microsoft.AspNetCore.Authentication.Jwt
```

This was already done for you in the seed project, so no need to add it if you are using the seed project as a starting point.

That's all you need to start working with Auth0 in your Web API!

Please continue with the [Authentication](/quickstart/backend/aspnet-core-webapi/01-authentication) tutorial to secure your Web API.
