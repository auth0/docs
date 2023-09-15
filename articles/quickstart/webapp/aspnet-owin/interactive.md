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
  path: Quickstart/Sample
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/web.config
  - files/startup
  - files/account.controller
---

# Add login to your ASP.NET Owin application

Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing ASP.NET OWIN application using the `Microsoft.Owin.Security.OpenIdConnect` Nuget package. 

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'http://localhost:3000/callback',
  returnTo: 'http://localhost:3000'
}) %>

## Configure the project {{{ data-action=code data-code="Web.config#1:7" }}}

### Install from Nuget

To integrate Auth0 with ASP.NET OWIN, you can use the `Microsoft.Owin.Security.OpenIdConnect` and `Microsoft.Owin.Security.Cookies` Nuget packages.

```bash
Install-Package Microsoft.Owin.Security.OpenIdConnect
Install-Package Microsoft.Owin.Security.Cookies
```

:::note
Issues occur when configuring the OWIN cookie middleware and System.Web cookies at the same time. To learn more, read [System.Web cookie integration issues doc](https://github.com/aspnet/AspNetKatana/wiki/System.Web-response-cookie-integration-issues) to mitigate these problems.
:::

### Configure the credentials
For the SDK to function properly, set the following properties in `Web.config`:
- `auth0:Domain`: The domain of your Auth0 tenant. You can find this in the Auth0 Dashboard under your application's **Settings** in the Domain field. If you are using a [custom domain](https://auth0.com/docs/custom-domains), set this to the value of your custom domain instead.
- `auth0:ClientId`: The ID of the Auth0 application you created in Auth0 Dashboard. You can find this in the Auth0 Dashboard under your application's **Settings** in the Client ID field.

## Configure the middleware {{{ data-action=code data-code="Startup.cs#9:13" }}}

To enable authentication in your ASP.NET OWIN application, go to the `Configuration` method of your `Startup` class and configure the cookie and OIDC middleware.

It is essential that you register both the cookie middleware and the OpenID Connect middleware as both are required (in that order) for authentication to work. The OpenID Connect middleware handles the authentication with Auth0. Once users have authenticated, their identity is stored in the cookie middleware.

In the code snippet, `AuthenticationType` is set to **Auth0**. Use `AuthenticationType` in the next section to challenge the OpenID Connect middleware and start the authentication flow. `RedirectToIdentityProvider` notification event constructs the correct [logout URL](/logout).

## Add login to your application {{{ data-action=code data-code="AccountController.cs#7:16" }}}

To allow users to log in to your ASP.NET OWIN application, add a `Login` action to your controller.

Call `HttpContext.GetOwinContext().Authentication.Challenge` and pass `"Auth0"` as the authentication scheme. This invokes the OIDC authentication handler that was registered earlier. Be sure to specify the corresponding `AuthenticationProperties`, including a `RedirectUri`.

After successfully calling `HttpContext.GetOwinContext().Authentication.Challenge`, the user redirects to Auth0 and signed in to both the OIDC middleware and the cookie middleware upon being redirected back to your application. This will allow the users to be authenticated on subsequent requests.

::::checkpoint

:::checkpoint-default

Now that you have configured Login, run your application to verify that:
* Navigating to your `Login` action will redirect to Auth0
* Entering your credentials will redirect you back to your application.

:::

:::checkpoint-failure
Sorry about that. Here are a couple of things to double-check:
* make sure the correct application is selected
* did you save after entering your URLs?
* make sure the domain and client ID are configured correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::

## Add logout to your application {{{ data-action=code data-code="AccountController.cs#34:39" }}}

From your controller's action, call `HttpContext.GetOwinContext().Authentication.SignOut` with the `CookieAuthenticationDefaults.AuthenticationType` authentication scheme to log the user out of your application.

Additionally, if you want to log the user out from Auth0 (this *might* also log them out of other applications that rely on Single Sign-On), call `HttpContext.GetOwinContext().Authentication.SignOut` with the `"Auth0"` authentication scheme.

::::checkpoint

:::checkpoint-default

Now that you have configured Logout, run your application to verify that:
* Navigating to your `Logout` action ensures the user is logged out.
* During logout, you redirect to Auth0 and instantly redirect back to your application during log out.

:::

:::checkpoint-failure
Sorry about that. Here are a couple of things to double-check:
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
* Navigating to your `Profile` action after being successfully logged in, shows the user's profile.

:::

:::checkpoint-failure
Sorry about that. Here are a couple things to double-check:
* make sure the correct application is selected
* make sure the domain and client ID are configured correctly
* Did you set `openid profile email` as the scope?

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::
