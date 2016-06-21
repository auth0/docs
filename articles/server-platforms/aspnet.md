---
title: Auth0 ASP.NET SDK Web App Tutorial
description: This tutorial will show you how to use the Auth0 ASP.NET SDK to add authentication and authorization to your web app.
name: ASP.NET
image: /media/platforms/asp.png
tags:
  - quickstart
snippets:
  dependencies: server-platforms/aspnet/dependencies
  setup: server-platforms/aspnet/setup
  use: server-platforms/aspnet/use
alias:
  - microsoft-net
  - aspnet-mvc
  - net-mvc
seo_alias: aspnet
---

# ASP.NET Tutorial


<%= include('../_includes/_package', {
  pkgRepo: 'aspnet-samples',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed/auth0-aspnet-mvc4-sample/',
  pkgFilePath: 'examples/auth0-aspnet-mvc4-sample/aspnet4-sample1/Web.config',
  pkgType: 'replace'
}) %>

**Otherwise, please follow the steps below to configure your existing ASP.NET app (any kind: WebForms, MVC 1, 2, 3 or 4) to use it with Auth0.**

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Microsoft Visual Studio 2015
* Auth0-ASPNET v1.4.0
:::


## Tutorial

### 1. Install Auth0-ASPNET NuGet package

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the **Auth0-ASPNET** package, running the command:

${snippet(meta.snippets.dependencies)}

> This package will add a `LoginCallback.ashx` to your project, which will process the login.

### 2. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>After authenticating the user on Auth0, we will do a POST to a URL on your web site. For security purposes, you have to register this URL on the <a href="${uiAppSettingsURL}">Application Settings</a> section on Auth0 Admin app.</p>

<pre><code>http://localhost:PORT/LoginCallback.ashx</pre></code>
</div>

### 3. Filling Web.Config with your Auth0 settings

The NuGet package also created three settings on `<appSettings>`. Replace those with the following settings:

${snippet(meta.snippets.setup)}

### 4. Triggering login manually or integrating the Auth0Lock

${lockSDK}

### 5. Accessing user information

Once the user successfully authenticated to the application, a `ClaimsPrincipal` will be generated which can be accessed through the `Current` property:

    public ActionResult Index()
    {
    	string email = ClaimsPrincipal.Current.FindFirst("email").Value;
    }

The user profile is normalized regardless of where the user came from. We will always include these: `user_id`, `name`, `email`, `nickname` and `picture`. For more information about the user profile [read this](/user-profile).

**Congratulations!**

----

### More information...

#### Authorization

You can use the usual authorization techniques since the `LoginCallback.ashx` handler and the Http Module will generate an `IPrincipal` on each request. This means you can use the declarative `[Authorize]` or `<location path='..'>` protection or code-based checks like `User.Identity.IsAuthenticated`

#### Log out

To clear the cookie generated on login, use the `FederatedAuthentication.SessionAuthenticationModule.SignOut()` method on the `AccountController\Logout` method.

A typical logout action on ASP.Net MVC would look like this:

```C#
public RedirectResult Logout()
{
    // Clear the session cookie
    FederatedAuthentication.SessionAuthenticationModule.SignOut();
    
    // Redirect to Auth0's logout endpoint
    var returnTo = Url.Action("Index", "Home", null, protocol: Request.Url.Scheme );
    return this.Redirect(
        string.Format(CultureInfo.InvariantCulture,
            "https://{0}/v2/logout?returnTo={1}",
            ConfigurationManager.AppSettings["auth0:Domain"],
            this.Server.UrlEncode(returnTo)));
}
``` 

Note that the final destination URL (the `returnTo` value) needs to be in the list of `Allowed Logout URLs`. [Read more about this](/logout#redirecting-users-after-logout).

#### Link accounts

To allow users to link accounts from different providers, read [Link Accounts](/link-accounts).

You will need the `access_token` of the logged in user. You can get it from:

```
${'<%= ClaimsPrincipal.Current.FindFirst("access_token").Value %>'}
```

#### Flow the identity to a WCF service

If you want to flow the identity of the user logged in to a web site, to a WCF service or an API, you have to use the `callbackOnLocationHash: true` parameter on the login widget constructor. When sending that paramter, Auth0 will generate an `id_token` which is a [JsonWebToken](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-06) that can be either send straight to your service or it can be exchanged to generate an `ActAs` token. [Read more about this](/server-apis/wcf-service).

#### Manage environments: Dev, Test, Production

We recommend creating one application per environment in Auth0 and have different client ids and secret per environment. [Read more about this](/azure-tutorial).
