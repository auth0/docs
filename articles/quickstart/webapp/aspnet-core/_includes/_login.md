## Configure OpenID Connect Middleware

The easiest way to enable authentication with Auth0 in your ASP.NET Core application is to use the OpenID Connect middleware. First, go to the `ConfigureServices` method of your `Startup` class and add the authentication services and enable cookie autentication by calling the `AddAuthentication` and `AddCookie` methods respectively. 

Next you can add a call to `AddOpenIdConnect` to configure the OpenID Connect authentication handler. Configure the authentication scheme by passing "Auth0" as the `authenticationScheme` parameter. This is important, as you will later on use this value to challenge the OIDC middleware.

Also configure the `ClientId`, `ClientSecret`, `ResponseType` and other parameters as per the code sample below:

```cs
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

        // Set the callback path, so Auth0 will call back to http://localhost:5000/signin-auth0 
        // Also ensure that you have added the URL as an Allowed Callback URL in your Auth0 dashboard 
        options.CallbackPath = new PathString("/signin-auth0");

        // Configure the Claims Issuer to be Auth0
        options.ClaimsIssuer = "Auth0";

        options.Events = new OpenIdConnectEvents
        {
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

Note in the code sample above that the scopes are cleared and only the `openid` scope is requested. By default the OIDC middleware will request both the `openid` and the `profile` scopes and can result in a large `id_token` being returned. It is suggested that you be more explicit about the scopes you want to be returned and not ask for the entire profile to be returned. Requesting additional scopes is discussed later in the [User Profile step](/quickstart/webapp/aspnet-core/v2/04-user-profile). 

Next, in the `Configure` method of the `Startup` class, ensure that you add a call to `UseAuthentication` to add the authentication middleware:

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

}
```

### Obtaining an Access Token for calling an API

You may want to call an API from your MVC application, in which case you need to obtain an `access_token` which was issued for the particular API you want to call. In this case you will need to pass an extra `audience` parameter containing the API Identifier to the Auth0 authorization endpoint. 

If you want to do this, simply handle the `OnRedirectToIdentityProvider` event when configuring the `OpenIdConnectOptions` object, and add the `audience` parameter to the `ProtocolMessage`

```csharp
// Startup.cs

public void ConfigureServices(IServiceCollection services)
{
    services.AddAuthentication(options => {
        options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    })
    .AddCookie()
    .AddOpenIdConnect("Auth0", options => {
        // ...

        options.Events = new OpenIdConnectEvents
        {
            OnRedirectToIdentityProvider = context =>
            {
                context.ProtocolMessage.SetParameter("audience", "${apiIdentifier}");

                return Task.FromResult(0);
            }
        };   
    });
}
```

For more information on storing and saving the `access_token` to use later when calling the API, see the [Storing Tokens step](/quickstart/webapp/aspnet-core/v2/03-storing-tokens).

For general information on using APIs with web applications, please read [Calling APIs from Server-side Web Apps](/api-auth/grant/authorization-code).

## Add Login and Logout Methods

Next, you will need to add `Login` and `Logout` actions to the `AccountController`. 

For the Login, you will need to call `ChallengeAsync`, passing "Auth0" as the authentication scheme which will be challenged. This will invoke the OIDC authentication handler you registered in the `ConfigureServices` method.

After the OIDC middleware has signed the user in, the user will automatically be signed into the cookie middleware as well to authenticate them on subsequent requests. So, for the `Logout` action you will need to sign the user out of both the OIDC and the cookie middleware.

Also take note of the `RedirectUri` which is passed in both instances. This indicates where the user should be redirected to after a successful login and logout respectively.

```cs
// Controllers/AccountController.cs

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

public class AccountController : Controller
{
    public async Task Login(string returnUrl = "/")
    {
        await HttpContext.ChallengeAsync("Auth0", new AuthenticationProperties() { RedirectUri = returnUrl });
    }

    [Authorize]
    public async Task Logout()
    {
        await HttpContext.SignOutAsync("Auth0", new AuthenticationProperties
        {
            // Indicate here where Auth0 should redirect the user after a logout.
            // Note that the resulting absolute Uri must be whitelisted in the 
            // **Allowed Logout URLs** settings for the client.
            RedirectUri = Url.Action("Index", "Home")
        });
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    }
}
```

At this point ASP.NET Core will call `SignOutAsync` for the "Auth0" authentication scheme (i.e. the OIDC authentication handler), but the OIDC middleware does not know what the actual Logout URL is it should call to log the user out of Auth0. To do this you should handle the `OnRedirectToIdentityProviderForSignOut` event when registering the OIDC authentication handler.

So back in the `Startup.cs` file, update the call to `AddOpenIdConnect` with the following code:

```csharp
// Startup.cs
// some code was omitted for brevity...

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
        // ...

        options.Events = new OpenIdConnectEvents
        {
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
}
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
2. This calls `ChallengeAsync` which instructs the ASP.NET Authentication middleware to issue a challenge to the Authentication handler which is registered with the `authenticationScheme` of `Auth0`. (When we made the call to `AddOpenIdConnect` in the `Startup` class we passed a value of **Auth0** for the `authenticationScheme` parameter. This is why the authentication middleware knows to challege this OIDC authentication handler to authenticate the user.)
3. At this point the OIDC handler is invoked, and it will redirect the user to the Auth0 `/authorize` endpoint, which will display Lock and require the user to log in - whether it be with username/password, social provider or any other Identity Provider.
4. Once the user has logged in, Auth0 will call back to the `/signin-auth0` endpoint in your application and pass along an authorization code.
5. The OIDC handler will "listen" for any request made to the `/signin-auth0` path and intercept it. It will look for the authorization code which Auth0 sent in the query string and then call the `/oauth/token` endpoint to exchange the authorization code for an `id_token` and `access_token`.
6. The OIDC middleware will look at the `id_token` and extract the user information from the claims on the token.
7. Finally the OIDC middleware will return a successful authentication response, which will result in a cookie being stored indicating that the user is authenticated, and the cookie will also contain claims with the user's information. This means that on all subsequent requests the cookie middleware will automatically authenticate the user, and no further requests will be made to the OIDC middleware (unless explicitly challenged).
:::

## Next Steps

Continue to the [Storing Tokens step](/quickstart/webapp/aspnet-core/v2/02-storing-tokens) which will demonstrate how you can store the tokens returned by Auth0.
