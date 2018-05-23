---
title: Login
default: true
description: This tutorial demonstrates how to add user login to a Nancy FX application.
budicon: 448
github:
  path: 00-Starter-Seed
---
<%= include('../_includes/_getting_started', { library: 'Nancy FX', callback: 'http://localhost:3000/callback' }) %>

## Configure your application to use Auth0 

### Install the Dependencies

Install Auth0 NancyFX dependency with `NuGet`

${snippet(meta.snippets.dependencies)}

### Configure Auth0

In your Nancy self-hosted application add the following to your BootStrapper:

${snippet(meta.snippets.setup)}

The `RedirectOnLoginFailed` specifies the view that should be shown to an authenticated user when they try to access a restricted view.

The `CookieName` allows you to set the name of the cookie that will be used to save the User information.

The `UserIdentifier` lets you set an identifier for the user. Currently, here are the fields that are available:

  * `userid`
  * `email`
  * `nickname`
  * `gravatarurl`

::: note
Auth0.Nancy.SelfHost enables `CookieBasedSessions` setting in the background. If you use this setting in your app as well, you should switch it off.
:::

### Add Auth0 Configuration

You need to configure your Auth0 keys in the `app.config`

```xml
<appSettings>
    <!-- Auth0 configuration -->
    <add key="auth0:ClientId" value="${account.clientId}" />
    <add key="auth0:ClientSecret" value="YOUR_CLIENT_SECRET" />
    <add key="auth0:Domain" value="${account.namespace}" />
    <add key="auth0:CallbackUrl" value="${account.callback}" />
</appSettings>
```

### Block all Unauthenticated Requests

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

We need to add the handler for the Auth0 callback so that we can authenticate the user and get their information. We also need to add an endpoint to let users log in and log out.

```cs
public class Authentication : NancyModule
{
    public Authentication()
    {
        Get["/login"] = o =>
        {
            if (this.SessionIsAuthenticated())
                return Response.AsRedirect("securepage");

            var apiClient = new AuthenticationApiClient(ConfigurationManager.AppSettings["auth0:domain"]);
            var authorizationUri = apiClient.BuildAuthorizationUrl()
                .WithClient(ConfigurationManager.AppSettings["auth0:ClientId"])
                .WithRedirectUrl(ConfigurationManager.AppSettings["auth0:CallbackUrl"])
                .WithResponseType(AuthorizationResponseType.Code)
                .WithScope("openid profile")
                .Build();

            return Response.AsRedirect(authorizationUri.ToString());
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
