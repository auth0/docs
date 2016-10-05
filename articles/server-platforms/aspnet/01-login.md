---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 ASP.NET SDK to add authentication and authorization to your web app
---

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-aspnet',
  pkgBranch: 'master',
  pkgPath: 'examples/auth0-aspnet-mvc4-sample/',
  pkgFilePath: 'examples/auth0-aspnet-mvc4-sample/aspnet4-sample1/Web.config',
  pkgType: 'replace'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Microsoft Visual Studio 2015
* Auth0-ASPNET v1.4.0
:::



## Install Auth0-ASPNET NuGet Package

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the **Auth0-ASPNET** package, running the command:

${snippet(meta.snippets.dependencies)}

> This package will add a `LoginCallback.ashx` to your project, which will process the login.

## Configure Callback URLs

<div class="setup-callback">
<p>After authenticating the user on Auth0, we will do a POST to a URL on your web site. For security purposes, you have to register this URL on the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section on Auth0 Admin app.</p>

<pre><code>http://localhost:PORT/LoginCallback.ashx</pre></code>
</div>

## Filling Web.Config with your Auth0 Settings

The NuGet package also created three settings on `<appSettings>`. Replace those with the following settings:

${snippet(meta.snippets.setup)}

## Triggering Login Manually or Integrating Lock

<%= include('../../_includes/_lock-sdk') %>

## Accessing User Information

Once the user successfully authenticated to the application, a `ClaimsPrincipal` will be generated which can be accessed through the `Current` property:

    public ActionResult Index()
    {
    	string email = ClaimsPrincipal.Current.FindFirst("email").Value;
    }

The user profile is normalized regardless of where the user came from. We will always include these: `user_id`, `name`, `email`, `nickname` and `picture`. For more information about the user profile [read this](/user-profile).

## Further Reading

### Authorization

You can use the usual authorization techniques since the `LoginCallback.ashx` handler and the Http Module will generate an `IPrincipal` on each request. This means you can use the declarative `[Authorize]` or `<location path='..'>` protection or code-based checks like `User.Identity.IsAuthenticated`

### Redirecting to a Login Page

An `[Authorize]` attribute will generate a `401 - Unauthorized` error if the request is not authenticated. If you want to redirect to a login page automatically in these cases, you can leverage the **Forms Authentication** module by configuring this in `web.config`:

```xml
<system.web>
  <authentication mode="Forms">
    <forms loginUrl="Account/Login" />
  </authentication>
</system.web>
```

In the above example, we are redirecting to a `Login` action in an `Account` controller. The `Login` action can return a view that integrates Lock or shows a custom UI, or directly redirect to Auth0 for authentication, as described in [#4](#4-triggering-login-manually-or-integrating-the-auth0lock).

```c#
public ActionResult Login(string returnUrl)
{
    if (string.IsNullOrEmpty(returnUrl) || !this.Url.IsLocalUrl(returnUrl))
    {
        returnUrl = "/";
    }

    // you can use this for the 'authParams.state' parameter
    // in Lock, to provide a return URL after the authentication flow.
    ViewBag.State = "ru="+ HttpUtility.UrlEncode(returnUrl);

    return this.View();
}
```

### Log Out

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

### Linking Accounts

To allow users to link accounts from different providers, read [Link Accounts](/link-accounts).

You will need the `access_token` of the logged in user. You can get it from:

```
${'<%= ClaimsPrincipal.Current.FindFirst("access_token").Value %>'}
```

### Flow the Identity to a WCF Service

If you want to flow the identity of the user logged in to a web site, to a WCF service or an API, you have to use the `responseType: 'token'` parameter on the login widget constructor. When sending that paramter, Auth0 will generate an `id_token` which is a [JsonWebToken](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-06) that can be either send straight to your service or it can be exchanged to generate an `ActAs` token. [Read more about this](/server-apis/wcf-service).

### Manage Environments: Dev, Test, Production

We recommend creating one application per environment in Auth0 and have different client ids and secret per environment. [Read more about this](/azure-tutorial).
