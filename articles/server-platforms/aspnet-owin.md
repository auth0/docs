---
lodash: true
title: ASP.NET (OWIN) Tutorial
name: ASP.NET (OWIN)
image: /media/platforms/asp.png
tags:
  - quickstart
snippets:
  dependencies: server-platforms/aspnet-owin/dependencies
  setup: server-platforms/aspnet-owin/setup
  use: server-platforms/aspnet-owin/use
alias:
  - aspnetowin
  - owin
---

# ASP.NET (OWIN) Tutorial

<%= include('../_includes/_package', {
  pkgRepo: 'auth0-aspnet-owin',
  pkgBranch: 'master',
  pkgPath: 'examples/basic-mvc-sample',
  pkgFilePath: 'examples/basic-mvc-sample/BasicMvcSample/Web.config',
  pkgType: 'replace' + account.clientParam
}) %>

This tutorial explains how to integrate Auth0 with an ASP.NET application (of any kind: WebForms, MVC and even Web API) that uses the ASP.NET 4.5 Owin infrastructure.

## Tutorial

### 1. Install Auth0-ASPNET-Owin NuGet package

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the **Auth0-ASPNET-Owin** package, running the command:

${snippet(meta.snippets.dependencies)}

### 2. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>After authenticating the user on Auth0, we will do a POST to your website. The first POST will be to the built-in OWIN route <strong>"/signin-auth0"</strong> (For security purposes, you have to register this URL on the <a href="${uiAppSettingsURL}">Application Settings</a> section on Auth0 Dashboard). After that is successful, it will redirect again to <strong>"/Auth0Account/ExternalLoginCallback"</strong> (Please do not register this route on the dashboard).</p>

<pre><code>http://localhost:PORT/signin-auth0</pre></code>
</div>

### 3. Filling Web.Config with your Auth0 settings

The NuGet package also created three settings on `<appSettings>`. Replace those with the following settings:

```xml
<add key="auth0:ClientId" value="${account.clientId}" />
<add key="auth0:ClientSecret" value="${account.clientSecret}" />
<add key="auth0:Domain" value="${account.namespace}" />
```

### 4. Configure authentication with Auth0

${snippet(meta.snippets.setup)}

The nuget provides a simple controller (_Auth0AccountController_) to process the authentication response from Auth0. If you want to use your own controller, make sure you set the `redirectPath` parameter. For example, in order to use the implementation provided by Visual Studio templates, use the following: `redirectPath: "/Account/ExternalLoginCallback"`.

### 5. Triggering login manually or integrating the Auth0Lock

${lockSDK}

### 6. Accessing user information

Once the user is successfully authenticated with the application, a `ClaimsPrincipal` will be generated which can be accessed through the `Current` property:

    public ActionResult Index()
    {
    	string email = ClaimsPrincipal.Current.FindFirst(ClaimTypes.Email).Value;
    }

The user profile is normalized regardless of where the user came from. We will always include these: `user_id`, `name`, `email`, `nickname`, and `picture`. For more information about the user profile, see [this article](/user-profile).


**Congratulations!**

----

### More information

#### Authorization

You can use the declarative `[Authorize]`, `<location path='..'>` in `web.config` or code-based checks like `User.Identity.IsAuthenticated`.

#### Log out

To clear the cookie generated on login, use the `HttpContext.GetOwinContext().Authentication.SignOut()` method.

#### Download the sample

Browse the sample on <a href="https://github.com/auth0/auth0-aspnet-owin/tree/master/examples/MvcSample">GitHub</a>.
