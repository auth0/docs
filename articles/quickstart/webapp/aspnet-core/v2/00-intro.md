---
title: Introduction
name: Introduction to the quickstart guide and configuring the environment
description: Introduction to the quickstart guide and configuring the environment.
budicon: 715
---

::: panel System Requirements
This tutorial and seed project have been tested with the following:

* .NET Core SDK 2.0
* .NET Core 2.0
* ASP.NET Core 2.0

This tutorial can be completed with the command line tools and your code editor of choice, or alternatively you can use Microsoft Visual Studio 2017 Update 3. For more details on how to use .NET Core on your platform, please see [the .NET Core Website](https://www.microsoft.com/net/core).
:::

This quickstart guide will walk you through the various tasks related to integrating Auth0 into your ASP.NET Core MVC application.

## Sample Projects

If you would like to follow along with this Quickstart you can download the [seed project](https://github.com/auth0-samples/auth0-aspnetcore-mvc-samples/tree/master/Quickstart/00-Starter-Seed). This is just a regular ASP.NET MVC application with a home page and some of the NuGet packages which will be needed included. It also contains an `appSettings.json` file where you can configure the various Auth0-related settings for your application.

The final project after each of the steps is also available in the Quickstart folder of the [ASP.NET Core MVC Samples repository](https://github.com/auth0-samples/auth0-aspnetcore-mvc-samples/tree/master/Quickstart). You can find the final result for each step in the relevant folder inside the repository.

<%= include('../../../../_includes/_new_app') %>

<%= include('../_includes/_setup') %>

Please continue with the [Login](/quickstart/webapp/aspnet-core/v2/01-login) tutorial for instruction on how to implement basic login.
