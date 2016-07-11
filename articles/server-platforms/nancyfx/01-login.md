---
title: Login
description: This tutorial will show you how to use the Auth0 NancyFX SDK to add authentication and authorization to your web app.
---

## NancyFX Tutorial

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Microsoft Visual Studio 2015
* .NET Framework 4.5.2
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'Auth0.NancyFx.SelfHost',
  pkgBranch: 'master',
  pkgPath: 'sample',
  pkgFilePath: 'sample/App.config',
  pkgType: 'replace'
}) %>

**Otherwise, please follow the steps below to configure your existing NancyFX WebApp to use it with Auth0.**

### 1. Install the needed dependencies

Install Auth0 NancyFX dependency with `NuGet`

${snippet(meta.snippets.dependencies)}

### 2. Configure Auth0

In your Nancy self hosted application add the following to your BootStrapper:

${snippet(meta.snippets.setup)}

The `RedirectOnLoginFailed` specifies the view that should be shown to an authenticated user when they try to access a restricted view.

The `CookieName` allows you to set the name of the cookie that will be used to save the User information.

The `UserIdentifier` lets you set an identifier for the user. This are the fields that are available to use right now:

  * `userid`
  * `email`
  * `nickname`
  * `gravatarurl`

> **Important Hint:** Auth0.Nancy.SelfHost enables `CookieBasedSessions` setting in the background. If you use this setting in your app as well, you should switch it off.

### 3. Add Auth0 configuration

You need to configure your Auth0 keys in the `app.config`

```xml
<appSettings>
    <!-- Auth0 configuration -->
    <add key="auth0:ClientId" value="${account.clientId}" />
    <add key="auth0:ClientSecret" value="${account.clientSecret}" />
    <add key="auth0:Domain" value="${account.namespace}" />
    <add key="auth0:CallbackUrl" value="${account.callback}" />
</appSettings>
```

### 4. Block all unauthenticated requests

After you enabled the `Auth0Authentication` you are able to block all unauthenticated requests with the following code.

```cs
public class SecurePage : NancyModule
{
    public SecurePage()
    {
        this.RequiresAuthentication(); //<- This is a new implemetation of default extension
        Get["/securepage"] = o => View["securepage"];
    }
}
```

### 5. Add Auth0 callback handler

We need to add the handler for the Auth0 callback so that we can authenticate the user and get his information. We also need to add an endpoint to let users Login and Logout

```cs
public class Authentication : NancyModule
{
    public Authentication()
    {
        Get["/login"] = o =>
        {
            if (this.SessionIsAuthenticated())
                return Response.AsRedirect("securepage");

            return View["login"];
        };

        Get["/login-callback"] = o => this
            .AuthenticateThisSession()
            .ThenRedirectTo("securepage");

        Get["/logout"] = o => this
            .RemoveAuthenticationFromThisSession()
            .ThenRedirectTo("index");
    }
}
```

### 6. Triggering login manually or integrating the Auth0Lock

${lockSDK}

> **Note:** Please note that the `callbackURL` specified in the `Auth0Lock` constructor **must match** the one specified in the previous step

### 7. You're done!

You have configured your NancyFX Webapp to use Auth0. Congrats, you're awesome!
