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
---

<!-- markdownlint-disable MD041 -->

<%= include('../../../_includes/_new_app', { showClientSecret: false, isPublicClient: false }) %>

<!-- markdownlint-disable MD002 MD041 -->

### Configure Callback URLs

The Callback URL of your application is the URL where Auth0 will redirect to after the user has authenticated in order for the SDK to complete the authentication process.

You will need to add this URL to the list of Allowed URLs for your application in your [Application Settings](${manage_url}/#/applications), this URL will mostly take the format `https://YOUR_APPLICATION_URL/callback`.

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000' }) %>

## Integrate Auth0

[Universal Login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, security, and the most complete array of features. This guide uses Universal Login to provide a way for your users to log in to your Blazor Server application.

### Install dependencies

To integrate Auth0 with Blazor Server you can use our SDK by installing the `Auth0.AspNetCore.Authentication` Nuget package to your application.

```bash
Install-Package Auth0.AspNetCore.Authentication
```

### Install and configure the SDK

To enable authentication in your Blazor Server application, use the middleware provided by the SDK. Go to the `Program.cs` file and call `builder.Services.AddAuth0WebAppAuthentication()` to configure the Auth0 ASP.NET Core SDK.

Ensure to configure the `Domain` and `ClientId`, these are required fields to ensure the SDK knows which Auth0 tenant and application it should use.

```cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuth0WebAppAuthentication(options =>
{
    options.Domain = builder.Configuration["Auth0:Domain"];
    options.ClientId = builder.Configuration["Auth0:ClientId"];
});

var app = builder.Build();
```

Make sure you have enabled authentication and authorization in your Program.cs file:

```csharp
app.UseAuthentication();
app.UseAuthorization();
```

## Login

To allow users to login to your Blazor Server application, add a `LoginModel` to your `Pages` directory.

Inside the `LoginModel`'s `OnGet` method, call `HttpContext.ChallengeAsync()` and pass `Auth0Constants.AuthenticationScheme` as the authentication scheme. This will invoke the OIDC authentication handler that our SDK registers internally. Be sure to also specify the corresponding `authenticationProperties`, which you can construct using the `LoginAuthenticationPropertiesBuilder`.

After successfully calling `HttpContext.ChallengeAsync()`, the user will be redirected to Auth0 and signed in to both the OIDC middleware and the cookie middleware upon being redirected back to your application. This will allow the users to be authenticated on subsequent requests.

```cs
public class LoginModel : PageModel
{
    public async Task OnGet(string redirectUri)
    {
        var authenticationProperties = new LoginAuthenticationPropertiesBuilder()
            .WithRedirectUri(redirectUri)
            .Build();

        await HttpContext.ChallengeAsync(Auth0Constants.AuthenticationScheme, authenticationProperties);
    }
}
```

## Display User Profile

After the middleware has successfully retrieved the tokens from Auth0, it will extract the user's information and claims from the ID Token and make them available through the `AuthenticationState`, which you can add as a `CascadingParameter`.

You can create a custom user profile page for displaying the user's name, as well as additional claims (such as email and picture), by retrieving the corresponding information from the `AuthenticationState`'s `User` property and passing it to the view from inside Blazor code.


```csharp
@page "/Profile"
@attribute [Authorize]

<PageTitle>Profile</PageTitle>

<div class="row">
    <div class="col-md-12">
        <div class="row">
            <h2>Profile</h2>
            <div class="col-md-4">
                <h3>@Username</h3>
            </div>
        </div>
    </div>
</div>

@code {
    [CascadingParameter]
    public Task<AuthenticationState> AuthenticationStateTask { get; set; }
    private string Username = "";

    protected override async Task OnInitializedAsync()
    {
        var state = await AuthenticationStateTask;

        Username = state.User.Identity.Name ?? string.Empty;

        await base.OnInitializedAsync();
    }
}
```

## Logout

Logging out the user from your own application can be done by calling `HttpContext.SignOutAsync` with the `CookieAuthenticationDefaults.AuthenticationScheme` authentication scheme from inside a `LogoutModel`'s `OnGet` method.

Additionally, if you also want to log the user out from Auth0 (this *might* also log them out of other applications that rely on Single Sign On), call `HttpContext.SignOutAsync` with the `Auth0Constants.AuthenticationScheme` authentication scheme as well as the appropriate `authenticationProperties` that can be constructed using the `LogoutAuthenticationPropertiesBuilder`.

::: note
When only logging the user out from your own application but not from Auth0, ensure to return `Redirect("/")` or any other appropriate redirect.
:::

```cs
[Authorize]
public class LogoutModel : PageModel
{
    public async Task OnGet()
    {
        var authenticationProperties = new LogoutAuthenticationPropertiesBuilder()
            .WithRedirectUri("/")
            .Build();

        await HttpContext.SignOutAsync(Auth0Constants.AuthenticationScheme, authenticationProperties);
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    }
}
```

## What's next?

We put together a few examples of how to use the SDK in more advanced use cases:

- [Configuring Scopes](https://github.com/auth0/auth0-aspnetcore-authentication/blob/main/EXAMPLES.md#blazor-server)
