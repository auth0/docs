---
title: Introduction
name: Introduction to the quickstart guide and configuring the environment
description: Introduction to the quickstart guide and configuring the environment.
budicon: 715
tags:
  - quickstarts
  - webapp
  - aspnet-core
---

::: panel System requirements
This tutorial and seed project have been tested with the following:
* .NET Core SDK 2.1.300
* .NET Core 2.1.0
* ASP.NET Core 2.1.0

To complete this tutorial, you can use command line tools and any code editor. Alternatively, you can use Microsoft Visual Studio 2017 Update 3. For more details on how to use .NET Core on your platform, read the [.NET Core](https://www.microsoft.com/net/core) documentation.
:::

This quickstart guide walks you through integrating Auth0 into your ASP.NET Core MVC application.

## Seed Project

If you want to follow along with this quickstart guide, you can download the [seed project](https://github.com/auth0-samples/auth0-aspnetcore-mvc-samples/tree/master/Quickstart/00-Starter-Seed). The sample contains an ASP.NET MVC application with a home page and some NuGet packages. It also contains an `appSettings.json` file, where you can configure the Auth0-related settings for your application.

To see what the project looks like after each step, check the [Quickstart folder](https://github.com/auth0-samples/auth0-aspnetcore-mvc-samples/tree/master/Quickstart) in the ASP.NET Core MVC Samples repository.

<%= include('../../../_includes/_new_app') %>

<%= include('./_includes/_setup') %>
