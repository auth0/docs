---
title: Login
default: true
description: This tutorial will show you how to use the Auth0 NancyFX SDK to add authentication and authorization to your web app.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-nancyfx-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-nancyfx-samples',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: '00-Starter-Seed/App.config',
  pkgType: 'replace'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Microsoft Visual Studio 2015
* .NET Framework 4.5.2
:::

<%= include('../../_includes/_signup') %>

## Install the Dependencies

Install Auth0 NancyFX dependency with `NuGet`

${snippet(meta.snippets.dependencies)}

## Configure Auth0

In your Nancy self hosted application add the following to your BootStrapper:

${snippet(meta.snippets.setup)}

The `RedirectOnLoginFailed` specifies the view that should be shown to an authenticated user when he tries to access a restricted view.

The `CookieName` allows you to set the name of the cookie that will be used to save the User information.

The `UserIdentifier` lets you set an identifier for the user. This are the fields that are available to use right now:

  * `userid`
  * `email`
  * `nickname`
  * `gravatarurl`

> **Important Hint:** Auth0.Nancy.SelfHost enables `CookieBasedSessions` setting in the background. If you use this setting in your app as well, you should switch it off.

## Add Auth0 Configuration

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

## Block all Unauthenticated Requests

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

## Add Auth0 Callback Handler

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

## Triggering Login Manually or Integrating Lock

<%= include('../../_includes/_lock-sdk') %>

> **Note:** Please note that the `redirectUrl` specified in the `Auth0Lock` constructor **must match** the one specified in the previous step

