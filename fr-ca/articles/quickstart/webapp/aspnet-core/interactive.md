---
title: Add Login to your ASP.NET MVC application
description: This tutorial demonstrates how to add user login to an ASP.NET Core application.
budicon: 448
topics:
  - quickstarts
  - webapp
  - aspnet-core
  - login
github:
  path: Quickstart/Sample
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/program
  - files/appsettings
  - files/account.controller
---

# Add Login to Your ASP.NET MVC Application

Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing ASP.NET MVC application using the **Auth0.AspNetCore.Authentication** SDK. 

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'http://localhost:3000/callback',
  returnTo: 'http://localhost:3000'
}) %>

## Install and Configure the SDK {{{ data-action=code data-code="Program.cs" }}}

### Install from Nuget

To integrate Auth0 with ASP.NET Core you can use our SDK by installing the `Auth0.AspNetCore.Authentication` [Nuget package](https://www.nuget.org/packages/Auth0.AspNetCore.Authentication/) to your application.

```bash
Install-Package Auth0.AspNetCore.Authentication
```

### Configure the middleware

To enable authentication in your ASP.NET Core application, use the middleware provided by the SDK. Go to the `Program.cs` file and call `builder.Services.AddAuth0WebAppAuthentication()` to register the SDK's middleware.

Ensure to configure the `Domain` and `ClientId`, these are required fields to ensure the SDK knows which Auth0 tenant and application it should use.

Make sure you have enabled authentication and authorization in your `Program.cs` file.
## Login {{{ data-action=code data-code="AccountController.cs#7:20" }}}

To allow users to login to your ASP.NET MVC application, add a `Login` action to your controller.

Call `HttpContext.ChallengeAsync()` and pass `Auth0Constants.AuthenticationScheme` as the authentication scheme. This will invoke the OIDC authentication handler that our SDK registers internally. Be sure to also specify the corresponding `authenticationProperties`, which you can construct using the `LoginAuthenticationPropertiesBuilder`.

After succesfully calling `HttpContext.ChallengeAsync()`, the user will be redirected to Auth0 and signed in to both the OIDC middleware and the cookie middleware upon being redirected back to your application. This will allow the users to be authenticated on subsequent requests.

::::checkpoint

:::checkpoint-default

Now that you have configured Login, run your application to verify that:
* Navigating to your `Login` action will redirect to Auth0
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

## Display User Profile {{{ data-action=code data-code="AccountController.cs#23:33" }}}

After the middleware has successfully retrieved the tokens from Auth0, it will extract the user's information and claims from the ID Token and makes them available as the `User.Claims` property on the controller.

You can create a custom user profile page for displaying a user's name, email address, and profile image, by retrieving the corresponding information from the `User` and pass it to the view from inside your controller.

::::checkpoint

:::checkpoint-default

Now that you have set up your action to render the user's profile, run your application to verify that:
* Navigating to your `Profile` action after being succesfully logged in, shows the user's profile.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the correct application is selected
* did you save after entering your URLs?
* make sure the domain and client ID are configured correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::

## Logout {{{ data-action=code data-code="AccountController.cs#36:52" }}}

Logging out the user from your own application can be done by calling `HttpContext.SignOutAsync` with the `CookieAuthenticationDefaults.AuthenticationScheme` authentication scheme from inside your controller's action.

Additionaly, If you also want to log the user out from Auth0 (this *might* also log them out of other applications that rely on Single Sign On), call `HttpContext.SignOutAsync` with the `Auth0Constants.AuthenticationScheme` authentication scheme as well as the appropriate `authenticationProperties` that can be constructed using the `LogoutAuthenticationPropertiesBuilder`.

::: note
When only logging the user out from your own application but not from Auth0, ensure to return `RedirectToAction("Index", "Home")` or any other appropriate redirect.
:::

::::checkpoint

:::checkpoint-default

Now that you have configured Logout, run your application to verify that:
* Navigating to your `Logout` action will ensure the user is logged out.
* When also logging out from Auth0, you should be redirected to Auth0 and instantly redirected back to your own application.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the correct application is selected
* did you save after entering your URLs?
* make sure the domain and client ID are configured correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::
