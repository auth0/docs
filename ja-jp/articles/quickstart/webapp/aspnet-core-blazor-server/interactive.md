---
title: Add Login to your ASP.NET Core Blazor Server application
description: This tutorial demonstrates how to add user login to an ASP.NET Core Blazor Server application.
budicon: 448
topics:
  - quickstarts
  - webapp
  - aspnet-core
  - blazor-server
  - login
github:
  path: Quickstart/Sample
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/login-model
  - files/logout-model
  - files/profile
  - files/program
---

# Add Login to Your Blazor Server Application

Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing Blazor Server application using the **Auth0.AspNetCore.Authentication** SDK. 

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'http://localhost:3000/callback',
  returnTo: 'http://localhost:3000'
}) %>

## Install and Configure the SDK {{{ data-action=code data-code="Program.cs" }}}

### Install from Nuget

To integrate Auth0 with Blazor Server you can use our SDK by installing the `Auth0.AspNetCore.Authentication` [Nuget package](https://www.nuget.org/packages/Auth0.AspNetCore.Authentication/) to your application.

```bash
Install-Package Auth0.AspNetCore.Authentication
```

### Configure the middleware

To enable authentication in your Blazor Server application, use the middleware provided by the SDK. Go to the `Program.cs` file and call `builder.Services.AddAuth0WebAppAuthentication()` to register the SDK's middleware.

Ensure to configure the `Domain` and `ClientId`, these are required fields to ensure the SDK knows which Auth0 tenant and application it should use.

Make sure you have enabled authentication and authorization in your `Program.cs` file.

## Login {{{ data-action=code data-code="Login.cshtml.cs" }}}

To allow users to login to your Blazor Server application, add a `LoginModel` to your `Pages` directory.

Inside the `LoginModel`'s `OnGet` method, call `HttpContext.ChallengeAsync()` and pass `Auth0Constants.AuthenticationScheme` as the authentication scheme. This will invoke the OIDC authentication handler that our SDK registers internally. Be sure to also specify the corresponding `authenticationProperties`, which you can construct using the `LoginAuthenticationPropertiesBuilder`.

After successfully calling `HttpContext.ChallengeAsync()`, the user will be redirected to Auth0 and signed in to both the OIDC middleware and the cookie middleware upon being redirected back to your application. This will allow the users to be authenticated on subsequent requests.

::::checkpoint

:::checkpoint-default

Now that you have configured Login, run your application to verify that:
* Navigating to your `Login` page will redirect to Auth0
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

## Display User Profile {{{ data-action=code data-code="Profile.razor" }}}

After the middleware has successfully retrieved the tokens from Auth0, it will extract the user's information and claims from the ID Token and make them available through the `AuthenticationState`, which you can add as a `CascadingParameter`.

You can create a custom user profile page for displaying the user's name, as well as additional claims (such as email and picture), by retrieving the corresponding information from the `AuthenticationState`'s `User` property and passing it to the view from inside Blazor code.

::::checkpoint

:::checkpoint-default

Now that you have set up to render the user's profile, run your application to verify that:
* Navigating to the endpoint containing the profile after being successfully logged in shows the user's profile.

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the correct application is selected
* did you save after entering your URLs?
* make sure the domain and client ID are configured correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::

## Logout {{{ data-action=code data-code="Logout.cshtml.cs" }}}

Logging out the user from your own application can be done by calling `HttpContext.SignOutAsync` with the `CookieAuthenticationDefaults.AuthenticationScheme` authentication scheme from inside a `LogoutModel`'s `OnGet` method.

Additionally, if you also want to log the user out from Auth0 (this *might* also log them out of other applications that rely on Single Sign On), call `HttpContext.SignOutAsync` with the `Auth0Constants.AuthenticationScheme` authentication scheme as well as the appropriate `authenticationProperties` that can be constructed using the `LogoutAuthenticationPropertiesBuilder`.

::: note
When only logging the user out from your own application but not from Auth0, ensure to return `Redirect("/")` or any other appropriate redirect.
:::

::::checkpoint

:::checkpoint-default

Now that you have configured Logout, run your application to verify that:
* Navigating to your `Logout` page will ensure the user is logged out.
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
