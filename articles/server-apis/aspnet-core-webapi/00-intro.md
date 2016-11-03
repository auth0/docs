---
title: Introduction
name: Introduction to the Quickstart, and configuring environment
description: This Quickstart will guide you through the various tasks related to using Auth0-issued JSON Web Tokens to secure your ASP.NET Core Web API.
budicon: 715
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-webapi-sample',
  path: '00-Starter-Seed',
  requirements: [
    '.NET Core 1.0'
  ]
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* .NET Core 1.0

This tutorial can be completed with the command line tools and your code editor of choice, or alternatively you can use Microsoft Visual Studio 2015 Update 3. For more details on how to use .NET Core on your platform, please see [the .NET Core Website](https://www.microsoft.com/net/core).
:::

This Quickstart will guide you through the various tasks related to using Auth0-issued JSON Web Tokens to secure your ASP.NET Core Web API.

## Seed & Samples

If you would like to follow along with this Quickstart you can download the [seed project](https://github.com/auth0-samples/auth0-aspnetcore-webapi-sample/tree/master/00-Starter-Seed). The seed project is just a basic ASP.NET Web API with a simple controller and some of the NuGet packages which will be needed included. It also contains an `appSettings.json` file where you can configure the various Auth0-related settings for your application.

The final project after each of the steps is also available in the [Sample repository](https://github.com/auth0-samples/auth0-aspnetcore-webapi-sample). You can find the final result for each step in the relevant folder inside the repository.

## Create an Application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

Be sure to update the `appsettings.json` file in the seed project with the correct values for your application.

## Dependencies

To use Auth0 JSON Web Tokens with ASP.NET Core you will use the JWT Middleware. Add the `Microsoft.AspNetCore.Authentication.Jwt` package to your application.

```bash
Install-Package Microsoft.AspNetCore.Authentication.Jwt
```

This was already done for you in the seed project, so no need to add it if you are using the seed project as a starting point.

That's all you need to start working with Auth0 in your Web API!

Please continue with the [Authentication](/quickstart/backend/aspnet-core-webapi/01-authentication-rs256) tutorial to secure your Web API.
