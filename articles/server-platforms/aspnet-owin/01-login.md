---
title: Login
description: This tutorial will show you how to use the Auth0 OAuth2 middleware to add authentication to your web app.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-aspnet-owin-mvc-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-aspnet-owin-mvc-sample',
  pkgBranch: 'master',
  pkgPath: '01-Login',
  pkgFilePath: '01-Login/MvcApplication/MvcApplication/web.config',
  pkgType: 'replace'
}) %>

## Install and Configure Auth0 OAuth2 middleware

The easiest way to enable authentication with Auth0 in your ASP.NET MVC application is to use the Auth0 ASP.NET OAuth2 middleware which is available in the `Auth0-ASPNET-Owin` NuGet package, so install that first:

``` bash
Install-Package Auth0-ASPNET-Owin
```

Now go to the `Configuration` method of your `Startup` class and configure external cookies as well as the Auth0 middleware:

```cs
public void Configuration(IAppBuilder app)
{
    // Code omitted for brevity...

    // Use a cookie to temporarily store information about a user logging in with a third party login provider
    app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

    // Configure Auth0 authentication
    app.UseAuth0Authentication(
        clientId: System.Configuration.ConfigurationManager.AppSettings["auth0:ClientId"],
        clientSecret: System.Configuration.ConfigurationManager.AppSettings["auth0:ClientSecret"],
        domain: System.Configuration.ConfigurationManager.AppSettings["auth0:Domain"]);

}
```

## Add Login and Logout methods

Next you will need to add `Login` and `Logout` actions to the `AccountController`. 

For the `Login` action you can simply return the Login view which we will create in the next step. For the `Logout` action you will need to sign the user out of the Authentication Manager and then redirect them back to the home page:

```cs
public class AccountController : Controller
{
    public ActionResult Login()
    {
        return View();
    }

    [Authorize]
    public ActionResult Logout()
    {
        HttpContext.GetOwinContext().Authentication.SignOut();

        return RedirectToAction("Index", "Home");
    }
}
```

## Add the Login view

For the Login view you can embed the [Auth0 Lock component](/libraries/lock). You can use the sample code below which adds a `<div>` to your view and then initializes the Lock component to display inside the view.

``` html
@using System.Configuration
@{
    ViewBag.Title = "Login";
}


<div id="root" style="width: 320px; margin: 40px auto;">
</div>

<script src="https://cdn.auth0.com/js/lock/10.0/lock.min.js"></script>
<script>
    var lock = new Auth0Lock('@ConfigurationManager.AppSettings["auth0:ClientId"]', '@ConfigurationManager.AppSettings["auth0:Domain"]',
        {
            container: 'root',
            auth: {
                redirectUrl: window.location.origin + '/signin-auth0',
                responseType: 'code',
                params: {
                    scope: 'openid'
                }
            }
        });
    lock.show();
</script>
```

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

Now when you run the application you can select the Login link to log in to the application. This will display the Login page with the Auth0 Lock component embedded in the page. The user can enter their username and password to log in, or alternatively log in with any of the social login providers you may have configured.

If you prefer to create a custom Login screen, refer to the [Custom Login step](/quickstart/webapp/aspnet-owin/02-login-custom). 

Alternatively you can simply carry on to the [Storing Tokens step](/quickstart/webapp/aspnet-owin/03-storing-tokens) which will demonstrate how you can can store the tokens returned by Auth0.