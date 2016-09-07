---
title: Introduction
name: Introduction to the Quickstart, and configuring environment
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-aspnet-owin-mvc-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-aspnet-owin-mvc-sample',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: '00-Starter-Seed/MvcApplication/MvcApplication/web.config',
  pkgType: 'replace'
}) %>

This Quickstart will guide you through the various tasks related to integrating Auth0 into your ASP.NET MVC 5 application. 

## Seed & Samples

If you would like to follow along with this Quickstart you can download the [seed project](https://github.com/auth0-samples/auth0-aspnet-owin-mvc-sample/tree/master/00-Starter-Seed). This is just a regular ASP.NET MVC application with a home page and a `web.config` file where you can configure the various Auth0-related settings for your application.

The final project after each of the steps is also available in the [Sample repository](https://github.com/auth0-samples/auth0-aspnet-owin-mvc-sample). You can find the final result for each step in the relevant folder inside the repository.

## Create an Application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

## Configure Callback URLs

The Callback URL of your application is the URL where Auth0 will redirect to after the user has authenticated in order for the OpenID Connect middleware to complete the authentication process.

You will need to add this URL to the list of Allowed URLs for your application. The Callback URL for the seed project is `http://localhost:56572/signin-auth0`, so be sure to add this to the **Allowed Callback URLs** section of your application.

If you deploy your application to a different URL you will also need to ensure to add that URL to the **Allowed Callback URLs**. For ASP.NET Core this URL will take the format `http://YOUR_APPLICATION_URL/signin-auth0`  

That's all you need to start working with Auth0! 

Please continue with the [Login](/quickstart/webapp/aspnet-core/01-login) tutorial to know how to implement basic login.