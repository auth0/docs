# Using Auth0 with ASP.NET

This tutorial explains how to integrate Auth0 with an ASP.NET application (any kind: WebForms, MVC 1, 2, 3 or 4 and even Web API).

## Tutorial

### 1. Install Auth0-ASPNET NuGet package

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the **Auth0-ASPNET** package, running the command:

```
Install-Package Auth0-ASPNET
```

> This package will add a `LoginCallback.ashx` to your project, which will process the login.

### 2. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>After authenticating the user on Auth0, we will do a POST to a URL on your web site. For security purposes, you have to register this URL  on the <strong>Application Settings</strong> section on Auth0 Admin app.</p>

<pre><code>http://localhost:PORT/LoginCallback.ashx</pre></code>
</div>

### 3. Filling Web.Config with your Auth0 settings

The NuGet package also created three settings on `<appSettings>`. Replace those with the following settings:

```
<add key="auth0:ClientId" value="@@account.clientId@@" />
<add key="auth0:ClientSecret" value="@@account.clientSecret@@" />
<add key="auth0:Domain" value="@@account.namespace@@" />
```

### 4. Triggering login manually or integrating the Auth0 widget

@@sdk2@@

### 5. Accessing user information

Once the user succesfuly authenticated to the application, a `ClaimsPrincipal` will be generated which can be accessed through the `Current` property:

    public ActionResult Index() 
    {
    	string email = ClaimsPrincipal.Current.FindFirst(ClaimTypes.Email).Value;
    }

The user profile is normalized regardless of where the user came from. We will always include these: `user_id`, `name`, `email`, `nickname` and `picture`. For more information about the user profile [read this](user-profile).
    
**Congratulations!**

----

### More information...

#### Authorization

You can use the usual authorization techniques since the `LoginCallback.ashx` handler and the Http Module will generate an `IPrincipal` on each request. This means you can use the declarative `[Authorize]` or `<location path='..'>` protection or code-based checks like `User.Identity.IsAuthenticated`

#### Log out

To clear the cookie generated on login, use the `FederatedAuthentication.SessionAuthenticationModule.SignOut()` method on the `AccountController\Logout` method.

#### Link accounts

To allow users to link accounts from different providers, read [Link Accounts](link-accounts).

You will need the `access_token` of the logged in user. You can get it from:

```
<%= ClaimsPrincipal.Current.FindFirst("access_token").Value %>
```

#### Flow the identity to a WCF service

If you want to flow the identity of the user logged in to a web site, to a WCF service or an API, you have to use the `callbackOnLocationHash: true` parameter on the login widget constructor. When sending that paramter, Auth0 will generate an `id_token` which is a [JsonWebToken](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-06) that can be either send straight to your service or it can be exchanged to generate an `ActAs` token. [Read more about this](/wcf-tutorial).

#### Manage environments: Dev, Test, Production

We recommend creating one application per environment in Auth0 and have different client ids and secret per environment. [Read more about this](azure-tutorial).
