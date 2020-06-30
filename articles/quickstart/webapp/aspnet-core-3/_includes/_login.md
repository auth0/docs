## Configure your application to use Auth0

[Universal Login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features. This guide will use it to provide a way for your users to log in to your ASP.NET Core application.

::: note
You can also create a custom login for prompting the user for their username and password. To learn how to do this in your application, follow the [Custom Login sample](https://github.com/auth0-samples/auth0-aspnetcore-mvc-samples/tree/master/Samples/custom-login).
:::

### Install dependencies

To integrate Auth0 with ASP.NET Core you will use the Cookie and OpenID Connect (OIDC) authentication handlers.

If you are adding this to your own existing project, then please make sure that you add the `Microsoft.AspNetCore.Authentication.Cookies` and `Microsoft.AspNetCore.Authentication.OpenIdConnect` packages to your application.

```bash
Install-Package Microsoft.AspNetCore.Authentication.Cookies
Install-Package Microsoft.AspNetCore.Authentication.OpenIdConnect
```

### Install and configure OpenID Connect Middleware

To enable authentication in your ASP.NET Core application, use the OpenID Connect (OIDC) middleware.
Go to the `ConfigureServices` method of your `Startup` class. To add the authentication services, call the `AddAuthentication` method. To enable cookie authentication, call the `AddCookie` method.

Next, configure the OIDC authentication handler. Add a call to `AddOpenIdConnect`. To configure the authentication scheme, pass "Auth0" as the `authenticationScheme` parameter. You will use this value later to challenge the OIDC middleware.

Configure other parameters, such as `ClientId`, `ClientSecret` or `ResponseType`.

By default, the OIDC middleware requests both the `openid` and `profile` scopes. Because of that, you may get a large ID Token in return. We suggest that you ask only for the scopes you need. You can read more about requesting additional scopes in the [User Profile step](/quickstart/webapp/aspnet-core/02-user-profile).

::: note
In the code sample below, only the `openid` scope is requested.
:::

```cs
// Startup.cs

public void ConfigureServices(IServiceCollection services)
{
    services.Configure<CookiePolicyOptions>(options =>
    {
        // This lambda determines whether user consent for non-essential cookies is needed for a given request.
        options.CheckConsentNeeded = context => true;
        options.MinimumSameSitePolicy = SameSiteMode.None;
    });

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
        options.ResponseType = OpenIdConnectResponseType.Code;

        // Configure the scope
        options.Scope.Add("openid");

        // Set the callback path, so Auth0 will call back to http://localhost:3000/callback
        // Also ensure that you have added the URL as an Allowed Callback URL in your Auth0 dashboard
        options.CallbackPath = new PathString("/callback");

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
    services.AddControllersWithViews();
}
```

Next, add the authentication middleware. In the `Configure` method of the `Startup` class, call the `UseAuthentication` method.

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
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
    }
    app.UseStaticFiles();
    app.UseCookiePolicy();

    app.UseRouting();

    app.UseAuthentication();
    app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");
    });
}
```

### Obtain an Access Token for Calling an API

If you want to call an API from your MVC application, you need to obtain an Access Token issued for the API you want to call. To obtain the token, pass an additional `audience` parameter containing the API identifier to the Auth0 authorization endpoint.

In the configuration for the `OpenIdConnectOptions` object, handle the `OnRedirectToIdentityProvider` event and add the `audience` parameter to `ProtocolMessage`.

```csharp
// Startup.cs

public void ConfigureServices(IServiceCollection services)
{
    // Some code omitted for brevity...

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

## Trigger authentication

### Add the `Login` and `Logout` Methods

Add the `Login` and `Logout` actions to `AccountController`.

To add the `Login` action, call `ChallengeAsync` and pass "Auth0" as the authentication scheme. This will invoke the OIDC authentication handler you registered in the `ConfigureServices` method.

After the OIDC middleware signs the user in, the user is also automatically signed in to the cookie middleware. This allows the user to be authenticated on subsequent requests.

For the `Logout` action, you need to sign the user out of both middlewares.

The `RedirectUri` passed in both instances indicates where the user is redirected after they log in or fail to log in.

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
            // **Allowed Logout URLs** settings for the app.
            RedirectUri = Url.Action("Index", "Home")
        });
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    }
}
```

ASP.NET Core calls `SignOutAsync` for the "Auth0" authentication scheme. You need to provide the OIDC middleware with the URL for logging the user out of Auth0. To set the URL, handle the `OnRedirectToIdentityProviderForSignOut` event when you register the OIDC authentication handler.

When the application calls `SignOutAsync` for the OIDC middleware, it also calls the `/v2/logout` endpoint of the Auth0 Authentication API. The user is logged out of Auth0.

If you specify the `returnTo` parameter, the users will be redirected there after they are logged out. Specify the URL for redirecting users in the **Allowed Logout URLs** field in your [Application Settings](${manage_url}/#/applications/${account.clientId}/settings).

In the `Startup.cs` file, update the call to `AddOpenIdConnect` with the following code:

```csharp
// Startup.cs

