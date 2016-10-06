---
description: How to use Auth0 with Microsoft Azure.
url: /azure-tutorial
---
# Using Auth0 with Microsoft Azure

From an Auth0 integration perspective, the code is the same, regardless of where your app is running: on Microsoft Azure or your local dev environment.

To integrate applications supported by the Microsoft Azure platform, consider these tutorials:

* [ASP.NET application](/server-platforms/aspnet) <br />
Simple non-intrusive integration with any version of ASP.NET.

* [Node.js application](/server-platforms/nodejs) <br />
Integration using [passport](http://passportjs.org/).

* [Microsoft Azure Mobile Services](http://blog.auth0.com/2013/03/17/Authenticate-Azure-Mobile-Services-apps-with-Everything-using-Auth0/) <br />
Blog post explaining how to integrate with a Microsoft Azure Mobile Services backend.

---

### Tip: change Auth0 configuration when deploying to Microsoft Azure

There is one consideration that you might want to take into account when deploying to Microsoft Azure (or any other environment).

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
<script src="${lock_url}"></script>
<script type="text/javascript">
    var lock = new Auth0Lock('@System.Configuration.ConfigurationManager.AppSettings["auth0:ClientId"]', '${account.namespace}');

    lock.show({
      callbackURL: '@System.Configuration.ConfigurationManager.AppSettings["auth0:CallbackUrl"]'
    });
</script>
```

Whether you deploy to Microsoft Azure Web Sites or a Cloud Service the Web.config transformation will run.

> **TIP**: to test your web.config transforms you can use this [awesome tool](http://webconfigtransformationtester.apphb.com/)
