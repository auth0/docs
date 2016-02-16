---
title: Using Auth0 with ASP.NET MVC 4 - Enterprise Providers
---

# Using Auth0 with ASP.NET MVC 4 - Enterprise Providers

The true power of Auth0 is that it open new possibilities to integrate your application with your customers user directories. In this tutorial we will guide you through a series of steps to enable enterprise single-sign on in your Asp.Net MVC 4 application.

## Before you start

1. You will need Visual Studio 2012 and MVC4
2. Have completed the [previous tutorial](/server-platforms/aspnet). You are supposed to do these steps on top of the result of the previous tutorial.

## Integrating Auth0 with MVC4

### 1. Enable an enterprise provider

Go to [Enterprise Connections](${uiURL}/#/connections/enterprise) in your dashboard and enable Google-Apps connections by providing the same credentials you use for Google OAuth2 in the previous tutorial.

### 2. Create a new provisioning route

We will start by creating a route that will enable us to associate new companies to your application. Create a new controller named ProvisioningController with the following code:

```cs
public class ProvisioningController : Controller
{
    private readonly Auth0.Client auth0Client = new Auth0.Client(
                "${account.clientId}",
                "${account.clientSecret}",
                "${account.namespace}");

    [HttpPost]
    public ActionResult Index(Auth0.ProvisioningTicket ticket)
    {
        return Json(auth0Client.CreateConnection(ticket));
    }
}
```

> This is a very simple route for the purpose of the example. It is more likely that you will have a full process for company sign up and you will request some additional data than the one that Auth0 need. Explore the different overloads of `Client.CreateConnection` method.
>

### 3. Add the provisioning widget

In the previous article we added the login widget to simplify the social and enterprise sign on. Auth0 also provides a very simple provisioning widget for enterprise providers. Modify your `_LoginPartial.cshtml to add the **sign up my company** link:


```html
@if (Request.IsAuthenticated) {
    <text>
        Hello, @Html.ActionLink(User.Identity.Name, "Manage", "Account", routeValues: null, htmlAttributes: new { @class = "username", title = "Manage" })!
        @using (Html.BeginForm("LogOff", "Account", FormMethod.Post, new { id = "logoutForm" })) {
            @Html.AntiForgeryToken()
            <a href="javascript:document.getElementById('logoutForm').submit()">Log off</a>
        }
    </text>
} else {
    <ul>
        <li><a href="javascript:window.Auth0.signIn({onestep: true})">login</a></li>
        <li><a href="javascript:window.Auth0.showProvisioning('/Provisioning')">sign up my company</a></li>
    </ul>
    <script src="${sdkURL}/auth0.js#client=${account.clientId}&authorize_url=/Account/Auth0Login"></script>
}
```

### 4. Handle success delegation

After an administrator of the domain follows the provisioning link, he will be redirected to the same callback we use for login. In this case we want to add the new connection to our list of oauth providers and render a page for the end user that the process has finished

#### 4.a Modify the `ExternalLoginCallback` method in `AccountController.cs` as follows:

```cs
[AllowAnonymous]
public ActionResult ExternalLoginCallback(string returnUrl, bool granted, string domain, string connection)
{
    if (granted && !string.IsNullOrEmpty(domain))
    {
        OAuthWebSecurity.RegisterClient(new Auth0.OpenAuthClient(connection,
                                                            "${account.clientId}",
                                                            "${account.clientSecret}",
                                                            "${account.namespace}",
                                                            connection), connection, new Dictionary<string, object>());

        ViewBag.domain = domain;
        ViewBag.connection = connection;
        return View("Domain_Granted");
    }

    //.... same code you have before next
```

#### 4.b Create a view named `Domain_Granted` in `Views\Account`:

```html
@model dynamic
@{
    ViewBag.Title = "Company setup";
    Layout = "../Shared/_Layout.cshtml";
}

<h2>Company setup</h2>
<p>
    Your company @ViewBag.domain has been setup
</p>
```


### 5. Create a custom route for enterprise login

This step is optional. So far enterprise users can login by entering their work email address in the login widget. In this step we will add a friendly url to this example application to allow enterprise users to directly login to the application `http://ourproduct.com/e/bigcompany.com`.


Create a new controller named EnterpriseLoginController:

```cs
public class EnterpriseLoginController : Controller
{
    //
    // GET: /EnterpriseLogin/
    public ActionResult Open(string domain)
    {
        return new AccountController.ExternalLoginResult(
                domain,
                Url.Action("ExternalLoginCallback", "Account"));
    }
}
```


Modify the `RouteConfig.cs` file and add a new route **before** the default route:

```cs
routes.MapRoute(
    "Enterprise Login",
    "e/{domain}",
    new { controller = "EnterpriseLogin", action = "Open" });
```

And modify the `Domain_Granted`, add the following link:

```html
<a href="/e/@ViewBag.connection"> login as @ViewBag.domain </a>
```

When Enterprise Users visit this URL they are automatically redirected to their company login page:

![](/media/articles/tutorials/mvc-tutorial-enterprise/enterprise-login.png)

## Testing the app:

Open a browser, navigate to the website and press the **sign up my company** link. You should see the provisioning widget and if you have a google account you will be able to register a company:

![](/media/articles/tutorials/mvc-tutorial-enterprise/widget-prov-in-aspnet.png)

Congratulations!
