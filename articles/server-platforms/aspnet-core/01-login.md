---
title: Login
description: This tutorial will show you how to use the standard OpenID Connect middleware to add authentication to your web app.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-aspnetcore-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-aspnetcore-sample',
  pkgBranch: 'master',
  pkgPath: '01-Login',
  pkgFilePath: '01-Login/SampleMvcApp/appsettings.json',
  pkgType: 'replace'
}) %>

## Configure OpenID Connect middleware

The easiest way to enable authentication with Auth0 in your ASP.NET Core application is to use the OpenID Connect middleware. First go to the `ConfigureServices` method of your `Startup` class and add the authentication services by calling the `AddAuthentication` method:

```cs
public void ConfigureServices(IServiceCollection services)
{
    // Add authentication services
    services.AddAuthentication(
        options => options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme);

    // Add framework services.
    services.AddMvc();

    // Add functionality to inject IOptions<T>
    services.AddOptions();

    // Add the Auth0 Settings object so it can be injected
    services.Configure<Auth0Settings>(Configuration.GetSection("Auth0"));
}
```

Next, in the `Configure` method of the `Startup` class add the cookie middleware and the OpenID Connect middleware. Middleware executes in the order they are registered so it is important to register the cookie middleware first, and then the OIDC middleware. 

Both these middleware should be registered before your MVC middleware in order for your controllers to be protected:

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IOptions<Auth0Settings> auth0Settings)
{
    loggerFactory.AddConsole(Configuration.GetSection("Logging"));
    loggerFactory.AddDebug();

    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseBrowserLink();
    }
    else
    {
        app.UseExceptionHandler("/Home/Error");
    }

    app.UseStaticFiles();

    // Add the cookie middleware
    app.UseCookieAuthentication(new CookieAuthenticationOptions
    {
        AutomaticAuthenticate = true,
        AutomaticChallenge = true
    });

    // Add the OIDC middleware
    app.UseOpenIdConnectAuthentication(new OpenIdConnectOptions("Auth0")
    {
        // Set the authority to your Auth0 domain
        Authority = $"https://{auth0Settings.Value.Domain}",

        // Configure the Auth0 Client ID and Client Secret
        ClientId = auth0Settings.Value.ClientId,
        ClientSecret = auth0Settings.Value.ClientSecret,

        // Do not automatically authenticate and challenge
        AutomaticAuthenticate = false,
        AutomaticChallenge = false,

        // Set response type to code
        ResponseType = "code",

        // Set the callback path, so Auth0 will call back to http://localhost:60856/signin-auth0 
        // Also ensure that you have added the URL as an Allowed Callback URL in your Auth0 dashboard 
        CallbackPath = new PathString("/signin-auth0"),

        // Configure the Claims Issuer to be Auth0
        ClaimsIssuer = "Auth0"
    });

    app.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
    });
}
```

## Add Login and Logout methods

Next you will need to add `Login` and `Logout` actions to the `AccountController`. 

For the Login you will need to return a `ChallengeResult` and specify "Auth0" as the authentication scheme which will be challenged. This will invoke the OIDC middleware you registered in the `Configure` method.

After the OIDC middleware has signed the user in, the user will automatically be signed into the cookie middleware as well to authenticate them on subsequent requests. So for the `Logout` action you will need to sign the user out of both the OIDC and the cookie middleware: 

```cs
public class AccountController : Controller
{
    public IActionResult Login()
    {
        return new ChallengeResult("Auth0", new AuthenticationProperties() { RedirectUri = "/" });
    }

    public IActionResult Logout()
    {
        HttpContext.Authentication.SignOutAsync("Auth0");
        HttpContext.Authentication.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        return RedirectToAction("Index", "Home");
    }
}
```

## Add Login and Logout links

Lastly add Login and Logout links to the navigation bar. To do that, head over to `/Views/Shared/_Layout.cshtml` and add code to the navigation bar section which displays a Logout link when the user is authenticated, otherwise a Login link. These will link to the `Logout` and `Login` actions of the `AccountController` respectively:  

```html
<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a asp-area="" asp-controller="Home" asp-action="Index" class="navbar-brand">SampleMvcApp</a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li><a asp-area="" asp-controller="Home" asp-action="Index">Home</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                @if (User.Identity.IsAuthenticated)
                {
                    <li><a  asp-controller="Account" asp-action="Logout">Logout</a></li>
                }
                else
                {
                    <li><a asp-controller="Account" asp-action="Login">Login</a></li>
                }
            </ul>
        </div>
    </div>
</div>
<script src="${widget_url}"></script>
<script>

  var lock = new Auth0Lock('@Model.ClientId', '@Model.Domain', {
      container: 'root',
      auth: {
        redirectUrl: '@Model.CallbackUrl',
        responseType: 'code',
        params: {
            scope: 'openid profile', //Details: https:///scopes
            state: '@Model.State',
            nonce: '@Model.Nonce'
        }
    }
  });

  lock.show();
</script>
```

## Run your application

Now when you run the application you can select the Login link to log in to the application. This will challenge the OIDC middleware which will subsequently redirect you to the hosted version of Lock on your Auth0 domain.

If you prefer to embed Lock inside your application then please refer to the [Embedded Lock step](/quickstart/webapp/aspnet-core/02-login-embedded-lock). If you prefer to create a custom Login screen, refer to the [Custom Login step](/quickstart/webapp/aspnet-core/03-login-custom). 

Alternatively you can simply carry on to the [Storing Tokens step](/quickstart/webapp/aspnet-core/04-storing-tokens) which will demonstrat how you can can store the tokens returned by Auth0.