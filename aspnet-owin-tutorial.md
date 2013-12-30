# Using Auth0 with ASP.NET (OWIN)

This tutorial explains how to integrate Auth0 with an ASP.NET application (any kind: WebForms, MVC 1, 2, 3 or 4 and even Web API) that uses the ASP.NET 4.5 Owin infrastructure.

## Tutorial

### 1. Install Auth0-ASPNET-45 NuGet package

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the **Auth0-ASPNET-45** package, running the command:

```
Install-Package Auth0-ASPNET-45
```

### 2. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>After authenticating the user on Auth0, we will do a POST to a URL on your web site. For security purposes, you have to register this URL  on the <strong>Application Settings</strong> section on Auth0 Admin app.</p>

<pre><code>http://localhost:PORT/signin-auth0</pre></code>
</div>

### 3. Filling Web.Config with your Auth0 settings

The NuGet package also created four settings on `<appSettings>`. Replace those with the following settings:

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
    	string email = ClaimsPrincipal.Current.FindFirst("email").Value;
    }

The user profile is normalized regardless of where the user came from. We will always include these: `user_id`, `name`, `email`, `nickname` and `picture`. For more information about the user profile [read this](user-profile).

### 6. Configure authentication with Auth0

Edit `App_Start\Startup.Auth.cs`:

	public void ConfigureAuth(IAppBuilder app)
	{
	    // ...

	    app.UseAuth0Authentication(
	        clientId:       System.Configuration.ConfigurationManager.AppSettings["auth0:ClientId"],
	        clientSecret:   System.Configuration.ConfigurationManager.AppSettings["auth0:ClientSecret"],
	        domain:         System.Configuration.ConfigurationManager.AppSettings["auth0:Domain"]);
	}

The nuget provides a simple controller (Auth0AccountController) to process the authentication response from Auth0. If you want to use your own controller, you need to set the `redirectPath` parameter. For example, in order to use the implementation provided by Visual Studio templates, use the following: `redirectPath: "/Account/ExternalLoginCallback"`.


**Congratulations!**

----

### More information...

#### Authorization

You can use the declarative `[Authorize]` or `<location path='..'>` protection or code-based checks like `User.Identity.IsAuthenticated`.

#### Log out

To clear the cookie generated on login, use the `HttpContext.GetOwinContext().Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie)` method.

#### Download the sample

Browse the sample on <a target="_blank" href="https://github.com/auth0/auth0-aspnet-owin/tree/master/MvcSample">GitHub</a>.
