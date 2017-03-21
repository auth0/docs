---
title: Introduction
name: Introduction to the quickstart guide and configuring the environment
description: This quickstart guide will walk you through the various tasks related to integrating Auth0 into your ASP.NET MVC 5 application.
budicon: 715
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Microsoft Visual Studio 2015 Update 3
* Auth0-ASPNET-Owin NuGet Package v1.0.4
:::

This quickstart guide will walk you through the various tasks related to integrating Auth0 into your ASP.NET MVC 5 application.

## Sample Projects

If you would like to follow along with this quickstart, you can download a blank starter [seed project](https://github.com/auth0-samples/auth0-aspnet-owin-mvc-sample/tree/master/Legacy/00-Starter-Seed). This is just a regular ASP.NET MVC application with a home page and a `web.config` file where you can configure the various Auth0-related settings for your application.

Each of the steps in this guide contains a sample project download that shows the completion of the step. These projects can also be downloaded from the [sample repository](https://github.com/auth0-samples/auth0-aspnet-owin-mvc-sample) where you can find the final result for each step in the relevant folder.

<%= include('../../../../_includes/_new_app') %>

## Configure Callback URLs

The Callback URL of your application is the URL where Auth0 will redirect to after the user has authenticated in order for the Auth0 OAuth2 middleware to complete the authentication process.

You will need to add this URL to the list of Allowed URLs for your application. The Callback URL for the seed project is `http://localhost:56572/signin-auth0`, so be sure to add this to the **Allowed Callback URLs** section of your application.

If you deploy your application to a different URL you will also need to ensure to add that URL to the **Allowed Callback URLs**. For ASP.NET Core this URL will take the format `http://YOUR_APPLICATION_URL/signin-auth0`  

That's all you need to start working with Auth0!

Please continue with the [Login](/quickstart/webapp/aspnet-owin/legacy/01-login) tutorial to know how to implement basic login.