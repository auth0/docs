# Using Auth0 with Windows Azure

From an Auth0 integration perspective, the code is the same, regardless of where your app is running: on Windows Azure or your local dev environment.

To integrate applications supported by the Windows Azure platform, consider these tutorials:

* [ASP.NET application](aspnet-tutorial) <br />
Simple non-intrusive integration with any version of ASP.NET.

* [Node.js application](nodejs-tutorial) <br />
Integration using [passport](http://passportjs.org/).

* [Windows Azure Mobile Services](http://blog.auth0.com/2013/03/17/Authenticate-Azure-Mobile-Services-apps-with-Everything-using-Auth0/) <br />
Blog post explaining how to integrate with a Windows Azure Mobile Services backend.

---

### Tip: change Auth0 configuration when deploying to Windows Azure

There is one consideration that you might want to take into account when deploying to Windows Azure (or any other environment).

We recommend creating one application per environment in Auth0 (e.g. "Dev", "Test", "QA", etc). 

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
    <add key="auth0:ClientId" value="YOUR_PROD_CLIENT_ID" xdt:Transform="Replace" xdt:Locator="Match(key)" />
    <add key="auth0:ClientSecret" value="YOUR_PROD_CLIENT_SECRET" xdt:Transform="Replace" xdt:Locator="Match(key)" />
    <add key="auth0:CallbackUrl" value="http://mysite.azurewebsites.net/LoginCallback.ashx" xdt:Transform="Replace" xdt:Locator="Match(key)" />
  </appSettings>
</configuration>
```

Then, whenever you have to reference the ClientID, Secret or callback, you use this syntax:

```
<script src="@@widget_url@@"></script>
<script type="text/javascript">
    var widget = new Auth0Widget({
        domain:                 '@@account.namespace@@',
        clientID:               '@System.Configuration.ConfigurationManager.AppSettings["auth0:ClientId"]', 
        callbackURL:            '@System.Configuration.ConfigurationManager.AppSettings["auth0:CallbackUrl"]'
    });

    // widget.show();
</script>
```

Whether you deploy to Windows Azure Web Sites or a Cloud Service the Web.config transformation will run.

> **TIP**: to test your web.config transforms you can use this [awesome tool](http://webconfigtransformationtester.apphb.com/)


