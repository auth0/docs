# Using Auth0 with Windows Azure

From an Auth0 integration perspective, the code is the same, regardless you are running on Windows Azure or your local dev environment.

To integrate applications supported by the Windows Azure platform, consider these tutorials:

* [Any ASP.NET application](aspnet-tutorial) **[Recommended]** <br />
Simple non-intrusive integration with any version of ASP.NET, including MVC 4.

* [ASP.NET MVC4 application](mvc-tutorial) <br />
This tutorial shows how to integrate Auth0 the new [OAuth Providers feature](http://www.asp.net/mvc/overview/getting-started/using-oauth-providers-with-mvc) on ASP.NET MVC4 applications. Make sure to understand [how this new mechanism work](http://weblogs.asp.net/jgalloway/archive/2012/08/29/simplemembership-membership-providers-universal-providers-and-the-new-asp-net-4-5-web-forms-and-asp-net-mvc-4-templates.aspx).

* [Node.js application](nodejs-tutorial) <br />
Integration using [passport](http://passportjs.org/).

* [Windows Azure Mobile Services](http://blog.auth0.com/2013/03/17/Authenticate-Azure-Mobile-Services-apps-with-Everything-using-Auth0/) <br />
Blog post explaining how to integrate with a Windows Azure Mobile Services backend.

---

### Tip: change Auth0 configuration when deploying to Windows Azure

There is one consideration that you might want to take into account when deploying to Windows Azure (or any other environment).

We recommend creating one application per environment in Auth0. You can create new applications under the same domain from [Auth0 Settings](https://app.auth0.com/#/settings).

![](img/environments.png)

Each application has a different `Client Id` and `Client Secret` and can be configured with a different callback URL. You can use the [Web.config transformations](http://msdn.microsoft.com/en-us/library/dd465326.aspx) to apply a transformation depening on the Build Configuration you use. For instance

`Web.config`
```
<add key="auth0:ClientId" value="YOUR_DEV_CLIENT_ID" />
<add key="auth0:ClientSecret" value="YOUR_DEV_CLIENT_SECRET" />
<add key="auth0:CallbackUrl" value="http://localhost:port/LoginCallback.ashx" />
```

`Web.Release.config`
```
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
  <appSettings>
    <add key="auth0:ClientId" value="YOUR_PROD_CLIENT_ID" xdt:Transform="Replace" />
    <add key="auth0:ClientSecret" value="YOUR_PROD_CLIENT_SECRET" xdt:Transform="Replace" />
    <add key="auth0:CallbackUrl" value="http://mysite.azurewebsites.net/LoginCallback.ashx" xdt:Transform="Replace" />
  </appSettings>
</configuration>
```

Then, whenever you have to reference the ClientID, Secret or callback, you use this syntax:

```
<script src="https://sdk.auth0.com/auth0.js#client=@System.Configuration.ConfigurationManager.AppSettings["auth0:ClientId"]&scope=openid"></script>
```

Whether you deploy to Windows Azure Web Sites or a Cloud Service the Web.config transformation will run.

> **TIP**: to test your web.config transforms you can use this [awesome tool](http://webconfigtransformationtester.apphb.com/)


