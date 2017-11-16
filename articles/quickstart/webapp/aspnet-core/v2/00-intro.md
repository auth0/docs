---
title: Introduction
name: Introduction to the quickstart guide and configuring the environment
description: Introduction to the quickstart guide and configuring the environment.
budicon: 715
---

::: panel System requirements
This tutorial and seed project have been tested with the following:
* .NET Core SDK 2.0
* .NET Core 2.0
* ASP.NET Core 2.0

To complete this tutorial, you can use command line tools and any code editor. Alternatively, you can use Microsoft Visual Studio 2017 Update 3. For more details on how to use .NET Core on your platform, read the [.NET Core](https://www.microsoft.com/net/core) documentation.
:::

This quickstart guide walks you through integrating Auth0 into your ASP.NET Core MVC application.

## Seed Project

If you would like to follow along with this Quickstart you can download the [seed project](https://github.com/auth0-samples/auth0-aspnetcore-mvc-samples/tree/master/Quickstart/00-Starter-Seed). This is just a regular ASP.NET MVC application with a home page and some of the NuGet packages which will be needed included. It also contains an `appSettings.json` file where you can configure the various Auth0-related settings for your application.

The final project after each of the steps is also available in the Quickstart folder of the [ASP.NET Core MVC Samples repository](https://github.com/auth0-samples/auth0-aspnetcore-mvc-samples/tree/master/Quickstart). You can find the final result for each step in the relevant folder inside the repository.

If you want to follow along with this quickstart guide, you can download the [seed project](https://github.com/auth0-samples/auth0-aspnetcore-mvc-samples/tree/master/Quickstart/00-Starter-Seed). The sample contains an ASP.NET MVC application with a home page and some NuGet packages. It also contains an `appSettings.json` file, where you can configure the Auth0-related settings for your application.

To see what the project looks like after each step, check the [Quickstart folder](https://github.com/auth0-samples/auth0-aspnetcore-mvc-samples/tree/master/Quickstart) in the ASP.NET Core MVC Samples repository.

<%= include('../../../../_includes/_new_app') %>

<%= include('../_includes/_setup') %>
