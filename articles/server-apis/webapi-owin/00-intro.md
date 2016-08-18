---
title: Introduction
name: Introduction to the Quickstart, and configuring environment
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-aspnet-owin-webapi-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-aspnet-owin-webapi-sample',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed/WebApi',
  pkgFilePath: '00-Starter-Seed/WebApi/WebApi/Web.config',
  pkgType: 'replace'
}) %>

This Quickstart will guide you through the various tasks related to using Auth0-issued JSON Web Tokens to secure your ASP.NET (OWIN) Web API. 

## Seed & Samples

If you would like to follow along with this Quickstart you can download the [seed project](https://github.com/auth0-samples/auth0-aspnet-owin-webapi-sample/tree/master/00-Starter-Seed). The seed project is just a basic ASP.NET Web API with a simple controller and some of the NuGet packages which will be needed included. It has also defined some of the required Auth0-related settings in the `appSettings` key of the `Web.config`.

The final project after each of the steps is also available in the [Sample repository](https://github.com/auth0-samples/auth0-aspnet-owin-webapi-sample). You can find the final result for each step in the relevant folder inside the repository.

## Create an Application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

Be sure to update the `appSettings` section in your `web.config` file in the seed project with the correct values for your application. 

## Dependencies

The JWT middleware you will use depends on whether your JWT tokens are signed using HS256 or RS256.

For HS256 signed tokens you will need to add the standard JWT middleware which is included in the `System.IdentityModel.Tokens.Jwt` NuGet package. For RS256 signed tokens you will need to add the Active Directory Services Bearer Token middleware which is included in the `Microsoft.Owin.Security.ActiveDirectory` NuGet package. 

```bash
Install-Package System.IdentityModel.Tokens.Jwt
Install-Package Microsoft.Owin.Security.ActiveDirectory
```

The seed project contains both these NuGet packages, but if you are adding it to your own existing project you will only need to add the one which is relevant for your scenario.

That's all you need to start working with Auth0 in your Web API! 

Please continue with the [Authentication](/quickstart/backend/webapi-owin/01-authentication-rs256) tutorial to secure your Web API.
