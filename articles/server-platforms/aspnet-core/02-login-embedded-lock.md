---
title: Login with Embedded Lock
description: This tutorial will show you can host the Lock widget inside your application instead of using the Lock widget which is hosted on the Auth0 domain.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-aspnetcore-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-aspnetcore-sample',
  pkgBranch: 'master',
  pkgPath: '02-Login-Embedded-Lock',
  pkgFilePath: '02-Login-Embedded-Lock/SampleMvcApp/appsettings.json',
  pkgType: 'replace'
}) %>



## Background

When using the normal OIDC middleware, when a user wants to log in and the middleware is called, the user will be redirected to the Auth0 website to sign in using the hosted version of Lock. This may not be the user experience you are looking for. You may for example want to embed Lock inside your application so it has more of the look-and-feel of your own application. In this instance you can use both Lock and the OIDC middleware together, but it requires a bit of extra work on your side.

Normally when the OIDC middleware initiates the 1st leg of the authentication, it will send along information contained in `state` and `nonce` parameters. After the user has authenticated and Auth0 redirects back to the redirect URL inside your application, in will pass back this `state` and `nonce` parameters. The OIDC middleware is going to pick up that callback to the redirect URL because it will need to exchange the `code` for an `access_token`. It will however validate the `state` and `nonce` parameters to protect against CSRF.

This poses a problem. When you embed Lock in your application, the OIDC middleware is not initiating the 1st leg of the OAuth flow. Instead, the embedded Lock widget is initiating that first step.

You will therefore need to construct correct `state` and `nonce` parameters (as if the OIDC middleware did it so that it can validate it correctly), and then be sure to specify the `state` and `nonce` parameters on Lock so that Auth0 can send back the correct values for these parameters after the user has authenticated.

## Configure OpenID Connect middleware

In the `ConfigureServices` method of your `Startup` class, ensure that you add the authentication services. You will also need to register the `OpenIdConnectOptions` with the Dependency Injection (DI) framework.

The `OpenIdConnectOptions` will contain the configuration settings required for the OIDC middleware to communicate with Auth0 correctly:

```csharp
public void ConfigureServices(IServiceCollection services)
{
  // Add authentication services
  services.AddAuthentication(
    options => options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme);

  // Configure OIDC
  services.Configure<OpenIdConnectOptions>(options =>
  {
    // Specify Authentication Scheme
    options.AuthenticationScheme = "Auth0";

    // Set the authority to your Auth0 domain
    options.Authority = $"https://{Configuration["auth0:domain"]}";

    // Configure the Auth0 Client ID and Client Secret
    options.ClientId = Configuration["auth0:clientId"];
    options.ClientSecret = Configuration["auth0:clientSecret"];

    // Do not automatically authenticate and challenge
    options.AutomaticAuthenticate = false;
    options.AutomaticChallenge = false;

    // Set response type to code
    options.ResponseType = "code";

    // Set the callback path, so Auth0 will call back to http://localhost:60856/signin-auth0
    // Also ensure that you have added the URL as an Allowed Callback URL in your Auth0 dashboard
    options.CallbackPath = new PathString("/signin-auth0");

    // Configure the Claims Issuer to be Auth0
    options.ClaimsIssuer = "Auth0";
  });

  // Add framework services.
  services.AddMvc();

  // Add functionality to inject IOptions<T>
  services.AddOptions();

  // Add the Auth0 Settings object so it can be injected
  services.Configure<Auth0Settings>(Configuration.GetSection("Auth0"));
}
```

The reason we configure the OIDC options with the DI Framework is because we will need to obtain it later in order to construct the correct State parameter.

## Configure OpenID Connect middleware

Next you must configure the Cookie and OIDC middleware in the `Configure` method.

First be sure to change the signature of your `Configure` method to accept a parameter called `oidcOptions` of type `IOptions<OpenIdConnectOptions>`. The DI framework will inject the `OpenIdConnectOptions` registered in the `ConfigureServices` method as the value of this parameter.

Next register the Cookie middleware by making a call to the `UseCookieAuthentication` method. Then register the OIDC middleware by making a call to the `UseOpenIdConnectAuthentication` method, passing along the value of the `oidcOptions` parameter which was injected by the DI framework.

