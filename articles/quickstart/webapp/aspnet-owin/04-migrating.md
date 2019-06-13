---
title: Migrating to OWIN 4
description: This tutorial demonstrates how to migrate from OWIN 3.x to OWIN 4.0
budicon: 500
---

::: note
The `Auth0-ASPNET-Owin` NuGet package has unresolved security issues and has been deprecated. See the [Auth0 Security Bulletin CVE 2018-15121](/security/bulletins/cve-2018-15121) for more details.
:::

Previously, Auth0 maintained a NuGet package with OWIN middleware which developers could use to integrate Auth0 into the ASP.NET (OWIN) applications. With the move to OWIN 4, the built-in OpenID Connect middleware was re-evaluated, and the decision was made to instead use this middleware as opposed to the custom Auth0 middleware.

It is suggested that existing customers migrate their OWIN 3.x applications from OWIN 4.0 and replace the Auth0 middleware with the OpenID Connect middleware on which the new quickstart is based.

To upgrade from OWIN 3.x using the Auth0 middleware to OWIN 4 using the OpenID Connect middleware, you can follow these steps:

1. Upgrade all the OWIN related NuGet packages in your project to version 4.0.
1. Add a reference to the `Microsoft.Owin.Security.OpenIdConnect` NuGet package.
1. Remove the existing reference to the `Auth0-ASPNET-Owin` NuGet package which contains the previous OWIN 3.x based middleware.
1. Update your `Startup.cs` file to add the following namespaces:

    ```
    using Microsoft.IdentityModel.Protocols.OpenIdConnect
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.Owin.Security.OpenIdConnect
    ```

1. Also, remove the reference to the `Auth0.Owin` namespace from your `Startup.cs` file.
1. Remove the registration of the previously used Auth0 OWIN middleware from the `Configuration` method of your `Startup` class.
1. Follow the [steps in the OWIN Login Quickstart](/quickstart/webapp/aspnet-owin/01-login#install-and-configure-the-openid-connect-middleware) to register the OpenID Connect middleware in your `Startup` class.
