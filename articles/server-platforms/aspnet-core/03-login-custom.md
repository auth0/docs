---
title: Custom Login
description: This tutorial will show you how to create a custom login page for your web application by using the Auth0 .NET SDK and OpenID Connect middleware.
budicon: 448
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-aspnetcore-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-aspnetcore-sample',
  pkgBranch: 'master',
  pkgPath: '03-Login-Custom',
  pkgFilePath: '03-Login-Custom/SampleMvcApp/appsettings.json',
  pkgType: 'replace'
}) %>



## Add the Auth0 Authentication SDK

To log in the user you will be using the Auth0 Authentication SDK for .NET, so install the NuGet package:

```bash
Install-package Auth0.AuthenticationApi
```

## Register the Middlware

First you need to register the cookie middleware. Update the `ConfigureServices` method in your `Startup` class to register the relevant services for the cookie middleware:

```csharp
// Add authentication services
services.AddAuthentication(
    options => options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme);
```

Also update the `Configure` method in your `Startup` class to register the cookie middleware:

```csharp
// Add the cookie middleware
app.UseCookieAuthentication(new CookieAuthenticationOptions
{
  AutomaticAuthenticate = true,
  AutomaticChallenge = true
});
```

It is best to register the Cookie middleware just before you register the MVC middleware.

## Create the Login Form

You need to create a Login form which will capture the user's email address and password and then use the Authentication SDK to sign the user it.

First create a view model called `LoginViewModel` to bind the values in the form to:

```csharp
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
public class AccountController : Controller
{
  private readonly Auth0Settings _auth0Settings;

  public AccountController(IOptions<Auth0Settings> auth0Settings)
  {
    _auth0Settings = auth0Settings.Value;
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
        AuthenticationApiClient client = new AuthenticationApiClient(new Uri($"https://{_auth0Settings.Domain}/"));

        var result = await client.AuthenticateAsync(new AuthenticationRequest
        {
          ClientId = _auth0Settings.ClientId,
          Scope = "openid",
          Connection = "Database-Connection", // Specify the correct name of your DB connection
          Username = vm.EmailAddress,
          Password = vm.Password
        });

        // Get user info from token
        var user = await client.GetTokenInfoAsync(result.IdToken);

        // Create claims principal
        var claimsPrincipal = new ClaimsPrincipal(new ClaimsIdentity(new[]
        {
          new Claim(ClaimTypes.NameIdentifier, user.UserId),
          new Claim(ClaimTypes.Name, user.FullName)

        }, CookieAuthenticationDefaults.AuthenticationScheme));

        // Sign user into cookie middleware
        await HttpContext.Authentication.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);

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
  public IActionResult Logout()
  {
    HttpContext.Authentication.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

    return RedirectToAction("Index", "Home");
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

1. First the `AccountController` constructor is changed to take a parameter called `auth0Settings` of type `IOptions<Auth0Settings>`. This will be injected by the DI framework.
2. Create a `Login` action for GET requests which will return the Login view.
3. Create a `Login` action for POST requests which will call the Authentication API to authenticate the user. If the user is successfully authenticated, the user's information is obttained from the token and a new `ClaimsPrincipal` is created with the relevant claims. Finally the user is signed in to the Cookie middleware.
4. Create a `Logout` method which will sign the user out of the cookie middleware.

## Signing in with Google

If you would like the user to sign in with their Google accounts you will need to use the OpenID Connect middleware.

First update the `AccountController` to add a `LoginExternal` action that will be called from the Login view. This action takes a `connection` parameter which will be passed along in the `Properties` of the `ChallengeResult`:

```csharp
[HttpGet]
public IActionResult LoginExternal(string connection, string returnUrl = "/")
{
  var properties = new AuthenticationProperties() { RedirectUri = returnUrl };

  if (!string.IsNullOrEmpty(connection))
    properties.Items.Add("connection", connection);

  return new ChallengeResult("Auth0", properties);
}
```

Update your `Login.cshtml` view to add a button inside the `<form>` element with the text "Login with Google". This will invoke the `LoginExternal` action created above and pass along "google-oauth2" in the `connection` parameter as the social identity provider to invoke:

```html
<div class="form-group">
  <a class="btn btn-lg btn-default btn-block" asp-controller="Account" asp-action="LoginExternal" asp-route-connection="google-oauth2" asp-route-returnurl="@ViewData["ReturnUrl"]">
    Login with Google
  </a>
</div>
```

If you want to allow your users to sign in with other social identity providers, simply add extra buttons and pass in the correct value for the `connection` parameter to invoke the correct indentity provider, for example "twitter", "linkedin", "facebook", etc.

Finally, update the `Configure` method in your `Startup` class to register the OIDC middleware. Normally when challenging the OIDC middleware, the OAuth Lock will be displayed but this is not the desired behaviour in this case. Instead you need to invoke the requested social identity provider which was passed in the `AuthenticationProperties` of the `ChallengeResult`.

In order to do this, handle the `OnRedirectToIdentityProvider` event when registering the OIDC middleware and look at that `Properties` for the requested `connection`. Add the parameter to the OIDC request which is passed along to Auth0. This will ensure that Auth0 invoke the correct social identity provider directly, instead of displaying the Lock widget:

```csharp
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
  ClaimsIssuer = "Auth0",

  Events = new OpenIdConnectEvents
  {
    OnRedirectToIdentityProvider = context =>
    {
      if (context.Properties.Items.ContainsKey("connection"))
        context.ProtocolMessage.SetParameter("connection", context.Properties.Items["connection"]);

      return Task.FromResult(0);
    }
  }
});
```

## Adding Login and Logout Links

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

## Run the application

You can now run your application. When you click on the Login link you will be taken to the new Login page where you can sign in with either your email address and password, or with your Google account.
