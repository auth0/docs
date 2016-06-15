---
title: Login
description: This tutorial will show you how to use the standard OpenID Connect middleware to add authentication to your web app.
---

# ASP.NET Core Tutorial

This tutorial explains how to configure the standard OpenID Connect middleware in your ASP.NET Core application so your users can sign in with Auth0.

## Tutorial
::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Microsoft Visual Studio 2015
* .NET Core RC2
* .NET Core RC2 Tools for Visual Studio 2015 (Preview 1)

If you do not have the correct tools installed, please [follow the instructions](https://www.microsoft.com/net/core#windows) on the .NET Core Website.
:::

## Background

When using the normal OIDC middleware, when a user wants to log in and the middleware is called, the user will be redirected to the Auth0 website to sign in using the hosted version of Lock. This may not be the user experience you are looking for. You may for example want to embed Lock inside your application so it has more of the look-and-feel of your own application. In this instance you can use both Lock and the OIDC middleware together, but it requires a bit of extra work on your side.

Normally when the OIDC middleware initiates the 1st leg of the authentication, it will send along information contained in `state` and `nonce` parameters. After the user has authenticated and Auth0 redirects back to the redirect URL inside your application, in will pass back this `state` and `nonce` parameters. The OIDC middleware is going to pick up that callback to the redirect URL because it will need to exchange the `code` for an `access_token`. It will however validate the `state` parameter to protect against CSRF.

This poses a problem. When you embed Lock in your application, the OIDC middleware is not initiating the 1st leg of the OAuth flow. Lock is.

So in this instance you will need to construct correct `state` and `nonce` parameters (as if the OIDC middleware did it so that it can validate it correctly), and then be sure to specify the `state` and `nonce` parameters on Lock so that Auth0 can send back the correct values for these parameters after the user has authenticated.

This Quickstart will walk you through setting all of this up correctly.

### 1. Creating a new application in Visual Studio

In Visual Studio, create a new project by selecting File > New > Project. Under the .NET Core section, select ASP.NET Core Web application:

![New Project](/media/articles/aspnet-core/new-project.png)

Next, select Web Application and ensure that you set the Authentication to **No Authentication**:

![Project Type](/media/articles/aspnet-core/aspnet-project-type.png)

### 2. Install the NuGet packages

Use the NuGet Package Manager (Tools -> NuGet Package Manager -> Package Manager Console) to install the **Microsoft.AspNetCore.Authentication.Cookies** and **Microsoft.AspNetCore.Authentication.OpenIdConnect** packages, running the command:

${snippet(meta.snippets.dependencies)}

### 3. Configuring your Auth0 Application

<div class="setup-callback">
<p>After the user has authenticated using Auth0, we will do an HTTP POST back to the <strong>/signin-auth0</strong> path of your website which will be intercepted by the OIDC middleware. For security purposes, you have to register this URL on the <a href="${uiAppSettingsURL}">Application Settings</a> section of your Auth0 Dashboard.</p>

So before proceeding further, be sure to register the URL <code>http://YOUR_WEBSITE_URL/signin-auth0</code> on the <a href="${uiAppSettingsURL}">Application Settings</a> section of your Auth0 Dashboard. (Replace "YOUR_WEBSITE_URL" with the actual base URL of your web application.)
</div>

### 4. Add the Auth0 settings to your configuration file

Add configuration settings for the Auth0 domain, Client ID and Client Secret in you `appsettings.json` file as set their correct values:

``` json
{
  "auth0": {
    "domain": "${account.namespace}",
    "clientId": "${account.clientId}",
    "clientSecret": "${account.clientSecret}"
  }
}
```

### 5. Configure Authentication Services and OpenID Connect options

In the `ConfigureServices` method of your `Startup` class, ensure that you add the authentication services.

You will also need to configure the OIDC options. The reason we configure the OIDC options with the DI is because we will need to obtain it later in order to construct the correct State parameter.

``` csharp
public void ConfigureServices(IServiceCollection services)
{
    // Add authentication services
    services.AddAuthentication(
        options => options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme);

    // Configure OIDC Options
    services.Configure<OpenIdConnectOptions>(options =>
    {
        options.AutomaticAuthenticate = false;
        options.AutomaticChallenge = false;

        // We need to specify an Authentication Scheme
        options.AuthenticationScheme = "Auth0";

        // Set the authority to your Auth0 domain
        options.Authority = $"https://{Configuration["auth0:domain"]}";

        // Configure the Auth0 Client ID and Client Secret
        options.ClientId = Configuration["auth0:clientId"];
        options.ClientSecret = Configuration["auth0:clientSecret"];

        // Set response type to code
        options.ResponseType = "code";

        // Set the callback path, so Auth0 will call back to http://localhost:5000/signin-auth0
        // Also ensure that you have added the URL as an Allowed Callback URL in your Auth0 dashboard
        options.CallbackPath = new PathString("/signin-auth0");

        // Configure the Claims Issuer to be Auth0
        options.ClaimsIssuer = "Auth0";

        options.Events = new OpenIdConnectEvents
        {
            OnTicketReceived = context =>
            {
                // Get the ClaimsIdentity
                var identity = context.Principal.Identity as ClaimsIdentity;
                if (identity != null)
                {
                    // Add the Name ClaimType. This is required if we want User.Identity.Name to actually return something!
                    if (!context.Principal.HasClaim(c => c.Type == ClaimTypes.Name) &&
                                    identity.HasClaim(c => c.Type == "name"))
                        identity.AddClaim(new Claim(ClaimTypes.Name, identity.FindFirst("name").Value));
                }

                return Task.FromResult(0);
            }
        };
    });

    // Add framework services.
    services.AddMvc();
}
```

### 6. Configure the cookie and OpenID Connect middleware

In the Configure method of your Startup class, register the Cookie and OIDC middleware. The `OpenIdConnectOptions` will be retrieved via DI:

``` csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
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
        AutomaticChallenge = true,
        LoginPath = new PathString("/Account/Login"),
        LogoutPath = new PathString("/Account/Logout")
    });

    // Configure OIDC middleware
    var options = app.ApplicationServices.GetRequiredService<IOptions<OpenIdConnectOptions>>();
    app.UseOpenIdConnectAuthentication(options.Value);

    app.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
    });
}
```

### 7. Add the OpenID Connect helper classes

You will need to add 2 helper classes which will help you to construct the correct State and Nonce parameters and set the correct Cookies for the OIDC middleware to work correctly when the redirect URL is called. You can add them to your project:

* [Auth0Extensions.cs](https://github.com/auth0-samples/auth0-aspnetcore-oidc-embedded-lock/blob/master/src/AspNetCoreOidcLockSample/Auth0Extensions.cs)
* [LockContext.cs](https://github.com/auth0-samples/auth0-aspnetcore-oidc-lock/blob/master/src/AspNetCoreOidcLockSample/LockContext.cs)

::: panel-warning Fix the namespaces
Be sure fix the namespaces in the downloaded files to correlate with those of your own project.
:::

### 8. Add an Account Controller

Add an `AccountController` class:

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
        await HttpContext.Authentication.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        // Redirect the user to the home page after signing out
        return RedirectToAction("Index", "Home");
    }
}
```

The `Login` method will call the `GenerateLockContext` extension method which will create the correct `state` and `nonce` parameters and set the correct Cookies for the OIDC middleware to function correctly. It will return a `LockContext` parameter which you can pass along to the View.

Also notice that the `OpenIdConnectOptions` are injected into the Controller, and that it is passed along to the `GenerateLockContext`. This method needs to retrieve the configuration settings for the OIDC middleware so that the correct `state` can be generated. It is for this reason why we had to register the `OpenIdConnectOptions` with the dependency injection.

### 9. Setting up the View

For the Login screen you can create a Razor view and embed the code for Lock. You can head over to our [Lock Library page](https://auth0.com/docs/libraries/lock#start-using-auth0lock) and confgure Lock the way you want, and then copy and paste the code it generated into your Login page.

Here is an example:

```
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
      state: '@Model.State',
	  nonce: '@Model.Nonce'
    }
  });
</script>
```

You can set the Client ID, Domain and Callback URL values from the one supplied by the `LockContext` model. Also be sure to set the correct `state` parameter as shown above, as this is the key to getting everyting to work together.

Also note that I have added `profile` to the `scope` parameter. The reason for this is that we want the user's `name` returned so we can set the correct `ClaimTypes.Name` claim. Refer to the `OnTicketReceived` we declared when rgistering the `OpenIdConnectOptions` in the `ConfigureServices` method of the `Startup` class.

### 10. Run your application

After this you can run the application. Navigate to the `/Account/Login` path and you will be presented with the Login screen with embedded Lock. Once the user signs in, the OIDC middleware will pick up the call to the Callback URL and exchange the code for an access token.
