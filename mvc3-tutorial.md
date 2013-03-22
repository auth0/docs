# Using Auth0 with ASP.NET MVC 3

This tutorial explains how to integrate Auth0 with an ASP.NET MVC 3 web application.

##Before you start

You will need Visual Studio 2010 or 2012 and ASP.NET MVC.
For this tutorial, we will assume the standard template MVC3 template. 
(created through Select **File -> New project -> MVC 3 Web Application -> Intranet Application**), but nothing prevents you to use this in any other ASP.NET application (WebForms, MVC1, MVC2, etc).

##Integrating Auth0 with MVC3

####1. Install Auth0-MVC NuGet package

Use the NuGet Package Manager (Tools -> Library Package Manager -> Package Manager Console) to install the **Auth0-MVC** package, running the command:

	Install-Package Auth0-MVC

> This package creates an ASP.NET Http Handler (`LoginCallback.ashx`) that will be responsible for the token exchange (based on OpenID Connect / OAuth) and setting a cookie that will be used for subsequent requests. It will also register a module based on the WIF `SessionAuthenticationModule` that will be responsible for serializing/deserializing the session cookie.

####2. Setting up the callback URL in Auth0

Run your web application and go to [Auth0 Settings](https://app.auth0.com/#/settings) and make sure to set the callback URL to your application URL:

```
http://localhost:port/LoginCallback.ashx
```

![](img/settings-callback.png)

####3. Filling Web.Config with your Auth0 settings

The NuGet package also created four settings on `<appSettings>`. Replace those with the following settings:

    <add key="auth0:ClientId" value="@@account.clientId@@" />
    <add key="auth0:ClientSecret" value="@@account.clientSecret@@" />
    <add key="auth0:Domain" value="@@account.namespace@@" />
    <add key="auth0:CallbackUrl" value="@@account.callback@@" />

####4. Triggering login manually or integrating the Auth0 widget

Open the `_LogOnPartial.cshtml` view and change the markup after the `else` (users that were not authenticated yet).

    @if(Request.IsAuthenticated) {
        <text>Welcome <strong>@User.Identity.Name</strong>!
        [ @Html.ActionLink("Log Off", "LogOff", "Account") ]</text>
    }
    else {
        <script src="https://sdk.auth0.com/auth0.js#client=@@account.clientId@@&scope=openid"></script>
        <a href="javascript: window.Auth0.signIn()">Log On</a>
    }

> Notice we are injecting a JavaScript that will create a global variable `window.Auth0`. This is used to invoke the widget programatically. Alternatively, you could have used a regular link and redirect the users straight to the desired connection. For example, this link `https://@@account.namespace@@/authorize?response_type=code&scope=openid`
`&client_id=@@account.clientId@@`
`&redirect_uri=@@account.callback@@`
`&connection=google-oauth2` would redirect the user straight to the Google login page. Using this mechanism, you have full control of the user experience.

####3. Accessing user information

Once the user succesfuly authenticated to the application, a `ClaimsPrincipal` will be generated which can be accessed through the `User` property or `Thread.CurrentPrincipal`

    public ActionResult Index() 
    {
        var claims = (User.Identity as IClaimsIdentity).Claims
        string email = claims.SingleOrDefault(c => c.ClaimType == "email");
    }
    
**Congratulations!**

#### Other useful information

* To clear the cookie generated on login, use the `ClaimsCookie.ClaimsCookieModule.Instance.SignOut()` method.

* If you want to flow the identity of the user logged in to a WCF service ([Read more about this](/wcf-tutorial.md)) or an API, you have to use the `scope=openid` parameter on the login (as shown in the example above). When sending that paramter, Auth0 will generate an `id_token` which is a [JsonWebToken]() that can be either send straight to your service or it can be exchanged to generate an `ActAs` token. . Notice that by default it will only include the user id as part of the claism. If you want to get the full claim set for the user, use `scope=openid%20profile`.

