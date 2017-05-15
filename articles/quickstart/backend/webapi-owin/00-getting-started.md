---
title: Getting Started
name: Introduction to the Quickstart, and configuring environment
description: This Quickstart will guide you through the various tasks related to using Auth0-issued Access Tokens to secure your ASP.NET (OWIN) Web API.
budicon: 715
---

<%= include('../../../_includes/_api_auth_intro') %>

This Quickstart will guide you through the various tasks related to using Auth0-issued Access Tokens to secure your ASP.NET (OWIN) Web API.

## Seed and Samples

If you would like to follow along with this Quickstart you can download the [seed project](https://github.com/auth0-samples/auth0-aspnet-owin-webapi-samples/tree/master/Quickstart/00-Starter-Seed). The seed project is just a basic ASP.NET Web API with a simple controller and some of the NuGet packages which will be needed included. It has also defined some of the required Auth0-related settings in the `appSettings` key of the `Web.config`.

The final project after each of the steps is also available in the [Sample repository](https://github.com/auth0-samples/auth0-aspnet-owin-webapi-samples). You can find the final result for each step in the relevant folder inside the repository.

<%= include('../_includes/_api_create_new') %>

Also update the `web.config` file in your project with the correct **Domain** and **API Identifier** for your API, e.g.

```xml
<appSettings>
  <add key="Auth0Domain" value="${account.namespace}" />
  <add key="Auth0ApiIdentifier" value="YOUR_API_IDENTIFIER" />
</appSettings>
```