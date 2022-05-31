---
title: Add Login to your ASP.NET Owin application
description: This tutorial demonstrates how to add user login to an ASP.NET Owin application.
budicon: 448
topics:
  - quickstarts
  - webapp
  - aspnet-owin
  - login
github:
  path: Quickstart/02-User-Profile
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/startup
  - files/account.controller
  - files/web.config
---

# Add login to your ASP.NET Owin application

Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing ASP.NET Owin application using the `Microsoft.Owin.Security.OpenIdConnect` Nuget package. 

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'http://localhost:3000/callback',
  returnTo: 'http://localhost:3000'
}) %>

## Install and configure the middleware {{{ data-action=code data-code="Startup.cs#9:13" }}}

### Install from Nuget

To integrate Auth0 with ASP.NET Owin you can use the `Microsoft.Owin.Security.OpenIdConnect` and `Microsoft.Owin.Security.Cookies` Nuget packages.

```bash
Install-Package Microsoft.Owin.Security.OpenIdConnect
Install-Package Microsoft.Owin.Security.Cookies
```

:::note
There are issues when configuring the OWIN cookie middleware and System.Web cookies at the same time. Please read about the [System.Web cookie integration issues doc](https://github.com/aspnet/AspNetKatana/wiki/System.Web-response-cookie-integration-issues) to learn about how to mitigate these problems
:::

### Configure the middleware

To enable authentication in your ASP.NET Owin application, go to the `Configuration` method of your `Startup` class and configure the cookie and OIDC middleware.

It is essential that you register both the cookie middleware and the OpenID Connect middleware, as they are required (in that order) for the authentication to work. The OpenID Connect middleware will handle the authentication with Auth0. Once the user has authenticated, their identity will be stored in the cookie middleware.

In the code snippet, note that the `AuthenticationType` is set to **Auth0**. This will be used in the next section to challenge the OpenID Connect middleware and start the authentication flow. Also note the code in the `RedirectToIdentityProvider` notification event which constructs the correct [logout URL](/logout).

## Add Login to Your Application {{{ data-action=code data-code="AccountController.cs#7:16" }}}

To allow users to login to your ASP.NET Owin application, add a `Login` action to your controller.

Call `HttpContext.GetOwinContext().Authentication.Challenge` and pass `"Auth0"` as the authentication scheme. This invokes the OIDC authentication handler that was registered earlier. Be sure to also specify the corresponding `AuthenticationProperties`, including a `RedirectUri`.

After succesfully calling `HttpContext.GetOwinContext().Authentication.Challenge`, the user redirects to Auth0 and signs in to both the OIDC middleware and the cookie middleware upon being redirected back to your application. This allows the users to be authenticated on subsequent requests.

::::checkpoint

:::checkpoint-default

Now that you have configured Login, run your application to verify that:
* Navigating to your `Login` action will redirects to Auth0
* Entering your credentials will redirect you back to your application.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the correct application is selected
* did you save after entering your URLs?
* make sure the domain and client ID are configured correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::

## Add logout to your application {{{ data-action=code data-code="AccountController.cs#34:39" }}}

From your controller's action, call `HttpContext.GetOwinContext().Authentication.SignOut` with the `CookieAuthenticationDefaults.AuthenticationType` authentication scheme to log the user out of your application.

Additionaly, if you want to log the user out from Auth0 (this *might* also log them out of other applications that rely on Single Sign-On), call `HttpContext.GetOwinContext().Authentication.SignOut` with the `"Auth0"` authentication scheme.

::::checkpoint

:::checkpoint-default

Now that you have configured Logout, run your application to verify that:
* Navigating to your `Logout` action ensures the user is logged out.
* Duing logout, you redirect to Auth0 and instantly redirect back to your own application during log out.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the correct application is selected
* did you save after entering your URLs?
* make sure the domain and client ID are configured correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::

## Show user profile information {{{ data-action=code data-code="AccountController.cs#18:32" }}}

After the middleware successfully retrieves the tokens from Auth0, it extracts the user's information and claims from the ID token and makes them available as `ClaimsIdentity`. Access the extracted information by using the `User` property on the controller.

To create a user profile, retrieve a user's name, email address, and profile image from the `User` and pass it to the view from inside your controller.

::::checkpoint

:::checkpoint-default

Now that you have set up your action to render the user's profile, run your application to verify that:
* Navigating to your `Profile` action after being succesfully logged in, shows the user's profile.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the correct application is selected
* make sure the domain and client ID are configured correctly
* Did you set `openid profile email` as the scope?

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::