Both these middleware should be registered before your MVC middleware in order for your controllers to be protected:

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IOptions<OpenIdConnectOptions> oidcOptions)
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
    app.UseOpenIdConnectAuthentication(oidcOptions.Value);

    app.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
    });
}
```

## Add the OpenID Connect helper classes

In order to configure the `state` parameter and save the correct Cookies for the OIDC middleware to work correctly when the redirect URL is called, you will need to add 2 helper classes to your project. You can download the source code for these helper files classes from the following locations:

* [Auth0Extensions.cs](https://github.com/auth0-samples/auth0-aspnetcore-sample/blob/master/02-Login-Embedded-Lock/SampleMvcApp/Auth0Settings.cs)
* [LockContext.cs](https://github.com/auth0-samples/auth0-aspnetcore-sample/blob/master/02-Login-Embedded-Lock/SampleMvcApp/LockContext.cs)

::: panel-warning Fix namespaces
Be sure fix the namespaces in the files above to correlate with the namespace of your own project
:::

## Add Login and Logout methods

Next you will need to add `Login` and `Logout` actions to the `AccountController`.

First though, add a constructor to the `AccountController` which will accept a parameter of `IOptions<OpenIdConnectOptions>` (this will be injected by the DI framework). Be sure to save this parameter to an instance variable, as you will need to use it in the `Login` action.

The `Login` method must call the `GenerateLockContext` extension method which will create the correct `state` and `nonce` parameters and set the correct Cookies for the OIDC middleware to function correctly. It will return a `LockContext` parameter which you must pass along to the View.

After the OIDC middleware has signed the user in, the user will automatically be signed into the cookie middleware as well to authenticate them on subsequent requests. So for the `Logout` action you will need to sign the user out of both the OIDC and the cookie middleware:

``` csharp
public class AccountController : Controller
{
    IOptions<OpenIdConnectOptions> _options;

    public AccountController(IOptions<OpenIdConnectOptions> options)
    {
        _options = options;
    }

    // GET: /<controller>/
    public IActionResult Login(string returnUrl = null)
    {
        var lockContext = HttpContext.GenerateLockContext(_options.Value, returnUrl);

        return View(lockContext);
    }

    public async Task<IActionResult> Logout()
    {
        // Sign the user out of the authentication middleware (i.e. it will clear the Auth cookie)
        HttpContext.Authentication.SignOutAsync("Auth0");
        await HttpContext.Authentication.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        // Redirect the user to the home page after signing out
        return RedirectToAction("Index", "Home");
    }
}
```

## Create the Login View

For the Login screen you can create a Razor view and embed the code for Lock. You can head over to our [Lock Library page](/libraries/lock#start-using-auth0lock) and configure Lock the way you want, and then copy and paste the code it generated into your Login page:

```html
@model LockContext

<div id="root" style="width: 320px; margin: 40px auto; padding: 10px; border-style: dashed; border-width: 1px;">
    embeded area
</div>
<script src="https://cdn.auth0.com/js/lock-9.1.min.js"></script>
<script>

  var lock = new Auth0Lock('@Model.ClientId', '@Model.Domain');

  lock.show({
      container: 'root'
    , callbackURL: '@Model.CallbackUrl'
    , responseType: 'code'
    , authParams: {
      scope: 'openid profile',
      state: '@Model.State' ,
     nonce: '@Model.Nonce'
    }
  });
</script>
```

Be sure to set the Client ID, Domain and Callback URL values from the ones supplied by the `LockContext` model. Also be sure to set the correct `state` and `nonce` parameters as shown above, as this is the key to getting everyting to work together.

Also note that the `scope` parameter has been changed to add the `profile` scope. The reason for this is that you want the user's `name` returned so you can set the correct `ClaimTypes.Name` claim. This is discussed in more detail in the [User Profile step](/quickstart/webapp/aspnet-core/05-user-profile)

## Add Login and Logout links

Lastly add Login and Logout links to the navigation bar. To do that, head over to `/Views/Shared/_Layout.cshtml` and add code to the navigation bar section which displays a Logout link when the user is authenticated, otherwise a Login link. This will link to the `Logout` and `Login` actions of the `AccountController` respectively:

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
```

## Run your application

Now when you run the application you can select the Login link to log in to the application. This will take you to the Login view containing the embedded Lock widget. After the user has logged in they can click on the Logout link to log them out of the application.
