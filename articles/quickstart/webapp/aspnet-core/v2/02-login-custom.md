---
title: Custom Login
description: This tutorial will show you how to create a custom login page for your web application by using the Auth0 .NET SDK and OpenID Connect middleware.
budicon: 448
---

<%= include('../../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-mvc-samples',
  path: 'Quickstart/02-Login-Custom',
  branch: 'master',
  requirements: [
    '.NET Core SDK 2.0',
    '.NET Core 2.0',
    'ASP.NET Core 2.0'
  ]
}) %>


## Add the Auth0 Authentication SDK

To log in the user you will be using the Auth0 Authentication SDK for .NET, so install the NuGet package:

```text
Install-package Auth0.AuthenticationApi
```

## Register the Middlware

You will need to configure the cookie authentication services, so update the `ConfigureServices` method in your `Startup` class to register the relevant services for the cookie authentication handler:

```csharp
// Startup.cs

public void ConfigureServices(IServiceCollection services)
{
    // Add authentication services
    services.AddAuthentication(options => {
        options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    })
    .AddCookie();
}
```

Also update the `Configure` method in your `Startup` class to register the authentication middleware:

```csharp
// Startup.cs

public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }
    else
    {
        app.UseExceptionHandler("/Home/Error");
    }

    app.UseStaticFiles();

    app.UseAuthentication();

    app.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
    });
}
```

## Create the Login Form

You need to create a Login form which will capture the user's email address and password and then use the Authentication SDK to sign the user it.

First create a view model called `LoginViewModel` to bind the values in the form to:

```csharp
// ViewModels/LoginViewModel.cs

public class LoginViewModel
{
  [Required]
  [EmailAddress]
  [Display(Name = "Email Address")]
  public string EmailAddress { get; set; }

  [Required]
  [DataType(DataType.Password)]
  [Display(Name = "Password")]
  public string Password { get; set; }
}
```

Create a Razor view called `Login.cshtml` in your `\Views\Account` folder which will allow the user to enter their email address and password:

```html
<!-- Views/Account/Login.cshtml -->

@model SampleMvcApp.ViewModels.LoginViewModel
@{
  ViewData["Title"] = "Log In";
}

<div class="row">
  <div class="col-md-4 col-md-offset-4">
    <section>
      <form asp-controller="Account" asp-action="Login" asp-route-returnurl="@ViewData["ReturnUrl"]" method="post">
        <h4>Log In</h4>
        <hr />
        <div asp-validation-summary="All" class="text-danger"></div>
        <div class="form-group">
          <label asp-for="EmailAddress"></label>
          <input asp-for="EmailAddress" class="form-control input-lg" />
          <span asp-validation-for="EmailAddress" class="text-danger"></span>
        </div>
        <div class="form-group">
          <label asp-for="Password"></label>
          <input asp-for="Password" class="form-control input-lg" />
          <span asp-validation-for="Password" class="text-danger"></span>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-success btn-lg btn-block">Log in</button>
        </div>
      </form>
    </section>
  </div>
</div>
```

Next, you will need to update your `AccountController` as per the code below:

```csharp
// Controllers/AccountController.cs

public class AccountController : Controller
{
    private readonly IConfiguration _configuration;

    public AccountController(IConfiguration configuration)
    {
        this._configuration = configuration;
    }

    [HttpGet]
    public IActionResult Login(string returnUrl = "/")
    {
        ViewData["ReturnUrl"] = returnUrl;

        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginViewModel vm, string returnUrl = null)
    {
        if (ModelState.IsValid)
        {
            try
            {
                AuthenticationApiClient client = new AuthenticationApiClient(new Uri($"https://{_configuration["Auth0:Domain"]}/"));

                var result = await client.GetTokenAsync(new ResourceOwnerTokenRequest
                {
                    ClientId = _configuration["Auth0:ClientId"],
                    ClientSecret = _configuration["Auth0:ClientSecret"],
                    Scope = "openid profile",
                    Realm = "Username-Password-Authentication", // Specify the correct name of your DB connection
                    Username = vm.EmailAddress,
                    Password = vm.Password
                });

                // Get user info from token
                var user = await client.GetUserInfoAsync(result.AccessToken);

                // Create claims principal
                var claimsPrincipal = new ClaimsPrincipal(new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId),
                    new Claim(ClaimTypes.Name, user.FullName)

                }, CookieAuthenticationDefaults.AuthenticationScheme));

                // Sign user into cookie middleware
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);

                return RedirectToLocal(returnUrl);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("", e.Message);
            }
        }

        return View(vm);
    }

    [Authorize]
    public async Task Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    }

    #region Helpers

    private IActionResult RedirectToLocal(string returnUrl)
    {
        if (Url.IsLocalUrl(returnUrl))
        {
            return Redirect(returnUrl);
        }
        else
        {
            return RedirectToAction(nameof(HomeController.Index), "Home");
        }
    }

    #endregion
}
```

This code does the following:

1. First the `AccountController` constructor is changed to take a parameter called `configuration` of type `IConfiguration`. This will ensure the DI (dependency injection) framework will inject the application's configuration into the controller, so you can access the configuration settings from inside the controller.
2. Create a `Login` action for GET requests which will return the Login view.
3. Create a `Login` action for POST requests which will call the Auth0 Authentication API to authenticate the user. If the user is successfully authenticated, the user's information is obttained from the token and a new `ClaimsPrincipal` is created with the relevant claims. Finally the user is signed in to the Cookie middleware.
4. Create a `Logout` method which will sign the user out of the cookie middleware.

