---
title: Auth0 ASP.NET OWIN SDK Web App Tutorial
description: This tutorial will show you how to use the Auth0 ASP.NET OWIN SDK to add authentication and authorization to your web app.
---

# ASP.NET (OWIN) Tutorial

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-aspnet-owin',
  pkgBranch: 'master',
  pkgPath: 'examples/basic-mvc-sample',
  pkgFilePath: 'examples/basic-mvc-sample/BasicMvcSample/Web.config',
  pkgType: 'replace'
}) %>

This tutorial explains how to integrate Auth0 with an ASP.NET application (WebForms, MVC and even Web API) that uses the ASP.NET 4.5 OWIN infrastructure.

## Tutorial
::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* MicroSoft Visual Studio 2015
* .NET Framework 4.5.2
* Auth0-ASPNET-Owin NuGet Package v1.0.2

:::

### 1. Install Auth0-ASPNET-Owin NuGet package

Use the NuGet Package Manager (Tools -> NuGet Package Manager -> Package Manager Console) to install the **Auth0-ASPNET-Owin** package, running the command:

${snippet(meta.snippets.dependencies)}

The NuGet package will install the Auth0 OWIN middleware library, update your web.config by adding Auth0-related settings, as well as add an `Auth0AccountController` class which handles the authentication response from Auth0. Customizing each of these are discussed in more detail below.

### 2. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>After the user has authenticated using Auth0, we will do an HTTP POST back to the <strong>/signin-auth0</strong> path of your website which will be intercepted by the Auth0 OWIN middleware. For security purposes, you have to register this URL on the <a href="${uiAppSettingsURL}">Application Settings</a> section of your Auth0 Dashboard.</p>

<p>After the Auth0 OWIN middleware has processed the request, it will redirect to <strong>"/Auth0Account/ExternalLoginCallback"</strong> URL. (Please do not register this route on the dashboard).</p>

So before proceeding further, be sure to register the URL <code>http://YOUR_WEBSITE_URL/signin-auth0</code> on the <a href="${uiAppSettingsURL}">Application Settings</a> section of your Auth0 Dashboard. (Replace "YOUR_WEBSITE_URL" with the actual base URL of your web application.)
</div>

### 3. Populating Web.Config with your Auth0 settings

When you installed the NuGet package, it created three settings in `<appSettings>` section of the **web.config** file. Replace those with the following settings:

```xml
<add key="auth0:ClientId" value="${account.clientId}" />
<add key="auth0:ClientSecret" value="${account.clientSecret}" />
<add key="auth0:Domain" value="${account.namespace}" />
```

### 4. Configure authentication with Auth0

${snippet(meta.snippets.setup)}

The NuGet package provides a simple controller (`Auth0AccountController`) which will process the authentication response from Auth0. If you want to use your own controller, make sure you set the `redirectPath` parameter when registering the Auth0 middleware.

For example, in order to use the implementation provided by the Visual Studio templates ("/Account/ExternalLoginCallback"), you can set the `redirectPath` parameter as follows:

```
app.UseAuth0Authentication(
    clientId: System.Configuration.ConfigurationManager.AppSettings["auth0:ClientId"],
    clientSecret: System.Configuration.ConfigurationManager.AppSettings["auth0:ClientSecret"],
    domain: System.Configuration.ConfigurationManager.AppSettings["auth0:Domain"],
    redirectPath: "/Account/ExternalLoginCallback");
```

### 5. Triggering login manually or integrating the Auth0Lock

${lockSDK}

> If you selected one of the Lock widgets or Passwordless authentication methods above, please ensure that the `callbackURL` setting contains the correct callback URL to the `/signin-auth0` path, e.g. `http://YOUR_WEBSITE_URL/signin-auth0`.

### 6. Accessing user information

Once the user has been successfully authenticated, you can access the user as a `ClaimsPrincipal` through the `ClaimsPrincipal.Current` property. You can then access information about the user through the various claims set by the Auth0 middleware. The following example demonstrates how you can access the user's email address through the **"email"** claim:

```
public ActionResult Index()
{
	string email = ClaimsPrincipal.Current.FindFirst("email").Value;
}
```

The user profile is normalized regardless of where the user came from, and the claims will typically include the `user_id`, `name`, `email`, `nickname`, and `picture`. For more information about the user profile, see [this article](/user-profile).


**Congratulations!**

----

### More information

#### Authorization

You can use the declarative `[Authorize]`, `<location path='..'>` in `web.config` or code-based checks like `User.Identity.IsAuthenticated`.

#### Log out

To clear the cookie generated on login, use the `HttpContext.GetOwinContext().Authentication.SignOut()` method.

#### Download the sample

Browse the sample on <a href="https://github.com/auth0/auth0-aspnet-owin/tree/master/examples/MvcSample">GitHub</a>.
