---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 ASP.NET SDK to add authentication and authorization to your web app
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'aspnet-samples',
  path: 'Quickstart/00-Starter-Seed/auth0-aspnet-mvc4-sample/',
  requirements: [
    'Microsoft Visual Studio 2017',
    'Auth0-ASPNET v2.0.0'
  ]
}) %>

## Install the Auth0-ASPNET NuGet Package

Install the Auth0-ASPNET package. In the NuGet Package Manager, click **Tools** > **Library package manager** > **Package Manager Console**. In the console, run the command: 

${snippet(meta.snippets.dependencies)}

::: note
This package adds the `LoginCallback.ashx` file to your project to process the login. 
:::

## Configure Callback URLs

After authenticating the user on Auth0, send a POST request to the `/LoginCallback.ashx` URL on your website, for example `http://localhost:PORT/LoginCallback.ashx`. 

For security, register this URL in your [Client Settings](${manage_url}/#/applications/${account.clientId}/settings).

![Callback URLs](/media/articles/server-platforms/aspnet/callback_url.png)

## Fill Web.Config With Your Auth0 Settings

The NuGet package creates three settings on `<appSettings>`. Replace them with the following settings:

${snippet(meta.snippets.setup)}

## Integrate Auth0.js

Integrate the Auth0.js library into your application.

```html
<script src="${auth0js_urlv8}"></script>
<script type="text/javascript">
var webAuth = new auth0.WebAuth({
  domain: '${account.namespace}',
  clientID: '${account.clientId}',
  redirectUri: 'http://localhost:4987/LoginCallback.ashx',
  audience: 'https://${account.namespace}/userinfo',
  responseType: 'code',
  scope: 'openid profile'
});
</script>
<button onclick="webAuth.authorize();">Log In</button>
```

## Access User Information

When the user logs in to the application, a `ClaimsPrincipal` class is generated. You can access it through the `Current` property:

```cs
// Controllers/HomeController.cs
public ActionResult Index()
{
  string name = ClaimsPrincipal.Current.FindFirst("name")?.Value;
}
```

The user profile you receive is always a normalized user profile. The profile includes the following attributes:
* `name`
* `nickname`
* `picture`
* `updated_at`

For more information about the user profile, read the [user profile documentation](/user-profile).

## Further Reading

### Handle authorization

On each request, the `LoginCallback.ashx` handler and the `Http` module generate an `IPrincipal`. Because of that, you can use the following authorization methods: 
* The declarative `[Authorization]` protection
* The `<location path='..'>` protection
* Code-based checks, for example, `User.Identity.IsAuthenticated`

### Redirect to a login page

If the request is not authenticated, the `[Authorize]` attribute generates a 401 (Unauthorized) error. If you want to automatically redirect users to the login page, you can use the Forms Authentication module. 

In `web.config`, configure the following:

```xml
<!--Web.config-->
<system.web>
  <authentication mode="Forms">
    <forms loginUrl="Account/Login" />
  </authentication>
</system.web>
```

In the example above, you are redirecting the user to a `Login` action in an `Account` controller. Depending on what you configure, the `Login` action can:
* Return a view that integrates Lock
* Return a view that shows a custom UI
* Redirect the user to Auth0 for authentication

```cs
// Controllers/HomeController.cs
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

### Set up logout

To clear the cookie generated on login, use the `FederatedAuthentication.SessionAuthenticationModule.SignOut()` method on the `AccountController\Logout` method.

The example below shows a typical logout action on ASP.Net MVC:

```cs
// Controllers/HomeController.cs
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

The destination URL is stored in the `returnTo` value. 

::: note 
The destination URL must be on the`Allowed Logout URLs` list. Read more about redirecting users after they log out in the [Logout](/logout#redirecting-users-after-logout) article.
:::

### Link accounts

To allow users to link accounts from different providers, read the [Linking User Accounts](/link-accounts) article.

To link accounts, you need the logged-in user's access token. You can get it from:

```
${'<%= ClaimsPrincipal.Current.FindFirst("access_token").Value %>'}
```

### Flow the user's identity to a WCF service

If you want to flow the logged-in user's identity to a WCF service or an API, use the `responseType: 'token'` parameter on the login widget constructor. When the parameter is sent, Auth0 generates an ID token. You can send the ID token to your service or use it to generate an `ActAs` token. The ID token is a [JSON Web Token](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-06).

### Manage the dev, test and production environments

We recommend that you create one application per environment. For each environment, use a different client ID and secret. To learn more, read about [using Auth0 with Microsoft Azure](/azure-tutorial).