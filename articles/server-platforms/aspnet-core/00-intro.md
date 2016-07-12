---
title: Introduction
name: Introduction to the Quickstart, and configuring environment
---

This Quickstart will guide you through the various tasks related to integrating Auth0 into your ASP.NET Core MVC application. 

## Seed & Samples

If you would like to follow along with this Quickstart you can download the [seed project](https://github.com/auth0-samples/auth0-aspnetcore-sample/tree/master/00-Starter-Seed). This is just a regular ASP.NET MVC application with a home page and some of the NuGet packages which will be needed included. It also contains an `appSettings.json` file where you can configure the various Auth0-related settings for your application.

The final project after each of the steps is also available in the [Sample repository](https://github.com/auth0-samples/auth0-aspnetcore-sample). You can find the final result for each step in the relevant folder inside the repository.

## Create an Application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

## Configure Callback URLs

The Callback URL of your application is the URL where Auth0 will redirect to after the user has authenticated in order for the OpenID Connect middleware to complete the authentication process.

You will need to add this URL to the list of Allowed URLs for your application. The Callback URL for the seed project is `http://localhost:60856/signin-auth0` if you use IIS Express, or `http://localhost:5000/signin-auth0` if you use Kestrel, so be sure to add this to the **Allowed Callback URLs** section of your application.

If you deploy your application to a different URL you will also need to ensure to add that URL to the **Allowed Callback URLs**. For ASP.NET Core this URL will take the format `http://YOUR_APPLICATION_URL/signin-auth0`  

## Configure JSON Web Token Signature Algorithm

The ASP.NET Core OpenID Connect (OIDC) middleware which will be used to authenticate the user requires that the JSON Web Token (JWT) be signed with an asymmetric key. To configure this go to the settings for your application in the Auth0 Dashboard, scroll down and click on **Show Advanced Settings**. Go to the **OAuth** tab and set the **JsonWebToken Signature Algorithm** to **RS256**.

Save your changes.     

## Dependencies

To integrate Auth0 with ASP.NET Core you will use the Cookie and OpenID Connect (OIDC) Middleware. Add the `Microsoft.AspNetCore.Authentication.Cookies` and `Microsoft.AspNetCore.Authentication.OpenIdConnect` packages to your application.

```bash
Install-Package Microsoft.AspNetCore.Authentication.Cookies
Install-Package Microsoft.AspNetCore.Authentication.OpenIdConnect
```

This was already done for you in the seed project, so no need to add it if you are using the seed project as a starting point.

That's all you need to start working with Auth0! 

Please continue with the [Login](/quickstart/webapp/aspnet-core/01-login) tutorial to know how to implement basic login.