## Signing in with Google

If you would like the user to sign in with their Google accounts you will need to use the OpenID Connect middleware which was registered in the [Login step](/quickstart/webapp/aspnet-core/v2/01-login).

First update the `AccountController` to add a `LoginExternal` action that will be called from the Login view. This action takes a `connection` parameter which will be passed along in the `properties` when calling `ChallengeAsync`:

```csharp
// Controllers/AccountController.cs

[HttpGet]
public async Task LoginExternal(string connection, string returnUrl = "/")
{
    var properties = new AuthenticationProperties() { RedirectUri = returnUrl };

    if (!string.IsNullOrEmpty(connection))
        properties.Items.Add("connection", connection);

    await HttpContext.ChallengeAsync("Auth0", properties);
}
```

Update your `Login.cshtml` view to add a button inside the `<form>` element with the text "Login with Google". This will invoke the `LoginExternal` action created above and pass along "google-oauth2" in the `connection` parameter as the social identity provider to invoke:

```html
<!-- Views/Account/Login.cshtml -->

<div class="form-group">
  <a class="btn btn-lg btn-default btn-block" asp-controller="Account" asp-action="LoginExternal" asp-route-connection="google-oauth2" asp-route-returnurl="@ViewData["ReturnUrl"]">
    Login with Google
  </a>
</div>
```

If you want to allow your users to sign in with other social identity providers, simply add extra buttons and pass in the correct value for the `connection` parameter to invoke the correct indentity provider, for example "twitter", "linkedin", "facebook", etc.

Finally, update the `ConfigureServices` method in your `Startup` class to register the OIDC middleware. Normally when challenging the OIDC middleware, the OAuth Lock will be displayed but this is not the desired behaviour in this case. Instead you need to invoke the requested social identity provider which was passed in the `AuthenticationProperties` of the `ChallengeResult`.

In order to do this, handle the `OnRedirectToIdentityProvider` event when registering the OIDC middleware and look at that `Properties` for the requested `connection`. Add the parameter to the OIDC request which is passed along to Auth0. This will ensure that Auth0 invoke the correct social identity provider directly, instead of displaying the Lock widget:

```csharp
// Startup.cs

public void ConfigureServices(IServiceCollection services)
{
    // Add authentication services
    services.AddAuthentication(options => {
        options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    })
    .AddCookie()
    .AddOpenIdConnect("Auth0", options => {
        // Set the authority to your Auth0 domain
        options.Authority = $"https://{Configuration["Auth0:Domain"]}";

        // Configure the Auth0 Client ID and Client Secret
        options.ClientId = Configuration["Auth0:ClientId"];
        options.ClientSecret = Configuration["Auth0:ClientSecret"];

        // Set response type to code
        options.ResponseType = "code";

        // Configure the scope
        options.Scope.Clear();
        options.Scope.Add("openid");
        options.Scope.Add("profile");

        // Set the callback path, so Auth0 will call back to http://localhost:5000/signin-auth0 
        // Also ensure that you have added the URL as an Allowed Callback URL in your Auth0 dashboard 
        options.CallbackPath = new PathString("/signin-auth0");

        // Configure the Claims Issuer to be Auth0
        options.ClaimsIssuer = "Auth0";

        options.Events = new OpenIdConnectEvents
        {
            OnRedirectToIdentityProvider = context =>
            {
                if (context.Properties.Items.ContainsKey("connection"))
                    context.ProtocolMessage.SetParameter("connection", context.Properties.Items["connection"]);

                return Task.FromResult(0);
            },
            // handle the logout redirection 
            OnRedirectToIdentityProviderForSignOut = (context) =>
            {
                var logoutUri = $"https://{Configuration["Auth0:Domain"]}/v2/logout?client_id={Configuration["Auth0:ClientId"]}";

                var postLogoutUri = context.Properties.RedirectUri;
                if (!string.IsNullOrEmpty(postLogoutUri))
                {
                    if (postLogoutUri.StartsWith("/"))
                    {
                        // transform to absolute
                        var request = context.Request;
                        postLogoutUri = request.Scheme + "://" + request.Host + request.PathBase + postLogoutUri;
                    }
                    logoutUri += $"&returnTo={ Uri.EscapeDataString(postLogoutUri)}";
                }

                context.Response.Redirect(logoutUri);
                context.HandleResponse();

                return Task.CompletedTask;
            }
        };   
    });

    // Add framework services.
    services.AddMvc();
}
```

## Adding Login and Logout Links

Lastly add Login and Logout links to the navigation bar. To do that, head over to `/Views/Shared/_Layout.cshtml` and add code to the navigation bar section which displays a Logout link when the user is authenticated, otherwise a Login link. This will link to the `Logout` and `Login` actions of the `AccountController` respectively:

```html
<!-- Views/Shared/_Layout.cshtml -->

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
```

## Run the application

You can now run your application. When you click on the Login link you will be taken to the new Login page where you can sign in with either your email address and password, or with your Google account.
