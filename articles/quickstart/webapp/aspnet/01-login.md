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

## 1. Install Auth0-ASPNET NuGet Package

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the **Auth0-ASPNET** package, running the command:

${snippet(meta.snippets.dependencies)}

::: note
This package will add a `LoginCallback.ashx` to your project, which will process the login.
:::

## 2. Configure Callback URLs

After authenticating the user on Auth0, we will do a POST to the `/LoginCallback.ashx` URL on your website, e.g. `http://localhost:PORT/LoginCallback.ashx`. For security purposes, you have to register this URL in the [Client Settings](${manage_url}/#/applications/${account.clientId}/settings) section on Auth0 Admin app.

![Callback URLs](/media/articles/server-platforms/aspnet/callback_url.png)

## 3. Fill Web.Config with your Auth0 Settings

The NuGet package also created three settings on `<appSettings>`. Replace those with the following settings:

${snippet(meta.snippets.setup)}

## 4. Authenticating the user

To authenticate the user, we will redirect to Auth0's `/authorize` endpoint:


```c#
// Controllers/AccountController.cs
public ActionResult Login(string returnUrl)
{
    var client = new AuthenticationApiClient(
        new Uri(string.Format("https://{0}", ConfigurationManager.AppSettings["auth0:Domain"])));


    var request = this.Request;
    var redirectUri = new UriBuilder(request.Url.Scheme, request.Url.Host, this.Request.Url.IsDefaultPort ? -1 : request.Url.Port, "LoginCallback.ashx");

    var authorizeUrlBuilder = client.BuildAuthorizationUrl()
        .WithClient(ConfigurationManager.AppSettings["auth0:ClientId"])
        .WithRedirectUrl(redirectUri.ToString())
        .WithResponseType(AuthorizationResponseType.Code)
        .WithScope("openid profile")
        // adding this audience will cause Auth0 to use the OIDC-Conformant pipeline
        // you don't need it if your client is flagged as OIDC-Conformant (Advance Settings | OAuth)
        .WithAudience("https://" + @ConfigurationManager.AppSettings["auth0:Domain"] + "/userinfo");

    if (!string.IsNullOrEmpty(returnUrl))
    {
        var state = "ru=" + HttpUtility.UrlEncode(returnUrl);
        authorizeUrlBuilder.WithState(state);
    }

    return new RedirectResult(authorizeUrlBuilder.Build().ToString());
}
</script>
```


## 5. Access User Information

Once the user successfully authenticated to the application, a `ClaimsPrincipal` will be generated which can be accessed through the `Current` property:

```cs
// Controllers/HomeController.cs
public ActionResult Index()
{
  string name = ClaimsPrincipal.Current.FindFirst("name")?.Value;
}
```

The user profile is normalized regardless of where the user came from. We will always include these: `name`, `nickname`, `picture` and `updated_at`. For more information about the user profile [read this](/user-profile).

## 6. Further Reading

### Authorization

You can use the usual authorization techniques since the `LoginCallback.ashx` handler and the Http Module will generate an `IPrincipal` on each request. This means you can use the declarative `[Authorize]` or `<location path='..'>` protection or code-based checks like `User.Identity.IsAuthenticated`

### Automatically redirect to the login page

An `[Authorize]` attribute will generate a `401 - Unauthorized` error if the request is not authenticated. If you want to redirect to a login page automatically in these cases, you can leverage the **Forms Authentication** module by configuring this in `web.config`:

```xml
<!--Web.config-->
<system.web>
  <authentication mode="Forms">
    <forms loginUrl="Account/Login" />
  </authentication>
</system.web>
```

In the above example, we are redirecting to the `Login` action in an `Account` controller, which in turn redirects to Auth0's `/authorize` endpoint for authentication, as described in [#4](#4-authenticating-the-user).

### Logout

To clear the cookie generated on login, use the `FederatedAuthentication.SessionAuthenticationModule.SignOut()` method on the `AccountController\Logout` method.

A typical logout action on ASP.Net MVC would look like this:

```cs
// Controllers/AccountController.cs
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

### Link Accounts

To allow users to link accounts from different providers, read [Link Accounts](/link-accounts).

You will need the `access_token` of the logged in user. You can get it from:

```
${'<%= ClaimsPrincipal.Current.FindFirst("access_token").Value %>'}
```

### Flow the Identity to a WCF Service

If you want to flow the identity of the user logged in a website, to a WCF service or an API, you have to use the `responseType: 'token'` parameter on the login widget constructor. When sending that parameter, Auth0 will generate an `id_token` which is a [JsonWebToken](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-06) that can be either send straight to your service or it can be exchanged to generate an `ActAs` token. [Read more about this](/server-apis/wcf-service).

### Manage Environments: Dev, Test, Production

We recommend creating one application per environment in Auth0 and have different client ids and secret per environment. [Read more about this](/azure-tutorial).
