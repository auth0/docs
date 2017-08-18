## Configure OpenID Connect Middleware

The easiest way to enable authentication with Auth0 in your ASP.NET Core application is to use the OpenID Connect middleware. First, go to the `ConfigureServices` method of your `Startup` class and add the authentication services by calling the `AddAuthentication` method:

```cs
// Startup.cs

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

Both of these middleware should be registered before your MVC middleware in order for your controllers to be protected. The OIDC middleware is required in order to authenticate the user with Auth0. Once the user has authenticated they will be signed into the Cookie middleware which will be used to authenticate all subsequent requests.

```csharp
// Startup.cs

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
    var options = new OpenIdConnectOptions("Auth0")
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

        // Set the callback path, so Auth0 will call back to http://localhost:5000/signin-auth0 
        // Also ensure that you have added the URL as an Allowed Callback URL in your Auth0 dashboard 
        CallbackPath = new PathString("/signin-auth0"),

        // Configure the Claims Issuer to be Auth0
        ClaimsIssuer = "Auth0"
    };
    options.Scope.Clear();
    options.Scope.Add("openid");
    app.UseOpenIdConnectAuthentication(options);

    app.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
    });
}
```

Also note above that the list of scopes is cleared and only the `openid` scope is requested. By default the OIDC middleware will request both the `openid` and the `profile` scopes and can result in a large `id_token` being returned. It is suggested that you be more explicit about the scopes you want to be returned and not ask for the entire profile to be returned. Requesting additional scopes is discussed later in the [User Profile step](/quickstart/webapp/aspnet-core/04-user-profile). 

### Obtaining an Access Token for calling an API

You may want to call an API from your MVC application, in which case you need to obtain an `access_token` which was issued for the particular API you want to call. In this case you will need to pass an extra `audience` parameter containing the API Identifier to the Auth0 authorization endpoint. 

If you want to do this, simply handle the `OnRedirectToIdentityProvider` event when configuring the `OpenIdConnectOptions` object, and add the `audience` parameter to the `ProtocolMessage`

```csharp
var options = new OpenIdConnectOptions("Auth0")
{
    // Other configuration and standard parameters
    // ...
    Events = new OpenIdConnectEvents
    {
        OnRedirectToIdentityProvider = context =>
        {
            context.ProtocolMessage.SetParameter("audience", "${apiIdentifier}");

            return Task.FromResult(0);
        }
    }
};
```

For more information on storing and saving the `access_token` to use later when calling the API, see the [Storing Tokens step](/quickstart/webapp/aspnet-core/03-storing-tokens).

For general information on using APIs with web applications, please read [Calling APIs from Server-side Web Apps](/api-auth/grant/authorization-code).

## Add Login and Logout Methods

Next, you will need to add `Login` and `Logout` actions to the `AccountController`. 

For the Login, you will need to return a `ChallengeResult` and specify "Auth0" as the authentication scheme which will be challenged. This will invoke the OIDC middleware you registered in the `Configure` method.

After the OIDC middleware has signed the user in, the user will automatically be signed into the cookie middleware as well to authenticate them on subsequent requests. So, for the `Logout` action you will need to sign the user out of both the OIDC and the cookie middleware: 

```cs
// Controllers/AccountController.cs

public class AccountController : Controller
{
    public IActionResult Login()
    {
        return new ChallengeResult("Auth0", new AuthenticationProperties() { RedirectUri = "/" });
    }

    public async Task Logout()
    {
        await HttpContext.Authentication.SignOutAsync("Auth0", new AuthenticationProperties
        {
            RedirectUri = Url.Action("Index", "Home")
        });
        await HttpContext.Authentication.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    }
}
```

At this point ASP.NET Core will call `SignOutAsync` for the **Auth0** authentication scheme (i.e. the OIDC middleware), but the OIDC middleware does not know what the actual Logout URL is it should call to log the user out of Auth0. To do this you should handle the `OnRedirectToIdentityProviderForSignOut` event when registering the OIDC middleware.

So back in the `Startup.cs` file, update the instantiation of `OpenIdConnectOptions` with the following code:

```csharp
// Startup.cs

var options = new OpenIdConnectOptions("Auth0")
{
    // some code omitted for brevity...

    Events = new OpenIdConnectEvents
    {
        // handle the logout redirection 
        OnRedirectToIdentityProviderForSignOut = (context) =>
        {
            var logoutUri = $"https://{auth0Settings.Value.Domain}/v2/logout?client_id={auth0Settings.Value.ClientId}";

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
    }
};
```

This will ensure that when `SignOutAsync` is called for the OIDC Middleware, that the `/v2/logout` endpoint of the Auth0 Authentication API is called to log the user out of Auth0. 

It will also pass along the Redirect URL (when specified) in the `returnTo` parameter. You must therefore ensure that you have specified this URL in the **Allowed Logout URLs** for your Client in the Auth0 Dashboard.

## Add Login and Logout Links

Lastly, add Login and Logout links to the navigation bar. To do that, head over to `/Views/Shared/_Layout.cshtml` and add code to the navigation bar section which displays a Logout link when the user is authenticated, otherwise a Login link. These will link to the `Logout` and `Login` actions of the `AccountController` respectively:  

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

## Run the Application

Now, when you run the application you can select the Login link to log into the application. This will challenge the OIDC middleware which will subsequently redirect you to the hosted version of Lock on your Auth0 domain.

::: panel Understanding the Login Flow

1. The user clicks on the Login link and is directed to the `Login` route
2. This returns a `ChallengeResult` which instructs the ASP.NET Authentication middleware to issue a challenge to the Authentication middleware which is registered with the `authenticationScheme` of `Auth0`. (When we created the instance of `OpenIdConnectOptions` in the `Startup` class we passed a value of **Auth0** to the constructor. This is the authentication scheme, so that is why the authentication middleware knows to challege this OIDC middleware to authenticate the user.)
3. At this point the OIDC middleware is challenged, and it will redirect the user to the Auth0 `/authorize` endpoint, which will display Lock and require the user to log in - whether it be with username/password, social provider or any other Identity Provider.
4. Once the user has logged in, Auth0 will call back to the `/signin-auth0` endpoint in your application and pass along an authorization code.
5. The OIDC middleware will "listen" for any request made to the `/signin-auth0` path and intercept it. It will look for the authorization code which Auth0 sent in the query string and then call the `/oauth/token` endpoint to exchange the authorization code for an `id_token` and `access_token`.
6. The OIDC middleware will look at the `id_token` and extract the user information from the claims on the token.
7. Finally the OIDC middleware will return a successful authentication response, which will result in a cookie being stored indicating that the user is authenticated, and the cookie will also contain claims with the user's information. This means that on all subsequent requests the cookie middleware will automatically authenticate the user, and no further requests will be made to the OIDC middleware (unless explicitly challenged).
:::

## Next Steps

If you prefer to create a custom Login screen, refer to the [Custom Login step](/quickstart/webapp/aspnet-core/02-login-custom). 

Alternatively, you can simply carry on to the [Storing Tokens step](/quickstart/webapp/aspnet-core/03-storing-tokens) which will demonstrate how you can store the tokens returned by Auth0.