public void ConfigureServices(IServiceCollection services)
{
    // Some code omitted for brevity...

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

### Add the Log In and Log Out Buttons

Add the **Log In** and **Log Out** buttons to the navigation bar. In the `/Views/Shared/_Layout.cshtml` file, in the navigation bar section, add code that displays the **Log Out** button when the user is authenticated and the **Log In** button if not. The buttons link to the `Logout` and `Login` actions in the `AccountController`:

```html
<!-- Views/Shared/_Layout.cshtml -->

<nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
    <div class="container">
        <a class="navbar-brand" asp-area="" asp-controller="Home" asp-action="Index">SampleMvcApp</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
            <ul class="navbar-nav flex-grow-1">
                <li class="nav-item">
                    <a class="nav-link text-dark" asp-area="" asp-controller="Home" asp-action="Index">Home</a>
                </li>
            </ul>
        </div>
        <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
            <ul class="navbar-nav flex-grow-1">
                @if (User.Identity.IsAuthenticated)
                {
                    <li class="nav-item">
                        <a id="qsLogoutBtn" class="nav-link text-dark" asp-controller="Account" asp-action="Logout">Logout</a>
                    </li>
                }
                else
                {
                    <li class="nav-item">
                        <a id="qsLoginBtn" class="nav-link text-dark" asp-controller="Account" asp-action="Login">Login</a>
                    </li>
                }
            </ul>
        </div>
    </div>
</nav>
```

### Run the Application

When the user selects the **Log In** button, the OIDC middleware redirects them to the hosted version of the [Lock](/libraries/lock/v10/customization) widget in your Auth0 domain.

#### About the login flow

1. The user clicks on the **Log In** button and is directed to the `Login` route.
2. The `ChallengeAsync` tells the ASP.NET authentication middleware to issue a challenge to the authentication handler registered with the Auth0 `authenticationScheme` parameter. The parameter uses the "Auth0" value you passed in the call to `AddOpenIdConnect` in the `Startup` class.
3. The OIDC handler redirects the user to the Auth0 `/authorize` endpoint, which displays the Lock widget. The user can log in with their username and password, social provider or any other identity provider.
4. Once the user has logged in, Auth0 calls back to the `/callback` endpoint in your application and passes along an authorization code.
5. The OIDC handler intercepts requests made to the `/callback` path.
6. The handler looks for the authorization code, which Auth0 sent in the query string.
7. The OIDC handler calls the `/oauth/token` endpoint to exchange the authorization code for the user's ID and Access Tokens.
8. The OIDC middleware extracts the user information from the claims on the ID Token.
9. The OIDC middleware returns a successful authentication response and a cookie which indicates that the user is authenticated. The cookie contains claims with the user's information. The cookie is stored, so that the cookie middleware will automatically authenticate the user on any future requests. The OIDC middleware receives no more requests, unless it is explicitly challenged.

### Store the Tokens

The OIDC middleware in ASP.NET Core automatically decodes the ID Token returned from Auth0 and adds the claims from the ID Token as claims in the `ClaimsIdentity`. This means that you can use `User.Claims.FirstOrDefault("<claim type>").Value` to obtain the value of any claim inside any action in your controllers.

The seed project contains a controller action and view that display the claims associated with a user. Once a user has logged in, you can go to `/Account/Claims` to see these claims.

You may want to Access Tokens received from Auth0. For example, you can use the Access Token to authenticate the user in calls to your API. To achieve this, when calling `AddOpenIdConnect`, set the `SaveTokens` property to `true`. This saves the tokens to `AuthenticationProperties`:

```csharp
// Startup.cs

public void ConfigureServices(IServiceCollection services)
{
    // Some code omitted for brevity...

    // Add authentication services
    services.AddAuthentication(options => {
        options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    })
    .AddCookie()
    .AddOpenIdConnect("Auth0", options => {
        // ...

        // Saves tokens to the AuthenticationProperties
        options.SaveTokens = true;

        options.Events = new OpenIdConnectEvents
        {
            // handle the logout redirection
            OnRedirectToIdentityProviderForSignOut = (context) =>
            {
                //...
            }
        };
    });
}
```

To retrieve the tokens, you can call `GetTokenAsync`:

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

For general information on using APIs with web applications, see the [Authorization Code Flow](/flows/concepts/auth-code) article.
