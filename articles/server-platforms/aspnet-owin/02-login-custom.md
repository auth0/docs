---
title: Custom Login
description: This tutorial will show you how to create a custom login page for your web application by using the Auth0 .NET SDK and OpenID Connect middleware.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-aspnet-owin-mvc-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-aspnet-owin-mvc-sample',
  pkgBranch: 'master',
  pkgPath: '02-Login-Custom',
  pkgFilePath: '02-Login-Custom/MvcApplication/MvcApplication/web.config',
  pkgType: 'replace'
}) %>

## Add the Auth0 Authentication SDK 

To log in the user you will be using the Auth0 Authentication SDK for .NET, so install the NuGet package:

```bash
Install-package Auth0.AuthenticationApi
```

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
@model global::MvcApplication.ViewModels.LoginViewModel
@{
    ViewData["Title"] = "Log In";
}

<h2>@ViewBag.Title.</h2>

<div class="row">
    <div class="col-md-4 col-md-offset-4">
        <section>
            @using (Html.BeginForm("Login", "Account", new { ReturnUrl = ViewBag.ReturnUrl }, FormMethod.Post, new { role = "form" }))
            {
                @Html.AntiForgeryToken()
                @Html.ValidationSummary(true, "", new { @class = "text-danger" })
                <div class="form-group">
                    @Html.LabelFor(m => m.EmailAddress)
                    @Html.TextBoxFor(m => m.EmailAddress, new { @class = "form-control" })
                    @Html.ValidationMessageFor(m => m.EmailAddress, "", new { @class = "text-danger" })
                </div>
                <div class="form-group">
                    @Html.LabelFor(m => m.Password)
                    @Html.PasswordFor(m => m.Password, new { @class = "form-control" })
                    @Html.ValidationMessageFor(m => m.Password, "", new { @class = "text-danger" })
                </div>
                <input type="submit" value="Log in" class="btn btn-success btn-block" />
            }
        </section>
    </div>
</div>
```

Next, you will need to update your `AccountController` as per the code below: 

```csharp
public class AccountController : Controller
{
    private IAuthenticationManager AuthenticationManager
    {
        get
        {
            return HttpContext.GetOwinContext().Authentication;
        }
    }

    [HttpGet]
    public ActionResult Login(string returnUrl = "/")
    {
        ViewData["ReturnUrl"] = returnUrl;

        return View();
    }

    [HttpPost]
    public async Task<ActionResult> Login(LoginViewModel vm, string returnUrl = null)
    {
        if (ModelState.IsValid)
        {
            try
            {
                AuthenticationApiClient client =
                    new AuthenticationApiClient(
                        new Uri($"https://{ConfigurationManager.AppSettings["auth0:Domain"]}/"));

                var result = await client.AuthenticateAsync(new AuthenticationRequest
                {
                    ClientId = ConfigurationManager.AppSettings["auth0:ClientId"],
                    Scope = "openid",
                    Connection = "Database-Connection", // Specify the correct name of your DB connection
                    Username = vm.EmailAddress,
                    Password = vm.Password
                });

                // Get user info from token
                var user = await client.GetTokenInfoAsync(result.IdToken);

                // Create claims principal
                var claimsIdentity = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId),
                    new Claim(ClaimTypes.Name, user.FullName ?? user.Email),
                    new Claim("http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider", "ASP.NET Identity", "http://www.w3.org/2001/XMLSchema#string")
                }, DefaultAuthenticationTypes.ApplicationCookie);

                // Sign user into cookie middleware
                AuthenticationManager.SignIn(new AuthenticationProperties { IsPersistent = false }, claimsIdentity);

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
    public ActionResult Logout()
    {
        HttpContext.GetOwinContext().Authentication.SignOut();

        return RedirectToAction("Index", "Home");
    }

    private ActionResult RedirectToLocal(string returnUrl)
    {
        if (Url.IsLocalUrl(returnUrl))
        {
            return Redirect(returnUrl);
        }
        else
        {
            return RedirectToAction("Index", "Home");
        }
    }
}
```
 
This code does the following:

1. First, and `AuthenticationManager` property is added which will simply get the Authentication Manager from the OWIN context. This is needed to sign the user in. 
2. Create a `Login` action for GET requests which will return the Login view.
3. Create a `Login` action for POST requests which will call the Authentication API to authenticate the user. If the user is successfully authenticated, the user's information is obtained from the token and a new `ClaimsIdentity` is created with the relevant claims. Finally the user is signed in to the Authentication Manager.
4. Create a `Logout` method which will sign the user out of the Authentication Manager. 

## Add Login and Logout links

Lastly add Login and Logout links to the navigation bar. To do that, head over to `/Views/Shared/_Layout.cshtml` and add code to the navigation bar section which displays a Logout link when the user is authenticated, otherwise a Login link. These will link to the `Logout` and `Login` actions of the `AccountController` respectively:  

```html
<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            @Html.ActionLink("Application name", "Index", "Home", new { area = "" }, new { @class = "navbar-brand" })
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li>@Html.ActionLink("Home", "Index", "Home")</li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                @if (User.Identity.IsAuthenticated)
                {
                    <li>@Html.ActionLink("Logout", "Logout", "Account")</li>
                }
                else
                {
                    <li>@Html.ActionLink("Login", "Login", "Account")</li>
                }
            </ul>
        </div>
    </div>
</div>
```

## Run your application

You can now run your application. When you click on the Login link you will be taken to the new Login page where you can sign in with either your email address and password, or with your Google account.

Next up, you can move on to the [Storing Tokens step](/quickstart/webapp/aspnet-owin/03-storing-tokens) which will demonstrate how you can can store the tokens returned by Auth0.
