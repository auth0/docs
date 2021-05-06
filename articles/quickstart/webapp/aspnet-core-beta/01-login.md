---
title: Login
description: This tutorial demonstrates how to add user login to an ASP.NET Core application.
budicon: 448
topics:
  - quickstarts
  - webapp
  - aspnet-core
  - login
github:
  path: Quickstart/01-Login
contentType: tutorial
useCase: quickstart
---
<!-- markdownlint-disable MD041 -->

<%= include('../../../_includes/_new_app', { showClientSecret: false }) %>

<!-- markdownlint-disable MD002 MD041 -->
## Configure Callback URLs

The Callback URL of your application is the URL where Auth0 will redirect to after the user has authenticated in order for the SDK to complete the authentication process.

You will need to add this URL to the list of Allowed URLs for your application in your [Application Settings](${manage_url}/#/applications). The Callback URL for the seed project is `http://localhost:3000/callback`, so be sure to add this to the **Allowed Callback URLs** section of your application.

If you deploy your application to a different URL you will also need to ensure to add that URL to the **Allowed Callback URLs**. For ASP.NET Core this URL will take the format `https://YOUR_APPLICATION_URL/callback`.

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000' }) %>

### Configure JSON Web Token signature algorithm

The SDK requires that the JSON Web Token (JWT) be signed with an asymmetric key. To configure this go to the settings for your application in the Auth0 Dashboard, scroll down and click on **Show Advanced Settings**. Go to the **OAuth** tab and ensure the **JsonWebToken Signature Algorithm** is set to **RS256**.

Save your changes.

## Configure Your Application to Use Auth0

[Universal Login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features. This guide will use it to provide a way for your users to log in to your ASP.NET Core application.

### Install dependencies

To integrate Auth0 with ASP.NET Core you can use our beta SDK by installing the `Auth0.AspNetCore.Mvc` Nuget package to your application.

```bash
Install-Package Auth0.AspNetCore.Mvc -IncludePrerelease
```

### Install and configure the SDK

To enable authentication in your ASP.NET Core application, use the middleware provided by the SDK.
Go to the `ConfigureServices` method of your `Startup` class and call `services.AddAuth0Mvc()` to configure the Auth0 ASP.NET Core SDK.

Ensure to configure the `Domain` and `ClientId`, these are required fields to ensure the SDK knows which Auth0 tenant and application it should use.

By default, the SDK requests the `openid` and `profile` scopes. If needed, you can request different scopes by setting the option's `scope` property.

::: note
In the code sample below, only the `openid` scope is requested.
:::

```cs
// Startup.cs

public void ConfigureServices(IServiceCollection services)
{
    // Cookie configuration for HTTP to support cookies with SameSite=None
    services.ConfigureSameSiteNoneCookies();

    // Cookie configuration for HTTPS
    // services.Configure<CookiePolicyOptions>(options =>
    // {
    //    options.MinimumSameSitePolicy = SameSiteMode.None
    // });

    // Add authentication services
    services
        .AddAuth0Mvc(options => {
            // Set the authority to your Auth0 domain
            options.Domain = Configuration["Auth0:Domain"];
            // Configure the Auth0 Client ID
            options.ClientId = Configuration["Auth0:ClientId"];
            // Change the scopes used
            options.Scope = "openid";
        });

    // Add framework services.
    services.AddControllersWithViews();
}
```

::: note
The `ConfigureSameSiteNoneCookies` method used above was added as part of the [sample application](https://github.com/auth0-samples/auth0-aspnetcore-mvc-samples/blob/master/Quickstart/01-Login/Support/SameSiteServiceCollectionExtensions.cs) in order to ([make cookies with SameSite=None work over HTTP when using Chrome](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)). We recommend using HTTPS instead of HTTP, which removes the need for the `ConfigureSameSiteNoneCookies` method.
:::

Next, add the authentication middleware. In the `Configure` method of the `Startup` class, call the `UseAuthentication` and `UseAuthorization` methods.

```csharp
// Startup.cs

public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    app.UseAuthentication();
    app.UseAuthorization();
}
```

## Trigger Authentication

### Add the Login and Logout methods

Add the `Login` and `Logout` actions to `AccountController`.

To add the `Login` action, call `ChallengeAsync` and pass "Auth0" (`Constants.AuthenticationScheme`) as the authentication scheme. This will invoke the OIDC authentication handler that our SDK registers internally.

After the OIDC middleware signs the user in, the user is also automatically signed in to the cookie middleware. This allows the user to be authenticated on subsequent requests.

For the `Logout` action, you need to sign the user out of both the Auth0 middleware as well as the cookie middleware.

The `RedirectUri` passed in both instances indicates where the user is redirected after they log in or fail to log in.

```cs
// Controllers/AccountController.cs

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Auth0.AspNetCore.Mvc;

public class AccountController : Controller
{
    public async Task Login(string returnUrl = "/")
    {
        var authenticationProperties = new AuthenticationPropertiesBuilder()
            .WithRedirectUri(returnUrl)
            .Build();

        await HttpContext.ChallengeAsync(Constants.AuthenticationScheme, authenticationProperties);
    }

    [Authorize]
    public async Task Logout()
    {
        var authenticationProperties = new AuthenticationPropertiesBuilder()
            // Indicate here where Auth0 should redirect the user after a logout.
            // Note that the resulting absolute Uri must be added to the
            // **Allowed Logout URLs** settings for the app.
            .WithRedirectUri(Url.Action("Index", "Home"))
            .Build();

        await HttpContext.SignOutAsync(Constants.AuthenticationScheme, authenticationProperties);
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    }
}
```

### Add the Login and Logout buttons

Add the **Log In** and **Log Out** buttons to the navigation bar. In the `/Views/Shared/_Layout.cshtml` file, in the navigation bar section, add code that displays the **Log Out** button when the user is authenticated and the **Log In** button if not. The buttons link to the `Logout` and `Login` actions in the `AccountController`:

```html
<!-- Views/Shared/_Layout.cshtml -->
<div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
    <ul class="nav navbar-nav">
        <li><a asp-area="" asp-controller="Home" asp-action="Index">Home</a></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
        @if (User.Identity.IsAuthenticated)
        {
            <li><a id="qsLogoutBtn" asp-controller="Account" asp-action="Logout">Logout</a></li>
        }
        else
        {
            <li><a id="qsLoginBtn" asp-controller="Account" asp-action="Login">Login</a></li>
        }
    </ul>
</div>
```

### Run the application

When the user selects the **Log In** button, the SDK redirects them to the [Universal Login Page](/hosted-pages/login) in your Auth0 domain.

## Obtain an Access Token for Calling an API

If you want to call an API from your ASP.NET MVC application, you need to obtain an Access Token issued for the API you want to call. 
As the SDK is configured to use OAuth's [Implicit Grant with Form Post](https://auth0.com/docs/flows/implicit-flow-with-form-post), no access token will be returned by default. In order to do so, we should be using the [Authorization Code Grant](https://auth0.com/docs/flows/authorization-code-flow), which requires the use of a `ClientSecret`.
Next, To obtain the token to access an external API, set the `audience` to the API Identifier when calling `AddAuth0Mvc`. You can get the API Identifier from the [API Settings](${manage_url}/#/apis) for the API you want to use.

In the configuration for the `Auth0Options` object, set the `ClientSecret`, `ResponseType` and `Audience` parameters.

```csharp
// Startup.cs

public void ConfigureServices(IServiceCollection services)
{
    services
        .AddAuth0Mvc(options => {
            options.ClientSecret = Configuration["Auth0:ClientSecret"];
            options.ResponseType = OpenIdConnectResponseType.Code;
            options.Audience = Configuration["Auth0:Audience"];
        });
}
```

Be sure to also update your application's `appsettings.json` file to include the ClientSecret and Audience configuration:

``` json
"Auth0": {
    ...
    "ClientSecret": "${account.clientSecret}",
    "Audience": "${apiIdentifier}"
}
```

### Store and retrieve the tokens

The SDK automatically decodes the ID Token returned from Auth0 and adds the claims from the ID Token as claims in the `ClaimsIdentity`. This means that you can use `User.Claims.FirstOrDefault("<claim type>").Value` to obtain the value of any claim inside any action in your controllers.

The seed project contains a controller action and view that display the claims associated with a user. Once a user has logged in, you can go to `/Account/Claims` to see these claims.

The SDK also stores the tokens in the HttpContext, allowing you to retrieve the token by using the `HttpContext.GetTokenAsync()` method.

```csharp
// Inside one of your controller actions

if (User.Identity.IsAuthenticated)
{
    string accessToken = await HttpContext.GetTokenAsync("access_token");
    
    // if you need to check the Access Token expiration time, use this value
    // provided on the authorization response and stored.
    // do not attempt to inspect/decode the access token
    DateTime accessTokenExpiresAt = DateTime.Parse(
        await HttpContext.GetTokenAsync("expires_at"), 
        CultureInfo.InvariantCulture,
        DateTimeStyles.RoundtripKind);
        
    string idToken = await HttpContext.GetTokenAsync("id_token");

    // Now you can use them. For more info on when and how to use the
    // Access Token and ID Token, see https://auth0.com/docs/tokens
}
```
